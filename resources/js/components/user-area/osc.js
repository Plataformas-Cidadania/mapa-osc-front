class Osc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logo: null,
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: '',
            },
            txt: {
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
                tx_razao_social_osc: true,
                tx_sigla_osc: true,
                cd_situacao_imovel_osc: true,
                tx_nome_responsavel_legal: true,
                cnpj: true,
            },
            showMsg: false,
            msg: '',
            showIcon: false,
            objetivos: null,
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,

            dataChkboxMetas: [],

            tooltip: 'Informações provenientes de bases de dados oficiais. Não é possível editar',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateOsc = this.updateOsc.bind(this);
        this.validate = this.validate.bind(this);
        this.getCabecalho = this.getCabecalho.bind(this);
        this.getOsc = this.getOsc.bind(this);
        //this.checkMetas = this.checkMetas.bind(this);
        //this.listChkboxMetas = this.listChkboxMetas.bind(this);
        //this.checkMetas = this.checkMetas.bind(this);
        //this.listObjetivos = this.listObjetivos.bind(this);
        //this.listChkboxMetas = this.listChkboxMetas.bind(this);


        //this.listArea = this.listArea.bind(this);

        this.saveLogo = this.saveLogo.bind(this);

    }

    componentDidMount(){
        this.getCabecalho();
        this.getOsc();
        this.getLogo();
        //this.listArea();
        //this.listChkboxMetas();
        //this.listObjetivos();
    }

    getCabecalho(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            //url: getBaseUrl2+'osc/cabecalho/455128',
            url: getBaseUrl2+'osc/cabecalho/'+this.props.id,
            cache: false,
            success: function (data) {
                this.setState({loading: false, txt: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    getOsc(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            //url: getBaseUrl2+'osc/dados_gerais/455128',
            url: getBaseUrl2+'osc/dados_gerais/'+this.props.id,
            cache: false,
            success: function (data) {
                this.setState({loading: false, form: data, button:true})
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
        let txt = this.state.txt;
        form[name] = value;

        this.setState({form: form, txt: txt});
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;
        let txt = this.state.txt;


        this.setState({requireds: requireds});
        return valid;
    }

    updateOsc(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        const data = {
            id_osc: this.props.id,
            tx_sigla_osc: this.state.form.tx_sigla_osc,
            tx_nome_fantasia_osc: this.state.form.tx_nome_fantasia_osc,
            cd_situacao_imovel_osc: this.state.form.cd_situacao_imovel_osc === null ? -1 : this.state.form.cd_situacao_imovel_osc,
            dt_fundacao_osc: this.state.form.dt_fundacao_osc,
            tx_nome_responsavel_legal: this.state.form.tx_nome_responsavel_legal,
            tx_email: this.state.form.tx_email,
            tx_site: this.state.form.tx_site,
            tx_telefone: this.state.form.tx_telefone == "" ? " " : this.state.form.tx_telefone,
            tx_resumo_osc: this.state.form.tx_resumo_osc,
        }


        if(this.state.form.dt_ano_cadastro_cnpj !== null) {
            data.dt_ano_cadastro_cnpj = this.state.form.dt_ano_cadastro_cnpj
        }

        if(this.state.form.dt_fundacao_osc !== null) {
            data.dt_fundacao_osc = this.state.form.dt_fundacao_osc
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'PUT',
                //url: getBaseUrl2+'osc/dados_gerais/455128',
                url: getBaseUrl2+'osc/dados_gerais/'+this.props.id,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: data,
                /*data:{
                    //id_osc: 455128,
                    id_osc: this.props.id,
                    tx_sigla_osc: this.state.form.tx_sigla_osc,
                    tx_nome_fantasia_osc: this.state.form.tx_nome_fantasia_osc,
                    cd_situacao_imovel_osc: this.state.form.cd_situacao_imovel_osc,
                    dt_ano_cadastro_cnpj: this.state.form.dt_ano_cadastro_cnpj,
                    dt_fundacao_osc: this.state.form.dt_fundacao_osc,
                    tx_nome_responsavel_legal: this.state.form.tx_nome_responsavel_legal,
                    tx_email: this.state.form.tx_email,
                    tx_site: this.state.form.tx_site,
                    tx_telefone: this.state.form.tx_telefone == "" ? " " : this.state.form.tx_telefone,
                    tx_resumo_osc: this.state.form.tx_resumo_osc,
                },*/
                cache: false,
                success: function(data) {
                    let msg = 'Dados alterados com sucesso!';
                    this.setState({loading: false, msg: msg, showMsg: true,  updateOk: true, button: true});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({loading: false, msg: msg, showMsg: true,  updateOk: true, button: true});
                }.bind(this)
            });
        });
    }

    /*listArea(){
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
    }*/
    /*listObjetivos(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/objetivos/'+455128,
            success: function (data) {
                //console.log('-----data', data);
                let objetosSelected = [];
                data.find(function(item){
                    objetosSelected.push(item.meta_projeto.objetivo_projeto.cd_objetivo_projeto);
                });

                const arrUnique = [...new Set(objetosSelected)];

                this.setState({loading: false, datalistObjetivos: arrUnique})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }*/

    /*callSubobjetivos(id){
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

                objetivos.find(function(item){
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
                });


                this.setState({
                    loading: false,
                    objetivos: objetivos,
                    id_area:id,
                    buttonObjetivos:id,
                    titleMeta:true,
                    titleObjetivo:titleObjetivo
                })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }*/

    /*listChkboxMetas(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/objetivos/'+455128,
            success: function (data) {
                data.find(function(item){
                    item.checked = true;
                    item.metas = null;
                });

                this.setState({dataChkboxMetas: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    checkMetas(cd_objetivo, cd_meta, id_objetivo_osc, checkedMeta){
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

        if(checkedMeta===true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/objetivo',
                data: {
                    cd_meta_osc: cd_meta,
                    id_osc: 455128,
                    ft_objetivo_osc: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    this.listChkboxMetas();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/objetivo/'+id_objetivo_osc,
                data: {

                },
                cache: false,
                success: function(data){
                    this.listChkboxMetas();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }


        this.setState({objetivos: objetivos});
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
                objetivos.find(function(item){
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
                });

                this.setState({loading: false, objetivos: objetivos, id_area:id, buttonObjetivos:id, titleMeta:true, titleObjetivo:titleObjetivo})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }*/

    setLogo(){
        document.getElementById('logoOsc').value = "";
        document.getElementById('logoOsc').click();
    }


    saveLogo(e){
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append(
            "logo",
            file,
            file.name
        );


        $.ajax({
            method: 'POST',
            url: getBaseUrl2+'osc/logo/'+this.props.id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            data: formData,
            processData: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
            contentType: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
            cache: false,
            success: function(data){
                this.setState({logo: data});
                //this.setState({logo: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    getLogo(){
        $.ajax({
            method: 'GET',
            url: getBaseUrl2+'osc/logo/'+this.props.id,
            processData: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
            contentType: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
            cache: false,
            success: function(data){
                this.setState({logo: data});
                //this.setState({logo: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    render(){


        /*function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }*/

        /*let objetivos = null;
        let metas = [];
        if(this.state.objetivos){
            objetivos = this.state.objetivos.map(function (item) {
                let checkedMetas = false;

                if(this.state.datalistObjetivos){
                    if(this.state.datalistObjetivos.indexOf(item.cd_objetivo_projeto) != -1){
                        checkedMetas = true;
                    }
                }

                let png = padDigits(item.cd_objetivo_projeto, 2);

                if(item.metas){
                    metas.push(item.metas.map(function (itemMeta) {
                        if(itemMeta.checked){
                            checkedMetas = true;
                        }

                        let checkedMeta = false;
                        let id_objetivo_osc = 0;
                        this.state.dataChkboxMetas.find((itemChecked) => {
                            if(itemMeta.cd_meta_projeto === itemChecked.cd_meta_osc){
                                checkedMeta = true;
                                id_objetivo_osc = itemChecked.id_objetivo_osc;
                            }
                        });
                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_osc, !checkedMeta)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required  defaultChecked={checkedMeta} onChange={this.handleInputChange}/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto}  >{itemMeta.tx_nome_meta_projeto}</label>
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
                            <img src={"img/ods/" + png + ".png"} alt="" className={(checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos==item.cd_objetivo_projeto ? " item-focus" : "")} width="83" style={{position: 'relative'}} title={item.tx_nome_objetivo_projeto}/>
                        </label>
                    </div>
                );
            }.bind(this));
        }*/


        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="title-user-area">
                                        <div className="mn-accordion-icon"><i className="fa fa-file-alt" aria-hidden="true"/></div>
                                        <h3>Dados gerais</h3>
                                        <hr/><br/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="img-upload" onClick={this.setLogo} style={{cursor: 'pointer'}}>
                                        <img
                                            /*src={`data:image/png;base64,${this.state.logo}`}*/
                                            src={this.state.logo}
                                            alt=""/>
                                        <div className="img-upload-i"><i className="fas fa-image tx-pri"/></div>
                                    </div>
                                    <input type="file" id="logoOsc" onChange={this.saveLogo} style={{display: 'none'}}/>
                                </div>
                                <div className="col-md-9">
                                    <br/>
                                        <p>
                                            <strong>Nome:</strong> {this.state.txt.tx_razao_social_osc}<br/>
                                            <strong>CNPJ:</strong> {this.state.txt.cd_identificador_osc}<br/>
                                            <strong>Natureza Jurídica:</strong> {this.state.txt.tx_nome_natureza_juridica_osc}<br/>
                                        </p>
                                </div>
                            </div>

                            <br/><br/>

                                <form>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="label-float">
                                                <input className={"form-control form-g"} type="text" name="tx_sigla_osc" onChange={this.handleInputChange} value={this.state.form.tx_sigla_osc}
                                                       placeholder="Insira a Sigla" />
                                                <label htmlFor="tx_sigla_osc">Sigla</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="label-float">
                                                <input className={"form-control form-g"} type="text" name="tx_nome_fantasia_osc" onChange={this.handleInputChange} value={this.state.form.tx_nome_fantasia_osc}
                                                       placeholder="Insira o Nome Fantasia" disabled/>
                                                <label htmlFor="tx_razao_social_osc">Nome Fantasia</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-7">
                                            <div className="alert alert-secondary">

                                                <div className="tooltips float-right">
                                                    <i className="fas fa-database tx-pri"/>
                                                    <span className="tooltiptext">{this.state.tooltip}</span>
                                                </div>
                                                <strong>Endereço:</strong><br/>
                                                {this.state.form.tx_endereco}, {this.state.form.nr_localizacao}<br/>
                                                {this.state.form.tx_bairro}, {this.state.form.tx_nome_municipio} - {this.state.form.tx_nome_uf}<br/>
                                                <strong>CEP.:</strong> {this.state.form.nr_cep}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEstado">Situação do Imóvel</label>
                                            <select name="cd_situacao_imovel_osc" className={"form-control"} value={this.state.form.cd_situacao_imovel_osc} onChange={this.handleInputChange}>
                                                <option value="-1">Selecione</option>
                                                <option value="1">Próprio</option>
                                                <option value="2">Alugado</option>
                                                <option value="3">Cedido</option>
                                                <option value="4">Comodato</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputAddress2">Ano de inscrição do CNPJ</label>
                                            <input className={"form-control form-g "} type="date" name="dt_ano_cadastro_cnpj" onChange={this.handleInputChange} value={this.state.form.dt_ano_cadastro_cnpj} disabled/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputCity">Ano de Fundação</label>
                                            <input className={"form-control form-g "} type="date" name="dt_fundacao_osc" onChange={this.handleInputChange} value={this.state.form.dt_fundacao_osc}/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_nome_responsavel_legal" onChange={this.handleInputChange} value={this.state.form.tx_nome_responsavel_legal}
                                                       placeholder="Insira o Responsável Legal" />
                                                <label htmlFor="tx_email">Responsável Legal</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_email" onChange={this.handleInputChange} value={this.state.form.tx_email}
                                                       placeholder="Insira o endereço de email da OSC" />
                                                <label htmlFor="tx_email">E-mail oficial da OSC</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_site" onChange={this.handleInputChange} value={this.state.form.tx_site}
                                                       placeholder="Ex.: http://www.seudominio.com.br" />
                                                <label htmlFor="tx_site">Website</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_telefone" onChange={this.handleInputChange} value={this.state.form.tx_telefone}
                                                       placeholder="Se houver, insira o telefone" />
                                                <label htmlFor="tx_telefone">Telefone</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_telefone" onChange={this.handleInputChange} value={this.state.form.tx_telefone}
                                                       placeholder="Se houver, insira o celular" />
                                                <label htmlFor="tx_telefone">Celular</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>*/}
                                        <div className="col-md-12">
                                            <div className="label-float-tx">
                                            <textarea className="form-control form-g" name="tx_resumo_osc" onChange={this.handleInputChange} value={this.state.form.tx_resumo_osc}
                                                      rows="3" placeholder="O que a OSC faz"/>
                                                <label htmlFor="tx_resumo_osc">O que a OSC faz</label>
                                                <div className="label-box-info-tx">
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
                                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                                    <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                                    {this.state.msg}
                                                </div>
                                                <button type="button" className="btn btn-success" onClick={this.updateOsc}><i
                                                    className="fas fa-cloud-download-alt"/> Salvar</button>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>

                                    <br/><br/>

                                    {/*<div className="row">
                                        <div className="col-md-12">
                                            <strong>Objetivos do Desenvolvimento Sustentável - ODS</strong><hr/>
                                            <div>
                                                {objetivos}
                                                <br/><br/>
                                            </div>
                                            <div style={{display: this.state.titleMeta ? '' : 'none'}}>
                                                <strong>Metas Relacionadas ao ODS definido</strong><hr/>
                                                <div>
                                                    <strong>{this.state.titleObjetivo}</strong><br/><br/>
                                                    {metas}
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}




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
    <Osc id={id}/>,
    document.getElementById('osc')
);
