import 'dotenv/config';

const env = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aws-simulado',
  PORT: parseInt(process.env.PORT || '3001', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  API_KEY: process.env.API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
};

export default env;
