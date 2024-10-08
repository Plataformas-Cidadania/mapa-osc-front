class PieChart extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      series: props.series,
      options: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: props.labels,
        legend: {
          position: 'bottom'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    };
  }
  render() {
    let chart = null;
    if (this.state.series) {
      chart = /*#__PURE__*/React.createElement(ReactApexChart, {
        options: this.state.options,
        series: this.state.series,
        type: "pie",
        width: this.props.width
      });
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: this.props.id
    }, chart), /*#__PURE__*/React.createElement("div", {
      id: "html-dist-" + this.props.id
    }));
  }
}