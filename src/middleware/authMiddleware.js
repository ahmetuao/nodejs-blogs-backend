const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // "Bearer" ön ekini kaldır
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    // Token'ı doğrula
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Doğrulanmış kullanıcıyı req objesine ekle
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
