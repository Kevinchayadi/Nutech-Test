import { Pool } from 'pg';
import config from '../config/index.js';

const pool = new Pool({
  connectionString: postgresql://postgres:hudBOjBzbwywfNjcdSiDIepTOuDHbLUx@postgres.railway.internal:5432/railway,
  ssl: {
    rejectUnauthorized: false, 
  },
});

export default pool;

// const pool = new Pool({
//     host: config().db.host,
//     port: config().db.port,
//     user: config().db.user,
//     password: config().db.password,
//     database: config().db.name,
//   });
// export default pool;
