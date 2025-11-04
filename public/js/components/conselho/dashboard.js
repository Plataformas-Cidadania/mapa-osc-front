class DashboardConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: {
        totalConselhos: 0,
        totalConselheiros: 0
      },
      representacoes: [],
      showModalAdd: false,
      search: '',
      todosConselhos: [],
      conselhosSearch: [],
      loadingSearch: false,
      nivelFederativo: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.addConselho = this.addConselho.bind(this);
    this.removeRepresentacao = this.removeRepresentacao.bind(this);
    this.loadTodosConselhos = this.loadTodosConselhos.bind(this);
  }
  componentDidMount() {
    this.loadStats();
    this.loadRepresentacoes();
    this.loadNivelFederativo();
  }
  loadStats() {
    this.loadConselhos();
    this.loadConselheiros();
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
        console.log('Conselhos data:', data);
        this.setState({
          stats: {
            ...this.state.stats,
            totalConselhos: Array.isArray(data) ? data.length : 0
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselhos:', err);
      }.bind(this)
    });
  }
  loadConselheiros() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/conselheiro',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        console.log('Conselheiros data:', data);
        this.setState({
          loading: false,
          stats: {
            ...this.state.stats,
            totalConselheiros: Array.isArray(data) ? data.length : 0
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselheiros:', err);
        this.setState({
          loading: false
        });
      }.bind(this)
    });
  }
  loadRepresentacoes() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/representacao_conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        console.log('Representações conselho:', data);
        this.setState({
          representacoes: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar representações:', err);
      }.bind(this)
    });
  }
  handleSearch(e) {
    const val = e.target.value.toLowerCase();
    this.setState({
      search: val
    });
    if (val.length >= 2) {
      const filtered = this.state.todosConselhos.filter(conselho => conselho.tx_nome_conselho.toLowerCase().includes(val));
      this.setState({
        conselhosSearch: filtered
      });
    } else {
      this.setState({
        conselhosSearch: []
      });
    }
  }
  loadTodosConselhos() {
    this.setState({
      loadingSearch: true
    });
    $.ajax({
      method: 'GET',
      url: 'https://mapaosc.ipea.gov.br/api/api/confocos/conselho',
      cache: false,
      success: function (data) {
        console.log('Todos conselhos:', data);
        this.setState({
          todosConselhos: data || [],
          loadingSearch: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar todos conselhos:', err);
        this.setState({
          loadingSearch: false
        });
      }.bind(this)
    });
  }
  addConselho(id_conselho) {
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'confocos/representacao_conselho',
      data: {
        id_conselho
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      success: function () {
        this.setState({
          showModalAdd: false,
          search: '',
          conselhosSearch: [],
          todosConselhos: []
        });
        this.loadRepresentacoes();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao adicionar conselho:', err);
        alert('Erro ao adicionar conselho');
      }.bind(this)
    });
  }
  removeRepresentacao(id) {
    if (confirm('Tem certeza que deseja remover esta representação?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/representacao_conselho/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadRepresentacoes();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error('Erro ao remover representação:', err);
          alert('Erro ao remover representação');
        }.bind(this)
      });
    }
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
  getNivelFederativoName(codigo) {
    const nivel = this.state.nivelFederativo.find(n => n.cd_nivel_federativo == codigo);
    return nivel ? nivel.tx_nome_nivel_federativo : null;
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users"
    }), " Meus conselheiros"), /*#__PURE__*/React.createElement("p", null, "Nessa \xE1rea voc\xEA pode gerenciar seus conselheiros"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary float-right",
      onClick: () => {
        this.setState({
          showModalAdd: true
        });
        this.loadTodosConselhos();
      },
      style: {
        marginTop: '-80px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-plus"
    }), " Adicionar Conselho"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nome do Conselho"), /*#__PURE__*/React.createElement("th", {
      width: "150"
    }, "N. Federativo"), /*#__PURE__*/React.createElement("th", {
      className: "text-center"
    }, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.representacoes.map((item, index) => /*#__PURE__*/React.createElement("tr", {
      key: item.id_representacao_conselho
    }, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, index + 1), /*#__PURE__*/React.createElement("td", {
      width: "500"
    }, item.conselho?.tx_nome_conselho || 'N/A'), /*#__PURE__*/React.createElement("td", null, this.getNivelFederativoName(item.conselho?.cd_nivel_federativo) || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "text-right",
      width: "300"
    }, /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary"
    }, /*#__PURE__*/React.createElement("a", {
      href: `conselheiro?conselho=${item.conselho?.id_conselho}`
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-users"
    }), " Conselheiros")), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn btn-danger",
      onClick: () => this.removeRepresentacao(item.conselho?.id_conselho)
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-trash"
    })))))))))), this.state.showModalAdd && /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1050
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, "Adicione um Conselho"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: () => this.setState({
        showModalAdd: false,
        search: '',
        conselhosSearch: [],
        todosConselhos: []
      })
    }, /*#__PURE__*/React.createElement("span", null, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control mb-3",
      placeholder: "Digite o nome do conselho para filtrar...",
      onChange: this.handleSearch,
      value: this.state.search
    }), this.state.loadingSearch && /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-spinner fa-spin"
    }), " Carregando conselhos..."), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }
    }, (this.state.search ? this.state.conselhosSearch : this.state.todosConselhos).map(item => /*#__PURE__*/React.createElement("div", {
      key: item.id_conselho,
      className: "p-3 border-bottom",
      onClick: () => this.addConselho(item.id_conselho),
      style: {
        cursor: 'pointer',
        backgroundColor: '#f8f9fa'
      }
    }, /*#__PURE__*/React.createElement("strong", null, item.tx_nome_conselho), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Ato Legal: ", item.tx_ato_legal || 'N/A', " | Website: ", item.tx_website || 'N/A'))), !this.state.loadingSearch && this.state.todosConselhos.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "text-center p-3"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-info-circle"
    }), " Nenhum conselho encontrado")))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(DashboardConselho, null), document.getElementById('dashboard-conselho'));