class ApexMixed extends React.Component {
  constructor(props) {
    console.log('ApexMixed', props);
    super(props);
    this.state = {
      id: props?.chartId,
      series: props?.data?.series,
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: props?.data?.labels,
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points'
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            }
          }
        }
      }
    };
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: "chart"
    }, /*#__PURE__*/React.createElement(ReactApexChart, {
      options: this.state.options,
      series: this.state.series,
      type: "line",
      height: 350
    })), /*#__PURE__*/React.createElement("div", {
      id: "html-dist"
    }));
  }
}
const domContainer = document.querySelector('#indicator-new');