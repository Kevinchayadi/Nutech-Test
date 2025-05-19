export async function createUser({ email, password, firstName, lastName }, conn) {
  const query = `
    INSERT INTO users (email, password, first_name, last_name, profile_image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, first_name, last_name;
  `;
  const values = [email, password, firstName, lastName, 'default.png'];
  const result = await conn.query(query, values);
  return result.rows[0];
}

export async function findUserByEmail(email, conn) {
  const query = 'SELECT email, first_name, last_name, profile_image FROM users WHERE email = $1';
  const { rows } = await conn.query(query, [email]);
  return rows[0] || null;
}

export async function getFullDataByEmail(email, conn) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await conn.query(query, [email]);
  return rows[0] || null;
}

export async function updateUserByEmail(email, data, conn) {
  const query = `
    UPDATE users
    SET first_name = $1, last_name = $2
    WHERE email = $3
  `;
  const values = [data.first_name, data.last_name, email];
  await conn.query(query, values);
  return await findUserByEmail(email, conn);
}

export async function updateImageByEmail(email, imageName, conn) {
  const query = `UPDATE users SET profile_image = $1 WHERE email = $2`;
  const { rows } = await conn.query(query, [imageName, email]);
  return await findUserByEmail(email, conn);
}

export async function getBalanceByEmail(email, conn) {
  const query = 'SELECT balance FROM users WHERE email = $1';
  const { rows } = await conn.query(query, [email]);
  return rows.length > 0 ? rows[0].balance : null;
}

export async function addBalance(email, amount, conn) {
  const query = `
    UPDATE users
    SET balance = balance + $1
    WHERE email = $2
  `;
  await conn.query(query, [amount, email]);
  return await getBalanceByEmail(email, conn);
}

export async function useBalance(email, amount, conn) {
  const query = `
    UPDATE users
    SET balance = balance - $1
    WHERE email = $2
  `;
  await conn.query(query, [amount, email]);
}
