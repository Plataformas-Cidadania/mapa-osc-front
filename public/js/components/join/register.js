class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: this.props.email
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                password: true,
                cpf: true,
                cnpj: true
            },
            showMsg: false,
            msg: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {}

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.name === 'cep') {
            value = maskCep(value);
        }
        if (target.name === 'cpf') {
            value = maskCpf(value);
        }
        if (target.name === 'cnpj') {
            value = maskCnpj(value);
        }
        if (target.name === 'cel') {
            value = maskCel(value);
        }
        if (target.name === 'whatsapp') {
            value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

        this.setState({ form: form });
    }

    validate() {
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

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

        if (!this.validateName(this.state.form.name)) {
            requireds.name = false;
            valid = false;
        }

        if (!validateCpf(this.state.form.cpf)) {
            requireds.cpf = false;
            valid = false;
        }

        console.log(valid);
        this.setState({ requireds: requireds });
        return valid;
    }

    validateName(name) {
        if (!name) {
            return false;
        }
        let array_name = name.split(' ');
        if (array_name.length < 2) {
            return false;
        }

        return true;
    }

    register(e) {
        e.preventDefault();

        ////Voltar o validar
        if (!this.validate()) {
            return;
        }

        console.log("222");

        let form = this.state.form;

        this.setState({ loading: true, button: false, showMsg: false, msg: '', form: form }, function () {
            $.ajax({
                method: 'POST',
                url: 'register',
                data: {
                    form: this.state.form
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    let msg = 'Já existe cadastro com esse';

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

                    location.href = '/login';
                    //this.setState({loading: false})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }.bind(this)
            });
        });
    }

    showHidePassword() {
        $('#password').get(0).type = $('#password').get(0).type === 'text' ? 'password' : 'text';
        $('#faView').attr("class", $('#faView').get(0).classList[1] === "fa-eye" ? "fa-eye-slash" : "fa-eye");

        /*if($('#faView').get(0).classList[1]==="fa-eye"){
            $('#faView').attr("class", "fa-eye-slash");
        }else{
            $('#faView').attr("class", "fa-eye");
        }*/
    }

    render() {

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
                                'Sendo um representante da organiza\xE7\xE3o, voc\xEA poder\xE1'
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
                                        'Informar dados da organiza\xE7\xE3o',
                                        React.createElement('br', null),
                                        '\xA0'
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
                                        'Compartilhar informa\xE7\xF5es com seus amigos'
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
                                        'Definir suas prefer\xEAncias no mapa'
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'cnpj' },
                                        'CNPJ*'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('input', { className: "form-control form-m " + (this.state.requireds.cnpj ? '' : 'invalid-field'), type: 'text', name: 'cnpj', onChange: this.handleInputChange, placeholder: 'CNPJ', value: this.state.form.cnpj, maxLength: '18' }),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'email' },
                                        'E-mail*'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('input', { className: "form-control form-m " + (this.state.requireds.email ? '' : 'invalid-field'), type: 'text', name: 'email', onChange: this.handleInputChange, value: this.state.form.email, placeholder: 'E-mail' }),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-5' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'password' },
                                        'Senha*'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'input-icon' },
                                        React.createElement('input', { id: 'password', className: "form-control form-m " + (this.state.requireds.password ? '' : 'invalid-field'), type: 'password', name: 'password', onChange: this.handleInputChange, placeholder: 'Senha' }),
                                        React.createElement(
                                            'a',
                                            { onClick: () => this.showHidePassword() },
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
                                        { htmlFor: 'name' },
                                        React.createElement(
                                            'div',
                                            null,
                                            'Seu nome e sobrenome*'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('input', { className: "form-control form-g " + (this.state.requireds.name ? '' : 'invalid-field'), type: 'text', name: 'name', onChange: this.handleInputChange, placeholder: 'Nome' }),
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
                                    React.createElement('input', { className: "form-control form-m " + (this.state.requireds.cpf ? '' : 'invalid-field'), type: 'text', name: 'cpf', onChange: this.handleInputChange, placeholder: 'CPF', value: this.state.form.cpf, maxLength: '14' }),
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
                                            '* campos obrigat\xF3rios'
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
}

ReactDOM.render(React.createElement(Register, { email: email }), document.getElementById('register'));