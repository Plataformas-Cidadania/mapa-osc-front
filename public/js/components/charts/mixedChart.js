// Import the formatLargeNumbers function from apexMixed.js
function formatLargeNumbers(value) {
  if (!value && value !== 0) return null;
  let formattedValue;
  if (value >= 1e9) {
    formattedValue = (value / 1e9).toFixed(2) + ' B'; // Bilhões
  } else if (value >= 1e6) {
    formattedValue = (value / 1e6).toFixed(2) + ' M'; // Milhões
  } else if (value >= 1e3) {
    formattedValue = (value / 1e3).toFixed(2) + ' K'; // Milhares
  } else {
    formattedValue = value.toString(); // Valor menor que mil
  }

  return formattedValue;
}
class MixedChart extends React.Component {
  constructor(props) {
    super(props);
    console.log('MixedChart', props);
    this.state = {
      options: {
        chart: {
          stacked: false,
          id: props.id,
          toolbar: {
            tools: {
              download: '<i class="fas fa-image chart-custom-icon"/>',
              reset: '<i class="fas fa-undo-alt chart-custom-icon-reset"/>'
              /*customIcons: [
                  {
                      icon: '<i class="fas fa-chart-line"/>',
                      index: 0,
                      title: '',
                      class: 'chart-custom-icon',
                      click: () => {
                          console.log('chart line');
                      }
                  },
                  {
                      icon: '<i class="fas fa-chart-bar"/>',
                      index: 0,
                      title: '',
                      class: 'chart-custom-icon',
                      click: () => {
                          console.log('chart bar');
                      }
                  },
                  {
                      icon: '<i class="fas fa-chart-area"/>',
                      index: 0,
                      title: '',
                      class: 'chart-custom-icon',
                      click: () => {
                          console.log('chart area');
                          this.state.typeChart = 'area';
                      }
                  }
              ]*/
            }
          }
        },

        stroke: {
          width: [2, 2, 5]
          /*curve: 'smooth',*/
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
        markers: {
          size: 0
        },
        xaxis: {
          type: 'number',
          categories: props.labels,
          tickAmount: 10,
          labels: {
            rotate: 0,
            /*rotateAlways: true,
            offsetX: 0,
            offsetY: 10,*/
            trim: false
          }
          //categories: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '05 Jan 2001'],
        },

        yaxis: [{
          labels: {
            formatter: function (value) {
              return formatLargeNumbers(value);
            }
          },
          ...props.yaxis
        }],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return formatLargeNumbers(y);
              }
              return y;
            }
          }
        }
      },
      /*series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
      }]*/
      series: this.formatSeriesData(props.series)
    };
  }
  componentDidMount() {
    //console.log('aaaa');
  }
  formatSeriesData(series) {
    if (!series) return series;

    // Create a deep copy of the series to avoid modifying the original data
    return series.map(serie => ({
      ...serie,
      // Keep the original data for calculations but use formatted values for display
      originalData: [...serie.data],
      // Format each data point
      data: serie.data.map(value => value)
    }));
  }
  render() {
    if (!this.state.series) {
      return;
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: this.props.id
    }, /*#__PURE__*/React.createElement(ReactApexChart, {
      options: this.state.options,
      series: this.state.series,
      type: "line",
      height: "350"
    })), /*#__PURE__*/React.createElement("div", {
      id: "html-dist-" + this.props.id
    }));
  }
}