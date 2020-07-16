class Indicator extends React.Component{
    constructor(props){
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
            charts: [],

            table: ['teste'],
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount(){
        //this.loadChart();
    }

    componentWillReceiveProps(props){

        let data = props.data;

        let charts = [];

        for(let chart in data){
            //console.log("######"+i+"######");
            let dataChart = data[chart].series_1;

            let labels = [];
            let series = [];
            let name = data[chart].titulo;
            let tituloX = data[chart].titulo_colunas[0];
            let tituloY = data[chart].titulo_colunas[1];

            let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" ? "column" : data[chart].tipo_grafico;



            for(let j in dataChart){

                //Quando tiver o key///////////////////////////////
                if(dataChart[j].hasOwnProperty('key')){

                    labels.push(dataChart[j].key);
                    let values = dataChart[j].values;

                    for(let k in values){

                        if(!series[k]){
                            series[k] = {};
                        }

                        series[k].name = values[k].label;
                        series[k].type = tipoGrafico;
                        if(!series[k].hasOwnProperty('data')){
                            series[k].data = [];
                        }
                        series[k].data[j] = values[k].value;
                    }

                    //console.log(labels);
                    //console.log(series);
                    //charts.push({labels: labels, series:series});

                    continue;
                }
                ///////////////////////////////////////////////////

                //Não é executado se tiver o key//////////////
                if(!series[j]){
                    series[j] = {
                        type: '',
                        values: []
                    };
                }
                labels.push(dataChart[j].label)
                series[j].type = tipoGrafico;
                series[j].values.push(dataChart[j].value);

                ///////////////////////////////////////////////


            }

            console.log("CHART" + chart);
            console.log(series);

            charts.push({chart: chart, labels: labels, series: series});

        }

        console.log(charts);

        this.setState({
            charts: charts,
            data: props.data,
        });
    }

    loadChart(props){

    }

    modal(){

        let tbody = [];

        if(this.state.table){
            tbody = (
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
            );
        }

        return (
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Título do modal</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Primeiro</th>
                                <th scope="col">Último</th>
                                <th scope="col">Nickname</th>
                            </tr>
                            </thead>
                            {tbody}
                        </table>

                        <div className="bd-callout bd-callout-warning">
                            <h5 id="incompatibilidade-jquery">Fonte:</h5>
                            <p className="box-chart-model-font">Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>

                </div>
            </div>
        </div>
        )
    }

    showHideColumn(){
        document.getElementById('line').setAttribute("class", "col-md-9");
        document.getElementById('column').setAttribute("class", "col-md-3");
        document.getElementById('column').style.display = "block";
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
    }
    showHideLine(){
        document.getElementById('line').setAttribute("class", "col-md-12");
        document.getElementById('column').style.display = "none";
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
    }


    render(){

        let charts = null;

        if(this.state.charts){
            charts = this.state.charts.map(function(item){
                return (
                    <div className="box-chart" key={"divChart"+item.chart}>
                        <div className="title-style" style={{perspective: '1000px'}}>
                            <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                Regiões, 2018</h2>
                            <div className="line line-fix block" data-move-x="980px"
                                 style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                            <hr/>
                        </div>
                        <MixedChart id={'mix-chart'+item.chart} yaxis={['Teste']} series={item.series} labels={item.labels}/>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                        </p>
                        <div className="btn btn-outline-primary float-right" data-toggle="modal"
                             data-target=".bd-example-modal-lg">Visualize os dados em tabela
                        </div>
                        <br/><br/>
                    </div>
                );
            });
        }


        let modal = this.modal();

        return (
            <div>


                <div className="container">
                    <div className="row">
                        <div className="col-md-12" style={{margin: '-20px 0 0 0'}}>
                            <a onClick={() => this.showHideLine()}><i id="iconLine" className="fas fa-bars fa-2x float-right icons-top curso-poite cursor"/></a>
                            <a onClick={() => this.showHideColumn()}><i id="iconColumn" className="fas fa-columns fa-2x float-right icons-top icons-top-active cursor"/></a>
                            <br/><br/>
                        </div>
                        <div id="column" className="col-md-3">
                            <ul className="menu-left menu-left-chart">
                                <li className="list-group-item-theme  menu-left-active">
                                    <a href="#">1- Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                        Regiões, 2018</a>
                                </li>
                                <li className="list-group-item-theme">
                                    <a href="#">2- Número de vínculos formais de trabalho nas OSC, segundo Grandes
                                        Regiões, 2018</a>
                                </li>
                            </ul>
                        </div>
                        <div id="line" className="col-md-9">
                            {charts}
                            {/*/!*Bloco Chart start*!/*/}
                            {/*<div className="box-chart">*/}
                            {/*    <div className="title-style" style={{perspective: '1000px'}}>*/}
                            {/*        <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes*/}
                            {/*            Regiões, 2018</h2>*/}
                            {/*        <div className="line line-fix block" data-move-x="980px"*/}
                            {/*             style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />*/}
                            {/*        <hr/>*/}
                            {/*    </div>*/}
                            {/*    <MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.data.chart.series} labels={this.state.data.chart.labels}/>*/}
                            {/*    /!*<MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>*!/*/}
                            {/*    <p className="box-chart-font bg-lgt">*/}
                            {/*        <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS*/}
                            {/*    </p>*/}
                            {/*    <div className="btn btn-outline-primary float-right" data-toggle="modal"*/}
                            {/*         data-target=".bd-example-modal-lg">Visualize os dados em tabela*/}
                            {/*    </div>*/}
                            {/*    <br/><br/>*/}
                            {/*</div>*/}
                            {/*/!*Bloco Chart end*!/*/}

                            {/*/!*Bloco Chart start*!/*/}
                            {/*<div className="box-chart">*/}
                            {/*    <div className="title-style" style={{perspective: '1000px'}}>*/}
                            {/*        <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes*/}
                            {/*            Regiões, 2018</h2>*/}
                            {/*        <div className="line line-fix block" data-move-x="980px"*/}
                            {/*             style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />*/}
                            {/*        <hr/>*/}
                            {/*    </div>*/}
                            {/*    <MixedChart id='mix-chart2' yaxis={['Teste']} series={this.state.data.chart.series} labels={this.state.data.chart.labels}/>*/}
                            {/*    /!*<MixedChart id='pie-chart' series={this.state.data.chart2.series} labels={this.state.data.chart2.labels}/>*!/*/}
                            {/*    /!*<MixedChart id='mix-chart2' yaxis={['Teste2']} series={this.state.series} labels={this.state.labels}/>*!/*/}
                            {/*    <p className="box-chart-font bg-lgt">*/}
                            {/*        <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS*/}
                            {/*    </p>*/}
                            {/*    <div className="btn btn-outline-primary float-right" data-toggle="modal"*/}
                            {/*         data-target=".bd-example-modal-lg">Visualize os dados em tabela*/}
                            {/*    </div>*/}
                            {/*    <br/><br/>*/}
                            {/*</div>*/}
                            {/*/!*Bloco Chart end*!/*/}

                            {/*/!*Bloco Chart start*!/*/}
                            {/*<div className="box-chart">*/}
                            {/*    <div className="title-style" style={{perspective: '1000px'}}>*/}
                            {/*        <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes*/}
                            {/*            Regiões, 2018</h2>*/}
                            {/*        <div className="line line-fix block" data-move-x="980px"*/}
                            {/*             style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />*/}
                            {/*        <hr/>*/}
                            {/*    </div>*/}
                            {/*    <PieChart id='pie-chart' series={this.state.data.chart2.series} labels={this.state.data.chart2.labels}/>*/}
                            {/*    /!*<MixedChart id='mix-chart2' yaxis={['Teste2']} series={this.state.series} labels={this.state.labels}/>*!/*/}
                            {/*    <p className="box-chart-font bg-lgt">*/}
                            {/*        <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS*/}
                            {/*    </p>*/}
                            {/*    <div className="btn btn-outline-primary float-right" data-toggle="modal"*/}
                            {/*         data-target=".bd-example-modal-lg">Visualize os dados em tabela*/}
                            {/*    </div>*/}
                            {/*    <br/><br/>*/}
                            {/*</div>*/}
                            {/*/!*Bloco Chart end*!/*/}
                        </div>
                    </div>

                   {/* <div className="row">
                        <div className="col-md-7">
                            <br/><br/>
                            <h4>Quantidade Mensal e velocidade</h4>
                            <MixedChart  id='mix-chart2' yaxis={this.state.brtDataMonthChartY} series={this.state.brtDataMonthChart} labels={this.state.labelsMonth}/>
                        </div>
                    </div>*/}

                    {modal}

                </div>
            </div>
        );

    }





}
