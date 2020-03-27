class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                email: this.props.email,
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

        console.log(form);

        this.setState({ form: form });
    }

    validate() {
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for (let index in requireds) {
            if (!form[index] || form[index] == '') {
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

        /*if(!validateCpf(this.state.form.cpf)){
            requireds.cpf = false;
            valid = false;
        }*/

        this.contact();
        console.log(requireds);

        this.setState({ requireds: requireds });
        //this.contact(); // Chamada Ajax
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
        //console.log(cel);
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

    /*checkCity(e){
        e.preventDefault();
         if(cities.search(this.state.form.cidade+'/'+this.state.form.estado)==-1){
            $('#notice').modal();
        }else{
            this.contact();
        }
    }*/

    contact(e) {

        //e.preventDefault();

        /* if(!this.validate()){
             return;
         }*/

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            $.ajax({
                method: 'POST',
                url: '/contact',
                data: {
                    form: this.state.form
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    /*let msg = 'Já existe cadastro com esse';
                     if(data.cpf || data.email){
                        if(data.cpf){
                            msg+= ' cpf';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true});
                        return;
                    }
                     location.href = '/contact-pets';*/
                    //this.setState({loading: false})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }.bind(this)
            });
        });
    }

    render() {

        //console.log(this.state.requireds.name);

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
                                    'Nome*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-g " + (this.state.requireds.name ? '' : 'invalid-field'), type: 'text', name: 'name', onChange: this.handleInputChange, placeholder: 'Nome' }),
                                React.createElement('br', null)
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'div',
                                { className: 'div-left' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'email' },
                                    'E-mail*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-m " + (this.state.requireds.email ? '' : 'invalid-field'), type: 'text', name: 'email', onChange: this.handleInputChange, value: this.state.form.email, placeholder: 'E-mail' }),
                                React.createElement('br', null)
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'div',
                                { className: 'div-left' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cel' },
                                    'Celular*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-m " + (this.state.requireds.cel ? '' : 'invalid-field'), type: 'text', name: 'cel', onChange: this.handleInputChange, value: this.state.form.cel, placeholder: 'Cel', maxLength: '15' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'div-left' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'name' },
                                    'Whatsapp'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-m ", type: 'text', name: 'whatsapp', onChange: this.handleInputChange, value: this.state.form.whatsapp, placeholder: 'Whatsapp', maxLength: '15' }),
                                React.createElement('br', null)
                            ),
                            React.createElement('div', { className: 'clear-float' }),
                            React.createElement(
                                'p',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    '* campos obrigat\xF3rios'
                                )
                            ),
                            React.createElement(
                                'button',
                                { style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-style-primary', onClick: this.contact },
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

ReactDOM.render(React.createElement(Contact, { email: email }), document.getElementById('contact'));