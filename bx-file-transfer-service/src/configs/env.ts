import * as dotenv from 'dotenv';

dotenv.config();

export enum EnvironmentNames {
  local = 'local',
  develop = 'develop',
  staging = 'staging',
  production = 'production',
}

export const APP_NAME = 'bx-file-transfer-service';
export const LOG_COLOR = process.env.LOG_COLOR === 'true' ? true : false;
export const ENV_NAME = process.env.ENV_NAME;

export enum TopicForSubscriptionCollection {
  fileUpload = '/file/upload',
  fileDownload = '/file/download',
}

export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_HOST = process.env.SERVER_HOST;

export const MQTT_HOST = process.env.MQTT_HOST;
export const MQTT_PORT = process.env.MQTT_PORT;
export const MQTT_PROTOCOL = process.env.MQTT_PROTOCOL;
export const MQTT_URL = `${MQTT_PROTOCOL}://${MQTT_HOST}:${MQTT_PORT}`;
export const S3_HOST = process.env.S3_HOST
export const S3_PORT = process.env.S3_PORT
export const S3_BUCKET = process.env.S3_BUCKET
export const S3_SECRET = process.env.S3_SECRET
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
export const S3_URL = `http://${ S3_HOST }:${S3_PORT}/s3`
