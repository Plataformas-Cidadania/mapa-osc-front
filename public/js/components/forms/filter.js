class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {
        avancado: {}
      },
      camposDadosGerais: ['tx_razao_social_osc', 'tx_nome_regiao', 'tx_nome_fantasia_osc', 'tx_nome_uf', 'cd_identificador_osc', 'cd_situacao_imovel_osc', 'anoFundacaoMIN', 'anoFundacaoMAX', 'tx_nome_municipio', 'cd_situacao_cadastral', 'cd_objetivo_osc', 'cd_meta_osc', 'cd_regiao', 'cd_uf', 'cd_municipio', 'naturezaJuridica_associacaoPrivada', 'naturezaJuridica_fundacaoPrivada', 'naturezaJuridica_organizacaoReligiosa', 'naturezaJuridica_organizacaoSocial', 'naturezaJuridica_outra'],
      camposRelacoesTrabalhoGovernanca: ["tx_nome_dirigente", "tx_cargo_dirigente", "tx_nome_conselheiro", "totalTrabalhadoresMIN", "totalTrabalhadoresMAX", "totalEmpregadosMIN", "totalEmpregadosMAX", "trabalhadoresDeficienciaMIN", "trabalhadoresDeficienciaMAX", "trabalhadoresVoluntariosMIN", "trabalhadoresVoluntariosMAX"],
      camposEspacosParticipacaoSocial: ["cd_conselho", "dt_data_inicio_conselho", "tx_nome_representante_conselho", "cd_tipo_participacao", "dt_data_fim_conselho", "cd_conferencia", "cd_forma_participacao_conferencia", "anoRealizacaoConferenciaMIN", "anoRealizacaoConferenciaMAX"],
      camposProjetos: ["tx_nome_projeto", "cd_status_projeto", "dt_data_inicio_projeto", "dt_data_fim_projeto", "cd_abrangencia_projeto", "cd_zona_atuacao_projeto", "cd_origem_fonte_recursos_projeto", "tx_nome_financiador", "tx_nome_regiao_localizacao_projeto", "tx_nome_publico_beneficiado", "tx_nome_osc_parceira_projeto", "totalBeneficiariosMIN", "totalBeneficiariosMAX", "cd_objetivo_projeto", "valorTotalMIN", "valorTotalMAX", "cd_meta_projeto", "valorRecebidoMIN", "valorRecebidoMAX"],
      camposFontesRecursos: [],
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
        ano_fundacao: {
          start: null,
          end: null
        },
        ano_fundacao2: {
          start: null,
          end: null
        },
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
      dataObjetivosMetasProjetos: [],
      dataConselhos: [],
      dataParticipacoes: [],
      dataConferencias: [],
      dataFormaParticipacoes: [],
      dataSituacaoCadastral: []
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
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleAreaAtuacao = this.handleAreaAtuacao.bind(this);
    this.handleSubAreaAtuacao = this.handleSubAreaAtuacao.bind(this);
    this.handleCheckChangeTitulacaoCertificacao = this.handleCheckChangeTitulacaoCertificacao.bind(this);
    this.handleCheckChangeIDH = this.handleCheckChangeIDH.bind(this);
    this.handleCheckChangeAdicionais = this.handleCheckChangeAdicionais.bind(this);
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
    this.situacaoCadastral = this.situacaoCadastral.bind(this);
    this.conselhos = this.conselhos.bind(this);
    this.participacoes = this.participacoes.bind(this);
    this.conferencias = this.conferencias.bind(this);
    this.formaParticipacoes = this.formaParticipacoes.bind(this);
    this.fonteRecursosProjeto = this.fonteRecursosProjeto.bind(this);
    this.statusProjeto = this.statusProjeto.bind(this);
    this.zonaAtuacaoProjeto = this.zonaAtuacaoProjeto.bind(this);
    this.abrangenciaProjeto = this.abrangenciaProjeto.bind(this);
    this.setJsonDadosGerais = this.setJsonDadosGerais.bind(this);
    this.setJsonAtividadeEconomica = this.setJsonAtividadeEconomica.bind(this);
    this.setJsonTitulacaoCertificacao = this.setJsonTitulacaoCertificacao.bind(this);
    this.setJsonRelacoesTrabalhoGovernanca = this.setJsonRelacoesTrabalhoGovernanca.bind(this);
    this.setJsonProjetos = this.setJsonProjetos.bind(this);
    this.setJsonFontesRecursos = this.setJsonFontesRecursos.bind(this);
    this.setJsonIDH = this.setJsonIDH.bind(this);
    this.setJsonAdicionais = this.setJsonAdicionais.bind(this);
    this.exportar = this.exportar.bind(this);
    this.gerarCsvExportacao = this.gerarCsvExportacao.bind(this);
  }
  componentDidMount() {
    this.objetivos();
    this.situacaoCadastral();
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
  submitForm() {
    $("#frmMapa").submit();
  }
  setJsonDadosGerais(name, value, type) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('dadosGerais')) {
      json.avancado.dadosGerais = {};
    }
    if (type === 'input' || type === 'search' || type === 'range') {
      if (name === 'cd_situacao_cadastral') {
        if (value === '0' || value === '' || !value) {
          // Remove o campo se o valor for 0, vazio ou falsy (opção padrão)
          delete json.avancado.dadosGerais[name];
        } else {
          // Converte para inteiro para garantir o tipo correto
          json.avancado.dadosGerais[name] = parseInt(value);
        }
      } else if (value && value !== '' && value !== '0') {
        // Para outros campos, só adiciona se tiver valor válido
        json.avancado.dadosGerais[name] = value;
      } else {
        // Remove campos vazios
        delete json.avancado.dadosGerais[name];
      }
      if (name === 'cd_situacao_cadastral') {
        console.log('📝 JSON final com situacao_cadastral:', JSON.stringify(json.avancado.dadosGerais));
      }
      this.setState({
        json: json
      });
      return;
    }
    if (type === 'checkbox') {
      if (value) {
        json.avancado.dadosGerais[name] = value;
        this.setState({
          json: json
        });
        return;
      }
      delete json.avancado.dadosGerais[name];
      this.setState({
        json: json
      });
    }
  }
  setJsonAtividadeEconomica(value) {
    console.log(value);
    let json = this.state.json;
    if (value) {
      //console.log('-----------');
      //console.log(value);
      json.avancado.atividadeEconomica = {
        tx_atividade_economica: value.tx_nome_classe_atividade_economica,
        cd_classe_atividade_economica: value.cd_classe_atividade_economica
      };
      //console.log(json);
      //json.avancado.atividadeEconomica = value;
      this.setState({
        json: json
      });
      return;
    }
    delete json.avancado.atividadeEconomica;
    this.setState({
      json: json
    });
  }
  setJsonAreasSubareasAtuacao(name, value, area) {
    console.log(name, value, area);
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('areasSubareasAtuacao')) {
      json.avancado.areasSubareasAtuacao = {};
    }

    //clicou em subarea
    if (area) {
      if (value) {
        json.avancado.areasSubareasAtuacao[name] = value;
        //console.log(json.avancado.areasSubareasAtuacao);
        delete json.avancado.areasSubareasAtuacao[area]; //deleta a área por ter especificado uma subarea
        this.setState({
          json: json
        });
        return;
      }
      delete json.avancado.areasSubareasAtuacao[name];

      //Irá verificar se ainda existe subáreas da área. Se não existir adicionar a área novamente ao json
      let partesArea = area.split('-');
      let codigoArea = partesArea[1];
      let areaSelecionada = this.state.areaAtuacao.find(function (item) {
        //console.log(item.cd_area_atuacao, codigoArea);
        return parseInt(item.cd_area_atuacao) === parseInt(codigoArea);
      });
      //console.log('areaSelecionada', areaSelecionada);
      let existSubareaArea = false;
      for (let i in areaSelecionada.subareas) {
        for (let subarea in json.avancado.areasSubareasAtuacao) {
          let partesArea = subarea.split('-');
          let codigoSubarea = partesArea[1];
          //console.log(areaSelecionada.subareas[i].cd_subarea_atuacao, codigoSubarea);
          if (parseInt(areaSelecionada.subareas[i].cd_subarea_atuacao) === parseInt(codigoSubarea)) {
            existSubareaArea = true;
            break;
          }
        }
      }
      if (!existSubareaArea) {
        json.avancado.areasSubareasAtuacao[area] = true; //recoloca a área não existir subareas marcadas
      }
      //////////////////////////////

      this.setState({
        json: json
      });
      return;
    }

    //clicou em area
    if (value) {
      json.avancado.areasSubareasAtuacao[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    delete json.avancado.areasSubareasAtuacao[name];
    this.setState({
      json: json
    });
  }
  setJsonTitulacaoCertificacao(name, value) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('titulacoesCertificacoes')) {
      json.avancado.titulacoesCertificacoes = {};
    }
    if (value) {
      json.avancado.titulacoesCertificacoes[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    delete json.avancado.titulacoesCertificacoes[name];
    this.setState({
      json: json
    });
  }
  setJsonRelacoesTrabalhoGovernanca(name, value, type) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('relacoesTrabalhoGovernanca')) {
      json.avancado.relacoesTrabalhoGovernanca = {};
    }
    if (type === 'input' || type === 'search' || type === 'range') {
      json.avancado.relacoesTrabalhoGovernanca[name] = value;
      this.setState({
        json: json
      });
      return;
    }
  }
  setJsonEspacosParticipacaoSocial(name, value, type) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('espacosParticipacaoSocial')) {
      json.avancado.espacosParticipacaoSocial = {};
    }
    if (type === 'input' || type === 'search' || type === 'range') {
      json.avancado.espacosParticipacaoSocial[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    if (type === 'checkbox') {
      if (value) {
        json.avancado.espacosParticipacaoSocial[name] = value;
        this.setState({
          json: json
        });
        return;
      }
      delete json.avancado.espacosParticipacaoSocial[name];
      this.setState({
        json: json
      });
    }
  }
  setJsonProjetos(name, value, type) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('projetos')) {
      json.avancado.projetos = {};
    }
    if (type === 'input' || type === 'search' || type === 'range') {
      json.avancado.projetos[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    if (type === 'checkbox') {
      if (value) {
        json.avancado.projetos[name] = value;
        this.setState({
          json: json
        });
        return;
      }
      delete json.avancado.projetos[name];
      this.setState({
        json: json
      });
    }
  }
  setJsonFontesRecursos(name, value, type) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('fontesRecursos')) {
      json.avancado.fontesRecursos = {};
    }
    if (type === 'range') {
      value = this.formatValue(value);
    }
    if (type === 'input' || type === 'search' || type === 'range') {
      json.avancado.fontesRecursos[name] = value;
      this.setState({
        json: json
      });
      return;
    }
  }
  setJsonIDH(name, value) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('IDH')) {
      json.avancado.IDH = {};
    }
    if (value) {
      json.avancado.IDH[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    delete json.avancado.IDH[name];
    this.setState({
      json: json
    });
  }
  setJsonAdicionais(name, value) {
    let json = this.state.json;
    if (!json.avancado.hasOwnProperty('Adicionais')) {
      json.avancado.Adicionais = {};
    }
    if (value) {
      json.avancado.Adicionais[name] = value;
      this.setState({
        json: json
      });
      return;
    }
    delete json.avancado.Adicionais[name];
    this.setState({
      json: json
    });
  }
  handleCheckChange(event) {
    const target = event.target;
    const id = target.id;
    if (this.state.camposDadosGerais.includes(id)) {
      this.setJsonDadosGerais(id, target.checked, 'checkbox');
    }
  }
  handleCheckChangeTitulacaoCertificacao(event) {
    const target = event.target;
    const id = target.id;
    this.setJsonTitulacaoCertificacao(id, target.checked);
  }
  handleCheckChangeIDH(event) {
    const target = event.target;
    const id = target.id;
    this.setJsonIDH(id, target.checked);
  }
  handleCheckChangeAdicionais(event) {
    console.log(event.target.id, event.target.value);
    const target = event.target;
    const id = target.id;
    this.setJsonAdicionais(id, target.checked);
  }
  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'cd_situacao_cadastral') {
      console.log('🔍 Filtro situacao_cadastral selecionado:', value);
    }
    if (this.state.camposDadosGerais.includes(name)) {
      this.setJsonDadosGerais(name, value, 'input');
    }
    if (this.state.camposRelacoesTrabalhoGovernanca.includes(name)) {
      this.setJsonRelacoesTrabalhoGovernanca(name, value, 'input');
    }
    if (this.state.camposEspacosParticipacaoSocial.includes(name)) {
      this.setJsonEspacosParticipacaoSocial(name, value, 'input');
    }
    if (this.state.camposEspacosParticipacaoSocial.includes(name)) {
      this.setJsonEspacosParticipacaoSocial(name, value, 'input');
    }
    if (this.state.camposProjetos.includes(name)) {
      this.setJsonProjetos(name, value, 'input');
    }
    if (target.name == 'cd_objetivo_osc') {
      this.objetivosMetas(target.value);
    }
    if (target.name == 'cd_objetivo_projeto') {
      this.objetivosMetasProjetos(target.value);
    }

    /*if(target.name==='cel'){
        value = maskCel(value);
    }
    if(target.name==='whatsapp'){
        value = maskCel(value);
    }*/

    let form = this.state.form;
    form[name] = value;
    this.setState({
      form: form
    });
  }
  handleAreaAtuacao(codigo, value) {
    this.setJsonAreasSubareasAtuacao('cd_area_atuacao-' + codigo, value, null);
  }
  handleSubAreaAtuacao(codigo, value, cd_area_atuacao) {
    this.setJsonAreasSubareasAtuacao('cd_subarea_atuacao-' + codigo, value, 'cd_area_atuacao-' + cd_area_atuacao);
  }

  /*Regiao*/
  handleSearchRegiao(e) {
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      searchRegiao: search
    }, function () {
      this.listRegiao(search);
    });
  }
  clickSearchRegiao() {
    let search = this.state.searchRegiao ? this.state.searchRegiao : ' ';
    this.listRegiao(search);
  }
  listRegiao(search) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/geo/regiao/'+search,
      url: getBaseUrl2 + 'busca/regiao/' + search,
      cache: false,
      success: function (data) {
        this.setState({
          listRegiao: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  setRegiao(item) {
    let filters = this.state.filters;
    filters.regiao = item;
    this.setJsonDadosGerais('tx_nome_regiao', item.edre_nm_regiao, 'search');
    this.setJsonDadosGerais('cd_regiao', item.edre_cd_regiao), 'search';
    this.setState({
      filters: filters,
      searchRegiao: null
    });
  }
  removeRegiao() {
    let filters = this.state.filters;
    filters.regiao = null;
    this.setState({
      filters: filters
    });
  }

  /*UF*/
  handleSearchUf(e) {
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      searchUf: search
    }, function () {
      if (search.length > 2) {
        this.listUf(search);
      }
    });
  }
  clickSearchUf() {
    let search = this.state.searchUf ? this.state.searchUf : ' ';
    if (search.length > 2) {
      this.listUf(search);
    }
  }
  listUf(search) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/geo/estado/'+search,
      url: getBaseUrl2 + 'busca/estado/' + search,
      cache: false,
      success: function (data) {
        this.setState({
          listUf: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  setUf(item) {
    let filters = this.state.filters;
    filters.uf = item;
    this.setJsonDadosGerais('tx_nome_uf', item.eduf_nm_uf, 'search');
    this.setJsonDadosGerais('cd_uf', item.eduf_cd_uf, 'search');
    this.setState({
      filters: filters
    });
  }
  removeUf() {
    let filters = this.state.filters;
    filters.uf = null;
    this.setState({
      filters: filters
    });
  }

  /*Municipio*/
  handleSearchMunicipio(e) {
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      searchMunicipio: search
    }, function () {
      if (search.length > 2) {
        this.listMunicipio(search);
      }
    });
  }
  clickSearchMunicipio() {
    let search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
    if (search.length > 2) {
      this.listMunicipio(search);
    }
  }
  listMunicipio(search) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/geo/municipio/'+search,
      url: getBaseUrl2 + 'busca/municipio/' + search,
      cache: false,
      success: function (data) {
        this.setState({
          listMunicipio: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  setMunicipio(item) {
    let filters = this.state.filters;
    filters.municipio = item;
    this.setJsonDadosGerais('tx_nome_municipio', item.edmu_nm_municipio + ' - ' + item.eduf_sg_uf, 'search');
    this.setJsonDadosGerais('cd_municipio', item.edmu_cd_municipio, 'search');
    this.setState({
      filters: filters
    });
  }
  removeMunicipio() {
    let filters = this.state.filters;
    filters.municipio = null;
    this.setState({
      filters: filters
    });
  }
  /*Cnae*/
  handleSearchCnae(e) {
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      searchCnae: search
    }, function () {
      if (search.length > 2) {
        this.listCnae(search);
      }
    });
  }
  clickSearchCnae() {
    let search = this.state.searchCnae ? this.state.searchCnae : ' ';
    this.listCnae(search);
  }
  listCnae(search) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'search/atividade_economica/autocomplete/'+search,
      url: getBaseUrl2 + 'classe_economica/autocomplete/' + search,
      //url: 'search/atividade_economica/autocomplete/'+search,
      cache: false,
      success: function (data) {
        this.setState({
          listCnae: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  setCnae(item) {
    this.setJsonAtividadeEconomica(item);
    let filters = this.state.filters;
    filters.cnae = item;
    this.setState({
      filters: filters
    });
  }
  removeCnae() {
    this.setJsonAtividadeEconomica(null);
    let filters = this.state.filters;
    filters.cnae = null;
    this.setState({
      filters: filters
    });
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

    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
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
          this.setState({
            loading: false
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          this.setState({
            loading: false
          });
        }.bind(this)
      });
    });
  }
  callSubAreaAtuacao(id) {
    this.setState({
      button: false
    });
    $.ajax({
      method: 'GET',
      cache: false,
      //url: getBaseUrl+'menu/osc/subarea_atuacao',
      url: getBaseUrl2 + 'subarea_atuacao',
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
        this.setState({
          loading: false,
          areaAtuacao: areaAtuacao,
          id_area: id,
          button: true
        });
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
    this.setJsonEspacosParticipacaoSocial('anoRealizacaoConferenciaMIN', start, 'range');
    this.setJsonEspacosParticipacaoSocial('anoRealizacaoConferenciaMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setAnoFundacao(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonDadosGerais('anoFundacaoMIN', start, 'range');
    this.setJsonDadosGerais('anoFundacaoMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTotalTrabalhadores(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonRelacoesTrabalhoGovernanca('totalTrabalhadoresMIN', start, 'range');
    this.setJsonRelacoesTrabalhoGovernanca('totalTrabalhadoresMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTotalEmpregados(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonRelacoesTrabalhoGovernanca('totalEmpregadosMIN', start, 'range');
    this.setJsonRelacoesTrabalhoGovernanca('totalEmpregadosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTrabalhadoresDeficiencia(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonRelacoesTrabalhoGovernanca('trabalhadoresDeficienciaMIN', start, 'range');
    this.setJsonRelacoesTrabalhoGovernanca('trabalhadoresDeficienciaMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTrabalhadoresVoluntarios(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonRelacoesTrabalhoGovernanca('trabalhadoresVoluntariosMIN', start, 'range');
    this.setJsonRelacoesTrabalhoGovernanca('trabalhadoresVoluntariosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setAnoFonteRecurso(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('anoFonteRecursoMIN', start, 'range');
    this.setJsonFontesRecursos('anoFonteRecursoMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setRendimentosFinanceirosReservas(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('rendimentosFinanceirosReservasContasCorrentesPropriasMIN', start, 'range');
    this.setJsonFontesRecursos('rendimentosFinanceirosReservasContasCorrentesPropriasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setRendimentosFundosPatrimoniais(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('rendimentosFundosPatrimoniaisMIN', start, 'range');
    this.setJsonFontesRecursos('rendimentosFundosPatrimoniaisMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setMensalidadesContribuicoes(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('mensalidadesContribuicoesAssociadosMIN', start, 'range');
    this.setJsonFontesRecursos('mensalidadesContribuicoesAssociadosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setVendaBensDireitos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('vendaBensDireitosMIN', start, 'range');
    this.setJsonFontesRecursos('vendaBensDireitosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setPremiosRecebidos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('premiosRecebidosMIN', start, 'range');
    this.setJsonFontesRecursos('premiosRecebidosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setVendaProdutos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('vendaProdutosMIN', start, 'range');
    this.setJsonFontesRecursos('vendaProdutosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setPrestacaoServicos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('prestacaoServicosMIN', start, 'range');
    this.setJsonFontesRecursos('prestacaoServicosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setEmpresasPublicasSociedadesEconomia(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('empresasPublicasSociedadesEconomiaMistaMIN', start, 'range');
    this.setJsonFontesRecursos('empresasPublicasSociedadesEconomiaMistaMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setAcordoOrganismosMultilaterais(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('acordoOrganismosMultilateraisMIN', start, 'range');
    this.setJsonFontesRecursos('acordoOrganismosMultilateraisMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setAcordoGovernosEstrangeiros(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('acordoGovernosEstrangeirosMIN', start, 'range');
    this.setJsonFontesRecursos('acordoGovernosEstrangeirosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaGovernoEstadual(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaGovernoEstadualMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaGovernoEstadualMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaGovernoMunicipal(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaGovernoMunicipalMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaGovernoMunicipalMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTransferenciasFederaisRecebidas(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaGovernoFederalMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaGovernoFederalMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaBrasileiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaOscBrasileirasMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaOscBrasileirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaEstrangeiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaOscEstrangeirasMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaOscEstrangeirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaOrganizacoesReligiosasBrasileiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaOrganizacoesReligiosasBrasileirasMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaOrganizacoesReligiosasBrasileirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setParceriaOrganizacoesReligiosasEstrangeiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('parceriaOrganizacoesReligiosasEstrangeirasMIN', start, 'range');
    this.setJsonFontesRecursos('parceriaOrganizacoesReligiosasEstrangeirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setEmpresasPrivadasBrasileiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('empresasPrivadasBrasileirasMIN', start, 'range');
    this.setJsonFontesRecursos('empresasPrivadasBrasileirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setEmpresasEstrangeiras(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('EmpresasEstrangeirasMIN', start, 'range');
    this.setJsonFontesRecursos('EmpresasEstrangeirasMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setDoacoesPessoaJuridica(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('doacoesPessoaJuridicaMIN', start, 'range');
    this.setJsonFontesRecursos('doacoesPessoaJuridicaMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setDoacoesPessoaFisica(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('doacoesPessoaFisicaMIN', start, 'range');
    this.setJsonFontesRecursos('doacoesPessoaFisicaMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setDoacoesFormaProdutosServicos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('doacoesRecebidasFormaProdutosServicosComNFMIN', start, 'range');
    this.setJsonFontesRecursos('doacoesRecebidasFormaProdutosServicosComNFMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setVoluntariado(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('voluntariadoMIN', start, 'range');
    this.setJsonFontesRecursos('voluntariadoMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setIsencoes(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('isencoesMIN', start, 'range');
    this.setJsonFontesRecursos('isencoesMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setImunidades(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('imunidadesMIN', start, 'range');
    this.setJsonFontesRecursos('imunidadesMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setBensRecebidosDireito(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('bensRecebidosDireitoUsoMIN', start, 'range');
    this.setJsonFontesRecursos('bensRecebidosDireitoUsoMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setDoacoesRecebidasFormaProdutosServicos(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonFontesRecursos('doacoesRecebidasFormaProdutosServicosSemNFMIN', start, 'range');
    this.setJsonFontesRecursos('doacoesRecebidasFormaProdutosServicosSemNFMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setTotalBeneficiarios(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonProjetos('totalBeneficiariosMIN', start, 'range');
    this.setJsonProjetos('totalBeneficiariosMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setValorTotal(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonProjetos('valorTotalMIN', start, 'range');
    this.setJsonProjetos('valorTotalMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  setValorRecebido(start, end) {
    let filters = this.state.filters;
    filters.ano_fundacao.start = start;
    filters.ano_fundacao.end = end;
    this.setJsonProjetos('valorRecebidoMIN', start, 'range');
    this.setJsonProjetos('valorRecebidoMAX', end, 'range');
    this.setState({
      filters: filters
    });
  }
  objetivos() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'objetivos',
      //url: getBaseUrl + 'menu/osc/objetivo_projeto',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataObjetivos: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  situacaoCadastral() {
    $.ajax({
      method: 'GET',
      url: 'https://mapaosc.ipea.gov.br/api/api/situacao_cadastral',
      cache: false,
      success: function (data) {
        console.log('✅ Situação Cadastral carregada:', data?.length, 'opções');
        this.setState({
          dataSituacaoCadastral: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log('❌ Erro situação cadastral:', err);
      }.bind(this)
    });
  }
  objetivosMetas(id) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'componente/metas_objetivo_projeto/'+id,
      url: getBaseUrl2 + 'objetivos/metas/' + id,
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataObjetivosMetas: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que o formulário seja submetido normalmente
      this.handleSubmit(); // Substitua pelo método que manipula a submissão do formulário
    }
  }
  objetivosMetasProjetos(id) {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'componente/metas_objetivo_projeto/'+id,
      url: getBaseUrl2 + 'objetivos/metas/' + id,
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataObjetivosMetasProjetos: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }

  ////////////////////////////////////////

  conselhos() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/conselho',
      url: getBaseUrl2 + 'ps_conselhos',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataConselhos: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  participacoes() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/tipo_participacao',
      url: getBaseUrl2 + 'tipo_participacao',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataParticipacoes: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  conferencias() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/conferencia',
      url: getBaseUrl2 + 'ps_conferencias',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataConferencias: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  formaParticipacoes() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
      url: getBaseUrl2 + 'ps_conferencias_formas',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataFormaParticipacoes: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }

  ////////////////////////////////////////
  ////////////////////PROJETOS////////////////////

  fonteRecursosProjeto() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'origem_fonte_recurso_projeto',
      //url: 'menu/osc/origem_fonte_recursos_projeto',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataFonteRecursosProjeto: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  statusProjeto() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'status_projeto',
      //url: 'menu/osc/status_projeto',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataStatusProjeto: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  zonaAtuacaoProjeto() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'zona_atuacao_projeto',
      //url: 'menu/osc/zona_atuacao_projeto',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataZonaAtuacaoProjeto: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  abrangenciaProjeto() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'abrangencia_projeto',
      //url: 'menu/osc/abrangencia_projeto',
      cache: false,
      success: function (data) {
        //console.log('data', data);
        this.setState({
          dataAbrangenciaProjeto: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }

  ////////////////////////////////////////

  padronizarTexto(str) {
    str = str.normalize("NFD");
    str = str.replace(/[^a-zA-Zs ]/g, "");
    let array = str.split(" ");
    let newStr = array[0].toLowerCase();
    for (let i = 1; i < array.length; i++) {
      newStr += array[i];
    }
    //str = str[0].toLowerCase() + str.slice(1);
    return newStr;
  }
  formatValue(value) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  exportar() {
    let strJson = JSON.stringify(this.state.json);
    $('#modalExportar').modal('show');
    console.log(Object.keys(this.state.json.avancado).length);
    if (Object.keys(this.state.json.avancado).length === 0) {
      return;
    }
    //if(this.state.origem === 'busca-avancada'){
    console.log('exportar');
    this.setState({
      processingExportacao: true,
      textoProcessingExportacao: 'Buscando dados. Pode ser que demore alguns minutos'
    });
    $.ajax({
      //contentType: 'application/json',
      //dataType: 'json',
      method: 'POST',
      //url: 'osc/busca_avancada/lista',
      //url: getBaseUrl2 + 'osc/exportar',
      url: 'osc/exportar',
      //data: this.props.strJson,
      data: {
        busca: strJson
      },
      cache: false,
      success: function (data) {
        //console.log(data);
        //data = JSON.parse(data);
        //this.setState({dataExportacao: data, processingExportacao: false}, function(){
        this.setState({
          processingExportacao: false
        }, function () {
          //this.gerarCsvExportacao();
          this.gerarCsvExportacao(data);
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({
          processingExportacao: false
        });
      }.bind(this)
    });
    //}
  }

  //gerarCsvExportacao(){
  gerarCsvExportacao(csv) {
    console.log('gerar csv');
    this.setState({
      textoProcessingExportacao: 'gerando csv'
    });
    /*let firstRow = this.state.dataExportacao[0];
    let firsRowCsv = '';
    for(let column in firstRow){
        if(column !== 'im_logo'){
            firsRowCsv += column+';';
        }
    }
    firsRowCsv = firsRowCsv.slice(0, -1);
    let columns = firsRowCsv.split(';');
    let csv = firsRowCsv+'\n';
      this.state.dataExportacao.forEach(function (item){
        let row = '';
        columns.forEach(function (column){
            row += item[column]+';';
        });
        row = row.slice(0, -1);
        csv += row+'\n';
    });*/

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'exportacao.csv';
    hiddenElement.click();
    this.setState({
      processingExportacao: false,
      textoProcessingExportacao: ''
    });
    $('#modalExportar').modal('hide');
  }
  render() {
    //console.log('dataFormaParticipacoes', this.state.dataFormaParticipacoes)

    let date = new Date();
    let ano = date.getFullYear();
    let certificados = null;
    if (this.state.certificados) {
      certificados = this.state.certificados.map(function (item) {
        return /*#__PURE__*/React.createElement("div", {
          className: "custom-control custom-checkbox",
          key: "cert_" + item.cd_certificado
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          className: "custom-control-input",
          id: "titulacao_" + this.padronizarTexto(item.tx_nome_certificado),
          required: true,
          onChange: this.handleCheckChangeTitulacaoCertificacao
        }), /*#__PURE__*/React.createElement("label", {
          className: "custom-control-label",
          htmlFor: "titulacao_" + this.padronizarTexto(item.tx_nome_certificado)
        }, item.tx_nome_certificado));
      }.bind(this));
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
          let tema = {
            tema: item.tx_tema,
            indices: [item]
          };
          indicadores.push(tema);
        }
      });
      indicadores = indicadores.map(function (item, index) {
        let indices = item.indices.map(function (subitem) {
          return /*#__PURE__*/React.createElement("div", {
            key: "cd_indice-" + subitem.cd_indice
          }, /*#__PURE__*/React.createElement("div", {
            className: "custom-control custom-checkbox"
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            className: "custom-control-input",
            id: "cd_indice-" + subitem.cd_indice,
            required: true,
            onChange: this.handleCheckChangeAdicionais
          }), /*#__PURE__*/React.createElement("label", {
            className: "custom-control-label",
            htmlFor: "cd_indice-" + subitem.cd_indice
          }, subitem.tx_nome_indice)), /*#__PURE__*/React.createElement("br", null));
        }.bind(this));
        return /*#__PURE__*/React.createElement("div", {
          key: "ipeaData_" + index,
          className: "col-md-6"
        }, /*#__PURE__*/React.createElement("strong", null, item.tema), /*#__PURE__*/React.createElement("hr", null), indices, /*#__PURE__*/React.createElement("br", null));
      }.bind(this));
    }
    let areaAtuacao = null;
    let subAreaAtuacao = [];
    if (this.state.areaAtuacao) {
      areaAtuacao = this.state.areaAtuacao.map(function (item) {
        let subarea = null;
        if (item.subareas) {
          subarea = item.subareas.map(function (subitem) {
            return /*#__PURE__*/React.createElement("div", {
              key: "subarea_" + subitem.cd_subarea_atuacao
            }, /*#__PURE__*/React.createElement("div", {
              className: "custom-control custom-checkbox",
              onChange: () => this.handleSubAreaAtuacao(subitem.cd_subarea_atuacao, document.getElementById("subarea_" + subitem.cd_subarea_atuacao).checked, item.cd_area_atuacao)
            }, /*#__PURE__*/React.createElement("input", {
              type: "checkbox",
              className: "custom-control-input",
              id: "subarea_" + subitem.cd_subarea_atuacao,
              required: true
            }), /*#__PURE__*/React.createElement("label", {
              className: "custom-control-label",
              htmlFor: "subarea_" + subitem.cd_subarea_atuacao
            }, subitem.tx_nome_subarea_atuacao)), /*#__PURE__*/React.createElement("br", null));
          }.bind(this));
        }
        subAreaAtuacao.push(/*#__PURE__*/React.createElement("div", {
          key: "divArea_" + item.cd_area_atuacao,
          className: "card",
          style: {
            display: item.checked ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "bg-lgt p-2"
        }, /*#__PURE__*/React.createElement("strong", null, item.tx_nome_area_atuacao), /*#__PURE__*/React.createElement("br", null), subarea)));
        return /*#__PURE__*/React.createElement("div", {
          className: "custom-control custom-checkbox",
          key: "area_" + item.cd_area_atuacao,
          onChange: () => {
            this.callSubAreaAtuacao(item.cd_area_atuacao);
            this.handleAreaAtuacao(item.cd_area_atuacao, document.getElementById("area_" + item.cd_area_atuacao).checked);
          }
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          className: "custom-control-input",
          id: "area_" + item.cd_area_atuacao,
          required: true
        }), /*#__PURE__*/React.createElement("label", {
          className: "custom-control-label",
          htmlFor: "area_" + item.cd_area_atuacao
        }, item.tx_nome_area_atuacao));
      }.bind(this));
    }
    let regioes = null;
    if (this.state.listRegiao) {
      regioes = this.state.listRegiao?.map(function (item, index) {
        let sizeSearch = this.state.searchRegiao ? this.state.searchRegiao.length : 0;
        let firstPiece = null;
        let secondPiece = item.edre_nm_regiao;
        if (this.state.searchRegiao) {
          firstPiece = item.edre_nm_regiao.substr(0, sizeSearch);
          secondPiece = item.edre_nm_regiao.substr(sizeSearch);
        }
        return /*#__PURE__*/React.createElement("li", {
          key: 'cat_' + item.edre_cd_regiao,
          className: "list-group-item d-flex ",
          onClick: () => this.setRegiao(item)
        }, /*#__PURE__*/React.createElement("u", null, firstPiece), secondPiece);
      }.bind(this));
    }
    let ufs = null;
    if (this.state.listUf) {
      ufs = this.state.listUf?.map(function (item, index) {
        let sizeSearch = this.state.searchUf ? this.state.searchUf.length : 0;
        let firstPiece = null;
        let secondPiece = item.eduf_nm_uf;
        if (this.state.searchUf) {
          firstPiece = item.eduf_nm_uf.substr(0, sizeSearch);
          secondPiece = item.eduf_nm_uf.substr(sizeSearch);
        }
        return /*#__PURE__*/React.createElement("li", {
          key: 'cat_' + item.eduf_cd_uf,
          className: "list-group-item d-flex ",
          onClick: () => this.setUf(item)
        }, /*#__PURE__*/React.createElement("u", null, firstPiece), secondPiece);
      }.bind(this));
    }
    let municipios = null;
    if (this.state.listMunicipio) {
      municipios = this.state.listMunicipio.map(function (item, index) {
        /*let sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
        let firstPiece = null;
        let secondPiece = item.edmu_nm_municipio;
          if (this.state.searchMunicipio) {
            firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
            secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
        }*/
        return /*#__PURE__*/React.createElement("li", {
          key: 'cat_' + item.edmu_cd_municipio,
          className: "list-group-item d-flex ",
          onClick: () => this.setMunicipio(item)
        }, item.edmu_nm_municipio + ' - ' + item.eduf_sg_uf);
      }.bind(this));
    }
    let cnae = null;
    if (this.state.listCnae) {
      cnae = this.state.listCnae.map(function (item, index) {
        let sizeSearch = this.state.searchCnae ? this.state.searchCnae.length : 0;
        let firstPiece = null;
        //let secondPiece = item.tx_atividade_economica;
        let secondPiece = item.tx_nome_classe_atividade_economica;
        if (this.state.searchCnae) {
          //firstPiece = item.tx_atividade_economica.substr(0, sizeSearch);
          firstPiece = item.tx_nome_classe_atividade_economica.substr(0, sizeSearch);
          //secondPiece = item.tx_atividade_economica.substr(sizeSearch);
          secondPiece = item.tx_nome_classe_atividade_economica.substr(sizeSearch);
        }
        return /*#__PURE__*/React.createElement("li", {
          key: 'cat_' + item.cd_classe_atividade_economica,
          className: "list-group-item d-flex ",
          onClick: () => this.setCnae(item)
        }, /*#__PURE__*/React.createElement("u", null, firstPiece), secondPiece);
      }.bind(this));
    }
    let objetivos = null;
    if (this.state.dataObjetivos) {
      objetivos = this.state.dataObjetivos.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_objetivo_projeto,
          key: "cert_" + item.cd_objetivo_projeto
        }, item.tx_nome_objetivo_projeto);
      });
    }
    let objetivosMetas = null;
    if (this.state.dataObjetivosMetas) {
      objetivosMetas = this.state.dataObjetivosMetas.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_meta_projeto,
          key: "meta_osc_" + item.cd_meta_projeto
        }, item.tx_nome_meta_projeto);
      });
    }
    let objetivosMetasProjetos = null;
    if (this.state.dataObjetivosMetasProjetos) {
      objetivosMetasProjetos = this.state.dataObjetivosMetasProjetos.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_meta_projeto,
          key: "meta_projeto_" + item.cd_meta_projeto
        }, item.tx_nome_meta_projeto);
      });
    }

    ////////////////////////////////////////////////////
    let conselhos = null;
    if (this.state.dataConselhos) {
      conselhos = this.state.dataConselhos.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_conselho,
          key: "conselho_" + item.cd_conselho
        }, item.tx_nome_conselho);
      });
    }
    let participacoes = null;
    if (this.state.dataParticipacoes) {
      participacoes = this.state.dataParticipacoes.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_tipo_participacao,
          key: "articipacao_" + item.cd_tipo_participacao
        }, item.tx_nome_tipo_participacao);
      });
    }
    let conferencias = null;
    if (this.state.dataConferencias) {
      conferencias = this.state.dataConferencias.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_conferencia,
          key: "conferencia_" + item.cd_conferencia
        }, item.tx_nome_conferencia);
      });
    }
    let formaParticipacoes = null;
    if (this.state.dataFormaParticipacoes) {
      formaParticipacoes = this.state.dataFormaParticipacoes.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_forma_participacao_conferencia,
          key: "forma_" + item.cd_forma_participacao_conferencia
        }, item.tx_nome_forma_participacao_conferencia);
      });
    }
    ////////////////////////////////////////////////////
    //////////////////////Projetos//////////////////////////////
    let listFonteRecursosProjeto = null;
    if (this.state.dataFonteRecursosProjeto) {
      listFonteRecursosProjeto = this.state.dataFonteRecursosProjeto.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_origem_fonte_recursos_projeto,
          key: "forma_" + item.cd_origem_fonte_recursos_projeto
        }, item.tx_nome_origem_fonte_recursos_projeto);
      });
    }
    let listStatusProjeto = null;
    if (this.state.dataStatusProjeto) {
      listStatusProjeto = this.state.dataStatusProjeto.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_status_projeto,
          key: "forma_" + item.cd_status_projeto
        }, item.tx_nome_status_projeto);
      });
    }
    let listZonaAtuacaoProjeto = null;
    if (this.state.dataZonaAtuacaoProjeto) {
      listZonaAtuacaoProjeto = this.state.dataZonaAtuacaoProjeto.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_zona_atuacao_projeto,
          key: "forma_" + item.cd_zona_atuacao_projeto
        }, item.tx_nome_zona_atuacao);
      });
    }
    let listAbrangenciaProjeto = null;
    if (this.state.dataAbrangenciaProjeto) {
      listAbrangenciaProjeto = this.state.dataAbrangenciaProjeto.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_abrangencia_projeto,
          key: "forma_" + item.cd_abrangencia_projeto
        }, item.tx_nome_abrangencia_projeto);
      });
    }
    let situacaoCadastral = null;
    if (this.state.dataSituacaoCadastral) {
      console.log('Renderizando situação cadastral:', this.state.dataSituacaoCadastral);
      situacaoCadastral = this.state.dataSituacaoCadastral.map(function (item) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_situacao_cadastral,
          key: "situacao_" + item.cd_situacao_cadastral
        }, item.tx_nome_situacao_cadastral);
      });
    } else {
      console.log('dataSituacaoCadastral não carregado ainda');
    }
    ////////////////////////////////////////////////////

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "modal fade",
      id: "modalExportar",
      tabIndex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, "Exportar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center",
      style: {
        display: Object.keys(this.state.json.avancado).length !== 0 ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "img/load.gif",
      alt: "Load"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h3", {
      className: "text-center"
    }, this.state.textoProcessingExportacao)), /*#__PURE__*/React.createElement("div", {
      className: "text-center",
      style: {
        display: Object.keys(this.state.json.avancado).length === 0 ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-center"
    }, "Informe dados para filtro!"))))))))), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => {
        console.log(this.state.json);
        console.log(JSON.stringify(this.state.json));
      },
      style: {
        cursor: 'pointer'
      }
    }, ".")), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "accordion",
      id: "accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse1",
      "aria-expanded": "true",
      "aria-controls": "collapse1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Dados Gerais", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse1",
      className: "collapse show ",
      "aria-labelledby": "heading1",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_razao_social_osc",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Nome da OSC (Raz\xE3o social)"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Busque uma regi\xE3o",
      name: "tx_nome_regiao",
      style: {
        display: this.state.filters.regiao ? 'none' : ''
      },
      onClick: this.clickSearchRegiao,
      onChange: this.handleSearchRegiao
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "tx_nome_regiao2",
      style: {
        display: this.state.filters.regiao ? '' : 'none'
      },
      readOnly: this.state.filters.regiao,
      defaultValue: this.state.filters.regiao ? this.state.filters.regiao.edre_nm_regiao : ''
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.regiao ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search",
      style: {
        top: '-28px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.regiao ? '' : 'none'
      },
      onClick: this.removeRegiao
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times",
      style: {
        top: '-28px',
        cursor: 'pointer'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: (this.state.searchRegiao || this.state.listRegiao) && !this.state.filters.regiao ? '' : 'none'
      }
    }, regioes)), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_fantasia_osc",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Nome Fantasia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Busque um estado",
      name: "tx_nome_uf",
      style: {
        display: this.state.filters.uf ? 'none' : ''
      },
      onClick: this.clickSearchUf,
      onChange: this.handleSearchUf
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "tx_nome_uf2",
      style: {
        display: this.state.filters.uf ? '' : 'none'
      },
      readOnly: this.state.filters.uf,
      defaultValue: this.state.filters.uf ? this.state.filters.uf.eduf_nm_uf : ''
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.uf ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search",
      style: {
        top: '-28px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.uf ? '' : 'none'
      },
      onClick: this.removeUf
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times",
      style: {
        top: '-28px',
        cursor: 'pointer'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: (this.state.searchUf || this.state.listUf) && !this.state.filters.uf ? '' : 'none'
      }
    }, ufs)), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "cd_identificador_osc",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "CNPJ"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_situacao_imovel_osc",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Situa\xE7\xE3o do Im\xF3vel"), /*#__PURE__*/React.createElement("option", {
      value: "1"
    }, "Pr\xF3prio"), /*#__PURE__*/React.createElement("option", {
      value: "2"
    }, "Alugado"), /*#__PURE__*/React.createElement("option", {
      value: "3"
    }, "Cedido"), /*#__PURE__*/React.createElement("option", {
      value: "4"
    }, "Comodato")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Ano de Funda\xE7\xE3o",
      min: "1900",
      max: ano,
      step: "1",
      defaultValueStart: "1900",
      defaultValueEnd: ano,
      setValue: this.setAnoFundacao
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Busque um Munic\xEDpio",
      name: "tx_nome_municipio",
      style: {
        display: this.state.filters.municipio ? 'none' : ''
      },
      onClick: this.clickSearchMunicipio,
      onChange: this.handleSearchMunicipio
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "tx_nome_municipio2",
      style: {
        display: this.state.filters.municipio ? '' : 'none'
      },
      readOnly: this.state.filters.municipio,
      defaultValue: this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : ''
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.municipio ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search",
      style: {
        top: '-28px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.municipio ? '' : 'none'
      },
      onClick: this.removeMunicipio
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times",
      style: {
        top: '-28px',
        cursor: 'pointer'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: (this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio ? '' : 'none'
      }
    }, municipios)), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_situacao_cadastral",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Situa\xE7\xE3o Cadastral"), situacaoCadastral), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Natureza Jur\xEDdica:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "naturezaJuridica_associacaoPrivada",
      required: true,
      onChange: this.handleCheckChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "naturezaJuridica_associacaoPrivada"
    }, "Associa\xE7\xE3o Privada")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "naturezaJuridica_fundacaoPrivada",
      required: true,
      onChange: this.handleCheckChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "naturezaJuridica_fundacaoPrivada"
    }, "Funda\xE7\xE3o Privada")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "naturezaJuridica_organizacaoReligiosa",
      required: true,
      onChange: this.handleCheckChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "naturezaJuridica_organizacaoReligiosa"
    }, "Organiza\xE7\xE3o Religiosa")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "naturezaJuridica_organizacaoSocial",
      required: true,
      onChange: this.handleCheckChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "naturezaJuridica_organizacaoSocial"
    }, "Organiza\xE7\xE3o Social")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "naturezaJuridica_outra",
      required: true,
      onChange: this.handleCheckChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "naturezaJuridica_outra"
    }, "N\xE3o informado")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_objetivo_osc",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "Objetivos do Desenvolvimento Sustent\xE1vel - ODS"), objetivos), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_meta_osc",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "Metas Relacionadas ao ODS"), objetivosMetas), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse2",
      "aria-expanded": "true",
      "aria-controls": "collapse2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "\xC1reas e Sub\xE1reas de Atua\xE7\xE3o ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse2",
      className: "collapse",
      "aria-labelledby": "heading2",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Busque uma Atividade Econ\xF4mica",
      name: "tx_atividade_economica",
      style: {
        display: this.state.filters.cnae ? 'none' : ''
      },
      onClick: this.clickSearchCnae,
      onChange: this.handleSearchCnae
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      name: "tx_atividade_economica2",
      style: {
        display: this.state.filters.cnae ? '' : 'none'
      },
      readOnly: this.state.filters.cnae,
      defaultValue: this.state.filters.cnae ? this.state.filters.cnae.tx_nome_classe_atividade_economica : ''
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.cnae ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search",
      style: {
        top: '-28px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.filters.cnae ? '' : 'none'
      },
      onClick: this.removeCnae
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times",
      style: {
        top: '-28px',
        cursor: 'pointer'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: (this.state.searchCnae || this.state.listCnae) && !this.state.filters.cnae ? '' : 'none'
      }
    }, cnae)), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("strong", null, "\xC1rea de Atua\xE7\xE3o"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, areaAtuacao, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("strong", null, "Sub\xE1rea de Atua\xE7\xE3o"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "card-columns"
    }, subAreaAtuacao)))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse3",
      "aria-expanded": "true",
      "aria-controls": "collapse3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Titula\xE7\xF5es e Certifica\xE7\xF5es ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse3",
      className: "collapse",
      "aria-labelledby": "heading3",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, certificados))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse4",
      "aria-expanded": "true",
      "aria-controls": "collapse4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Rela\xE7\xF5es de Trabalho e Governan\xE7a ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse4",
      className: "collapse",
      "aria-labelledby": "heading4",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_dirigente",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Nome do Dirigente"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_cargo_dirigente",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Cargo do Dirigente"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_conselheiro",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Nome do Membro do Conselho Fiscal"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Total de trabalhadores",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setTotalTrabalhadores
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Total de empregados",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setTotalEmpregados
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Trabalhadores com defici\xEAncia",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setTrabalhadoresDeficiencia
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Trabalhadores volunt\xE1rios",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setTrabalhadoresVoluntarios
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        display: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse5",
      "aria-expanded": "true",
      "aria-controls": "collapse5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Espa\xE7os de Participa\xE7\xE3o Social ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse5",
      className: "collapse",
      "aria-labelledby": "heading5",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_conselho",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0",
      selected: true
    }, "Nome do Conselho"), conselhos), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "date",
      name: "dt_data_inicio_conselho",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_inicio_conselho"
    }, "Data de In\xEDcio de Vig\xEAncia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_representante_conselho",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_representante_conselho"
    }, "Nome de representante conselho"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_tipo_participacaoSelectBoxItText",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Titularidade"), /*#__PURE__*/React.createElement("option", {
      value: "1"
    }, "Titular"), /*#__PURE__*/React.createElement("option", {
      value: "2"
    }, "Suplente"), /*#__PURE__*/React.createElement("option", {
      value: "3"
    }, "Convidado"), participacoes), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "date",
      name: "dt_data_fim_conselho",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_fim_conselho"
    }, "Data de Fim de Vig\xEAncia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_conferencia",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0",
      selected: true
    }, "Nome da Confer\xEAncia"), conferencias), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_forma_participacao_conferencia",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0",
      selected: true
    }, "Forma de participacao na Confer\u1EBDncia"), formaParticipacoes), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Ano de Realiza\xE7\xE3o da Confer\xEAncia",
      min: "1900",
      max: ano,
      step: "1",
      defaultValueStart: "1900",
      defaultValueEnd: ano,
      setValue: this.setAnoRealizacao
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse6",
      "aria-expanded": "true",
      "aria-controls": "collapse6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Projetos ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse6",
      className: "collapse",
      "aria-labelledby": "heading6",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_projeto",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_projeto"
    }, "Nome do Projeto"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_status_projeto",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Situa\xE7\xE3o do projeto"), listStatusProjeto), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "date",
      name: "dt_data_inicio_projeto",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_inicio_projeto"
    }, "Data de in\xEDcio"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      type: "date",
      name: "dt_data_fim_projeto",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_fim_projeto"
    }, "Data de fim"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_abrangencia_projeto",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Abrang\xEAncia de atua\xE7\xE3o"), listAbrangenciaProjeto), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_zona_atuacao_projeto",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Zona de Atua\xE7\xE3o"), listZonaAtuacaoProjeto), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_origem_fonte_recursos_projeto",
      defaultValue: 0,
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Fontes de Recursos"), listFonteRecursosProjeto), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_financiador",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_financiador"
    }, "Financiadores do Projeto"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_regiao_localizacao_projeto",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_regiao_localizacao_projeto"
    }, "Local de Execu\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_publico_beneficiado",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_publico_beneficiado"
    }, "P\xFAblico Beneficiado"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_osc_parceira_projeto",
      onChange: this.handleInputChange,
      placeholder: " "
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_osc_parceira_projeto"
    }, "OSC Parceiras"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Total de Benefici\xE1rios",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setTotalBeneficiarios
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_objetivo_projeto",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "Objetivos do Desenvolvimento Sustent\xE1vel - ODS"), objetivos), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Valor total",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setValorTotal
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-9"
    }, /*#__PURE__*/React.createElement("select", {
      className: "custom-select",
      name: "cd_meta_projeto",
      onChange: this.handleInputChange
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "Metas Relacionadas ao ODS"), objetivosMetasProjetos), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Valor Recebido",
      min: "0",
      max: "1000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000",
      setValue: this.setValorRecebido
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-7"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse7",
      "aria-expanded": "true",
      "aria-controls": "collapse7"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Fontes de Recursos ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse7",
      className: "collapse",
      "aria-labelledby": "heading7",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h4", null, "Fontes de recursos anuais da OSC"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Ano",
      min: "1900",
      max: ano,
      step: "1",
      defaultValueStart: "1900",
      defaultValueEnd: ano,
      setValue: this.setAnoFonteRecurso
    }))), /*#__PURE__*/React.createElement("h4", null, "Recursos pro\u0301prios"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Rendimentos financeiros de reservas ou contas correntes pr\xF3prias",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setRendimentosFinanceirosReservas
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Rendimentos de fundos patrimoniais",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setRendimentosFundosPatrimoniais
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Mensalidades ou contribui\xE7\xF5es de associados",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setMensalidadesContribuicoes
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Venda de bens e direitos",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setVendaBensDireitos
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Pr\xEAmios recebidos",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setPremiosRecebidos
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Venda de produtos",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setVendaProdutos
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Presta\xE7\xE3o de servi\xE7os",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setPrestacaoServicos
    }))), /*#__PURE__*/React.createElement("h4", null, "Recursos pu\u0301blicos"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Empresas p\xFAblicas ou sociedades de economia mista",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setEmpresasPublicasSociedadesEconomia
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Acordo com organismos multilaterais",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setAcordoOrganismosMultilaterais
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Acordo com governos estrangeiros",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setAcordoGovernosEstrangeiros
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com o governo estadual",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaGovernoEstadual
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com o governo municipal",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaGovernoMunicipal
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Transfer\xEAncias federais recebidas pela OSC",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setTransferenciasFederaisRecebidas
    }))), /*#__PURE__*/React.createElement("h4", null, "Recursos privados"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com OSCs brasileiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaBrasileiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com OSCs estrangeiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaEstrangeiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com organiza\xE7\xF5es religiosas brasileiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaOrganizacoesReligiosasBrasileiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Parceria com organiza\xE7\xF5es religiosas estrangeiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setParceriaOrganizacoesReligiosasEstrangeiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Empresas privadas brasileiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setEmpresasPrivadasBrasileiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Empresas estrangeiras",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setEmpresasEstrangeiras
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Doa\xE7\xF5es de pessoa jur\xEDdica",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setDoacoesPessoaJuridica
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Doa\xE7\xF5es de pessoa f\xEDsica",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setDoacoesPessoaFisica
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (com NF)",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setDoacoesFormaProdutosServicos
    }))), /*#__PURE__*/React.createElement("h4", null, "Recursos na\u0303o financeiros"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Voluntariado",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setVoluntariado
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Isen\xE7\xF5es",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setIsencoes
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Imunidades",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setImunidades
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Bens recebidos em direito de uso",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setBensRecebidosDireito
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement(Range, {
      title: "Doa\xE7\xF5es recebidas na forma de produtos e servi\xE7os (sem NF)",
      min: "0",
      max: "1000000",
      step: "1",
      defaultValueStart: "0",
      defaultValueEnd: "1000000",
      setValue: this.setDoacoesRecebidasFormaProdutosServicos
    })))))))), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: "item-9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-0",
      "data-toggle": "collapse",
      "data-target": "#collapse9",
      "aria-expanded": "true",
      "aria-controls": "collapse9"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon mn-accordion-icon-p"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-file-alt"
    })), "Indicadores Sociais ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-info-circle",
      title: "Vari\xE1veis adicionais para exporta\xE7\xE3o"
    }), " ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-down float-right"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "collapse9",
      className: "collapse",
      "aria-labelledby": "heading9",
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: this.clickIdh
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "IDH_Municipal",
      required: true,
      onChange: this.handleCheckChangeIDH
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "IDH_Municipal"
    }, "IDH Municipal")), /*#__PURE__*/React.createElement("div", {
      id: "divIdh",
      style: {
        display: this.state.active === false ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, " Faixas de IDHM:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "baixo",
      required: true,
      onChange: this.handleCheckChangeIDH
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "baixo"
    }, "Baixo (abaixo de 0,600)")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "medio",
      required: true,
      onChange: this.handleCheckChangeIDH
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "medio"
    }, "M\xE9dio (entre 0,600 e 0,699)")), /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox "
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "alto",
      required: true,
      onChange: this.handleCheckChangeIDH
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "alto"
    }, "Alto (0,700 ou mais)"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, indicadores))))), /*#__PURE__*/React.createElement("div", {
      className: "clear-float"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: "text-danger"
    }, this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), "Processando")), /*#__PURE__*/React.createElement("form", {
      id: "frmMapa",
      name: "frmMapa",
      action: "mapa-busca-avancada",
      method: "POST",
      onKeypress: this.handleKeyPress
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "json",
      name: "json",
      value: JSON.stringify(this.state.json)
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: {
        display: this.state.button ? 'block' : 'none',
        float: 'left'
      },
      className: "btn btn-primary"
    }, "Pesquisar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      style: {
        display: this.state.button ? 'block' : 'none',
        float: 'left',
        marginLeft: '20px'
      },
      className: "btn btn-primary",
      onClick: this.exportar
    }, "Exportar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      style: {
        display: this.state.button ? 'block' : 'none',
        float: 'left',
        marginLeft: '20px'
      },
      className: "btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#modalExportar2"
    }, "Dicion\xE1rio de dados"), /*#__PURE__*/React.createElement("div", {
      style: {
        clear: 'both'
      }
    }, /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "modal  ",
      id: "modalExportar2",
      tabIndex: "-1",
      "aria-labelledby": "exampleModalLabel2",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      id: "exampleModalLabel2"
    }, "Dicion\xE1rio de dados"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
      class: "table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Vari\xE1vel"), /*#__PURE__*/React.createElement("th", null, "Descri\xE7\xE3o"), /*#__PURE__*/React.createElement("th", null, "Fontes dos Dados"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "id_osc"), /*#__PURE__*/React.createElement("td", null, "Identificador da OSC"), /*#__PURE__*/React.createElement("td", null, "IPEA/MOSC")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "matriz"), /*#__PURE__*/React.createElement("td", null, "Identifica se a OSC \xE9 matriz ou filial"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_razao_social"), /*#__PURE__*/React.createElement("td", null, "Raz\xE3o Social OSC"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_natureza_juridica"), /*#__PURE__*/React.createElement("td", null, "Natureza jur\xEDdica"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_classe_atividade_economica"), /*#__PURE__*/React.createElement("td", null, "Atividade Econ\xF4mica da OSC (CNAE)"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_municipio"), /*#__PURE__*/React.createElement("td", null, "Nome do munic\xEDpio da OSC"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_estado"), /*#__PURE__*/React.createElement("td", null, "Nome da Unidade Federativa da OSC"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "tx_endereco"), /*#__PURE__*/React.createElement("td", null, "Endere\xE7o da OSC"), /*#__PURE__*/React.createElement("td", null, "CNPJ/RFB/MF")))))))))))));
  }
}