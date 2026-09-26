import 'dotenv/config';

const env = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  API_KEY: process.env.API_KEY || '',
};

export default env;
