class FormEditParticipacaoConferencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                cd_conferencia: '',
                dt_ano_realizacao: '',
                cd_forma_participacao_conferencia: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                cd_conferencia: true,
                dt_ano_realizacao: true,
                cd_forma_participacao_conferencia: true
            },
            showMsg: false,
            msg: '',
            conferencias: [],
            maxAlert: false,
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Residencial',
                2: 'Comercial'
            },
            action: '', //new | edit
            editId: this.props.id,

            listConferencia: [],
            listForma: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.editConferencia = this.editConferencia.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        this.setState({ editId: this.props.id }, function () {
            this.editConferencia();
        });
        this.listConferencia();
        this.listForma();
    }

    componentWillReceiveProps(props) {
        if (this.state.editId !== props.id) {
            this.setState({ editId: props.id }, function () {
                this.editConferencia();
            });
        }
    }

    editConferencia() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/ps_conferencia/' + this.state.editId,
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
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
        console.log('1111');
        console.log(this.state.editId);

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/ps_conferencia/' + this.state.editId,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {
                    cd_conferencia: this.state.form.cd_conferencia,
                    dt_ano_realizacao: this.state.form.dt_ano_realizacao,
                    cd_forma_participacao_conferencia: this.state.form.cd_forma_participacao_conferencia,
                    ft_conferencia: 'Representante de OSC',
                    ft_ano_realizacao: 'Representante de OSC',
                    ft_forma_participacao_conferencia: 'Representante de OSC',
                    bo_oficial: 0,
                    //id_osc: 611720,
                    id_osc: this.props.id,
                    id: this.state.editId
                },
                cache: false,
                success: function (data) {
                    this.props.list();
                    this.setState({ conferencias: data.conferencias, loading: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, button: true });
                }.bind(this)
            });
        });
    }

    listConferencia() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/conferencia',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ listConferencia: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    listForma() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ listForma: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        console.log(this.state.editId);

        let anosLista = getOptions().map(function (item, index) {
            return React.createElement(
                'option',
                { value: item + '-01-01', key: 'anosLista' + index },
                item
            );
        }.bind(this));

        let listConferencia = this.state.listConferencia.map(function (item, index) {
            return React.createElement(
                'option',
                { value: item.cd_conferencia, key: 'listReuniao' + index },
                item.tx_nome_conferencia
            );
        }.bind(this));

        let listForma = this.state.listForma.map(function (item, index) {
            return React.createElement(
                'option',
                { value: item.cd_forma_participacao_conferencia, key: 'listReuniao' + index },
                item.tx_nome_forma_participacao_conferencia
            );
        }.bind(this));

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
                        React.createElement(
                            'select',
                            { className: "form-control ",
                                name: 'cd_conferencia', onChange: this.handleInputChange, value: this.state.form.cd_conferencia },
                            React.createElement(
                                'option',
                                { value: '0' },
                                'Selecione'
                            ),
                            listConferencia
                        ),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'label-float' },
                        React.createElement(
                            'select',
                            { className: "form-control ",
                                name: 'dt_ano_realizacao', onChange: this.handleInputChange, value: this.state.form.dt_ano_realizacao },
                            React.createElement(
                                'option',
                                { value: '0' },
                                'Selecione'
                            ),
                            anosLista
                        ),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'label-float' },
                        React.createElement(
                            'select',
                            { className: "form-control ",
                                name: 'cd_forma_participacao_conferencia', onChange: this.handleInputChange, value: this.state.form.cd_forma_participacao_conferencia },
                            React.createElement(
                                'option',
                                { value: '0' },
                                'Selecione'
                            ),
                            listForma
                        ),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn btn-primary', onClick: this.register },
                        'Cadastrar'
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
                        'M\xE1ximo de Conferenciaz Cadastrados'
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }

}