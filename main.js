const {
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme
} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#EBEDF2',
            symbolColor: '#5852F2',
            height: 20,
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('./public/index.html');
    ipcMain.handle('dark-mode:toggle', () => {
        nativeTheme.shouldUseDarkColors ?
            nativeTheme.themeSource = "light" :
            nativeTheme.themeSource = "dark";
        return nativeTheme.shouldUseDarkColors;
    });

};

// Uygulama başlatıldığında çalışacak olan kodlar!
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

// Tüm pencereler kapatıldığında uygulamadan çıkış yap!
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});