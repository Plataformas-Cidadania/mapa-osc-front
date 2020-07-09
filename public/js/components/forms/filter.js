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
            msg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filter = this.filter.bind(this);
        this.validate = this.validate.bind(this);
        this.getDadosGerais = this.getDadosGerais.bind(this);
    }

    componentDidMount() {
        this.getDadosGerais();
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

    getDadosGerais() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',

            /*headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },*/
            //headers: {'Access-Control-Allow-Origin': '*'},
            url: 'http://localhost:8000/api/menu/osc/area_atuacao',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
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
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_situacao_imovel_oscSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Open this select menu'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            'One'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            'Two'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            'Three'
                                        )
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
                                            'Ano de Funda\xE7\xE3o'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    ),
                                    React.createElement('input', { type: 'range', className: 'custom-range', min: '0', max: '5', id: 'customRange2', style: { float: 'left' } }),
                                    React.createElement('input', { type: 'range', className: 'custom-range', min: '0', max: '5', id: 'customRange2', style: { float: 'right' } })
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
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_situacao_imovel_oscSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            'One'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            'Two'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            'Three'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_situacao_imovel_oscSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Metas Relacionadas ao ODS'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            'One'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            'Two'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            'Three'
                                        )
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
                        { className: 'card-header', id: 'item-2' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse2', 'aria-expanded': 'true',
                                'aria-controls': 'collapse2' },
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
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Habita\xE7\xE3o'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Sub\xE1rea de Atua\xE7\xE3o'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'bg-lgt p-2' },
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Habita\xE7\xE3o'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { className: 'custom-control custom-checkbox' },
                                            React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                            React.createElement(
                                                'label',
                                                { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                                'Associa\xE7\xE3o Privada'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'invalid-feedback' },
                                                'Example invalid feedback text'
                                            )
                                        )
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
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                            'Associa\xE7\xE3o Privada'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'invalid-feedback' },
                                            'Example invalid feedback text'
                                        )
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
                        { className: 'card-header', id: 'item-4' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse4', 'aria-expanded': 'true',
                                'aria-controls': 'collapse4' },
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
                            '555'
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
                            '777'
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
                            '888'
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
                            '999'
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
                ),
                React.createElement(
                    'select',
                    { className: 'form-control', id: 'assunto' },
                    React.createElement(
                        'option',
                        { value: '' },
                        'Selecione o assunto'
                    ),
                    React.createElement(
                        'option',
                        { value: '1' },
                        'Cadastro Munic\xEDpio-Estado'
                    ),
                    React.createElement(
                        'option',
                        { value: '2' },
                        'Cadastro Representante'
                    ),
                    React.createElement(
                        'option',
                        { value: '3' },
                        'D\xFAvidas'
                    ),
                    React.createElement(
                        'option',
                        { value: '4' },
                        'Inser\xE7\xE3o/Edi\xE7\xE3o de dados'
                    ),
                    React.createElement(
                        'option',
                        { value: '5' },
                        'Pedidos de dados'
                    ),
                    React.createElement(
                        'option',
                        { value: '6' },
                        'Relatar Problemas'
                    ),
                    React.createElement(
                        'option',
                        { value: '7' },
                        'Sugest\xE3o'
                    ),
                    React.createElement(
                        'option',
                        { value: '8' },
                        'Outros'
                    )
                ),
                React.createElement('br', null)
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

ReactDOM.render(
/*<Filter email={email}/>,*/
React.createElement(Filter, null), document.getElementById('filter'));