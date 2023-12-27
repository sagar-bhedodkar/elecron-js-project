const { ipcRenderer } = require('electron');
let btnLogin;
let username;
let password;

window.onload = function () {
    username = document.getElementById('username');
    password = document.getElementById('password');
    btnLogin = document.getElementById('login_button');

    btnLogin.onclick = function () {
        const obj = { username: username.value, password: password.value };
        ipcRenderer.invoke('login', obj);
    }
}