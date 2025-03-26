
const jwt = require('jsonwebtoken');
const { User } = require('../models/associations');
const crypto = require('crypto');
const { Op } = require('sequelize');

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Register new user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, companyName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || 'user',
      companyName,
      isActive: false, // User is inactive until email is verified
      verificationToken,
      verificationExpires
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // TODO: In a real application, send verification email here
    // For now, we'll just return the verification URL in the response
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        },
        token,
        verificationUrl // Remove this in production, send email instead
      },
      message: 'Registration successful. Please verify your email.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active (email verified)
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Email not verified. Please check your inbox for verification link.'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.body;

    // Find user with the given email and verification token
    const user = await User.findOne({
      where: {
        email,
        verificationToken: token,
        verificationExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      // Check if token exists but expired
      const expiredUser = await User.findOne({
        where: {
          email,
          verificationToken: token,
          verificationExpires: { [Op.lte]: new Date() }
        }
      });

      if (expiredUser) {
        return res.status(410).json({
          success: false,
          message: 'Verification link has expired. Please request a new one.'
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid verification token.'
      });
    }

    // Update user to active and clear verification token
    user.isActive = true;
    user.verificationToken = null;
    user.verificationExpires = null;
    await user.save();

    // Generate JWT token for auto login
    const authToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Email verified successfully.',
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token: authToken
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying email',
      error: error.message
    });
  }
};

// Resend verification email
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already verified
    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Email already verified'
      });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user
    user.verificationToken = verificationToken;
    user.verificationExpires = verificationExpires;
    await user.save();

    // TODO: In a real application, send verification email here
    // For now, we'll just return the verification URL in the response
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    res.json({
      success: true,
      message: 'Verification email sent successfully.',
      data: {
        verificationUrl // Remove this in production, send email instead
      }
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resending verification email',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification
};
