"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeChart = (function (_React$Component) {
    _inherits(HomeChart, _React$Component);

    function HomeChart(props) {
        _classCallCheck(this, HomeChart);

        _get(Object.getPrototypeOf(HomeChart.prototype), "constructor", this).call(this, props);
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

    _createClass(HomeChart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            //this.loadChart();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            console.log(props);

            this.setState({
                data: props.data,
                labels: props.data.chart.labels,
                series: props.data.chart.series
            });
        }
    }, {
        key: "loadChart",
        value: function loadChart(props) {}
    }, {
        key: "modal",
        value: function modal() {
            return React.createElement(
                "div",
                { className: "modal fade bd-example-modal-lg", tabIndex: "-1", role: "dialog", "aria-labelledby": "myLargeModalLabel", "aria-hidden": "true" },
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
                                "h5",
                                { className: "modal-title", id: "exampleModalLabel" },
                                "Título do modal"
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
                                { className: "table" },
                                React.createElement(
                                    "thead",
                                    { className: "thead-light" },
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "#"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "Primeiro"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "Último"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "Nickname"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { scope: "row" },
                                            "1"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Mark"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Otto"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "@mdo"
                                        )
                                    ),
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { scope: "row" },
                                            "2"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Jacob"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Thornton"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "@fat"
                                        )
                                    ),
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { scope: "row" },
                                            "3"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Larry"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "the Bird"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "@twitter"
                                        )
                                    )
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
                                    "Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019"
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
        key: "render",
        value: function render() {

            //console.log("11", this.state.data.chart2.series);

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement(
                            "div",
                            { className: "box-chart" },
                            React.createElement(
                                "div",
                                { className: "title-style", style: { perspective: '1000px' } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes Regiões, 2018"
                                ),
                                React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement("hr", null)
                            ),
                            React.createElement(MixedChart, { id: "mix-chart1", yaxis: ['Teste'], series: this.state.series, labels: this.state.labels }),
                            React.createElement(
                                "p",
                                { className: "box-chart-font bg-lgt" },
                                React.createElement(
                                    "strong",
                                    null,
                                    "Fonte:"
                                ),
                                " CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS"
                            ),
                            React.createElement(
                                "div",
                                { className: "btn btn-outline-primary float-right", "data-toggle": "modal",
                                    "data-target": ".bd-example-modal-lg" },
                                "Visualize os dados em tabela"
                            ),
                            React.createElement("br", null),
                            React.createElement("br", null)
                        ),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement("br", null),
                        React.createElement(
                            "div",
                            { className: "box-chart" },
                            React.createElement(
                                "div",
                                { className: "title-style", style: { perspective: '1000px' } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes Regiões, 2018"
                                ),
                                React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement("hr", null)
                            ),
                            React.createElement(MixedChart, { id: "mix-chart2", yaxis: ['Teste'], series: this.state.series, labels: this.state.labels }),
                            React.createElement(
                                "p",
                                { className: "box-chart-font bg-lgt" },
                                React.createElement(
                                    "strong",
                                    null,
                                    "Fonte:"
                                ),
                                " CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS"
                            ),
                            React.createElement(
                                "div",
                                { className: "btn btn-outline-primary float-right", "data-toggle": "modal",
                                    "data-target": ".bd-example-modal-lg" },
                                "Visualize os dados em tabela"
                            ),
                            React.createElement("br", null),
                            React.createElement("br", null)
                        )
                    )
                )
            );
        }
    }]);

    return HomeChart;
})(React.Component);

/*Bloco Chart start*/ /*<MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>*/ /*Bloco Chart end*/ /*Bloco Chart start*/ /*Bloco Chart end*/