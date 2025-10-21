class DashboardConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: {
        totalConselhos: 0,
        totalConselheiros: 0,
        meusConselhos: 0
      }
    };
  }
  componentDidMount() {
    this.loadStats();
  }
  loadStats() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'api/representacao_conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          stats: {
            ...this.state.stats,
            meusConselhos: data.length || 0
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar representações:', status, err.toString());
        this.setState({
          loading: false,
          stats: {
            totalConselhos: 0,
            totalConselheiros: 0,
            meusConselhos: 0
          }
        });
      }.bind(this)
    });
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
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card bg-primary text-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", null, "Meus Conselhos"), /*#__PURE__*/React.createElement("h2", null, this.state.stats.meusConselhos)))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card bg-success text-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", null, "Total Conselheiros"), /*#__PURE__*/React.createElement("h2", null, this.state.stats.totalConselheiros)))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card bg-info text-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", null, "Total Conselhos"), /*#__PURE__*/React.createElement("h2", null, this.state.stats.totalConselhos))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("a", {
      href: "conselho",
      className: "btn btn-primary btn-block"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users"
    }), " Gerenciar Conselhos")), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("a", {
      href: "conselheiro",
      className: "btn btn-success btn-block"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-user-tie"
    }), " Gerenciar Conselheiros"))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(DashboardConselho, null), document.getElementById('dashboard-conselho'));