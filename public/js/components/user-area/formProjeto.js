class FormProjeto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_projeto: true,
                dt_fim_projeto: true,
                cd_uf: true,
                cd_projeto: true
            },
            showMsg: false,
            msg: '',
            projetos: [],
            maxAlert: false,
            cd_projeto: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            action: '', //new | edit
            editId: this.props.id,

            objetivos: null,
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,

            active: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.checkMetas = this.checkMetas.bind(this);
        this.listArea = this.listArea.bind(this);

        this.clickFontRecurso = this.clickFontRecurso.bind(this);
    }

    componentDidMount() {
        this.listArea();
    }

    componentWillReceiveProps(props) {
        let lastEditId = this.state.editId;
        if (this.state.action != props.action || this.state.editId != props.id) {
            this.setState({ action: props.action, editId: props.id }, function () {
                if (lastEditId != props.id) {
                    this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if (this.state.action == 'new') {
                    this.cleanForm();
                }
            });
        }
    }

    edit() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/projeto/' + this.state.editId,
            data: {},
            cache: false,
            success: function (data) {
                let ft_recursos_publico = '';
                let ft_recursos_privado = '';
                let ft_recursos_proprio = '';
                let ft_recursos_nao_financeiro = '';

                let tp_cooperacao_tecnica = '';
                let tp_termo_fomento = '';
                let tp_termo_colaboracao = '';
                let tp_termo_parceria = '';
                let tp_contrato_gestao = '';
                let tp_convenio = '';
                let tp_outro = '';

                data.fontes_recursos_projeto.find(function (item) {
                    ft_recursos_publico = item.cd_origem_fonte_recursos_projeto === 1 ? 'chkbox' : '';
                    ft_recursos_privado = item.cd_origem_fonte_recursos_projeto === 2 ? 'chkbox' : '';
                    ft_recursos_proprio = item.cd_origem_fonte_recursos_projeto === 3 ? 'chkbox' : '';
                    ft_recursos_nao_financeiro = item.cd_origem_fonte_recursos_projeto === 4 ? 'chkbox' : '';
                });

                data.tipo_parcerias_projeto.find(function (item) {
                    tp_cooperacao_tecnica = item.cd_tipo_parceria_projeto === 1 ? 'chkbox' : '';
                    tp_termo_fomento = item.cd_tipo_parceria_projeto === 2 ? 'chkbox' : '';
                    tp_termo_colaboracao = item.cd_tipo_parceria_projeto === 3 ? 'chkbox' : '';
                    tp_termo_parceria = item.cd_tipo_parceria_projeto === 4 ? 'chkbox' : '';
                    tp_contrato_gestao = item.cd_tipo_parceria_projeto === 5 ? 'chkbox' : '';
                    tp_convenio = item.cd_tipo_parceria_projeto === 6 ? 'chkbox' : '';
                    tp_outro = item.cd_tipo_parceria_projeto === 7 ? 'chkbox' : '';
                });

                this.setState({
                    form: data,
                    ft_recursos_publico: ft_recursos_publico,
                    ft_recursos_privado: ft_recursos_privado,
                    ft_recursos_proprio: ft_recursos_proprio,
                    tp_cooperacao_tecnica: tp_cooperacao_tecnica,
                    tp_termo_fomento: tp_termo_fomento,
                    tp_termo_colaboracao: tp_termo_colaboracao,
                    tp_termo_parceria: tp_termo_parceria,
                    tp_contrato_gestao: tp_contrato_gestao,
                    tp_convenio: tp_convenio,
                    tp_outro: tp_outro
                }, function () {
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

    cleanForm() {
        let form = this.state.form;
        for (let i in form) {
            form[i] = '';
        }
        this.setState({ form: form });
    }

    validate() {
        console.log(this.state.form);
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

        let url = '/register-projeto';
        let id = null;
        if (this.state.action === 'edit') {
            id = this.state.editId;
            url = '/update-user-projeto';
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: url,
                data: {
                    form: this.state.form,
                    id: id
                },
                cache: false,
                success: function (data) {
                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({ projetos: data.projetos, loading: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, button: true });
                }.bind(this)
            });
        });
    }

    /*Objetivos e metas*/

    listArea() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/objetivo_projeto',
            success: function (data) {
                data.find(function (item) {
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({ loading: false, objetivos: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubobjetivos(id) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'componente/metas_objetivo_projeto/' + id,
            success: function (data) {

                let objetivos = this.state.objetivos;

                let titleObjetivo = this.state.objetivos[id - 1].tx_nome_objetivo_projeto;

                data.find(function (item) {
                    item.display = true;
                    item.checked = false;
                });

                objetivos.find(function (item) {
                    if (item.metas) {
                        item.metas.find(function (itemMeta) {
                            itemMeta.display = false;
                            console.log('display: ' + itemMeta.display);
                        });

                        if (item.cd_objetivo_projeto === id) {
                            item.metas.find(function (itemMeta) {
                                itemMeta.display = true;
                                console.log('display2: ' + itemMeta.display);
                            });
                        }
                    }
                    if (item.cd_objetivo_projeto === id && !item.metas) {
                        item.metas = data;
                        console.log('display3: ' + item.display);
                    }
                });

                this.setState({ loading: false, objetivos: objetivos, id_area: id, buttonObjetivos: id, titleMeta: true, titleObjetivo: titleObjetivo });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    checkMetas(cd_objetivo, cd_meta) {
        console.log(cd_objetivo, cd_meta);
        let objetivos = this.state.objetivos;
        objetivos.find(function (item) {
            if (item.cd_objetivo_projeto === cd_objetivo) {
                item.metas.find(function (itemMeta) {
                    if (itemMeta.cd_meta_projeto === cd_meta) {
                        itemMeta.checked = true;
                    }
                });
            }
        });
        this.setState({ objetivos: objetivos });
    }
    /*******************/

    clickFontRecurso() {
        this.setState({
            active: !this.state.active
        });
    }

    render() {

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = [];
        if (this.state.objetivos) {
            objetivos = this.state.objetivos.map(function (item) {

                let png = padDigits(item.cd_objetivo_projeto, 2);

                let checkedMetas = false;

                //console.log('objetivos: ', this.state.buttonObjetivos, item.cd_objetivo_projeto);

                if (item.metas) {
                    metas.push(item.metas.map(function (itemMeta) {
                        if (itemMeta.checked) {
                            checkedMetas = true;
                        }
                        //console.log('cd_objetivo_projeto: '+item.cd_objetivo_projeto+' cd_meta_projeto: '+itemMeta.cd_meta_projeto+' display: '+itemMeta.display);
                        return React.createElement(
                            'div',
                            { key: "subarea_" + itemMeta.cd_meta_projeto, style: { display: itemMeta.display ? '' : 'none' } },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + itemMeta.cd_meta_projeto, required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + itemMeta.cd_meta_projeto },
                                    itemMeta.tx_nome_meta_projeto
                                )
                            ),
                            React.createElement('hr', null)
                        );
                    }.bind(this)));
                }

                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "area_" + item.cd_objetivo_projeto, onChange: () => this.callSubobjetivos(item.cd_objetivo_projeto), style: { paddingLeft: 0 } },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_objetivo_projeto, required: true }),
                    React.createElement(
                        'label',
                        { htmlFor: "area_" + item.cd_objetivo_projeto, style: { marginLeft: '0', marginRight: '5px', paddingBottom: 0 } },
                        React.createElement('img', { src: "img/ods/" + png + ".png", alt: '', className: (checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos == item.cd_objetivo_projeto ? " item-focus" : ""), width: '80', style: { position: 'relative' }, title: item.tx_nome_objetivo_projeto })
                    )
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
                    null,
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.tx_nome_projeto,
                                    placeholder: 'Nome do projeto, atividade ou programa' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tx_nome_projeto' },
                                    'Nome do projeto, atividade ou programa'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(
                                'select',
                                { className: "form-control form-m " + (this.state.form.cd_status_projeto ? '' : 'invalid-field'),
                                    name: 'cd_status_projeto', onChange: this.handleInputChange, value: this.state.form.cd_status_projeto },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '1' },
                                    'Arquivado, cancelado ou indeferido'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '3' },
                                    'Proposta'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '3' },
                                    'Projeto em andamento'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '2' },
                                    'Finalizado'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '5' },
                                    'Outro'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-4' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_inicio_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.dt_data_inicio_projeto,
                                    placeholder: 'Data de In\xEDcio' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'dt_data_inicio_projeto' },
                                    'Data de In\xEDcio'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-4' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_fim_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.dt_data_fim_projeto,
                                    placeholder: 'Data de Fim' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'dt_data_fim_projeto' },
                                    'Data de Fim'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-8' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.tx_link_projeto,
                                    placeholder: 'Link para o projeto' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tx_link_projeto' },
                                    'Link para o projeto'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-4' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_total_beneficiarios', onChange: this.handleInputChange,
                                    value: this.state.form.nr_total_beneficiarios,
                                    placeholder: 'Total de Benefici\xE1rios' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'nr_total_beneficiarios' },
                                    'Total de Benefici\xE1rios'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-4' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_valor_total_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.nr_valor_total_projeto,
                                    placeholder: 'Valor Total' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'nr_valor_total_projeto' },
                                    'Valor Total'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-4' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_valor_captado_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.nr_valor_captado_projeto,
                                    placeholder: 'Valor Recebido' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'nr_valor_captado_projeto' },
                                    'Valor Recebido'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_descricao_projeto', onChange: this.handleInputChange,
                                    value: this.state.form.tx_descricao_projeto,
                                    placeholder: 'Descri\xE7\xE3o do Projeto, atividade e/ou programa' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tx_descricao_projeto' },
                                    'Descri\xE7\xE3o do Projeto, atividade e/ou programa'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_metodologia_monitoramento', onChange: this.handleInputChange,
                                    value: this.state.form.tx_metodologia_monitoramento,
                                    placeholder: 'Metodologia de Monitoramento e Avalia\xE7\xE3o do Projeto, atividade e/ou programa' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tx_metodologia_monitoramento' },
                                    'Metodologia de Monitoramento e Avalia\xE7\xE3o do Projeto, atividade e/ou programa'
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
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(
                                'select',
                                { className: "form-control form-m " + (this.state.requireds.tx_nome_abrangencia_projeto ? '' : 'invalid-field'),
                                    name: 'cd_abrangencia_projeto', onChange: this.handleInputChange, value: this.state.form.cd_abrangencia_projeto },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '1' },
                                    'Municipal'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '2' },
                                    'Estadual'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '3' },
                                    'Regional'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '4' },
                                    'Nacional'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(
                                'select',
                                { className: "form-control form-m " + (this.state.requireds.tx_nome_zona_atuacao ? '' : 'invalid-field'),
                                    name: 'cd_zona_atuacao_projeto', onChange: this.handleInputChange, value: this.state.form.cd_zona_atuacao_projeto },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '1' },
                                    'Rural'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '2' },
                                    'Urbana'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: this.state.ft_recursos_publico !== 'chkbox' && this.state.active === false ? 'col-md-12' : 'col-md-6' },
                            React.createElement('br', null),
                            React.createElement(
                                'h3',
                                null,
                                'Fontes de Recursos'
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox', onChange: this.clickFontRecurso },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_publico", defaultChecked: this.state.ft_recursos_publico, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "fontes_recursos_publico" },
                                        'Recursos p\xFAblicos'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_privado", defaultChecked: this.state.ft_recursos_privado, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "fontes_recursos_privado" },
                                        'Recursos privados'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_proprio", defaultChecked: this.state.ft_recursos_proprio, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "fontes_recursos_proprio" },
                                        'Recursos pr\xF3prios'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_nao_financeiro", defaultChecked: this.state.ft_recursos_nao_financeiro, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "fontes_recursos_nao_financeiro" },
                                        'Recursos na\u0303o financeiros'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6', style: { display: this.state.ft_recursos_publico !== 'chkbox' && this.state.active === false ? 'none' : '' } },
                            React.createElement('br', null),
                            React.createElement(
                                'h3',
                                null,
                                'Tipo de Parceria'
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_cooperacao_tecnica", defaultChecked: this.state.tp_cooperacao_tecnica, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_cooperacao_tecnica" },
                                        'Acordo de coopera\xE7\xE3o t\xE9cnica'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_fomento", defaultChecked: this.state.tp_termo_fomento, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_termo_fomento" },
                                        'Termo de fomento'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_colaboracao", defaultChecked: this.state.tp_termo_colaboracao, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_termo_colaboracao" },
                                        'Termo de colabora\xE7\xE3o'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_parceria", defaultChecked: this.state.tp_termo_parceria, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_termo_parceria" },
                                        'Termo de parceria'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_contrato_gestao", defaultChecked: this.state.tp_contrato_gestao, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_contrato_gestao" },
                                        'Contrato de gest\xE3o'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_convenio", defaultChecked: this.state.tp_convenio, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_convenio" },
                                        'Conv\xEAnio'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_outro", defaultChecked: this.state.tp_outro, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "tp_outro" },
                                        'Outro'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-11' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'OSCs Parceiras'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-1 float-right' },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-primary' },
                                        React.createElement('i', { className: 'fas fa-plus' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.tx_link_projeto,
                                            placeholder: 'Insica o CNPJ da OSC Parceira' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_projeto' },
                                            'OSCs Parceiras'
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
                                        { className: 'btn btn-danger', style: { marginTop: '-59px', float: 'right', zIndex: '9999999', position: 'relative' } },
                                        React.createElement('i', { className: 'fas fa-minus' })
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'p',
                                        null,
                                        React.createElement(
                                            'strong',
                                            null,
                                            'P\xFAblico Beneficiado'
                                        )
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.tx_link_projeto,
                                            placeholder: 'Insica o CNPJ da OSC Parceira' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_projeto' },
                                            'OSCs Parceiras'
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
                                        { className: 'btn btn-danger', style: { marginTop: '-59px', float: 'right', zIndex: '9999999', position: 'relative' } },
                                        React.createElement('i', { className: 'fas fa-minus' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'p',
                                        null,
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Local de execu\xE7\xE3o'
                                        )
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'p',
                                        null,
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Financiadores do Projeto'
                                        )
                                    ),
                                    React.createElement('hr', null)
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        null,
                                        objetivos,
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.titleMeta ? '' : 'none' } },
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Metas Relacionadas ao ODS definido'
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                this.state.titleObjetivo
                                            ),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            metas
                                        )
                                    )
                                )
                            )
                        )
                    ),
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
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'button',
                                {
                                    className: 'btn btn-success', onClick: this.register },
                                'Adicionar'
                            )
                        )
                    ),
                    React.createElement('br', null),
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
                        'M\xE1ximo de Certificatos Cadastrados'
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }

}