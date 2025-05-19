import { validate } from "../helpers/validator.js";
import * as transactionService from "../services/transactionService.js";
import db from "../config/db.js";

export async function getBalance(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;
    const balance = await transactionService.getBalanceByEmail(userEmail, conn);

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Sukses", data: { balance } });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message });
  } finally {
    conn.release();
  }
}

export async function topUp(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;
    const errors = validate("top up amount", req.body?.top_up_amount).run();
    if (errors.length > 0) {
      throw new Error(errors);
    }

    const amount = req.body.top_up_amount;
    const balance = await transactionService.topUpBalance(
      userEmail,
      amount,
      conn
    );

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Top up berhasil", data: { balance } });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message });
  } finally {
    conn.release();
  }
}

export async function Transaction(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;
    const errors = validate("service code", req.body?.service_code)
      .required()
      .run();
    if (errors.length > 0) {
      throw new Error(errors);
    }
    const transactionData = req.body.service_code;
    const transaction = await transactionService.createTransaction(
      userEmail,
      transactionData,
      conn
    );
    await conn.query("COMMIT");

    res.json({ status: 0, message: "Transaksi berhasil", data: transaction });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message });
  } finally {
    conn.release();
  }
}

export async function getTransactionHistory(req, res) {
  const conn = await db.connect();
  try {
    await conn.query("BEGIN");
    const userEmail = req.user.email;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const offset = req.query.offset ? parseInt(req.query.offset) : null;

    const history = await transactionService.getTransactionHistory(
      userEmail,
      limit,
      offset,
      conn
    );

    await conn.query("COMMIT");
    res.json({ status: 0, message: "Sukses", data: history });
  } catch (err) {
    await conn.query("ROLLBACK");
    res.status(400).json({ status: 102, message: err.message, data: null });
  } finally {
    conn.release();
  }
}
