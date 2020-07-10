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
            showIcon: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateOsc = this.updateOsc.bind(this);
        this.validate = this.validate.bind(this);
        this.getCabecalho = this.getCabecalho.bind(this);
        this.getOsc = this.getOsc.bind(this);
    }

    componentDidMount(){
        this.getCabecalho();
        this.getOsc();
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



    render(){

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

                                    <h4>Objetivos do Desenvolvimento Sustentável - ODS</h4>

                                    <div>
                                        <ul className="menu-txt-icon">
                                            <li><img src="img/ods/01.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/02.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/03.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/04.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/05.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/06.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/07.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/08.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/09.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/10.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/11.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/12.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/13.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/14.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/15.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/16.png" alt="" className="item-off" width="87"/></li>
                                            <li><img src="img/ods/17.png" alt="" className="item-off" width="87"/></li>
                                        </ul>
                                        <div>
                                            <div>
                                                <br/><br/>
                                                <h4><strong>1 - Acabar com a pobreza em todas as suas formas, em todos os lugares</strong></h4>
                                                <br/>
                                            </div>
                                            <div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox ">
                                                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                                        <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                                        <div className="invalid-feedback">Example invalid feedback text</div>
                                                    </div>
                                                    <br/>
                                                    <div className="custom-control custom-checkbox ">
                                                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                                        <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                                        <div className="invalid-feedback">Example invalid feedback text</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    {/*<div className="col-md-12">
                                        <div>
                                            <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.register}>Salvar</button>
                                            <br/>
                                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'text-'+this.state.color}>{this.state.msg}</div>
                                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                                        </div>
                                    </div>*/}


                                    {/*<div className="row">
                                        <div className="col-md-12">
                                            <div style={{marginTop: '-10px'}}>
                                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+this.state.color}>
                                                    <i className="far fa-check-circle" style={{display: this.state.showIcon ? 'none' : ''}}/>
                                                    <i className="far fa-times-circle" style={{display: this.state.showIconErro ? 'none' : ''}}/>
                                                    {this.state.msg}
                                                </div>
                                                <button  className="btn btn-success" onClick={this.register}><i
                                                    className="fas fa-cloud-download-alt"/> Salvar descrição</button>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>*/}
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
