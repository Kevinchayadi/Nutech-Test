import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' });
  }

  try {
    const decoded = jwt.verify(token, config().app.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' });
  }
}
