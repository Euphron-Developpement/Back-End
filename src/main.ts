import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Euphron API")
    .setDescription("API of Euphron project")
    .setVersion("1.0")
    .addTag("Euphron")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen({
    port: 3000,
    host: '0.0.0.0',
  });
}
bootstrap();
