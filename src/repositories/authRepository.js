export async function findUserByEmail(email, conn) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await conn.query(query, values);
  return result.rows[0];
}

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
