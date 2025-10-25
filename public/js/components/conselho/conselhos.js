class Conselhos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselhos: [],
      showModal: false,
      editingConselho: null,
      form: {
        tx_nome_conselho: '',
        tx_ato_legal: '',
        tx_website: '',
        bo_conselho_ativo: true,
        cd_nivel_federativo: '',
        cd_tipo_abrangencia: ''
      },
      nivelFederativo: [],
      tipoAbrangencia: []
    };
  }
  componentDidMount() {
    this.loadConselhos();
    this.loadNivelFederativo();
    this.loadTipoAbrangencia();
  }
  loadNivelFederativo() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/nivel_federativo',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          nivelFederativo: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar níveis federativos:', err);
      }.bind(this)
    });
  }
  loadTipoAbrangencia() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/abrangencia_conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          tipoAbrangencia: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar tipos de abrangência:', err);
      }.bind(this)
    });
  }
  openModal(conselho = null) {
    if (conselho) {
      this.setState({
        showModal: true,
        editingConselho: conselho,
        form: {
          tx_nome_conselho: conselho.tx_nome_conselho || '',
          tx_ato_legal: conselho.tx_ato_legal || '',
          tx_website: conselho.tx_website || '',
          bo_conselho_ativo: conselho.bo_conselho_ativo || true,
          cd_nivel_federativo: conselho.cd_nivel_federativo || '',
          cd_tipo_abrangencia: conselho.cd_tipo_abrangencia || ''
        }
      });
    } else {
      this.setState({
        showModal: true,
        editingConselho: null,
        form: {
          tx_nome_conselho: '',
          tx_ato_legal: '',
          tx_website: '',
          bo_conselho_ativo: true,
          cd_nivel_federativo: '',
          cd_tipo_abrangencia: ''
        }
      });
    }
  }
  closeModal() {
    this.setState({
      showModal: false,
      editingConselho: null,
      form: {
        tx_nome_conselho: '',
        tx_ato_legal: '',
        tx_website: '',
        bo_conselho_ativo: true,
        cd_nivel_federativo: '',
        cd_tipo_abrangencia: ''
      }
    });
  }
  handleInputChange(field, value) {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  }
  saveConselho() {
    const url = this.state.editingConselho ? getBaseUrl2 + 'confocos/conselho/' + this.state.editingConselho.id_conselho : getBaseUrl2 + 'confocos/conselho';
    const method = this.state.editingConselho ? 'PUT' : 'POST';
    $.ajax({
      method: method,
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.state.form),
      success: function () {
        this.closeModal();
        this.loadConselhos();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao salvar conselho:', err);
        alert('Erro ao salvar conselho');
      }.bind(this)
    });
  }
  loadConselhos() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          conselhos: data || []
        });
        console.log('conselho:::::::::', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({
          loading: false
        });
      }.bind(this)
    });
  }
  deleteConselho(id) {
    if (confirm('Tem certeza que deseja excluir este conselho?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/conselho/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadConselhos();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          alert('Erro ao excluir conselho');
        }
      });
    }
  }
  renderModal() {
    return /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, this.state.editingConselho ? 'Editar Conselho' : 'Novo Conselho'), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: () => this.closeModal()
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Nome do Conselho"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_nome_conselho,
      onChange: e => this.handleInputChange('tx_nome_conselho', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Ato Legal"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_ato_legal,
      onChange: e => this.handleInputChange('tx_ato_legal', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Website"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_website,
      onChange: e => this.handleInputChange('tx_website', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "N\xEDvel Federativo"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_nivel_federativo,
      onChange: e => this.handleInputChange('cd_nivel_federativo', e.target.value ? parseInt(e.target.value) : '')
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.nivelFederativo.map(nivel => /*#__PURE__*/React.createElement("option", {
      key: nivel.cd_nivel_federativo,
      value: nivel.cd_nivel_federativo
    }, nivel.tx_nome_nivel_federativo)))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Tipo de Abrang\xEAncia"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_tipo_abrangencia,
      onChange: e => this.handleInputChange('cd_tipo_abrangencia', e.target.value ? parseInt(e.target.value) : '')
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.tipoAbrangencia.map(tipo => /*#__PURE__*/React.createElement("option", {
      key: tipo.cd_tipo_abrangencia,
      value: tipo.cd_tipo_abrangencia
    }, tipo.tx_nome_abrangencia)))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: this.state.form.bo_conselho_ativo,
      onChange: e => this.handleInputChange('bo_conselho_ativo', e.target.checked)
    }), ' ', "Conselho Ativo"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => this.closeModal()
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: () => this.saveConselho()
    }, "Salvar")))));
  }
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, "Carregando...");
    }
    if (this.state.conselhos.length === 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container-fluid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bg-white border-bottom py-3 px-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "mb-0"
      }, "Conselhos"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary",
        onClick: () => this.openModal()
      }, "Novo Conselho"))), /*#__PURE__*/React.createElement("div", {
        className: "bg-white p-4 text-center py-5"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users fa-3x text-muted mb-3"
      }), /*#__PURE__*/React.createElement("h5", {
        className: "text-muted"
      }, "Nenhum conselho encontrado"), /*#__PURE__*/React.createElement("p", {
        className: "text-muted"
      }, "Clique no bot\xE3o \"Novo Conselho\" para come\xE7ar")), this.state.showModal && this.renderModal());
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("h2", null, "Meus conselhos"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => this.openModal()
    }, "Novo Conselho"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-white p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-striped"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nome"), /*#__PURE__*/React.createElement("th", null, "Ato Legal"), /*#__PURE__*/React.createElement("th", null, "Website"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.conselhos.map(conselho => /*#__PURE__*/React.createElement("tr", {
      key: conselho.id_conselho
    }, /*#__PURE__*/React.createElement("td", null, conselho.id_conselho), /*#__PURE__*/React.createElement("td", null, conselho.tx_nome_conselho || 'N/A'), /*#__PURE__*/React.createElement("td", null, conselho.tx_ato_legal || 'N/A'), /*#__PURE__*/React.createElement("td", null, conselho.tx_website ? /*#__PURE__*/React.createElement("a", {
      href: `http://${conselho.tx_website}`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, conselho.tx_website) : 'N/A'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`
    }, conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-warning mr-2",
      onClick: () => this.openModal(conselho)
    }, "Editar")))))))), this.state.showModal && this.renderModal());
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Conselhos, null), document.getElementById('conselhos'));