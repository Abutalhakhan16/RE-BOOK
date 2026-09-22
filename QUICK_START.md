# ReBook - Quick Start Guide

Get ReBook running locally in 5 minutes!

## Prerequisites
- Node.js 14+ and npm
- PostgreSQL 12+

## Step 1: Database Setup (2 min)

```bash
# Create database
createdb rebook

# Connect to database
psql rebook

# Copy and paste the schema from scripts/init-db.sql
# Then type \q to exit
```

Or import the schema file:
```bash
psql rebook < scripts/init-db.sql
```

## Step 2: Backend Setup (2 min)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=rebook

# Start server
npm run dev
```

✅ Backend running on http://localhost:5000

## Step 3: Frontend Setup (1 min)

Open a new terminal:

```bash
# From root directory
cd frontend

# OR use any of these to serve files:
python -m http.server 8000
# or
npx http-server
# or
php -S localhost:8000
```

✅ Frontend running on http://localhost:8000

## Step 4: Test the App

1. Open http://localhost:8000 in your browser
2. Click "Sign Up" and create an account
3. Explore the site:
   - **Explore**: Browse books (empty at first)
   - **Sell**: List a physical book
   - **Publish**: Publish an eBook
   - **Dashboard**: See your listings and earnings

## API Testing (Optional)

Test the API with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all books
curl http://localhost:5000/api/books

# Create book (auth required)
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Sample Book",
    "author": "John Doe",
    "category": "Fiction",
    "condition": "Like New",
    "price": 9.99,
    "description": "A great book"
  }'
```

## Common Issues

### "Port 5000 already in use"
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>
```

### "Database connection error"
- Check PostgreSQL is running
- Verify .env credentials match your setup
- Make sure database 'rebook' exists

### "Frontend can't connect to backend"
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify both servers are on localhost

### "Module not found" errors
```bash
cd backend
npm install  # Reinstall dependencies
```

## Project Structure Overview

```
ReBook/
├── frontend/           # All HTML, CSS, JS files
│   ├── index.html
│   ├── auth.html
│   ├── register.html
│   ├── explore.html
│   ├── sell-upload.html
│   ├── publish-ebook.html
│   ├── dashboard.html
│   ├── api-service.js  # Frontend API client
│   ├── styles.css
│   └── script.js
├── backend/            # Node.js Express API
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   ├── middleware/
│   ├── controllers/
│   └── routes/
├── scripts/
│   └── init-db.sql
└── README.md
```

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET | /api/books | Get all books |
| POST | /api/books | Create book |
| GET | /api/ebooks | Get all eBooks |
| POST | /api/ebooks | Publish eBook |
| GET | /api/auth/profile | Get user profile |

## Environment Variables Reference

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=rebook

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Frontend
CLIENT_URL=http://localhost:8000
```

## Next Steps

1. **Deploy Frontend** to Netlify/Vercel
2. **Deploy Backend** to Heroku/Railway/Render
3. **Add Payments** with Stripe integration
4. **Add Features** like messaging, ratings, wishlists
5. **Scale Up** with caching, CDN, optimization

## Need Help?

- 📖 See `README.md` for full documentation
- 🔧 See `BACKEND_SETUP.md` for backend details
- 📋 See `PROJECT_SUMMARY.md` for architecture overview
- 🐛 Check browser console and server logs for errors

## Command Reference

### Frontend
```bash
# Serve on port 8000
python -m http.server 8000

# Serve on port 3000
npx http-server -p 3000

# Using PHP
php -S 127.0.0.1:8000
```

### Backend
```bash
npm run dev          # Development with nodemon
npm start            # Production
npm run migrate      # Run database migration
npm test             # Run tests (if configured)
```

### Database
```bash
psql rebook          # Connect to database
\dt                  # List tables
\d users             # Describe users table
DROP DATABASE rebook # Reset (careful!)
```

## Git Commands

```bash
# Clone repo
git clone <repo-url>

# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "Add my feature"

# Push to main
git push origin feature/my-feature
```

## Deployment Checklist

- [ ] Backend running locally
- [ ] Frontend running locally
- [ ] Can register/login
- [ ] Can list books
- [ ] Can publish eBooks
- [ ] Dashboard shows data
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database backup created
- [ ] Security review done

## Performance Tips

1. **Database**: Add indexes for frequently searched fields
2. **Frontend**: Lazy load images and listings
3. **Backend**: Use connection pooling (already configured)
4. **Caching**: Cache search results in localStorage
5. **Images**: Optimize and compress before upload

## Security Reminders

- ✅ Never commit .env file
- ✅ Use strong JWT_SECRET in production
- ✅ Always hash passwords (already done)
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

---

**You're all set! Start building!** 🎉
