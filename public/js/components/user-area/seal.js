class Seal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      osc: {},
      loading: false
    };
    this.list = this.list.bind(this);
  }
  componentDidMount() {
    this.list();
  }
  list() {
    this.setState({
      loading: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/cabecalho/' + this.props.id_osc,
      cache: false,
      success: function (data) {
        //console.log(data);
        this.setState({
          osc: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        //this.setState({loadingList: false});
      }.bind(this)
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-home",
      "aria-hidden": "true"
    }), " Certificado para seu site"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("p", null, "Essa \xE1rea cont\xE9m o c\xF3digo de um certificado para ambientes virtuais que identifica que sua institui\xE7\xE3o se encontra em nosso banco de dados. Copie o script e cole em seu site."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, this.state.osc.tx_razao_social_osc)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float-tx"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "form-control form-g",
      name: "tx_historico",
      value: "<a href='" + this.props.app_url + "selo-osc/" + this.props.id_osc + "'>" + "<img src='" + this.props.app_url + "img/logo.png'>" + "</a>",
      rows: "3"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_historico"
    }, "Script"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-tx-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0")))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Seal, {
  id_osc: id_osc,
  app_url: app_url
}), document.getElementById('seal'));