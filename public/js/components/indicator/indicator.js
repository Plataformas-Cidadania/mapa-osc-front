"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Indicator = (function (_React$Component) {
    _inherits(Indicator, _React$Component);

    function Indicator(props) {
        _classCallCheck(this, Indicator);

        _get(Object.getPrototypeOf(Indicator.prototype), "constructor", this).call(this, props);
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

    _createClass(Indicator, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            //this.loadChart();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {

            var data = props.data;

            var charts = [];

            for (var chart in data) {
                //console.log("######"+i+"######");
                var dataChart = data[chart].series_1;

                var labels = [];
                var series = [];
                var _name = data[chart].titulo;
                var fontes = data[chart].fontes.join(', ');
                var tituloX = data[chart].titulo_colunas[0];
                var tituloY = data[chart].titulo_colunas[1];

                //let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" ? "column" : data[chart].tipo_grafico;
                var tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" || data[chart].tipo_grafico === "BarChart" ? "column" : data[chart].tipo_grafico === "DonutChart" ? "pie" : data[chart].tipo_grafico;

                for (var j in dataChart) {

                    if (tipoGrafico === "pie") {
                        labels.push(dataChart[j].label);
                        series.push(dataChart[j].value);

                        continue;
                    }

                    //Quando tiver o key///////////////////////////////
                    if (dataChart[j].hasOwnProperty('key')) {

                        labels.push(dataChart[j].key);
                        var values = dataChart[j].values;

                        for (var k in values) {

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
                charts.push({ chart: chart, name: _name, fontes: fontes, labels: labels, series: series, type: tipoGrafico });
            }

            this.setState({
                charts: charts,
                data: props.data
            }, function () {
                this.generateTable(props.data);
                this.generateMenu(props.data);
            });
        }
    }, {
        key: "generateTable",
        value: function generateTable(data) {

            var tables = [];

            for (var chart in data) {
                //console.log("######"+i+"######");
                var dataTable = data[chart].series_2;
                if (!dataTable) {
                    dataTable = data[chart].series_1;
                }

                var _name2 = data[chart].titulo;
                var fontes = data[chart].fontes.join(', ');
                var head = data[chart].titulo_colunas;
                var rows = [];

                for (var h in head) {
                    head[h] = replaceAll(head[h], "'", "");
                }

                for (var j in dataTable) {
                    var table = dataTable[j];
                    //Quando tiver o key///////////////////////////////
                    if (table.hasOwnProperty('key')) {
                        for (var k in table.values) {
                            if (!rows[j]) {
                                rows[j] = [];
                            }
                            rows.push([table.key, table.values[k].label, table.values[k].value]);
                        }
                        continue;
                    }
                }
                tables.push({ data: { head: head, rows: rows }, name: _name2, fontes: fontes });
            }
            this.setState({ tables: tables });
        }
    }, {
        key: "generateMenu",
        value: function generateMenu(data) {
            var menu = [];
            for (var i in data) {
                menu.push(data[i].titulo);
            }
            this.setState({ menu: menu });
        }
    }, {
        key: "callMenu",
        value: function callMenu(index) {
            $(".divOff").hide(1000);
            $("#divChart" + index).first().slideDown("slow");

            $(".menu-left-active").attr('class', "list-group-item-theme");
            $("#divMenuChart" + index).attr('class', "menu-left-active");
        }
    }, {
        key: "loadChart",
        value: function loadChart(props) {}
    }, {
        key: "callModal",
        value: function callModal(chart) {

            var modal = this.state.modal;

            var table = this.state.tables[chart];
            //console.log(table);
            modal.name = table.name;
            modal.fontes = table.fontes;

            modal.head = table.data.head.map(function (item, index) {
                return React.createElement(
                    "th",
                    { key: 'thModal' + index },
                    item
                );
            });

            modal.rows = table.data.rows.map(function (item, index) {
                return React.createElement(
                    "tr",
                    { key: 'trModal' + index },
                    React.createElement(
                        "td",
                        null,
                        item[0]
                    ),
                    React.createElement(
                        "td",
                        null,
                        item[1]
                    ),
                    React.createElement(
                        "td",
                        null,
                        item[2]
                    )
                );
            });

            this.setState({ modal: modal }, function () {
                $('#modalTable').modal('show');
            });
        }
    }, {
        key: "modal",
        value: function modal() {

            return React.createElement(
                "div",
                { id: "modalTable", className: "modal fade bd-example-modal-lg", tabIndex: "-1", role: "dialog", "aria-labelledby": "myLargeModalLabel", "aria-hidden": "true" },
                React.createElement(
                    "div",
                    { className: "modal-dialog modal-lg" },
                    React.createElement(
                        "div",
                        { className: "modal-content" },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "h4",
                                { className: "modal-title", id: "exampleModalLabel" },
                                React.createElement(
                                    "strong",
                                    null,
                                    this.state.modal.name
                                )
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Fechar" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "×"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            React.createElement(
                                "table",
                                { className: "table table-hover" },
                                React.createElement(
                                    "thead",
                                    { className: "thead-light" },
                                    React.createElement(
                                        "tr",
                                        null,
                                        this.state.modal.head
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    this.state.modal.rows
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "bd-callout bd-callout-warning" },
                                React.createElement(
                                    "h5",
                                    { id: "incompatibilidade-jquery" },
                                    "Fonte:"
                                ),
                                React.createElement(
                                    "p",
                                    { className: "box-chart-model-font" },
                                    this.state.modal.fontes
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                                "Fechar"
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "showHideColumn",
        value: function showHideColumn() {
            document.getElementById('line').setAttribute("class", "col-md-9");
            document.getElementById('column').setAttribute("class", "col-md-3");
            document.getElementById('column').style.display = "block";
            document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
            document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
            $(".divOff").hide(1000);
            $("#divChart0").show(1000);
        }
    }, {
        key: "showHideLine",
        value: function showHideLine() {
            document.getElementById('line').setAttribute("class", "col-md-12");
            document.getElementById('column').style.display = "none";
            document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
            document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
            $(".divOff").show(1000);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var charts = null;
            var menu = null;
            var modal = this.modal();

            if (this.state.charts) {

                charts = this.state.charts.map((function (item, index) {
                    var _this = this;

                    var chart = null;
                    switch (item.type) {
                        case "column":
                            chart = React.createElement(MixedChart, { id: 'mix-chart' + item.chart, yaxis: ['Teste'], series: item.series, labels: item.labels });
                            break;
                        case "pie":
                            chart = React.createElement(PieChart, { id: 'pie-chart' + item.chart, series: item.series, labels: item.labels });
                            break;
                    }

                    return React.createElement(
                        "div",
                        { className: "box-chart divOff", key: "divChart" + item.chart, id: "divChart" + index, style: { display: index === 0 ? 'block' : '' } },
                        React.createElement(
                            "div",
                            { className: "title-style", style: { perspective: '1000px' } },
                            React.createElement(
                                "h2",
                                null,
                                index + 1,
                                " - ",
                                item.name
                            ),
                            React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                            React.createElement("hr", null)
                        ),
                        chart,
                        React.createElement(
                            "p",
                            { className: "box-chart-font bg-lgt" },
                            React.createElement(
                                "strong",
                                null,
                                "Fonte:"
                            ),
                            " ",
                            item.fontes
                        ),
                        React.createElement(
                            "div",
                            { className: "btn btn-outline-primary float-right", onClick: function () {
                                    return _this.callModal(item.chart);
                                } },
                            "Visualize os dados em tabela"
                        ),
                        React.createElement("br", null),
                        React.createElement("br", null)
                    );
                }).bind(this));
            }

            if (this.state.menu) {
                menu = this.state.menu.map((function (item, index) {
                    var _this2 = this;

                    return React.createElement(
                        "li",
                        { className: index === 0 ? 'menu-left-active' : '', key: 'menu' + index, id: "divMenuChart" + index, style: { cursor: 'pointer' } },
                        React.createElement(
                            "a",
                            { onClick: function () {
                                    return _this2.callMenu(index);
                                } },
                            index + 1,
                            " - ",
                            item
                        )
                    );
                    console.log(this.callMenu());
                }).bind(this));
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-12", style: { margin: '-20px 0 0 0' } },
                            React.createElement(
                                "a",
                                { onClick: function () {
                                        return _this3.showHideLine();
                                    } },
                                React.createElement("i", { id: "iconLine", className: "fas fa-bars fa-2x float-right icons-top curso-poite cursor" })
                            ),
                            React.createElement(
                                "a",
                                { onClick: function () {
                                        return _this3.showHideColumn();
                                    } },
                                React.createElement("i", { id: "iconColumn", className: "fas fa-columns fa-2x float-right icons-top icons-top-active cursor" })
                            ),
                            React.createElement("br", null),
                            React.createElement("br", null)
                        ),
                        React.createElement(
                            "div",
                            { id: "column", className: "col-md-3" },
                            React.createElement(
                                "ul",
                                { className: "menu-left menu-left-chart" },
                                menu
                            )
                        ),
                        React.createElement(
                            "div",
                            { id: "line", className: "col-md-9" },
                            charts
                        )
                    ),
                    modal
                )
            );
        }
    }]);

    return Indicator;
})(React.Component);