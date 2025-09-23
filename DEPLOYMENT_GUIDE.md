# 🚀 Deployment Guide - Accounting Application

## 📋 Production Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Backend Docker Setup
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./accounting.db
    volumes:
      - ./data:/app/data

  frontend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:8000
```

### Option 2: Cloud Deployment

#### Backend (Railway/Render/Heroku)
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Set environment variables
export DATABASE_URL=postgresql://user:pass@host:port/db
export CORS_ORIGINS=https://yourdomain.com

# Run migrations
alembic upgrade head

# Start server
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

#### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 3: VPS Deployment

#### Server Setup (Ubuntu 20.04+)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt install python3.11 python3.11-venv python3-pip

# Install Nginx
sudo apt install nginx

# Install PM2 for process management
sudo npm install -g pm2
```

#### Backend Setup
```bash
# Create app directory
sudo mkdir -p /var/www/accounting
cd /var/www/accounting

# Clone repository
git clone <your-repo-url> .

# Setup virtual environment
python3.11 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Setup database
python -m backend.seed

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'accounting-backend',
    script: 'uvicorn',
    args: 'backend.app:app --host 0.0.0.0 --port 8000',
    cwd: '/var/www/accounting',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Frontend Setup
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Serve with PM2
cat > ecosystem-frontend.config.js << EOF
module.exports = {
  apps: [{
    name: 'accounting-frontend',
    script: 'serve',
    args: '-s dist -l 8080',
    cwd: '/var/www/accounting',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

pm2 start ecosystem-frontend.config.js
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/accounting
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Environment Configuration

### Backend Environment Variables
```bash
# .env
DATABASE_URL=sqlite:///./accounting.db
CORS_ORIGINS=["http://localhost:8080", "https://yourdomain.com"]
SECRET_KEY=your-secret-key-here
DEBUG=False
```

### Frontend Environment Variables
```bash
# .env.production
VITE_API_URL=https://yourdomain.com/api
VITE_APP_NAME=Accounting App
```

## 📊 Database Migration

### SQLite to PostgreSQL (Production)
```python
# backend/migrations/001_upgrade_to_postgres.py
from sqlalchemy import create_engine
import pandas as pd

# Export from SQLite
sqlite_engine = create_engine('sqlite:///./accounting.db')
accounts_df = pd.read_sql('SELECT * FROM accounts', sqlite_engine)
transactions_df = pd.read_sql('SELECT * FROM transactions', sqlite_engine)

# Import to PostgreSQL
postgres_engine = create_engine('postgresql://user:pass@host:port/db')
accounts_df.to_sql('accounts', postgres_engine, if_exists='append', index=False)
transactions_df.to_sql('transactions', postgres_engine, if_exists='append', index=False)
```

## 🔒 Security Checklist

### Backend Security
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Enable SQL injection protection
- [ ] Set up database backups

### Frontend Security
- [ ] Enable CSP headers
- [ ] Sanitize user inputs
- [ ] Use HTTPS in production
- [ ] Implement proper error handling
- [ ] Add input validation

## 📈 Performance Optimization

### Backend Optimizations
```python
# backend/config.py
class Settings(BaseSettings):
    # Database connection pooling
    database_url: str = "postgresql://user:pass@host:port/db?pool_size=20"
    
    # Caching
    redis_url: str = "redis://localhost:6379"
    
    # Rate limiting
    rate_limit_per_minute: int = 100
```

### Frontend Optimizations
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
})
```

## 🔍 Monitoring & Logging

### Application Monitoring
```python
# backend/middleware.py
import logging
from fastapi import Request
import time

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    logging.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.4f}s")
    return response
```

### Health Checks
```python
# backend/health.py
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "1.0.0"
    }
```

## 🚀 Quick Start Commands

### Development
```bash
# Start backend
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000

# Start frontend
npm run dev
```

### Production
```bash
# Build and start with Docker
docker-compose up -d

# Or with PM2
pm2 start ecosystem.config.js
pm2 start ecosystem-frontend.config.js
```

## 📞 Support & Maintenance

### Backup Strategy
```bash
# Database backup
sqlite3 accounting.db ".backup backup_$(date +%Y%m%d).db"

# Full application backup
tar -czf accounting_backup_$(date +%Y%m%d).tar.gz /var/www/accounting
```

### Update Process
```bash
# Pull latest changes
git pull origin main

# Update backend
cd backend && pip install -r requirements.txt

# Update frontend
npm install && npm run build

# Restart services
pm2 restart all
```

---

**Your accounting application is now ready for production deployment!** 🚀


