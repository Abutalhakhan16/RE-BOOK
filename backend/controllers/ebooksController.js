const pool = require('../config/database');

// Get all ebooks with optional filters
exports.getAllEbooks = async (req, res) => {
  try {
    const { genre, priceType, minPrice, maxPrice, search, sort = 'newest' } = req.query;
    let query = 'SELECT e.*, u.username, u.rating FROM ebooks e JOIN users u ON e.author_id = u.id';
    const params = [];
    let paramIndex = 1;
    let hasWhere = false;

    if (genre) {
      query += ` WHERE e.genre = $${paramIndex}`;
      params.push(genre);
      paramIndex++;
      hasWhere = true;
    }

    if (priceType) {
      query += hasWhere ? ' AND' : ' WHERE';
      query += ` e.price_type = $${paramIndex}`;
      params.push(priceType);
      paramIndex++;
      hasWhere = true;
    }

    if (minPrice) {
      query += hasWhere ? ' AND' : ' WHERE';
      query += ` e.price >= $${paramIndex}`;
      params.push(minPrice);
      paramIndex++;
      hasWhere = true;
    }

    if (maxPrice) {
      query += hasWhere ? ' AND' : ' WHERE';
      query += ` e.price <= $${paramIndex}`;
      params.push(maxPrice);
      paramIndex++;
      hasWhere = true;
    }

    if (search) {
      query += hasWhere ? ' AND' : ' WHERE';
      query += ` (e.title ILIKE $${paramIndex} OR e.author_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Sort
    if (sort === 'price-low') query += ' ORDER BY e.price ASC';
    else if (sort === 'price-high') query += ' ORDER BY e.price DESC';
    else if (sort === 'popular') query += ' ORDER BY e.downloads DESC';
    else if (sort === 'rated') query += ' ORDER BY e.rating DESC';
    else query += ' ORDER BY e.published_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get ebooks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single ebook
exports.getEbook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT e.*, u.id as author_id, u.username, u.rating FROM ebooks e JOIN users u ON e.author_id = u.id WHERE e.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'eBook not found' });
    }

    // Increment view count
    await pool.query('UPDATE ebooks SET views = views + 1 WHERE id = $1', [id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get ebook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Publish new ebook
exports.publishEbook = async (req, res) => {
  try {
    const { title, authorName, description, genre, priceType, price, coverImage, filePath } = req.body;

    if (!title || !authorName || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO ebooks (author_id, title, author_name, description, genre, price_type, price, cover_image, file_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [req.user.id, title, authorName, description || '', genre, priceType || 'free', price || 0, coverImage || null, filePath || null]
    );

    res.status(201).json({
      message: 'eBook published successfully',
      ebook: result.rows[0]
    });
  } catch (error) {
    console.error('Publish ebook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update ebook
exports.updateEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genre, priceType, price, coverImage } = req.body;

    // Check ownership
    const ebookResult = await pool.query('SELECT author_id FROM ebooks WHERE id = $1', [id]);

    if (ebookResult.rows.length === 0) {
      return res.status(404).json({ error: 'eBook not found' });
    }

    if (ebookResult.rows[0].author_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const result = await pool.query(
      'UPDATE ebooks SET title = COALESCE($1, title), description = COALESCE($2, description), genre = COALESCE($3, genre), price_type = COALESCE($4, price_type), price = COALESCE($5, price), cover_image = COALESCE($6, cover_image), updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, description, genre, priceType, price, coverImage, id]
    );

    res.json({
      message: 'eBook updated successfully',
      ebook: result.rows[0]
    });
  } catch (error) {
    console.error('Update ebook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete ebook
exports.deleteEbook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership
    const ebookResult = await pool.query('SELECT author_id FROM ebooks WHERE id = $1', [id]);

    if (ebookResult.rows.length === 0) {
      return res.status(404).json({ error: 'eBook not found' });
    }

    if (ebookResult.rows[0].author_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.query('DELETE FROM ebooks WHERE id = $1', [id]);

    res.json({ message: 'eBook deleted successfully' });
  } catch (error) {
    console.error('Delete ebook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's ebooks
exports.getUserEbooks = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT * FROM ebooks WHERE author_id = $1 ORDER BY published_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user ebooks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Record ebook download
exports.recordDownload = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('UPDATE ebooks SET downloads = downloads + 1 WHERE id = $1', [id]);

    res.json({ message: 'Download recorded' });
  } catch (error) {
    console.error('Record download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Rate ebook
exports.rateEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Add review
    await pool.query(
      'INSERT INTO reviews (reviewer_id, ebook_id, rating, comment) VALUES ($1, $2, $3, $4)',
      [req.user.id, id, rating, comment || null]
    );

    // Update average rating
    const result = await pool.query(
      'UPDATE ebooks SET rating = (SELECT AVG(rating) FROM reviews WHERE ebook_id = $1) WHERE id = $1 RETURNING rating',
      [id]
    );

    res.json({
      message: 'Rating submitted successfully',
      averageRating: result.rows[0].rating
    });
  } catch (error) {
    console.error('Rate ebook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
