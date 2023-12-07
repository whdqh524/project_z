import { ValidationError, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter, ResponseInterceptor, KakaoWork, ParameterError } from '@project_z_web_backend/common'
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist : true,
        transform : true,
        forbidNonWhitelisted: true,
        exceptionFactory : (classValidatorErrors: ValidationError[]) => new ParameterError(classValidatorErrors)
      })
  )
  app.enableCors({
    origin: true, credentials:true
  });
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionFilter(new KakaoWork(configService)));
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3006);
}

bootstrap();
