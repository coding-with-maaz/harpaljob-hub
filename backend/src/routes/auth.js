
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { register, login, verifyEmail, resendVerification } = require('../controllers/authController');

// Register validation middleware
const registerValidation = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['user', 'employer']).optional()
];

// Login validation middleware
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Email verification validation middleware
const verifyEmailValidation = [
  body('email').isEmail().normalizeEmail(),
  body('token').notEmpty()
];

// Resend verification validation middleware
const resendVerificationValidation = [
  body('email').isEmail().normalizeEmail()
];

// Register route
router.post('/register', registerValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, register);

// Login route
router.post('/login', loginValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, login);

// Verify email route
router.post('/verify-email', verifyEmailValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, verifyEmail);

// Resend verification email route
router.post('/resend-verification', resendVerificationValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, resendVerification);

module.exports = router;
