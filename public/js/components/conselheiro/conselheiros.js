class Conselheiros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselheiros: [],
      showModal: false,
      editingConselheiro: null
    };
  }
  componentDidMount() {
    this.loadConselheiros();
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
        this.setState({
          loading: false,
          conselheiros: data || []
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
        url: getBaseUrl2 + 'conselheiro/' + id,
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
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-spinner fa-spin"
      }), " Carregando...");
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between mb-3"
    }, /*#__PURE__*/React.createElement("h5", null, "Conselheiros"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => this.setState({
        showModal: true,
        editingConselheiro: null
      })
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus"
    }), " Novo Conselheiro")), this.state.conselheiros.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "alert alert-info"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-info-circle"
    }), " Nenhum conselheiro encontrado.") : /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-striped"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nome"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.conselheiros.map(conselheiro => /*#__PURE__*/React.createElement("tr", {
      key: conselheiro.id
    }, /*#__PURE__*/React.createElement("td", null, conselheiro.id), /*#__PURE__*/React.createElement("td", null, conselheiro.nome || 'N/A'), /*#__PURE__*/React.createElement("td", null, conselheiro.email || 'N/A'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-info mr-2",
      onClick: () => this.viewConselheiro(conselheiro.id)
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-eye"
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-warning mr-2",
      onClick: () => this.setState({
        showModal: true,
        editingConselheiro: conselheiro
      })
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-edit"
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-danger",
      onClick: () => this.deleteConselheiro(conselheiro.id)
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-trash"
    })))))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Conselheiros, null), document.getElementById('conselheiros'));