import { S3 } from "aws-sdk";
import { S3_BUCKET } from "src/configs/env";
import s3Config from "src/configs/s3";

export class S3ClientService {
    private s3: S3;
  
    constructor() {
      this.s3 = new S3(s3Config);
    }
  
    async uploadFile(key: string, body: string): Promise<S3.ManagedUpload.SendData> {
      const params: S3.PutObjectRequest = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: Buffer.from(body, 'base64'),
      };
  
      return this.s3.upload(params).promise();
    }
  
    async downloadFile(key: string): Promise<S3.GetObjectOutput> {
      const params: S3.GetObjectRequest = {
        Bucket: S3_BUCKET,
        Key: key,
      };
  
      return this.s3.getObject(params).promise();
    }
  }