const { getDefaultConfig } = require('@expo/metro-config');

 //@type {import()}
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');

module.exports = config;