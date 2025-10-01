class PreRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let carrinho = this.props.carrinho;
    return /*#__PURE__*/React.createElement("div", {
      className: "row box-margin"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h4", null, "Quero me cadastrar"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("form", {
      action: "/pre-register",
      method: "POST"
    }, carrinho, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_token",
      value: $('meta[name="csrf-token"]').attr('content')
    }), /*#__PURE__*/React.createElement("input", {
      type: "email",
      name: "email",
      className: "form-control",
      placeholder: "E-mail"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "cep",
      className: "form-control",
      placeholder: "CEP"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-style-primary"
    }, "Criar Cadastro"))));
  }
}