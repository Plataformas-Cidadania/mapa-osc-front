'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Data = (function (_React$Component) {
    _inherits(Data, _React$Component);

    function Data(props) {
        _classCallCheck(this, Data);

        _get(Object.getPrototypeOf(Data.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                tx_email_usuario: '',
                tx_nome_usuario: '',
                nr_cpf_usuario: ''
            },
            button: true,
            loading: false,
            requireds: {
                tx_email_usuario: true,
                tx_nome_usuario: true,
                nr_cpf_usuario: true
            },
            showMsg: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getData = this.getData.bind(this);
    }

    _createClass(Data, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: 'getData',
        value: function getData() {
            this.setState({ loadingCep: true, button: false });
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'get-user-auth',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                cache: false,
                success: (function (data) {
                    this.setState({ loading: false, form: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loadingCep: false });
                }).bind(this)
            });
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

            /*for(let index in requireds){
                if(!form[index] || form[index]==''){
                    requireds[index] = false;
                    valid = false;
                }else{
                    requireds[index] = true;
                }
            }*/

            /*for(let index in requireds){
                if(!form[index] || form[index]==''){
                    requireds[index] = false;
                    if((index==="cnpj" ) && !this.state.juridica){
                        requireds[index] = true;
                    }else{
                        valid = false;
                    }
                }else{
                    requireds[index] = true;
                }
            }*/

            //console.log(requireds);

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'register',
        value: function register(e) {
            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'PUT',
                    url: getBaseUrl2 + 'user/' + this.state.form.id_usuario,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        tx_nome_usuario: this.state.form.tx_nome_usuario,
                        tx_email_usuario: this.state.form.tx_email_usuario,
                        nr_cpf_usuario: this.state.form.nr_cpf_usuario
                    },
                    cache: false,
                    success: (function (data) {

                        var msg = 'Já existe outro cadastro com esse';

                        if (data.cpf || data.email) {
                            if (data.cpf) {
                                msg += ' cpf';
                            }
                            if (data.email) {
                                msg += ' email';
                            }
                            this.setState({ msg: msg, showMsg: true, loading: false, button: true });
                            return;
                        }

                        msg = 'Dados alterados com sucesso!';
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
                        ' Meus Dados'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Procure manter seu e-mail sempre atualizado. Assim, você garante o recebimento dos comunicados, avisos e demais informações por parte da equipe do Mapa das OSC.'
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
                                    'Seu nome e sobrenome*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-g " + (this.state.requireds.tx_nome_usuario ? '' : 'invalid-field'), type: 'text', name: 'tx_nome_usuario', onChange: this.handleInputChange, value: this.state.form.tx_nome_usuario, placeholder: 'Nome' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-8' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'E-mail*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-g " + (this.state.requireds.tx_email_usuario ? '' : 'invalid-field'), type: 'text', name: 'tx_email_usuario', onChange: this.handleInputChange, value: this.state.form.tx_email_usuario, placeholder: 'E-mail' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-4' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cpf' },
                                    'CPF*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-m " + (this.state.requireds.nr_cpf_usuario ? '' : 'invalid-field'), type: 'text', name: 'nr_cpf_usuario', onChange: this.handleInputChange, value: this.state.form.nr_cpf_usuario, placeholder: 'Cpf' }),
                                React.createElement('br', null)
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'button',
                                    { style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-success', onClick: this.register },
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

    return Data;
})(React.Component);

ReactDOM.render(React.createElement(Data, { id: id }), document.getElementById('data'));