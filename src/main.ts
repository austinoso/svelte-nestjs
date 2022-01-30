import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Helmet());
  await app.listen(3000);
}
bootstrap();
