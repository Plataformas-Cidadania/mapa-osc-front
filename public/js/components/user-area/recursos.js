class Recursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                tx_razao_social_recursos: true,
                tx_sigla_recursos: true,
                tx_nome_situacao_imovel_recursos: true,
                tx_nome_responsavel_legal: true,

                cnpj: true
            },
            showMsg: false,
            msg: '',
            juridica: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
    }

    componentDidMount() {
        this.getRecursos();
    }

    getRecursos() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: '/get-recursos',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data.recursos, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
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
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

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
                url: '/update-recursos',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if (data.tx_razao_social_recursos || data.email) {
                        if (data.tx_razao_social_recursos) {
                            msg += ' tx_razao_social_recursos';
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

        return React.createElement(
            'div',
            null,
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
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'title-style' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Descri\xE7\xE3o da RECURSOS'
                                        ),
                                        React.createElement('div', { className: 'line line-fix' }),
                                        React.createElement('hr', null)
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Hist\xF3rico'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Miss\xE3o'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Vis\xE3o'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Finalidades Estatut\xE1rias da RECURSOS'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEmail4' },
                                        'Link para o Estatutu da RECURSOS'
                                    ),
                                    React.createElement('input', { type: 'emil', className: 'form-control', id: 'inputEmail4', placeholder: 'Email' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    null,
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
                        ),
                        React.createElement('div', { className: 'space' })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Recursos, null), document.getElementById('recursos'));