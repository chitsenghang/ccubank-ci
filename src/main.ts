// import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/exception-filter/global.exception-filter';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  Logger.log(`Running On App Env ${process.env.NODE_ENV}`);
  Logger.log(`Running On App Port ${process.env.PORT}`);
  app.use(new RequestContextMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (error) => new BadRequestException(error)
    })
  );
  const config = new DocumentBuilder()
    .setTitle('API ccubank core api documentation')
    .setDescription('The api ccubank for website')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*'
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
  await app.listen(process.env.PORT);
}
bootstrap();
