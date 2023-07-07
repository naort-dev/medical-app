/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path")
DEFAULT_APP_ID = 'reef'

const extraNodeModules = {
"app": path.resolve(__dirname, "apps", process.env.APP_ID || DEFAULT_APP_ID)
}

module.exports = {
  resolver: {
    extraNodeModules: extraNodeModules
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
