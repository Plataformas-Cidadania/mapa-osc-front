'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = (function (_React$Component) {
    _inherits(Register, _React$Component);

    function Register(props) {
        _classCallCheck(this, Register);

        _get(Object.getPrototypeOf(Register.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {},
            button: true,
            loading: false,
            requireds: {
                tx_nome_usuario: true,
                tx_email_usuario: true,
                tx_senha_usuario: true,
                nr_cpf_usuario: true
            },
            //cnpj: true,
            showMsg: false,
            msg: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
    }

    _createClass(Register, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            /*if(target.name==='cep'){
                value = maskCep(value);
            }*/
            if (target.name === 'nr_cpf_usuario') {
                value = maskCpf(value);
            }
            /*if(target.name==='cnpj'){
                value = maskCnpj(value);
            }*/
            /*if(target.name==='cel'){
                value = maskCel(value);
            }*/
            /*if(target.name==='whatsapp'){
                value = maskCel(value);
            }*/

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
                    if((index==="cnpj"/!* || index==="razao_social" || index==="inscricao_estadual"*!/)){
                        requireds[index] = true;
                    }else{
                        valid = false;
                    }
                }else{
                    requireds[index] = true;
                }
            }*/

            requireds.tx_nome_usuario = true;
            if (!this.validateName(this.state.form.tx_nome_usuario)) {
                console.log('nome inválido');
                requireds.tx_nome_usuario = false;
                valid = false;
            }

            requireds.nr_cpf_usuario = true;
            if (!validateCpf(this.state.form.nr_cpf_usuario)) {
                console.log('cpf inválido');
                requireds.nr_cpf_usuario = false;
                valid = false;
            }

            console.log(valid);
            this.setState({ requireds: requireds }, function () {
                console.log(this.state.requireds);
            });
            return valid;
        }
    }, {
        key: 'validateName',
        value: function validateName(name) {
            if (!name) {
                return false;
            }
            var array_name = name.split(' ');
            if (array_name.length < 2) {
                return false;
            }

            return true;
        }
    }, {
        key: 'register',
        value: function register(e) {
            e.preventDefault();

            ////Voltar o validar
            if (!this.validate()) {
                return;
            }

            console.log("222");

            var form = this.state.form;

            this.setState({ loading: true, button: false, showMsg: false, msg: '', form: form }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'user',
                    data: this.state.form,
                    cache: false,
                    success: (function (data) {
                        console.log('reg', data);

                        var msg = 'Já existe cadastro com esse';

                        if (data.nr_cpf_usuario || data.tx_email_usuario) {
                            if (data.nr_cpf_usuario) {
                                msg += ' cpf';
                            }
                            if (data.tx_email_usuario) {
                                msg += ' email';
                            }
                            this.setState({ msg: msg, showMsg: true, loading: false, button: true });
                            return;
                        }

                        location.href = 'login';
                        //location.href = 'aviso-pendente-ativacao';

                        this.setState({ loading: false });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        //console.error(status, err.toString());
                        console.log(status);
                        console.log(xhr);
                        console.log(err);
                        var msg = '';
                        if (err === 'Unprocessable Entity') {
                            console.log(err);
                            var errors = xhr.responseJSON.errors;
                            if (errors.hasOwnProperty('nr_cpf_usuario')) {
                                msg += "Já existe usuário com este cpf  ";
                            }
                            if (errors.hasOwnProperty('tx_email_usuario')) {
                                msg += "Já existe usuário com este e-mail  ";
                            }
                            this.setState({ msg: msg, showMsg: true });
                        }
                        this.setState({ loading: false, button: true });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'showHidePassword',
        value: function showHidePassword() {
            $('#password').get(0).type = $('#password').get(0).type === 'text' ? 'password' : 'text';
            $('#faView').attr("class", $('#faView').get(0).classList[1] === "fa-eye" ? "fa-eye-slash" : "fa-eye");

            /*if($('#faView').get(0).classList[1]==="fa-eye"){
                $('#faView').attr("class", "fa-eye-slash");
            }else{
                $('#faView').attr("class", "fa-eye");
            }*/
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

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
                                        'Cadastro de Representante'
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
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row justify-content-md-center' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'form',
                                null,
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Sendo um representante da organização, você poderá'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-4' },
                                        React.createElement(
                                            'div',
                                            { className: 'bg-light text-center p-3' },
                                            React.createElement('i', { className: 'fas fa-info-circle fa-3x text-primary' }),
                                            React.createElement('br', null),
                                            'Inserir e atualizar dados da sua instituição'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-4' },
                                        React.createElement(
                                            'div',
                                            { className: 'bg-light text-center p-3' },
                                            React.createElement('i', { className: 'fas fa-hands-helping fa-3x text-primary' }),
                                            React.createElement('br', null),
                                            'Compartilhar informações com parceiros'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-4' },
                                        React.createElement(
                                            'div',
                                            { className: 'bg-light text-center p-3' },
                                            React.createElement('i', { className: 'fas fa-puzzle-piece fa-3x text-primary' }),
                                            React.createElement('br', null),
                                            'Definir suas preferências no Mapa das OSC'
                                        )
                                    )
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_email_usuario' },
                                            'E-mail*'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('input', { className: "form-control form-m " + (this.state.requireds.tx_email_usuario ? '' : 'invalid-field'), type: 'text', name: 'tx_email_usuario', onChange: this.handleInputChange, placeholder: 'E-mail' }),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-5' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_senha_usuario' },
                                            'Senha*'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { className: 'input-icon' },
                                            React.createElement('input', { id: 'tx_senha_usuario', className: "form-control form-m " + (this.state.requireds.tx_senha_usuario ? '' : 'invalid-field'), type: 'password', name: 'tx_senha_usuario', onChange: this.handleInputChange, placeholder: 'Senha' }),
                                            React.createElement(
                                                'a',
                                                { onClick: function () {
                                                        return _this.showHidePassword();
                                                    } },
                                                React.createElement('i', { id: 'faView', className: 'far fa-eye-slash', style: { cursor: 'pointer' } })
                                            )
                                        ),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_usuario' },
                                            React.createElement(
                                                'div',
                                                null,
                                                'Seu nome e sobrenome*'
                                            )
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('input', { className: "form-control form-g " + (this.state.requireds.tx_nome_usuario ? '' : 'invalid-field'), type: 'text', name: 'tx_nome_usuario', onChange: this.handleInputChange, placeholder: 'Nome' }),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-6' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cpf' },
                                            'CPF*'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('input', { className: "form-control form-m " + (this.state.requireds.nr_cpf_usuario ? '' : 'invalid-field'), type: 'text', name: 'nr_cpf_usuario', onChange: this.handleInputChange, placeholder: 'CPF', maxLength: '14' }),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement('div', { className: 'clear-float' }),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'i',
                                                null,
                                                '* campos obrigatórios'
                                            )
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-primary', onClick: this.register },
                                            'Cadastrar'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'text-danger' },
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
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return Register;
})(React.Component);

ReactDOM.render(React.createElement(Register, { email: email }), document.getElementById('register'));
/*<ul>
   <li>Informar dados da organização.</li>
   <li>Compartilhar informações com seus amigos.</li>
   <li>Definir suas preferências no mapa.</li>
</ul>*/ /*<div className="col-md-6">
           <br/>
           <label htmlFor="cnpj">CNPJ*</label><br/>
           <input className={"form-control form-m "+(this.state.requireds.cnpj ? '' : 'invalid-field')} type="text" name="cnpj" onChange={this.handleInputChange} placeholder="CNPJ" value={this.state.form.cnpj}  maxLength="18"/><br/>
        </div>
        */