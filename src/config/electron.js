/* eslint-disable no-undef */
import os from 'os';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';
const iconExtension = os.platform === 'win32' ? 'ico' : 'png';

const icon = dev
  ? path.resolve(__static, 'icons', `icon-dev.${iconExtension}`)
  : path.resolve(__static, 'icons', `icon.${iconExtension}`);

export const browserWindowConfig = {
  title: 'PDV Softwhere',
  // icon,
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,

  webPreferences: {
    nodeIntegration: true,
  },
};
