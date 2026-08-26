window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/**
 * Redireciona automaticamente para a tela de troca de senha sempre que a API
 * retornar 403 com o flag "troca_senha_obrigatoria", de forma global.
 */
$(document).ajaxError(function (event, xhr) {
    if (xhr.status === 403 && xhr.responseJSON && xhr.responseJSON.troca_senha_obrigatoria) {
        if (window.location.pathname.indexOf('trocar-senha') === -1) {
            localStorage.setItem('@App:mensagemTrocaSenhaObrigatoria', xhr.responseJSON.message || '');
            location.href = 'trocar-senha';
        }
    }
});