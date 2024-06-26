class PolarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: props.data.serie,
      options: {
        chart: {
          type: 'polarArea'
        },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff'],
        labels: props.data.labels,
        /*legend: {
            show: false,
        },*/
        legend: {
          onItemClick: {
            toggleDataSeries: false
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'left'
            }
          }
        }]
      }
    };
  }
  componentDidMount() {}
  render() {
    if (!this.state.series) {
      return;
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: this.props.id
    }, /*#__PURE__*/React.createElement(ReactApexChart, {
      options: this.state.options,
      series: this.state.series,
      type: "polarArea",
      height: "200"
    })), /*#__PURE__*/React.createElement("div", {
      id: "html-dist-" + this.props.id
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(PolarChart, null), document.getElementById('polarChart'));