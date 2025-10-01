class IndicatorNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.load = this.load.bind(this);
    this.loadCharts = this.loadCharts.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  load() {
    let _this = this;
    let data = _this.state.data;
    $.ajax({
      method: 'GET',
      url: 'indicadores/analises/',
      data: {},
      cache: false,
      async: false,
      success: function (result) {
        _this.loadCharts(result, 0, data);
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        _this.setState({
          loading: false
        });
      }
    });
  }
  loadCharts(charts, i, data) {}
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Accordion, null));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(IndicatorNew, null), document.getElementById('indicator-new'));