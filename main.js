import { app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({
        width:400,
        height:600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});