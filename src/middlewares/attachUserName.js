import db from '../config/db.js';

export async function attachUserName(req, res, next) {
  try {
    const email = req.user.email;
    const { rows } = await db.query('SELECT first_name, last_name FROM users WHERE email = $1', [email]);
    if (rows.length === 0) throw new Error('User not found');

    req.user.firstName = rows[0].first_name;
    req.user.lastName = rows[0].last_name;
    next();
  } catch (err) {
    res.status(401).json({ status: 1, message: err.message });
  }
}
