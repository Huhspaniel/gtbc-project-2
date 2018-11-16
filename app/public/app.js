$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

const xhr = new XMLHttpRequest();

const usernameLogin = document.querySelector('div.login .username');
const passwordLogin = document.querySelector('div.login .password');
const emailCreate = document.querySelector('div.create .email');
const usernameCreate = document.querySelector('div.create .username');
const passwordCreate = document.querySelector('div.create .password');
const nameCreate = document.querySelector('div.create .full-name');

const clearInputs = () => {
    Array.from(document.querySelectorAll('input')).forEach(el => {
        el.value = '';
    });
}

const loadPage = e => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelector('main:not(.hidden)').classList.add('hidden');
        document.querySelector(`main.${e.target.classList[1]}`).classList.remove('hidden');
        clearInputs(e);
    }
}
Array.from(document.querySelectorAll('.nav:not(#menu-toggle)')).forEach(el => {
    if (el.classList.contains('logout')) return;
    el.addEventListener('click', loadPage);
})

const createAccount = e => {
    xhr.open('POST', '/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const user = JSON.parse(xhr.response);
        if (!user.error) {
            login(usernameCreate.value, passwordCreate.value, e);
            clearInputs(e);
        }
        console.log(user);
    }
    let name = nameCreate.value.split(' ');
    xhr.send(JSON.stringify({
        username: usernameCreate.value,
        password: passwordCreate.value,
        email: emailCreate.value,
        firstname: name[0],
        lastname: name[1]
    }));
}

const login = (username, password) => {
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        if (res.auth) {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', res.user.username);
            localStorage.setItem('name', res.user.firstname + ' ' + res.user.lastname);
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('token', res.token);
            console.log(res);
            clearInputs();
            renderLogin();
        }
        console.log(res);
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
}

const logout = () => {
    localStorage.clear();
    location.reload();
}

const renderLogin = () => {
    document.querySelector('.nav.account').textContent = localStorage.getItem('username');
    document.querySelector('main.account h1').textContent = localStorage.getItem('username');
    Array.from(document.querySelectorAll('.nav.login, .nav.create-account, .nav.logout, .nav.account, #menu-toggle')).forEach(el => {
        el.classList.toggle('hidden');
    });
    document.querySelector('.nav.account').click();
    const accountInfo = document.createElement('DIV');
    accountInfo.classList.add('account-info');
    accountInfo.innerHTML =
        `<p>Username: ${localStorage.getItem('username')}</p>` +
        `<p>Email: ${localStorage.getItem('email')}</p>` +
        `<p>Name: ${localStorage.getItem('name')}</p>`;
    document.querySelector('main.account').appendChild(accountInfo);
}
window.addEventListener('load', e => {
    if (localStorage.getItem('isLoggedIn')) {
        renderLogin();
    }
})

Array.from(document.getElementsByClassName('input')).forEach(el => {
    el.addEventListener('keyup', e => {
        e.preventDefault();
        if (e.key === 'Enter') {
            el.querySelector('.submit').click();
        }
    })
})

document.querySelector('.submit.login').addEventListener('click', e => {
    e.preventDefault();
    login(usernameLogin.value, passwordLogin.value);
})
document.querySelector('.nav.logout').addEventListener('click', e => {
    e.preventDefault();
    logout();
})

document.querySelector('.submit.create').addEventListener('click', e => {
    e.preventDefault();
    xhr.open('POST', '/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const user = JSON.parse(xhr.response);
        if (!user.error) {
            login(usernameCreate.value, passwordCreate.value, e);
            clearInputs(e);
        }
        console.log(user);
    }
    let name = nameCreate.value.split(' ');
    xhr.send(JSON.stringify({
        username: usernameCreate.value,
        password: passwordCreate.value,
        email: emailCreate.value
    }))
    createAccount();
});

if (window.location.hash) {
    const urlHash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(urlHash);
    const access_token = hashParams.get("access_token");

    localStorage.setItem("spotify_access_token", access_token);
}

document.querySelector('.fa-bookmark').addEventListener('click', e => {
    e.preventDefault();
    e.target.classList.toggle('far');
    e.target.classList.toggle('fas');
})