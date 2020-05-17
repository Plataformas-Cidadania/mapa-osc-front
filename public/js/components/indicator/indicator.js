class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mychart: null,
            data: [],
            loading: false,
            yaxis: [],
            labels: [],
            series: []
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount() {
        //this.loadChart();
    }

    componentWillReceiveProps(props) {

        this.setState({ data: props.data, labels: props.data.labels, series: props.data.series });

        /*console.log(props)
        this.setState({
            data: props.data,
            labels: props.data.labels,
            series: props.data.series,
        });*/
    }

    loadChart(props) {}

    /* modal(){
         <!-- Modal -->
         <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
             <div class="modal-dialog modal-lg">
                 <div class="modal-content">
                     <!-- Modal content -->
                     <div class="modal-header">
                         <h5 class="modal-title" id="exampleModalLabel">Título do modal</h5>
                         <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                             <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div class="modal-body">
                         <!-- Modal table -->
                         <table class="table">
                             <thead class="thead-light">
                             <tr>
                                 <th scope="col">#</th>
                                 <th scope="col">Primeiro</th>
                                 <th scope="col">Último</th>
                                 <th scope="col">Nickname</th>
                             </tr>
                             </thead>
                             <tbody>
                             <tr>
                                 <th scope="row">1</th>
                                 <td>Mark</td>
                                 <td>Otto</td>
                                 <td>@mdo</td>
                             </tr>
                             <tr>
                                 <th scope="row">2</th>
                                 <td>Jacob</td>
                                 <td>Thornton</td>
                                 <td>@fat</td>
                             </tr>
                             <tr>
                                 <th scope="row">3</th>
                                 <td>Larry</td>
                                 <td>the Bird</td>
                                 <td>@twitter</td>
                             </tr>
                             </tbody>
                         </table>
                         <!-- Modal table -->
                         <div class="bd-callout bd-callout-warning">
                             <h5 id="incompatibilidade-jquery">Fonte:</h5>
                             <p class="box-chart-model-font">Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019</p>
                         </div>
                     </div>
                     <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                     </div>
                     <!-- Modal grande -->
                 </div>
             </div>
         </div>
         <!-- Modal -->
     }*/

    render() {
        console.log("11", this.state.series);
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
                        { className: "col-md-3" },
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
                        { className: "col-md-9" },
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
                            React.createElement(PieChart, { id: "pie-chart", series: this.state.series, labels: this.state.labels }),
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
            )
        );
    }

}