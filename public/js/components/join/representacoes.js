class Representacoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnpj: '',
      buttonEnabled: false,
      loading: false,
      showMsg: false,
      msg: '',
      results: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchRepresentacoes = this.searchRepresentacoes.bind(this);
  }
  handleInputChange(event) {
    // Remove everything except digits
    const raw = event.target.value.replace(/\D/g, '');
    this.setState({
      cnpj: raw,
      buttonEnabled: raw.length > 0,
      showMsg: false,
      msg: ''
    });
  }
  searchRepresentacoes(e) {
    e.preventDefault();
    const {
      cnpj
    } = this.state;
    if (!cnpj) return;
    this.setState({
      loading: true,
      buttonEnabled: false,
      showMsg: false,
      msg: ''
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + `representantes/buscar-representacoes/${cnpj}`,
      cache: false,
      success: function (data) {
        this.setState({
          results: data,
          loading: false,
          buttonEnabled: true
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err);
        this.setState({
          msg: 'Erro ao buscar representações. Tente novamente.',
          showMsg: true,
          loading: false,
          buttonEnabled: true
        });
      }.bind(this)
    });
  }
  render() {
    const {
      cnpj,
      buttonEnabled,
      loading,
      showMsg,
      msg,
      results
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h1", null, "Buscar representa\xE7\xF5es"), /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("a", {
      href: "/"
    }, "Home")), /*#__PURE__*/React.createElement("br", null)))))), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-md-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.searchRepresentacoes
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h3", null, "Digite o CNPJ para buscar representantes da OSC"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "cnpj"
    }, "CNPJ*"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "cnpj",
      value: cnpj,
      onChange: this.handleInputChange,
      className: "form-control",
      placeholder: "Apenas n\xFAmeros"
    })), showMsg && /*#__PURE__*/React.createElement("div", {
      className: "text-danger mb-2"
    }, msg), loading && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spinner fa-spin"
    }), " Processando..."), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      disabled: !buttonEnabled || loading
    }, "Pesquisar")), results.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "mt-4"
    }, /*#__PURE__*/React.createElement("h4", null, "Resultados"), /*#__PURE__*/React.createElement("ul", {
      className: "list-group"
    }, results.map(item => /*#__PURE__*/React.createElement("li", {
      key: item.id_usuario,
      className: "list-group-item",
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("strong", null, item.tx_nome_usuario), " ", item.tx_email_usuario))))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Representacoes, {
  email: email
}), document.getElementById('representacoes'));