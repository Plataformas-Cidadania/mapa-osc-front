class TrocarSenha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                tx_email_usuario: '',
                tx_nome_usuario: '',
                nr_cpf_usuario: ''
            },
            button: true,
            loading: false,
            requireds: {
                senha_atual: true,
                nova_senha: true
            },
            showMsg: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
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

        this.setState({ requireds: requireds });
        return valid;
    }

    trocarSenha(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'trocar-senha-user/',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {
                    senha_atual: this.state.form.senha_atual,
                    nova_senha: this.state.form.nova_senha
                },
                cache: false,
                success: function (data) {
                    if (data.senha_atual_invalida) {
                        this.setState({ msg: 'Senha atual inválida!', showMsg: true, loading: false, button: true });
                        return;
                    }
                    msg = 'Senha alterada com sucesso!';
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
                                'Senha Atual*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control form-g " + (this.state.requireds.senha_atual ? '' : 'invalid-field'), type: 'text', name: 'senha_atual', onChange: this.handleInputChange, placeholder: 'Nome' }),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-8' },
                            React.createElement(
                                'label',
                                { htmlFor: 'email' },
                                'Nova Senha*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control form-g " + (this.state.requireds.nova_senha ? '' : 'invalid-field'), type: 'text', name: 'nova_senha', onChange: this.handleInputChange, placeholder: 'E-mail' }),
                            React.createElement('br', null)
                        ),
                        React.createElement('div', { className: 'clear-float' }),
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
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

ReactDOM.render(React.createElement(TrocarSenha, { id: id }), document.getElementById('trocar-senha'));