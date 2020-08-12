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
            ipeaData: null,
            active: false,
            rangerMin1: null,
            input: 0,
            inputMax: 100,
            textRanger: null,
            filters: {
                ano_fundacao: {start: null, end:null},
                ano_fundacao2: {start: null, end:null},
            },
            listRegiao:[],
        };

        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.listRegiao = this.listRegiao.bind(this);
        this.addRegiao = this.addRegiao.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);


        this.filter = this.filter.bind(this);
        this.clickIdh = this.clickIdh.bind(this);

        this.setAnoFundacao = this.setAnoFundacao.bind(this);
        this.setTotalTrabalhadores = this.setTotalTrabalhadores.bind(this);
        this.setTotalEmpregados = this.setTotalEmpregados.bind(this);
        this.setTrabalhadoresDeficiencia = this.setTrabalhadoresDeficiencia.bind(this);
        this.setTrabalhadoresVoluntarios = this.setTrabalhadoresVoluntarios.bind(this);

        this.setAnoFonteRecurso = this.setAnoFonteRecurso.bind(this);
        this.setRendimentosFinanceirosReservas = this.setRendimentosFinanceirosReservas.bind(this);
        this.setRendimentosFundosPatrimoniais = this.setRendimentosFundosPatrimoniais.bind(this);
        this.setMensalidadesContribuicoes = this.setMensalidadesContribuicoes.bind(this);
        this.setVendaBensDireitos = this.setVendaBensDireitos.bind(this);
        this.setPremiosRecebidos = this.setPremiosRecebidos.bind(this);
        this.setVendaProdutos = this.setVendaProdutos.bind(this);
        this.setPrestacaoServicos = this.setPrestacaoServicos.bind(this);

        this.setEmpresasPublicasSociedadesEconomia = this.setEmpresasPublicasSociedadesEconomia.bind(this);
        this.setAcordoOrganismosMultilaterais = this.setAcordoOrganismosMultilaterais.bind(this);
        this.setAcordoGovernosEstrangeiros = this.setAcordoGovernosEstrangeiros.bind(this);
        this.setParceriaGovernoEstadual = this.setParceriaGovernoEstadual.bind(this);
        this.setParceriaGovernoMunicipal = this.setParceriaGovernoMunicipal.bind(this);
        this.setTransferenciasFederaisRecebidas = this.setTransferenciasFederaisRecebidas.bind(this);

        this.setParceriaBrasileiras = this.setParceriaBrasileiras.bind(this);
        this.setParceriaEstrangeiras = this.setParceriaEstrangeiras.bind(this);
        this.setParceriaOrganizacoesReligiosasBrasileiras = this.setParceriaOrganizacoesReligiosasBrasileiras.bind(this);
        this.setParceriaOrganizacoesReligiosasEstrangeiras = this.setParceriaOrganizacoesReligiosasEstrangeiras.bind(this);
        this.setEmpresasPrivadasBrasileiras = this.setEmpresasPrivadasBrasileiras.bind(this);
        this.setEmpresasEstrangeiras = this.setEmpresasEstrangeiras.bind(this);
        this.setDoacoesPessoaJuridica = this.setDoacoesPessoaJuridica.bind(this);
        this.setDoacoesPessoaFisica = this.setDoacoesPessoaFisica.bind(this);
        this.setDoacoesFormaProdutosServicos = this.setDoacoesFormaProdutosServicos.bind(this);

        this.setVoluntariado = this.setVoluntariado.bind(this);
        this.setIsencoes = this.setIsencoes.bind(this);
        this.setImunidades = this.setImunidades.bind(this);
        this.setBensRecebidosDireito = this.setBensRecebidosDireito.bind(this);
        this.setDoacoesRecebidasFormaProdutosServicos = this.setDoacoesRecebidasFormaProdutosServicos.bind(this);





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
                subAreaAtuacao: props.subAreaAtuacao
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        /*if(target.name==='cel'){
            value = maskCel(value);
        }
        if(target.name==='whatsapp'){
            value = maskCel(value);
        }*/

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    clickSearch(){
        let showCategories = !this.state.showCategories;
        this.setState({showCategories: showCategories}, function(){
            this.listRegiao();
        })
    }
    handleSearch(e){
        this.setState({search: e.target.value}, function(){
            this.listRegiao();
        });
    }
    listRegiao(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/regiao/Sul/10/0',
            cache: false,
            success: function(data){
                this.setState({listRegiao: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    addRegiao(item){
        /*let add = true;
        this.state.categoriesSelected.find(function(cat){
            if(item.cd_area_atuacao===cat.cd_area_atuacao){
                add = false;
            }
        });
        if(add){
            let categoriesSelected = this.state.categoriesSelected;
            categoriesSelected.push(item);
            this.setState({showCategories: false});
            this.setState({categoriesSelected: categoriesSelected}, function(){
                //this.props.filterCategories(this.state.categoriesSelected);

            });
        }*/
    }

    /*validate(){

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


        this.setState({requireds: requireds});

        return valid;
    }*/


    filter(e){
        //console.log(this.validate());
        /*if(!this.validate()){
            return;
        }*/

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
                    //console.log('reg', data);
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
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/subarea_atuacao',
            success: function (data) {

                let areaAtuacao = this.state.areaAtuacao;

                this.state.areaAtuacao.find(function(item){
                    if(item.cd_area_atuacao === id){
                        item.checked = !item.checked;
                    }
                    item.subareas = data.filter(function(subitem){
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });
                this.setState({loading: false, areaAtuacao: areaAtuacao, id_area:id})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    clickIdh() {
        this.setState({
            active: !this.state.active
        });
    }

    setAnoFundacao(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setTotalTrabalhadores(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setTotalEmpregados(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setTrabalhadoresDeficiencia(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setTrabalhadoresVoluntarios(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setAnoFonteRecurso(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setRendimentosFinanceirosReservas(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setRendimentosFundosPatrimoniais(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setMensalidadesContribuicoes(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setVendaBensDireitos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setPremiosRecebidos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setVendaProdutos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setPrestacaoServicos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setEmpresasPublicasSociedadesEconomia(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setAcordoOrganismosMultilaterais(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setAcordoGovernosEstrangeiros(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaGovernoEstadual(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaGovernoMunicipal(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setTransferenciasFederaisRecebidas(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaBrasileiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaEstrangeiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaOrganizacoesReligiosasBrasileiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setParceriaOrganizacoesReligiosasEstrangeiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setEmpresasPrivadasBrasileiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setEmpresasEstrangeiras(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setDoacoesPessoaJuridica(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setDoacoesPessoaFisica(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setDoacoesFormaProdutosServicos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setVoluntariado(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setIsencoes(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setImunidades(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setBensRecebidosDireito(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }
    setDoacoesRecebidasFormaProdutosServicos(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }


    render(){

        let certificados = null;
        if(this.state.certificados){
            certificados = this.state.certificados.map(function (item) {
               return (
                   <div className="custom-control custom-checkbox"  key={"cert_"+item.cd_certificado}>
                       <input type="checkbox" className="custom-control-input" id={"cert_"+item.cd_certificado} required/>
                       <label className="custom-control-label" htmlFor={"cert_"+item.cd_certificado}>{item.tx_nome_certificado}</label>
                   </div>
               );
            });
        }


        const ipeaData = [];
        if(this.props.ipeaData){
            const map = new Map();
            for (const item of this.props.ipeaData) {

                let subThema = null;
                if(item.cd_indice){

                    for(const i of this.props.ipeaData){
                        console.log('i', i.cd_indice);
                    }

                    subThema = this.props.ipeaData.map(function(subitem){
                        return(
                        <div key={"subarea_"+subitem.cd_indice}>
                            <div className="custom-control custom-checkbox" onChange={() => console.log(subitem.cd_indice)}>
                                <input type="checkbox" className="custom-control-input" id={"subarea_"+subitem.cd_indice} required/>
                                <label className="custom-control-label" htmlFor={"subarea_"+subitem.cd_indice} >{subitem.tx_nome_indice}</label>
                            </div>
                            <br />
                        </div>
                        );
                    });
                }
                if(!map.has(item.tx_tema)){
                    map.set(item.tx_tema, true);
                    ipeaData.push(
                        <div key={"ipeaData_"+item.cd_indice}>
                            <strong>{item.tx_tema}</strong>
                            <hr />
                            {subThema}
                            <br/>
                        </div>
                    );
                }
            }
        }



        let areaAtuacao = null;
        let subAreaAtuacao = [];
        if(this.state.areaAtuacao){
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;
                if(item.subareas){
                    subarea = item.subareas.map(function(subitem){
                        return(
                            <div key={"subarea_"+subitem.cd_subarea_atuacao}>
                                <div className="custom-control custom-checkbox" onChange={() => console.log(subitem.cd_subarea_atuacao)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+subitem.cd_subarea_atuacao} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+subitem.cd_subarea_atuacao} >{subitem.tx_nome_subarea_atuacao}</label>
                                </div>
                                <br />
                            </div>
                        );
                    });
                }

                subAreaAtuacao.push(
                    <div key={"divArea_"+item.cd_area_atuacao} className="card" style={{display: item.checked ? '' : 'none'}}>
                        <div className="bg-lgt p-2">
                            <strong>{item.tx_nome_area_atuacao}</strong><br/>
                            {subarea}
                        </div>
                    </div>
                );

               return (
                   <div className="custom-control custom-checkbox" key={"area_"+item.cd_area_atuacao} onChange={() => this.callSubAreaAtuacao(item.cd_area_atuacao)}>
                       <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_area_atuacao} required/>
                       <label className="custom-control-label" htmlFor={"area_"+item.cd_area_atuacao} >{item.tx_nome_area_atuacao}</label>
                   </div>
               );
            }.bind(this));
        }

        //console.log(this.state);

        let firstRegioes = this.state.listRegiao.map(function (item, index){
            let sizeSearch = this.state.search;
            let firstPiece = item.edre_nm_regiao.substr(0, sizeSearch);
            return (
                <li key={'cat_'+item.edre_cd_regiao}
                    className="list-group-item d-flex "
                    onClick={() => this.addRegiao(item)}
                >
                    {firstPiece}
                </li>
            )
        }.bind(this));

        //console.log(this.state.filters);

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
                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Busque uma região" name="tx_nome_regiao" onClick={this.clickSearch} onChange={this.handleSearch}/>
                                            <i className="fas fa-search" style={{top: '-28px'}}/>
                                            <div>
                                                <ul className="box-search-itens" style={{display: this.state.showCategories ? '' : 'none'}}>
                                                    {firstRegioes}
                                                </ul>
                                            </div>
                                            <br/>
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
                                            <input className={"form-control form-g "} type="text" name="cd_identificador_osc" onChange={this.handleInputChange} placeholder=" "  />
                                            <label htmlFor="name">CNPJ</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-3">

                                        <div className="label-float">
                                            <select className="custom-select" name="cd_situacao_imovel_oscSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Situação do Imóvel</option>
                                                <option value="1">Próprio</option>
                                                <option value="2">Alugado</option>
                                                <option value="3">Cedido</option>
                                                <option value="4">Comodato</option>
                                            </select>
                                            <label htmlFor="name"/>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <Range
                                            title="Ano de Fundação"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setAnoFundacao}
                                        />
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
                                            <input type="checkbox" className="custom-control-input" id="naturezaJuridica_associacaoPrivada" required/>
                                            <label className="custom-control-label" htmlFor="naturezaJuridica_associacaoPrivada">Associação Privada</label>
                                        </div>
                                        <div className="custom-control custom-checkbox ">
                                            <input type="checkbox" className="custom-control-input" id="naturezaJuridica_fundacaoPrivada" required/>
                                            <label className="custom-control-label" htmlFor="naturezaJuridica_fundacaoPrivada">Fundação Privada</label>
                                        </div>
                                        <div className="custom-control custom-checkbox ">
                                            <input type="checkbox" className="custom-control-input" id="naturezaJuridica_organizacaoReligiosa" required/>
                                            <label className="custom-control-label" htmlFor="naturezaJuridica_organizacaoReligiosa">Organização Religiosa</label>
                                        </div>
                                        <div className="custom-control custom-checkbox ">
                                            <input type="checkbox" className="custom-control-input" id="naturezaJuridica_organizacaoSocial" required/>
                                            <label className="custom-control-label" htmlFor="naturezaJuridica_organizacaoSocial">Organização Social</label>
                                        </div>
                                        <div className="custom-control custom-checkbox ">
                                            <input type="checkbox" className="custom-control-input" id="naturezaJuridica_outra" required/>
                                            <label className="custom-control-label" htmlFor="naturezaJuridica_outra">Não informado</label>
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
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
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
                                        <strong>Área de Atuação</strong><hr/>
                                        <div>
                                            {areaAtuacao}
                                            <br/><br/>
                                        </div>

                                        <strong>Subárea de Atuação</strong><hr/>
                                        <div className="card-columns">
                                            {subAreaAtuacao}
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
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
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
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
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
                                    <div className="col-md-3">
                                        <Range
                                            title="Total de trabalhadores"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setTotalTrabalhadores}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Total de empregados"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setTotalEmpregados}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Trabalhadores com deficiência"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setTrabalhadoresDeficiencia}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Trabalhadores voluntários"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setTrabalhadoresVoluntarios}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-5">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse5" aria-expanded="true"
                                 aria-controls="collapse5">
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
                                Espaços de Participação Social <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse5" className="collapse" aria-labelledby="heading5"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="cd_conselhoSelectBoxItText">Nome do Conselho</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control"} type="date" name="tx_nome_dirigente" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_dirigente">Data de Início de Vigência</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="cd_conselhoSelectBoxItText">Nome de representante conselho</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="cd_conselhoSelectBoxItText">Titularidade</label>
                                            <div className="label-box-info-off"/>
                                        </div>

                                        <div className="label-float">
                                            <select className="custom-select" name="cd_conselhoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Situação do Imóvel</option>
                                                <option value="1">Próprio</option>
                                                <option value="2">Alugado</option>
                                                <option value="3">Cedido</option>
                                                <option value="4">Comodato</option>
                                            </select>
                                            <label htmlFor="name"/>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="date" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="cd_conselhoSelectBoxItText">Data de Fim de Vigência</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-6">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse6" aria-expanded="true"
                                 aria-controls="collapse6">
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
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
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
                                Fontes de Recursos <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse7" className="collapse" aria-labelledby="heading7"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4>Fontes de recursos anuais da OSC</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Range
                                                    title="Ano"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setAnoFonteRecurso}
                                                />
                                            </div>
                                        </div>

                                        <h4>Recursos próprios</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Range
                                                    title="Rendimentos financeiros de reservas ou contas correntes próprias"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setRendimentosFinanceirosReservas}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Rendimentos de fundos patrimoniais"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setRendimentosFundosPatrimoniais}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Mensalidades ou contribuições de associados"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setMensalidadesContribuicoes}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Venda de bens e direitos"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setVendaBensDireitos}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Prêmios recebidos"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setPremiosRecebidos}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Venda de produtos"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setVendaProdutos}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Prestação de serviços"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setPrestacaoServicos}
                                                />
                                            </div>
                                        </div>

                                        <h4>Recursos públicos</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Range
                                                    title="Empresas públicas ou sociedades de economia mista"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setEmpresasPublicasSociedadesEconomia}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Acordo com organismos multilaterais"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setAcordoOrganismosMultilaterais}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Acordo com governos estrangeiros"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setAcordoGovernosEstrangeiros}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com o governo estadual"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaGovernoEstadual}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com o governo municipal"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaGovernoMunicipal}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Transferências federais recebidas pela OSC"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setTransferenciasFederaisRecebidas}
                                                />
                                            </div>
                                        </div>



                                        <h4>Recursos privados</h4>
                                        <hr />

                                        <div className="row">
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com OSCs brasileiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaBrasileiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com OSCs estrangeiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaEstrangeiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com organizações religiosas brasileiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaOrganizacoesReligiosasBrasileiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Parceria com organizações religiosas estrangeiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setParceriaOrganizacoesReligiosasEstrangeiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Empresas privadas brasileiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setEmpresasPrivadasBrasileiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Empresas estrangeiras"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setEmpresasEstrangeiras}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Doações de pessoa jurídica"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setDoacoesPessoaJuridica}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Doações de pessoa física"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setDoacoesPessoaFisica}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Doações recebidas na forma de produtos e serviços (com NF)"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setDoacoesFormaProdutosServicos}
                                                />
                                            </div>
                                        </div>

                                        <h4>Recursos não financeiros</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Range
                                                    title="Voluntariado"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setVoluntariado}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Isenções"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setIsencoes}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Imunidades"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setImunidades}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Range
                                                    title="Bens recebidos em direito de uso"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setBensRecebidosDireito}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Range
                                                    title="Doações recebidas na forma de produtos e serviços (sem NF)"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    defaultValueStart="0"
                                                    defaultValueEnd="100"
                                                    setValue={this.setDoacoesRecebidasFormaProdutosServicos}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="item-8">
                            <div className="mb-0" data-toggle="collapse" data-target="#collapse8" aria-expanded="true"
                                 aria-controls="collapse8">
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
                                Índice de Desenvolvimento Humano <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse8" className="collapse" aria-labelledby="heading8"
                             data-parent="#accordionExample">
                            <div className="card-body">


                                <div className="custom-control custom-checkbox" onChange={this.clickIdh}>
                                    <input type="checkbox" className="custom-control-input" id="IDH_Municipal" required/>
                                    <label className="custom-control-label" htmlFor="IDH_Municipal">IDH Municipal</label>

                                </div>

                                <div id="divIdh" style={{display: this.state.active === false ? 'none' : ''}} >
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
                                <div className="mn-accordion-icon mn-accordion-icon-p"><i className="far fa-file-alt"/></div>
                                Indicadores Socioeconômicos Adicionais  <i className="fas fa-angle-down float-right"/>
                            </div>
                        </div>
                        <div id="collapse9" className="collapse" aria-labelledby="heading9"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div>
                                    {ipeaData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div >
                    <label htmlFor="name">Como podemos ajudar?</label>
                    <select className="form-control" id="assunto">
                        <option value="">Selecione o assunto</option>
                        <option value="1">Cadastro Município-Estado</option>
                        <option value="2">Cadastro Representante</option>
                        <option value="3">Dúvidas</option>
                        <option value="4">Inserção/Edição de dados</option>
                        <option value="5">Pedidos de dados</option>
                        <option value="6">Relatar Problemas</option>
                        <option value="7">Sugestão</option>
                        <option value="8">Outros</option>
                    </select><br/>
                </div>*/}



                {/*<div className="label-float">
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
                </div>*/}



                <div className="clear-float"/>
                <br/>
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


