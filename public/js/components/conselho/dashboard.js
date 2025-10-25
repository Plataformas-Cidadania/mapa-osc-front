class DashboardConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stats: {
        totalConselhos: 0,
        totalConselheiros: 0
      }
    };
  }
  componentDidMount() {
    this.loadStats();
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
        console.log('Conselhos length:', data ? data.length : 0);
        this.setState({
          stats: {
            ...this.state.stats,
            totalConselhos: Array.isArray(data) ? data.length : 0
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselhos:', status, err.toString());
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
        console.log('Conselheiros length:', data ? data.length : 0);
        this.setState({
          loading: false,
          stats: {
            ...this.state.stats,
            totalConselheiros: Array.isArray(data) ? data.length : 0
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselheiros:', status, err.toString());
        this.setState({
          loading: false
        });
      }.bind(this)
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card  ",
      style: {
        border: 0,
        background: "#F8F8F8",
        boxShadow: '0 0 3px #FFFFFF'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body text-center"
    }, /*#__PURE__*/React.createElement("h5", null, "Total de Conselhos"), /*#__PURE__*/React.createElement("h2", null, this.state.stats.totalConselhos), /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users fa-2x"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card ",
      style: {
        border: 0,
        background: "#F8F8F8",
        boxShadow: '0 0 3px #FFFFFF'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body text-center"
    }, /*#__PURE__*/React.createElement("h5", null, "Total de Conselheiros"), /*#__PURE__*/React.createElement("h2", null, this.state.stats.totalConselheiros), /*#__PURE__*/React.createElement("i", {
      className: "fas fa-user-tie fa-2x"
    }))))), /*#__PURE__*/React.createElement("br", null));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(DashboardConselho, null), document.getElementById('dashboard-conselho'));