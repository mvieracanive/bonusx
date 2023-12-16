import { Controller, Inject, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TopicForSubscriptionCollection } from '../../configs/env';
import { S3ClientService } from 'src/services/s3-client/s3-client.service';
import { S3_CLIENT_SERVICE_PROVIDER_SYMBOL } from 'src/services/s3-client/s3-client.provider';
import { S3 } from 'aws-sdk';
import { UpFileDto } from 'src/dtos/file/file-upload.dto';
import { DownFileDto } from 'src/dtos/file/file-download.dto';

@Controller('/file-mqtt')
export class FileMqttController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private _logger: Logger,
    @Inject(S3_CLIENT_SERVICE_PROVIDER_SYMBOL) private s3Service: S3ClientService
  ) {}

  @MessagePattern(TopicForSubscriptionCollection.fileUpload)
  public handleUpload(@Payload() request: UpFileDto, @Ctx() context: MqttContext): Promise<S3.ManagedUpload.SendData> {

    return this.s3Service.uploadFile(request.key, request.imgBase64)
  }

  @MessagePattern(TopicForSubscriptionCollection.fileDownload)
  public handleDownload(@Payload() request: DownFileDto, @Ctx() context: MqttContext): Promise<S3.GetObjectOutput> {

    return this.s3Service.downloadFile(request.key)
  }
}
