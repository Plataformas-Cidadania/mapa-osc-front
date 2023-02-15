class Depen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.load = this.load.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  load() {
    console.log('pages');
    $.ajax({
      method: 'GET',
      url: 'json/lista-osc-com-links.json',
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          data: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  render() {
    let itensLista = null;
    if (this.state.data) {
      itensLista = this.state.data.map(function (item, index) {
        console.log(item);
        return /*#__PURE__*/React.createElement("tr", {
          key: 'trModal' + index
        }, /*#__PURE__*/React.createElement("td", null, item.cnpj), /*#__PURE__*/React.createElement("td", null, item.nome), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
          href: "detalhar/" + item.id
        }, /*#__PURE__*/React.createElement("i", {
          className: "fas fa-share-square"
        }))));
      });
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-hover"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "CNPJ"), /*#__PURE__*/React.createElement("th", null, "Nome"), /*#__PURE__*/React.createElement("th", null, "Detalhar"))), /*#__PURE__*/React.createElement("tbody", null, itensLista))))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Depen, null), document.getElementById('depen'));