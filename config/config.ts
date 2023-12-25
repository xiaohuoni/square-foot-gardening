import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'native',
  aconsole: {
    console: {},
    inspx: {},
  },
  title: '一米花园',
  hd: false,
  mfsu: false,
  hash: false,
  npmClient: 'pnpm',
  displayName: 'sfg', // The application's name
  packageId: 'com.alitajs.sfg', // The application's App ID;
});
