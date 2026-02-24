import { app } from './app';
import { connectDatabase } from './shared/database';
import { env } from './config/env';

const start = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.DB_PORT, () => {
      console.log(`🚀 Auth Service running on port ${env.DB_PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();