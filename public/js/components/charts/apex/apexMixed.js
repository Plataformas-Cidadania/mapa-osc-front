function splitLabels(labels) {
  return labels.map(label => {
    const words = label.split(' ');
    if (words.length > 2) {
      const chunked = [];
      for (let i = 0; i < words.length; i += 2) {
        chunked.push(words.slice(i, i + 2).join(' '));
      }
      return chunked;
    }
    return label;
  });
}
class ApexMixed extends React.Component {
  constructor(props) {
    console.log('ApexMixed', props);
    super(props);
    this.state = {
      id: props?.chartId,
      //series: props?.data?.series,
      series: props?.data?.series,
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar: {
            tools: {
              download: '<i class="fas fa-download chart-custom-icon"/>'
              //reset: '<i class="fas fa-undo-alt chart-custom-icon-reset"/>',
            }
          }
        },

        stroke: {
          width: [2, 2, 5]
          /*width: [0, 2, 5],
          curve: 'smooth'*/
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
        //colors: ['#008FFB', '#00E396', '#FEB019'],
        // labels: props?.data?.labels,
        /*labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
            '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],*/
        markers: {
          size: 0
        },
        xaxis: {
          categories: props?.data?.labels ? splitLabels(props?.data?.labels) : [],
          tickAmount: 0,
          labels: {
            rotate: 0,
            /*rotateAlways: true,
            offsetX: 0,
            offsetY: 10,*/
            trim: false,
            style: {
              fontSize: '12px',
              // Ajuste o tamanho da fonte
              whiteSpace: 'normal' // Permite quebra de linha
            }
          }
          //type: 'datetime'
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