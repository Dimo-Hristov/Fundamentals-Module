import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { createPage } from './create.js';
import { detailPage } from './details.js';
import { editPage } from './edit.js';
import { updateAuth } from './auth.js';

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage,
    '/logout': logoutPage
}


document.querySelector('nav').addEventListener('click', onNavigate)
document.querySelector('#add-movie-button').addEventListener('click', onNavigate)

function onNavigate(ev) {
    if (ev.target.tagName == 'A' && ev.target.href) {
        ev.preventDefault();
        const url = new URL(ev.target);
        const path = url.pathname

        const view = routes[path];
        if (typeof view == 'function') {
            view()
        }

    }
}

function logoutPage() {
    localStorage.removeItem('user')
    alert('Successful logout')
    updateAuth()
    homePage()
}

// start in home page
updateAuth()
homePage()



