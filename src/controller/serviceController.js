import * as servicesService from "../services/serviceService.js";
import db from "../config/db.js";

export async function getServices(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const services = await servicesService.getAllServices(conn);

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Sukses", data: services });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 1, message: err.message });
  } finally {
    conn.release();
  }
}
