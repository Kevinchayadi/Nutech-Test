import * as authService from "../services/authService.js";
import { validate } from "../helpers/validator.js";
import db from "../config/db.js";

export async function register(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const errors = [
      ...validate("email", req.body?.email).required().email().run(),
      ...validate("password", req.body?.password).required().min(8).run(),
      ...validate("first_name", req.body?.first_name).required().string().run(),
      ...validate("last_name", req.body?.last_name).required().string().run(),
    ];

    if (errors.length > 0) {
      return res.status(400).json({
        status: 102,
        message: "Paramter email tidak sesuai format",
        errors,
      });
    }

    await authService.registerUser(req.body, conn);

    await conn.query("COMMIT");
    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message, data: null });
  } finally {
    conn.release();
  }
}

export async function login(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const errors = [
      ...validate("email", req.body?.email).required().email().run(),
      ...validate("password", req.body?.password).required().min(8).run(),
    ];

    if (errors.length > 0) {
      const error = new Error(
        "Paramter email atau password tidak sesuai format!"
      );
      error.status = 400;
      error.code = 102;
      throw error;
    }

    const token = await authService.loginUser(req.body, conn);
    if (!token) {
      const error = new Error("Email atau password salah");
      error.status = 401;
      error.code = 103;
      throw error;
    }
    await conn.query("COMMIT");
    res.json({
      status: 0,
      message: "Sukses",
      data: { token: token },
    });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(err.status || 500).json({
      status: err.code,
      message: err.message || "Internal Server Error",
      data: null,
    });
  } finally {
    conn.release();
  }
}
