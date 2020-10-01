const electronBuilder = require('./build/electron-build.config');

module.exports = {
  pluginOptions: {
    electronBuilder,
  },

  devServer: {
    disableHostCheck: true,
  },
  transpileDependencies: ['vuetify', 'vuex-persist'],
};
