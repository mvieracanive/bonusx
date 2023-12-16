import { Module } from "@nestjs/common";
import { S3ClientService } from "./s3-client.service";
import { S3ClientServiceProvider } from "./s3-client.provider";

@Module({
    providers: [S3ClientServiceProvider],
    exports: [S3ClientServiceProvider],
    
})

export class S3ClientModule {}