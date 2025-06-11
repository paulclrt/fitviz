const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, '../frontend/build/index.html'));
    win.webContents.openDevTools();
    win.webContents.on('did-fail-load', (e, code, desc) => {
        console.error('Load failed:', code, desc);
    });
}

console.log('Loading:', path.join(__dirname, '../frontend/build/index.html'));



app.whenReady().then(createWindow);

