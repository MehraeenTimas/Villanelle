import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database';
import { config } from './config/app.config';
import { errorHandler } from './common/middleware/errorHandler';
import { logger } from './common/utils/logger';
import authRoutes from './features/auth/auth.Routes';
import todoRoutes from './features/todo/todo.routes';
import chatRoutes from './features/chat/chat.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Personal Assistant API is running', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await initDatabase();
    app.listen(config.port, () => {
      logger.info(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
