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
            showMsg: false,
            msg: '',
            showSenhaAtual: false,
            showNovaSenha: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
        this.showHideSenhaAtual = this.showHideSenhaAtual.bind(this);
        this.showHideNovaSenha = this.showHideNovaSenha.bind(this);
    }

    _createClass(TrocarSenha, [{
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
            var valid = true;

            for (var i in this.state.requireds) {
                if (!this.state.form[i]) {
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
                this.setState({ loading: false, msg: 'Informe os campos obrigatórios *', showMsg: true, button: true, color: 'danger' });
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
                        this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success' });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
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
        key: 'render',
        value: function render() {

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
                                React.createElement('br', null),
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