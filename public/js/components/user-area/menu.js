class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigla_osc: ''
    };
    this.getOsc = this.getOsc.bind(this);
  }
  componentDidMount() {
    this.getOsc();
  }
  getOsc() {
    this.setState({
      button: false
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/dados_gerais/' + this.props.id,
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          sigla_osc: data.tx_sigla_osc,
          button: true
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  render() {
    let menu = [];
    if (pageRoute === false) {
      menu = [/*#__PURE__*/React.createElement("div", {
        key: "menu"
      }, /*#__PURE__*/React.createElement("ul", {
        className: "menu-area"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "oscs-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-list-alt"
      }), " Minhas OSCs")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "dados-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-user",
        "aria-hidden": "true"
      }), " Meus dados")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "trocar-senha"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-user",
        "aria-hidden": "true"
      }), " Trocar Senha")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "logout-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-power-off",
        "aria-hidden": "true"
      }), " Sair"))))];
    }
    if (pageRoute === true) {
      menu.push(/*#__PURE__*/React.createElement("ul", {
        className: "menu-area",
        key: "menuOsc"
      }, /*#__PURE__*/React.createElement("li", {
        className: ""
      }, "OSC ", /*#__PURE__*/React.createElement("strong", null, this.state.sigla_osc)), /*#__PURE__*/React.createElement("div", {
        className: "line line-fix "
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "osc-user/" + this.props.id
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-file-alt",
        "aria-hidden": "true"
      }), " Dados gerais")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "objetivos-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-globe-americas",
        "aria-hidden": "true"
      }), " ODS")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "areas-atuacao-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-share-alt",
        "aria-hidden": "true"
      }), " \xC1reas de atua\xE7\xE3o")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "descricao-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-align-justify",
        "aria-hidden": "true"
      }), " Descri\xE7\xE3o")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "certificates-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-certificate",
        "aria-hidden": "true"
      }), " T\xEDtulos e certificados")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "governancas-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-briefcase",
        "aria-hidden": "true"
      }), " Trabalho e governan\xE7a")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "participacoes-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users",
        "aria-hidden": "true"
      }), " Participa\xE7\xE3o social")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "projetos-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-project-diagram",
        "aria-hidden": "true"
      }), " Projetos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "recursos-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-boxes",
        "aria-hidden": "true"
      }), " Fontes de recursos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "oscs-user"
      }, /*#__PURE__*/React.createElement("i", {
        className: "far fa-arrow-alt-circle-left"
      }), " Voltar"))));
    }
    return menu;
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Menu, {
  id: id
}), document.getElementById('menu'));