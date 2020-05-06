import Config from 'react-native-config';

const config = {
  api: {
    host: Config.API_URL,
    timeout: 20000,
  },

  google: {
    client_id: Config.GOOGLE_CLIENT_ID,
  },
};

const API_HOST = config.api.host;
const GOOGLE_CLIENT_ID = config.google.client_id;

export {API_HOST, GOOGLE_CLIENT_ID};

export default config;
