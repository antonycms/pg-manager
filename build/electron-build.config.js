const webpack = require('webpack');
const path = require('path');

const builderOptions = {
  appId: 'com.antonycms.pgmanager',

  // LINUX BUILD CONFIG
  linux: {
    target: ['AppImage'],
    icon: './icons/icon.png',
  },

  // WINDOWS BUILD CONFIG
  win: {
    target: ['nsis', 'zip'],
    icon: './icons/icon.ico', // USE .ICO TO ICON IN WINDOWS
  },
  nsis: {
    oneClick: 'false',
    allowToChangeInstallationDirectory: 'true',
    perMachine: 'true',
  },
};

function fixPostgresWebpack(config) {
  config.plugin('fixPgNative').use(webpack.IgnorePlugin, [/^pg-native$/]);
}

function removeWarnings(config) {
  config
    .plugin('warningSequelizeFix')
    .use(webpack.ContextReplacementPlugin, [
      /sequelize(\\|\/)/,
      path.resolve(__dirname),
    ]);
  config
    .plugin('warningAnyPromiseFix')
    .use(webpack.ContextReplacementPlugin, [/any-promise/]);

  config.resolve.alias
    .set('sqlite3', 'noop2')
    .set('mysql2', 'noop2')
    .set('mariadb', 'noop2')
    .set('tedious', 'noop2');

  config.toString();
}

module.exports = {
  chainWebpackMainProcess: config => {
    fixPostgresWebpack(config);
    removeWarnings(config);
  },

  builderOptions,
};
