class FormEditProjeto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        dt_inicio_projeto: '',
        dt_fim_projeto: '',
        cd_uf: ''
      },
      button: true,
      btnContinue: false,
      loading: false,
      requireds: {},
      showMsg: false,
      msg: '',
      projetos: [],
      cd_projeto: {
        1: 'Utilidade Pública Municipal',
        2: 'Utilidade Pública Estadual'
      },
      action: '',
      //new | edit
      editId: this.props.id,
      objetivos: null,
      subobjetivos: null,
      titleMeta: null,
      titleObjetivo: "",
      buttonObjetivos: 0,
      active: false,
      financiador_projeto: [],
      publico_projeto: [],
      parceira_projeto: [],
      localizacao_projeto: [],
      showForm: false,
      actionForm: '',
      datalistParcerias: [],
      datalistFinanciadores: [],
      datalistPublicos: [],
      datalistLocalizacoes: [],
      removeItem: null,
      showAdd: false,
      saveLoading: '',
      dataChkboxMetas: [],
      checkedRecurso: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.edit = this.edit.bind(this);
    this.validate = this.validate.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
    this.checkMetas = this.checkMetas.bind(this);
    this.listArea = this.listArea.bind(this);
    this.listParcerias = this.listParcerias.bind(this);
    this.listObjetivos = this.listObjetivos.bind(this);
    this.listChkboxMetas = this.listChkboxMetas.bind(this);
    this.listFinanciadores = this.listFinanciadores.bind(this);
    this.listPublicos = this.listPublicos.bind(this);
    this.listLocalizacoes = this.listLocalizacoes.bind(this);
    this.listRecursos = this.listRecursos.bind(this);
    this.listTipoParcerias = this.listTipoParcerias.bind(this);
    this.listStatusProjeto = this.listStatusProjeto.bind(this);
    this.clickFontRecurso = this.clickFontRecurso.bind(this);
    this.showHideForm = this.showHideForm.bind(this);
    this.remove = this.remove.bind(this);
    this.removeList = this.removeList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.addList = this.addList.bind(this);
    this.checkParceria = this.checkParceria.bind(this);
    this.checkRecurso = this.checkRecurso.bind(this);
  }
  componentDidMount() {
    this.edit();
    this.listArea();
    this.listParcerias();
    this.listFinanciadores();
    this.listPublicos();
    this.listLocalizacoes();
    this.listObjetivos();
    this.listChkboxMetas();
    this.listRecursos();
    this.listTipoParcerias();
    this.listStatusProjeto();
  }
  componentWillReceiveProps(props) {
    let lastEditId = this.state.editId;
    if (this.state.action != props.action || this.state.editId != props.id) {
      this.setState({
        action: props.action,
        editId: props.id
      }, function () {
        if (lastEditId != props.id) {
          //this.props.showHideForm(this.state.action);
          this.edit();
          this.listParcerias();
          this.listPublicos();
          this.listLocalizacoes();
          this.listFinanciadores();
        }
        if (this.state.action == 'new') {
          this.cleanForm();
        }
      });
    }
  }
  listRecursos() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/projeto/recursos/' + this.state.editId,
      data: {},
      cache: false,
      success: function (data) {
        let id_recurso_publico = 0;
        let id_recurso_privado = 0;
        let id_recurso_proprio = 0;
        let id_recurso_nao_financeiro = 0;
        let ft_recursos_publico = false;
        let ft_recursos_privado = false;
        let ft_recursos_proprio = false;
        let ft_recursos_nao_financeiro = false;
        data.find(function (item) {
          if (item.cd_origem_fonte_recursos_projeto === 1) {
            id_recurso_publico = item.id_fonte_recursos_projeto;
            ft_recursos_publico = item.cd_origem_fonte_recursos_projeto === 1 ? true : false;
          }
          if (item.cd_origem_fonte_recursos_projeto === 2) {
            id_recurso_privado = item.id_fonte_recursos_projeto;
            ft_recursos_privado = item.cd_origem_fonte_recursos_projeto === 2 ? true : false;
          }
          if (item.cd_origem_fonte_recursos_projeto === 4) {
            id_recurso_proprio = item.id_fonte_recursos_projeto;
            ft_recursos_proprio = item.cd_origem_fonte_recursos_projeto === 4 ? true : false;
          }
          if (item.cd_origem_fonte_recursos_projeto === 3) {
            id_recurso_nao_financeiro = item.id_fonte_recursos_projeto;
            ft_recursos_nao_financeiro = item.cd_origem_fonte_recursos_projeto === 3 ? true : false;
          }
        });
        this.setState({
          id_recurso_publico: id_recurso_publico,
          id_recurso_privado: id_recurso_privado,
          id_recurso_proprio: id_recurso_proprio,
          id_recurso_nao_financeiro: id_recurso_nao_financeiro,
          ft_recursos_publico: ft_recursos_publico,
          ft_recursos_privado: ft_recursos_privado,
          ft_recursos_proprio: ft_recursos_proprio,
          ft_recursos_nao_financeiro: ft_recursos_nao_financeiro
        }, function () {
          //this.props.showHideForm();
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  listStatusProjeto() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'status_projeto',
      success: function (data) {
        this.setState({
          loading: false,
          datalistStatusProjeto: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listTipoParcerias() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/projeto/tipo_parcerias/' + this.state.editId,
      data: {},
      cache: false,
      success: function (data) {
        let id_tipo_parceria_cooperacao = 0;
        let id_tipo_parceria_fomento = 0;
        let id_tipo_parceria_colaboracao = 0;
        let id_tipo_parceria_parceria = 0;
        let id_tipo_parceria_gestao = 0;
        let id_tipo_parceria_convenio = 0;
        let id_tipo_parceria_outro = 0;
        let tp_cooperacao_tecnica = false;
        let tp_termo_fomento = false;
        let tp_termo_colaboracao = false;
        let tp_termo_parceria = false;
        let tp_contrato_gestao = false;
        let tp_convenio = false;
        let tp_outro = false;
        data.find(function (item) {
          if (item.cd_tipo_parceria_projeto === 5) {
            id_tipo_parceria_cooperacao = item.id_tipo_parceria_projeto;
            tp_cooperacao_tecnica = item.cd_tipo_parceria_projeto === 5 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 0) {
            id_tipo_parceria_fomento = item.id_tipo_parceria_projeto;
            tp_termo_fomento = item.cd_tipo_parceria_projeto === 0 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 1) {
            id_tipo_parceria_colaboracao = item.id_tipo_parceria_projeto;
            tp_termo_colaboracao = item.cd_tipo_parceria_projeto === 1 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 2) {
            id_tipo_parceria_parceria = item.id_tipo_parceria_projeto;
            tp_termo_parceria = item.cd_tipo_parceria_projeto === 2 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 3) {
            id_tipo_parceria_gestao = item.id_tipo_parceria_projeto;
            tp_contrato_gestao = item.cd_tipo_parceria_projeto === 3 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 4) {
            id_tipo_parceria_convenio = item.id_tipo_parceria_projeto;
            tp_convenio = item.cd_tipo_parceria_projeto === 4 ? true : false;
          }
          if (item.cd_tipo_parceria_projeto === 6) {
            id_tipo_parceria_outro = item.id_tipo_parceria_projeto;
            tp_outro = item.cd_tipo_parceria_projeto === 6 ? true : false;
          }
        });
        this.setState({
          id_tipo_parceria_cooperacao: id_tipo_parceria_cooperacao,
          id_tipo_parceria_fomento: id_tipo_parceria_fomento,
          id_tipo_parceria_colaboracao: id_tipo_parceria_colaboracao,
          id_tipo_parceria_parceria: id_tipo_parceria_parceria,
          id_tipo_parceria_gestao: id_tipo_parceria_gestao,
          id_tipo_parceria_convenio: id_tipo_parceria_convenio,
          id_tipo_parceria_outro: id_tipo_parceria_outro,
          tp_cooperacao_tecnica: tp_cooperacao_tecnica,
          tp_termo_fomento: tp_termo_fomento,
          tp_termo_colaboracao: tp_termo_colaboracao,
          tp_termo_parceria: tp_termo_parceria,
          tp_contrato_gestao: tp_contrato_gestao,
          tp_convenio: tp_convenio,
          tp_outro: tp_outro
        }, function () {
          //this.props.showHideForm();
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  edit() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/projeto/' + this.state.editId,
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          form: data
        }, function () {
          //this.props.showHideForm();
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }

  /*formatValue = (value) => {
        // Remove caracteres inválidos (deixa apenas números, pontos e vírgulas)
      value = value.replace(/[^0-9.,]/g, '');
        // Converte para o formato correto
      value = value.replace(/\./g, ''); // Remove pontos existentes
      value = value.replace(/,/g, '.'); // Substitui vírgula por ponto para valores decimais
        // Aplica a máscara brasileira
      let parts = value.split('.');
      let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formata milhar com ponto
      let decimalPart = parts[1] ? ',' + parts[1].substring(0, 2) : '';
        this.setState({
          form: {
              ...this.state.form,
              nr_valor_total_projeto: integerPart + decimalPart
          }
      });
  };*/

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let form = this.state.form;
    form[name] = value;
    this.setState({
      form: form
    });
  }
  cleanForm() {
    let form = this.state.form;
    for (let i in form) {
      form[i] = '';
    }
    this.setState({
      form: form
    });
  }
  validate() {
    let valid = true;
    let requireds = this.state.requireds;
    let form = this.state.form;
    for (let index in requireds) {
      if (!form[index] || form[index] == '') {
        requireds[index] = false;
        valid = false;
      } else {
        requireds[index] = true;
      }
    }
    this.setState({
      requireds: requireds
    });
    return valid;
  }
  register(e) {
    e.preventDefault();
    if (!this.validate()) {
      return;
    }
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: 'PUT',
        url: getBaseUrl2 + 'osc/projeto/' + this.state.editId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          tx_nome_projeto: this.state.form.tx_nome_projeto,
          cd_status_projeto: this.state.form.cd_status_projeto,
          dt_data_inicio_projeto: this.state.form.dt_data_inicio_projeto,
          dt_data_fim_projeto: this.state.form.dt_data_fim_projeto,
          tx_link_projeto: this.state.form.tx_link_projeto,
          nr_total_beneficiarios: this.state.form.nr_total_beneficiarios,
          nr_valor_total_projeto: clearMoeda(this.state.form.nr_valor_total_projeto),
          nr_valor_captado_projeto: clearMoeda(this.state.form.nr_valor_captado_projeto),
          tx_descricao_projeto: this.state.form.tx_descricao_projeto,
          tx_metodologia_monitoramento: this.state.form.tx_metodologia_monitoramento,
          cd_abrangencia_projeto: this.state.form.cd_abrangencia_projeto,
          cd_zona_atuacao_projeto: this.state.form.cd_zona_atuacao_projeto
        },
        cache: false,
        success: function (data) {
          this.props.list();

          //this.cleanForm();
          //this.props.closeForm();

          this.setState({
            projetos: data.projetos,
            loading: false
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          this.setState({
            loading: false,
            button: true
          });
        }.bind(this)
      });
    });
  }
  listArea() {
    this.setState({
      button: false
    });
    $.ajax({
      method: 'GET',
      cache: false,
      //url: getBaseUrl+'menu/osc/objetivo_projeto',
      url: getBaseUrl2 + 'objetivos',
      success: function (data) {
        data.find(function (item) {
          item.checked = false;
          item.metas = null;
        });
        this.setState({
          loading: false,
          objetivos: data,
          button: true
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listParcerias() {
    console.log('RAG::::::', this.state.editId);
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/parceiras/' + this.state.editId,
      success: function (data) {
        /*data.find(function(item){
            item.checked = false;
            item.metas = null;
        });*/

        this.setState({
          loading: false,
          datalistParcerias: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listObjetivos() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/objetivos/' + this.state.editId,
      success: function (data) {
        let objetosSelected = [];
        console.log('-----data', data);
        data.find(function (item) {
          objetosSelected.push(item.meta_projeto.cd_objetivo_projeto);
        });
        const arrUnique = [...new Set(objetosSelected)];
        this.setState({
          loading: false,
          datalistObjetivos: arrUnique
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listFinanciadores() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/financiadores/' + this.state.editId,
      success: function (data) {
        /*data.find(function(item){
            item.checked = false;
            item.metas = null;
        });*/

        this.setState({
          loading: false,
          datalistFinanciadores: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listPublicos() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/publicos/' + this.state.editId,
      success: function (data) {
        /*data.find(function(item){
            item.checked = false;
            item.metas = null;
        });*/

        this.setState({
          loading: false,
          datalistPublicos: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listLocalizacoes() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/localizacoes/' + this.state.editId,
      success: function (data) {
        /*data.find(function(item){
            item.checked = false;
            item.metas = null;
        });*/

        this.setState({
          loading: false,
          datalistLocalizacoes: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  callSubobjetivos(id) {
    this.setState({
      button: false
    });
    $.ajax({
      method: 'GET',
      cache: false,
      //url: getBaseUrl+'componente/metas_objetivo_projeto/'+id,
      url: getBaseUrl2 + 'objetivos/metas/' + id,
      success: function (data) {
        let objetivos = this.state.objetivos;
        let titleObjetivo = this.state.objetivos[id - 1].tx_nome_objetivo_projeto;
        data.find(function (item) {
          item.display = true;
          item.checked = false;
        });
        objetivos.find(function (item) {
          if (item.metas) {
            item.metas.find(function (itemMeta) {
              itemMeta.display = false;
            });
            if (item.cd_objetivo_projeto === id) {
              item.metas.find(function (itemMeta) {
                itemMeta.display = true;
              });
            }
          }
          if (item.cd_objetivo_projeto === id && !item.metas) {
            item.metas = data;
          }
        });
        this.setState({
          loading: false,
          objetivos: objetivos,
          id_area: id,
          buttonObjetivos: id,
          titleMeta: true,
          titleObjetivo: titleObjetivo
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  listChkboxMetas() {
    $.ajax({
      method: 'GET',
      cache: false,
      url: getBaseUrl2 + 'osc/projeto/objetivos/' + this.state.editId,
      success: function (data) {
        data.find(function (item) {
          item.checked = true;
          item.metas = null;
        });
        this.setState({
          dataChkboxMetas: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  checkMetas(cd_objetivo, cd_meta, delId, checkedMeta) {
    let objetivos = this.state.objetivos;
    objetivos.find(function (item) {
      if (item.cd_objetivo_projeto === cd_objetivo) {
        item.metas.find(function (itemMeta) {
          if (itemMeta.cd_meta_projeto === cd_meta) {
            itemMeta.checked = true;
          }
        });
      }
    });
    if (checkedMeta === true) {
      $.ajax({
        method: 'POST',
        url: getBaseUrl2 + 'osc/projeto/objetivo',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          //id_objetivo_projeto: cd_meta,
          cd_meta_projeto: cd_meta,
          id_projeto: this.state.editId,
          ft_objetivo_projeto: 'Representante de OSC'
        },
        cache: false,
        success: function (data) {
          this.listObjetivos();
          this.listChkboxMetas();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    } else {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'osc/projeto/objetivo/' + delId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {},
        cache: false,
        success: function (data) {
          this.listObjetivos();
          this.listChkboxMetas();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    }
    this.setState({
      objetivos: objetivos
    });
  }
  checkRecurso(id_recurso, checkedRecurso, id) {
    checkedRecurso = !checkedRecurso;
    if (checkedRecurso === true) {
      $.ajax({
        method: 'POST',
        url: getBaseUrl2 + 'osc/projeto/recurso',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          id_projeto: this.state.editId,
          //cd_fonte_recursos_projeto: id_recurso,
          ft_fonte_recursos_projeto: 'Representante de OSC',
          cd_origem_fonte_recursos_projeto: id_recurso,
          ft_orgao_concedente: 'Representante de OSC'
        },
        cache: false,
        success: function (data) {
          this.listRecursos();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    } else {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'osc/projeto/recurso/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {},
        cache: false,
        success: function (data) {
          this.listRecursos();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    }
  }
  checkParceria(id_tipo, checkedParceria, id) {
    checkedParceria = !checkedParceria;
    if (checkedParceria === true) {
      $.ajax({
        method: 'POST',
        url: getBaseUrl2 + 'osc/projeto/tipo_parceria',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          cd_tipo_parceria_projeto: id_tipo,
          id_projeto: this.state.editId,
          ft_tipo_parceria_projeto: 'Representante de OSC',
          id_fonte_recursos_projeto: this.state.id_recurso_publico
        },
        cache: false,
        success: function (data) {
          this.listTipoParcerias();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    } else {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'osc/projeto/tipo_parceria/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {},
        cache: false,
        success: function (data) {
          this.listTipoParcerias();
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
        }.bind(this)
      });
    }
  }
  clickFontRecurso() {
    this.setState({
      active: !this.state.active
    });
  }
  showHideForm(action) {
    let showForm = !this.state.showForm;
    this.setState({
      showForm: showForm,
      actionForm: action
    });
  }
  remove(rota, id) {
    $.ajax({
      method: 'DELETE',
      url: getBaseUrl2 + 'osc/projeto/' + rota + '/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: {},
      cache: false,
      success: function (data) {
        if (rota === 'financiador') {
          this.listFinanciadores();
        }
        if (rota === 'publico') {
          this.listPublicos();
        }
        if (rota === 'parceira') {
          this.listParcerias();
        }
        if (rota === 'localizacao') {
          this.listLocalizacoes();
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  removeList(rota, id) {
    let removeItem = rota + '_' + id;
    this.setState({
      removeItem: removeItem
    });
  }
  saveList(rota, id) {
    this.setState({
      saveLoading: rota + '_' + id
    });
    let url = getBaseUrl2 + 'osc/projeto/' + rota + '/' + id;
    let data = {};
    if (rota === 'financiador') {
      data = {
        tx_nome_financiador: this.state.form.tx_nome_financiador,
        id: id
      };
    }
    if (rota === 'publico') {
      data = {
        tx_nome_publico_beneficiado: this.state.form.tx_nome_publico_beneficiado,
        id: id
      };
    }
    if (rota === 'parceira') {
      data = {
        tx_nome_fantasia_osc: this.state.form.tx_nome_fantasia_osc,
        id: id
      };
    }
    $.ajax({
      method: 'PUT',
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: data,
      cache: false,
      success: function (data) {
        this.setState({
          saveLoading: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  addList(rota) {
    this.setState({
      showAdd: rota
    });
  }
  render() {
    let financiador_projeto = null;
    if (this.state.datalistFinanciadores) {
      financiador_projeto = this.state.datalistFinanciadores.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "label-float",
          key: "financiador_projeto_" + index
        }, /*#__PURE__*/React.createElement("input", {
          className: "form-control form-g ",
          type: "text",
          name: "tx_nome_financiador",
          onChange: this.handleInputChange,
          defaultValue: item.tx_nome_financiador,
          placeholder: "Insica o CNPJ da OSC Parceira"
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "tx_nome_financiador"
        }, "Financiador do projeto"), /*#__PURE__*/React.createElement("div", {
          className: "label-box-info-off"
        }, /*#__PURE__*/React.createElement("p", null, "\xA0")), /*#__PURE__*/React.createElement("div", {
          className: "float-right ",
          style: {
            margin: '-50px 10px 0 0'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.removeItem == 'financiador_' + item.id_financiador_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-danger",
          onClick: () => this.remove('financiador', item.id_financiador_projeto)
        }, "Excluir"), /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-light",
          onClick: () => this.removeList(item.id_financiador_projeto)
        }, "Cancelar")), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          style: {
            display: this.state.removeItem == 'financiador_' + item.id_financiador_projeto ? 'none' : ''
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "float-right cursor",
          onClick: () => this.removeList('financiador', item.id_financiador_projeto)
        }, /*#__PURE__*/React.createElement("i", {
          className: "fas fa-trash-alt text-danger "
        })), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          onClick: () => this.saveList('financiador', item.id_financiador_projeto),
          style: {
            margin: '0 10px'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.saveLoading === 'financiador_' + item.id_financiador_projeto ? 'none' : ''
          },
          className: "cursor"
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-save"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.saveLoading === 'financiador_' + item.id_financiador_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-spin fa-spinner"
        }))))));
      }.bind(this));
    }
    let publico_projeto = null;
    if (this.state.datalistPublicos) {
      publico_projeto = this.state.datalistPublicos.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "label-float",
          key: "publico_projeto_" + index
        }, /*#__PURE__*/React.createElement("input", {
          className: "form-control form-g ",
          type: "text",
          name: "tx_nome_publico_beneficiado",
          onChange: this.handleInputChange,
          defaultValue: item.tx_nome_publico_beneficiado,
          placeholder: "Insica o CNPJ da OSC Parceira"
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "tx_nome_publico_beneficiado"
        }, "Publico do projeto"), /*#__PURE__*/React.createElement("div", {
          className: "label-box-info-off"
        }, /*#__PURE__*/React.createElement("p", null, "\xA0")), /*#__PURE__*/React.createElement("div", {
          className: "float-right ",
          style: {
            margin: '-50px 10px 0 0'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.removeItem == 'publico_' + item.id_publico_beneficiado_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-danger",
          onClick: () => this.remove('publico', item.id_publico_beneficiado_projeto)
        }, "Excluir"), /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-light",
          onClick: () => this.removeList(item.id_publico_beneficiado_projeto)
        }, "Cancelar")), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          style: {
            display: this.state.removeItem == 'publico_' + item.id_publico_beneficiado_projeto ? 'none' : ''
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "float-right cursor",
          onClick: () => this.removeList('publico', item.id_publico_beneficiado_projeto)
        }, /*#__PURE__*/React.createElement("i", {
          className: "fas fa-trash-alt text-danger "
        })), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          onClick: () => this.saveList('publico', item.id_publico_beneficiado_projeto),
          style: {
            margin: '0 10px'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "cursor",
          style: {
            display: this.state.saveLoading === 'publico_' + item.id_publico_beneficiado_projeto ? 'none' : ''
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-save"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.saveLoading === 'publico_' + item.id_publico_beneficiado_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "fa fa-spin fa-spinner"
        }))))));
      }.bind(this));
    }
    let localizacao_projeto = null;
    if (this.state.datalistLocalizacoes) {
      localizacao_projeto = this.state.datalistLocalizacoes.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "col-md-6",
          key: "localizacao_projeto_" + index
        }, /*#__PURE__*/React.createElement("div", {
          className: "label-float"
        }, /*#__PURE__*/React.createElement("input", {
          className: "form-control form-g ",
          type: "text",
          name: "tx_nome_regiao_localizacao_projeto",
          onChange: this.handleInputChange,
          defaultValue: item.tx_nome_regiao_localizacao_projeto,
          placeholder: "Insica o Local de execu\xE7\xE3o"
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "tx_nome_Localizacao"
        }, "Local de execu\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
          className: "label-box-info-off"
        }, /*#__PURE__*/React.createElement("p", null, "\xA0")), /*#__PURE__*/React.createElement("div", {
          className: "float-right ",
          style: {
            margin: '-50px 10px 0 0'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.removeItem == 'localizacao_' + item.id_localizacao_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-danger",
          onClick: () => this.remove('localizacao', item.id_localizacao_projeto)
        }, "Excluir"), /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-light",
          onClick: () => this.removeList(item.id_localizacao_projeto)
        }, "Cancelar")), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          style: {
            display: this.state.removeItem == 'localizacao_' + item.id_localizacao_projeto ? 'none' : ''
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "float-right cursor",
          onClick: () => this.removeList('localizacao', item.id_localizacao_projeto)
        }, /*#__PURE__*/React.createElement("i", {
          className: "fas fa-trash-alt text-danger "
        }))))));
      }.bind(this));
    }
    let status_projeto = null;
    if (this.state.datalistStatusProjeto) {
      status_projeto = this.state.datalistStatusProjeto.map(function (item, index) {
        return /*#__PURE__*/React.createElement("option", {
          value: item.cd_status_projeto,
          key: "localizacao_projeto_" + index
        }, item.tx_nome_status_projeto);
      }.bind(this));
    }
    let parceira_projeto = null;
    if (this.state.datalistParcerias) {
      parceira_projeto = this.state.datalistParcerias.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "label-float listItemProject",
          key: "parceira_projeto_" + index
        }, /*#__PURE__*/React.createElement("input", {
          className: "form-control form-g ",
          type: "text",
          name: "tx_nome_fantasia_osc",
          onChange: this.handleInputChange,
          defaultValue: item.tx_nome_fantasia_osc,
          placeholder: "Insica o CNPJ da OSC Parceira"
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "tx_nome_fantasia_osc"
        }, "OSC Parceira"), /*#__PURE__*/React.createElement("div", {
          className: "label-box-info-off"
        }, /*#__PURE__*/React.createElement("p", null, "\xA0")), /*#__PURE__*/React.createElement("div", {
          className: "float-right ",
          style: {
            margin: '-50px 10px 0 0'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: this.state.removeItem == 'parceira_' + item.id_osc_parceira_projeto ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-danger",
          onClick: () => this.remove('parceira', item.id_osc_parceira_projeto)
        }, "Excluir"), /*#__PURE__*/React.createElement("div", {
          className: "btn-xs btn-light",
          onClick: () => this.removeList(item.id_osc_parceira_projeto)
        }, "Cancelar")), /*#__PURE__*/React.createElement("div", {
          className: "float-right",
          style: {
            display: this.state.removeItem == 'parceira_' + item.id_osc_parceira_projeto ? 'none' : ''
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "float-right cursor",
          onClick: () => this.removeList('parceira', item.id_osc_parceira_projeto)
        }, /*#__PURE__*/React.createElement("i", {
          className: "fas fa-trash-alt text-danger "
        })))));
      }.bind(this));
    }
    function padDigits(number, digits) {
      return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
    let objetivos = null;
    let metas = [];
    if (this.state.objetivos) {
      objetivos = this.state.objetivos.map(function (item) {
        let checkedMetas = false;
        if (this.state.datalistObjetivos) {
          if (this.state.datalistObjetivos.indexOf(item.cd_objetivo_projeto) != -1) {
            checkedMetas = true;
          }
        }
        let png = padDigits(item.cd_objetivo_projeto, 2);
        if (item.metas) {
          metas.push(item.metas.map(function (itemMeta) {
            /*if(itemMeta.checked){
                checkedMetas = true;
            }*/

            let checkedMeta2 = false;
            let id_objetivo_projeto = 0;
            this.state.dataChkboxMetas.find(itemChecked => {
              if (itemMeta.cd_meta_projeto === itemChecked.cd_meta_projeto) {
                checkedMetas = true;
                checkedMeta2 = true;
                id_objetivo_projeto = itemChecked.id_objetivo_projeto;
              }
            });
            return /*#__PURE__*/React.createElement("div", {
              key: "subarea_" + itemMeta.cd_meta_projeto,
              style: {
                display: itemMeta.display ? '' : 'none'
              }
            }, /*#__PURE__*/React.createElement("div", {
              className: "custom-control custom-checkbox",
              onChange: () => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_projeto, !checkedMeta2)
            }, /*#__PURE__*/React.createElement("input", {
              type: "checkbox",
              className: "custom-control-input",
              id: "subarea_" + itemMeta.cd_meta_projeto,
              required: true,
              defaultChecked: checkedMeta2,
              onChange: this.handleInputChange
            }), /*#__PURE__*/React.createElement("label", {
              className: "custom-control-label",
              htmlFor: "subarea_" + itemMeta.cd_meta_projeto
            }, itemMeta.tx_nome_meta_projeto)), /*#__PURE__*/React.createElement("hr", null));
          }.bind(this)));
        }
        return /*#__PURE__*/React.createElement("div", {
          className: "custom-control custom-checkbox",
          key: "area_" + item.cd_objetivo_projeto,
          onChange: () => this.callSubobjetivos(item.cd_objetivo_projeto),
          style: {
            paddingLeft: 0
          }
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          className: "custom-control-input",
          id: "area_" + item.cd_objetivo_projeto,
          required: true
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "area_" + item.cd_objetivo_projeto,
          style: {
            marginLeft: '0',
            marginRight: '5px',
            paddingBottom: 0
          }
        }, /*#__PURE__*/React.createElement("img", {
          src: "img/ods/" + png + ".png",
          alt: "",
          className: (checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos == item.cd_objetivo_projeto ? " item-focus" : ""),
          width: "80",
          style: {
            position: 'relative'
          },
          title: item.tx_nome_objetivo_projeto
        })));
      }.bind(this));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.tx_nome_projeto,
      placeholder: "Nome do projeto, atividade ou programa",
      disabled: this.state.form.ft_nome_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_projeto"
    }, "Nome do projeto, atividade ou programa "), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control form-m ",
      name: "cd_status_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.cd_status_projeto,
      disabled: this.state.form.ft_status_projeto !== 'Representante de OSC'
    }, /*#__PURE__*/React.createElement("option", {
      value: "-1"
    }, "Selecione"), status_projeto), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "date",
      name: "dt_data_inicio_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.dt_data_inicio_projeto,
      placeholder: "Data de In\xEDcio",
      disabled: this.state.form.ft_data_inicio_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_inicio_projeto"
    }, "Data de In\xEDcio"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "date",
      name: "dt_data_fim_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.dt_data_fim_projeto,
      placeholder: "Data de Fim",
      disabled: this.state.form.ft_data_fim_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_fim_projeto"
    }, "Data de Fim"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_link_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.tx_link_projeto,
      placeholder: "Link para o projeto",
      disabled: this.state.form.ft_link_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_link_projeto"
    }, "Link para o projeto"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "nr_total_beneficiarios",
      onChange: this.handleInputChange,
      value: this.state.form.nr_total_beneficiarios,
      placeholder: "Total de Benefici\xE1rios"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "nr_total_beneficiarios"
    }, "Total de Benefici\xE1rios"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "nr_valor_total_projeto",
      onChange: this.handleInputChange,
      value: formatCurrencyBR(this.state.form.nr_valor_total_projeto),
      placeholder: "Valor Total ex.: 10.000,00",
      disabled: this.state.form.ft_valor_total_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "nr_valor_total_projeto"
    }, "Valor Total"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "nr_valor_captado_projeto",
      onChange: this.handleInputChange,
      value: formatCurrencyBR(this.state.form.nr_valor_captado_projeto),
      placeholder: "Valor Recebido ex.: 10.000,00",
      disabled: this.state.form.ft_valor_captado_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "nr_valor_captado_projeto"
    }, "Valor Recebido"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_descricao_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.tx_descricao_projeto,
      placeholder: "Descri\xE7\xE3o do Projeto, atividade e/ou programa",
      disabled: this.state.form.ft_descricao_projeto !== 'Representante de OSC'
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_descricao_projeto"
    }, "Descri\xE7\xE3o do Projeto, atividade e/ou programa"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_metodologia_monitoramento",
      onChange: this.handleInputChange,
      value: this.state.form.tx_metodologia_monitoramento,
      placeholder: "Metodologia de Monitoramento e Avalia\xE7\xE3o do Projeto, atividade e/ou programa"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_metodologia_monitoramento"
    }, "Metodologia de Monitoramento e Avalia\xE7\xE3o do Projeto, atividade e/ou programa"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control form-m ",
      name: "cd_abrangencia_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.cd_abrangencia_projeto
    }, /*#__PURE__*/React.createElement("option", {
      value: "-1"
    }, "Selecione"), /*#__PURE__*/React.createElement("option", {
      value: "1"
    }, "Municipal"), /*#__PURE__*/React.createElement("option", {
      value: "2"
    }, "Estadual"), /*#__PURE__*/React.createElement("option", {
      value: "3"
    }, "Regional"), /*#__PURE__*/React.createElement("option", {
      value: "4"
    }, "Nacional")), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control form-m ",
      name: "cd_zona_atuacao_projeto",
      onChange: this.handleInputChange,
      value: this.state.form.cd_zona_atuacao_projeto
    }, /*#__PURE__*/React.createElement("option", {
      value: "-1"
    }, "Selecione"), /*#__PURE__*/React.createElement("option", {
      value: "1"
    }, "Rural"), /*#__PURE__*/React.createElement("option", {
      value: "2"
    }, "Urbana"), /*#__PURE__*/React.createElement("option", {
      value: "3"
    }, "Rural/Urbana")), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-success",
      onClick: this.register
    }, "Atualizar"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: "alert alert-danger"
    }, this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), "Processando")))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6'
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h3", null, "Fontes de Recursos"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox",
      onChange: this.clickFontRecurso
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkRecurso(1, this.state.ft_recursos_publico, this.state.id_recurso_publico)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "fontes_recursos_publico",
      checked: this.state.ft_recursos_publico,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "fontes_recursos_publico"
    }, "Recursos p\xFAblicos")), /*#__PURE__*/React.createElement("div", {
      className: "float-right",
      style: {
        display: this.state.ft_recursos_publico === false ? 'none' : '',
        margin: '8px -20px 0 0'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-chevron-right "
    }))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkRecurso(2, this.state.ft_recursos_privado, this.state.id_recurso_privado)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "fontes_recursos_privado",
      checked: this.state.ft_recursos_privado,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "fontes_recursos_privado"
    }, "Recursos privados"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkRecurso(4, this.state.ft_recursos_proprio, this.state.id_recurso_proprio)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "fontes_recursos_proprio",
      checked: this.state.ft_recursos_proprio,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "fontes_recursos_proprio"
    }, "Recursos pr\xF3prios"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkRecurso(3, this.state.ft_recursos_nao_financeiro, this.state.id_recurso_nao_financeiro)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "fontes_recursos_nao_financeiro",
      checked: this.state.ft_recursos_nao_financeiro,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "fontes_recursos_nao_financeiro"
    }, "Recursos na\u0303o financeiros")))), /*#__PURE__*/React.createElement("div", {
      className: this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6',
      style: {
        display: this.state.ft_recursos_publico === false ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h3", null, "Tipo de Parceria"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(5, this.state.tp_cooperacao_tecnica, this.state.id_tipo_parceria_cooperacao)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_cooperacao_tecnica",
      checked: this.state.tp_cooperacao_tecnica,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_cooperacao_tecnica"
    }, "Acordo de coopera\xE7\xE3o t\xE9cnica"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(0, this.state.tp_termo_fomento, this.state.id_tipo_parceria_fomento)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_termo_fomento",
      checked: this.state.tp_termo_fomento,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_termo_fomento"
    }, "Termo de fomento"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(1, this.state.tp_termo_colaboracao, this.state.id_tipo_parceria_colaboracao)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_termo_colaboracao",
      checked: this.state.tp_termo_colaboracao,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_termo_colaboracao"
    }, "Termo de colabora\xE7\xE3o"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(2, this.state.tp_termo_parceria, this.state.id_tipo_parceria_parceria)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_termo_parceria",
      checked: this.state.tp_termo_parceria,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_termo_parceria"
    }, "Termo de parceria"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(3, this.state.tp_contrato_gestao, this.state.id_tipo_parceria_gestao)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_contrato_gestao",
      checked: this.state.tp_contrato_gestao,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_contrato_gestao"
    }, "Contrato de gest\xE3o"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(4, this.state.tp_convenio, this.state.id_tipo_parceria_convenio)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_convenio",
      checked: this.state.tp_convenio,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_convenio"
    }, "Conv\xEAnio"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt items-checkbox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox",
      onChange: () => this.checkParceria(6, this.state.tp_outro, this.state.id_tipo_parceria_outro)
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "tp_outro",
      checked: this.state.tp_outro,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "tp_outro"
    }, "Outro")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "OSCs Parceiras")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-1 float-right",
      style: {
        marginTop: '15px',
        marginRight: '-40px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn-add",
      onClick: () => this.addList('parceira'),
      style: {
        display: this.state.showAdd === 'parceira' ? "none" : "block"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-plus-circle"
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn-add btn-add-warning",
      onClick: () => this.addList('off'),
      style: {
        display: this.state.showAdd === 'parceira' ? "block" : "none"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-times-circle"
    }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12",
      style: {
        display: this.state.showAdd === 'parceira' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement(FormOscParceira, {
      action: this.state.actionForm,
      id: this.state.editId,
      listParcerias: this.listParcerias,
      showHideForm: this.showHideForm,
      closeForm: this.closeForm,
      id_projeto: this.state.editId
    })), parceira_projeto)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "P\xFAblico Beneficiado")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-1 float-right",
      style: {
        marginTop: '15px',
        marginRight: '-40px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn-add",
      onClick: () => this.addList('publico'),
      style: {
        display: this.state.showAdd === 'publico' ? "none" : "block"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-plus-circle"
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn-add btn-add-warning",
      onClick: () => this.addList('off'),
      style: {
        display: this.state.showAdd === 'publico' ? "block" : "none"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-times-circle"
    }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12",
      style: {
        display: this.state.showAdd === 'publico' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement(FormProjetoPublico, {
      id_projeto: this.state.editId,
      listPublicos: this.listPublicos
    })), publico_projeto), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Local de execu\xE7\xE3o")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-1 float-right",
      style: {
        marginTop: '15px',
        marginRight: '-40px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn-add",
      onClick: () => this.addList('localizacao'),
      style: {
        display: this.state.showAdd === 'localizacao' ? "none" : "block"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-plus-circle"
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn-add btn-add-warning",
      onClick: () => this.addList('off'),
      style: {
        display: this.state.showAdd === 'localizacao' ? "block" : "none"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-times-circle"
    }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12",
      style: {
        display: this.state.showAdd === 'localizacao' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement(FormProjetoLocalizacao, {
      id_projeto: this.state.editId,
      listLocalizacoes: this.listLocalizacoes
    })), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, localizacao_projeto)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Financiadores do Projeto")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-1 float-right",
      style: {
        marginTop: '15px',
        marginRight: '-40px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn-add",
      onClick: () => this.addList('financiador'),
      style: {
        display: this.state.showAdd === 'financiador' ? "none" : "block"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-plus-circle"
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn-add btn-add-warning",
      onClick: () => this.addList('off'),
      style: {
        display: this.state.showAdd === 'financiador' ? "block" : "none"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-2x fa-times-circle"
    }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12",
      style: {
        display: this.state.showAdd === 'financiador' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement(FormProjetoFinanciador, {
      id_projeto: this.state.editId,
      listFinanciadores: this.listFinanciadores
    })), financiador_projeto)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("strong", null, "Objetivos do Desenvolvimento Sustent\xE1vel - ODS"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, objetivos, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.titleMeta ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Metas Relacionadas ao ODS definido"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, this.state.titleObjetivo), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), metas)))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))));
  }
}