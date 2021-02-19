const electron = require('electron');
const app = electron.app;
const { BrowserView, BrowserWindow, ipcMain } = electron;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let containerWindow;
let mainApp;
let externalWebsite;
let ordering = false;

function createWindow() {
    containerWindow = new BrowserWindow({width: 1600, height: 1000, frame: true, webPreferences: { nodeIntegration: true }});
    containerWindow.setTitle('Food Ordering');
    containerWindow.on('closed', () => containerWindow = null);
    containerWindow.on('page-title-updated', function(e) {
        e.preventDefault();
    });

    mainApp = new BrowserView({webPreferences: { nodeIntegration: true }});
    containerWindow.addBrowserView(mainApp);
    mainApp.setBounds({x: 0, y: 0, width: 1600, height: 1000});
    mainApp.webContents.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainApp.setAutoResize({width: true, height: false});
    if (isDev) mainApp.webContents.openDevTools({mode:'undocked'});

    externalWebsite = new BrowserView();
    containerWindow.addBrowserView(externalWebsite);
    externalWebsite.setBounds({x: 1600, y:0, width: 0, height: 0});
    externalWebsite.webContents.loadURL('https://groceries.asda.com/');
    externalWebsite.setAutoResize({width: true, height: false});

    //have to do this manually as there's a bug with auto resizing - https://github.com/electron/electron/issues/13468
    containerWindow.on('resize', () => {
        let bounds = containerWindow.webContents.getOwnerBrowserWindow().getBounds();
        if (ordering) {
            mainApp.setBounds({x: 0, y: 0, width: 460, height: bounds.height});
            externalWebsite.setBounds({x: 460, y:0, width: bounds.width-460, height: bounds.height});
        } else {
            mainApp.setBounds({x: 0, y: 0, width: bounds.width, height: bounds.height});
            externalWebsite.setBounds({x: bounds.width, y:0, width: 0, height: 0});
        }
    });
}

ipcMain.handle('send-url', (e, url) => {
    externalWebsite.webContents.loadURL(url);
});

ipcMain.handle('get-url', () => {
  let url = externalWebsite.webContents.getURL();
  mainApp.webContents.send('receive-url', url);
});

ipcMain.handle('start-order', () => {
    let bounds = containerWindow.webContents.getOwnerBrowserWindow().getBounds();
    mainApp.setBounds({x: 0, y: 0, width: 460, height: bounds.height});
    mainApp.setAutoResize({width: false, height: false});
    externalWebsite.setBounds({x: 460, y:20, width: bounds.width-460, height: bounds.height});
    ordering = true;
});

ipcMain.handle('end-order', () => {
    let bounds = containerWindow.webContents.getOwnerBrowserWindow().getBounds();
    mainApp.setBounds({x: 0, y: 0, width: bounds.width, height: bounds.height});
    mainApp.setAutoResize({width: true, height: false});
    externalWebsite.setBounds({x: bounds.width, y:0, width: 0, height: 0});
    ordering = false;
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    containerWindow.removeBrowserView(mainApp);
    containerWindow.removeBrowserView(externalWebsite);
    app.quit();
});

app.on('activate', () => {
    if (containerWindow === null) {
        createWindow();
    }
});