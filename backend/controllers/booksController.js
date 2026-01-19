const pool = require('../config/database');

// Get all books with optional filters
exports.getAllBooks = async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice, search, sort = 'newest' } = req.query;
    let query = 'SELECT b.*, u.username, u.rating FROM books b JOIN users u ON b.seller_id = u.id WHERE b.sold = FALSE';
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND b.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (condition) {
      query += ` AND b.condition = $${paramIndex}`;
      params.push(condition);
      paramIndex++;
    }

    if (minPrice) {
      query += ` AND b.price >= $${paramIndex}`;
      params.push(minPrice);
      paramIndex++;
    }

    if (maxPrice) {
      query += ` AND b.price <= $${paramIndex}`;
      params.push(maxPrice);
      paramIndex++;
    }

    if (search) {
      query += ` AND (b.title ILIKE $${paramIndex} OR b.author ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Sort
    if (sort === 'price-low') query += ' ORDER BY b.price ASC';
    else if (sort === 'price-high') query += ' ORDER BY b.price DESC';
    else if (sort === 'popular') query += ' ORDER BY b.views DESC';
    else query += ' ORDER BY b.created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single book
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT b.*, u.id as seller_id, u.username, u.rating FROM books b JOIN users u ON b.seller_id = u.id WHERE b.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Increment view count
    await pool.query('UPDATE books SET views = views + 1 WHERE id = $1', [id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new book listing
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, description, category, condition, price, coverImage } = req.body;

    if (!title || !author || !category || !condition || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO books (seller_id, title, author, isbn, description, category, condition, price, cover_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [req.user.id, title, author, isbn || null, description || '', category, condition, price, coverImage || null]
    );

    res.status(201).json({
      message: 'Book listed successfully',
      book: result.rows[0]
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update book listing
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, category, condition, price, coverImage } = req.body;

    // Check ownership
    const bookResult = await pool.query('SELECT seller_id FROM books WHERE id = $1', [id]);

    if (bookResult.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (bookResult.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const result = await pool.query(
      'UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author), description = COALESCE($3, description), category = COALESCE($4, category), condition = COALESCE($5, condition), price = COALESCE($6, price), cover_image = COALESCE($7, cover_image), updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [title, author, description, category, condition, price, coverImage, id]
    );

    res.json({
      message: 'Book updated successfully',
      book: result.rows[0]
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete book listing
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership
    const bookResult = await pool.query('SELECT seller_id FROM books WHERE id = $1', [id]);

    if (bookResult.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (bookResult.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.query('DELETE FROM books WHERE id = $1', [id]);

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's books
exports.getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT * FROM books WHERE seller_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user books error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
