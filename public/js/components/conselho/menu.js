class MenuConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let menu = [];
    menu = [/*#__PURE__*/React.createElement("div", {
      key: "menu"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "menu-area"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "dashboard-conselho"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-tachometer-alt"
    }), " Dashboard")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "conselho"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-users"
    }), " Conselhos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "conselheiro"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-user-tie"
    }), " Conselheiros")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "logout-user"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-power-off",
      "aria-hidden": "true"
    }), " Sair"))))];
    return menu;
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(MenuConselho, null), document.getElementById('menu'));