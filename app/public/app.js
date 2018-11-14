
// //this function hides the welcome page and shows the search page on button click
// const hideHomePage = function () {
//     $('.welcome-page').addClass('hide');
//     $('.band-page').removeClass('hide');
// }
// $('.login-button').on('click', hideHomePage);
// $('.search-artists').on('click', hideHomePage);

// //this function allows the user to go back to the home page when home is clicked on navbar

// const goHome = function () {
//     $('.welcome-page').removeClass('hide');
//     $('.band-page').addClass('hide');
// }
// $('.go-home').on('click', goHome);

// const mains = document.getElementsByTagName('main');
const xhr = new XMLHttpRequest();

const usernameLogin = document.querySelector('.login-box .username');
const passwordLogin = document.querySelector('.login-box .password');
const emailCreate = document.querySelector('.create-box .email');
const usernameCreate = document.querySelector('.create-box .username');
const passwordCreate = document.querySelector('.create-box .password');
let token;

const loadPage = e => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelector('main:not(.hidden)').classList.add('hidden');
        document.querySelector(`main.${e.target.classList[1]}`).classList.remove('hidden');
    }
}

document.querySelector('nav').addEventListener('click', loadPage);
document.querySelector('.nav.create-account').addEventListener('click', loadPage);

document.querySelector('.submit-login').addEventListener('click', e => {
    e.preventDefault();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const res = xhr.response;
        if (res.auth) token = res.token;
        console.log(JSON.parse(auth));
    }
    xhr.send(JSON.stringify({
        username: usernameLogin.value,
        password: passwordLogin.value
    }));
})

document.querySelector('.submit-create').addEventListener('click', e => {
    e.preventDefault();
    xhr.open('POST', '/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const user = xhr.response;
        console.log(JSON.parse(user));
    }
    xhr.send(JSON.stringify({
        username: usernameCreate.value,
        password: passwordCreate.value,
        email: emailCreate.value
    }))
})

// $(function () {

// let queryURL = `https://api.spotify.com/v1/search?q=${bandName}&type=artist&market=US&limit=10&offset=5`

//     $.ajax({
//         url: queryURL,
//         method: 'GET',
//         headers: {

//         }
//     }).then(function(response){
//         console.log(response);
//     })
// })