class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msg: '',
      msgShow: false,
      email: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.send = this.send.bind(this);
  }
  show() {
    $('#modalForgetPassword').modal('show');
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  send(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      msgShow: false
    });
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'esqueci-senha',
      data: {
        email: this.state.email
      },
      cache: false,
      success: function (data) {
        console.log(data);
        this.setState({
          loading: false,
          msgShow: true,
          msg: data.Resposta
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
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        cursor: 'pointer'
      },
      onClick: this.show
    }, "Esqueci minha senha")), /*#__PURE__*/React.createElement("div", {
      className: "modal fade",
      id: "modalForgetPassword",
      role: "dialog",
      style: {
        zIndex: '999999'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal"
    }, "\xD7"), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "Esqueci minha senha")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
      type: "email",
      className: "form-control",
      name: "email",
      onChange: this.handleEmail,
      placeholder: "Digite seu e-mail"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.msgShow ? 'block' : 'none'
      }
    }, this.state.msg), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: this.send
    }, "Enviar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      "data-dismiss": "modal"
    }, "Fechar"))))));
  }
}