class FormParticipacaoOutro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                tx_nome_participacao_social_outra: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_participacao_social_outra: true
            },
            showMsg: false,
            msg: '',
            participacoes: [],
            action: '', //new | edit
            editId: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanFormOutro = this.cleanFormOutro.bind(this);
    }

    componentWillReceiveProps(props) {
        let lastEditId = this.state.editId;
        if (this.state.action != props.action || this.state.editId != props.id) {
            this.setState({ action: props.action, editId: props.id }, function () {
                if (lastEditId != props.id) {
                    //this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if (this.state.action == 'new') {
                    this.cleanFormOutro();
                }
            });
        }
    }

    edit() {
        $.ajax({
            method: 'GET',
            url: '/edit-user-participacao/' + this.state.editId,
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ form: data }, function () {
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
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

    cleanFormOutro() {
        let form = {
            tx_nome_participacao_social_outra: ''
        };
        this.setState({ form: form });
    }

    validate() {
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

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        let url = 'osc/ps_outra';
        let id = null;
        let method = 'POST';
        if (this.state.action === 'edit') {
            id = this.state.editId;
            url = 'osc/ps_outra/' + id;
            method = 'PUT';
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: method,
                url: getBaseUrl2 + url,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {
                    tx_nome_participacao_social_outra: this.state.form.tx_nome_participacao_social_outra,
                    ft_participacao_social_outra: 'Representante de OSC',
                    bo_oficial: 0,
                    //id_osc: 611720,
                    id_osc: this.props.id_osc,
                    id: id
                },
                cache: false,
                success: function (data) {

                    this.props.list();

                    this.cleanFormOutro();
                    this.props.showHideFormOutro();

                    this.setState({ participacoes: data.participacoes, loading: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, button: true });
                }.bind(this)
            });
        });
    }

    render() {

        return React.createElement(
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
                        { className: 'label-float' },
                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_participacao_social_outra', onChange: this.handleInputChange, value: this.state.form.tx_nome_participacao_social_outra,
                            placeholder: 'Se houver, insira o link que' }),
                        React.createElement(
                            'label',
                            { htmlFor: 'tx_nome_participacao_social_outra-4273' },
                            'Nome da Confer\xEAncia'
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-box-info-off' },
                            React.createElement(
                                'p',
                                null,
                                '\xA0'
                            )
                        )
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn btn-success', onClick: this.register },
                        'Salvar'
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-danger' },
                        this.state.msg
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? 'block' : 'none' } },
                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                        'Processando'
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.maxAlert ? 'block' : 'none' }, className: ' alert alert-danger' },
                        'M\xE1ximo de Participacaoz Cadastrados'
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }

}