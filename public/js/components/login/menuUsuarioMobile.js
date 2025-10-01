'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuUsuarioMobile = (function (_React$Component) {
    _inherits(MenuUsuarioMobile, _React$Component);

    function MenuUsuarioMobile(props) {
        _classCallCheck(this, MenuUsuarioMobile);

        _get(Object.getPrototypeOf(MenuUsuarioMobile.prototype), 'constructor', this).call(this, props);
        this.state = {
            tx_nome_usuario: '',
            loading: false
        };

        this.getData = this.getData.bind(this);
    }

    _createClass(MenuUsuarioMobile, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: 'getData',
        value: function getData() {
            this.setState({ loading: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'get-user-auth',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                cache: false,
                success: (function (data) {
                    var tx_nome_usuario = data.tx_nome_usuario ? data.tx_nome_usuario : '';
                    this.setState({ loading: false, tx_nome_usuario: tx_nome_usuario });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'logout',
        value: function logout() {
            localStorage.setItem('@App:token', '');
            location.href = 'login';
        }
    }, {
        key: 'render',
        value: function render() {

            var usuario = 'Olá, faça seu login ou se cadastre';
            if (this.state.tx_nome_usuario) {
                var arrayNome = this.state.tx_nome_usuario.split(' ');
                usuario = 'Olá, ' + arrayNome[0] + '. Seja bem-vind@!';
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'text-center' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'bg-pri rounded-circle user-mobile' },
                        React.createElement('i', { className: 'far fa-user fa-3x' }),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'p',
                        null,
                        usuario
                    )
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'ul',
                        { className: 'menu-cel-login' },
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: 'login', style: { display: this.state.tx_nome_usuario ? 'none' : '' } },
                                React.createElement(
                                    'div',
                                    { className: 'btn btn-primary btn-login-menu', type: 'button' },
                                    'Entrar'
                                )
                            )
                        ),
                        React.createElement(
                            'li',
                            { style: { display: this.state.tx_nome_usuario ? '' : 'none' } },
                            React.createElement(
                                'a',
                                { href: 'oscs-user' },
                                React.createElement('i', { className: 'far fa-address-card' }),
                                ' Minha OSCs'
                            )
                        ),
                        React.createElement(
                            'li',
                            { style: { display: this.state.tx_nome_usuario ? '' : 'none' } },
                            React.createElement(
                                'a',
                                { href: 'dados-user' },
                                React.createElement('i', { className: 'far fa-edit' }),
                                ' Meus Dados'
                            )
                        ),
                        React.createElement(
                            'li',
                            { style: { display: this.state.tx_nome_usuario ? 'none' : '' } },
                            React.createElement(
                                'a',
                                { href: 'register' },
                                React.createElement('i', { className: 'fas fa-user' }),
                                ' Cadastre-se'
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: 'float-right', style: { display: this.state.tx_nome_usuario ? '' : 'none' }, onClick: this.logout },
                            React.createElement(
                                'a',
                                { href: 'logout-user' },
                                React.createElement('i', { className: 'fas fa-sign-out-alt' }),
                                ' Sair '
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MenuUsuarioMobile;
})(React.Component);

ReactDOM.render(React.createElement(MenuUsuarioMobile, null), document.getElementById('menu-usuario-mobile'));