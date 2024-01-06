import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: ['http://localhost:8000'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/docs', '/docs.json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('cats community')
    .setDescription('고양이 커뮤니티')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
