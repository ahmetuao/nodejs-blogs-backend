const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Yetkilendirilmiş bir endpoint
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    message: 'You have access to this protected route.',
    user: req.user, // Doğrulanmış kullanıcı bilgisi
  });
});

module.exports = router;
