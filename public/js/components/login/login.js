'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {},
            requireds: {
                email: true,
                password: true
            },
            target: this.props.target,
            msg: '',
            msgShow: false,
            invalido: false,
            loading: false
        };

        this.login = this.login.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    _createClass(Login, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.target) {
                this.setState({ target: 'area-user' });
            }
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            form[name] = value;

            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
            //console.log(this.state.form);
            var valid = true;

            var requireds = this.state.requireds;
            var form = this.state.form;

            for (var index in requireds) {
                if (!form[index] || form[index] == '') {
                    requireds[index] = false;
                    valid = false;
                } else {
                    requireds[index] = true;
                }
            }

            //console.log(requireds);

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'login',
        value: function login(e) {
            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, msgShow: false, invalido: false }, function () {
                $.ajax({
                    method: 'POST',
                    //url: 'login',
                    url: getBaseUrl2 + 'oauth/token',
                    data: {
                        grant_type: 'password',
                        client_id: '2',
                        client_secret: 'QYDGG3kPaK3ubJhCE3a6EHup9etYfd2hDrY4JbnL',
                        username: this.state.form.email,
                        password: this.state.form.password,
                        scope: ''
                    },
                    cache: false,
                    success: (function (data) {
                        console.log(data);

                        if (data.access_token) {
                            //location.href = this.state.target;
                            localStorage.setItem('@App:token', data.access_token);
                            //location.href = 'area-user';
                            location.href = 'oscs-user';
                        }

                        this.setState({ loading: false, msgShow: true, msg: data.msg });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('xhr', xhr);
                        console.log('status', status);
                        console.log('err', err);
                        if (err === 'Unauthorized') {
                            this.setState({ invalido: true });
                        }
                        console.error(status, err.toString());
                        this.setState({ loading: false });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var titleLogin = "Já tenho cadastro";

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'bg-lgt' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'header',
                                    null,
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h1',
                                        null,
                                        'Identificação'
                                    ),
                                    React.createElement(
                                        'h5',
                                        null,
                                        React.createElement(
                                            'a',
                                            { href: '/' },
                                            'Home'
                                        )
                                    ),
                                    React.createElement('br', null)
                                )
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row justify-content-md-center' },
                        React.createElement(
                            'div',
                            { className: 'col-md-5' },
                            React.createElement(
                                'div',
                                { className: 'row box-margin' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'h4',
                                        null,
                                        titleLogin
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'form',
                                        null,
                                        React.createElement('input', { type: 'hidden', name: '_token', value: $('meta[name="csrf-token"]').attr('content') }),
                                        React.createElement('input', { type: 'email', name: 'email', className: "form-control " + (this.state.requireds.email ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'E-mail' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { style: { fontSize: '12px' } },
                                            React.createElement(ForgetPassword, null)
                                        ),
                                        React.createElement('input', { type: 'password', name: 'password', className: "form-control " + (this.state.requireds.password ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'Senha' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-primary', onClick: this.login },
                                            'Continuar'
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading ? 'block' : 'none' } },
                                            React.createElement('br', null),
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando'
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.msgShow ? 'block' : 'none' } },
                                            React.createElement('br', null),
                                            this.state.msg
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.invalido ? 'block' : 'none' }, className: 'text-danger' },
                                            React.createElement('br', null),
                                            'Usuário inválido ou inativo!'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'text-center' },
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            'ou'
                                        ),
                                        React.createElement(
                                            'p',
                                            null,
                                            'Não tem cadastro? ',
                                            React.createElement(
                                                'a',
                                                { href: 'register', className: 'text-primary' },
                                                'Cadastre-se'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return Login;
})(React.Component);

ReactDOM.render(React.createElement(Login, null), document.getElementById('login'));