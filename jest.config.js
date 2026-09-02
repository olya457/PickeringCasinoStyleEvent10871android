module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|@react-navigation|react-native-safe-area-context|react-native-linear-gradient|react-native-qrcode-svg|react-native-svg|react-native-webview)/)',
  ],
};
