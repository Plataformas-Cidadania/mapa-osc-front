class HomeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mychart: null,
      data: [],
      loading: false,
      yaxis: [],
      labels: [],
      labels2: [],
      series: [],
      series2: [],
      chart2: []
    };
    this.loadChart = this.loadChart.bind(this);
  }
  componentDidMount() {
    //this.loadChart();
  }
  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      data: props.data,
      labels: props.data.chart.labels,
      series: props.data.chart.series
    });
  }
  loadChart(props) {}
  modal() {
    return /*#__PURE__*/React.createElement("div", {
      className: "modal fade bd-example-modal-lg",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, "T\xEDtulo do modal"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "#"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Primeiro"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "\xDAltimo"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Nickname"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, "1"), /*#__PURE__*/React.createElement("td", null, "Mark"), /*#__PURE__*/React.createElement("td", null, "Otto"), /*#__PURE__*/React.createElement("td", null, "@mdo")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, "2"), /*#__PURE__*/React.createElement("td", null, "Jacob"), /*#__PURE__*/React.createElement("td", null, "Thornton"), /*#__PURE__*/React.createElement("td", null, "@fat")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, "3"), /*#__PURE__*/React.createElement("td", null, "Larry"), /*#__PURE__*/React.createElement("td", null, "the Bird"), /*#__PURE__*/React.createElement("td", null, "@twitter")))), /*#__PURE__*/React.createElement("div", {
      className: "bd-callout bd-callout-warning"
    }, /*#__PURE__*/React.createElement("h5", {
      id: "incompatibilidade-jquery"
    }, "Fonte:"), /*#__PURE__*/React.createElement("p", {
      className: "box-chart-model-font"
    }, "Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Fechar")))));
  }
  render() {
    //console.log("11", this.state.data.chart2.series);

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box-chart"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-style",
      style: {
        perspective: '1000px'
      }
    }, /*#__PURE__*/React.createElement("h2", null, "1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"), /*#__PURE__*/React.createElement("div", {
      className: "line line-fix block",
      "data-move-x": "980px",
      style: {
        opacity: '1',
        transition: 'all 1s ease 0s, opacity 1.5s ease 0s'
      }
    }), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement(MixedChart, {
      id: "mix-chart1",
      yaxis: ['Teste'],
      series: this.state.series,
      labels: this.state.labels
    }), /*#__PURE__*/React.createElement("p", {
      className: "box-chart-font bg-lgt"
    }, /*#__PURE__*/React.createElement("strong", null, "Fonte:"), " CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS"), /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary float-right",
      "data-toggle": "modal",
      "data-target": ".bd-example-modal-lg"
    }, "Visualize os dados em tabela"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "box-chart"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-style",
      style: {
        perspective: '1000px'
      }
    }, /*#__PURE__*/React.createElement("h2", null, "1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"), /*#__PURE__*/React.createElement("div", {
      className: "line line-fix block",
      "data-move-x": "980px",
      style: {
        opacity: '1',
        transition: 'all 1s ease 0s, opacity 1.5s ease 0s'
      }
    }), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement(MixedChart, {
      id: "mix-chart2",
      yaxis: ['Teste'],
      series: this.state.series,
      labels: this.state.labels
    }), /*#__PURE__*/React.createElement("p", {
      className: "box-chart-font bg-lgt"
    }, /*#__PURE__*/React.createElement("strong", null, "Fonte:"), " CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS"), /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary float-right",
      "data-toggle": "modal",
      "data-target": ".bd-example-modal-lg"
    }, "Visualize os dados em tabela"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)))));
  }
}