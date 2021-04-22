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
                regiao: null,
                uf: null,
                municipio: null,
            },
            searchRegiao: null,
            searchUf: null,
            searchMunicipio: null,
            searchCnae: null,
            listRegiao:null,
            listUf:null,
            listMunicipio:null,
            listCnae:null,


            dataObjetivos:[],
            dataObjetivosMetas:[],
            dataConselhos:[],
            dataParticipacoes:[],
            dataConferencias:[],
            dataFormaParticipacoes:[],
        };

        this.clickSearchRegiao = this.clickSearchRegiao.bind(this);
        this.handleSearchRegiao = this.handleSearchRegiao.bind(this);
        this.listRegiao = this.listRegiao.bind(this);
        this.setRegiao = this.setRegiao.bind(this);
        this.removeRegiao = this.removeRegiao.bind(this);

        this.clickSearchUf = this.clickSearchUf.bind(this);
        this.handleSearchUf = this.handleSearchUf.bind(this);
        this.listUf = this.listUf.bind(this);
        this.setUf = this.setUf.bind(this);
        this.removeUf = this.removeUf.bind(this);

        this.clickSearchMunicipio = this.clickSearchMunicipio.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.listMunicipio = this.listMunicipio.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
        this.removeMunicipio = this.removeMunicipio.bind(this);

        this.clickSearchCnae = this.clickSearchCnae.bind(this);
        this.handleSearchCnae = this.handleSearchCnae.bind(this);
        this.listCnae = this.listCnae.bind(this);
        this.setCnae = this.setCnae.bind(this);
        this.removeCnae = this.removeCnae.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);


        this.filter = this.filter.bind(this);
        this.clickIdh = this.clickIdh.bind(this);

        this.setAnoRealizacao = this.setAnoRealizacao.bind(this);


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

        this.setTotalBeneficiarios = this.setTotalBeneficiarios.bind(this);
        this.setValorTotal = this.setValorTotal.bind(this);
        this.setValorRecebido = this.setValorRecebido.bind(this);

        this.objetivos = this.objetivos.bind(this);


        this.conselhos = this.conselhos.bind(this);
        this.participacoes = this.participacoes.bind(this);
        this.conferencias = this.conferencias.bind(this);
        this.formaParticipacoes = this.formaParticipacoes.bind(this);

        this.fonteRecursosProjeto = this.fonteRecursosProjeto.bind(this);
        this.statusProjeto = this.statusProjeto.bind(this);
        this.zonaAtuacaoProjeto = this.zonaAtuacaoProjeto.bind(this);
        this.abrangenciaProjeto = this.abrangenciaProjeto.bind(this);


    }


    componentDidMount(){
        this.objetivos();
        this.conselhos();
        this.participacoes();
        this.conferencias();
        this.formaParticipacoes();

        this.fonteRecursosProjeto();
        this.statusProjeto();
        this.zonaAtuacaoProjeto();
        this.abrangenciaProjeto();

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

        if(target.name == 'cd_objetivo_oscSelectBoxItText' || target.name == 'cd_objetivo_projetoSelectBoxItText'){
            this.objetivosMetas(target.value);
        }



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

    /*Regiao*/
    handleSearchRegiao(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchRegiao: search}, function(){
            this.listRegiao(search);
        });
    }
    clickSearchRegiao(){
        let search = this.state.searchRegiao ? this.state.searchRegiao : ' ';
        this.listRegiao(search);
    }
    listRegiao(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/regiao/'+search,
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
    setRegiao(item){
        let filters = this.state.filters;
        filters.regiao = item;
        this.setState({filters: filters, searchRegiao: null});
    }
    removeRegiao(){
        let filters = this.state.filters;
        filters.regiao = null;
        this.setState({filters: filters})
    }

    /*UF*/
    handleSearchUf(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchUf: search}, function(){
            this.listUf(search);
        });
    }
    clickSearchUf(){
        let search = this.state.searchUf ? this.state.searchUf : ' ';
        this.listUf(search);
    }
    listUf(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/estado/'+search,
            cache: false,
            success: function(data){
                this.setState({listUf: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    setUf(item){
        let filters = this.state.filters;
        filters.uf = item;
        this.setState({filters: filters});
    }
    removeUf(){
        let filters = this.state.filters;
        filters.uf = null;
        this.setState({filters: filters})
    }

    /*Municipio*/
    handleSearchMunicipio(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchMunicipio: search}, function(){
            this.listMunicipio(search);
        });
    }
    clickSearchMunicipio(){
        let search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
        this.listMunicipio(search);
    }
    listMunicipio(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/municipio/'+search,
            cache: false,
            success: function(data){
                this.setState({listMunicipio: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    setMunicipio(item){
        let filters = this.state.filters;
        filters.municipio = item;
        this.setState({filters: filters});
    }
    removeMunicipio(){
        let filters = this.state.filters;
        filters.municipio = null;
        this.setState({filters: filters})
    }
    /*Cnae*/
    handleSearchCnae(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchCnae: search}, function(){
            this.listCnae(search);
        });
    }
    clickSearchCnae(){
        let search = this.state.searchCnae ? this.state.searchCnae : ' ';
        this.listCnae(search);
    }
    listCnae(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'search/atividade_economica/autocomplete/'+search,
            cache: false,
            success: function(data){
                this.setState({listCnae: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    setCnae(item){
        let filters = this.state.filters;
        filters.cnae = item;
        this.setState({filters: filters});
    }
    removeCnae(){
        let filters = this.state.filters;
        filters.cnae = null;
        this.setState({filters: filters})
    }
    /*************************************/
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
                url: 'filter',
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

    setAnoRealizacao(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
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

    setTotalBeneficiarios(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }

    setValorTotal(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }

    setValorRecebido(start, end){
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({filters: filters});
    }


    objetivos(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/objetivo_projeto',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataObjetivos: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }


    objetivosMetas(id){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'componente/metas_objetivo_projeto/'+id,
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataObjetivosMetas: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    ////////////////////////////////////////

    conselhos(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/conselho',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataConselhos: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    participacoes(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/tipo_participacao',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataParticipacoes: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    conferencias(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/conferencia',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataConferencias: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    formaParticipacoes(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataFormaParticipacoes: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    ////////////////////////////////////////
    ////////////////////PROJETOS////////////////////

    fonteRecursosProjeto(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/origem_fonte_recursos_projeto',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataFonteRecursosProjeto: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    statusProjeto(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/status_projeto',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataStatusProjeto: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    zonaAtuacaoProjeto(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/zona_atuacao_projeto',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataZonaAtuacaoProjeto: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    abrangenciaProjeto(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/abrangencia_projeto',
            cache: false,
            success: function(data){
                console.log('data', data);
                this.setState({dataAbrangenciaProjeto: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    ////////////////////////////////////////




    render(){

        console.log('dataFormaParticipacoes', this.state.dataFormaParticipacoes)

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


        let indicadores = [];
        if(this.props.ipeaData){


            this.props.ipeaData.find(function(item){

                let existeTema = false;

                for(let i in indicadores){
                    if(item.tx_tema === indicadores[i].tema){
                        indicadores[i].indices.push(item);
                        existeTema = true;
                        break;
                    }
                }

                if(!existeTema){
                    let tema = {tema: item.tx_tema, indices: [item]};
                    indicadores.push(tema);
                }
            });

            indicadores = indicadores.map(function(item, index){
                let indices = item.indices.map(function(subitem){
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

                return (
                    <div key={"ipeaData_"+index} className="col-md-6">
                        <strong>{item.tema}</strong>
                        <hr />
                        {indices}
                        <br/>
                    </div>
                );
            });



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

        let regioes = null
        if(this.state.listRegiao){
            regioes = this.state.listRegiao.map(function (item, index){

                let sizeSearch = this.state.searchRegiao ? this.state.searchRegiao.length : 0;

                let firstPiece = null;
                let secondPiece = item.edre_nm_regiao;

                if(this.state.searchRegiao){
                    firstPiece = item.edre_nm_regiao.substr(0, sizeSearch);
                    secondPiece = item.edre_nm_regiao.substr(sizeSearch);
                }

                return (
                    <li key={'cat_'+item.edre_cd_regiao}
                        className="list-group-item d-flex "
                        onClick={() => this.setRegiao(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }



        let ufs = null
        if(this.state.listUf) {
            ufs = this.state.listUf.map(function (item, index) {

                let sizeSearch = this.state.searchUf ? this.state.searchUf.length : 0;
                let firstPiece = null;
                let secondPiece = item.eduf_nm_uf;

                if (this.state.searchUf) {
                    firstPiece = item.eduf_nm_uf.substr(0, sizeSearch);
                    secondPiece = item.eduf_nm_uf.substr(sizeSearch);
                }

                return (
                    <li key={'cat_' + item.eduf_cd_uf}
                        className="list-group-item d-flex "
                        onClick={() => this.setUf(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }

        let municipios = null
        if(this.state.listMunicipio) {
            municipios = this.state.listMunicipio.map(function (item, index) {

                let sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
                let firstPiece = null;
                let secondPiece = item.edmu_nm_municipio;

                if (this.state.searchMunicipio) {
                    firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
                    secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
                }
                return (
                    <li key={'cat_' + item.edmu_cd_municipio}
                        className="list-group-item d-flex "
                        onClick={() => this.setMunicipio(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }

        let cnae = null
        if(this.state.listCnae) {
            cnae = this.state.listCnae.map(function (item, index) {

                let sizeSearch = this.state.searchCnae ? this.state.searchCnae.length : 0;
                let firstPiece = null;
                let secondPiece = item.tx_atividade_economica;

                if (this.state.searchCnae) {
                    firstPiece = item.tx_atividade_economica.substr(0, sizeSearch);
                    secondPiece = item.tx_atividade_economica.substr(sizeSearch);
                }
                return (
                    <li key={'cat_' + item.cd_classe_atividade_economica}
                        className="list-group-item d-flex "
                        onClick={() => this.setCnae(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }

        let objetivos = null;
        if(this.state.dataObjetivos){
            objetivos = this.state.dataObjetivos.map(function (item) {
                return (
                    <option value={item.cd_objetivo_projeto} key={"cert_"+item.cd_objetivo_projeto}>{item.tx_nome_objetivo_projeto}</option>
                );
            });
        }

        let objetivosMetas = null;
        if(this.state.dataObjetivosMetas){
            objetivosMetas = this.state.dataObjetivosMetas.map(function (item) {
                return (
                    <option value={item.cd_meta_projeto} key={"cert_"+item.cd_meta_projeto}>{item.tx_nome_meta_projeto}</option>
                );
            });
        }



        ////////////////////////////////////////////////////
        let conselhos = null;
        if(this.state.dataConselhos){
            conselhos = this.state.dataConselhos.map(function (item) {
                return (
                    <option value={item.cd_conselho} key={"conselho_"+item.cd_conselho}>{item.tx_nome_conselho}</option>
                );
            });
        }
        let participacoes = null;
        if(this.state.dataParticipacoes){
            participacoes = this.state.dataParticipacoes.map(function (item) {
                return (
                    <option value={item.cd_tipo_participacao} key={"articipacao_"+item.cd_tipo_participacao}>{item.tx_nome_tipo_participacao}</option>
                );
            });
        }
        let conferencias = null;
        if(this.state.dataConferencias){
            conferencias = this.state.dataConferencias.map(function (item) {
                return (
                    <option value={item.cd_conferencia} key={"conferencia_"+item.cd_conferencia}>{item.tx_nome_conferencia}</option>
                );
            });
        }
        let formaParticipacoes = null;
        if(this.state.dataFormaParticipacoes){
            formaParticipacoes = this.state.dataFormaParticipacoes.map(function (item) {
                return (
                    <option value={item.cd_forma_participacao_conferencia} key={"forma_"+item.cd_forma_participacao_conferencia}>{item.tx_nome_forma_participacao_conferencia}</option>
                );
            });
        }
        ////////////////////////////////////////////////////
        //////////////////////Projetos//////////////////////////////
        let listFonteRecursosProjeto = null;
        if(this.state.dataFonteRecursosProjeto){
            listFonteRecursosProjeto = this.state.dataFonteRecursosProjeto.map(function (item) {
                return (
                    <option value={item.cd_origem_fonte_recursos_projeto} key={"forma_"+item.cd_origem_fonte_recursos_projeto}>{item.tx_nome_origem_fonte_recursos_projeto}</option>
                );
            });
        }
        let listStatusProjeto = null;
        if(this.state.dataStatusProjeto){
            listStatusProjeto = this.state.dataStatusProjeto.map(function (item) {
                return (
                    <option value={item.cd_status_projeto} key={"forma_"+item.cd_status_projeto}>{item.tx_nome_status_projeto}</option>
                );
            });
        }
        let listZonaAtuacaoProjeto = null;
        if(this.state.dataZonaAtuacaoProjeto){
            listZonaAtuacaoProjeto = this.state.dataZonaAtuacaoProjeto.map(function (item) {
                return (
                    <option value={item.cd_zona_atuacao_projeto} key={"forma_"+item.cd_zona_atuacao_projeto}>{item.tx_nome_zona_atuacao}</option>
                );
            });
        }
        let listAbrangenciaProjeto = null;
        if(this.state.dataAbrangenciaProjeto){
            listAbrangenciaProjeto = this.state.dataAbrangenciaProjeto.map(function (item) {
                return (
                    <option value={item.cd_abrangencia_projeto} key={"forma_"+item.cd_abrangencia_projeto}>{item.tx_nome_abrangencia_projeto}</option>
                );
            });
        }
        ////////////////////////////////////////////////////


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
                                            <input type="text" className="form-control" placeholder="Busque uma região" name="tx_nome_regiao"
                                                   style={{display: (this.state.filters.regiao ? 'none' : '')}}
                                                   onClick={this.clickSearchRegiao} onChange={this.handleSearchRegiao}/>
                                            <input type="text" className="form-control" name="tx_nome_regiao2"
                                                   style={{display: (this.state.filters.regiao ? '' : 'none')}}
                                                   readOnly={this.state.filters.regiao}
                                                   defaultValue={this.state.filters.regiao ? this.state.filters.regiao.edre_nm_regiao : ''}/>

                                               <div style={{display: (this.state.filters.regiao ? 'none' : '')}}>
                                                   <i className="fas fa-search" style={{top: '-28px'}}/>
                                               </div>
                                               <div style={{display: (this.state.filters.regiao ? '' : 'none')}} onClick={this.removeRegiao}>
                                                   <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                               </div>

                                            <div>
                                                <ul className="box-search-itens" style={{display: ((this.state.searchRegiao || this.state.listRegiao) && !this.state.filters.regiao) ? '' : 'none'}}>
                                                    {regioes}
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
                                        {/*<div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_uf" onChange={this.handleInputChange} placeholder=" "/>
                                            <label htmlFor="name">Estado</label>
                                            <div className="label-box-info-off"/>
                                        </div>*/}

                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Busque um estado" name="tx_nome_uf"
                                                   style={{display: (this.state.filters.uf ? 'none' : '')}}
                                                   onClick={this.clickSearchUf} onChange={this.handleSearchUf}/>
                                            <input type="text" className="form-control" name="tx_nome_uf2"
                                                   style={{display: (this.state.filters.uf ? '' : 'none')}}
                                                   readOnly={this.state.filters.uf}
                                                   defaultValue={this.state.filters.uf ? this.state.filters.uf.eduf_nm_uf : ''}/>

                                            <div style={{display: (this.state.filters.uf ? 'none' : '')}}>
                                                <i className="fas fa-search" style={{top: '-28px'}}/>
                                            </div>
                                            <div style={{display: (this.state.filters.uf ? '' : 'none')}} onClick={this.removeUf}>
                                                <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                            </div>

                                            <div>
                                                <ul className="box-search-itens" style={{display: ((this.state.searchUf || this.state.listUf) && !this.state.filters.uf) ? '' : 'none'}}>
                                                    {ufs}
                                                </ul>
                                            </div>
                                            <br/>
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
                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Busque um Município" name="tx_nome_municipio"
                                                   style={{display: (this.state.filters.municipio ? 'none' : '')}}
                                                   onClick={this.clickSearchMunicipio} onChange={this.handleSearchMunicipio}/>
                                            <input type="text" className="form-control" name="tx_nome_municipio2"
                                                   style={{display: (this.state.filters.municipio ? '' : 'none')}}
                                                   readOnly={this.state.filters.municipio}
                                                   defaultValue={this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : ''}/>

                                            <div style={{display: (this.state.filters.municipio ? 'none' : '')}}>
                                                <i className="fas fa-search" style={{top: '-28px'}}/>
                                            </div>
                                            <div style={{display: (this.state.filters.municipio ? '' : 'none')}} onClick={this.removeMunicipio}>
                                                <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                            </div>

                                            <div>
                                                <ul className="box-search-itens" style={{display: ((this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio) ? '' : 'none'}}>
                                                    {municipios}
                                                </ul>
                                            </div>
                                            <br/>
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
                                        <select className="custom-select" name="cd_objetivo_oscSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected >Objetivos do Desenvolvimento Sustentável - ODS</option>
                                            {objetivos}
                                        </select>
                                        <br/><br/>
                                    </div>
                                    <div className="col-md-6">
                                        <select className="custom-select" name="cd_meta_oscSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected>Metas Relacionadas ao ODS</option>
                                            {objetivosMetas}
                                        </select>
                                        <br/><br/>
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
                                        {/*<div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_atividade_economica" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="name">Atividade Econômica (CNAE)</label>
                                            <div className="label-box-info-off"/>
                                        </div>*/}


                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Busque uma Atividade Econômica" name="tx_atividade_economica"
                                                   style={{display: (this.state.filters.cnae ? 'none' : '')}}
                                                   onClick={this.clickSearchCnae} onChange={this.handleSearchCnae}/>
                                            <input type="text" className="form-control" name="tx_atividade_economica2"
                                                   style={{display: (this.state.filters.cnae ? '' : 'none')}}
                                                   readOnly={this.state.filters.cnae}
                                                   defaultValue={this.state.filters.cnae ? this.state.filters.cnae.tx_atividade_economica : ''}/>

                                            <div style={{display: (this.state.filters.cnae ? 'none' : '')}}>
                                                <i className="fas fa-search" style={{top: '-28px'}}/>
                                            </div>
                                            <div style={{display: (this.state.filters.cnae ? '' : 'none')}} onClick={this.removeCnae}>
                                                <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                            </div>

                                            <div>
                                                <ul className="box-search-itens" style={{display: ((this.state.searchCnae || this.state.listCnae) && !this.state.filters.cnae ) ? '' : 'none'}}>
                                                    {cnae}
                                                </ul>
                                            </div>
                                            <br/>
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
                                        <select className="custom-select" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange}>
                                            {/*<option selected >Objetivos do Desenvolvimento Sustentável - ODS</option>*/}
                                            {conselhos}
                                        </select>
                                        <br/><br/>
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
                                            <select className="custom-select" name="cd_tipo_participacaoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Situação do Imóvel</option>
                                                {participacoes}
                                            </select>
                                            <br/><br/>
                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="date" name="cd_conselhoSelectBoxItText" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="cd_conselhoSelectBoxItText">Data de Fim de Vigência</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-9">
                                        <select className="custom-select" name="cd_conferenciaSelectBoxItText" onChange={this.handleInputChange}>
                                            {conferencias}
                                        </select>
                                        <br/><br/>
                                    </div>

                                    <div className="col-md-6">
                                        <select className="custom-select" name="cd_forma_participacao_conferenciaSelectBoxItText" onChange={this.handleInputChange}>
                                            {formaParticipacoes}
                                        </select>
                                        <br/><br/>
                                    </div>

                                    <div className="col-md-3">
                                        <Range
                                            title="Ano de Realização da Conferência"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setAnoRealizacao}
                                        />
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

                                {/*/////*/}
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_projeto" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_projeto">Nome do Projeto</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <select className="custom-select" name="cd_status_projetoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Situação do projeto</option>
                                                {listStatusProjeto}
                                            </select>
                                            <br/><br/>
                                        </div>

                                    </div>

                                    <div className="col-md-2">
                                        <div className="label-float">
                                            <input className={"form-control"} type="date" name="dt_data_inicio_projeto" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="dt_data_inicio_projeto">Data de início</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="label-float">
                                            <input className={"form-control"} type="date" name="dt_data_fim_projeto" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="dt_data_fim_projeto">Data de fim</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <select className="custom-select" name="cd_abrangencia_projetoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Abrangência de atuação</option>
                                                {listAbrangenciaProjeto}
                                            </select>
                                            <br/><br/>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="label-float">
                                            <select className="custom-select" name="cd_zona_atuacao_projetoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Zona de Atuação</option>
                                                {listZonaAtuacaoProjeto}
                                            </select>
                                            <br/><br/>
                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <select className="custom-select" name="cd_origem_fonte_recursos_projetoSelectBoxItText" defaultValue={0} onChange={this.handleInputChange}>
                                                <option value="0">Fontes de Recursos</option>
                                                {listFonteRecursosProjeto}
                                            </select>
                                            <br/><br/>
                                        </div>



                                    </div>
                                    <div className="col-md-6">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_financiador" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_financiador">Financiadores do Projeto</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_regiao_localizacao_projeto" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_regiao_localizacao_projeto">Local de Execução</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_publico_beneficiado" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_publico_beneficiado">Público Beneficiado</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>

                                    <div className="col-md-9">
                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_nome_osc_parceira_projeto" onChange={this.handleInputChange} placeholder=" " />
                                            <label htmlFor="tx_nome_osc_parceira_projeto">OSC Parceiras</label>
                                            <div className="label-box-info-off"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Ano"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setTotalBeneficiarios}
                                        />
                                    </div>

                                    <div className="col-md-9">
                                        <select className="custom-select" name="cd_objetivo_projetoSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected >Objetivos do Desenvolvimento Sustentável - ODS</option>
                                            {objetivos}
                                        </select>
                                        <br/><br/>
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Ano"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setValorTotal}
                                        />
                                    </div>

                                    <div className="col-md-9">
                                        <select className="custom-select" name="cd_meta_projetoSelectBoxItText" onChange={this.handleInputChange}>
                                            <option selected>Metas Relacionadas ao ODS</option>
                                            {objetivosMetas}
                                        </select>
                                        <br/><br/>
                                    </div>
                                    <div className="col-md-3">
                                        <Range
                                            title="Ano"
                                            min="0"
                                            max="100"
                                            step="1"
                                            defaultValueStart="0"
                                            defaultValueEnd="100"
                                            setValue={this.setValorRecebido}
                                        />
                                    </div>

                                </div>
                                {/*/////*/}

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
                                <div className="row">
                                    {indicadores}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="clear-float"/>
                <br/>


                <button type="button" style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.filter}>Filtrar</button>
                <br/>


                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
            </form>

        );
    }
}
