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
            ano: 2010,
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
            loadingAnos: true,

            recursos_proprios: {
                0: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                1: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                2: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                3: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                4: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                5: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                },
                6: {
                    'cd_fonte_recurso_osc': null,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': null
                }
            }

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
        this.getRecursosProprios = this.getRecursosProprios.bind(this);

        //this.storeCampo = this.storeCampo.bind(this);
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
            url: getBaseUrl2 + 'osc/anos_recursos/789809',
            cache: false,
            success: function (data) {
                //console.log('--------',data);
                this.setState({ loading: false, anosRecursos: data, button: true });
                //this.callSubObjetivos();
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

    callSubObjetivos() {
        this.setState({ button: false, loadingAnos: true });
        $.ajax({
            method: 'GET',
            cache: false,

            //url: getBaseUrl+'osc/no_project/789809',
            url: getBaseUrl2 + 'osc/recursos/789809',

            success: function (data) {

                /*console.log('data--------',data);
                console.log('--------',this.state.ano);*/
                console.log('data', data[this.state.ano]);

                let anosRecursos = this.state.anosRecursos;

                this.setState({ loadingAnos: false, loading: false, anosRecursos: anosRecursos, titleMeta: true, recursos: data[this.state.ano] });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    getRecursosProprios(ano) {

        let recursos_proprios = null;
        let recursos_publicos = null;
        let recursos_privados = null;
        let recursos_nao_financeiros = null;

        let recursos = this.state.recursos;

        console.log('recursos-->', recursos);

        if (recursos[4] != undefined) {
            console.log('OK 4');
            recursos_proprios = recursos[4];
        }
        if (recursos[1] != undefined) {
            console.log('OK 1');
            recursos_publicos = recursos[1];
        }
        if (recursos[2] != undefined) {
            console.log('OK 2');
            recursos_privados = recursos[2];
        }
        if (recursos[3] != undefined) {
            console.log('OK 3');
            recursos_nao_financeiros = recursos[3];
        }

        /*console.log('-------------');
        console.log(recursos_proprios);
        console.log(recursos_publicos);
        console.log(recursos_privados);
        console.log(recursos_nao_financeiros);
        console.log('-------------');*/

        /*for(let i in recursos){
            console.log('i', i);
            if(recursos[i].dt_ano_recursos_osc == ano){
                recursos_proprios = recursos[i].recursos_proprios;
                recursos_publicos = recursos[i].recursos_publicos;
                recursos_privados = recursos[i].recursos_privados;
                recursos_nao_financeiros = recursos[i].recursos_nao_financeiros;
                break;
            }
        }*/
        this.setState({
            recursos_proprios: recursos_proprios,
            recursos_publicos: recursos_publicos,
            recursos_privados: recursos_privados,
            recursos_nao_financeiros: recursos_nao_financeiros,
            ano: ano
        }, function () {
            this.callSubObjetivos();
        });
    }

    /*storeCampo(field, value, id_recursos_osc){
        console.log('valores: ',field, value, id_recursos_osc);
        if(id_recursos_osc===0){
             console.log('Update')
            this.setState({loading: true, button: false}, function(){
                $.ajax({
                    method:'PUT',
                    url: getBaseUrl2+'osc/recursos',
                    data:{
                        id_osc: '789809',
                        dt_ano_recursos_osc: '2016-01-01',
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: field,
                    },
                    cache: false,
                    success: function(data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                    }.bind(this)
                });
            });
         }else{
            console.log('Insert')
            this.setState({loading: true, button: false}, function(){
                $.ajax({
                    method:'POST',
                    url: getBaseUrl2+'osc/recursos',
                    data:{
                        id_osc: '789809',
                        dt_ano_recursos_osc: '2016-01-01',
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: field,
                    },
                    cache: false,
                    success: function(data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                    }.bind(this)
                });
            });
        }
      }*/
    updateCampo() {}
    deleteCampo() {}

    render() {

        console.log('render', this.state.recursos_proprios);

        let anosRecursos = null;
        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.getRecursosProprios(item.dt_ano_recursos_osc),
                        className: this.state.ano == item.dt_ano_recursos_osc ? 'btn btn-primary' : 'btn btn-light',
                        style: { marginRight: '5px' }
                    },
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
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[0].id_recursos_osc,
                                    cd: this.state.recursos_proprios[0].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[0].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[0].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[0].tx_nome_fonte_recursos_osc
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[1].id_recursos_osc,
                                    cd: this.state.recursos_proprios[1].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[1].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[1].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[1].tx_nome_fonte_recursos_osc
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[2].id_recursos_osc,
                                    cd: this.state.recursos_proprios[2].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[2].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[2].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[2].tx_nome_fonte_recursos_osc
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[3].id_recursos_osc,
                                    cd: this.state.recursos_proprios[3].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[3].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[3].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[3].tx_nome_fonte_recursos_osc
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[4].id_recursos_osc,
                                    cd: this.state.recursos_proprios[4].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[4].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[4].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[4].tx_nome_fonte_recursos_osc
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos_proprios[5].id_recursos_osc,
                                    cd: this.state.recursos_proprios[5].cd_fonte_recurso_osc,
                                    name: "cp" + this.state.recursos_proprios[5].cd_fonte_recurso_osc,
                                    value: this.state.recursos_proprios[5].nr_valor_recursos_osc,
                                    txt: this.state.recursos_proprios[5].tx_nome_fonte_recursos_osc
                                })
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