# ReBook - Full Stack Book Marketplace

A modern, full-stack marketplace platform for buying/selling physical books and publishing eBooks. Built with Node.js/Express backend, PostgreSQL database, and a responsive frontend with vanilla HTML/CSS/JavaScript.

## Features

- **User Authentication**: Register, login, and profile management
- **Book Marketplace**: Sell refurbished books with detailed listings
- **eBook Publishing**: Publish digital books with flexible pricing (free or paid)
- **Smart Search & Filtering**: Browse books by category, condition, price, and more
- **Creator Dashboard**: Manage your listings, track earnings, and view statistics
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Modern UI**: Beautiful dark theme with gradient accents and smooth animations

## Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- Responsive grid and flexbox layouts
- Modern design patterns with gradient accents

### Backend
- **Node.js + Express.js** - API server
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Deployment Ready
- Can be deployed to Heroku, AWS, Azure, or any Node.js hosting
- Docker-ready (add Dockerfile as needed)
- Environment-based configuration

## Project Structure

```
ReBook/
├── frontend/
│   ├── index.html              # Home page with hero section
│   ├── auth.html               # Login page
│   ├── register.html           # Sign up page
│   ├── explore.html            # Browse all books
│   ├── sell-upload.html        # List a book for sale
│   ├── publish-ebook.html      # Publish an eBook
│   ├── dashboard.html          # Creator dashboard
│   ├── api-service.js          # API client library
│   ├── script.js               # Global scripts
│   └── styles.css              # Global styles
│
├── backend/
│   ├── server.js               # Express app entry point
│   ├── package.json            # Node dependencies
│   ├── .env.example            # Environment variables template
│   ├── config/
│   │   └── database.js         # PostgreSQL connection
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── booksController.js  # Book CRUD
│   │   └── ebooksController.js # eBook CRUD
│   ├── routes/
│   │   ├── auth.js             # Auth endpoints
│   │   ├── books.js            # Book endpoints
│   │   └── ebooks.js           # eBook endpoints
│   └── scripts/
│       └── migrate.js          # Database migration runner
│
├── scripts/
│   └── init-db.sql             # Database schema
│
├── BACKEND_SETUP.md            # Backend setup guide
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

## Quick Start

### Prerequisites
- Node.js 14+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Database**
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

3. **Create Database**
   ```bash
   createdb rebook
   ```

4. **Run Migration**
   ```bash
   npm run migrate
   ```

5. **Start Server**
   ```bash
   npm run dev  # Development with auto-reload
   # or
   npm start    # Production
   ```

Server will run on `http://localhost:5000`

### Frontend Setup

No build step needed! Simply open the HTML files in a browser or serve them with:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Books Endpoints

```
GET /api/books?category=Fiction&sort=newest&search=midnight
POST /api/books (auth required)
GET /api/books/:id
PUT /api/books/:id (auth required)
DELETE /api/books/:id (auth required)
GET /api/books/user/:userId
```

### eBooks Endpoints

```
GET /api/ebooks?genre=Fiction&sort=popular&priceType=paid
POST /api/ebooks (auth required)
GET /api/ebooks/:id
PUT /api/ebooks/:id (auth required)
DELETE /api/ebooks/:id (auth required)
GET /api/ebooks/user/:userId
POST /api/ebooks/:id/download
POST /api/ebooks/:id/rate (auth required)
```

## Usage

### As a Buyer

1. Visit the home page and explore books
2. Use the Explore page to search and filter books
3. View detailed book information
4. Create an account to make purchases (future integration)

### As a Seller

1. Create an account via the Sign Up page
2. Click "Sell" to list a physical book
3. Fill in book details: title, author, condition, price
4. Your book appears in the marketplace immediately

### As an Author

1. Create an account via the Sign Up page
2. Click "Publish" to create an eBook
3. Choose pricing: free or paid ($0.99-$99.99)
4. Upload your eBook file
5. Earn 85% of sales (15% platform fee)

## Database Schema

### Users Table
- id, username, email, password_hash
- first_name, last_name, bio, profile_image
- rating, total_sales, total_earnings
- created_at, updated_at

### Books Table
- id, seller_id, title, author, isbn
- description, category, condition, price
- cover_image, sold, views
- created_at, updated_at

### eBooks Table
- id, author_id, title, author_name
- description, genre, price_type, price
- cover_image, file_path
- published_at, views, downloads, rating

### Additional Tables
- reviews (for ratings)
- sales (transaction history)
- wishlist (saved books)

## Frontend Features

- **Dark Theme UI** - Modern, eye-friendly design
- **Responsive Layout** - Mobile, tablet, desktop support
- **Search & Filter** - Find books by category, price, condition
- **Gradient Accents** - Beautiful purple, pink, cyan color scheme
- **Smooth Animations** - Hover effects and transitions
- **Form Validation** - Client-side input validation
- **API Integration** - Seamless backend communication

## Authentication

- JWT-based authentication
- Tokens stored in localStorage
- Auto-login persistence
- Protected routes and API endpoints
- Password hashing with bcryptjs (10 salt rounds)

## Earning Model

### Physical Books (Sellers)
- Platform keeps 30%
- Seller earns 70% of sale price

### eBooks (Authors)
- Platform keeps 15%
- Author earns 85% of sale price
- Free eBooks generate no revenue (exposure/audience building)

## Deployment

### Deploy Frontend to Netlify/Vercel
1. Push frontend files to GitHub
2. Connect to Netlify/Vercel
3. Deploy with one click

### Deploy Backend to Heroku
```bash
# Create Heroku app
heroku create rebook-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main

# Run migration
heroku run npm run migrate
```

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=rebook

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Client
CLIENT_URL=http://localhost:3000
```

## Testing

### Manual API Testing
```bash
# Test health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

Use Postman for more detailed API testing.

## Performance Optimization

- Database indexes on frequently queried fields
- Lazy loading for book listings
- Optimized image handling
- CSS minification
- Debounced search inputs
- Connection pooling with PostgreSQL

## Security Features

- Password hashing with bcryptjs
- JWT token validation
- CORS protection
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- Environment variable configuration
- No sensitive data in logs

## Known Limitations & Future Enhancements

- Payment processing (Stripe integration planned)
- Image upload (currently URL-based)
- Advanced analytics dashboard
- Messaging system between users
- Book recommendations engine
- Social features (reviews, ratings, comments)
- Inventory management for sellers
- Discount codes and promotions

## Troubleshooting

### Port Already in Use
```bash
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check credentials in .env
- Verify database exists

### JWT Token Issues
- Ensure JWT_SECRET is set in .env
- Token must be included in Authorization header
- Check token expiration

### CORS Issues
- Verify CLIENT_URL in .env
- Backend must have matching origin in CORS config

## Contributing

This is a hackathon project built as a proof of concept. Contributions welcome!

## License

MIT License - feel free to use for learning or commercial projects.

## Support

For issues or questions:
1. Check BACKEND_SETUP.md for detailed backend documentation
2. Review the API endpoints documentation
3. Check error messages in browser console and server logs
4. Verify environment variables are correctly set

## Author

Built with ❤️ for the ReBook hackathon

---

**Happy Reading and Happy Selling!**
