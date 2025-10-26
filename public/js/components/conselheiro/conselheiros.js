class Conselheiros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselheiros: [],
      filteredConselheiros: [],
      conselhos: [],
      showModal: false,
      showDetailModal: false,
      editingConselheiro: null,
      detailConselheiro: null,
      filters: {
        search: '',
        conselho: '',
        ativo: '',
        governamental: ''
      },
      form: {
        tx_nome_conselheiro: '',
        tx_orgao_origem: '',
        cd_identificador_osc: '',
        dt_data_vinculo: '',
        dt_data_final_vinculo: '',
        bo_conselheiro_ativo: true,
        bo_eh_governamental: true,
        id_conselho: ''
      }
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_conselho = urlParams.get('conselho');
    this.setState({
      filters: {
        ...this.state.filters,
        conselho: id_conselho || ''
      }
    });
    this.loadConselheiros(id_conselho);
    this.loadConselhos();
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
          conselhos: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselhos:', err);
      }.bind(this)
    });
  }
  openModal(conselheiro = null) {
    if (conselheiro) {
      this.setState({
        showModal: true,
        editingConselheiro: conselheiro,
        form: {
          tx_nome_conselheiro: conselheiro.tx_nome_conselheiro || '',
          tx_orgao_origem: conselheiro.tx_orgao_origem || '',
          cd_identificador_osc: conselheiro.cd_identificador_osc || '',
          dt_data_vinculo: conselheiro.dt_data_vinculo ? conselheiro.dt_data_vinculo.split(' ')[0] : '',
          dt_data_final_vinculo: conselheiro.dt_data_final_vinculo ? conselheiro.dt_data_final_vinculo.split(' ')[0] : '',
          bo_conselheiro_ativo: conselheiro.bo_conselheiro_ativo !== undefined ? conselheiro.bo_conselheiro_ativo : true,
          bo_eh_governamental: conselheiro.bo_eh_governamental !== undefined ? conselheiro.bo_eh_governamental : true,
          id_conselho: conselheiro.id_conselho || ''
        }
      });
    } else {
      this.setState({
        showModal: true,
        editingConselheiro: null,
        form: {
          tx_nome_conselheiro: '',
          tx_orgao_origem: '',
          cd_identificador_osc: '',
          dt_data_vinculo: '',
          dt_data_final_vinculo: '',
          bo_conselheiro_ativo: true,
          bo_eh_governamental: true,
          id_conselho: ''
        }
      });
    }
  }
  closeModal() {
    this.setState({
      showModal: false,
      editingConselheiro: null,
      form: {
        tx_nome_conselheiro: '',
        tx_orgao_origem: '',
        cd_identificador_osc: '',
        dt_data_vinculo: '',
        dt_data_final_vinculo: '',
        bo_conselheiro_ativo: true,
        bo_eh_governamental: true,
        id_conselho: ''
      }
    });
  }
  openDetailModal(conselheiro) {
    this.setState({
      showDetailModal: true,
      detailConselheiro: conselheiro
    });
  }
  closeDetailModal() {
    this.setState({
      showDetailModal: false,
      detailConselheiro: null
    });
  }
  handleFilterChange(field, value) {
    const newFilters = {
      ...this.state.filters,
      [field]: value
    };
    this.setState({
      filters: newFilters
    }, () => {
      this.applyFilters();
    });
  }
  applyFilters() {
    let filtered = this.state.conselheiros;
    if (this.state.filters.search) {
      filtered = filtered.filter(c => c.tx_nome_conselheiro.toLowerCase().includes(this.state.filters.search.toLowerCase()) || c.tx_orgao_origem.toLowerCase().includes(this.state.filters.search.toLowerCase()));
    }
    if (this.state.filters.conselho) {
      filtered = filtered.filter(c => c.id_conselho == this.state.filters.conselho);
    }
    if (this.state.filters.ativo !== '') {
      filtered = filtered.filter(c => c.bo_conselheiro_ativo == (this.state.filters.ativo === 'true'));
    }
    if (this.state.filters.governamental !== '') {
      filtered = filtered.filter(c => c.bo_eh_governamental == (this.state.filters.governamental === 'true'));
    }
    this.setState({
      filteredConselheiros: filtered
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
  saveConselheiro() {
    const url = this.state.editingConselheiro ? getBaseUrl2 + 'confocos/conselheiro/' + this.state.editingConselheiro.id_conselheiro : getBaseUrl2 + 'confocos/conselheiro';
    const method = this.state.editingConselheiro ? 'PUT' : 'POST';
    const formData = {
      ...this.state.form,
      dt_data_vinculo: this.state.form.dt_data_vinculo || null,
      dt_data_final_vinculo: this.state.form.dt_data_final_vinculo || null
    };
    $.ajax({
      method: method,
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData),
      success: function () {
        this.closeModal();
        this.loadConselheiros();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao salvar conselheiro:', err);
        alert('Erro ao salvar conselheiro');
      }.bind(this)
    });
  }
  loadConselheiros(id_conselho = null) {
    const url = id_conselho ? getBaseUrl2 + `confocos/conselheiro-por-conselho/${id_conselho}` : getBaseUrl2 + 'confocos/conselheiro';
    $.ajax({
      method: 'GET',
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          conselheiros: data || [],
          filteredConselheiros: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({
          loading: false
        });
      }.bind(this)
    });
  }
  deleteConselheiro(id) {
    if (confirm('Tem certeza que deseja excluir este conselheiro?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/conselheiro/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadConselheiros();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          alert('Erro ao excluir conselheiro');
        }
      });
    }
  }
  renderFilters() {
    return /*#__PURE__*/React.createElement("div", {
      className: "mb-3"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mb-3"
    }, "Filtros"), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Buscar por nome ou \xF3rg\xE3o...",
      value: this.state.filters.search,
      onChange: e => this.handleFilterChange('search', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.filters.conselho,
      onChange: e => this.handleFilterChange('conselho', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os conselhos"), this.state.conselhos.map(conselho => /*#__PURE__*/React.createElement("option", {
      key: conselho.id_conselho,
      value: conselho.id_conselho
    }, conselho.tx_nome_conselho)))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.filters.ativo,
      onChange: e => this.handleFilterChange('ativo', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os status"), /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Ativos"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "Inativos")))));
  }
  renderDetailModal() {
    if (!this.state.detailConselheiro) return null;
    const conselho = this.state.conselhos.find(c => c.id_conselho === this.state.detailConselheiro.id_conselho);
    return /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, "Detalhes do Conselheiro"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: () => this.closeDetailModal()
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "ID: "), this.state.detailConselheiro.id_conselheiro), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Nome: "), this.state.detailConselheiro.tx_nome_conselheiro)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "\xD3rg\xE3o de Origem: "), this.state.detailConselheiro.tx_orgao_origem || 'N/A'), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Conselho: "), conselho ? conselho.tx_nome_conselho : 'N/A')), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Data de V\xEDnculo: "), this.state.detailConselheiro.dt_data_vinculo ? new Date(this.state.detailConselheiro.dt_data_vinculo).toLocaleDateString('pt-BR') : 'N/A'), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Data Final de V\xEDnculo: "), this.state.detailConselheiro.dt_data_final_vinculo ? new Date(this.state.detailConselheiro.dt_data_final_vinculo).toLocaleDateString('pt-BR') : 'N/A')), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Status: "), /*#__PURE__*/React.createElement("span", {
      className: this.state.detailConselheiro.bo_conselheiro_ativo ? 'badge badge-success' : 'badge badge-danger'
    }, this.state.detailConselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo')), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("strong", null, "Tipo: "), /*#__PURE__*/React.createElement("span", {
      className: this.state.detailConselheiro.bo_eh_governamental ? 'badge badge-primary' : 'badge badge-secondary'
    }, this.state.detailConselheiro.bo_eh_governamental ? 'Governamental' : 'Não Governamental')))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => this.closeDetailModal()
    }, "Fechar")))));
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
    }, this.state.editingConselheiro ? 'Editar Conselheiro' : 'Novo Conselheiro'), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: () => this.closeModal()
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Nome"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_nome_conselheiro,
      onChange: e => this.handleInputChange('tx_nome_conselheiro', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "\xD3rg\xE3o de Origem"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_orgao_origem,
      onChange: e => this.handleInputChange('tx_orgao_origem', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Conselho"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.id_conselho,
      onChange: e => this.handleInputChange('id_conselho', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione um conselho"), this.state.conselhos.map(conselho => /*#__PURE__*/React.createElement("option", {
      key: conselho.id_conselho,
      value: conselho.id_conselho
    }, conselho.tx_nome_conselho)))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Data de V\xEDnculo"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      className: "form-control",
      value: this.state.form.dt_data_vinculo,
      onChange: e => this.handleInputChange('dt_data_vinculo', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Data Final de V\xEDnculo"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      className: "form-control",
      value: this.state.form.dt_data_final_vinculo,
      onChange: e => this.handleInputChange('dt_data_final_vinculo', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-check"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "form-check-input",
      checked: this.state.form.bo_conselheiro_ativo,
      onChange: e => this.handleInputChange('bo_conselheiro_ativo', e.target.checked)
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label"
    }, "Conselheiro Ativo"))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-check"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "form-check-input",
      checked: this.state.form.bo_eh_governamental,
      onChange: e => this.handleInputChange('bo_eh_governamental', e.target.checked)
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label"
    }, "\xC9 Governamental")))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => this.closeModal()
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: () => this.saveConselheiro()
    }, "Salvar")))));
  }
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, "Carregando...");
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("h2", null, "Meus conselheiros"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => this.openModal()
    }, "Novo Conselheiro"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-white p-4"
    }, this.renderFilters(), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-striped"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nome"), /*#__PURE__*/React.createElement("th", null, "\xD3rg\xE3o"), /*#__PURE__*/React.createElement("th", null, "Conselho"), /*#__PURE__*/React.createElement("th", null, "Ativo"), /*#__PURE__*/React.createElement("th", null, "Governamental"), /*#__PURE__*/React.createElement("th", null, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.filteredConselheiros.map(conselheiro => {
      const conselho = this.state.conselhos.find(c => c.id_conselho === conselheiro.id_conselho);
      return /*#__PURE__*/React.createElement("tr", {
        key: conselheiro.id_conselheiro
      }, /*#__PURE__*/React.createElement("td", null, conselheiro.tx_nome_conselheiro), /*#__PURE__*/React.createElement("td", null, conselheiro.tx_orgao_origem), /*#__PURE__*/React.createElement("td", null, conselho ? conselho.tx_nome_conselho : '-'), /*#__PURE__*/React.createElement("td", null, conselheiro.bo_conselheiro_ativo ? 'Sim' : 'Não'), /*#__PURE__*/React.createElement("td", null, conselheiro.bo_eh_governamental ? 'Sim' : 'Não'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-sm btn-info mr-1",
        onClick: () => this.openDetailModal(conselheiro)
      }, "Detalhes"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-sm btn-warning mr-1",
        onClick: () => this.openModal(conselheiro)
      }, "Editar"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-sm btn-danger",
        onClick: () => this.deleteConselheiro(conselheiro.id_conselheiro)
      }, "Excluir")));
    }))))), this.state.showModal && this.renderModal(), this.state.showDetailModal && this.renderDetailModal());
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Conselheiros, null), document.getElementById('conselheiros'));