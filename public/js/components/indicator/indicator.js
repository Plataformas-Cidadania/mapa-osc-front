class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mychart: null,
      loading: false,
      yaxis: [],
      labels: [],
      series: [],
      charts: [],
      table: [],
      modal: {
        name: null,
        fontes: null,
        head: [],
        rows: []
      },
      menu: []
    };
    this.loadChart = this.loadChart.bind(this);
    this.callModal = this.callModal.bind(this);
    this.callMenu = this.callMenu.bind(this);
  }
  componentDidMount() {
    //this.loadChart();
  }
  componentWillReceiveProps(props) {
    let data = props.data;
    let charts = [];
    for (let chart in data) {
      //console.log("######"+i+"######");
      let dataChart = data[chart].series_1;
      let labels = [];
      let series = [];
      let name = data[chart].titulo;
      let fontes = data[chart].fontes.join(', ');
      let tituloX = data[chart].titulo_colunas[0];
      let tituloY = data[chart].titulo_colunas[1];

      //let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" ? "column" : data[chart].tipo_grafico;
      let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" || data[chart].tipo_grafico === "BarChart" ? "column" : data[chart].tipo_grafico === "DonutChart" ? "pie" : data[chart].tipo_grafico;
      for (let j in dataChart) {
        if (tipoGrafico === "pie") {
          labels.push(dataChart[j].label);
          series.push(dataChart[j].value);
          continue;
        }

        //Quando tiver o key///////////////////////////////
        if (dataChart[j].hasOwnProperty('key')) {
          labels.push(dataChart[j].key);
          let values = dataChart[j].values;
          for (let k in values) {
            if (!series[k]) {
              series[k] = {};
            }
            series[k].name = values[k].label;
            series[k].type = tipoGrafico;
            if (!series[k].hasOwnProperty('data')) {
              series[k].data = [];
            }
            series[k].data[j] = values[k].value;
          }
          continue;
        }
        ///////////////////////////////////////////////////

        //Não é executado se tiver o key//////////////
        if (!series[0]) {
          series[0] = {
            type: '',
            data: []
          };
        }
        labels.push(dataChart[j].label);
        //labels.push("")
        series[0].name = "";
        series[0].type = tipoGrafico;
        series[0].data.push(dataChart[j].value);

        ///////////////////////////////////////////////
      }

      charts.push({
        chart: chart,
        name: name,
        fontes: fontes,
        labels: labels,
        series: series,
        type: tipoGrafico
      });
    }
    this.setState({
      charts: charts,
      data: props.data
    }, function () {
      this.generateTable(props.data);
      this.generateMenu(props.data);
    });
  }
  generateTable(data) {
    let tables = [];
    for (let chart in data) {
      //console.log("######"+i+"######");
      let dataTable = data[chart].series_2;
      if (!dataTable) {
        dataTable = data[chart].series_1;
      }
      let name = data[chart].titulo;
      let fontes = data[chart].fontes.join(', ');
      let head = data[chart].titulo_colunas;
      let rows = [];
      for (let h in head) {
        head[h] = replaceAll(head[h], "'", "");
      }
      for (let j in dataTable) {
        let table = dataTable[j];
        //Quando tiver o key///////////////////////////////
        if (table.hasOwnProperty('key')) {
          for (let k in table.values) {
            if (!rows[j]) {
              rows[j] = [];
            }
            rows.push([table.key, table.values[k].label, table.values[k].value]);
          }
          continue;
        }
      }
      tables.push({
        data: {
          head: head,
          rows: rows
        },
        name: name,
        fontes: fontes
      });
    }
    this.setState({
      tables: tables
    });
  }
  generateMenu(data) {
    let menu = [];
    for (let i in data) {
      menu.push(data[i].titulo);
    }
    this.setState({
      menu: menu
    });
  }
  callMenu(index) {
    $(".divOff").hide(1000);
    $("#divChart" + index).first().slideDown("slow");
    $(".menu-left-active").attr('class', "list-group-item-theme");
    $("#divMenuChart" + index).attr('class', "menu-left-active");
  }
  loadChart(props) {}
  callModal(chart) {
    let modal = this.state.modal;
    let table = this.state.tables[chart];
    //console.log(table);
    modal.name = table.name;
    modal.fontes = table.fontes;
    modal.head = table.data.head.map(function (item, index) {
      return /*#__PURE__*/React.createElement("th", {
        key: 'thModal' + index
      }, item);
    });
    modal.rows = table.data.rows.map(function (item, index) {
      return /*#__PURE__*/React.createElement("tr", {
        key: 'trModal' + index
      }, /*#__PURE__*/React.createElement("td", null, item[0]), /*#__PURE__*/React.createElement("td", null, item[1]), /*#__PURE__*/React.createElement("td", null, item[2]));
    });
    this.setState({
      modal: modal
    }, function () {
      $('#modalTable').modal('show');
    });
  }
  modal() {
    return /*#__PURE__*/React.createElement("div", {
      id: "modalTable",
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
    }, /*#__PURE__*/React.createElement("h4", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, /*#__PURE__*/React.createElement("strong", null, this.state.modal.name)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-hover"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, this.state.modal.head)), /*#__PURE__*/React.createElement("tbody", null, this.state.modal.rows)), /*#__PURE__*/React.createElement("div", {
      className: "bd-callout bd-callout-warning"
    }, /*#__PURE__*/React.createElement("h5", {
      id: "incompatibilidade-jquery"
    }, "Fonte:"), /*#__PURE__*/React.createElement("p", {
      className: "box-chart-model-font"
    }, this.state.modal.fontes))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Fechar")))));
  }
  showHideColumn() {
    document.getElementById('line').setAttribute("class", "col-md-9");
    document.getElementById('column').setAttribute("class", "col-md-3");
    document.getElementById('column').style.display = "block";
    document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
    document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
    $(".divOff").hide(1000);
    $("#divChart0").show(1000);
  }
  showHideLine() {
    document.getElementById('line').setAttribute("class", "col-md-12");
    document.getElementById('column').style.display = "none";
    document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
    document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
    $(".divOff").show(1000);
  }
  render() {
    let charts = null;
    let menu = null;
    let modal = this.modal();
    if (this.state.charts) {
      charts = this.state.charts.map(function (item, index) {
        let chart = null;
        switch (item.type) {
          case "column":
            chart = /*#__PURE__*/React.createElement(MixedChart, {
              id: 'mix-chart' + item.chart,
              yaxis: ['Teste'],
              series: item.series,
              labels: item.labels
            });
            break;
          case "pie":
            chart = /*#__PURE__*/React.createElement(PieChart, {
              id: 'pie-chart' + item.chart,
              series: item.series,
              labels: item.labels
            });
            break;
        }
        return /*#__PURE__*/React.createElement("div", {
          className: "box-chart divOff",
          key: "divChart" + item.chart,
          id: "divChart" + index,
          style: {
            display: index === 0 ? 'block' : ''
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "title-style",
          style: {
            perspective: '1000px'
          }
        }, /*#__PURE__*/React.createElement("h2", null, index + 1, " - ", item.name), /*#__PURE__*/React.createElement("div", {
          className: "line line-fix block",
          "data-move-x": "980px",
          style: {
            opacity: '1',
            transition: 'all 1s ease 0s, opacity 1.5s ease 0s'
          }
        }), /*#__PURE__*/React.createElement("hr", null)), chart, /*#__PURE__*/React.createElement("p", {
          className: "box-chart-font bg-lgt"
        }, /*#__PURE__*/React.createElement("strong", null, "Fonte:"), " ", item.fontes), /*#__PURE__*/React.createElement("div", {
          className: "btn btn-outline-primary float-right",
          onClick: () => this.callModal(item.chart)
        }, "Visualize os dados em tabela"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
      }.bind(this));
    }
    if (this.state.menu) {
      menu = this.state.menu.map(function (item, index) {
        return /*#__PURE__*/React.createElement("li", {
          className: index === 0 ? 'menu-left-active' : '',
          key: 'menu' + index,
          id: "divMenuChart" + index,
          style: {
            cursor: 'pointer'
          }
        }, /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callMenu(index)
        }, index + 1, " - ", item));
        console.log(this.callMenu());
      }.bind(this));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12",
      style: {
        margin: '-20px 0 0 0'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => this.showHideLine()
    }, /*#__PURE__*/React.createElement("i", {
      id: "iconLine",
      className: "fas fa-bars fa-2x float-right icons-top curso-poite cursor"
    })), /*#__PURE__*/React.createElement("a", {
      onClick: () => this.showHideColumn()
    }, /*#__PURE__*/React.createElement("i", {
      id: "iconColumn",
      className: "fas fa-columns fa-2x float-right icons-top icons-top-active cursor"
    })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      id: "column",
      className: "col-md-3"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "menu-left menu-left-chart"
    }, menu)), /*#__PURE__*/React.createElement("div", {
      id: "line",
      className: "col-md-9"
    }, charts)), modal));
  }
}