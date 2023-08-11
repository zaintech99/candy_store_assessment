import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 4000;

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, transform: true, whitelist: true }));

  await app.listen(PORT);
  const logger = new Logger('main');
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
