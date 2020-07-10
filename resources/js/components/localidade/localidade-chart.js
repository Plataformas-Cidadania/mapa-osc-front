class LocalidadeChart extends React.Component{
    constructor(props){
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
            chart2: [],
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount(){
        //this.loadChart();
    }

    componentWillReceiveProps(props){
        //console.log(props);

        this.setState({
            data: props.data,
            labels: props.data.chart.labels,
            series: props.data.chart.series,
        });

    }

    loadChart(props){

    }

    modal(){
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

    render(){

            //console.log("11", this.state.data.chart2.series);


        return (
            <div>


                    <div className="row">

                        <div className="col-md-12">
                            {/*Bloco Chart start*/}
                            <div className="box-chart">
                                <div className="title-style" style={{perspective: '1000px'}}>
                                    <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                        Regiões, 2018</h2>
                                    <div className="line line-fix block" data-move-x="980px"
                                         style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                                    <hr/>
                                </div>
                                <MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>
                                {/*<MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>*/}
                                <p className="box-chart-font bg-lgt">
                                    <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                                </p>
                                <div className="btn btn-outline-primary float-right" data-toggle="modal"
                                     data-target=".bd-example-modal-lg">Visualize os dados em tabela
                                </div>
                                <br/><br/>
                            </div>
                            {/*Bloco Chart end*/}
                            <br/><br/><br/><br/>
                            {/*Bloco Chart start*/}
                            <div className="box-chart">
                                <div className="title-style" style={{perspective: '1000px'}}>
                                    <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                        Regiões, 2018</h2>
                                    <div className="line line-fix block" data-move-x="980px"
                                         style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                                    <hr/>
                                </div>
                                <MixedChart id='mix-chart2' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>
                                <p className="box-chart-font bg-lgt">
                                    <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                                </p>
                                <div className="btn btn-outline-primary float-right" data-toggle="modal"
                                     data-target=".bd-example-modal-lg">Visualize os dados em tabela
                                </div>
                                <br/><br/>
                            </div>
                            {/*Bloco Chart end*/}

                        </div>
                    </div>

                   {/* <div className="row">
                        <div className="col-md-7">
                            <br/><br/>
                            <h4>Quantidade Mensal e velocidade</h4>
                            <MixedChart  id='mix-chart2' yaxis={this.state.brtDataMonthChartY} series={this.state.brtDataMonthChart} labels={this.state.labelsMonth}/>
                        </div>
                    </div>*/}


            </div>
        );

    }





}
