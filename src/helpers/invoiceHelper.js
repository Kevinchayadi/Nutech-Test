import db from "../config/db.js"; 

export async function generateInvoice() {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ''); 


  const query = `
    SELECT COUNT(*) AS count
    FROM transactions
    WHERE DATE(created_at) = CURRENT_DATE
  `;

  const { rows } = await db.query(query);
  const countToday = (parseInt(rows[0].count) + 21);

  const paddedCount = String(countToday).padStart(3, '0');

  const invoiceNumber = `INV${dateStr}-${paddedCount}`;

  return invoiceNumber;
}