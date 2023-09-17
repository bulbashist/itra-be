import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
declare const module: any;

/*
b5d0a008cf519a1 IMGUR-CLIENT-ID
3ea43436606668ef1ccacd618052aebf9127b943
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://application-ld69.onrender.com'],
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
