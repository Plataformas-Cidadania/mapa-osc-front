class ConselhosPublicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselhos: [],
      conselheiros: [],
      filteredData: [],
      filters: {
        search: '',
        conselho: '',
        ativo: ''
      }
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    Promise.all([this.loadConselhos(), this.loadConselheiros()]).then(() => {
      this.organizeData();
    });
  }
  loadConselhos() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: getBaseUrl2 + 'confocos/conselho',
        cache: false,
        success: data => {
          this.setState({
            conselhos: data || []
          });
          resolve(data);
        },
        error: (xhr, status, err) => {
          console.error('Erro ao carregar conselhos:', err);
          reject(err);
        }
      });
    });
  }
  loadConselheiros() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: getBaseUrl2 + 'confocos/conselheiro',
        cache: false,
        success: data => {
          this.setState({
            conselheiros: data || []
          });
          resolve(data);
        },
        error: (xhr, status, err) => {
          console.error('Erro ao carregar conselheiros:', err);
          reject(err);
        }
      });
    });
  }
  organizeData() {
    const {
      conselhos,
      conselheiros
    } = this.state;
    const organized = conselhos.map(conselho => ({
      ...conselho,
      conselheiros: conselheiros.filter(c => c.id_conselho === conselho.id_conselho)
    }));
    this.setState({
      filteredData: organized,
      loading: false
    }, () => {
      this.applyFilters();
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
    let filtered = this.state.conselhos.map(conselho => ({
      ...conselho,
      conselheiros: this.state.conselheiros.filter(c => c.id_conselho === conselho.id_conselho)
    }));
    if (this.state.filters.search) {
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.tx_nome_conselheiro.toLowerCase().includes(this.state.filters.search.toLowerCase()) || c.tx_orgao_origem.toLowerCase().includes(this.state.filters.search.toLowerCase()))
      })).filter(conselho => conselho.tx_nome_conselho.toLowerCase().includes(this.state.filters.search.toLowerCase()) || conselho.conselheiros.length > 0);
    }
    if (this.state.filters.conselho) {
      filtered = filtered.filter(conselho => conselho.id_conselho == this.state.filters.conselho);
    }
    if (this.state.filters.ativo !== '') {
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.bo_conselheiro_ativo == (this.state.filters.ativo === 'true'))
      }));
    }
    this.setState({
      filteredData: filtered
    });
  }
  renderFilters() {
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white p-4 mb-4 border-bottom"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Buscar por nome ou \xF3rg\xE3o...",
      value: this.state.filters.search,
      onChange: e => this.handleFilterChange('search', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
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
      className: "col-md-4"
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
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-center py-5"
      }, /*#__PURE__*/React.createElement("div", {
        className: "spinner-border",
        role: "status"
      }, /*#__PURE__*/React.createElement("span", {
        className: "sr-only"
      }, "Carregando..."))));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-3 px-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "mb-0"
    }, "Conselhos")), this.renderFilters(), /*#__PURE__*/React.createElement("div", {
      className: "bg-white p-4"
    }, this.state.filteredData.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "text-center py-5"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "text-muted"
    }, "Nenhum conselho encontrado")) : this.state.filteredData.map(conselho => /*#__PURE__*/React.createElement("div", {
      key: conselho.id_conselho,
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "border-left border-primary pl-3 mb-3"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1"
    }, conselho.tx_nome_conselho), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, conselho.conselheiros.length, " conselheiro(s)")), conselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "ml-4 text-muted"
    }, /*#__PURE__*/React.createElement("small", null, "Nenhum conselheiro cadastrado")) : /*#__PURE__*/React.createElement("div", {
      className: "ml-4"
    }, conselho.conselheiros.map(conselheiro => /*#__PURE__*/React.createElement("div", {
      key: conselheiro.id_conselheiro,
      className: "border-bottom py-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, conselheiro.tx_nome_conselheiro), conselheiro.tx_orgao_origem && /*#__PURE__*/React.createElement("div", {
      className: "text-muted small"
    }, conselheiro.tx_orgao_origem)), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} mr-2`
    }, conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'), /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_eh_governamental ? 'badge-primary' : 'badge-light'}`
    }, conselheiro.bo_eh_governamental ? 'Governamental' : 'Não Governamental'))))))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(ConselhosPublicos, null), document.getElementById('conselhos-publicos'));