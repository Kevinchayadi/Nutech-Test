import db from '../config/db.js';

export async function getAllBanners(conn) {
  const query = 'SELECT id, banner_name, banner_image, description FROM banners ORDER BY id DESC';
  const { rows } = await conn.query(query);
  return rows;
}
