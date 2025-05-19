import * as bannerService from "../services/bannerService.js";
import db from "../config/db.js";

export async function getBanners(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const banners = await bannerService.getAllBanners(conn);

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Sukses", data: banners });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 1, message: err.message });
  } finally {
    conn.release();
  }
}
