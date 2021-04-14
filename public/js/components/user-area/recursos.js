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
            ano: 0,
            showMsg: false,
            msg: '',
            juridica: false,
            anosRecursos: [],

            /*recursos_proprios: {
                mensalidades_contribuicoes_associados: {
                    nr_valor_recursos_osc: '',
                },
                premios_recebidos: {
                    nr_valor_recursos_osc: '',
                },
                prestacao_servicos: {
                    nr_valor_recursos_osc: '',
                },
                rendimentos_financeiros_reservas_contas_correntes_proprias: {
                    nr_valor_recursos_osc: '',
                },
                rendimentos_fundos_patrimoniais: {
                    nr_valor_recursos_osc: '',
                },
                venda_bens_direitos: {
                    nr_valor_recursos_osc: '',
                },
                venda_produtos: {
                    nr_valor_recursos_osc: '',
                }
            },*/
            loadingAnos: true

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
        this.getRecursosProprios = this.getRecursosProprios.bind(this);

        this.storeCampo = this.storeCampo.bind(this);
        this.updateCampo = this.updateCampo.bind(this);
        this.deleteCampo = this.deleteCampo.bind(this);
    }

    componentDidMount() {
        this.getRecursos();
        this.callSubObjetivos();
    }

    getRecursos() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            //url: '/get-recursos',
            //url: getBaseUrl+'osc/no_project/789809',
            url: getBaseUrl2 + 'osc/anos_fonte_recursos/789809',
            cache: false,
            success: function (data) {
                console.log('data: ', data);
                this.setState({ loading: false, anosRecursos: data, button: true });
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

        this.setState({ loading: true, button: false, showMsg: false, msg: '', showIcon: false, showIconErro: false }, function () {
            $.ajax({
                method: 'POST',
                url: 'update-recursos',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    //console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if (data.tx_razao_social_recursos || data.email) {
                        if (data.tx_razao_social_recursos) {
                            msg += ' tx_razao_social_recursos';
                        }
                        if (data.email) {
                            msg += ' email';
                        }
                        this.setState({ msg: msg, showIcon: true, showMsg: true, showIconErro: true, loading: false, button: true });
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

    getRecursosProprios(ano) {
        //ano = ano+"-01-01";
        console.log('recursos:', this.state.recursos);
        let recursos_proprios = null;
        let recursos_publicos = null;
        let recursos_privados = null;
        let recursos_nao_financeiros = null;
        let recursos = this.state.recursos;
        for (let i in recursos) {
            if (recursos[i].dt_ano_recursos_osc == ano) {
                recursos_proprios = recursos[i].recursos_proprios;
                recursos_publicos = recursos[i].recursos_publicos;
                recursos_privados = recursos[i].recursos_privados;
                recursos_nao_financeiros = recursos[i].recursos_nao_financeiros;
                break;
            }
        }
        this.setState({
            recursos_proprios: recursos_proprios,
            recursos_publicos: recursos_publicos,
            recursos_privados: recursos_privados,
            recursos_nao_financeiros: recursos_nao_financeiros,
            ano: ano
        });
    }

    callSubObjetivos() {
        this.setState({ button: false, loadingAnos: true });
        $.ajax({
            method: 'GET',
            cache: false,
            //BECK DA API NOVA ESTÁ TRAZENDO ERRADO
            url: getBaseUrl + 'osc/no_project/789809',
            //url: getBaseUrl2+'osc/fonte_recursos/789809',
            //url: getBaseUrl2+'osc/anos_fonte_recursos/789809',
            success: function (data) {

                let anosRecursos = this.state.anosRecursos;

                this.setState({ loadingAnos: false, loading: false, anosRecursos: anosRecursos, titleMeta: true, recursos: data.recursos.recursos });
                //this.setState({loadingAnos: false, loading: false, anosRecursos: anosRecursos, titleMeta:true, recursos:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    storeCampo(field, value) {
        console.log('field: ', field);
        console.log('value: ', value);
        //e.preventDefault();

        /*if(!this.validate()){
            return;
        }*/

        this.setState({ loading: true, button: false }, function () {
            $.ajax({
                method: 'POST',
                url: 'fonte_recursos',
                data: {
                    id_osc: '455128',
                    dt_ano_recursos_osc: '2016-01-01',
                    ft_ano_recursos_osc: "Representante de OSC",
                    ft_valor_recursos_osc: "Representante de OSC",
                    nr_valor_recursos_osc: value,
                    cd_origem_fonte_recursos_projeto: field
                },
                cache: false,
                success: function (data) {
                    let msg = 'Dados alterados com sucesso!';
                    this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success' });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                }.bind(this)
            });
        });
    }
    updateCampo() {}
    deleteCampo() {}

    render() {

        let anosRecursos = null;
        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.getRecursosProprios(item.dt_ano_recursos_osc)
                        //className="btn btn-light ">{item.dt_ano_recursos_osc}</div>
                        , className: this.state.ano == item.dt_ano_recursos_osc ? 'btn btn-primary' : 'btn btn-light' },
                    item.dt_ano_recursos_osc
                );
            }.bind(this));
        }

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
                                { className: 'title-user-area' },
                                React.createElement(
                                    'div',
                                    { className: 'mn-accordion-icon' },
                                    React.createElement('i', { className: 'fas fa-boxes', 'aria-hidden': 'true' })
                                ),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Fontes de recursos anuais da OSC'
                                ),
                                React.createElement('hr', null),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { style: { fontSize: "13px" } },
                                'Anos: '
                            ),
                            React.createElement(
                                'div',
                                { className: 'btn-group', role: 'group', 'aria-label': 'Anos' },
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loadingAnos ? '' : 'none' } },
                                    React.createElement('i', { className: 'fas fa-spinner fa-spin' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loadingAnos ? 'none' : '' } },
                                    anosRecursos
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos pro\u0301prios'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.rendimentos_fundos_patrimoniais ? this.state.recursos_proprios.rendimentos_fundos_patrimoniais.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor'

                                        }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Rendimentos de fundos patrimoniais'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias ? this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Rendimentos financeiros de reservas ou c/c pr\xF3prias'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.mensalidades_contribuicoes_associados ? this.state.recursos_proprios.mensalidades_contribuicoes_associados.nr_valor_recursos_osc : "" : "",
                                            onBlur: () => this.storeCampo(3, 2222 /*this.state.recursos_proprios.mensalidades_contribuicoes_associados.nr_valor_recursos_osc*/
                                            ),
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Mensalidades ou contribui\xE7\xF5es de associados'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.premios_recebidos ? this.state.recursos_proprios.premios_recebidos.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Pr\xEAmios recebidos'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.venda_produtos ? this.state.recursos_proprios.venda_produtos.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Venda de produtos'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.prestacao_servicos ? this.state.recursos_proprios.prestacao_servicos.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Presta\xE7\xE3o de servi\xE7os'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_proprios ? this.state.recursos_proprios.venda_bens_direitos ? this.state.recursos_proprios.venda_bens_direitos.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Venda de bens e direitos'
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
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos pu\u0301blicos'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.parceria_governo_estadual ? this.state.recursos_publicos.parceria_governo_estadual.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parceria com o governo estadual'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.acordo_organismos_multilaterais ? this.state.recursos_publicos.acordo_organismos_multilaterais.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Acordo com organismos multilaterais'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.empresas_publicas_sociedades_economia_mista ? this.state.recursos_publicos.empresas_publicas_sociedades_economia_mista.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Empresas p\xFAblicas ou sociedades de economia mista'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.parceria_governo_municipal ? this.state.recursos_publicos.parceria_governo_municipal.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parceria com o governo municipal'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.acordo_governos_estrangeiros ? this.state.recursos_publicos.acordo_governos_estrangeiros.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Acordo com governos estrangeiros'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_publicos ? this.state.recursos_publicos.transferências_federais_recebidas_osc ? this.state.recursos_publicos.transferências_federais_recebidas_osc.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Transfer\xEAncias federais recebidas pela OSC'
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
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos privados'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.parceria_oscs_brasileiras ? this.state.recursos_privados.parceria_oscs_brasileiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parceria com OSCs brasileiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.parcerias_organizacoes_religiosas_brasileiras ? this.state.recursos_privados.parcerias_organizacoes_religiosas_brasileiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parcerias com organiza\xE7\xF5es religiosas brasileiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.empresas_privadas_brasileiras ? this.state.recursos_privados.empresas_privadas_brasileiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Empresas privadas brasileiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.doacoes_pessoa_juridica ? this.state.recursos_privados.doacoes_pessoa_juridica.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Doa\xE7\xF5es de pessoa jur\xEDdica'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.doacoes_recebidas_forma_produtos_servicos_com_nota_fiscal ? this.state.recursos_privados.doacoes_recebidas_forma_produtos_servicos_com_nota_fiscal.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (com Nota Fiscal)'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.parcerias_oscs_estrangeiras ? this.state.recursos_privados.parcerias_oscs_estrangeiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parcerias com OSCs estrangeiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.parcerias_organizacoes_religiosas_estrangeiras ? this.state.recursos_privados.parcerias_organizacoes_religiosas_estrangeiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Parcerias com organiza\xE7\xF5es religiosas estrangeiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.empresas_privadas_estrangeiras ? this.state.recursos_privados.empresas_privadas_estrangeiras.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Empresas estrangeiras'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_privados ? this.state.recursos_privados.doacoes_pessoa_fisica ? this.state.recursos_privados.doacoes_pessoa_fisica.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Doa\xE7\xF5es de pessoa f\xEDsica'
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
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos na\u0303o financeiros'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_nao_financeiros ? this.state.recursos_nao_financeiros.voluntariado ? this.state.recursos_nao_financeiros.voluntariado.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Voluntariado'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_nao_financeiros ? this.state.recursos_nao_financeiros.imunidades ? this.state.recursos_nao_financeiros.imunidades.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Imunidades'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_nao_financeiros ? this.state.recursos_nao_financeiros.doacoes_recebidas_forma_produtos_servicos_sem_nota_fiscal ? this.state.recursos_nao_financeiros.doacoes_recebidas_forma_produtos_servicos_sem_nota_fiscal.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (sem Nota Fiscal)'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_nao_financeiros ? this.state.recursos_nao_financeiros.isencoes ? this.state.recursos_nao_financeiros.isencoes.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Isen\xE7\xF5es'
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange,
                                            defaultValue: this.state.recursos_nao_financeiros ? this.state.recursos_nao_financeiros.bens_recebidos_direito_uso ? this.state.recursos_nao_financeiros.bens_recebidos_direito_uso.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Bens recebidos em direito de uso'
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
                                        'div',
                                        { style: { marginTop: '-10px' } },
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
                                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + this.state.color },
                                            React.createElement('i', { className: 'far fa-check-circle', style: { display: this.state.showIcon ? '' : 'none' } }),
                                            React.createElement('i', { className: 'far fa-times-circle', style: { display: this.state.showIconErro ? 'none' : '' } }),
                                            this.state.msg
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-success', onClick: this.register },
                                            React.createElement('i', {
                                                className: 'fas fa-cloud-download-alt' }),
                                            ' Salvar fontes de recursos'
                                        ),
                                        React.createElement('br', null)
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