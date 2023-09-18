import { Server } from 'http';
import app from './app';
import config from './config';
import { RedisClient } from './shared/redis';

async function startServer() {
  await RedisClient.connect();
  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  server.on('close', () => {
    console.log('Server closed');
  });

  return server;
}

function handleExit(server: Server) {
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

async function bootstrap() {
  try {
    const server = await startServer();
    handleExit(server);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
