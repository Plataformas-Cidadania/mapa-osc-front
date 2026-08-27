'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPassword = (function (_React$Component) {
    _inherits(ResetPassword, _React$Component);

    function ResetPassword(props) {
        _classCallCheck(this, ResetPassword);

        _get(Object.getPrototypeOf(ResetPassword.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                id_usuario: props.id_usuario,
                hash: props.hash,
                tx_senha_usuario: ''
            },
            token: this.props.token,
            button: true,
            loading: false,
            msg: '',
            msgShow: false,
            color: '',
            requireds: {
                /*email: true,*/
                tx_senha_usuario: true
            },
            requisitosSenha: {
                minLength: false,
                minuscula: false,
                maiuscula: false,
                numero: false,
                especial: false
            }

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.avaliarRequisitosSenha = this.avaliarRequisitosSenha.bind(this);
    }

    _createClass(ResetPassword, [{
        key: 'avaliarRequisitosSenha',
        value: function avaliarRequisitosSenha(senha) {
            return {
                minLength: senha.length >= 8,
                minuscula: /[a-z]/.test(senha),
                maiuscula: /[A-Z]/.test(senha),
                numero: /\d/.test(senha),
                especial: /[@#$!%&*_\-]/.test(senha)
            };
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            form[name] = value;

            if (name === 'tx_senha_usuario') {
                this.setState({ form: form, requisitosSenha: this.avaliarRequisitosSenha(value) });
                return;
            }

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

            var requisitos = this.state.requisitosSenha;
            for (var i in requisitos) {
                if (!requisitos[i]) {
                    valid = false;
                }
            }

            //console.log(requireds);

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'save',
        value: function save(e) {
            e.preventDefault();

            if (!this.validate()) {
                this.setState({ msg: 'Preencha a senha e cumpra todos os requisitos *', msgShow: true, color: 'danger' });
                return;
            }

            this.setState({ loading: true, button: false, msgShow: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'trocar-senha-user',
                    data: {
                        form: this.state.form
                    },
                    /*token: this.props.token*/
                    cache: false,
                    success: (function (data) {

                        this.setState({ msg: data.msg, msgShow: true, loading: false, button: true, color: 'success' });
                        location.href = 'login';
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        var _this = this;

                        console.error(status, err.toString());

                        if (xhr.status === 422 && xhr.responseJSON && xhr.responseJSON.errors) {
                            var _ret = (function () {
                                var mensagens = [];
                                var errors = xhr.responseJSON.errors;

                                for (var campo in errors) {
                                    errors[campo].forEach(function (msg) {
                                        mensagens.push(msg);
                                    });
                                }

                                _this.setState({ loading: false, button: true, msg: mensagens.join(' '), msgShow: true, color: 'danger' });
                                return {
                                    v: undefined
                                };
                            })();

                            if (typeof _ret === 'object') return _ret.v;
                        }

                        this.setState({ loading: false, button: true, msg: 'Ocorreu um erro, tente novamente!', msgShow: true, color: 'danger' });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'renderIconeCheck',
        value: function renderIconeCheck(cumprido) {

            if (cumprido) {

                return React.createElement(
                    'svg',
                    { width: '14', height: '14', viewBox: '0 0 448 512', fill: 'currentColor', style: { marginRight: '6px', verticalAlign: 'middle' } },
                    React.createElement('path', { d: 'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' })
                );
            }

            return React.createElement(
                'svg',
                { width: '14', height: '14', viewBox: '0 0 384 512', fill: 'currentColor', style: { marginRight: '6px', verticalAlign: 'middle' } },
                React.createElement('path', { d: 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' })
            );
        }
    }, {
        key: 'renderRequisito',
        value: function renderRequisito(cumprido, texto) {

            return React.createElement(
                'li',
                { className: cumprido ? 'text-success' : 'text-danger', style: { listStyle: 'none' } },
                React.createElement(
                    'strong',
                    null,
                    this.renderIconeCheck(cumprido)
                ),
                texto
            );
        }
    }, {
        key: 'render',
        value: function render() {

            var req = this.state.requisitosSenha;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'title-box' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h2',
                            { className: 'text-center' },
                            'Redefinir Senha'
                        ),
                        React.createElement('hr', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: '', style: { margin: 'auto', width: '600px' } },
                            React.createElement(
                                'div',
                                { className: 'row box-margin' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'form',
                                        null,
                                        React.createElement('input', { type: 'password', name: 'tx_senha_usuario', className: "form-control " + (this.state.requireds.tx_senha_usuario ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'Digite a nova senha' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'ul',
                                            { style: { padding: 0, marginTop: '8px', marginBottom: '0px', fontSize: '13px' } },
                                            this.renderRequisito(req.minLength, 'Pelo menos 8 caracteres'),
                                            this.renderRequisito(req.minuscula, 'Pelo menos uma letra minúscula'),
                                            this.renderRequisito(req.maiuscula, 'Pelo menos uma letra maiúscula'),
                                            this.renderRequisito(req.numero, 'Pelo menos um número'),
                                            this.renderRequisito(req.especial, 'Pelo menos um caractere especial (@ # $ ! % & * _ -)')
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-style-primary', onClick: this.save },
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
                                            { style: { display: this.state.msgShow ? 'block' : 'none' }, className: 'text-' + this.state.color },
                                            React.createElement('br', null),
                                            this.state.msg
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

    return ResetPassword;
})(React.Component);

ReactDOM.render(React.createElement(ResetPassword, { hash: hash, id_usuario: id_usuario }), document.getElementById('reset-password'));
/*<input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>*/ /*<input type="email" name="email" className={"form-control "+(this.state.requireds.email ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Digite o e-mail"/><br/>*/