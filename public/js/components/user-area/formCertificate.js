class FormCertificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                dt_inicio_certificado: '',
                dt_fim_certificado: '',
                cd_uf: null,
                cd_municipio: null,
                cd_certificado: 0
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_certificado: true,
                dt_fim_certificado: true,
                cd_certificado: true
            },
            showMsg: false,
            updateOk: false,
            msg: '',
            certificates: [],
            maxAlert: false,
            cd_certificado: {
                8: 'Utilidade Pública Municipal',
                7: 'Utilidade Pública Estadual'
            },
            action: '', //new | edit

            filters: {
                uf: null,
                municipio: null
            },
            searchUf: null,
            searchMunicipio: null,
            listUf: null,
            listMunicipio: null

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.clickSearchUf = this.clickSearchUf.bind(this);
        this.handleSearchUf = this.handleSearchUf.bind(this);
        this.listUf = this.listUf.bind(this);
        this.setUf = this.setUf.bind(this);
        this.removeUf = this.removeUf.bind(this);

        this.clickSearchMunicipio = this.clickSearchMunicipio.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.listMunicipio = this.listMunicipio.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
        this.removeMunicipio = this.removeMunicipio.bind(this);
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
                cd_uf: null,
                cd_municipio: null,
                cd_certificado: 0
            },
            filters: {
                uf: null,
                municipio: null
            },
            searchUf: null,
            searchMunicipio: null
        });
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

        //console.log(requireds);

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
                id_osc: '455128',
                dt_inicio_certificado: this.state.form.dt_inicio_certificado,
                dt_fim_certificado: this.state.form.dt_fim_certificado,
                cd_certificado: this.state.form.cd_certificado
            };

            if (this.state.form.cd_municipio) {
                data.cd_municipio = this.state.form.cd_municipio;
                data.cd_uf = this.state.form.cd_municipio.slice(0, 2);
            }
            if (this.state.form.cd_uf) {
                data.cd_uf = this.state.form.cd_uf;
            }
            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/certificado',
                data: data,
                cache: false,
                success: function (data) {
                    if (data.max) {
                        let msg = data.msg;
                        this.setState({ loading: false, button: true, maxAlert: true, btnContinue: true, certificates: data.certificates, updateOk: true, showMsg: true });
                        return;
                    }

                    let button = true;
                    if (this.state.action === 'new') {
                        if (data.certificates.length >= data.maxCertificates) {
                            button = false;
                        }
                    }

                    let btnContinue = false;
                    this.props.list();
                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({ certificates: data.certificates, loading: false, button: button, btnContinue: btnContinue, updateOk: true, msg: msg, showMsg: true });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({ loading: false, msg: msg, button: true, updateOk: false });
                }.bind(this)
            });
        });
    }

    /*UF*/
    handleSearchUf(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchUf: search }, function () {
            this.listUf(search);
        });
    }
    clickSearchUf() {
        let search = this.state.searchUf ? this.state.searchUf : ' ';
        this.listUf(search);
    }
    listUf(search) {
        let type = null;

        //if (search.length>2) {

        if (this.state.form.cd_certificado == 8) {
            type = 'municipio';
        } else if (this.state.form.cd_certificado == 7) {
            type = 'estado';
        }
        ;

        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/' + type + '/' + search,
            cache: false,
            success: function (data) {
                this.setState({ listUf: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
        //}
    }
    setUf(item) {
        let filters = this.state.filters;
        let form = this.state.form;
        filters.uf = item;
        form.cd_uf = item.eduf_cd_uf;
        this.setState({ filters: filters, form: form });
    }
    removeUf() {
        let filters = this.state.filters;
        filters.uf = null;
        this.setState({ filters: filters });
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
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl + 'menu/geo/municipio/' + search,
                cache: false,
                success: function (data) {
                    this.setState({ listMunicipio: data, loadingList: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
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

        let ufs = null;
        if (this.state.listUf) {
            ufs = this.state.listUf.map(function (item, index) {

                let sizeSearch = this.state.searchUf ? this.state.searchUf.length : 0;
                let firstPiece = null;
                let secondPiece = item.eduf_nm_uf;

                if (this.state.searchUf) {
                    firstPiece = item.eduf_nm_uf.substr(0, sizeSearch);
                    secondPiece = item.eduf_nm_uf.substr(sizeSearch);
                }

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.eduf_cd_uf,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setUf(item)
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
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-12' },
                React.createElement(
                    'form',
                    { autoComplete: 'off' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'cd_certificado' },
                                'Nome*'
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'select',
                                { className: "form-control form-m " + (this.state.requireds.cd_certificado ? '' : 'invalid-field'),
                                    name: 'cd_certificado', onChange: this.handleInputChange, value: this.state.form.cd_certificado },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '8' },
                                    'Utilidade P\xFAblica Municipal'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '7' },
                                    'Utilidade P\xFAblica Estadual'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'cd_uf', style: { display: this.state.form.cd_certificado == 7 || this.state.form.cd_certificado == 8 ? '' : 'none' } },
                                'Localidade*'
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'input-icon', style: { display: this.state.form.cd_certificado == 7 || this.state.form.cd_certificado == 0 ? 'none' : '' } },
                                React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque um munic\xEDpio', name: 'cd_municipio',
                                    style: { display: this.state.filters.municipio ? 'none' : '' },
                                    autoComplete: 'off',
                                    onClick: this.clickSearchMunicipio,
                                    onChange: this.handleSearchMunicipio,
                                    value: this.state.searchMunicipio
                                }),
                                React.createElement('input', { type: 'text', className: 'form-control', name: 'cd_municipio2',
                                    style: { display: this.state.filters.municipio ? '' : 'none' },
                                    autoComplete: 'off',
                                    defaultValue: this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : '' }),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.municipio ? 'none' : '' } },
                                    React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.municipio ? '' : 'none' }, onClick: this.removeMunicipio },
                                    React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'ul',
                                        { className: 'box-search-itens', style: { display: (this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio ? '' : 'none' } },
                                        municipios
                                    )
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'input-icon', style: { display: this.state.form.cd_certificado == 8 || this.state.form.cd_certificado == 0 ? 'none' : '' } },
                                React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque um estado', name: 'cd_uf',
                                    style: { display: this.state.filters.uf ? 'none' : '' },
                                    autoComplete: 'off',
                                    onClick: this.clickSearchUf,
                                    onChange: this.handleSearchUf,
                                    value: this.state.searchUf
                                }),
                                React.createElement('input', { type: 'text', className: 'form-control', name: 'cd_uf2',
                                    style: { display: this.state.filters.uf ? '' : 'none' },
                                    autoComplete: 'off',
                                    defaultValue: this.state.filters.uf ? this.state.filters.uf.eduf_nm_uf : '' }),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.uf ? 'none' : '' } },
                                    React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.uf ? '' : 'none' }, onClick: this.removeUf },
                                    React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'ul',
                                        { className: 'box-search-itens', style: { display: (this.state.searchUf || this.state.listUf) && !this.state.filters.uf ? '' : 'none' } },
                                        ufs
                                    )
                                ),
                                React.createElement('br', null)
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'dt_inicio_certificado' },
                                'Data in\xEDcio da validade*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control " + (this.state.requireds.dt_inicio_certificado ? '' : 'invalid-field'),
                                type: 'date', name: 'dt_inicio_certificado', onChange: this.handleInputChange,
                                value: this.state.form.dt_inicio_certificado, placeholder: '' }),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'dt_fim_certificado' },
                                'Data fim da validade*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control " + (this.state.requireds.dt_fim_certificado ? '' : 'invalid-field'),
                                type: 'date', name: 'dt_fim_certificado', onChange: this.handleInputChange,
                                value: this.state.form.dt_fim_certificado, placeholder: '' }),
                            React.createElement('br', null)
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
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'button',
                                { className: 'btn btn-success', onClick: this.register },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement('i', { className: 'fas fa-plus' }),
                                    ' Adicionar'
                                )
                            )
                        )
                    ),
                    React.createElement('br', null)
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }

}