const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, booksController.getAllBooks);
router.get('/:id', optionalAuth, booksController.getBook);
router.get('/user/:userId', booksController.getUserBooks);

// Protected routes
router.post('/', verifyToken, booksController.createBook);
router.put('/:id', verifyToken, booksController.updateBook);
router.delete('/:id', verifyToken, booksController.deleteBook);

module.exports = router;
