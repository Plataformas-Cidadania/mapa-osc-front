class FormOscParceira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                id_osc: null,
                id_projeto: null,
                ft_osc_parceira_projeto: '',
                id_osc_parceira_projeto: null
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                /*dt_inicio_certificado: true,
                dt_fim_certificado: true,
                cd_certificado: true,*/
            },
            showMsg: false,
            updateOk: false,
            msg: '',
            certificates: [],

            action: '', //new | edit

            filters: {
                parceira: null
            },

            searchparceira: null,
            listparceira: null,

            loadingOscParceira: null

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.clickSearchparceira = this.clickSearchparceira.bind(this);
        this.handleSearchparceira = this.handleSearchparceira.bind(this);
        this.listparceira = this.listparceira.bind(this);
        this.setparceira = this.setparceira.bind(this);
        this.removeparceira = this.removeparceira.bind(this);
    }

    componentWillReceiveProps(props) {

        if (this.state.action != props.action) {
            this.setState({ action: props.action }, function () {
                this.props.showHideForm(this.state.action);
                this.cleanForm();
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({ form: form });
    }

    cleanForm() {
        /*let form = this.state.form;
        for(let i in form){
            form[i] = '';
        }*/
        this.setState({
            form: {
                dt_inicio_certificado: '',
                dt_fim_certificado: '',
                cd_parceira: null,
                cd_certificado: 0
            },
            filters: {
                parceira: null
            },
            searchparceira: null
        });
    }

    validate() {

        let valid = true;
        let requireds = this.state.requireds;

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {

        console.log('id_projeto: ', this.props.id_projeto);

        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        let msg = "Dados inserido com sucesso!";

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            let data = {
                id_osc: this.state.filters.parceira.id_osc,
                id_projeto: this.props.id_projeto,
                ft_osc_parceira_projeto: 'Representante de OSC'
                //id_osc_parceira_projeto: this.state.filters.parceira.id_osc,
            };

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/projeto/parceira',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: data,
                cache: false,
                success: function (data) {
                    if (data.max) {
                        let msg = data.msg;
                        this.setState({ loading: false, button: true, btnContinue: true, certificates: data.certificates, updateOk: true, showMsg: true });
                        return;
                    }

                    this.props.listParcerias();

                    this.setState({ certificates: data.certificates, loading: false, updateOk: true, msg: msg, showMsg: true });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({ loading: false, msg: msg, button: true, updateOk: false });
                }.bind(this)
            });
        });
    }

    /*parceira*/
    handleSearchparceira(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchparceira: search }, function () {
            this.listparceira(search);
        });
    }
    clickSearchparceira() {
        let search = this.state.searchparceira ? this.state.searchparceira : ' ';
        this.listparceira(search);
    }
    listparceira(search) {
        if (search.length > 3) {
            this.setState({ loadingOscParceira: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl + 'search/cnpj/autocomplete/' + search,
                cache: false,
                success: function (data) {
                    this.setState({ listparceira: data, loadingOscParceira: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingOscParceira: false });
                }.bind(this)
            });
        }
    }
    setparceira(item) {
        let filters = this.state.filters;
        let form = this.state.form;
        filters.parceira = item;
        form.cd_parceira = item.id_osc;
        this.setState({ filters: filters, form: form });
    }
    removeparceira() {
        let filters = this.state.filters;
        filters.parceira = null;
        this.setState({ filters: filters });
    }

    render() {

        let parceiras = null;
        if (this.state.listparceira) {
            parceiras = this.state.listparceira.map(function (item, index) {

                let sizeSearch = this.state.searchparceira ? this.state.searchparceira.length : 0;
                let firstPiece = null;
                let secondPiece = item.tx_nome_osc;

                if (this.state.searchparceira) {
                    firstPiece = item.tx_nome_osc.substr(0, sizeSearch);
                    secondPiece = item.tx_nome_osc.substr(sizeSearch);
                }
                return React.createElement(
                    'li',
                    { key: 'cat_' + item.id_osc,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setparceira(item)
                    },
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    secondPiece
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { autoComplete: 'off' },
                React.createElement(
                    'div',
                    { className: 'row box-search' },
                    React.createElement(
                        'div',
                        { className: 'col-md-8' },
                        React.createElement(
                            'div',
                            { className: 'input-icon' },
                            React.createElement('input', { type: 'text',
                                className: 'form-control float-left mx-sm-3',
                                placeholder: 'Digite o CNPJ da OSC parceira',
                                name: 'cd_parceira',
                                autoComplete: 'off',
                                onClick: this.clickSearchparceira,
                                onChange: this.handleSearchparceira,
                                defaultValue: this.state.searchparceira,
                                style: { display: this.state.filters.parceira ? 'none' : '' } }),
                            React.createElement('input', { type: 'text', className: 'form-control  mx-sm-3', name: 'cd_parceira2',
                                style: { display: this.state.filters.parceira ? '' : 'none' },
                                autoComplete: 'off',
                                readOnly: this.state.filters.parceira,
                                defaultValue: this.state.filters.parceira ? this.state.filters.parceira.tx_nome_osc : '' }),
                            React.createElement(
                                'div',
                                { style: { display: this.state.filters.parceira ? 'none' : '', position: 'relative', margin: '-25px -12px 23px 0' } },
                                React.createElement('i', { className: 'fas fa-search' })
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.state.filters.parceira ? '' : 'none' }, onClick: this.removeparceira, className: 'cursor' },
                                React.createElement('i', { className: 'fas fa-times' })
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'ul',
                                { className: 'box-search-itens', style: { display: (this.state.searchparceira || this.state.listparceira) && !this.state.filters.parceira ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12 text-center' },
                                    React.createElement('img', { src: '/img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loadingOscParceira ? '' : 'none' } })
                                ),
                                parceiras
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-success', onClick: this.register, style: { marginTop: '-2px' } },
                            React.createElement(
                                'span',
                                null,
                                'Adicionar'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? 'block' : 'none' } },
                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                        ' Processando ',
                        React.createElement('br', null),
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                        React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                        this.state.msg
                    )
                )
            )
        );
    }

}