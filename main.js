import { app, BrowserWindow, Menu } from 'electron';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let loadingWindow;
let mainWindow;

const createLoadingWindow = () => {
    loadingWindow = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        icon: resolve(__dirname, "assets", "img", "icon256x256px.png"),
    });

    loadingWindow.loadFile(resolve(__dirname, "loading.html"));
};

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width:400,
        height: 600,
        alwaysOnTop: true,
        transparent: true,
        show: false, // evita que aparezca mientras se cargue
        webPreferences: {
            nodeIntegration: true
        },
        icon: resolve(__dirname, "assets", "img", "icon256x256px.png") // windows icon
    })

    mainWindow.loadFile('index.html');

    // Cuando se cargue, cierra loading, abre main
    mainWindow.webContents.once("did-finish-load", () => {
        loadingWindow.close();
        mainWindow.show();
    });

    // Cierra de segundo plano
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

// App lista
app.whenReady().then(() => {
    createLoadingWindow();

    // Menu:
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    setTimeout(createMainWindow, 2000);
});

// asegura de que no se ejecute en 2o plano
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const menu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Salir',
                click: () => app.quit()
            }
        ],
    },
    {
        label: 'Vista',
        submenu: [
            {
                label: 'Recargar',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    if(focusedWindow) { focusedWindow.reload() };
                }
            },
            {
                label: 'Pantalla Completa',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    if(focusedWindow) { focusedWindow.setFullScreen(!focusedWindow.isFullScreen()) };
                }
            },
            {
                label: 'Salir de Pantalla Completa',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    if(focusedWindow) { focusedWindow.setFullScreen(false) };
                }
            }
        ]
    }
]