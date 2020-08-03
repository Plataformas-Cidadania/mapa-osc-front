class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
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
            msg: '',
            certificados: null,
            areaAtuacao: null,
            subAreaAtuacao: null,
            ipeaData: null,
            active: false,
            rangerMin1: null,
            input: 0,
            inputMax: 100,
            textRanger: null,
            filters: {
                ano_fundacao: { start: null, end: null },
                ano_fundacao2: { start: null, end: null }
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filter = this.filter.bind(this);
        this.validate = this.validate.bind(this);

        this.clickIdh = this.clickIdh.bind(this);

        this.setAnoFundacao = this.setAnoFundacao.bind(this);
        this.setAnoFundacao2 = this.setAnoFundacao2.bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(props) {
        if (this.state.certificados != props.certificados || this.state.areaAtuacao != props.areaAtuacao || this.state.subAreaAtuacao != props.subAreaAtuacao) {
            this.setState({
                certificados: props.certificados,
                areaAtuacao: props.areaAtuacao,
                subAreaAtuacao: props.subAreaAtuacao
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.name === 'cel') {
            value = maskCel(value);
        }
        if (target.name === 'whatsapp') {
            value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

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

        if (this.validateCel(this.state.form.cel) === "") {
            requireds.cel = false;
            valid = false;
        }

        this.setState({ requireds: requireds });

        return valid;
    }
    validateName(name) {
        let array_name = name.split(' ');
        //console.log(array_name);
        //console.log(array_name.length);
        if (array_name.length < 2) {
            return false;
        }

        return true;
    }
    validateCel(cel) {
        cel = cel.replace(/[^0-9]/g, '');
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
    filter(e) {
        //console.log(this.validate());
        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            $.ajax({
                method: 'POST',
                url: '/filter',
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

    callSubAreaAtuacao(id) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/subarea_atuacao',
            success: function (data) {

                let areaAtuacao = this.state.areaAtuacao;

                this.state.areaAtuacao.find(function (item) {
                    if (item.cd_area_atuacao === id) {
                        item.checked = !item.checked;
                    }
                    item.subareas = data.filter(function (subitem) {
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });
                this.setState({ loading: false, areaAtuacao: areaAtuacao, id_area: id });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    clickIdh() {
        this.setState({
            active: !this.state.active
        });
    }

    setAnoFundacao(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    setAnoFundacao2(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao2.start = start;
        filters.ano_fundacao2.end = end;
        this.setState({ filters: filters });
    }

    render() {

        let certificados = null;
        if (this.state.certificados) {
            certificados = this.state.certificados.map(function (item) {
                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "cert_" + item.cd_certificado },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "cert_" + item.cd_certificado, required: true }),
                    React.createElement(
                        'label',
                        { className: 'custom-control-label', htmlFor: "cert_" + item.cd_certificado },
                        item.tx_nome_certificado
                    )
                );
            });
        }

        const ipeaData = [];
        if (this.props.ipeaData) {
            const map = new Map();
            for (const item of this.props.ipeaData) {

                let subThema = null;
                if (item.cd_indice) {

                    subThema = this.props.ipeaData.map(function (subitem) {
                        return React.createElement(
                            'div',
                            { key: "subarea_" + subitem.cd_indice },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => console.log(subitem.cd_indice) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_indice, required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_indice },
                                    subitem.tx_nome_indice
                                )
                            ),
                            React.createElement('br', null)
                        );
                    });
                }
                if (!map.has(item.tx_tema)) {
                    map.set(item.tx_tema, true);
                    ipeaData.push(React.createElement(
                        'div',
                        { key: "ipeaData_" + item.cd_indice },
                        React.createElement(
                            'strong',
                            null,
                            item.tx_tema
                        ),
                        React.createElement('hr', null),
                        subThema,
                        React.createElement('br', null)
                    ));
                }
            }
        }

        let areaAtuacao = null;
        let subAreaAtuacao = [];
        if (this.state.areaAtuacao) {
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;
                if (item.subareas) {
                    subarea = item.subareas.map(function (subitem) {
                        return React.createElement(
                            'div',
                            { key: "subarea_" + subitem.cd_subarea_atuacao },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => console.log(subitem.cd_subarea_atuacao) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_subarea_atuacao, required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_subarea_atuacao },
                                    subitem.tx_nome_subarea_atuacao
                                )
                            ),
                            React.createElement('br', null)
                        );
                    });
                }

                subAreaAtuacao.push(React.createElement(
                    'div',
                    { key: "divArea_" + item.cd_area_atuacao, className: 'card', style: { display: item.checked ? '' : 'none' } },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt p-2' },
                        React.createElement(
                            'strong',
                            null,
                            item.tx_nome_area_atuacao
                        ),
                        React.createElement('br', null),
                        subarea
                    )
                ));

                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "area_" + item.cd_area_atuacao, onChange: () => this.callSubAreaAtuacao(item.cd_area_atuacao) },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_area_atuacao, required: true }),
                    React.createElement(
                        'label',
                        { className: 'custom-control-label', htmlFor: "area_" + item.cd_area_atuacao },
                        item.tx_nome_area_atuacao
                    )
                );
            }.bind(this));
        }

        console.log(this.state.filters);

        return React.createElement(
            'form',
            null,
            React.createElement(
                'div',
                { className: 'accordion', id: 'accordionExample' },
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-1' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse1', 'aria-expanded': 'true',
                                'aria-controls': 'collapse1' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Dados Gerais',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse1', className: 'collapse show ', 'aria-labelledby': 'heading1',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_razao_social_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome da OSC'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_regiao', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Regi\xE3o'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_fantasia_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome Fantasia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_uf', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Estado'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_identificador_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'CNPJ'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement('div', { className: 'col-md-3' }),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano de Funda\xE7\xE3o',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setAnoFundacao
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano de Funda\xE7\xE3o 2',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setAnoFundacao2
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_municipio', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Munic\xEDpio'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Natureza Jur\xEDdica:'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_associacaoPrivada', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_associacaoPrivada' },
                                            'Associa\xE7\xE3o Privada'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_fundacaoPrivada', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_fundacaoPrivada' },
                                            'Funda\xE7\xE3o Privada'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_organizacaoReligiosa', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_organizacaoReligiosa' },
                                            'Organiza\xE7\xE3o Religiosa'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_organizacaoSocial', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_organizacaoSocial' },
                                            'Organiza\xE7\xE3o Social'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_outra', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_outra' },
                                            'N\xE3o informado'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement('div', { className: 'col-md-6' }),
                                React.createElement('div', { className: 'col-md-6' })
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-2' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse2', 'aria-expanded': 'true',
                                'aria-controls': 'collapse2' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            '\xC1reas e Sub\xE1reas de Atua\xE7\xE3o ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse2', className: 'collapse', 'aria-labelledby': 'heading2',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_atividade_economica', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Atividade Econ\xF4mica (CNAE)'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        '\xC1rea de Atua\xE7\xE3o'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        null,
                                        areaAtuacao,
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Sub\xE1rea de Atua\xE7\xE3o'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'card-columns' },
                                        subAreaAtuacao
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-3' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse3', 'aria-expanded': 'true',
                                'aria-controls': 'collapse3' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Titula\xE7\xF5es e Certifica\xE7\xF5es ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse3', className: 'collapse', 'aria-labelledby': 'heading3',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    certificados
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-4' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse4', 'aria-expanded': 'true',
                                'aria-controls': 'collapse4' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Rela\xE7\xF5es de Trabalho e Governan\xE7a ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse4', className: 'collapse', 'aria-labelledby': 'heading4',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome do Dirigente'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_cargo_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Cargo do Dirigente'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_conselheiro', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome do Membro do Conselho Fiscal'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-5' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse5', 'aria-expanded': 'true',
                                'aria-controls': 'collapse5' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Espa\xE7os de Participa\xE7\xE3o Social ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse5', className: 'collapse', 'aria-labelledby': 'heading5',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Nome do Conselho'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control", type: 'date', name: 'tx_nome_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_dirigente' },
                                            'Data de In\xEDcio de Vig\xEAncia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Nome de representante conselho'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Titularidade'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Data de Fim de Vig\xEAncia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-6' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse6', 'aria-expanded': 'true',
                                'aria-controls': 'collapse6' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Projetos ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse6', className: 'collapse', 'aria-labelledby': 'heading6',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            '666'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-7' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse7', 'aria-expanded': 'true',
                                'aria-controls': 'collapse7' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Fontes de Recursos ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse7', className: 'collapse', 'aria-labelledby': 'heading7',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Fontes de recursos anuais da OSC'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos pro\u0301prios'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos pu\u0301blicos'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos privados'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos na\u0303o financeiros'
                                    ),
                                    React.createElement('hr', null)
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-8' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse8', 'aria-expanded': 'true',
                                'aria-controls': 'collapse8' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            '\xCDndice de Desenvolvimento Humano ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse8', className: 'collapse', 'aria-labelledby': 'heading8',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: this.clickIdh },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'IDH_Municipal', required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: 'IDH_Municipal' },
                                    'IDH Municipal'
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'divIdh', style: { display: this.state.active === false ? 'none' : '' } },
                                React.createElement('br', null),
                                React.createElement(
                                    'strong',
                                    null,
                                    ' Faixas de IDHM:'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'baixo', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'baixo' },
                                        'Baixo (abaixo de 0,600)'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'medio', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'medio' },
                                        'M\xE9dio (entre 0,600 e 0,699)'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'alto', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'alto' },
                                        'Alto (0,700 ou mais)'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-9' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse9', 'aria-expanded': 'true',
                                'aria-controls': 'collapse9' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Indicadores Socioecon\xF4micos Adicionais  ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse9', className: 'collapse', 'aria-labelledby': 'heading9',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                null,
                                ipeaData
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { htmlFor: 'name' },
                    'Como podemos ajudar?'
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
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
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
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
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
                                { className: "label-float-optional" },
                                ' - Opicional'
                            )
                        ),
                        React.createElement('div', { className: 'label-box-info' })
                    )
                )
            ),
            React.createElement('div', { className: 'clear-float' }),
            React.createElement(
                'button',
                { type: 'button', style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-primary', onClick: this.filter },
                'Filtrar'
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
        );
    }
}