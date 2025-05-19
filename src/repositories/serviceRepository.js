export async function getAllServices(conn) {
  const query = 'SELECT service_code, service_name, service_icon, service_tarif FROM services ORDER BY service_name ASC';
  const { rows } = await conn.query(query);
  return rows;
}
export async function getServiceByCode(serviceCode, conn) {
  const query = 'SELECT service_code, service_name, service_icon, service_tarif FROM services where service_code = $1';
  const value = [serviceCode]
  const { rows } = await conn.query(query, value);
  return rows[0];
}
export async function getFullDataByCode(serviceCode, conn) {
  const query = 'SELECT * FROM services where service_code = $1';
  const value = [serviceCode]
  const { rows } = await conn.query(query, value);
  return rows[0];
}
