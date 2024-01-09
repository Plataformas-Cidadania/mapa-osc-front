class HeaderUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h1", null, "Minha conta"), /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("a", {
      href: "/"
    }, "Home")), /*#__PURE__*/React.createElement("div", {
      className: "line line-fix "
    }), /*#__PURE__*/React.createElement("hr", {
      style: {
        marginTop: '-2px'
      }
    }), /*#__PURE__*/React.createElement("br", null)))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(HeaderUser, null), document.getElementById('header-user'));