import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'native',
  aconsole: {
    console: {},
    inspx: {},
  },
  plugins: ['umi-plugin-route-mdx'],
  keepalive: [/./],
  mobileLayout: true,
  title: '摆草园',
  hd: false,
  mfsu: false,
  hash: false,
  npmClient: 'pnpm',
  displayName: '摆草园', // The application's name
  packageId: 'com.alitajs.sfg', // The application's App ID;
  azure: {
    apiVersion: '2023-07-01-preview',
    model: 'alita4',
    resource: 'alita',
  },
  jsMinifier: 'terser',
  metas: [{ name: 'referrer', content: 'no-referrer' }],
  define: {
    APPCODE: process.env['APPCODE'],
  },
});
