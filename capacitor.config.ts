import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alitajs.sf',
  appName: '摆草堂',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['zhiwu.market.alicloudapi.com'],
    // url: 'http://10.128.4.5:8000',
    // cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
