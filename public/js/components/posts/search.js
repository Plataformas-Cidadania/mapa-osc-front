class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    let search = e.target.value;
    this.props.setSearch(search);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "input-icon"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Busque...",
      onChange: this.handleSearch
    }), /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search"
    }));
  }
}