class Recursos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: '',
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

                cnpj: true,
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
            loadingAnos: true,

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

    componentDidMount(){
        this.getRecursos();
        this.callSubObjetivos();
    }

    getRecursos(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            //url: '/get-recursos',
            //url: getBaseUrl+'osc/no_project/789809',
            url: getBaseUrl2+'osc/anos_recursos/789809',
            cache: false,
            success: function (data) {
                console.log('data: ', data);
                this.setState({loading: false, anosRecursos: data, button:true})
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

        this.setState({form: form});
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }


        this.setState({loading: true, button: false, showMsg: false, msg: '', showIcon: false, showIconErro: false}, function(){
            $.ajax({
                method:'POST',
                url: 'update-recursos',
                data:{
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function(data) {
                    //console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if(data.tx_razao_social_recursos || data.email){
                        if(data.tx_razao_social_recursos){
                            msg+= ' tx_razao_social_recursos';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showIcon: true, showMsg: true, showIconErro: true, loading: false, button: true});
                        return;
                    }

                    msg = 'Dados alterados com sucesso!';
                    this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                }.bind(this)
            });
        });

    }


    getRecursosProprios(ano){
        //ano = ano+"-01-01";
        console.log('recursos:', this.state.recursos);
        console.log('recursos ano:', ano);
        let recursos_proprios = null;
        let recursos_publicos = null;
        let recursos_privados = null;
        let recursos_nao_financeiros = null;
        let recursos = this.state.recursos;
        for(let i in recursos){
            if(recursos[i].dt_ano_recursos_osc == ano){
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
            ano:ano
        })
    }

    callSubObjetivos(){
        this.setState({button:false, loadingAnos:true});
        $.ajax({
            method: 'GET',
            cache: false,
            //BECK DA API NOVA ESTÁ TRAZENDO ERRADO
            //url: getBaseUrl+'osc/no_project/789809',
            url: getBaseUrl2+'osc/recursos/789809',

            success: function (data) {

                consoloe.log('--*', data);

                let anosRecursos = this.state.anosRecursos;

                this.setState({loadingAnos: false, loading: false, anosRecursos: anosRecursos, titleMeta:true, recursos:data.recursos.recursos})

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    storeCampo(field, value, id_recursos_osc){
        console.log('valores: ',field, value, id_recursos_osc);
        //e.preventDefault();

        /*if(!this.validate()){
            return;
        }*/

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


    }
    updateCampo(){

    }
    deleteCampo(){

    }


    render(){

        let anosRecursos = null;
        if(this.state.anosRecursos){
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return (
                <div key={"anos_" + index} id={"anos_" + index}
                    onClick={() => this.getRecursosProprios(item.dt_ano_recursos_osc)}
                    //className="btn btn-light ">{item.dt_ano_recursos_osc}</div>
                    className={this.state.ano==item.dt_ano_recursos_osc ? 'btn btn-primary' : 'btn btn-light'}>{item.dt_ano_recursos_osc}</div>
                );
            }.bind(this));
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                                <form>

                                    <div className="title-user-area">
                                        <div className="mn-accordion-icon"><i className="fas fa-boxes" aria-hidden="true"/></div>
                                        <h3>Fontes de recursos anuais da OSC</h3>
                                        <hr/><br/>
                                    </div>


                                    <div style={{fontSize: "13px"}}>Anos: </div>
                                    <div className="btn-group" role="group" aria-label="Anos">
                                        <div style={{display: this.state.loadingAnos ? '' : 'none'}}>
                                            <i className="fas fa-spinner fa-spin" />
                                        </div>
                                        <div style={{display: this.state.loadingAnos ? 'none' : ''}}>
                                            {anosRecursos}
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>


                                    <div className="row">

                                        <div className="col-md-12">
                                            <h2>Recursos próprios</h2>
                                            <hr/>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                             (this.state.recursos_proprios.rendimentos_fundos_patrimoniais ?
                                                              this.state.recursos_proprios.rendimentos_fundos_patrimoniais.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor"

                                                />
                                                <label htmlFor="tx_link_estatuto_osc">Rendimentos de fundos patrimoniais</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                             (this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias ?
                                                              this.state.recursos_proprios.rendimentos_financeiros_reservas_contas_correntes_proprias.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Rendimentos financeiros de reservas ou c/c próprias</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                *<input className={"form-control form-g "} type="text" name="cp174" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.mensalidades_contribuicoes_associados ?
                                                           this.state.recursos_proprios.mensalidades_contribuicoes_associados.nr_valor_recursos_osc : "") : ""}
                                                       onBlur={() => this.storeCampo(174, this.state.form.cp174, this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.mensalidades_contribuicoes_associados ?
                                                               this.state.recursos_proprios.mensalidades_contribuicoes_associados.id_recursos_osc : "") : "")}
                                                       placeholder="Informe o valor" />*{this.state.form.cp174}*
                                                {this.state.recursos_proprios ?
                                                    (this.state.recursos_proprios.mensalidades_contribuicoes_associados ?
                                                        this.state.recursos_proprios.mensalidades_contribuicoes_associados.id_recursos_osc : "") : "0"}
                                                ***
                                                <label htmlFor="cp174">Mensalidades ou contribuições de associados</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.premios_recebidos ?
                                                           this.state.recursos_proprios.premios_recebidos.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Prêmios recebidos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.venda_produtos ?
                                                           this.state.recursos_proprios.venda_produtos.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Venda de produtos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.prestacao_servicos ?
                                                           this.state.recursos_proprios.prestacao_servicos.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Prestação de serviços</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_proprios ?
                                                           (this.state.recursos_proprios.venda_bens_direitos ?
                                                           this.state.recursos_proprios.venda_bens_direitos.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Venda de bens e direitos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>



                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/>
                                            <h2>Recursos públicos</h2>
                                            <hr/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.parceria_governo_estadual ?
                                                               this.state.recursos_publicos.parceria_governo_estadual.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parceria com o governo estadual</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.acordo_organismos_multilaterais ?
                                                               this.state.recursos_publicos.acordo_organismos_multilaterais.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Acordo com organismos multilaterais</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.empresas_publicas_sociedades_economia_mista ?
                                                               this.state.recursos_publicos.empresas_publicas_sociedades_economia_mista.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Empresas públicas ou sociedades de economia mista</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.parceria_governo_municipal ?
                                                               this.state.recursos_publicos.parceria_governo_municipal.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parceria com o governo municipal</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.acordo_governos_estrangeiros ?
                                                               this.state.recursos_publicos.acordo_governos_estrangeiros.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Acordo com governos estrangeiros</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_publicos ?
                                                           (this.state.recursos_publicos.transferências_federais_recebidas_osc ?
                                                               this.state.recursos_publicos.transferências_federais_recebidas_osc.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Transferências federais recebidas pela OSC</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/>
                                            <h2>Recursos privados</h2>
                                            <hr/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.parceria_oscs_brasileiras ?
                                                               this.state.recursos_privados.parceria_oscs_brasileiras.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parceria com OSCs brasileiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.parcerias_organizacoes_religiosas_brasileiras ?
                                                               this.state.recursos_privados.parcerias_organizacoes_religiosas_brasileiras.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parcerias com organizações religiosas brasileiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.empresas_privadas_brasileiras ?
                                                               this.state.recursos_privados.empresas_privadas_brasileiras.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Empresas privadas brasileiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.doacoes_pessoa_juridica ?
                                                               this.state.recursos_privados.doacoes_pessoa_juridica.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Doações de pessoa jurídica</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.doacoes_recebidas_forma_produtos_servicos_com_nota_fiscal ?
                                                               this.state.recursos_privados.doacoes_recebidas_forma_produtos_servicos_com_nota_fiscal.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Doações recebidas na forma de produtos e serviços (com Nota Fiscal)</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.parcerias_oscs_estrangeiras ?
                                                               this.state.recursos_privados.parcerias_oscs_estrangeiras.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parcerias com OSCs estrangeiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.parcerias_organizacoes_religiosas_estrangeiras ?
                                                               this.state.recursos_privados.parcerias_organizacoes_religiosas_estrangeiras.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Parcerias com organizações religiosas estrangeiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.empresas_privadas_estrangeiras ?
                                                               this.state.recursos_privados.empresas_privadas_estrangeiras.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Empresas estrangeiras</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_privados ?
                                                           (this.state.recursos_privados.doacoes_pessoa_fisica ?
                                                               this.state.recursos_privados.doacoes_pessoa_fisica.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Doações de pessoa física</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/>
                                            <h2>Recursos não financeiros</h2>
                                            <hr/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_nao_financeiros ?
                                                           (this.state.recursos_nao_financeiros.voluntariado ?
                                                               this.state.recursos_nao_financeiros.voluntariado.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Voluntariado</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_nao_financeiros ?
                                                           (this.state.recursos_nao_financeiros.imunidades ?
                                                               this.state.recursos_nao_financeiros.imunidades.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Imunidades</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_nao_financeiros ?
                                                           (this.state.recursos_nao_financeiros.doacoes_recebidas_forma_produtos_servicos_sem_nota_fiscal ?
                                                               this.state.recursos_nao_financeiros.doacoes_recebidas_forma_produtos_servicos_sem_nota_fiscal.nr_valor_recursos_osc : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Doações recebidas na forma de produtos e serviços (sem Nota Fiscal)</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_nao_financeiros ?
                                                           (this.state.recursos_nao_financeiros.isencoes ?
                                                               this.state.recursos_nao_financeiros.isencoes.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Isenções</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange}
                                                       defaultValue={this.state.recursos_nao_financeiros ?
                                                           (this.state.recursos_nao_financeiros.bens_recebidos_direito_uso ?
                                                               this.state.recursos_nao_financeiros.bens_recebidos_direito_uso.nr_valor_recursos_osc  : "") : ""}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Bens recebidos em direito de uso</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div style={{marginTop: '-10px'}}>
                                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+this.state.color}>
                                                    <i className="far fa-check-circle" style={{display: this.state.showIcon ? '' : 'none'}}/>
                                                    <i className="far fa-times-circle" style={{display: this.state.showIconErro ? 'none' : ''}}/>
                                                    {this.state.msg}
                                                </div>
                                                <button className="btn btn-success" onClick={this.register}><i
                                                    className="fas fa-cloud-download-alt"/> Salvar fontes de recursos</button>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>



                                </form>

                                <div className="space"/>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Recursos/>,
    document.getElementById('recursos')
);
