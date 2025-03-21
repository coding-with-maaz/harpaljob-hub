const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/jobCategoryController');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategory);

// Protected routes (add auth middleware later)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router; 