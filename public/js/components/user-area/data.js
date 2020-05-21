class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cpf: true,
                cnpj: true
            },
            showMsg: false,
            msg: '',
            juridica: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        //this.getAddress();
        this.getData();
    }

    getAddress() {
        this.setState({ loadingCep: true });
        $.ajax({
            method: 'GET',
            url: '/get-address/' + this.state.form.cep,
            cache: false,
            success: function (data) {
                console.log(data);
                let address = data.address;

                let form = this.state.form;
                form.endereco = address.logradouro;
                form.bairro = address.bairro;
                form.cidade = address.localidade;
                form.estado = address.uf;

                this.setState({ loadingCep: false, form: form });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    getData() {
        this.setState({ loadingCep: true, button: false });
        $.ajax({
            method: 'GET',
            url: '/get-data',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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

    register(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: '/update-data',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

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
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
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
                    'Mantenha sempre seus dados atualizados, fica mais f\xE1cil para n\xF3s conversarmos!'
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
                            null,
                            React.createElement(
                                'div',
                                { className: 'col-md-5' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cnpj' },
                                    'CNPJ*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control form-g " + (this.state.requireds.cnpj ? '' : 'invalid-field'), type: 'text', name: 'cnpj', onChange: this.handleInputChange, value: this.state.form.cnpj, placeholder: 'CNPJ' }),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-8' },
                            React.createElement(
                                'label',
                                { htmlFor: 'name' },
                                'Seu nome e sobrenome*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control form-g " + (this.state.requireds.name ? '' : 'invalid-field'), type: 'text', name: 'name', onChange: this.handleInputChange, value: this.state.form.name, placeholder: 'Nome' }),
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
                            React.createElement('input', { className: "form-control form-g " + (this.state.requireds.email ? '' : 'invalid-field'), type: 'text', name: 'email', onChange: this.handleInputChange, value: this.state.form.email, placeholder: 'E-mail' }),
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
                            React.createElement('input', { className: "form-control form-m " + (this.state.requireds.cpf ? '' : 'invalid-field'), type: 'text', name: 'cpf', onChange: this.handleInputChange, value: this.state.form.cpf, placeholder: 'Cpf' }),
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
}

ReactDOM.render(React.createElement(Data, null), document.getElementById('data'));