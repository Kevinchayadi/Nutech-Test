import * as profileService from "../services/profileService.js";
import { validate } from "../helpers/validator.js";
import db from "../config/db.js";

export async function getProfile(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email; // diasumsikan di authMiddleware sudah attach user info
    const profile = await profileService.getProfileByEmail(userEmail, conn);

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Sukses", data: profile });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(401).json({ status: 108, message: err.message });
  } finally {
    conn.release();
  }
}

export async function updateProfile(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;
    const errors = [
      ...validate("first_name", req.body.first_name).required().string().run(),
      ...validate("last_name", req.body.last_name).required().string().run(),
    ];

    if (errors.length > 0) {
      const error = new Error(
        "Paramter first name atau last name tidak sesuai format!"
      );
      error.status = 400;
      error.code = 102;
      throw error;
    }
    const data = await profileService.updateProfile(userEmail, req.body, conn);

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Update Pofile berhasil", data: data });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message });
  } finally {
    conn.release();
  }
}

export async function updateProfileImage(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;

    if (!req.file) {
      throw new Error("Gambar tidak ditemukan!");
    }

    const fileName = req.file.filename;
    const urlImage = await profileService.updateProfileImage(
      userEmail,
      fileName,
      conn
    );

    await conn.query("COMMIT");
    res.json({
      status: 0,
      message: "Berhasil mengubah foto profile",
      data: { image_url: urlImage },
    });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message });
  } finally {
    conn.release();
  }
}
