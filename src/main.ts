import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvVariables } from './common/enums/envVariables.enum';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<string>(EnvVariables.PORT);

  await app.listen(port);

  console.log(`App is running on http://localhost:${port}/api`);
}
bootstrap();
