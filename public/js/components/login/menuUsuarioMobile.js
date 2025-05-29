class MenuUsuarioMobile extends React.Component {
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
      className: "text-center"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "bg-pri rounded-circle user-mobile"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-user fa-3x"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("p", null, usuario)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      className: "menu-cel-login"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "login",
      style: {
        display: this.state.tx_nome_usuario ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "btn btn-primary btn-login-menu",
      type: "button"
    }, "Entrar"))), /*#__PURE__*/React.createElement("li", {
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "oscs-user"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-address-card"
    }), " Minha OSCs")), /*#__PURE__*/React.createElement("li", {
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "dados-user"
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-edit"
    }), " Meus Dados")), /*#__PURE__*/React.createElement("li", {
      style: {
        display: this.state.tx_nome_usuario ? 'none' : ''
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "register"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-user"
    }), " Cadastre-se")), /*#__PURE__*/React.createElement("li", {
      className: "float-right",
      style: {
        display: this.state.tx_nome_usuario ? '' : 'none'
      },
      onClick: this.logout
    }, /*#__PURE__*/React.createElement("a", {
      href: "logout-user"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-sign-out-alt"
    }), " Sair ")))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(MenuUsuarioMobile, null), document.getElementById('menu-usuario-mobile'));