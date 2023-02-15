class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      documents: [],
      editId: 0
    };
    this.list = this.list.bind(this);
  }
  componentDidMount() {
    this.list();
  }
  list() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'POST',
      url: 'list-users-documents',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          documents: data,
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
    let documents = this.state.documents.map(function (item, index) {
      let hr = null;
      if (index < this.state.documents.length - 1) {
        hr = /*#__PURE__*/React.createElement("hr", null);
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "col-md-3  text-center",
        key: "document_" + item.id
      }, /*#__PURE__*/React.createElement("a", {
        href: "/dados-arquivo/" + item.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "box-item box-item-theme"
      }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", {
        className: "far fa-file fa-3x"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", {
        className: "box-item-theme-p"
      }, item.title))));
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, documents));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Documents, null), document.getElementById('documents'));