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
        this.getOsc = this.getOsc.bind(this);
        this.getCabecalho = this.getCabecalho.bind(this);
    }

    componentDidMount(){
        this.getOsc();
        this.getCabecalho();
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
                                                <input className={"form-control form-g"} type="text" name="tx_razao_social_osc" onChange={this.handleInputChange} value={this.state.form.tx_razao_social_osc}
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
                                                {this.state.form.tx_endereco}, {this.state.form.nr_localizacao}, ***<br/>
                                                {this.state.form.tx_bairro}, {this.state.form.cd_municipio} - ***<br/>
                                                <strong>CEP.:</strong> {this.state.form.nr_cep}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEstado">Situação do Imóvel</label>
                                            <select id="inputEstado" className="form-control">
                                                <option selected>Escolher...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputAddress2">Ano de inscrição no Cadastro de CNPJ</label>
                                            <input type="date" className="form-control" id="inputAddress2"
                                                   placeholder="Apartamento, hotel, casa, etc."/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputCity">Ano de Fundação</label>
                                            <input type="date" className="form-control" id="inputCity"/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_email" onChange={this.handleInputChange} value={this.state.form.tx_nome_responsavel_legal}
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
                                            <textarea className="form-control form-g" name="tx_finalidades_estatutarias" onChange={this.handleInputChange} value={this.state.form.tx_finalidades_estatutarias}
                                                      rows="3" placeholder="O que a OSC faz"/>
                                                <label htmlFor="tx_finalidades_estatutarias">O que a OSC faz</label>
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
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck"/>
                                                            <label className="form-check-label" htmlFor="gridCheck">
                                                                1.1 Até 2030, erradicar a pobreza extrema para todas as
                                                                pessoas em todos os lugares, atualmente medida como
                                                                pessoas vivendo com menos de US$ 1,25 por dia
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck2"/>
                                                            <label className="form-check-label" htmlFor="gridCheck2">
                                                                1.2 Até 2030, reduzir pelo menos à metade a proporção de
                                                                homens, mulheres e crianças, de todas as idades, que
                                                                vivem na pobreza, em todas as suas dimensões, de acordo
                                                                com as definições nacionais
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck3"/>
                                                            <label className="form-check-label" htmlFor="gridCheck3">
                                                                1.3 Implementar, em nível nacional, medidas e sistemas
                                                                de proteção social adequados, para todos, incluindo
                                                                pisos, e até 2030 atingir a cobertura substancial dos
                                                                pobres e vulneráveis
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck4"/>
                                                            <label className="form-check-label" htmlFor="gridCheck4">
                                                                1.4 Até 2030, garantir que todos os homens e mulheres,
                                                                particularmente os pobres e vulneráveis, tenham direitos
                                                                iguais aos recursos econômicos, bem como o acesso a
                                                                serviços básicos, propriedade e controle sobre a terra e
                                                                outras formas de propriedade, herança, recursos
                                                                naturais, novas tecnologias apropriadas e serviços
                                                                financeiros, incluindo microfinanças
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck5"/>
                                                            <label className="form-check-label" htmlFor="gridCheck5">
                                                                1.5 Até 2030, construir a resiliência dos pobres e
                                                                daqueles em situação de vulnerabilidade, e reduzir a
                                                                exposição e vulnerabilidade destes a eventos extremos
                                                                relacionados com o clima e outros choques e desastres
                                                                econômicos, sociais e ambientais
                                                            </label>
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
