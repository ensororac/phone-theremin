import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // ⚠️  Replace with your real Bundle ID once Apple Developer account is confirmed
  // Convention: reverse-domain, e.g. com.ensor.phonetheremin
  appId: 'com.ensor.phonetheremin',
  appName: 'Phone Theremin',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'always',   // respect safe areas (notch, home indicator)
  },
  plugins: {
    // No plugins required for this app currently
    // Motion permission will be handled inline in JS (see index.html)
  },
};

export default config;
