class MenuUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tx_nome_usuario: '',
      loading: false
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    this.setState({
      loading: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'get-user-auth',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        let tx_nome_usuario = data.tx_nome_usuario ? data.tx_nome_usuario : '';
        this.setState({
          loading: false,
          tx_nome_usuario: tx_nome_usuario
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
  logout() {
    localStorage.setItem('@App:token', '');
    location.href = 'login';
  }
  render() {
    let usuario = 'Olá, faça seu login ou se cadastre';
    if (this.state.tx_nome_usuario) {
      let arrayNome = this.state.tx_nome_usuario.split(' ');
      usuario = 'Olá, ' + arrayNome[0] + '. Seja bem-vind@!';
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "login",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }, /*#__PURE__*/React.createElement("div", {
      className: "login-icon rounded-circle"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-user"
    })), /*#__PURE__*/React.createElement("p", null, usuario)), /*#__PURE__*/React.createElement("div", {
      className: "dropdown-menu dropdown-menu-right"
    }, /*#__PURE__*/React.createElement("a", {
      href: "login",
      style: {
        display: this.state.tx_nome_usuario ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-login-menu",
      type: "button"
    }, "Entrar")), /*#__PURE__*/React.createElement("a", {
      href: "register",
      style: {
        display: this.state.tx_nome_usuario ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Cadastre-se")), /*#__PURE__*/React.createElement("a", {
      href: "oscs-user",
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Minha OSCs")), /*#__PURE__*/React.createElement("a", {
      href: "dados-user",
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Meus Dados")), /*#__PURE__*/React.createElement("a", {
      href: "representacoes"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Representa\xE7\xF5es")), /*#__PURE__*/React.createElement("a", {
      href: "buscar-email"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Consultar e-mail")), /*#__PURE__*/React.createElement("a", {
      onClick: this.logout,
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-item",
      type: "button"
    }, "Sair"))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(MenuUsuario, null), document.getElementById('menu-usuario'));