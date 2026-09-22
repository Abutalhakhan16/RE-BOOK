-- ReBook Database Schema

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
  profile_image VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 4.5,
  total_sales INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table (physical books)
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  description TEXT,
  category VARCHAR(100),
  condition VARCHAR(50), -- "Like New", "Good", "Fair", "Poor"
  price DECIMAL(8,2) NOT NULL,
  cover_image VARCHAR(255),
  listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sold BOOLEAN DEFAULT FALSE,
  sold_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ebooks table (digital books)
CREATE TABLE ebooks (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(100),
  cover_image VARCHAR(255),
  file_path VARCHAR(255),
  price_type VARCHAR(10), -- "free" or "paid"
  price DECIMAL(8,2) DEFAULT 0.00,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  reviewer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  ebook_id INTEGER REFERENCES ebooks(id) ON DELETE CASCADE,
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id),
  ebook_id INTEGER REFERENCES ebooks(id),
  seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  seller_earnings DECIMAL(10,2) NOT NULL,
  commission DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50), -- "pending", "completed", "failed"
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_book_or_ebook CHECK (
    (book_id IS NOT NULL AND ebook_id IS NULL) OR
    (book_id IS NULL AND ebook_id IS NOT NULL)
  )
);

-- Create wishlist table
CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  ebook_id INTEGER REFERENCES ebooks(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_book_or_ebook_wishlist CHECK (
    (book_id IS NOT NULL AND ebook_id IS NULL) OR
    (book_id IS NULL AND ebook_id IS NOT NULL)
  )
);

-- Create indexes for faster queries
CREATE INDEX idx_books_seller_id ON books(seller_id);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_sold ON books(sold);
CREATE INDEX idx_ebooks_author_id ON ebooks(author_id);
CREATE INDEX idx_ebooks_genre ON ebooks(genre);
CREATE INDEX idx_sales_buyer_id ON sales(buyer_id);
CREATE INDEX idx_sales_seller_id ON sales(seller_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);

-- Insert sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, bio, rating, total_sales)
VALUES
  ('john_books', 'john@example.com', '$2b$10$examplehash1', 'John', 'Smith', 'Passionate about books and reading!', 4.8, 45),
  ('jane_author', 'jane@example.com', '$2b$10$examplehash2', 'Jane', 'Doe', 'Independent author and book lover', 5.0, 23),
  ('book_collector', 'collector@example.com', '$2b$10$examplehash3', 'Mike', 'Johnson', 'Collectiing rare books since 2015', 4.6, 102);

-- Insert sample books
INSERT INTO books (seller_id, title, author, isbn, description, category, condition, price, views)
VALUES
  (1, 'The Midnight Library', 'Matt Haig', '9780020', 'A captivating story about infinite possibilities', 'Fiction', 'Like New', 6.50, 234),
  (1, 'Project Hail Mary', 'Andy Weir', '9780021', 'An exciting space adventure', 'Science Fiction', 'Good', 8.00, 189),
  (2, 'Atomic Habits', 'James Clear', '9780022', 'Build better habits in this practical guide', 'Self-Help', 'Like New', 7.25, 456),
  (3, 'The Seven Husbands', 'Taylor Jenkins Reid', '9780023', 'Hollywood glamour and romance', 'Romance', 'Good', 5.75, 312);

-- Insert sample ebooks
INSERT INTO ebooks (author_id, title, author_name, description, genre, price_type, price, downloads)
VALUES
  (1, 'Learn Python 3', 'John Smith', 'Complete guide to Python programming for beginners', 'Technology', 'paid', 9.99, 87),
  (2, 'The Forgotten Path', 'Jane Doe', 'An epic fantasy novel with dragons and magic', 'Fantasy', 'paid', 3.99, 234),
  (1, 'Open Source Guide', 'John Smith', 'How to contribute to open source projects', 'Technology', 'free', 0.00, 456);
