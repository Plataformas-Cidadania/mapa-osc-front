class Indicator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mychart: null,
            data: null,
            loading: false,
            yaxis: [0,1,2,5,6],
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount(){
        //this.loadChart();
    }

    componentWillReceiveProps(props){
        console.log("***", props.data)
        this.setState({data: props.data, labels: props.data.labels, series: props.data.series});
        /*console.log(props)
        this.setState({
            data: props.data,
            labels: props.data.labels,
            series: props.data.series,
        });*/

    }

    loadChart(props){

    }

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

    render(){
        console.log("11", this.state.series)
        return (
            <div>
                {/*{this.state.yaxis}<br/>
                {this.state.series}<br/>
                {this.state.labels}<br/>*/}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
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
                        <div className="col-md-9">
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

                            {/*Bloco Chart start*/}
                            <div className="box-chart">
                                <div className="title-style" style={{perspective: '1000px'}}>
                                    <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                        Regiões, 2018</h2>
                                    <div className="line line-fix block" data-move-x="980px"
                                         style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                                    <hr/>
                                </div>
                                {/*<MixedChart id='mix-chart2' yaxis={['Teste']} series={[1,2,3,4,5]} labels={[1,2,3,4,5]}/>*/}
                                {/*<MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.data.series} labels={this.state.data.labels}/>*/}
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
            </div>
        );

    }





}
