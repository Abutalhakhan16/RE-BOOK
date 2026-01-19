const express = require('express');
const router = express.Router();
const ebooksController = require('../controllers/ebooksController');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, ebooksController.getAllEbooks);
router.get('/:id', optionalAuth, ebooksController.getEbook);
router.get('/user/:userId', ebooksController.getUserEbooks);
router.post('/:id/download', ebooksController.recordDownload);

// Protected routes
router.post('/', verifyToken, ebooksController.publishEbook);
router.put('/:id', verifyToken, ebooksController.updateEbook);
router.delete('/:id', verifyToken, ebooksController.deleteEbook);
router.post('/:id/rate', verifyToken, ebooksController.rateEbook);

module.exports = router;
