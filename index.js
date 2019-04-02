const {app, BrowserWindow, ipcMain} = require("electron");
const {download} = require("electron-dl");

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false
  })

  win.loadFile("index.html")

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})

function downloadFile(args) {
  download(BrowserWindow.getFocusedWindow(), args.url, {
    saveAs: false,
    directory: args.savePath
  })
    .then(dl => console.log(dl.getSavePath()))
    .catch(console.error);
  console.log(args)
}

ipcMain.on('download-action', (event, args) => {
  downloadFile(args);
});
