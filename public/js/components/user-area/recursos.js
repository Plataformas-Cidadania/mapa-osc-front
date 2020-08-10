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

            recursos_proprios: {
                mensalidades_contribuicoes_associados: {
                    nr_valor_recursos_osc: ''
                },
                premios_recebidos: {
                    nr_valor_recursos_osc: ''
                },
                prestacao_servicos: {
                    nr_valor_recursos_osc: ''
                },
                rendimentos_financeiros_reservas_contas_correntes_proprias: {
                    nr_valor_recursos_osc: ''
                },
                rendimentos_fundos_patrimoniais: {
                    nr_valor_recursos_osc: ''
                },
                venda_bens_direitos: {
                    nr_valor_recursos_osc: ''
                },
                venda_produtos: {
                    nr_valor_recursos_osc: ''
                }
            },
            loadingAnos: true

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
        this.getRecursosProprios = this.getRecursosProprios.bind(this);
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
            url: getBaseUrl2 + 'osc/anos_fonte_recursos/598868',
            cache: false,
            success: function (data) {
                console.log(data);
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
                url: '/update-recursos',
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
        let recursos_proprios = null;
        let recursos = this.state.recursos;
        for (let i in recursos) {
            if (recursos[i].dt_ano_recursos_osc == ano) {
                recursos_proprios = recursos[i].recursos_proprios;
                console.log(recursos[i].recursos_proprios);
                break;
            }
        }
        this.setState({ recursos_proprios: recursos_proprios, ano: ano });
    }

    callSubObjetivos() {
        this.setState({ button: false, loadingAnos: true });
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/fonte_recursos/789809',
            url: getBaseUrl + 'osc/no_project/598868',
            success: function (data) {

                let anosRecursos = this.state.anosRecursos;

                this.setState({ loadingAnos: false, loading: false, anosRecursos: anosRecursos, titleMeta: true, recursos: data.recursos.recursos });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {

        let anosRecursos = null;
        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.getRecursosProprios(item.dt_ano_recursos_osc),
                        className: 'btn btn-light ' },
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.rendimentos_fundos_patrimoniais ? this.state.recursos_proprios.rendimentos_fundos_patrimoniais.nr_valor_recursos_osc : "" : "",
                                            placeholder: 'Informe o valor' }),
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias ? this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias.nr_valor_recursos_osc : "" : "",
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.mensalidades_contribuicoes_associados ? this.state.recursos_proprios.mensalidades_contribuicoes_associados.nr_valor_recursos_osc : "" : "",
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.premios_recebidos ? this.state.recursos_proprios.premios_recebidos.nr_valor_recursos_osc : "" : "",
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.venda_produtos ? this.state.recursos_proprios.venda_produtos.nr_valor_recursos_osc : "" : "",
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.prestacao_servicos ? this.state.recursos_proprios.prestacao_servicos.nr_valor_recursos_osc : "" : "",
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
                                            value: this.state.recursos_proprios ? this.state.recursos_proprios.venda_bens_direitos ? this.state.recursos_proprios.venda_bens_direitos.nr_valor_recursos_osc : "" : "",
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