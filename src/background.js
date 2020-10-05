import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  globalShortcut,
  shell,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { browserWindowConfig } from '@/config/electron';

// remove backend consoles in production build
if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
  console.warn = () => {};
}

import '@/backend'; // Load backend;

Menu.setApplicationMenu(null);

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let win;

function createWindow() {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  win = new BrowserWindow(browserWindowConfig);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } //
  else {
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });

  // open link taget _blank in default browser in OS
  win.webContents.on('new-window', (e, url) => {
    if (url != win.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('ready', async () => {
  createWindow();
  win.maximize();

  if (process.env.NODE_ENV === 'development') {
    globalShortcut.register('f15', () => win.reload());
    globalShortcut.register('f12', () => win.toggleDevTools());
  }
});

// Exit cleanly on request from parent process in development mode.
if (process.env.NODE_ENV !== 'production') {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
