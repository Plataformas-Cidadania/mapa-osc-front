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
            }

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
    }

    componentDidMount() {
        this.getRecursos();
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

    callSubObjetivos(id) {

        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/fonte_recursos/789809',
            url: getBaseUrl + 'osc/no_project/789809',
            success: function (data) {

                data = data.recursos.recursos; //REMOVER NOVA ROTA

                let anosRecursos = this.state.anosRecursos;

                console.log('data: ', data);

                let recursos_proprios = null;

                for (let i in data) {
                    if (data[i].dt_ano_recursos_osc == id) {

                        recursos_proprios = data[i].recursos_proprios;
                        console.log(data[i].recursos_proprios);
                        //item.display = true;
                        //item.checked = false;
                    }
                }

                /*anosRecursos.find(function(item){
                     if(item.metas){
                        item.metas.find(function(itemMeta){
                            itemMeta.display = false;
                        });
                         if(item.cd_objetivo_projeto === id){
                            item.metas.find(function(itemMeta){
                                itemMeta.display = true;
                            });
                        }
                    }
                     if(item.cd_objetivo_projeto === id && !item.metas){
                        item.metas = data;
                    }
                });*/

                this.setState({ loading: false, anosRecursos: anosRecursos, id_area: id, titleMeta: true, recursos_proprios: recursos_proprios });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {

        console.log("state: ", this.state);

        let anosRecursos = null;
        let metas = null;
        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {

                let checkedMetas = false;

                //console.log(checkedMetas);

                /*if(item.metas){
                    metas = item.metas.map(function (itemMeta) {
                        if(itemMeta.checked){
                            checkedMetas = true;
                        }
                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_recurso_projeto, itemMeta.cd_meta_projeto)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto} >{itemMeta.tx_nome_meta_projeto}</label>
                                </div>
                                <hr />
                            </div>
                        );
                    }.bind(this));
                }*/

                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.callSubObjetivos(item.dt_ano_recursos_osc),
                        className: 'btn btn-light ' },
                    item.dt_ano_recursos_osc
                );
            }.bind(this));
        }

        /*let anosRecursos = [];
         if(this.state.anosRecursos){
           for (const item of this.state.anosRecursos) {
               anosRecursos.push(
                        <button
                            key={"anos_" + item.dt_ano_recursos_osc} id={item.dt_ano_recursos_osc}
                            onClick={this.subCategory} type="button"
                            onChange={() => this.checkMetas()}
                            className="btn btn-light ">{item.dt_ano_recursos_osc}</button>/!*btn-primary*!/
                )
            }
        }*/

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
                                anosRecursos
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.rendimentos_fundos_patrimoniais.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.mensalidades_contribuicoes_associados.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.premios_recebidos.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.venda_produtos.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.prestacao_servicos.nr_valor_recursos_osc,
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
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.recursos_proprios.venda_bens_direitos.nr_valor_recursos_osc,
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