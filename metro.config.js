const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for web assets
config.resolver.assetExts.push(
  'svg', 'gif', 'png', 'jpg', 'jpeg', 'webp', 'bmp'
);

// Add support for web source files
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json', 'mjs');

module.exports = config;
