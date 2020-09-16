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
            editId: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log(props);
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
            url: '/edit-user-projeto/' + this.state.editId,
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

        //console.log(requireds);

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
                    console.log('reg', data);

                    if (data.max) {
                        let msg = data.msg;
                        this.setState({ loading: false, button: true, maxAlert: true, btnContinue: true, projetos: data.projetos });
                        return;
                    }

                    let button = true;
                    if (this.state.action === 'new') {
                        if (data.projetos.length >= data.maxProjetos) {
                            button = false;
                        }
                    }

                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({ projetos: data.projetos, loading: false, button: button, btnContinue: btnContinue });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, button: true });
                }.bind(this)
            });
        });
    }

    getAge(dateString) {

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            age--;
        }

        console.log(age);

        return age;
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
                                { className: "form-control form-m " + (this.state.form.tx_nome_status_projeto ? '' : 'invalid-field'),
                                    name: 'cd_certificado', onChange: this.handleInputChange, defaultValue: this.state.form.tx_nome_status_projeto },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Arquivado, cancelado ou indeferido' },
                                    'Arquivado, cancelado ou indeferido'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Proposta' },
                                    'Proposta'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Projeto em andamento' },
                                    'Projeto em andamento'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Finalizado' },
                                    'Finalizado'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Outro' },
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
                                    name: 'tx_nome_abrangencia_projeto', onChange: this.handleInputChange, defaultValue: this.state.form.tx_nome_abrangencia_projeto },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Municipal' },
                                    'Municipal'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Estadual' },
                                    'Estadual'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Regional' },
                                    'Regional'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Nacional' },
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
                                    name: 'tx_nome_abrangencia_projeto', onChange: this.handleInputChange, defaultValue: this.state.form.tx_nome_zona_atuacao },
                                React.createElement(
                                    'option',
                                    { value: '-1' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Rural' },
                                    'Rural'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'Urbana' },
                                    'Urbana'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement('br', null),
                            React.createElement(
                                'h3',
                                null,
                                'Fontes de Recursos'
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { className: 'bg-lgt items-checkbox' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
                                        'Recursos na\u0303o financeiros'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_", required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "area_" },
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
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'P\xFAblico Beneficiado'
                                    ),
                                    React.createElement('hr', null),
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
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Local de execu\xE7\xE3o'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Financiadores do Projeto'
                                    ),
                                    React.createElement('hr', null)
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
                                { style: { display: this.state.action === 'edit' ? 'block' : this.state.projetos.length < maxProjetos ? 'block' : 'none' },
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