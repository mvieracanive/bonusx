import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { MQTT_PASSWORD, MQTT_URL, MQTT_USER } from './env';

export const MqttConfigSymbol = Symbol.for('mqttConfig');

export const mqttConfig: ClientProviderOptions = {
  name: MqttConfigSymbol,
  transport: Transport.MQTT,
  options: {
    url: MQTT_URL,
    username: MQTT_USER,
    password: MQTT_PASSWORD
  },
};

export default mqttConfig;
