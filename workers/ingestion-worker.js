export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    try {
      // Parse the incoming data
      const data = await request.json();
      const events = Array.isArray(data) ? data : [data];
      
      // Process events for Supabase
      const processedEvents = events.map(event => ({
        event_timestamp: event.timestamp || new Date().toISOString(),
        event_type: event.event_type || 'unknown',
        user_id: event.user_id || 'anonymous',
        session_id: event.session_id || `session_${Date.now()}`,
        page_url: event.page_url || '',
        event_data: event.properties || {}
      }));

      // Store in Supabase
      const supabaseResult = await storeInSupabase(env, processedEvents);

      return new Response(JSON.stringify({
        status: 'success',
        message: 'Data stored in Supabase successfully! 🎉',
        events_processed: events.length,
        supabase_result: supabaseResult
      }), {
        headers: { 
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*' 
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        status: 'error',
        error: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

async function storeInSupabase(env, events) {
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/analytics_events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
      'apikey': env.SUPABASE_ANON_KEY
    },
    body: JSON.stringify(events)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase insert failed: ${response.status} - ${errorText}`);
  }
  
  return { success: true, status: response.status };
}