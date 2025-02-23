import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Using validations globally <--- Global validation configuration for the application --->
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0].constraints
          ? Object.values(errors[0].constraints)[0]
          : 'Validation error';
        return new BadRequestException(firstError);
      },
    }),
  );

  app.use(cookieParser(process.env.PARSER_SECRET || 'PARSER_SECRET'));

  app.enableCors({
    origin: ['http://192.168.31.101:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
