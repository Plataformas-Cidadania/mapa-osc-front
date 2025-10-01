class Daschboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totais: []
    };
    this.list = this.list.bind(this);
  }
  componentDidMount() {
    this.list();
  }
  list() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: '/dashboard-status',
      data: {},
      cache: false,
      success: function (data) {
        console.log(data);
        this.setState({
          totais: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        //this.setState({loadingList: false});
      }.bind(this)
    });
  }
  render() {
    let totais = this.state.totais.map(function (total, index) {
      return /*#__PURE__*/React.createElement("div", {
        className: "col-md-3 text-center",
        key: "totais_" + index,
        style: {
          marginBottom: '30px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn btn-default box-item-area"
      }, /*#__PURE__*/React.createElement("h2", null, total.qtdTotal), /*#__PURE__*/React.createElement("p", null, total.status)));
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-home",
      "aria-hidden": "true"
    }), " Minha \xE1rea"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("p", null, "Ol\xE1 tudo bem! Estamos sentindo sua falta."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-border"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Total de OSCs"), /*#__PURE__*/React.createElement("h2", null, "20"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-border"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Total de projetos"), /*#__PURE__*/React.createElement("h2", null, "10"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-border"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Total de certificados"), /*#__PURE__*/React.createElement("h2", null, "30"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "box-border"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "QTD: 2"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "OSC"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "\xDAltimos 30 dias"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Total"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, "1"), /*#__PURE__*/React.createElement("td", null, "ASSOCIACAO CULTURAL PISADA DO SERTAO"), /*#__PURE__*/React.createElement("td", null, "825"), /*#__PURE__*/React.createElement("td", null, "3025")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, "2"), /*#__PURE__*/React.createElement("td", null, "ASSOCIACAO CULTURAL PISADA DO SERTAO"), /*#__PURE__*/React.createElement("td", null, "825"), /*#__PURE__*/React.createElement("td", null, "3025")))))), totais), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Daschboard, {
  id: id
}), document.getElementById('dashboard'));