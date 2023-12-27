const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            devTools: true, // Enable DevTools
            preload: path.join(__dirname, 'login.js')

        }
    });

    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})


ipcMain.handle('login', (event, obj) => {
    validatelogin(obj)
});


function validatelogin(obj) {
    const { username, password } = obj;

    // Create form data
    const formData = new FormData();
    formData.append('tag', 'login_flutter');
    formData.append('user_name', username);
    formData.append('password', password);
    formData.append('user_id', '');
    formData.append('auth_token', '');

    // Make a POST request
    axios.post('https://www.naditarangini.com/guna/v1/functions_android/function_new.php', formData)
        .then(response => {
            // Handle the response here
            const login_response = response.data;

            if (login_response.status == 1) {
                const mainWindow = BrowserWindow.getFocusedWindow();
                mainWindow.loadFile('./device_list.html');
            } else {
                dialog.showErrorBox('Login Failed', 'Invalid username or password. Please try again.');
            }

        })
        .catch(error => {
            // Handle errors here
            console.error('Login error:', error);
        });
}