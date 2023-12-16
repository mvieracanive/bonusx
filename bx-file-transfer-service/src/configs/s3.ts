import { S3 } from "aws-sdk";
import { S3_ACCESS_KEY, S3_SECRET, S3_URL } from "./env";

export const s3Config: S3.ClientConfiguration = {
    endpoint: S3_URL,
    s3ForcePathStyle: true,
    secretAccessKey: S3_SECRET,
    accessKeyId: S3_ACCESS_KEY,

  };
  
  export default s3Config;
  