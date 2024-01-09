class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.load = this.load.bind(this);
    //this.load();
  }

  componentDidMount() {
    this.load();
  }
  load() {
    let _this = this;
    $.ajax({
      type: 'GET',
      //url: 'get-home-chart',
      //url: 'http://localhost:8000/api/analises?id=9',
      url: getBaseUrl + '/api/analises?id=9',
      data: {},
      cache: false,
      success: function (data) {
        //console.log(data);
        _this.setState({
          data: data
        });
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        _this.setState({
          loading: false
        });
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HomeChart, {
      homeId: "home",
      data: this.state.data
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Page, null), document.getElementById('page'));