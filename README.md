# 🚀 Serverless Data Pipeline for Analytics

## 📋 Project Overview
A complete serverless analytics pipeline built using free cloud services. Ingests, processes, and analyzes user event data in real-time with zero server management and zero cost within free tiers.

## 🏗️ Architecture
```
[Web/Mobile App] 
     ↓ (HTTP POST)
[Cloudflare Worker] 
     ↓ (REST API)
[Supabase PostgreSQL] → [Analytics Dashboard]
```

## 📊 Features
- ✅ **Real-time Data Ingestion** - HTTP API for event collection
- ✅ **Auto-scaling** - Handles 1 to 1M+ requests automatically  
- ✅ **Professional Analytics** - SQL-powered business intelligence
- ✅ **Cost Optimization** - $0/month within free tiers
- ✅ **Production Ready** - Enterprise-grade infrastructure

## 🛠️ Technology Stack
| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Cloudflare Workers** | Serverless Compute | 100K requests/day |
| **Supabase** | PostgreSQL Database | 500MB storage |
| **PostgreSQL** | Analytics Queries | Full SQL support |

## 🚀 Quick Start

### 1. Test the Pipeline
Open `test.html` in your browser and click buttons to send test events.

### 2. View Live Data
```sql
-- See real-time events
SELECT * FROM analytics_events ORDER BY event_timestamp DESC LIMIT 10;

-- View analytics dashboard  
SELECT * FROM daily_analytics;
```

### 3. API Endpoint
```javascript
const response = await fetch('https://analytics-pipeline-sumadhura.analytics-sumadhura.workers.dev', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify([{
    event_type: 'page_view',
    user_id: 'user_123',
    page_url: 'https://example.com'
  }])
});
```

## 📁 Project Structure
```
serverless-data-pipeline/
├── workers/
│   └── ingestion-worker.js    # Cloudflare Worker code
├── test.html                  # Demo interface
├── wrangler.toml             # Deployment configuration
└── README.md                 # This file
```

## 🎯 Database Schema
```sql
CREATE TABLE analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_timestamp TIMESTAMPTZ NOT NULL,
    event_type VARCHAR(20) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(100),
    page_url VARCHAR(500),
    event_data JSONB NOT NULL DEFAULT '{}'
);

CREATE VIEW daily_analytics AS
SELECT 
  DATE(event_timestamp) as analytics_date,
  COUNT(*) as total_events,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'purchase') as purchases
FROM analytics_events 
GROUP BY DATE(event_timestamp);
```

## 🔧 Configuration
```toml
# wrangler.toml
name = "analytics-pipeline-sumadhura"
compatibility_date = "2024-01-01"
main = "workers/ingestion-worker.js"
```

## 🎓 Learning Outcomes
- **Serverless Architecture** - No server management required
- **Cloud Integration** - Multiple services working together
- **Real-time Analytics** - Immediate data processing and insights
- **Production Deployment** - Live, working system

## 📞 Support
For issues:
1. Check Cloudflare Worker logs
2. Verify environment variables
3. Test with provided HTML interface

---
**Developer**: Sumadhura M  
**Student ID**: sumadhura 
**Submission Date**: November 18, 2024  
**Course**: Cloud Computing Project
