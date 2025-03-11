import { app, BrowserWindow } from 'electron';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width:400,
        height: 500,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: resolve(__dirname, "assets", "img", "icon32x32px.ico") // windows icon
    })
    win.setIcon(resolve(__dirname, "assets", "img", "icon-bar.png"));

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});