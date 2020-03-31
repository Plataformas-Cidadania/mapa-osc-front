class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                /*email: 'this.props.email',*/
                email: '',
                cel: '',
                whatsapp: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true
            },
            showMsg: false,
            msg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.contact = this.contact.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {}

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.name === 'cel') {
            //value = maskCel(value);
        }
        if (target.name === 'whatsapp') {
            //value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

        //console.log(form);

        this.setState({ form: form });
    }

    validate() {

        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for (let index in requireds) {
            if (!form[index] || form[index] === '') {
                requireds[index] = false;
                valid = false;
            } else {
                requireds[index] = true;
            }
        }

        if (!this.validateName(this.state.form.name)) {
            requireds.name = false;
            valid = false;
        }

        if (!this.validateCel(this.state.form.cel)) {
            requireds.cel = false;
            valid = false;
        }
        console.log(valid);

        this.setState({ requireds: requireds });
        return valid;
    }

    validateName(name) {
        let array_name = name.split(' ');
        console.log(array_name);
        console.log(array_name.length);
        if (array_name.length < 2) {
            return false;
        }

        return true;
    }

    validateCel(cel) {
        cel = cel.replace(/[^0-9]/g, '');
        console.log(cel);
        let qtd = cel.length;

        if (qtd < 10 || qtd > 11) {
            return false;
        }

        if (qtd === 11) {
            if (cel.substr(2, 1) != 9) {
                return false;
            }
            if (cel.substr(3, 1) != 9 && cel.substr(3, 1) != 8 && cel.substr(3, 1) != 7 && cel.substr(3, 1) != 6) {
                return false;
            }
        }

        if (qtd === 10) {
            if (cel.substr(2, 1) != 9 && cel.substr(2, 1) != 8 && cel.substr(2, 1) != 7 && cel.substr(2, 1) != 6) {
                return false;
            }
        }

        return true;
    }

    contact(e) {

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            $.ajax({
                method: 'POST',
                url: '/contact',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    form: this.state.form
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);
                    this.setState({ loading: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }.bind(this)
            });
        });
    }

    render() {
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
                        'Cadastro de Associado'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement(
                    'div',
                    { className: 'row', style: { maxWidth: '650px', margin: 'auto' } },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'div-left' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'name' },
                                    'Como podemos ajudar?*'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'select',
                                    { className: 'form-control', id: 'assunto' },
                                    React.createElement(
                                        'option',
                                        { value: '' },
                                        'Selecione o assunto'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '1' },
                                        'Cadastro Munic\xEDpio-Estado'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '2' },
                                        'Cadastro Representante'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '3' },
                                        'D\xFAvidas'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '4' },
                                        'Inser\xE7\xE3o/Edi\xE7\xE3o de dados'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '5' },
                                        'Pedidos de dados'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '6' },
                                        'Relatar Problemas'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '7' },
                                        'Sugest\xE3o'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '8' },
                                        'Outros'
                                    )
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g " + (this.state.requireds.name ? '' : 'invalid-field'), type: 'text', name: 'name', onChange: this.handleInputChange, placeholder: ' ', required: this.state.requireds.name ? '' : 'required' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'name' },
                                    'Nome'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'label-box-info' },
                                    React.createElement(
                                        'p',
                                        { style: { display: this.state.requireds.name ? 'none' : 'block' } },
                                        React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                        ' Digite o nome e sobre nome'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g" + (this.state.requireds.email ? '' : 'invalid-field'), type: 'text', name: 'email', onChange: this.handleInputChange, value: this.state.form.email, placeholder: ' ', required: this.state.requireds.email ? '' : 'required' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'E-mail'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'label-box-info' },
                                    React.createElement(
                                        'p',
                                        { style: { display: this.state.requireds.email ? 'none' : 'block' } },
                                        React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                        ' Escolha um endere\xE7o de e-mail valido'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g", type: 'text', name: 'cel', onChange: this.handleInputChange, value: this.state.form.cel, placeholder: ' ', maxLength: '15', required: this.state.requireds.cel ? '' : 'required' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cel' },
                                    'Celular'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'label-box-info' },
                                    React.createElement(
                                        'p',
                                        { style: { display: this.state.requireds.name ? 'none' : 'block' } },
                                        React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                        ' Digite um n\xFAmero de celular'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control", type: 'text', name: 'whatsapp', onChange: this.handleInputChange, value: this.state.form.whatsapp, placeholder: ' ', maxLength: '15' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'name' },
                                    'Whatsapp',
                                    React.createElement(
                                        'span',
                                        null,
                                        ' - Opicional'
                                    )
                                ),
                                React.createElement('div', { className: 'label-box-info' })
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'button',
                                { type: 'button', style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-primary', onClick: this.contact },
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
            ),
            React.createElement('br', null),
            React.createElement('br', null)
        );
    }
}

ReactDOM.render(
/*<Contact email={email}/>,*/
React.createElement(Contact, null), document.getElementById('contact'));