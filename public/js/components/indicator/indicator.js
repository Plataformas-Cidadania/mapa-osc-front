class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mychart: null,
            data: {
                chart: {},
                chart2: {}
            },
            loading: false,
            yaxis: [],
            labels: [],
            series: [],

            table: ['teste']
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount() {
        //this.loadChart();
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        });
    }

    loadChart(props) {}

    modal() {

        let tbody = [];

        if (this.state.table) {
            tbody = React.createElement(
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
            );
        }

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
                            "T\xEDtulo do modal"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Fechar" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
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
                                        "\xDAltimo"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "Nickname"
                                    )
                                )
                            ),
                            tbody
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

    showHideColumn() {
        document.getElementById('line').setAttribute("class", "col-md-9");
        document.getElementById('column').setAttribute("class", "col-md-3");
        document.getElementById('column').style.display = "block";
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
    }
    showHideLine() {
        document.getElementById('line').setAttribute("class", "col-md-12");
        document.getElementById('column').style.display = "none";
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
    }

    render() {

        let modal = this.modal();

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
                            { onClick: () => this.showHideLine() },
                            React.createElement("i", { id: "iconLine", className: "fas fa-bars fa-2x float-right icons-top curso-poite cursor" })
                        ),
                        React.createElement(
                            "a",
                            { onClick: () => this.showHideColumn() },
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
                            React.createElement(
                                "li",
                                { className: "list-group-item-theme  menu-left-active" },
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "1- Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "list-group-item-theme" },
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "2- N\xFAmero de v\xEDnculos formais de trabalho nas OSC, segundo Grandes Regi\xF5es, 2018"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "line", className: "col-md-9" },
                        React.createElement(
                            "div",
                            { className: "box-chart" },
                            React.createElement(
                                "div",
                                { className: "title-style", style: { perspective: '1000px' } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"
                                ),
                                React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement("hr", null)
                            ),
                            React.createElement(MixedChart, { id: "mix-chart1", yaxis: ['Teste'], series: this.state.data.chart.series, labels: this.state.data.chart.labels }),
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
                        React.createElement(
                            "div",
                            { className: "box-chart" },
                            React.createElement(
                                "div",
                                { className: "title-style", style: { perspective: '1000px' } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"
                                ),
                                React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement("hr", null)
                            ),
                            React.createElement(MixedChart, { id: "mix-chart2", yaxis: ['Teste'], series: this.state.data.chart.series, labels: this.state.data.chart.labels }),
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
                        React.createElement(
                            "div",
                            { className: "box-chart" },
                            React.createElement(
                                "div",
                                { className: "title-style", style: { perspective: '1000px' } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018"
                                ),
                                React.createElement("div", { className: "line line-fix block", "data-move-x": "980px",
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement("hr", null)
                            ),
                            React.createElement(PieChart, { id: "pie-chart", series: this.state.data.chart2.series, labels: this.state.data.chart2.labels }),
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
                ),
                modal
            )
        );
    }

}