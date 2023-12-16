import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file/file.controller';
import { PrettyMessagePreviewModule } from '../services/pretty-message-preview/pretty-message-preview.module';
import { S3ClientModule } from '../services/s3-client/s3-client.module';
import { GlobalModule } from './global.module';
import { MqttModule } from './mqtt.module';
import { FileMqttController } from 'src/controllers/file-mqtt/file-mqtt.controller';

@Module({
  imports: [
    MqttModule.forRoot({ isGlobal: true }),
    GlobalModule.forRoot({ isGlobal: true }),
    PrettyMessagePreviewModule,
    S3ClientModule,
  ],
  controllers: [FileMqttController, FileController],
  providers: [],
})
export class AppModule {}
