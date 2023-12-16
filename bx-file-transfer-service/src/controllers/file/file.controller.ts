import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { TopicForSubscriptionCollection } from "src/configs/env";
import { DownFileDto } from "src/dtos/file/file-download.dto";
import { UpFileDto } from "src/dtos/file/file-upload.dto";
import { MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL } from "src/services/mqtt-client/mqtt-client.provider";
import { MqttClientService } from "src/services/mqtt-client/mqtt-client.service";

@Controller('file')
export class FileController {
    constructor(
       @Inject(MQTT_CLIENT_SERVICE_PROVIDER_SYMBOL) private mqttClient: MqttClientService
    ) {}

    @Post()
    async create(@Body('imgBase64') base64: string, @Body('key') key: string) {
        return this.mqttClient.send<UpFileDto>(TopicForSubscriptionCollection.fileUpload, {
            key,
            imgBase64: base64,
            description: 'description'
        })
    }

    @Get(':key')
    async download(@Param('key') key: string) {
        return this.mqttClient.send<DownFileDto>(TopicForSubscriptionCollection.fileDownload, {
            key,
        })
    }
}