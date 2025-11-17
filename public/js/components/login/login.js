class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      requireds: {
        email: true,
        password: true
      },
      target: this.props.target,
      msg: '',
      msgShow: false,
      invalido: false,
      loading: false
    };
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    if (!this.props.target) {
      this.setState({
        target: 'area-user'
      });
    }
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
    //console.log(this.state.form);
    let valid = true;
    let requireds = this.state.requireds;
    let form = this.state.form;
    for (let index in requireds) {
      if (!form[index] || form[index] == '') {
        requireds[index] = false;
        valid = false;
      } else {
        requireds[index] = true;
      }
    }

    //console.log(requireds);

    this.setState({
      requireds: requireds
    });
    return valid;
  }
  login(e) {
    e.preventDefault();
    if (!this.validate()) {
      return;
    }
    this.setState({
      loading: true,
      msgShow: false,
      invalido: false
    }, function () {
      $.ajax({
        method: 'POST',
        //url: 'login',
        url: getBaseUrl2 + 'oauth/token',
        data: {
          grant_type: 'password',
          client_id: '2',
          client_secret: 'QYDGG3kPaK3ubJhCE3a6EHup9etYfd2hDrY4JbnL',
          username: this.state.form.email,
          password: this.state.form.password,
          scope: ''
        },
        cache: false,
        success: function (data) {
          console.log(data);
          if (data.access_token) {
            //location.href = this.state.target;
            localStorage.setItem('@App:token', data.access_token);
            //location.href = 'area-user';
            location.href = 'oscs-user';
          }
          this.setState({
            loading: false,
            msgShow: true,
            msg: data.msg
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.log('xhr', xhr);
          console.log('status', status);
          console.log('err', err);
          if (err === 'Unauthorized') {
            this.setState({
              invalido: true
            });
          }
          console.error(status, err.toString());
          this.setState({
            loading: false
          });
        }.bind(this)
      });
    });
  }
  render() {
    let titleLogin = "Já tenho cadastro";
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h1", null, "Identifica\xE7\xE3o"), /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("a", {
      href: "/"
    }, "Home")), /*#__PURE__*/React.createElement("br", null)))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-md-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row box-margin"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h4", null, titleLogin), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_token",
      value: $('meta[name="csrf-token"]').attr('content')
    }), /*#__PURE__*/React.createElement("input", {
      type: "email",
      name: "email",
      className: "form-control " + (this.state.requireds.email ? '' : 'invalid-field'),
      onChange: this.handleInputChange,
      placeholder: "E-mail"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '12px'
      }
    }, /*#__PURE__*/React.createElement(ForgetPassword, null)), /*#__PURE__*/React.createElement("input", {
      type: "password",
      name: "password",
      className: "form-control " + (this.state.requireds.password ? '' : 'invalid-field'),
      onChange: this.handleInputChange,
      placeholder: "Senha"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: this.login
    }, "Continuar"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.msgShow ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("br", null), this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.invalido ? 'block' : 'none'
      },
      className: "text-danger"
    }, /*#__PURE__*/React.createElement("br", null), "Usu\xE1rio inv\xE1lido ou inativo!")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "ou"), /*#__PURE__*/React.createElement("p", null, "N\xE3o tem cadastro? ", /*#__PURE__*/React.createElement("a", {
      href: "register",
      className: "text-primary"
    }, "Cadastre-se")))))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Login, null), document.getElementById('login'));