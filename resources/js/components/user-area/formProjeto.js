class FormProjeto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_projeto: true,
                dt_fim_projeto: true,
                cd_uf: true,
                cd_projeto: true,
            },
            showMsg: false,
            msg: '',
            projetos: [],
            maxAlert: false,
            cd_projeto:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
            },
            action: '',//new | edit
            editId: this.props.id,

            objetivos: null,
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,

            active: false,
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

    componentDidMount(){
        this.listArea();
    }

    componentWillReceiveProps(props){
        let lastEditId = this.state.editId;
        if(this.state.action != props.action || this.state.editId != props.id){
            this.setState({action: props.action, editId: props.id}, function(){
                if(lastEditId != props.id){
                    this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if(this.state.action=='new'){
                    this.cleanForm();
                }
            });
        }
    }

    edit(){
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/projeto/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({form: data}, function(){
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function(xhr, status, err){
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

        this.setState({form: form});
    }

    cleanForm(){
        let form = this.state.form;
        for(let i in form){
            form[i] = '';
        }
        this.setState({form: form});
    }

    validate(){
        console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let url = '/register-projeto';
        let id = null;
        if(this.state.action==='edit'){
            id = this.state.editId;
            url = '/update-user-projeto';
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: url,
                data:{
                    form: this.state.form,
                    id: id,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, projetos: data.projetos});
                        return;
                    }

                    let button = true;
                    if(this.state.action==='new'){
                        if(data.projetos.length >= data.maxProjetos){
                            button = false;
                        }
                    }

                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({projetos: data.projetos, loading: false, button: button, btnContinue: btnContinue})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, button: true});
                }.bind(this)
            });
        });


    }

    /*Objetivos e metas*/


    listArea(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/objetivo_projeto',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });
                this.setState({loading: false, objetivos: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubobjetivos(id){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'componente/metas_objetivo_projeto/'+id,
            success: function (data) {

                let objetivos = this.state.objetivos;


                let titleObjetivo = this.state.objetivos[id-1].tx_nome_objetivo_projeto;

                data.find(function(item){
                    item.display = true;
                    item.checked = false;

                });


                console.log(objetivos);

                objetivos.find(function(item){
                    if(item.metas){
                        item.metas.find(function(itemMeta){
                            itemMeta.display = false;
                            console.log('display: '+itemMeta.display);
                        });

                        if(item.cd_objetivo_projeto === id){
                            item.metas.find(function(itemMeta){
                                itemMeta.display = true;
                                console.log('display2: '+itemMeta.display);
                            });
                        }
                    }
                    if(item.cd_objetivo_projeto === id && !item.metas){
                        item.metas = data;
                        console.log('display3: ' + item.display)
                    }


                });

                this.setState({loading: false, objetivos: objetivos, id_area:id, buttonObjetivos:id, titleMeta:true, titleObjetivo:titleObjetivo})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    checkMetas(cd_objetivo, cd_meta){
        console.log(cd_objetivo, cd_meta);
        let objetivos = this.state.objetivos;
        objetivos.find(function(item){
            if(item.cd_objetivo_projeto === cd_objetivo){
                item.metas.find(function (itemMeta) {
                    if(itemMeta.cd_meta_projeto === cd_meta){
                        itemMeta.checked = true;
                    }
                });
            }
        });
        this.setState({objetivos: objetivos});
    }
    /*******************/

    clickFontRecurso() {
        this.setState({
            active: !this.state.active
        });
    }




    render(){

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = [];
        if(this.state.objetivos){
            objetivos = this.state.objetivos.map(function (item) {

                let png = padDigits(item.cd_objetivo_projeto, 2);

                let checkedMetas = false;

                console.log('objetivos: ', this.state.buttonObjetivos, item.cd_objetivo_projeto);

                if(item.metas){
                    metas.push(item.metas.map(function (itemMeta) {
                        if(itemMeta.checked){
                            checkedMetas = true;
                        }
                        console.log('cd_objetivo_projeto: '+item.cd_objetivo_projeto+' cd_meta_projeto: '+itemMeta.cd_meta_projeto+' display: '+itemMeta.display);
                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto} >{itemMeta.tx_nome_meta_projeto}</label>
                                </div>
                                <hr />
                            </div>
                        );
                    }.bind(this)));
                }

                return (
                    <div className="custom-control custom-checkbox" key={"area_"+item.cd_objetivo_projeto} onChange={() => this.callSubobjetivos(item.cd_objetivo_projeto)} style={{paddingLeft: 0}}>
                        <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_objetivo_projeto} required />
                        <label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '0', marginRight: '5px', paddingBottom: 0, }}>
                            {/*<label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '-15px', marginRight: '5px', paddingBottom: 0, }}>*/}
                            {/*<i className="fas fa-check-circle text-success" style={{position: 'relative', right: '-78px', top: '-28px', zIndex: '99999'}}/>*/}
                            <img src={"img/ods/" + png + ".png"} alt="" className={(checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos==item.cd_objetivo_projeto ? " item-focus" : "")} width="80" style={{position: 'relative'}} title={item.tx_nome_objetivo_projeto}/>
                            {/*checkedMetas ? "" : "item-off" +*/}
                            {/*(this.state.buttonObjetivos==item.cd_objetivo_projeto+1) ? "item-off " : "item-off item-focus"*/}
                        </label>
                    </div>
                );
            }.bind(this));
        }

        return(
            <div className="row">
                <div className="col-md-12">
                    <form>



                        <div className="row">



                            <div className="col-md-12">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_nome_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.tx_nome_projeto}
                                           placeholder="Nome do projeto, atividade ou programa" />
                                    <label htmlFor="tx_nome_projeto">Nome do projeto, atividade ou programa</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <select className={"form-control form-m "+(this.state.form.cd_status_projeto ? '' : 'invalid-field')}
                                        name="cd_status_projeto" onChange={this.handleInputChange} value={this.state.form.cd_status_projeto}>
                                    <option value="-1">Selecione</option>
                                    <option value="1">Arquivado, cancelado ou indeferido</option>
                                    <option value="3">Proposta</option>
                                    <option value="3">Projeto em andamento</option>
                                    <option value="2">Finalizado</option>
                                    <option value="5">Outro</option>
                                </select><br/>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="date" name="dt_data_inicio_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.dt_data_inicio_projeto}
                                           placeholder="Data de Início" />
                                    <label htmlFor="dt_data_inicio_projeto">Data de Início</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="date" name="dt_data_fim_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.dt_data_fim_projeto}
                                           placeholder="Data de Fim" />
                                    <label htmlFor="dt_data_fim_projeto">Data de Fim</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-8">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_link_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.tx_link_projeto}
                                           placeholder="Link para o projeto" />
                                    <label htmlFor="tx_link_projeto">Link para o projeto</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="nr_total_beneficiarios" onChange={this.handleInputChange}
                                           value={this.state.form.nr_total_beneficiarios}
                                           placeholder="Total de Beneficiários" />
                                    <label htmlFor="nr_total_beneficiarios">Total de Beneficiários</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="nr_valor_total_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.nr_valor_total_projeto}
                                           placeholder="Valor Total" />
                                    <label htmlFor="nr_valor_total_projeto">Valor Total</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="nr_valor_captado_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.nr_valor_captado_projeto}
                                           placeholder="Valor Recebido" />
                                    <label htmlFor="nr_valor_captado_projeto">Valor Recebido</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group col-md-12">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_descricao_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.tx_descricao_projeto}
                                           placeholder="Descrição do Projeto, atividade e/ou programa" />
                                    <label htmlFor="tx_descricao_projeto">Descrição do Projeto, atividade e/ou programa</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-12">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_metodologia_monitoramento" onChange={this.handleInputChange}
                                           value={this.state.form.tx_metodologia_monitoramento}
                                           placeholder="Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa" />
                                    <label htmlFor="tx_metodologia_monitoramento">Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>



                            <div className="col-md-4">
                                {/*<label htmlFor="cd_certificado">Abrangência de atuação*</label><br/>*/}
                                <select className={"form-control form-m "+(this.state.requireds.tx_nome_abrangencia_projeto ? '' : 'invalid-field')}
                                        name="cd_abrangencia_projeto" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_abrangencia_projeto}>
                                    <option value="-1">Selecione</option>
                                    <option value="1">Municipal</option>
                                    <option value="2">Estadual</option>
                                    <option value="3">Regional</option>
                                    <option value="4">Nacional</option>
                                </select><br/>
                            </div>

                            <div className="col-md-4">
                                {/*<label htmlFor="tx_nome_zona_atuacao">Zona de Atuação*</label><br/>*/}
                                <select className={"form-control form-m "+(this.state.requireds.tx_nome_zona_atuacao ? '' : 'invalid-field')}
                                        name="cd_zona_atuacao_projeto" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_zona_atuacao}>
                                    <option value="-1">Selecione</option>
                                    <option value="1">Rural</option>
                                    <option value="2">Urbana</option>
                                </select><br/>
                            </div>




                            <div className={this.state.active === false ? 'col-md-12' : 'col-md-6'}>
                                <br/>
                                <h3>Fontes de Recursos</h3>
                                <hr/>

                                <div className="bg-lgt items-checkbox" onChange={this.clickFontRecurso}>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_publico"} required/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_publico"} >Recursos públicos</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_privado"} required/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_privado"} >Recursos privados</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_proprio"} required/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_proprio"} >Recursos próprios</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_nao_financeiro"} required/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_nao_financeiro"} >Recursos não financeiros</label>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-6" style={{display: this.state.active === false ? 'none' : ''}}>
                                <br/>
                                <h3>Tipo de Parceria</h3>
                                <hr/>
                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_acordo"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_acordo"} >Acordo de cooperação técnica</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_fomento"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_fomento"} >Termo de fomento</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_colaboracao"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_colaboracao"} >Termo de colaboração</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_parceria"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_parceria"} >Termo de parceria</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_contrato"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_contrato"} >Contrato de gestão</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_convenio"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_convenio"} >Convênio</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={"tipo_parceria_outro"} required/>
                                        <label className="custom-control-label" htmlFor={"tipo_parceria_outro"} >Outro</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <br/>
                                <div className="row">

                                    <div className="col-md-11">
                                        <h3>OSCs Parceiras</h3>
                                    </div>
                                    <div className="col-md-1 float-right">
                                        <button className="btn btn-primary">
                                            <i className="fas fa-plus"/>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <hr/>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_link_projeto" onChange={this.handleInputChange}
                                                   value={this.state.form.tx_link_projeto}
                                                   placeholder="Insica o CNPJ da OSC Parceira" />
                                            <label htmlFor="tx_link_projeto">OSCs Parceiras</label>
                                            <div className="label-box-info-off">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" style={{marginTop: '-59px', float: 'right', zIndex: '9999999', position: 'relative'}}>
                                            <i className="fas fa-minus"/>
                                        </button>
                                    </div>
                                </div>

                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><strong>Público Beneficiado</strong></p>
                                        <hr/>
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_link_projeto" onChange={this.handleInputChange}
                                                   value={this.state.form.tx_link_projeto}
                                                   placeholder="Insica o CNPJ da OSC Parceira" />
                                            <label htmlFor="tx_link_projeto">OSCs Parceiras</label>
                                            <div className="label-box-info-off">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" style={{marginTop: '-59px', float: 'right', zIndex: '9999999', position: 'relative'}}>
                                            <i className="fas fa-minus"/>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <p><strong>Local de execução</strong></p>
                                        <hr/>
                                    </div>
                                    <div className="col-md-12">
                                        <p><strong>Financiadores do Projeto</strong></p>
                                        <hr/>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-12">
                                        <strong>Objetivos do Desenvolvimento Sustentável - ODS</strong><hr/>
                                        <div>
                                            {objetivos}
                                            <br/><br/>
                                        </div>
                                        <div style={{display: this.state.titleMeta ? '' : 'none'}}>
                                            <strong>Metas Relacionadas ao ODS definido</strong><hr/>
                                            {/* <div className="card-columns">*/}
                                            <div>
                                                <strong>{this.state.titleObjetivo}</strong><br/><br/>
                                                {metas}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>





                        </div>


                        <p><i>* campos obrigatórios</i></p>
                        <div className="row">
                            <div className="col-md-6">
                                <button style={{display: this.state.action==='edit' ? 'block' : (this.state.projetos.length < maxProjetos ?  'block' : 'none')}}
                                        className="btn btn-success" onClick={this.register}>
                                    Adicionar
                                </button>
                            </div>
                        </div>
                        <br/>

                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                        <div style={{display: this.state.maxAlert ? 'block' : 'none'}} className=" alert alert-danger">Máximo de Certificatos Cadastrados</div>

                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }

}
