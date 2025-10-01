class TrocarSenha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        senha_atual: '',
        nova_senha: ''
      },
      button: true,
      loading: false,
      requireds: {
        senha_atual: true,
        nova_senha: true
      },
      showMsg: false,
      msg: '',
      showSenhaAtual: false,
      showNovaSenha: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.trocarSenha = this.trocarSenha.bind(this);
    this.showHideSenhaAtual = this.showHideSenhaAtual.bind(this);
    this.showHideNovaSenha = this.showHideNovaSenha.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let form = this.state.form;
    form[name] = value;
    this.setState({
      form: form
    });
  }
  validate() {
    let valid = true;
    for (let i in this.state.requireds) {
      if (!this.state.form[i]) {
        valid = false;
      }
    }
    return valid;
  }
  trocarSenha(e) {
    e.preventDefault();
    if (!this.validate()) {
      this.setState({
        loading: false,
        msg: 'Informe os campos obrigatórios *',
        showMsg: true,
        button: true,
        color: 'danger'
      });
      return;
    }
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: 'POST',
        url: getBaseUrl2 + 'trocar-senha-na-area-restrita',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          senha_atual: this.state.form.senha_atual,
          nova_senha: this.state.form.nova_senha
        },
        cache: false,
        success: function (data) {
          let msg = data.Resposta;
          if (msg === 'Senha atual inválida!') {
            this.setState({
              msg: msg,
              showMsg: true,
              loading: false,
              button: true,
              color: 'danger'
            });
            return;
          }
          this.setState({
            msg: msg,
            showMsg: true,
            loading: false,
            button: true,
            color: 'success'
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          this.setState({
            loading: false,
            msg: 'Ocorreu um erro!',
            showMsg: true,
            button: true,
            color: 'danger'
          });
        }.bind(this)
      });
    });
  }
  showHideSenhaAtual() {
    this.setState({
      showSenhaAtual: !this.state.showSenhaAtual
    });
  }
  showHideNovaSenha() {
    this.setState({
      showNovaSenha: !this.state.showNovaSenha
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-user",
      "aria-hidden": "true"
    }), " Trocar Senha"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Senha Atual *"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      id: "senha_atual",
      className: "form-control form-m " + (this.state.requireds.senha_atual ? '' : 'invalid-field'),
      type: this.state.showSenhaAtual ? "text" : "password",
      name: "senha_atual",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("a", {
      onClick: this.showHideSenhaAtual
    }, /*#__PURE__*/React.createElement("i", {
      id: "faView",
      className: "far fa-eye-slash",
      style: {
        cursor: 'pointer'
      }
    }))), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Nova Senha *"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      id: "nova_senha",
      className: "form-control form-m " + (this.state.requireds.senha_atual ? '' : 'invalid-field'),
      type: this.state.showNovaSenha ? "text" : "password",
      name: "nova_senha",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("a", {
      onClick: this.showHideNovaSenha
    }, /*#__PURE__*/React.createElement("i", {
      id: "faView",
      className: "far fa-eye-slash",
      style: {
        cursor: 'pointer'
      }
    }))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "clear-float"
    }), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        display: this.state.button ? 'block' : 'none'
      },
      className: "btn btn-success",
      onClick: this.trocarSenha
    }, "Salvar"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: 'text-' + this.state.color
    }, this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), "Processando"))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(TrocarSenha, {
  id: id
}), document.getElementById('trocar-senha'));