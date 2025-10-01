class Participacoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      conferencias: [],
      conselhos: [],
      outros: [],
      tipo: {
        1: 'Residencial',
        2: 'Comercial'
      },
      principal: {
        1: 'Endereço principal',
        2: ' '
      },
      showFormConselho: false,
      showFormConferencia: false,
      showFormOutro: false,
      actionFormConselho: '',
      actionFormConferencia: '',
      actionFormOutro: '',
      loadingRemove: [],
      conferencia: {},
      conselho: {},
      outro: {},
      editIdConselho: 0,
      editIdConferencia: 0,
      editIdOutro: 0,
      editId: 0,
      removeConselho: [],
      removeItem: [],
      removeOutro: [],
      removeItemConselho: null,
      removeItemTx: '',
      removeTipo: '',
      nao_possui: null,
      type: '',
      msgEspacos: 'Caso queira continuar com essa solicitação todos os dados serão apagados, esse processo apenas será validado após a confirmação.',
      showConselhoInfo: false,
      showConferenciaInfo: false,
      showOutroInfo: false
    };
    this.list = this.list.bind(this);
    this.showHideFormConselho = this.showHideFormConselho.bind(this);
    this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
    this.showHideFormOutro = this.showHideFormOutro.bind(this);
    this.closeFormConselho = this.closeFormConselho.bind(this);
    this.closeFormConferencia = this.closeFormConferencia.bind(this);
    this.closeFormOutro = this.closeFormOutro.bind(this);
    this.showHideConselho = this.showHideConselho.bind(this);
    this.showHideConferencia = this.showHideConferencia.bind(this);
    this.showHideOutro = this.showHideOutro.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.callModal = this.callModal.bind(this);
    this.callModalExcluir = this.callModalExcluir.bind(this);
    this.naoPossui = this.naoPossui.bind(this);
    this.updateNaoPossui = this.updateNaoPossui.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.list();
    this.naoPossui();
  }
  cancelRemove(id) {
    let remove = this.state.remove;
    remove[id] = false;
    this.setState({
      remove: remove
    });
  }
  showHideFormConselho(action) {
    let showFormConselho = !this.state.showFormConselho;
    let actionFormConselho = action;
    this.setState({
      showFormConselho: showFormConselho,
      actionFormConselho: actionFormConselho
    });
  }
  showHideFormConferencia(action) {
    let showFormConferencia = !this.state.showFormConferencia;
    let actionFormConferencia = action;
    this.setState({
      showFormConferencia: showFormConferencia,
      actionFormConferencia: actionFormConferencia
    });
  }
  showHideFormOutro(action) {
    let showFormOutro = !this.state.showFormOutro;
    let actionFormOutro = action;
    this.setState({
      showFormOutro: showFormOutro,
      actionFormOutro: actionFormOutro
    });
  }
  showHideConselho() {
    let showConselho = !this.state.showConselho;
    if (showConselho === true) {
      this.updateNaoPossui('conselhos');
      this.setState({
        showConselhoInfo: false
      });
    } else {
      this.setState({
        showConselhoInfo: true
      });
    }
    this.setState({
      showConselho: showConselho
    });
  }
  showHideConferencia() {
    let showConferencia = !this.state.showConferencia;
    if (showConferencia === true) {
      this.updateNaoPossui('conferencias');
      this.setState({
        showConferenciaInfo: false
      });
    } else {
      this.setState({
        showConferenciaInfo: true
      });
    }
    this.setState({
      showConferencia: showConferencia
    });
  }
  showHideOutro() {
    let showOutro = !this.state.showOutro;
    if (showOutro === true) {
      this.updateNaoPossui('outros');
      this.setState({
        showOutroInfo: false
      });
    } else {
      this.setState({
        showOutroInfo: true
      });
    }
    this.setState({
      showOutro: showOutro
    });
  }
  closeFormConselho() {
    this.setState({
      showForm: false
    });
  }
  closeFormConferencia() {
    this.setState({
      showFormConferencia: false
    });
  }
  closeFormOutro() {
    this.setState({
      showFormOutro: false
    });
  }
  list() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl2 + 'osc/participacao_social/611720',
      url: getBaseUrl2 + 'osc/participacao_social/' + this.props.id,
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          conferencias: data.conferencias_politicas_publicas,
          conselhos: data.conselhos_politicas_publicas,
          outros: data.outros_espacos_participacao_social,
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
  naoPossui() {
    $.ajax({
      method: 'GET',
      //url: getBaseUrl2 + 'osc/611720',
      url: getBaseUrl2 + 'osc/' + this.props.id,
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          bo_nao_possui_ps_conselhos: data.bo_nao_possui_ps_conselhos,
          bo_nao_possui_ps_conferencias: data.bo_nao_possui_ps_conferencias,
          bo_nao_possui_ps_outros_espacos: data.bo_nao_possui_ps_outros_espacos,
          showConselho: !data.bo_nao_possui_ps_conselhos,
          showConferencia: !data.bo_nao_possui_ps_conferencias,
          showOutro: !data.bo_nao_possui_ps_outros_espacos
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
  validate() {
    let valid = true;
    let requireds = this.state.requireds;
    let form = this.state.form;
    this.setState({
      requireds: requireds
    });
    return valid;
  }
  updateNaoPossui(type, origin) {
    if (!this.validate()) {
      return;
    }
    let data = {};
    if (origin === 'btn') {
      if (type === 'conselhos') {
        data.bo_nao_possui_ps_conselhos = this.state.showConselho ? false : true;
      }
      if (type === 'conferencias') {
        data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? false : true;
      }
      if (type === 'outros') {
        data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? false : true;
      }
    } else {
      if (type === 'conselhos') {
        data.bo_nao_possui_ps_conselhos = this.state.showConselho ? true : false;
      }
      if (type === 'conferencias') {
        data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? true : false;
      }
      if (type === 'outros') {
        data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? true : false;
      }
    }
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: 'PUT',
        //url: getBaseUrl2 + 'osc/611720',
        url: getBaseUrl2 + 'osc/' + this.props.id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: data,
        cache: false,
        success: function (data) {
          let msg = "Dados alterados com sucesso!";
          this.setState({
            loading: false,
            msg: msg,
            showMsg: true,
            updateOk: true,
            button: true,
            type: type,
            origin: origin
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          let msg = "Ocorreu um erro!";
          this.setState({
            loading: false,
            msg: msg,
            showMsg: true,
            updateOk: false,
            button: true,
            type: type
          });
        }.bind(this)
      });
    });
  }
  removeItem(id, tipo) {
    let remove = this.state.removeConselho;
    $.ajax({
      method: 'DELETE',
      url: getBaseUrl2 + 'osc/ps_' + tipo + '/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: {},
      cache: false,
      success: function (data) {
        this.list();
        $('#modalFormExcluir').modal('hide');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  callModalExcluir(id, tx_nome_conferencia, tipo) {
    let modalExcluir = this.state.modalExcluir;
    this.setState({
      modalExcluir: modalExcluir,
      removeItemConferencia: id,
      removeItemTx: tx_nome_conferencia,
      removeTipo: tipo
    }, function () {
      $('#modalFormExcluir').modal('show');
    });
  }
  callModal(id, type) {
    let modal = this.state.modal;
    this.setState({
      modal: modal,
      editId: id,
      editTipo: type
    }, function () {
      $('#modalForm').modal('show');
    });
  }
  modalExcluir() {
    return /*#__PURE__*/React.createElement("div", {
      id: "modalFormExcluir",
      className: "modal fade bd-example-modal-sm",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, /*#__PURE__*/React.createElement("strong", null, "Excluir permanentemente")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, "Tem certeza que quer excluir \"", this.state.removeItemTx, "\"."), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-danger",
      onClick: () => this.removeItem(this.state.removeItemConferencia, this.state.removeTipo)
    }, "Excluir")))));
  }
  modal() {
    let form = null;
    if (this.state.editTipo == 'outra') {
      form = /*#__PURE__*/React.createElement(FormEditParticipacaoOutro, {
        action: this.state.actionForm,
        list: this.list,
        id: this.state.editId,
        id_osc: this.props.id,
        closeForm: this.closeForm
      });
    }
    if (this.state.editTipo == 'conferencia') {
      form = /*#__PURE__*/React.createElement(FormEditParticipacaoConferencia, {
        action: this.state.actionForm,
        list: this.list,
        id: this.state.editId,
        id_osc: this.props.id,
        closeForm: this.closeForm
      });
    }
    if (this.state.editTipo == 'conselho') {
      form = /*#__PURE__*/React.createElement(FormEditParticipacaoConselho, {
        action: this.state.actionForm,
        list: this.list,
        id: this.state.editId,
        id_osc: this.props.id,
        closeForm: this.cleanFormConselho
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      id: "modalForm",
      className: "modal fade bd-example-modal-lg",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, /*#__PURE__*/React.createElement("strong", null, this.state.modalTitle)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, form))));
  }
  render() {
    /////////////////////////////
    let modal = this.modal();
    let modalExcluir = this.modalExcluir();
    let conselhos = null;

    ////////////////////////////
    if (this.state.conselhos) {
      conselhos = this.state.conselhos.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "col-md-6",
          style: {
            border: '0'
          },
          key: "conselho_" + index
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-g text-left"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-item box-insert-list"
        }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
          className: "float-right"
        }, /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModalExcluir(item.id_conselho, item.dc_conselho.tx_nome_conselho, 'conselho'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-trash-alt text-danger float-right"
        })), /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModal(item.id_conselho, 'conselho'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-edit text-primary float-right",
          style: {
            marginRight: '20px'
          }
        }))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Nome do Conselho:"), /*#__PURE__*/React.createElement("p", null, item.dc_conselho.tx_nome_conselho), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Periodicidade da Reuni\xE3o:"), /*#__PURE__*/React.createElement("p", null, item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Data de in\xEDcio de vig\xEAncia:"), /*#__PURE__*/React.createElement("p", null, formatDate(item.dt_data_inicio_conselho, 'pt-br')), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Data de fim de vig\xEAncia:"), /*#__PURE__*/React.createElement("p", null, formatDate(item.dt_data_fim_conselho, 'pt-br'))))), /*#__PURE__*/React.createElement("br", null), modal);
      }.bind(this));
    }
    let conferencias = null;
    if (this.state.conferencias) {
      conferencias = this.state.conferencias.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "col-md-6",
          style: {
            border: '0'
          },
          key: "conferencia_" + index
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-m"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-item box-insert-list"
        }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModalExcluir(item.id_conferencia, item.dc_conferencia.tx_nome_conferencia, 'conferencia'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-trash-alt text-danger float-right"
        })), /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModal(item.id_conferencia, 'conferencia'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-edit text-primary float-right",
          style: {
            marginRight: '20px'
          }
        })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Nome da Confer\xEAncia:"), /*#__PURE__*/React.createElement("p", null, item.dc_conferencia.tx_nome_conferencia)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Ano de realiza\xE7\xE3o da confer\xEAncia:"), /*#__PURE__*/React.createElement("p", null, item.dt_ano_realizacao.replace('-01-01', ''))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Forma de participa\xE7\xE3o na confer\xEAncia:"), /*#__PURE__*/React.createElement("p", null, item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia)))), /*#__PURE__*/React.createElement("br", null), modalExcluir);
      }.bind(this));
    }
    let outros = null;
    if (this.state.outros) {
      outros = this.state.outros.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "col-md-6",
          style: {
            border: '0'
          },
          key: "outros_" + index
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-p"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box-insert-item box-insert-list"
        }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModalExcluir(item.id_participacao_social_outra, item.tx_nome_participacao_social_outra, 'outra'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-trash-alt text-danger float-right"
        })), /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModal(item.id_participacao_social_outra, 'outra'),
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-edit text-primary float-right",
          style: {
            marginRight: '20px'
          }
        })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Atua\xE7\xE3o em F\xF3runs, Articula\xE7\xF5es, Coletivos e Redes de OSCs:"), /*#__PURE__*/React.createElement("p", null, item.tx_nome_participacao_social_outra)))), /*#__PURE__*/React.createElement("br", null));
      }.bind(this));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-users",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("h3", null, "Espa\xE7os de participa\xE7\xE3o social"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-groups"
    }, /*#__PURE__*/React.createElement("h2", null, "Conselhos de pol\xEDticas p\xFAblicas"), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox text-center"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "checkConselho",
      required: true,
      onClick: this.showHideConselho,
      defaultChecked: this.state.bo_nao_possui_ps_conselhos,
      onChange: this.bo_nao_possui_ps_conselhos
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "checkConselho"
    }, "N\xE3o possui conselhos de pol\xEDticas p\xFAblicas"), /*#__PURE__*/React.createElement("div", {
      className: "alert alert-danger",
      style: {
        display: !this.state.showConselhoInfo ? 'none' : ''
      }
    }, this.state.msgEspacos, " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      type: "button",
      className: "btn-primary btn-xs float-right",
      onClick: () => this.updateNaoPossui('conselhos', 'btn')
    }, "Confirmar")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '10px',
        float: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading && this.state.type === 'conselhos' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg && this.state.type === 'conselhos' && this.state.origin === 'btn' ? 'block' : 'none'
      },
      className: 'alert alert-' + (this.state.updateOk ? "success" : "danger")
    }, /*#__PURE__*/React.createElement("i", {
      className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle")
    }), this.state.msg), /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        display: this.state.showConselho ? "" : "none"
      }
    }, conselhos, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: " box-insert-g"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-insert-btn text-center"
    }, /*#__PURE__*/React.createElement("a", {
      className: "cursor",
      onClick: this.showHideFormConselho,
      style: {
        display: this.state.showFormConselho ? "none" : "block",
        marginTop: "50%"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus-circle fa-3x tx-pri"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Novo Conselhos de Pol\xEDticas P\xFAblicas"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showFormConselho ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: this.showHideFormConselho
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-times-circle cursor text-warning",
      style: {
        margin: "-25px 0 0 0",
        float: "right"
      }
    })), /*#__PURE__*/React.createElement(FormParticipacaoConselho, {
      actionConselho: this.state.actionFormConselho,
      list: this.list,
      id: this.state.editIdConselho,
      id_osc: this.props.id,
      showHideFormConselho: this.showHideFormConselho,
      closeFormConselho: this.closeFormConselho
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loadingList ? 'true' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        marginTop: '80px'
      },
      src: "/img/loading.gif",
      width: '150px',
      alt: "carregando",
      title: "carregando"
    }))))))))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-groups"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", null, "Confer\xEAncias de pol\xEDticas p\xFAblicas"), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox text-center"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "checkConferencia",
      required: true,
      onClick: this.showHideConferencia,
      defaultChecked: this.state.bo_nao_possui_ps_conferencias,
      onChange: this.bo_nao_possui_ps_conselhos
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "checkConferencia"
    }, "N\xE3o possui confer\xEAncias de pol\xEDticas p\xFAblicas"), /*#__PURE__*/React.createElement("div", {
      className: "alert alert-danger",
      style: {
        display: !this.state.showConferenciaInfo ? 'none' : ''
      }
    }, this.state.msgEspacos, " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      type: "button",
      className: "btn-primary btn-xs float-right",
      onClick: () => this.updateNaoPossui('conferencias', 'btn')
    }, "Confirmar")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '10px',
        float: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading && this.state.type === 'conferencias' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg && this.state.type === 'conferencias' && this.state.origin === 'btn' ? 'block' : 'none'
      },
      className: 'alert alert-' + (this.state.updateOk ? "success" : "danger")
    }, /*#__PURE__*/React.createElement("i", {
      className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle")
    }), this.state.msg), /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        display: this.state.showConferencia ? "" : "none"
      }
    }, conferencias, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-insert-m"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-insert-btn text-center"
    }, /*#__PURE__*/React.createElement("a", {
      className: "cursor",
      onClick: this.showHideFormConferencia,
      style: {
        display: this.state.showFormConferencia ? "none" : "block",
        marginTop: "35%"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus-circle fa-3x tx-pri"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Nova Confer\xEAncia de Pol\xEDticas P\xFAblicas"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showFormConferencia ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: this.showHideFormConferencia
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-times-circle cursor text-warning",
      style: {
        margin: "-25px 0 0 0",
        float: "right"
      }
    })), /*#__PURE__*/React.createElement(FormParticipacaoConferencia, {
      action: this.state.actionFormConferencia,
      list: this.list,
      id: this.state.editId,
      id_osc: this.props.id,
      showHideFormConferencia: this.showHideFormConferencia,
      closeFormConferencia: this.closeFormConferencia
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loadingList ? 'true' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        marginTop: '80px'
      },
      src: "/img/loading.gif",
      width: '150px',
      alt: "carregando",
      title: "carregando"
    }))))))))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-groups"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", null, "Outros espa\xE7os de participa\xE7\xE3o social"), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox text-center"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "custom-control-input",
      id: "checkOutro",
      required: true,
      onClick: this.showHideOutro,
      defaultChecked: this.state.bo_nao_possui_ps_outros_espacos,
      onChange: this.bo_nao_possui_ps_outros_espacos
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "checkOutro"
    }, "N\xE3o possui outros espa\xE7os de participa\xE7\xE3o social"), /*#__PURE__*/React.createElement("div", {
      className: "alert alert-danger",
      style: {
        display: !this.state.showOutroInfo ? 'none' : ''
      }
    }, this.state.msgEspacos, " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      type: "button",
      className: "btn-primary btn-xs float-right",
      onClick: () => this.updateNaoPossui('outros', 'btn')
    }, "Confirmar")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '10px',
        float: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading && this.state.type === 'outros' ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg && this.state.type === 'outros' && this.state.origin === 'btn' ? 'block' : 'none'
      },
      className: 'alert alert-' + (this.state.updateOk ? "success" : "danger")
    }, /*#__PURE__*/React.createElement("i", {
      className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle")
    }), this.state.msg), /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        display: this.state.showOutro ? "" : "none"
      }
    }, outros, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-insert-p"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-insert-btn text-center"
    }, /*#__PURE__*/React.createElement("a", {
      className: "cursor",
      onClick: this.showHideFormOutro,
      style: {
        display: this.state.showFormOutro ? "none" : "block",
        marginTop: "15%"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus-circle fa-3x tx-pri"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Novo Outros espa\xE7os de participa\xE7\xE3o social"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showFormOutro ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: this.showHideFormOutro
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-times-circle cursor text-warning",
      style: {
        margin: "-25px 0 0 0",
        float: "right"
      }
    })), /*#__PURE__*/React.createElement(FormParticipacaoOutro, {
      action: this.state.actionFormOutro,
      list: this.list,
      id: this.state.editId,
      id_osc: this.props.id,
      showHideFormOutro: this.showHideFormOutro,
      closeFormOutro: this.closeFormOutro
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loadingList ? 'true' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        marginTop: '80px'
      },
      src: "/img/loading.gif",
      width: '150px',
      alt: "carregando",
      title: "carregando"
    })))))), /*#__PURE__*/React.createElement("br", null)))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Participacoes, {
  id: id
}), document.getElementById('participacoes'));