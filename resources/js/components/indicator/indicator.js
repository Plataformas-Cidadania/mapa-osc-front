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

            table: ['teste'],
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount(){
        //this.loadChart();
    }

    componentWillReceiveProps(props){


        let chart1 = props.data.series_1;

        let labels = [];
        let series = [];
        let name = "Nome Serie";
        let type = "Coluna";

        for (var i = 0; i < chart1.length; i++) {
            labels += chart1[i].label + ",";
            series += chart1[i].value + ",";
        }

        labels = labels.split(',');

        let data = series.split(',');

        let chart = {
            chart: {
                labels,
                series:{
                    data,
                    name,
                    type,
                },
            }
        }

        console.log("Chart 1", chart);


        this.setState({
            data: chart,
            //data: props.data,
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
                            {/*Bloco Chart start*/}
                            <div className="box-chart">
                                <div className="title-style" style={{perspective: '1000px'}}>
                                    <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                        Regiões, 2018</h2>
                                    <div className="line line-fix block" data-move-x="980px"
                                         style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                                    <hr/>
                                </div>
                                <MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.data.chart.series} labels={this.state.data.chart.labels}/>
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
                                <MixedChart id='mix-chart2' yaxis={['Teste']} series={this.state.data.chart.series} labels={this.state.data.chart.labels}/>
                                {/*<MixedChart id='pie-chart' series={this.state.data.chart2.series} labels={this.state.data.chart2.labels}/>*/}
                                {/*<MixedChart id='mix-chart2' yaxis={['Teste2']} series={this.state.series} labels={this.state.labels}/>*/}
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
                                <PieChart id='pie-chart' series={this.state.data.chart2.series} labels={this.state.data.chart2.labels}/>
                                {/*<MixedChart id='mix-chart2' yaxis={['Teste2']} series={this.state.series} labels={this.state.labels}/>*/}
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

                    {modal}

                </div>
            </div>
        );

    }





}
