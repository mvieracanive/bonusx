import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationError } from 'class-validator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { logger } from './configs/logger';
import mqttConfig from './configs/mqtt';
import { DtoValidationException } from './exceptions/dto-validation-exception';
import { AppModule } from './modules/app.module';
import { handleBootstrapIssue } from './utils/handle-bootstrap-issue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.connectMicroservice<MicroserviceOptions>({
    ...mqttConfig,
  });

  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);

  const exceptionFactory = function (errors: ValidationError[]) {
    return new DtoValidationException(errors);
  };

  const globalValidationPipe = new ValidationPipe({
    transform: true,
    enableDebugMessages: true,
    exceptionFactory,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(globalValidationPipe);
  app.enableShutdownHooks();

  process.on('SIGTERM', function beforeExitFromProcess() {
    loggerService.log('Exit signal');
    app.close();
    process.exit(0);
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap().catch(handleBootstrapIssue);
