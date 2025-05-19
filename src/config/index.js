import dotenv from 'dotenv';
dotenv.config();

export default function config() {
  return {
    app: {
      name: process.env.APP_NAME || 'MyApp',
      port: parseInt(process.env.APP_PORT) || 3000,
      url: process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`,
      debug: process.env.APP_DEBUG === 'True' || false,
      env: process.env.APP_ENV?.trim().toLowerCase() || 'development',
      jwtSecret: process.env.JWT_SECRET || 'mysecret',
    },
    db: {
      client: process.env.DB_CLIENT || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      name: process.env.DB_NAME || '',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
    },
  };
}
