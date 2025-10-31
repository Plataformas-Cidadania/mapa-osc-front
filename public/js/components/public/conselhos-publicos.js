class ConselhosPublicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselhos: [],
      conselheiros: [],
      filteredData: [],
      viewMode: 'cards',
      stats: {
        totalConselhos: 0,
        totalConselheiros: 0,
        conselheirosAtivos: 0,
        conselheirosGovernamentais: 0
      },
      filters: {
        search: '',
        conselho: '',
        ativo: '',
        governamental: ''
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
    const stats = {
      totalConselhos: conselhos.length,
      totalConselheiros: conselheiros.length,
      conselheirosAtivos: conselheiros.filter(c => c.bo_conselheiro_ativo).length,
      conselheirosGovernamentais: conselheiros.filter(c => c.bo_eh_governamental).length
    };
    this.setState({
      filteredData: organized,
      stats,
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
    if (this.state.filters.governamental !== '') {
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.bo_eh_governamental == (this.state.filters.governamental === 'true'))
      }));
    }
    this.setState({
      filteredData: filtered
    });
  }
  renderHero() {
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "display-4 mb-3 text-dark"
    }, "Conselhos P\xFAblicos"), /*#__PURE__*/React.createElement("p", {
      className: "lead mb-0 text-muted"
    }, "Transpar\xEAncia e participa\xE7\xE3o social atrav\xE9s dos conselhos e seus conselheiros")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4 text-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-5x text-muted",
      style: {
        opacity: 0.3
      }
    })))));
  }
  renderStats() {
    const {
      stats
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-light py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-0 bg-white shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-building fa-2x text-secondary mb-2"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-dark mb-1"
    }, stats.totalConselhos), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Conselhos")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-0 bg-white shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-2x text-secondary mb-2"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-dark mb-1"
    }, stats.totalConselheiros), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Conselheiros")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-0 bg-white shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check-circle fa-2x text-success mb-2"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-dark mb-1"
    }, stats.conselheirosAtivos), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Ativos")))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-0 bg-white shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-university fa-2x text-secondary mb-2"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-dark mb-1"
    }, stats.conselheirosGovernamentais), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Governamentais")))))));
  }
  renderFilters() {
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white shadow-sm py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row align-items-end mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label mb-1"
    }, "Buscar"), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group-prepend"
    }, /*#__PURE__*/React.createElement("span", {
      className: "input-group-text"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search"
    }))), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Nome ou \xF3rg\xE3o...",
      value: this.state.filters.search,
      onChange: e => this.handleFilterChange('search', e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label mb-1"
    }, "Conselho"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.filters.conselho,
      onChange: e => this.handleFilterChange('conselho', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos"), this.state.conselhos.map(conselho => /*#__PURE__*/React.createElement("option", {
      key: conselho.id_conselho,
      value: conselho.id_conselho
    }, conselho.tx_nome_conselho)))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label mb-1"
    }, "Status"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.filters.ativo,
      onChange: e => this.handleFilterChange('ativo', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos"), /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Ativos"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "Inativos"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label mb-1"
    }, "Tipo"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.filters.governamental,
      onChange: e => this.handleFilterChange('governamental', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos"), /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Governamental"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "N\xE3o Governamental"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label mb-1"
    }, "Visualiza\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
      className: "btn-group w-100",
      role: "group"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `btn ${this.state.viewMode === 'cards' ? 'btn-primary' : 'btn-outline-primary'}`,
      onClick: () => this.setState({
        viewMode: 'cards'
      })
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-th"
    }), " Cards"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `btn ${this.state.viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`,
      onClick: () => this.setState({
        viewMode: 'list'
      })
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-list"
    }), " Lista"))))));
  }
  renderCards() {
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, this.state.filteredData.map(conselho => /*#__PURE__*/React.createElement("div", {
      key: conselho.id_conselho,
      className: "col-md-6 col-lg-4 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card h-100 shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header bg-light border-bottom"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mb-0 text-dark"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-building mr-2 text-secondary"
    }), conselho.tx_nome_conselho)), /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-light border"
    }, conselho.conselheiros.length, " conselheiro(s)"), /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`
    }, conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo')), conselho.tx_ato_legal && /*#__PURE__*/React.createElement("div", {
      className: "mb-2"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-muted d-block"
    }, "Ato Legal:"), /*#__PURE__*/React.createElement("small", null, conselho.tx_ato_legal)), conselho.tx_website && /*#__PURE__*/React.createElement("div", {
      className: "mb-2"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-muted d-block"
    }, "Website:"), /*#__PURE__*/React.createElement("a", {
      href: `http://${conselho.tx_website}`,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "small text-primary"
    }, conselho.tx_website)), /*#__PURE__*/React.createElement("div", {
      className: "mt-3"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-muted d-block mb-2"
    }, "Conselheiros:"), conselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Nenhum conselheiro cadastrado") : /*#__PURE__*/React.createElement("div", {
      className: "conselheiros-preview"
    }, conselho.conselheiros.slice(0, 3).map(conselheiro => /*#__PURE__*/React.createElement("div", {
      key: conselheiro.id_conselheiro,
      className: "d-flex justify-content-between align-items-center py-1 border-bottom"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-truncate mr-2"
    }, conselheiro.tx_nome_conselheiro), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `badge badge-sm ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} mr-1`
    }, conselheiro.bo_conselheiro_ativo ? 'A' : 'I'), /*#__PURE__*/React.createElement("span", {
      className: `badge badge-sm ${conselheiro.bo_eh_governamental ? 'badge-secondary' : 'badge-light border'}`
    }, conselheiro.bo_eh_governamental ? 'G' : 'NG')))), conselho.conselheiros.length > 3 && /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "... e mais ", conselho.conselheiros.length - 3, " conselheiro(s)"))))))));
  }
  renderList() {
    return /*#__PURE__*/React.createElement("div", {
      className: "accordion",
      id: "conselhosAccordion"
    }, this.state.filteredData.map((conselho, index) => /*#__PURE__*/React.createElement("div", {
      key: conselho.id_conselho,
      className: "card mb-3 border-0 shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header bg-light",
      id: `heading${index}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h6", {
      className: "mb-0"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-link text-decoration-none p-0 text-left text-dark",
      type: "button",
      "data-toggle": "collapse",
      "data-target": `#collapse${index}`
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-building text-secondary mr-2"
    }), conselho.tx_nome_conselho)), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, conselho.conselheiros.length, " conselheiro(s)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'} mr-2`
    }, conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'), /*#__PURE__*/React.createElement("i", {
      className: "fas fa-chevron-down"
    })))), /*#__PURE__*/React.createElement("div", {
      id: `collapse${index}`,
      className: "collapse",
      "data-parent": "#conselhosAccordion"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, conselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "text-center text-muted py-3"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-2x mb-2"
    }), /*#__PURE__*/React.createElement("p", {
      className: "mb-0"
    }, "Nenhum conselheiro cadastrado")) : /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, conselho.conselheiros.map(conselheiro => /*#__PURE__*/React.createElement("div", {
      key: conselheiro.id_conselheiro,
      className: "col-md-6 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-left border-left-secondary"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body py-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-start"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h6", {
      className: "mb-1"
    }, conselheiro.tx_nome_conselheiro), conselheiro.tx_orgao_origem && /*#__PURE__*/React.createElement("small", {
      className: "text-muted d-block"
    }, conselheiro.tx_orgao_origem)), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} d-block mb-1`
    }, conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'), /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_eh_governamental ? 'badge-secondary' : 'badge-light border'}`
    }, conselheiro.bo_eh_governamental ? 'Gov.' : 'Não Gov.')))))))))))));
  }
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "bg-white py-5"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container text-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "spinner-border text-secondary",
        role: "status"
      }, /*#__PURE__*/React.createElement("span", {
        className: "sr-only"
      }, "Carregando...")), /*#__PURE__*/React.createElement("p", {
        className: "mt-3 mb-0 text-muted"
      }, "Carregando conselhos..."))));
    }
    return /*#__PURE__*/React.createElement("div", null, this.renderHero(), this.renderStats(), this.renderFilters(), /*#__PURE__*/React.createElement("div", {
      className: "container py-4"
    }, this.state.filteredData.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "text-center py-5"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search fa-3x text-muted mb-3"
    }), /*#__PURE__*/React.createElement("h5", {
      className: "text-muted"
    }, "Nenhum conselho encontrado"), /*#__PURE__*/React.createElement("p", {
      className: "text-muted"
    }, "Tente ajustar os filtros para encontrar o que procura")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center mb-4"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-0"
    }, this.state.filteredData.length, " conselho(s) encontrado(s)")), this.state.viewMode === 'cards' ? this.renderCards() : this.renderList())));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(ConselhosPublicos, null), document.getElementById('conselhos-publicos'));