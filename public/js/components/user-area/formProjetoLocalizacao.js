class FormProjetoLocalizacao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                id_projeto: null,
                tx_nome_localizacao: '',
                ft_nome_localizacao: ''
            },

            requireds: {
                tx_nome_localizacao: true
            },
            updateOk: false,
            loading: false,
            msg: '',
            filters: {
                municipio: null
            },
            loadingLocal: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.clickSearchMunicipio = this.clickSearchMunicipio.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.listMunicipio = this.listMunicipio.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
        this.removeMunicipio = this.removeMunicipio.bind(this);
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
        this.setState({
            form: {
                tx_nome_localizacao: ''
            }

        });
    }

    validate() {

        let valid = true;
        let requireds = this.state.requireds;

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {

        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        let msg = "Dados inserido com sucesso!";

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            let data = {
                id_projeto: this.props.id_projeto,
                id_localizacao_projeto: this.state.filters.municipio.edmu_cd_municipio,
                tx_nome_regiao_localizacao_projeto: this.state.filters.municipio.edmu_nm_municipio + ' - ' + this.state.filters.municipio.eduf_sg_uf,
                ft_regiao_localizacao_projeto: 'Representante de OSC',
                ft_nome_regiao_localizacao_projeto: 'Representante de OSC',
                ft_localizacao_prioritaria: 'Representante de OSC'
            };

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/projeto/localizacao',
                data: data,
                cache: false,
                success: function (data) {
                    this.props.listLocalizacoes();
                    this.setState({ loading: false, updateOk: true, msg: msg, showMsg: true });
                    this.cleanForm();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({ msg: msg, updateOk: false });
                }.bind(this)
            });
        });
    }

    /*Municipio*/
    handleSearchMunicipio(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchMunicipio: search }, function () {
            this.listMunicipio(search);
        });
    }
    clickSearchMunicipio() {
        let search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
        this.listMunicipio(search);
    }
    listMunicipio(search) {
        if (search.length > 3) {
            this.setState({ loadingLocal: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl + 'menu/geo/municipio/' + search,
                cache: false,
                success: function (data) {
                    this.setState({ listMunicipio: data, loadingLocal: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingLocal: false });
                }.bind(this)
            });
        }
    }
    setMunicipio(item) {
        let filters = this.state.filters;
        let form = this.state.form;
        filters.municipio = item;
        form.cd_municipio = item.edmu_cd_municipio;
        this.setState({ filters: filters, form: form });
    }
    removeMunicipio() {
        let filters = this.state.filters;
        filters.municipio = null;
        this.setState({ filters: filters });
    }

    render() {

        let municipios = null;
        if (this.state.listMunicipio) {
            municipios = this.state.listMunicipio.map(function (item, index) {

                let sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
                let firstPiece = null;
                let secondPiece = item.edmu_nm_municipio;

                if (this.state.searchMunicipio) {
                    firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
                    secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
                }
                secondPiece = secondPiece + ' - ' + item.eduf_sg_uf;

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.edmu_cd_municipio,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setMunicipio(item)
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
                            { className: 'input-icon', style: { display: this.state.form.cd_certificado == 7 || this.state.form.cd_certificado == 0 ? 'none' : '' } },
                            React.createElement('input', { type: 'text', className: 'form-control mx-sm-3',
                                placeholder: 'Busque um munic\xEDpio', name: 'cd_municipio',
                                autoComplete: 'off',
                                onClick: this.clickSearchMunicipio,
                                onChange: this.handleSearchMunicipio,
                                style: { display: this.state.filters.municipio ? 'none' : '' } }),
                            React.createElement('input', { type: 'text', className: 'form-control mx-sm-3', name: 'cd_municipio2',
                                style: { display: this.state.filters.municipio ? '' : 'none' },
                                autoComplete: 'off',
                                readOnly: this.state.filters.municipio,
                                defaultValue: this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : '' }),
                            React.createElement(
                                'div',
                                { style: { display: this.state.filters.municipio ? 'none' : '', position: 'relative', margin: '0 -12px 0 0' } },
                                React.createElement('i', { className: 'fas fa-search' })
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.state.filters.municipio ? '' : 'none', position: 'relative' }, onClick: this.removeMunicipio },
                                React.createElement('i', { className: 'fas fa-times', style: { cursor: 'pointer' } })
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'ul',
                                { className: 'box-search-itens', style: { display: (this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12 text-center' },
                                    React.createElement('img', { src: '/img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loadingLocal ? '' : 'none' } })
                                ),
                                municipios
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
                    { style: { display: this.state.loading ? 'block' : 'none' } },
                    React.createElement(
                        'div',
                        null,
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