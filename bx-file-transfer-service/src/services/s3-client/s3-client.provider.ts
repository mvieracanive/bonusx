import { Provider } from '@nestjs/common';
import { S3ClientService } from './s3-client.service';

export const S3_CLIENT_SERVICE_PROVIDER_SYMBOL = Symbol.for('S3ClientService');

export const S3ClientServiceProvider: Provider = {
  provide: S3_CLIENT_SERVICE_PROVIDER_SYMBOL,
  useClass: S3ClientService,
};
