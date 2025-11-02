class ConselhosPublicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselhos: [],
      conselheiros: [],
      filteredData: [],
      viewMode: 'cards',
      documentos: {},
      showConselheirosModal: false,
      selectedConselho: null,
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
    this.loadDocumentos = this.loadDocumentos.bind(this);
    this.showConselheirosModal = this.showConselheirosModal.bind(this);
    this.closeConselheirosModal = this.closeConselheirosModal.bind(this);
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

    // Load documents for each conselho
    conselhos.forEach(conselho => {
      this.loadDocumentos(conselho.id_conselho);
    });
    this.setState({
      filteredData: organized,
      stats,
      loading: false
    }, () => {
      this.applyFilters();
    });
  }
  loadDocumentos(conselhoId) {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/documento-por-conselho/' + conselhoId,
      cache: false,
      success: data => {
        this.setState({
          documentos: {
            ...this.state.documentos,
            [conselhoId]: data || []
          }
        });
      },
      error: (xhr, status, err) => {
        console.error('Erro ao carregar documentos:', err);
      }
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
      const searchTerm = this.state.filters.search.toLowerCase();
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.tx_nome_conselheiro && c.tx_nome_conselheiro.toLowerCase().includes(searchTerm) || c.tx_orgao_origem && c.tx_orgao_origem.toLowerCase().includes(searchTerm))
      })).filter(conselho => conselho.tx_nome_conselho && conselho.tx_nome_conselho.toLowerCase().includes(searchTerm) || conselho.conselheiros.length > 0);
    }
    if (this.state.filters.conselho) {
      filtered = filtered.filter(conselho => conselho.id_conselho == this.state.filters.conselho);
    }
    if (this.state.filters.ativo !== '') {
      const isActive = this.state.filters.ativo === 'true';
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.bo_conselheiro_ativo === isActive)
      }));
    }
    if (this.state.filters.governamental !== '') {
      const isGovernamental = this.state.filters.governamental === 'true';
      filtered = filtered.map(conselho => ({
        ...conselho,
        conselheiros: conselho.conselheiros.filter(c => c.bo_eh_governamental === isGovernamental)
      }));
    }
    this.setState({
      filteredData: filtered
    });
  }
  showConselheirosModal(conselho) {
    this.setState({
      selectedConselho: conselho,
      showConselheirosModal: true
    });
  }
  closeConselheirosModal() {
    this.setState({
      selectedConselho: null,
      showConselheirosModal: false
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
    const baseColor = '#3A559B';
    const {
      filteredData,
      documentos
    } = this.state;
    console.log('filteredData:::::::::::::', filteredData);
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, filteredData.map((conselho, index) => {
      const conselhoDocumentos = documentos[conselho.id_conselho] || [];
      const hasDocuments = conselhoDocumentos.length > 0;
      const hasWebsite = conselho.tx_website;
      const isActive = conselho.bo_conselho_ativo;
      return /*#__PURE__*/React.createElement("div", {
        key: conselho.id_conselho,
        className: "col-md-6 col-lg-4 mb-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "card h-100 shadow-sm border-0 position-relative overflow-hidden",
        style: {
          transition: 'all 0.3s ease'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "position-absolute w-100 h-100",
        style: {
          background: `linear-gradient(135deg, ${baseColor}05 0%, transparent 50%)`,
          zIndex: 1
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "position-absolute",
        style: {
          top: '15px',
          right: '15px',
          width: '60px',
          height: '60px',
          background: `linear-gradient(45deg, ${baseColor}10, ${baseColor}05)`,
          borderRadius: '50%',
          zIndex: 1
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "position-absolute",
        style: {
          bottom: '20px',
          left: '10px',
          width: '30px',
          height: '30px',
          background: `${baseColor}08`,
          borderRadius: '4px',
          transform: 'rotate(45deg)',
          zIndex: 1
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "card-header border-0 position-relative p-2",
        style: {
          background: `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}dd 100%)`,
          zIndex: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rounded-circle d-flex align-items-center justify-content-center",
        style: {
          width: '48px',
          height: '48px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-landmark text-white",
        style: {
          fontSize: '18px'
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "flex-grow-1",
        style: {
          paddingLeft: 8
        }
      }, /*#__PURE__*/React.createElement("h6", {
        className: "mb-1 text-white fw-bold",
        style: {
          fontSize: '14px'
        }
      }, conselho.tx_nome_conselho || 'Sem nome'), /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center justify-content-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-white",
        style: {
          opacity: 0.8,
          fontSize: '12px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users me-1"
      }), " \xA0", conselho.conselheiros.length, " membros"), isActive && /*#__PURE__*/React.createElement("span", {
        className: "ms-2 badge",
        style: {
          backgroundColor: '#FFFFFF',
          color: '#28a745',
          border: '1px solid rgba(40, 167, 69, 0.3)',
          fontSize: '10px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-check-circle me-1"
      }), "Ativo"))))), /*#__PURE__*/React.createElement("div", {
        className: "card-body px-3 py-3 position-relative",
        style: {
          zIndex: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "mb-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex flex-wrap gap-1"
      }, conselho.tx_nome_nivel_federativo && /*#__PURE__*/React.createElement("span", {
        className: "badge",
        style: {
          backgroundColor: `${baseColor}15`,
          color: baseColor,
          border: `1px solid ${baseColor}30`,
          fontSize: '10px',
          padding: '2px 6px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-layer-group me-1"
      }), conselho.tx_nome_nivel_federativo), conselho.tx_nome_abrangencia && /*#__PURE__*/React.createElement("span", {
        className: "badge",
        style: {
          backgroundColor: `${baseColor}15`,
          color: baseColor,
          border: `1px solid ${baseColor}30`,
          fontSize: '10px',
          padding: '2px 6px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-map-marker-alt me-1"
      }), conselho.tx_nome_abrangencia))), /*#__PURE__*/React.createElement("div", {
        className: "row g-1 mb-2"
      }, hasWebsite && /*#__PURE__*/React.createElement("div", {
        className: "col-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center p-2 rounded"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-2"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-globe",
        style: {
          color: baseColor,
          fontSize: '14px'
        }
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
        className: "text-muted d-block ",
        style: {
          fontSize: '9px',
          paddingLeft: 5
        }
      }, " Website")))), hasDocuments && /*#__PURE__*/React.createElement("div", {
        className: "col-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center p-2 rounded",
        style: {
          backgroundColor: '#f8f9fa'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-2"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-file-alt",
        style: {
          color: '#ffc107',
          fontSize: '14px'
        }
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
        className: "text-muted d-block",
        style: {
          fontSize: '9px'
        }
      }, "Documentos"), /*#__PURE__*/React.createElement("small", {
        className: "fw-medium",
        style: {
          fontSize: '10px'
        }
      }, conselhoDocumentos.length)))), conselho.tx_ato_legal && /*#__PURE__*/React.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-start p-2 rounded",
        style: {
          backgroundColor: '#f8f9fa'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex-grow-1"
      }, /*#__PURE__*/React.createElement("small", {
        className: "text-muted d-block",
        style: {
          fontSize: '9px'
        }
      }, "Ato Legal"), /*#__PURE__*/React.createElement("small", {
        className: "text-dark",
        style: {
          fontSize: '14px',
          lineHeight: '1.3'
        }
      }, conselho.tx_ato_legal.length > 60 ? conselho.tx_ato_legal.substring(0, 60) + '...' : conselho.tx_ato_legal))))), /*#__PURE__*/React.createElement("div", {
        className: "conselheiros-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center justify-content-between mb-2"
      }, /*#__PURE__*/React.createElement("small", {
        className: "text-muted fw-bold",
        style: {
          fontSize: '10px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users me-1",
        style: {
          color: baseColor
        }
      }), " \xA0 CONSELHEIROS"), conselho.conselheiros.length > 0 && /*#__PURE__*/React.createElement("button", {
        className: "btn btn-sm p-0 text-decoration-none",
        style: {
          color: baseColor,
          fontSize: '12px'
        },
        onClick: () => this.showConselheirosModal(conselho)
      }, "Ver todos (", conselho.conselheiros.length, ")")), conselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
        className: "text-center py-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rounded-circle d-inline-flex align-items-center justify-content-center mb-2",
        style: {
          width: '40px',
          height: '40px',
          backgroundColor: '#f8f9fa'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-user-slash text-muted",
        style: {
          fontSize: '16px'
        }
      })), /*#__PURE__*/React.createElement("small", {
        className: "text-muted d-block",
        style: {
          fontSize: '10px'
        }
      }, "Nenhum conselheiro")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "d-flex align-items-center mb-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex",
        style: {
          marginLeft: '0'
        }
      }, conselho.conselheiros.slice(0, 3).map((conselheiro, cIndex) => {
        const initial = conselheiro.tx_nome_conselheiro ? conselheiro.tx_nome_conselheiro.charAt(0).toUpperCase() : '?';
        return /*#__PURE__*/React.createElement("div", {
          key: conselheiro.id_conselheiro,
          className: "rounded-circle d-flex align-items-center justify-content-center border border-white",
          style: {
            width: '24px',
            height: '24px',
            backgroundColor: conselheiro.bo_conselheiro_ativo ? baseColor : '#6c757d',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            marginLeft: cIndex > 0 ? '-8px' : '0',
            zIndex: 10 - cIndex,
            position: 'relative'
          },
          title: conselheiro.tx_nome_conselheiro
        }, initial);
      }), conselho.conselheiros.length > 3 && /*#__PURE__*/React.createElement("div", {
        className: "rounded-circle d-flex align-items-center justify-content-center border border-white",
        style: {
          width: '24px',
          height: '24px',
          backgroundColor: '#e9ecef',
          color: '#6c757d',
          fontSize: '9px',
          fontWeight: 'bold',
          marginLeft: '-6px',
          zIndex: 5
        },
        title: `+${conselho.conselheiros.length - 3} conselheiros`
      }, "+", conselho.conselheiros.length - 3)), /*#__PURE__*/React.createElement("div", {
        className: "ms-3 flex-grow-1"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex gap-1"
      }, conselho.conselheiros.some(c => c.bo_eh_governamental) && /*#__PURE__*/React.createElement("span", {
        className: "badge badge-sm",
        style: {
          backgroundColor: '#17a2b815',
          color: '#17a2b8',
          fontSize: '12px',
          padding: '1px 4px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-university me-1"
      }), " Gov"), conselho.conselheiros.some(c => !c.bo_eh_governamental) && /*#__PURE__*/React.createElement("span", {
        className: "badge badge-sm",
        style: {
          backgroundColor: '#28a74515',
          color: '#28a745',
          fontSize: '12px',
          padding: '1px 4px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users me-1"
      }), " Civil"))))))), /*#__PURE__*/React.createElement("div", {
        className: "card-footer bg-light border-0 position-relative",
        style: {
          zIndex: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-between align-items-center"
      }, hasWebsite && /*#__PURE__*/React.createElement("a", {
        href: `http://${conselho.tx_website}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "btn btn-sm rounded-pill px-3",
        style: {
          backgroundColor: baseColor,
          color: 'white',
          fontSize: '10px',
          border: 'none',
          padding: '4px 8px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-external-link-alt me-1"
      }), " \xA0 Visitar")))));
    }));
  }
  renderList() {
    return /*#__PURE__*/React.createElement("div", {
      className: "list-view-modern"
    }, this.state.filteredData.map((conselho, index) => /*#__PURE__*/React.createElement("div", {
      key: `list-${conselho.id_conselho}-${index}`,
      className: "card mb-4 shadow-sm border-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header bg-white border-bottom-0 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "conselho-icon mr-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-primary rounded-circle d-flex align-items-center justify-content-center",
      style: {
        width: '40px',
        height: '40px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-building text-white"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1 text-dark font-weight-bold"
    }, conselho.tx_nome_conselho), /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap align-items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-light border mr-2 mb-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users mr-1"
    }), conselho.conselheiros.length), this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "badge badge-light border mr-2 mb-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-file-alt mr-1"
    }), this.state.documentos[conselho.id_conselho].length), /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'} mb-1`
    }, conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'))))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4 text-right"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-end align-items-center"
    }, conselho.tx_website && /*#__PURE__*/React.createElement("a", {
      href: `http://${conselho.tx_website}`,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn btn-outline-secondary btn-sm rounded-pill mr-2",
      title: "Visitar website"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-external-link-alt mr-1"
    }), "Site"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-sm rounded-pill px-3",
      type: "button",
      "data-toggle": "collapse",
      "data-target": `#collapse${index}`,
      title: "Ver detalhes do conselho"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-eye mr-1"
    }), "Detalhes"))))), /*#__PURE__*/React.createElement("div", {
      id: `collapse${index}`,
      className: "collapse"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body bg-light"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "col-lg-4 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "documents-section"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "text-secondary mb-3 font-weight-bold"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-folder-open mr-2 text-primary"
    }), "Documentos"), /*#__PURE__*/React.createElement("div", {
      className: "documents-grid"
    }, this.state.documentos[conselho.id_conselho].map(doc => /*#__PURE__*/React.createElement("div", {
      key: doc.id_documento_conselho,
      className: "document-item bg-white rounded p-3 mb-2 shadow-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "document-icon mr-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-primary rounded d-flex align-items-center justify-content-center",
      style: {
        width: '32px',
        height: '32px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-file-alt text-white",
      style: {
        fontSize: '14px'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex-grow-1"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mb-1 text-truncate",
      title: doc.tx_titulo_documento
    }, doc.tx_titulo_documento), /*#__PURE__*/React.createElement("small", {
      className: "text-muted d-block"
    }, doc.tx_tipo_arquivo, " \u2022 ", new Date(doc.dt_data_cadastro).toLocaleDateString())))))))), /*#__PURE__*/React.createElement("div", {
      className: `${this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 ? 'col-lg-8' : 'col-lg-12'} px-0`
    }, /*#__PURE__*/React.createElement("div", {
      className: "conselheiros-section"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "text-secondary mb-3 font-weight-bold px-3"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users mr-2 text-primary"
    }), "Conselheiros"), conselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "empty-state text-center py-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3",
      style: {
        width: '60px',
        height: '60px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-2x text-muted"
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-muted mb-0"
    }, "Nenhum conselheiro cadastrado")) : /*#__PURE__*/React.createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-hover mb-0 w-100"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "bg-white"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "border-0 font-weight-bold text-secondary",
      style: {
        width: '60%'
      }
    }, "Nome"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 font-weight-bold text-secondary",
      style: {
        width: '40%'
      }
    }, "\xD3rg\xE3o"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 font-weight-bold text-secondary"
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 font-weight-bold text-secondary"
    }, "Tipo"))), /*#__PURE__*/React.createElement("tbody", null, conselho.conselheiros.map((conselheiro, cIndex) => /*#__PURE__*/React.createElement("tr", {
      key: `table-${conselheiro.id_conselheiro}-${cIndex}`,
      className: "border-bottom"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-weight-medium text-dark"
    }, conselheiro.tx_nome_conselheiro || 'Sem nome')), /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, conselheiro.tx_orgao_origem || '-')), /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'}`
    }, conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo')), /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_eh_governamental ? 'badge-secondary' : 'badge-outline-secondary'}`
    }, conselheiro.bo_eh_governamental ? 'Governamental' : 'Não Governamental')))))))))))))));
  }
  renderConselheirosModal() {
    const {
      selectedConselho,
      showConselheirosModal
    } = this.state;
    const baseColor = '#3A559B';
    if (!showConselheirosModal || !selectedConselho) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal fade show",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      onClick: this.closeConselheirosModal
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg modal-dialog-scrollable",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header",
      style: {
        backgroundColor: baseColor,
        color: 'white'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users me-2 fa-3x",
      style: {
        marginRight: 10
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      style: {
        color: '#FFFFFF'
      }
    }, /*#__PURE__*/React.createElement("strong", null, selectedConselho.tx_nome_conselho)), /*#__PURE__*/React.createElement("small", {
      style: {
        opacity: 0.8
      }
    }, selectedConselho.conselheiros.length, " conselheiros"))), /*#__PURE__*/React.createElement("div", {
      type: "button",
      className: "btn-close btn-close-white",
      onClick: this.closeConselheirosModal
    })), /*#__PURE__*/React.createElement("div", {
      className: "modal-body p-0"
    }, selectedConselho.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "text-center py-5"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-3x text-muted mb-3"
    }), /*#__PURE__*/React.createElement("h6", {
      className: "text-muted"
    }, "Nenhum conselheiro cadastrado")) : /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-hover mb-0"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "bg-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "border-0 fw-bold text-secondary",
      style: {
        fontSize: '12px',
        width: '60%'
      }
    }, "Nome"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 fw-bold text-secondary",
      style: {
        fontSize: '12px',
        width: '40%'
      }
    }, "\xD3rg\xE3o"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 fw-bold text-secondary text-center",
      style: {
        fontSize: '12px'
      }
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      className: "border-0 fw-bold text-secondary text-center",
      style: {
        fontSize: '12px'
      }
    }, "Tipo"))), /*#__PURE__*/React.createElement("tbody", null, selectedConselho.conselheiros.map((conselheiro, index) => /*#__PURE__*/React.createElement("tr", {
      key: conselheiro.id_conselheiro
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "me-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-circle d-flex align-items-center justify-content-center",
      style: {
        width: '32px',
        height: '32px',
        backgroundColor: conselheiro.bo_conselheiro_ativo ? baseColor : '#6c757d',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        marginRight: 10
      }
    }, conselheiro.tx_nome_conselheiro ? conselheiro.tx_nome_conselheiro.charAt(0).toUpperCase() : '?')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "fw-medium text-dark",
      style: {
        fontSize: '13px'
      }
    }, conselheiro.tx_nome_conselheiro || 'Sem nome')))), /*#__PURE__*/React.createElement("td", {
      className: "py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-muted",
      style: {
        fontSize: '12px'
      }
    }, conselheiro.tx_orgao_origem || '-')), /*#__PURE__*/React.createElement("td", {
      className: "py-3 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_conselheiro_ativo ? 'bg-success' : 'bg-secondary'}`,
      style: {
        fontSize: '10px',
        color: "#FFFFFF"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `fas ${conselheiro.bo_conselheiro_ativo ? 'fa-check-circle' : 'fa-pause-circle'} me-1`
    }), conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo')), /*#__PURE__*/React.createElement("td", {
      className: "py-3 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselheiro.bo_eh_governamental ? 'bg-info' : 'bg-success'}`,
      style: {
        fontSize: '10px',
        color: "#FFFFFF"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `fas ${conselheiro.bo_eh_governamental ? 'fa-university' : 'fa-users'} me-1`
    }), conselheiro.bo_eh_governamental ? 'Governamental' : 'Civil')))))))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer bg-light"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center w-100"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-info-circle me-1"
    }), " \xA0", selectedConselho.conselheiros.filter(c => c.bo_conselheiro_ativo).length, " ativos de ", selectedConselho.conselheiros.length, " total"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary btn-sm",
      onClick: this.closeConselheirosModal
    }, "Fechar"))))));
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
    }, this.state.filteredData.length, " conselho(s) encontrado(s)")), this.state.viewMode === 'cards' ? this.renderCards() : this.renderList())), this.renderConselheirosModal());
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(ConselhosPublicos, null), document.getElementById('conselhos-publicos'));