const xhr = new XMLHttpRequest();

const usernameLogin = document.querySelector('div.login .username');
const passwordLogin = document.querySelector('div.login .password');
const emailCreate = document.querySelector('div.create .email');
const usernameCreate = document.querySelector('div.create .username');
const passwordCreate = document.querySelector('div.create .password');
const nameCreate = document.querySelector('div.create .full-name');
let token;
let user;

const clearInputs = (e) => {
    e.preventDefault();
    Array.from(document.querySelectorAll('input')).forEach(el => {
        el.value = '';
    });
}

const loadPage = e => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelector('main:not(.hidden)').classList.add('hidden');
        document.querySelector(`main.${e.target.classList[1]}`).classList.remove('hidden');
    }
}
Array.from(document.getElementsByClassName('nav')).forEach(el => {
    if (el.classList.contains('logout')) return;
    el.addEventListener('click', loadPage);
})

const renderLogin = e => {
    e.preventDefault();
    document.querySelector('.nav.account').textContent = user.username;
    Array.from(document.querySelectorAll('.nav.login, .nav.create-account, .nav.logout, .nav.account')).forEach(el => {
        el.classList.toggle('hidden');
    });
    document.querySelector('.nav.home').click();
    const accountInfo = document.createElement('P');
    accountInfo.innerHTML = JSON.stringify(user, null, 3);
    document.querySelector('main.account').appendChild(accountInfo);
}

document.querySelector('.nav.logout').addEventListener('click', e => {
    e.preventDefault();
    Array.from(document.querySelectorAll('.nav.login, .nav.create-account, .nav.logout, .nav.account')).forEach(el => {
        el.classList.toggle('hidden');
    });
    document.querySelector('.nav.login').click();
    token = undefined;
    user = undefined;
    document.querySelector('main.account').innerHTML = '';
})

Array.from(document.getElementsByClassName('input')).forEach(el => {
    el.addEventListener('keyup', e => {
        e.preventDefault();
        if (e.key === 'Enter') {
            el.querySelector('.submit').click();
        }
    })
})

const login = (username, password, e) => {
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        if (res.auth) {
            token = res.token;
            user = res.user;
            console.log(user);
            clearInputs(e);
            renderLogin(e);
        }
        console.log(res);
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
}

document.querySelector('.submit.login').addEventListener('click', e => {
    e.preventDefault();
    login(usernameLogin.value, passwordLogin.value, e);
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
        email: emailCreate.value,
        firstname: name[0],
        lastname: name[1]
    }));
});