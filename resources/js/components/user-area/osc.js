class Osc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
                tx_nome_situacao_imovel_osc: true,
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

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateOsc = this.updateOsc.bind(this);
        this.validate = this.validate.bind(this);
        this.getCabecalho = this.getCabecalho.bind(this);
        this.getOsc = this.getOsc.bind(this);
        this.checkMetas = this.checkMetas.bind(this);

        this.listArea = this.listArea.bind(this);
    }

    componentDidMount(){
        this.getCabecalho();
        this.getOsc();
        this.listArea();
    }

    getCabecalho(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: 'http://mapa-osc-api.local/api/osc/cabecalho/455128',
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
            url: 'http://mapa-osc-api.local/api/osc/dados_gerais/455128',
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
        //console.log(this.state.form);
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

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'PUT',
                url: 'http://mapa-osc-api.local/api/osc/dados_gerais/455128',
                data: this.state.form,
                cache: false,
                success: function(data) {

                    /*let msg = 'Já existe outro cadastro com esse';

                    if(data.tx_razao_social_osc || data.email){
                        if(data.tx_razao_social_osc){
                            msg+= ' tx_razao_social_osc';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, showIcon: true});
                        return;
                    }*/

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
                let titleObjetivo = this.state.objetivos[0].tx_nome_objetivo_projeto;

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

                //console.log('objetivos: ', this.state.objetivos);

                /*this.state.objetivos.find(function(item){
                    if(item.cd_area_atuacao === id){
                        item.checked = !item.checked;
                    }
                    item.subareas = data.filter(function(subitem){
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });*/
                this.setState({loading: false, objetivos: objetivos, id_area:id, titleMeta:true, titleObjetivo:titleObjetivo})
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

    render(){

        console.log(this.state.objetivos);

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = null;
        if(this.state.objetivos){
            objetivos = this.state.objetivos.map(function (item) {

                let png = padDigits(item.cd_objetivo_projeto, 2);

                let checkedMetas = false;

                if(item.metas){
                    metas = item.metas.map(function (itemMeta) {
                        if(itemMeta.checked){
                            checkedMetas = true;
                        }
                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto} >{itemMeta.tx_nome_meta_projeto}</label>
                                </div>
                                <hr />
                            </div>
                        );
                    }.bind(this));
                }

                return (
                    <div className="custom-control custom-checkbox" key={"area_"+item.cd_objetivo_projeto} onChange={() => this.callSubobjetivos(item.cd_objetivo_projeto)} style={{paddingLeft: 0}}>
                        <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_objetivo_projeto} required />
                        <label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '0', marginRight: '5px', paddingBottom: 0, }}>
                        {/*<label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '-15px', marginRight: '5px', paddingBottom: 0, }}>*/}
                            {/*<i className="fas fa-check-circle text-success" style={{position: 'relative', right: '-78px', top: '-28px', zIndex: '99999'}}/>*/}
                            <img src={"img/ods/" + png + ".png"} alt="" className={"item-off "+(checkedMetas ? "btn btn-primary" : "")} width="80" style={{position: 'relative'}}/>
                        </label>
                    </div>
                );
            }.bind(this));
        }

        /*if(this.state.metas){
            metas = this.state.metas.map(function (item) {
                return(
                    <div key={"subarea_"+item.cd_meta_projeto}>
                        <div className="custom-control custom-checkbox" onChange={() => console.log(item.cd_meta_projeto)}>
                            <input type="checkbox" className="custom-control-input" id={"subarea_"+item.cd_meta_projeto} required/>
                            <label className="custom-control-label" htmlFor={"subarea_"+item.cd_meta_projeto} >{item.tx_nome_meta_projeto}</label>
                        </div>
                        <hr />
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
                                    <div className="title-style">
                                        <h2>Dados Gerais</h2>
                                        <div className="line line-fix"/>
                                        <hr/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="img-upload">
                                        <img
                                            src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif"
                                            alt=""/>
                                            <div className="img-upload-i"><i className="fas fa-image tx-pri"/></div>
                                    </div>
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
                                                       placeholder="Insira o Nome Fantasia" />
                                                <label htmlFor="tx_razao_social_osc">Nome Fantasia</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <div className="alert alert-secondary">
                                                <i className="fas fa-database float-right tx-pri"/>
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
                                            <select name="tx_nome_situacao_imovel_osc" className={"form-control"} value={this.state.form.tx_nome_situacao_imovel_osc} onChange={this.handleInputChange}>
                                                <option value="-1">Selecione</option>
                                                <option value="Próprio">Próprio</option>
                                                <option value="Alugado">Alugado</option>
                                                <option value="Cedido">Cedido</option>
                                                <option value="Comodato">Comodato</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputAddress2">Ano de inscrição do CNPJ</label>
                                            <input className={"form-control form-g "} type="date" name="dt_ano_cadastro_cnpj" onChange={this.handleInputChange} value={this.state.form.dt_ano_cadastro_cnpj}/>
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
                                                       placeholder="Se houver, insira o endereço da página da OSC na internet. Ex.: http://www.seudominio.com.br" />
                                                <label htmlFor="tx_site">Web site</label>
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
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_telefone" onChange={this.handleInputChange} value={this.state.form.tx_telefone}
                                                       placeholder="Se houver, insira o celular" />
                                                <label htmlFor="tx_telefone">Celular</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

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

                                    <br/><br/>


                                    <div className="row">
                                        <div className="col-md-12">
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


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div style={{marginTop: '-10px'}}>
                                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                                    <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                                    {this.state.msg}
                                                </div>
                                                <button type="button" className="btn btn-success" onClick={this.updateOsc}><i
                                                    className="fas fa-cloud-download-alt"/> Salvar descrição</button>
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
    <Osc/>,
    document.getElementById('osc')
);
