class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      document: [],
      editId: 0
    };
    this.load = this.load.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  load() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: 'detalhar-users-document/' + this.props.id,
      cache: false,
      success: function (data) {
        //console.log("1: "+this.props.id);
        //console.log(data);
        this.setState({
          document: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  render() {
    console.log(this.state.document.id, this.state.document.max_id);
    let previous = null;
    if (this.state.document.previous_id) {
      previous = /*#__PURE__*/React.createElement("li", {
        className: "previous"
      }, /*#__PURE__*/React.createElement("a", {
        href: "/dados-arquivo/" + this.state.document.previous_id
      }, /*#__PURE__*/React.createElement("span", {
        "aria-hidden": "true"
      }, "\u2190"), " Anterior"));
    }
    let next = null;
    if (this.state.document.next_id) {
      next = /*#__PURE__*/React.createElement("li", {
        className: "next"
      }, /*#__PURE__*/React.createElement("a", {
        href: "/dados-arquivo/" + this.state.document.next_id
      }, "Pr\xF3ximo ", /*#__PURE__*/React.createElement("span", {
        "aria-hidden": "true"
      }, "\u2192")));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "box-item-theme-p"
    }, this.state.document.title), /*#__PURE__*/React.createElement("iframe", {
      src: "/arquivos/documents/" + this.state.document.arquivo,
      width: "100%",
      height: "1000px",
      frameBorder: "0"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("nav", {
      "aria-label": "..."
    }, /*#__PURE__*/React.createElement("ul", {
      className: "pager"
    }, previous, next)));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Document, {
  id: id
}), document.getElementById('document'));