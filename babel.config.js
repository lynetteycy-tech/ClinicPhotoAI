module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove nativewind for now to fix web issues
      // "nativewind/babel"
    ],
  };
};
