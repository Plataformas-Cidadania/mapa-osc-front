class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                email: '',
                cel: '',
                whatsapp: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true,
            },
            showMsg: false,
            msg: '',
            certificados: null,
            areaAtuacao: null,
            subAreaAtuacao: null,
            showWarning: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filter = this.filter.bind(this);
        this.validate = this.validate.bind(this);


    }


    componentDidMount(){
    }

    componentDidUpdate(props){
        if(this.state.certificados != props.certificados ||
            this.state.areaAtuacao != props.areaAtuacao ||
            this.state.subAreaAtuacao != props.subAreaAtuacao
        ){
            this.setState({
                certificados: props.certificados,
                areaAtuacao: props.areaAtuacao,
                subAreaAtuacao: props.subAreaAtuacao,
            });
        }
    }



    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.name==='cel'){
            value = maskCel(value);
        }
        if(target.name==='whatsapp'){
            value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    validate(){

        let valid = true;

        let requireds = this.state.requireds;

        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]===''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }

        if(!this.validateName(this.state.form.name)){
            requireds.name = false;
            valid = false;
        }

        if(this.validateCel(this.state.form.cel)===""){
            requireds.cel = false;
            valid = false;
        }

        this.setState({requireds: requireds});

        return valid;
    }

    validateName(name){
        let array_name = name.split(' ');
        //console.log(array_name);
        //console.log(array_name.length);
        if(array_name.length<2){
            return false;
        }

        return true;
    }

    validateCel(cel){
        cel = cel.replace(/[^0-9]/g,'');
        let qtd = cel.length;

        if(qtd < 10 || qtd > 11){
            return false;
        }
        if(qtd === 11){
            if(cel.substr(2,1)!=9){
                return false;
            }
            if(cel.substr(3,1)!=9 && cel.substr(3,1)!=8 && cel.substr(3,1)!=7 && cel.substr(3,1)!=6){
                return false;
            }
        }
        if(qtd === 10){
            if(cel.substr(2,1)!=9 && cel.substr(2,1)!=8 && cel.substr(2,1)!=7 && cel.substr(2,1)!=6){
                return false;
            }
        }
        return true;
    }

    filter(e){
        //console.log(this.validate());
        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){

            $.ajax({
                method:'POST',
                url: '/filter',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data:{
                    form: this.state.form,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);
                    this.setState({loading: false});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });
    }


    callSubAreaAtuacao(id){
        console.log(id);

        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/subarea_atuacao',
            success: function (data) {
                this.setState({loading: false, subAreaAtuacao: data, id_area:id})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    callIdh(id){
        console.log(id)
        $("#divIdh").show();
    }


    render(){

        let certificados = null;
        if(this.state.certificados){
            certificados = this.state.certificados.map(function (item) {
               return (
                   <div className="custom-control custom-checkbox" key={"cert_"+item.cd_certificado}>
                       <input type="checkbox" className="custom-control-input" id={"cert_"+item.cd_certificado} required/>
                       <label className="custom-control-label" htmlFor={"cert_"+item.cd_certificado}>{item.tx_nome_certificado}</label>
                   </div>
               );
            });
        }
        let areaAtuacao = null;
        if(this.state.areaAtuacao){
            areaAtuacao = this.state.areaAtuacao.map(function (item) {
               return (
                   <div className="custom-control custom-checkbox" key={"area_"+item.cd_area_atuacao} onClick={() => this.callSubAreaAtuacao(item.cd_area_atuacao)}>
                       <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_area_atuacao} required/>
                       <label className="custom-control-label" htmlFor={"area_"+item.cd_area_atuacao} >{item.tx_nome_area_atuacao}</label>
                   </div>
               );
            }.bind(this));
        }

        $("#divIdh").hide();
       /* let subAreaAtuacao = null;

        if(this.state.subAreaAtuacao){

            let subArea = [];

            for (let i in this.state.subAreaAtuacao){
                   if(!subArea[i]){
                    subArea[i] = {
                        subId: [],
                        subTitle: []
                    };
                }
                subArea[i].subId.push(this.state.subAreaAtuacao[i].cd_subarea_atuacao);
                subArea[i].subTitle.push(this.state.subAreaAtuacao[i].tx_nome_subarea_atuacao);
            }

            subArea.push({subArea: subArea});

            console.log('subId ', subArea);

            subAreaAtuacao = this.state.subAreaAtuacao.map(function (item) {
                return (
                    <div className="custom-control custom-checkbox" key={"cert_"+item.cd_subarea_atuacao}>
                        <input type="checkbox" className="custom-control-input" id={"cert_"+item.cd_subarea_atuacao} required/>
                        <label className="custom-control-label" htmlFor={"cert_"+item.cd_subarea_atuacao}>{item.tx_nome_subarea_atuacao}</label>
                    </div>
                );
            }.bind(this));
        }*/

        return (

            <form>

                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="item-1">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse1" aria-expanded="true"
                                 aria-controls="collapse1">
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
                                Dados Gerais
                                 <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse1" className="collapse show " aria-labelledby="heading1"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_razao_social_osc" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Nome da OSC</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_regiao" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Região</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_fantasia_osc" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Nome Fantasia</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_uf" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Estado</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="cd_identificador_osc" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">CNPJ</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        {/*<div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_uf" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Situação do Imóvel</label>
                                            <div className="label-box-info-off"/>
                                        </div>*/}

                                        {/*<select className="custom-select" name="cd_situacao_imovel_oscSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>*/}
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_uf" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Ano de Fundação</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                        <input type="range" className="custom-range" min="0" max="5"  id="customRange2" style={{float:'left'}}/>
                                        <input type="range" className="custom-range" min="0" max="5"  id="customRange2" style={{float:'right'}}/>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_municipio" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Município</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <br/>
                                        <strong>Natureza Jurídica:</strong><br/>
                                        <div className="custom-control custom-checkbox ">
                                            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                            <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                            <div className="invalid-feedback">Example invalid feedback text</div>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                            <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                            <div className="invalid-feedback">Example invalid feedback text</div>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                            <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                            <div className="invalid-feedback">Example invalid feedback text</div>
                                        </div>
                                        <br/><br/>
                                    </div>

                                    <div className="col-md-6">
                                        {/*<select className="custom-select" name="cd_situacao_imovel_oscSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected>Objetivos do Desenvolvimento Sustentável - ODS</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>*/}
                                    </div>
                                    <div className="col-md-6">
                                        {/*<select className="custom-select" name="cd_situacao_imovel_oscSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected>Metas Relacionadas ao ODS</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>*/}
                                    </div>

                                </div>





                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-2">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse2" aria-expanded="true"
                                 aria-controls="collapse2">
                                Áreas e Subáreas de Atuação <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse2" className="collapse" aria-labelledby="heading2"
                             data-parent="#accordionExample">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_atividade_economica" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Atividade Econômica (CNAE)</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <strong>Área de Atuação</strong><br/>

                                        {areaAtuacao}

                                        <br/><br/>

                                        <strong>Subárea de Atuação</strong><br/>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="bg-lgt p-2">
                                                    <strong>Habitação</strong><br/>

                                                    {/*{subAreaAtuacao}*/}

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-3">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse3" aria-expanded="true"
                                 aria-controls="collapse3">
                                Titulações e Certificações <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse3" className="collapse" aria-labelledby="heading3"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {certificados}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-4">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse4" aria-expanded="true"
                                 aria-controls="collapse4">
                                Relações de Trabalho e Governança <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse4" className="collapse" aria-labelledby="heading4"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_dirigente" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Nome do Dirigente</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_cargo_dirigente" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Cargo do Dirigente</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_conselheiro" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Nome do Membro do Conselho Fiscal</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-5">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse5" aria-expanded="true"
                                 aria-controls="collapse5">
                                Espaços de Participação Social <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse5" className="collapse" aria-labelledby="heading5"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                555
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-6">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse6" aria-expanded="true"
                                 aria-controls="collapse6">
                                Projetos <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse6" className="collapse" aria-labelledby="heading6"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                666
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-7">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse7" aria-expanded="true"
                                 aria-controls="collapse7">
                                Fontes de Recursos <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse7" className="collapse" aria-labelledby="heading7"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                777
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-8">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse8" aria-expanded="true"
                                 aria-controls="collapse8">
                                Índice de Desenvolvimento Humano <i className="fas fa-angle-down float-right"></i>
                            </div>
                        </div>
                        <div id="collapse8" className="collapse" aria-labelledby="heading8"
                             data-parent="#accordionExample">
                            <div className="card-body">

                                <div className="custom-control custom-checkbox" onClick={() => this.callIdh()} >
                                    <input type="checkbox" className="custom-control-input" id="IDH_Municipal" required/>
                                    <label className="custom-control-label" htmlFor="IDH_Municipal">IDH Municipal</label>
                                </div>


                                <div id="divIdh" >
                                    <br/>
                                    <strong> Faixas de IDHM:</strong>
                                    <br/>
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="baixo" required/>
                                        <label className="custom-control-label" htmlFor="baixo">Baixo (abaixo de 0,600)</label>
                                    </div>
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="medio" required/>
                                        <label className="custom-control-label" htmlFor="medio">Médio (entre 0,600 e 0,699)</label>
                                    </div>
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="alto" required/>
                                        <label className="custom-control-label" htmlFor="alto">Alto (0,700 ou mais)</label>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-9">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse9" aria-expanded="true"
                                 aria-controls="collapse9">
                                Indicadores Socioeconômicos Adicionais  <i className="fas fa-angle-down float-right"></i>
                            </div>
                        </div>
                        <div id="collapse9" className="collapse" aria-labelledby="heading9"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                999
                            </div>
                        </div>
                    </div>
                </div>


                <div >
                    <label htmlFor="name">Como podemos ajudar?</label>
                    {/*<select className="form-control" id="assunto">
                        <option value="">Selecione o assunto</option>
                        <option value="1">Cadastro Município-Estado</option>
                        <option value="2">Cadastro Representante</option>
                        <option value="3">Dúvidas</option>
                        <option value="4">Inserção/Edição de dados</option>
                        <option value="5">Pedidos de dados</option>
                        <option value="6">Relatar Problemas</option>
                        <option value="7">Sugestão</option>
                        <option value="8">Outros</option>
                    </select><br/>*/}
                </div>



                <div className="label-float">
                    <input className={"form-control form-g"+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder=" " required={this.state.requireds.email ? '' : 'required'}/>
                    <label htmlFor="email">E-mail</label>
                    <div className="label-box-info">
                        <p style={{display: this.state.requireds.email ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Escolha um endereço de e-mail valido</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="label-float">
                            <input className={"form-control form-g"} type="text" name="cel" onChange={this.handleInputChange} value={this.state.form.cel} placeholder=" " maxLength="15" required={this.state.requireds.cel ? '' : 'required'} />
                            <label htmlFor="cel">Celular</label>
                            <div className="label-box-info">
                                <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite um número de celular</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="label-float">
                            <input className={"form-control"} type="text" name="whatsapp" onChange={this.handleInputChange} value={this.state.form.whatsapp} placeholder=" " maxLength="15"/>
                            <label htmlFor="name">Whatsapp<span className={"label-float-optional"}> - Opicional</span></label>
                            <div className="label-box-info"></div>
                        </div>
                    </div>
                </div>



                <div className="clear-float"></div>
                {/*<p><i>* campos obrigatórios</i></p>*/}


                <button type="button" style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.filter}>Filtrar</button>
                <br/>
                {/*{this.state.form.cel}*/}

                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
            </form>



        );
    }
}


