export async function insertTransaction(user, service, invoiceNumber,conn) {
  const query = `
    INSERT INTO transactions (
      user_id, service_id, invoice_number, payment_type,
      description, created_at, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING id, service_id, invoice_number, payment_type,
              description, created_at
  `;

  const insertValues  = [
    user.id,
    service.id,
    invoiceNumber,
    'PAYMENT', 
    'paymnent for '+ service.service_name,
  ];

  const insertResult = await conn.query(query, insertValues,);
  const transactionId = insertResult.rows[0].id;

  const selectQuery = `
    SELECT
      t.invoice_number,
      s.service_code,
      s.service_name,
      t.payment_type AS transaction_type,
      s.service_tarif,
      t.created_at AS create_on
    FROM transactions t
    JOIN services s ON s.id = t.service_id
    WHERE t.id = $1
  `;

  const { rows } = await conn.query(selectQuery, [transactionId]);
  return rows[0];
}

export async function getTransactionHistory(userId, limit, offset, conn) {
  let query = `
    SELECT
      t.invoice_number,
      t.payment_type AS transaction_type,
      t.description,
      s.service_tarif,
      t.created_at AS created_on
    FROM transactions t
    JOIN services s ON s.id = t.service_id
    WHERE user_id = $1
    ORDER BY t.created_at DESC
  `;

  const values = [userId];
  if (limit !== undefined && offset !== undefined) {
    query += ` LIMIT $2 OFFSET $3`;
    values.push(limit, offset);
  } else if (limit !== undefined) {
    query += ` LIMIT $2`;
    values.push(limit);
  }

  const { rows } = await conn.query(query, values);
  return rows;
}
