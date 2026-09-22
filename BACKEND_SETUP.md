# ReBook Backend Setup Guide

## Overview
ReBook is a full-stack marketplace for buying/selling physical books and publishing eBooks. This guide covers backend setup with Node.js, Express, and PostgreSQL.

## Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=rebook
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE rebook;

# Exit psql
\q
```

### 4. Run Migration
```bash
npm run migrate
```

This will:
- Create all tables (users, books, ebooks, reviews, sales, wishlist)
- Create indexes for performance
- Insert sample data

### 5. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `GET /api/auth/user/:userId` - Get public user profile

### Books
- `GET /api/books` - Get all books (with filters)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book listing (protected)
- `PUT /api/books/:id` - Update book (protected)
- `DELETE /api/books/:id` - Delete book (protected)
- `GET /api/books/user/:userId` - Get user's books

**Query Parameters for GET /api/books:**
- `category` - Filter by category
- `condition` - Filter by condition (Like New, Good, Fair, Poor)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search by title or author
- `sort` - Sort by: newest, price-low, price-high, popular

### eBooks
- `GET /api/ebooks` - Get all ebooks (with filters)
- `GET /api/ebooks/:id` - Get single ebook
- `POST /api/ebooks` - Publish ebook (protected)
- `PUT /api/ebooks/:id` - Update ebook (protected)
- `DELETE /api/ebooks/:id` - Delete ebook (protected)
- `GET /api/ebooks/user/:userId` - Get user's ebooks
- `POST /api/ebooks/:id/download` - Record download
- `POST /api/ebooks/:id/rate` - Rate ebook (protected)

**Query Parameters for GET /api/ebooks:**
- `genre` - Filter by genre
- `priceType` - Filter by: free, paid
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search by title or author
- `sort` - Sort by: newest, price-low, price-high, popular, rated

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Create Book Listing
```bash
POST /api/books
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "The Midnight Library",
  "author": "Matt Haig",
  "isbn": "9780020123456",
  "description": "A captivating story about infinite possibilities",
  "category": "Fiction",
  "condition": "Like New",
  "price": 6.50,
  "coverImage": "https://example.com/image.jpg"
}

Response:
{
  "message": "Book listed successfully",
  "book": {
    "id": 1,
    "seller_id": 1,
    "title": "The Midnight Library",
    ...
  }
}
```

### Publish eBook
```bash
POST /api/ebooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Learn Python 3",
  "authorName": "John Doe",
  "description": "Complete guide to Python programming",
  "genre": "Technology",
  "priceType": "paid",
  "price": 9.99,
  "coverImage": "https://example.com/cover.jpg",
  "filePath": "/uploads/learn-python.pdf"
}

Response:
{
  "message": "eBook published successfully",
  "ebook": {
    "id": 1,
    "author_id": 1,
    "title": "Learn Python 3",
    ...
  }
}
```

## Frontend Integration

The frontend is already set up with `api-service.js` which provides a JavaScript client for all API endpoints.

### Usage Example
```javascript
// Import API service
// Already included in HTML: <script src="api-service.js"></script>

// Register
await apiService.register({
  username: 'john',
  email: 'john@example.com',
  password: 'password123'
});

// Login
await apiService.login('john@example.com', 'password123');

// Get all books
const books = await apiService.getAllBooks({ category: 'Fiction' });

// Get current user profile
const profile = await apiService.getProfile();

// Create book listing
await apiService.createBook({
  title: 'My Book',
  author: 'Me',
  category: 'Fiction',
  condition: 'Good',
  price: 10.99
});
```

## Database Schema

### Users
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password_hash` - Bcrypt hashed password
- `first_name`, `last_name` - User name
- `bio` - User biography
- `profile_image` - Profile image URL
- `rating` - Seller rating (0-5)
- `total_sales` - Total sales count
- `total_earnings` - Total earnings in dollars

### Books
- `id` - Primary key
- `seller_id` - Foreign key to users
- `title`, `author`, `isbn` - Book info
- `description` - Book description
- `category` - Book category
- `condition` - Condition (Like New, Good, Fair, Poor)
- `price` - Sale price
- `cover_image` - Cover image URL
- `sold` - Boolean sold status
- `views` - View count
- `created_at`, `updated_at` - Timestamps

### eBooks
- `id` - Primary key
- `author_id` - Foreign key to users
- `title`, `author_name` - eBook title and author
- `description` - eBook description
- `genre` - eBook genre
- `price_type` - free or paid
- `price` - Price (0 if free)
- `cover_image` - Cover image URL
- `file_path` - Path to PDF/EPUB file
- `published_at` - Publication date
- `views` - View count
- `downloads` - Download count
- `rating` - Average rating
- `created_at`, `updated_at` - Timestamps

## Troubleshooting

### Database Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:5432

Solution: Make sure PostgreSQL is running
$ sudo service postgresql start  # Linux
$ brew services start postgresql  # macOS
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000

Solution: Change PORT in .env or kill process using port 5000
$ lsof -i :5000
$ kill -9 <PID>
```

### JWT Token Errors
```
Error: Invalid token

Solution: Ensure you're sending token in Authorization header:
Authorization: Bearer {token}
```

## Deployment

### Deploy to Heroku
```bash
# Create Heroku app
heroku create rebook-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main

# Run migration
heroku run npm run migrate
```

### Deploy to AWS
1. Set up RDS PostgreSQL database
2. Deploy Node app to EC2 or Lambda
3. Configure environment variables in deployment settings
4. Run migration script on deployment

## API Testing

Use Postman or curl to test endpoints:

```bash
# Test health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Get all books
curl http://localhost:5000/api/books

# Get books by category
curl "http://localhost:5000/api/books?category=Fiction"
```

## Support

For issues or questions, refer to the code comments or create an issue in the repository.
