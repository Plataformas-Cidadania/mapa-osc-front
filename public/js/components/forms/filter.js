class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                email: '',
                cel: '',
                whatsapp: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true
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
                ano_fundacao: { start: null, end: null },
                ano_fundacao2: { start: null, end: null },
                regiao: null,
                uf: null,
                municipio: null
            },
            searchRegiao: null,
            searchUf: null,
            searchMunicipio: null,
            searchCnae: null,
            listRegiao: null,
            listUf: null,
            listMunicipio: null,
            listCnae: null,

            dataObjetivos: [],
            dataObjetivosMetas: [],
            dataConselhos: [],
            dataParticipacoes: [],
            dataConferencias: [],
            dataFormaParticipacoes: []
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

    componentDidMount() {
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

    componentDidUpdate(props) {
        if (this.state.certificados != props.certificados || this.state.areaAtuacao != props.areaAtuacao || this.state.subAreaAtuacao != props.subAreaAtuacao) {
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

        if (target.name == 'cd_objetivo_oscSelectBoxItText' || target.name == 'cd_objetivo_projetoSelectBoxItText') {
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

        this.setState({ form: form });
    }

    /*Regiao*/
    handleSearchRegiao(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchRegiao: search }, function () {
            this.listRegiao(search);
        });
    }
    clickSearchRegiao() {
        let search = this.state.searchRegiao ? this.state.searchRegiao : ' ';
        this.listRegiao(search);
    }
    listRegiao(search) {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/regiao/' + search,
            cache: false,
            success: function (data) {
                this.setState({ listRegiao: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }
    setRegiao(item) {
        let filters = this.state.filters;
        filters.regiao = item;
        this.setState({ filters: filters, searchRegiao: null });
    }
    removeRegiao() {
        let filters = this.state.filters;
        filters.regiao = null;
        this.setState({ filters: filters });
    }

    /*UF*/
    handleSearchUf(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchUf: search }, function () {
            this.listUf(search);
        });
    }
    clickSearchUf() {
        let search = this.state.searchUf ? this.state.searchUf : ' ';
        this.listUf(search);
    }
    listUf(search) {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/estado/' + search,
            cache: false,
            success: function (data) {
                this.setState({ listUf: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }
    setUf(item) {
        let filters = this.state.filters;
        filters.uf = item;
        this.setState({ filters: filters });
    }
    removeUf() {
        let filters = this.state.filters;
        filters.uf = null;
        this.setState({ filters: filters });
    }

    /*Municipio*/
    handleSearchMunicipio(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchMunicipio: search }, function () {
            this.listMunicipio(search);
        });
    }
    clickSearchMunicipio() {
        let search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
        this.listMunicipio(search);
    }
    listMunicipio(search) {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/municipio/' + search,
            cache: false,
            success: function (data) {
                this.setState({ listMunicipio: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }
    setMunicipio(item) {
        let filters = this.state.filters;
        filters.municipio = item;
        this.setState({ filters: filters });
    }
    removeMunicipio() {
        let filters = this.state.filters;
        filters.municipio = null;
        this.setState({ filters: filters });
    }
    /*Cnae*/
    handleSearchCnae(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchCnae: search }, function () {
            this.listCnae(search);
        });
    }
    clickSearchCnae() {
        let search = this.state.searchCnae ? this.state.searchCnae : ' ';
        this.listCnae(search);
    }
    listCnae(search) {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'search/atividade_economica/autocomplete/' + search,
            cache: false,
            success: function (data) {
                this.setState({ listCnae: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }
    setCnae(item) {
        let filters = this.state.filters;
        filters.cnae = item;
        this.setState({ filters: filters });
    }
    removeCnae() {
        let filters = this.state.filters;
        filters.cnae = null;
        this.setState({ filters: filters });
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

    filter(e) {
        //console.log(this.validate());
        /*if(!this.validate()){
            return;
        }*/

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

            $.ajax({
                method: 'POST',
                url: 'filter',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    form: this.state.form
                },
                cache: false,
                success: function (data) {
                    //console.log('reg', data);
                    this.setState({ loading: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }.bind(this)
            });
        });
    }

    callSubAreaAtuacao(id) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/subarea_atuacao',
            success: function (data) {

                let areaAtuacao = this.state.areaAtuacao;

                this.state.areaAtuacao.find(function (item) {
                    if (item.cd_area_atuacao === id) {
                        item.checked = !item.checked;
                    }
                    item.subareas = data.filter(function (subitem) {
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });
                this.setState({ loading: false, areaAtuacao: areaAtuacao, id_area: id });
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

    setAnoRealizacao(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    setAnoFundacao(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setTotalTrabalhadores(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setTotalEmpregados(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setTrabalhadoresDeficiencia(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setTrabalhadoresVoluntarios(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setAnoFonteRecurso(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setRendimentosFinanceirosReservas(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setRendimentosFundosPatrimoniais(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setMensalidadesContribuicoes(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setVendaBensDireitos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setPremiosRecebidos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setVendaProdutos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setPrestacaoServicos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setEmpresasPublicasSociedadesEconomia(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setAcordoOrganismosMultilaterais(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setAcordoGovernosEstrangeiros(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaGovernoEstadual(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaGovernoMunicipal(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setTransferenciasFederaisRecebidas(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaBrasileiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaEstrangeiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaOrganizacoesReligiosasBrasileiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setParceriaOrganizacoesReligiosasEstrangeiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setEmpresasPrivadasBrasileiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setEmpresasEstrangeiras(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setDoacoesPessoaJuridica(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setDoacoesPessoaFisica(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setDoacoesFormaProdutosServicos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setVoluntariado(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setIsencoes(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setImunidades(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setBensRecebidosDireito(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }
    setDoacoesRecebidasFormaProdutosServicos(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    setTotalBeneficiarios(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    setValorTotal(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    setValorRecebido(start, end) {
        let filters = this.state.filters;
        filters.ano_fundacao.start = start;
        filters.ano_fundacao.end = end;
        this.setState({ filters: filters });
    }

    objetivos() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/objetivo_projeto',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataObjetivos: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    objetivosMetas(id) {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'componente/metas_objetivo_projeto/' + id,
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataObjetivosMetas: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    ////////////////////////////////////////

    conselhos() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            //url: getBaseUrl + 'menu/osc/conselho',
            url: getBaseUrl2 + 'ps_conselhos',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataConselhos: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    participacoes() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/tipo_participacao',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataParticipacoes: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    conferencias() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            //url: getBaseUrl + 'menu/osc/conferencia',
            url: getBaseUrl2 + 'ps_conferencias',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataConferencias: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    formaParticipacoes() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            //url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
            url: getBaseUrl2 + 'ps_conferencias_formas',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataFormaParticipacoes: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    ////////////////////////////////////////
    ////////////////////PROJETOS////////////////////

    fonteRecursosProjeto() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/origem_fonte_recursos_projeto',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataFonteRecursosProjeto: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    statusProjeto() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/status_projeto',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataStatusProjeto: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    zonaAtuacaoProjeto() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/zona_atuacao_projeto',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataZonaAtuacaoProjeto: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    abrangenciaProjeto() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/abrangencia_projeto',
            cache: false,
            success: function (data) {
                console.log('data', data);
                this.setState({ dataAbrangenciaProjeto: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    ////////////////////////////////////////


    render() {

        console.log('dataFormaParticipacoes', this.state.dataFormaParticipacoes);

        let certificados = null;
        if (this.state.certificados) {
            certificados = this.state.certificados.map(function (item) {
                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "cert_" + item.cd_certificado },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "cert_" + item.cd_certificado, required: true }),
                    React.createElement(
                        'label',
                        { className: 'custom-control-label', htmlFor: "cert_" + item.cd_certificado },
                        item.tx_nome_certificado
                    )
                );
            });
        }

        let indicadores = [];
        if (this.props.ipeaData) {

            this.props.ipeaData.find(function (item) {

                let existeTema = false;

                for (let i in indicadores) {
                    if (item.tx_tema === indicadores[i].tema) {
                        indicadores[i].indices.push(item);
                        existeTema = true;
                        break;
                    }
                }

                if (!existeTema) {
                    let tema = { tema: item.tx_tema, indices: [item] };
                    indicadores.push(tema);
                }
            });

            indicadores = indicadores.map(function (item, index) {
                let indices = item.indices.map(function (subitem) {
                    return React.createElement(
                        'div',
                        { key: "subarea_" + subitem.cd_indice },
                        React.createElement(
                            'div',
                            { className: 'custom-control custom-checkbox', onChange: () => console.log(subitem.cd_indice) },
                            React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_indice, required: true }),
                            React.createElement(
                                'label',
                                { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_indice },
                                subitem.tx_nome_indice
                            )
                        ),
                        React.createElement('br', null)
                    );
                });

                return React.createElement(
                    'div',
                    { key: "ipeaData_" + index, className: 'col-md-6' },
                    React.createElement(
                        'strong',
                        null,
                        item.tema
                    ),
                    React.createElement('hr', null),
                    indices,
                    React.createElement('br', null)
                );
            });
        }

        let areaAtuacao = null;
        let subAreaAtuacao = [];
        if (this.state.areaAtuacao) {
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;
                if (item.subareas) {
                    subarea = item.subareas.map(function (subitem) {
                        return React.createElement(
                            'div',
                            { key: "subarea_" + subitem.cd_subarea_atuacao },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => console.log(subitem.cd_subarea_atuacao) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_subarea_atuacao, required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_subarea_atuacao },
                                    subitem.tx_nome_subarea_atuacao
                                )
                            ),
                            React.createElement('br', null)
                        );
                    });
                }

                subAreaAtuacao.push(React.createElement(
                    'div',
                    { key: "divArea_" + item.cd_area_atuacao, className: 'card', style: { display: item.checked ? '' : 'none' } },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt p-2' },
                        React.createElement(
                            'strong',
                            null,
                            item.tx_nome_area_atuacao
                        ),
                        React.createElement('br', null),
                        subarea
                    )
                ));

                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "area_" + item.cd_area_atuacao, onChange: () => this.callSubAreaAtuacao(item.cd_area_atuacao) },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_area_atuacao, required: true }),
                    React.createElement(
                        'label',
                        { className: 'custom-control-label', htmlFor: "area_" + item.cd_area_atuacao },
                        item.tx_nome_area_atuacao
                    )
                );
            }.bind(this));
        }

        let regioes = null;
        if (this.state.listRegiao) {
            regioes = this.state.listRegiao.map(function (item, index) {

                let sizeSearch = this.state.searchRegiao ? this.state.searchRegiao.length : 0;

                let firstPiece = null;
                let secondPiece = item.edre_nm_regiao;

                if (this.state.searchRegiao) {
                    firstPiece = item.edre_nm_regiao.substr(0, sizeSearch);
                    secondPiece = item.edre_nm_regiao.substr(sizeSearch);
                }

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.edre_cd_regiao,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setRegiao(item)
                    },
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    secondPiece
                );
            }.bind(this));
        }

        let ufs = null;
        if (this.state.listUf) {
            ufs = this.state.listUf.map(function (item, index) {

                let sizeSearch = this.state.searchUf ? this.state.searchUf.length : 0;
                let firstPiece = null;
                let secondPiece = item.eduf_nm_uf;

                if (this.state.searchUf) {
                    firstPiece = item.eduf_nm_uf.substr(0, sizeSearch);
                    secondPiece = item.eduf_nm_uf.substr(sizeSearch);
                }

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.eduf_cd_uf,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setUf(item)
                    },
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    secondPiece
                );
            }.bind(this));
        }

        let municipios = null;
        if (this.state.listMunicipio) {
            municipios = this.state.listMunicipio.map(function (item, index) {

                let sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
                let firstPiece = null;
                let secondPiece = item.edmu_nm_municipio;

                if (this.state.searchMunicipio) {
                    firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
                    secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
                }
                return React.createElement(
                    'li',
                    { key: 'cat_' + item.edmu_cd_municipio,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setMunicipio(item)
                    },
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    secondPiece
                );
            }.bind(this));
        }

        let cnae = null;
        if (this.state.listCnae) {
            cnae = this.state.listCnae.map(function (item, index) {

                let sizeSearch = this.state.searchCnae ? this.state.searchCnae.length : 0;
                let firstPiece = null;
                let secondPiece = item.tx_atividade_economica;

                if (this.state.searchCnae) {
                    firstPiece = item.tx_atividade_economica.substr(0, sizeSearch);
                    secondPiece = item.tx_atividade_economica.substr(sizeSearch);
                }
                return React.createElement(
                    'li',
                    { key: 'cat_' + item.cd_classe_atividade_economica,
                        className: 'list-group-item d-flex ',
                        onClick: () => this.setCnae(item)
                    },
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    secondPiece
                );
            }.bind(this));
        }

        let objetivos = null;
        if (this.state.dataObjetivos) {
            objetivos = this.state.dataObjetivos.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_objetivo_projeto, key: "cert_" + item.cd_objetivo_projeto },
                    item.tx_nome_objetivo_projeto
                );
            });
        }

        let objetivosMetas = null;
        if (this.state.dataObjetivosMetas) {
            objetivosMetas = this.state.dataObjetivosMetas.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_meta_projeto, key: "cert_" + item.cd_meta_projeto },
                    item.tx_nome_meta_projeto
                );
            });
        }

        ////////////////////////////////////////////////////
        let conselhos = null;
        if (this.state.dataConselhos) {
            conselhos = this.state.dataConselhos.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_conselho, key: "conselho_" + item.cd_conselho },
                    item.tx_nome_conselho
                );
            });
        }
        let participacoes = null;
        if (this.state.dataParticipacoes) {
            participacoes = this.state.dataParticipacoes.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_tipo_participacao, key: "articipacao_" + item.cd_tipo_participacao },
                    item.tx_nome_tipo_participacao
                );
            });
        }
        let conferencias = null;
        if (this.state.dataConferencias) {
            conferencias = this.state.dataConferencias.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_conferencia, key: "conferencia_" + item.cd_conferencia },
                    item.tx_nome_conferencia
                );
            });
        }
        let formaParticipacoes = null;
        if (this.state.dataFormaParticipacoes) {
            formaParticipacoes = this.state.dataFormaParticipacoes.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_forma_participacao_conferencia, key: "forma_" + item.cd_forma_participacao_conferencia },
                    item.tx_nome_forma_participacao_conferencia
                );
            });
        }
        ////////////////////////////////////////////////////
        //////////////////////Projetos//////////////////////////////
        let listFonteRecursosProjeto = null;
        if (this.state.dataFonteRecursosProjeto) {
            listFonteRecursosProjeto = this.state.dataFonteRecursosProjeto.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_origem_fonte_recursos_projeto, key: "forma_" + item.cd_origem_fonte_recursos_projeto },
                    item.tx_nome_origem_fonte_recursos_projeto
                );
            });
        }
        let listStatusProjeto = null;
        if (this.state.dataStatusProjeto) {
            listStatusProjeto = this.state.dataStatusProjeto.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_status_projeto, key: "forma_" + item.cd_status_projeto },
                    item.tx_nome_status_projeto
                );
            });
        }
        let listZonaAtuacaoProjeto = null;
        if (this.state.dataZonaAtuacaoProjeto) {
            listZonaAtuacaoProjeto = this.state.dataZonaAtuacaoProjeto.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_zona_atuacao_projeto, key: "forma_" + item.cd_zona_atuacao_projeto },
                    item.tx_nome_zona_atuacao
                );
            });
        }
        let listAbrangenciaProjeto = null;
        if (this.state.dataAbrangenciaProjeto) {
            listAbrangenciaProjeto = this.state.dataAbrangenciaProjeto.map(function (item) {
                return React.createElement(
                    'option',
                    { value: item.cd_abrangencia_projeto, key: "forma_" + item.cd_abrangencia_projeto },
                    item.tx_nome_abrangencia_projeto
                );
            });
        }
        ////////////////////////////////////////////////////


        return React.createElement(
            'form',
            null,
            React.createElement(
                'div',
                { className: 'accordion', id: 'accordionExample' },
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-1' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse1', 'aria-expanded': 'true',
                                'aria-controls': 'collapse1' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Dados Gerais',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse1', className: 'collapse show ', 'aria-labelledby': 'heading1',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_razao_social_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome da OSC'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'input-icon' },
                                        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque uma regi\xE3o', name: 'tx_nome_regiao',
                                            style: { display: this.state.filters.regiao ? 'none' : '' },
                                            onClick: this.clickSearchRegiao, onChange: this.handleSearchRegiao }),
                                        React.createElement('input', { type: 'text', className: 'form-control', name: 'tx_nome_regiao2',
                                            style: { display: this.state.filters.regiao ? '' : 'none' },
                                            readOnly: this.state.filters.regiao,
                                            defaultValue: this.state.filters.regiao ? this.state.filters.regiao.edre_nm_regiao : '' }),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.regiao ? 'none' : '' } },
                                            React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.regiao ? '' : 'none' }, onClick: this.removeRegiao },
                                            React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'ul',
                                                { className: 'box-search-itens', style: { display: (this.state.searchRegiao || this.state.listRegiao) && !this.state.filters.regiao ? '' : 'none' } },
                                                regioes
                                            )
                                        ),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_fantasia_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome Fantasia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'input-icon' },
                                        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque um estado', name: 'tx_nome_uf',
                                            style: { display: this.state.filters.uf ? 'none' : '' },
                                            onClick: this.clickSearchUf, onChange: this.handleSearchUf }),
                                        React.createElement('input', { type: 'text', className: 'form-control', name: 'tx_nome_uf2',
                                            style: { display: this.state.filters.uf ? '' : 'none' },
                                            readOnly: this.state.filters.uf,
                                            defaultValue: this.state.filters.uf ? this.state.filters.uf.eduf_nm_uf : '' }),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.uf ? 'none' : '' } },
                                            React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.uf ? '' : 'none' }, onClick: this.removeUf },
                                            React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'ul',
                                                { className: 'box-search-itens', style: { display: (this.state.searchUf || this.state.listUf) && !this.state.filters.uf ? '' : 'none' } },
                                                ufs
                                            )
                                        ),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_identificador_osc', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'CNPJ'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_situacao_imovel_oscSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Situa\xE7\xE3o do Im\xF3vel'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '1' },
                                                'Pr\xF3prio'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '2' },
                                                'Alugado'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '3' },
                                                'Cedido'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '4' },
                                                'Comodato'
                                            )
                                        ),
                                        React.createElement('label', { htmlFor: 'name' }),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano de Funda\xE7\xE3o',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setAnoFundacao
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'input-icon' },
                                        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque um Munic\xEDpio', name: 'tx_nome_municipio',
                                            style: { display: this.state.filters.municipio ? 'none' : '' },
                                            onClick: this.clickSearchMunicipio, onChange: this.handleSearchMunicipio }),
                                        React.createElement('input', { type: 'text', className: 'form-control', name: 'tx_nome_municipio2',
                                            style: { display: this.state.filters.municipio ? '' : 'none' },
                                            readOnly: this.state.filters.municipio,
                                            defaultValue: this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : '' }),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.municipio ? 'none' : '' } },
                                            React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.municipio ? '' : 'none' }, onClick: this.removeMunicipio },
                                            React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'ul',
                                                { className: 'box-search-itens', style: { display: (this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio ? '' : 'none' } },
                                                municipios
                                            )
                                        ),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Natureza Jur\xEDdica:'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_associacaoPrivada', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_associacaoPrivada' },
                                            'Associa\xE7\xE3o Privada'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_fundacaoPrivada', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_fundacaoPrivada' },
                                            'Funda\xE7\xE3o Privada'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_organizacaoReligiosa', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_organizacaoReligiosa' },
                                            'Organiza\xE7\xE3o Religiosa'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_organizacaoSocial', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_organizacaoSocial' },
                                            'Organiza\xE7\xE3o Social'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox ' },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'naturezaJuridica_outra', required: true }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: 'naturezaJuridica_outra' },
                                            'N\xE3o informado'
                                        )
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_objetivo_oscSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                                        ),
                                        objetivos
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_meta_oscSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Metas Relacionadas ao ODS'
                                        ),
                                        objetivosMetas
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-2' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse2', 'aria-expanded': 'true',
                                'aria-controls': 'collapse2' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            '\xC1reas e Sub\xE1reas de Atua\xE7\xE3o ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse2', className: 'collapse', 'aria-labelledby': 'heading2',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'input-icon' },
                                        React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Busque uma Atividade Econ\xF4mica', name: 'tx_atividade_economica',
                                            style: { display: this.state.filters.cnae ? 'none' : '' },
                                            onClick: this.clickSearchCnae, onChange: this.handleSearchCnae }),
                                        React.createElement('input', { type: 'text', className: 'form-control', name: 'tx_atividade_economica2',
                                            style: { display: this.state.filters.cnae ? '' : 'none' },
                                            readOnly: this.state.filters.cnae,
                                            defaultValue: this.state.filters.cnae ? this.state.filters.cnae.tx_atividade_economica : '' }),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.cnae ? 'none' : '' } },
                                            React.createElement('i', { className: 'fas fa-search', style: { top: '-28px' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.filters.cnae ? '' : 'none' }, onClick: this.removeCnae },
                                            React.createElement('i', { className: 'fas fa-times', style: { top: '-28px', cursor: 'pointer' } })
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'ul',
                                                { className: 'box-search-itens', style: { display: (this.state.searchCnae || this.state.listCnae) && !this.state.filters.cnae ? '' : 'none' } },
                                                cnae
                                            )
                                        ),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        '\xC1rea de Atua\xE7\xE3o'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        null,
                                        areaAtuacao,
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Sub\xE1rea de Atua\xE7\xE3o'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'card-columns' },
                                        subAreaAtuacao
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-3' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse3', 'aria-expanded': 'true',
                                'aria-controls': 'collapse3' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Titula\xE7\xF5es e Certifica\xE7\xF5es ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse3', className: 'collapse', 'aria-labelledby': 'heading3',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    certificados
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-4' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse4', 'aria-expanded': 'true',
                                'aria-controls': 'collapse4' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Rela\xE7\xF5es de Trabalho e Governan\xE7a ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse4', className: 'collapse', 'aria-labelledby': 'heading4',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome do Dirigente'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_cargo_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Cargo do Dirigente'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_conselheiro', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'name' },
                                            'Nome do Membro do Conselho Fiscal'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Total de trabalhadores',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setTotalTrabalhadores
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Total de empregados',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setTotalEmpregados
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Trabalhadores com defici\xEAncia',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setTrabalhadoresDeficiencia
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Trabalhadores volunt\xE1rios',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setTrabalhadoresVoluntarios
                                    })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-5' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse5', 'aria-expanded': 'true',
                                'aria-controls': 'collapse5' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Espa\xE7os de Participa\xE7\xE3o Social ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse5', className: 'collapse', 'aria-labelledby': 'heading5',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange },
                                        conselhos
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control", type: 'date', name: 'tx_nome_dirigente', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_dirigente' },
                                            'Data de In\xEDcio de Vig\xEAncia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Nome de representante conselho'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_tipo_participacaoSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Situa\xE7\xE3o do Im\xF3vel'
                                            ),
                                            participacoes
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'cd_conselhoSelectBoxItText', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'cd_conselhoSelectBoxItText' },
                                            'Data de Fim de Vig\xEAncia'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_conferenciaSelectBoxItText', onChange: this.handleInputChange },
                                        conferencias
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_forma_participacao_conferenciaSelectBoxItText', onChange: this.handleInputChange },
                                        formaParticipacoes
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano de Realiza\xE7\xE3o da Confer\xEAncia',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setAnoRealizacao
                                    })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-6' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse6', 'aria-expanded': 'true',
                                'aria-controls': 'collapse6' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Projetos ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse6', className: 'collapse', 'aria-labelledby': 'heading6',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_projeto', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_projeto' },
                                            'Nome do Projeto'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_status_projetoSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Situa\xE7\xE3o do projeto'
                                            ),
                                            listStatusProjeto
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-2' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control", type: 'date', name: 'dt_data_inicio_projeto', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'dt_data_inicio_projeto' },
                                            'Data de in\xEDcio'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-2' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control", type: 'date', name: 'dt_data_fim_projeto', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'dt_data_fim_projeto' },
                                            'Data de fim'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_abrangencia_projetoSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Abrang\xEAncia de atua\xE7\xE3o'
                                            ),
                                            listAbrangenciaProjeto
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-2' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_zona_atuacao_projetoSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Zona de Atua\xE7\xE3o'
                                            ),
                                            listZonaAtuacaoProjeto
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement(
                                            'select',
                                            { className: 'custom-select', name: 'cd_origem_fonte_recursos_projetoSelectBoxItText', defaultValue: 0, onChange: this.handleInputChange },
                                            React.createElement(
                                                'option',
                                                { value: '0' },
                                                'Fontes de Recursos'
                                            ),
                                            listFonteRecursosProjeto
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_financiador', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_financiador' },
                                            'Financiadores do Projeto'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_regiao_localizacao_projeto', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_regiao_localizacao_projeto' },
                                            'Local de Execu\xE7\xE3o'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_publico_beneficiado', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_publico_beneficiado' },
                                            'P\xFAblico Beneficiado'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_osc_parceira_projeto', onChange: this.handleInputChange, placeholder: ' ' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_osc_parceira_projeto' },
                                            'OSC Parceiras'
                                        ),
                                        React.createElement('div', { className: 'label-box-info-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setTotalBeneficiarios
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_objetivo_projetoSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                                        ),
                                        objetivos
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setValorTotal
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'select',
                                        { className: 'custom-select', name: 'cd_meta_projetoSelectBoxItText', onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Metas Relacionadas ao ODS'
                                        ),
                                        objetivosMetas
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(Range, {
                                        title: 'Ano',
                                        min: '0',
                                        max: '100',
                                        step: '1',
                                        defaultValueStart: '0',
                                        defaultValueEnd: '100',
                                        setValue: this.setValorRecebido
                                    })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-7' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse7', 'aria-expanded': 'true',
                                'aria-controls': 'collapse7' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Fontes de Recursos ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse7', className: 'collapse', 'aria-labelledby': 'heading7',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Fontes de recursos anuais da OSC'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(Range, {
                                                title: 'Ano',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setAnoFonteRecurso
                                            })
                                        )
                                    ),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos pro\u0301prios'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Rendimentos financeiros de reservas ou contas correntes pr\xF3prias',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setRendimentosFinanceirosReservas
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Rendimentos de fundos patrimoniais',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setRendimentosFundosPatrimoniais
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Mensalidades ou contribui\xE7\xF5es de associados',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setMensalidadesContribuicoes
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Venda de bens e direitos',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setVendaBensDireitos
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Pr\xEAmios recebidos',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setPremiosRecebidos
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Venda de produtos',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setVendaProdutos
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Presta\xE7\xE3o de servi\xE7os',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setPrestacaoServicos
                                            })
                                        )
                                    ),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos pu\u0301blicos'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Empresas p\xFAblicas ou sociedades de economia mista',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setEmpresasPublicasSociedadesEconomia
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Acordo com organismos multilaterais',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setAcordoOrganismosMultilaterais
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Acordo com governos estrangeiros',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setAcordoGovernosEstrangeiros
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com o governo estadual',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaGovernoEstadual
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com o governo municipal',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaGovernoMunicipal
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Transfer\xEAncias federais recebidas pela OSC',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setTransferenciasFederaisRecebidas
                                            })
                                        )
                                    ),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos privados'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com OSCs brasileiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaBrasileiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com OSCs estrangeiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaEstrangeiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com organiza\xE7\xF5es religiosas brasileiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaOrganizacoesReligiosasBrasileiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Parceria com organiza\xE7\xF5es religiosas estrangeiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setParceriaOrganizacoesReligiosasEstrangeiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Empresas privadas brasileiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setEmpresasPrivadasBrasileiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Empresas estrangeiras',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setEmpresasEstrangeiras
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Doa\xE7\xF5es de pessoa jur\xEDdica',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setDoacoesPessoaJuridica
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Doa\xE7\xF5es de pessoa f\xEDsica',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setDoacoesPessoaFisica
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (com NF)',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setDoacoesFormaProdutosServicos
                                            })
                                        )
                                    ),
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Recursos na\u0303o financeiros'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Voluntariado',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setVoluntariado
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Isen\xE7\xF5es',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setIsencoes
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Imunidades',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setImunidades
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-4' },
                                            React.createElement(Range, {
                                                title: 'Bens recebidos em direito de uso',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setBensRecebidosDireito
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement(Range, {
                                                title: 'Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (sem NF)',
                                                min: '0',
                                                max: '100',
                                                step: '1',
                                                defaultValueStart: '0',
                                                defaultValueEnd: '100',
                                                setValue: this.setDoacoesRecebidasFormaProdutosServicos
                                            })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-8' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse8', 'aria-expanded': 'true',
                                'aria-controls': 'collapse8' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            '\xCDndice de Desenvolvimento Humano ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse8', className: 'collapse', 'aria-labelledby': 'heading8',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: this.clickIdh },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'IDH_Municipal', required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: 'IDH_Municipal' },
                                    'IDH Municipal'
                                )
                            ),
                            React.createElement(
                                'div',
                                { id: 'divIdh', style: { display: this.state.active === false ? 'none' : '' } },
                                React.createElement('br', null),
                                React.createElement(
                                    'strong',
                                    null,
                                    ' Faixas de IDHM:'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'baixo', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'baixo' },
                                        'Baixo (abaixo de 0,600)'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'medio', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'medio' },
                                        'M\xE9dio (entre 0,600 e 0,699)'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox ' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'alto', required: true }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'alto' },
                                        'Alto (0,700 ou mais)'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-header', id: 'item-9' },
                        React.createElement(
                            'div',
                            { className: 'mb-0', 'data-toggle': 'collapse', 'data-target': '#collapse9', 'aria-expanded': 'true',
                                'aria-controls': 'collapse9' },
                            React.createElement(
                                'div',
                                { className: 'mn-accordion-icon mn-accordion-icon-p' },
                                React.createElement('i', { className: 'far fa-file-alt' })
                            ),
                            'Indicadores Socioecon\xF4micos Adicionais  ',
                            React.createElement('i', { className: 'fas fa-angle-down float-right' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'collapse9', className: 'collapse', 'aria-labelledby': 'heading9',
                            'data-parent': '#accordionExample' },
                        React.createElement(
                            'div',
                            { className: 'card-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                indicadores
                            )
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'clear-float' }),
            React.createElement('br', null),
            React.createElement(
                'button',
                { type: 'button', style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-primary', onClick: this.filter },
                'Filtrar'
            ),
            React.createElement('br', null),
            React.createElement(
                'div',
                { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'text-danger' },
                this.state.msg
            ),
            React.createElement(
                'div',
                { style: { display: this.state.loading ? 'block' : 'none' } },
                React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                'Processando'
            )
        );
    }
}