'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrocarSenha = (function (_React$Component) {
    _inherits(TrocarSenha, _React$Component);

    function TrocarSenha(props) {
        _classCallCheck(this, TrocarSenha);

        _get(Object.getPrototypeOf(TrocarSenha.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                senha_atual: '',
                nova_senha: ''
            },
            button: true,
            loading: false,
            requireds: {
                senha_atual: true,
                nova_senha: true
            },
            requisitosSenha: {
                minLength: false,
                minuscula: false,
                maiuscula: false,
                numero: false,
                especial: false
            },
            showMsg: false,
            msg: '',
            showSenhaAtual: false,
            showNovaSenha: false,
            mensagemTrocaObrigatoria: null

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
        this.showHideSenhaAtual = this.showHideSenhaAtual.bind(this);
        this.showHideNovaSenha = this.showHideNovaSenha.bind(this);
        this.avaliarRequisitosSenha = this.avaliarRequisitosSenha.bind(this);
    }

    _createClass(TrocarSenha, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var mensagem = localStorage.getItem('@App:mensagemTrocaSenhaObrigatoria');

            if (mensagem) {
                this.setState({ mensagemTrocaObrigatoria: mensagem });
                localStorage.removeItem('@App:mensagemTrocaSenhaObrigatoria');
            }
        }
    }, {
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

            if (name === 'nova_senha') {
                this.setState({ form: form, requisitosSenha: this.avaliarRequisitosSenha(value) });
                return;
            }

            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
            var valid = true;

            for (var i in this.state.requireds) {
                if (!this.state.form[i]) {
                    valid = false;
                }
            }

            var requisitos = this.state.requisitosSenha;
            for (var i in requisitos) {
                if (!requisitos[i]) {
                    valid = false;
                }
            }

            return valid;
        }
    }, {
        key: 'trocarSenha',
        value: function trocarSenha(e) {
            e.preventDefault();

            if (!this.validate()) {
                this.setState({ loading: false, msg: 'Preencha os campos obrigatórios e cumpra todos os requisitos de senha *', showMsg: true, button: true, color: 'danger' });
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'trocar-senha-na-area-restrita',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        senha_atual: this.state.form.senha_atual,
                        nova_senha: this.state.form.nova_senha
                    },
                    cache: false,
                    success: (function (data) {
                        var msg = data.Resposta;
                        if (msg === 'Senha atual inválida!') {
                            this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'danger' });
                            return;
                        }
                        this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success', mensagemTrocaObrigatoria: null });
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

                                _this.setState({ loading: false, msg: mensagens.join(' '), showMsg: true, button: true, color: 'danger' });
                                return {
                                    v: undefined
                                };
                            })();

                            if (typeof _ret === 'object') return _ret.v;
                        }

                        this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'showHideSenhaAtual',
        value: function showHideSenhaAtual() {
            this.setState({ showSenhaAtual: !this.state.showSenhaAtual });
        }
    }, {
        key: 'showHideNovaSenha',
        value: function showHideNovaSenha() {
            this.setState({ showNovaSenha: !this.state.showNovaSenha });
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
                    { className: 'title-user-area' },
                    React.createElement(
                        'h3',
                        null,
                        React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                        ' Trocar Senha'
                    ),
                    React.createElement('hr', null),
                    React.createElement('br', null)
                ),
                this.state.mensagemTrocaObrigatoria && React.createElement(
                    'div',
                    { className: 'alert alert-warning', role: 'alert' },
                    React.createElement('i', { className: 'fa fa-exclamation-triangle', style: { marginRight: '8px' } }),
                    this.state.mensagemTrocaObrigatoria
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'col-md-8' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'name' },
                                    'Senha Atual *'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'input-icon' },
                                    React.createElement('input', {
                                        id: 'senha_atual',
                                        className: "form-control form-m " + (this.state.requireds.senha_atual ? '' : 'invalid-field'),
                                        type: this.state.showSenhaAtual ? "text" : "password",
                                        name: 'senha_atual',
                                        onChange: this.handleInputChange
                                    }),
                                    React.createElement(
                                        'a',
                                        { onClick: this.showHideSenhaAtual },
                                        React.createElement('i', { id: 'faView', className: 'far fa-eye-slash', style: { cursor: 'pointer' } })
                                    )
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-8' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'Nova Senha *'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'input-icon' },
                                    React.createElement('input', {
                                        id: 'nova_senha',
                                        className: "form-control form-m " + (this.state.requireds.senha_atual ? '' : 'invalid-field'),
                                        type: this.state.showNovaSenha ? "text" : "password",
                                        name: 'nova_senha',
                                        onChange: this.handleInputChange
                                    }),
                                    React.createElement(
                                        'a',
                                        { onClick: this.showHideNovaSenha },
                                        React.createElement('i', { id: 'faView', className: 'far fa-eye-slash', style: { cursor: 'pointer' } })
                                    )
                                ),
                                React.createElement(
                                    'ul',
                                    { style: { padding: 0, marginTop: '8px', marginBottom: '0px', fontSize: '13px' } },
                                    this.renderRequisito(req.minLength, 'Pelo menos 8 caracteres'),
                                    this.renderRequisito(req.minuscula, 'Pelo menos uma letra minúscula'),
                                    this.renderRequisito(req.maiuscula, 'Pelo menos uma letra maiúscula'),
                                    this.renderRequisito(req.numero, 'Pelo menos um número'),
                                    this.renderRequisito(req.especial, 'Pelo menos um caractere especial (@ # $ ! % & * _ -)')
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'button',
                                    { style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-success', onClick: this.trocarSenha },
                                    'Salvar'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'text-' + this.state.color },
                                    this.state.msg
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loading ? 'block' : 'none' } },
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                    'Processando'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TrocarSenha;
})(React.Component);

ReactDOM.render(React.createElement(TrocarSenha, { id: id }), document.getElementById('trocar-senha'));