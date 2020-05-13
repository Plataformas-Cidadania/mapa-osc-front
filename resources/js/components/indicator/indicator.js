class Indicator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mymap: null,
            data: null,
            legend: [],
            indexLegend: 1,
            lastIndexLegend: 0,
            carregado: false,
            colors: ['black', 'orange', 'blue', 'green'],

            brtData: null,

            brtDataMonth: null,
            brtDataHour: null,
            brtDataTenHours: null,

            brtDataChart: null,
            brtDataChartY: null,
            brtDataMonthChart: null,
            brtDataMonthChartY: null,
            brtDataHourChart: null,
            brtDataHourChartY: null,
            brtDataTenHoursChart: null,

            labelsDiaria: null,
            labelsMonth: null,
            labelsHour: null,
            labelsTenHours: [1, 10],


        };


       // this.refreshMarkers = this.refreshMarkers.bind(this);


    }

    componentDidMount(){
        this.setState({mymap: L.map(this.props.mapId, {
                fullscreenControl: true,
                fullscreenControlOptions: { // optional
                    title:"Show me the fullscreen !",
                    titleCancel:"Exit fullscreen mode"
                }
            }).setView([-14, -52], 4)}, function(){
        });
    }

    componentWillReceiveProps(props){

        if(this.state.data != props.data){
            this.setState({data: props.data}, function(){

                if(this.state.data){


                }
            });
        }

    }






    render(){


        let weekCharts = null;



        if(this.state.data){






            if(this.state.brtDataHourChart){
                weekCharts = this.state.brtDataHourChart.map(function(item, index){
                    //console.log('brtDataHourChart', index, item);

                    return (
                        <div key={'mix-chart-week-'+index} style={{display:index==this.state.diaSemanaSelecionado ? '' : 'none'}}>
                            <MixedChart id={'mix-chart-week-'+index} yaxis={item['yaxis']} series={item['series']} labels={item['label']}/>
                        </div>
                    );
                }.bind(this));
            }
        }


        return (
            <div>
                <div id={this.props.mapId} style={{height: '600px'}}/>

                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <br/><br/>
                            <h4>Quantidade diaria e velocidade</h4>
                            <MixedChart id='mix-chart1' yaxis={this.state.brtDataChartY} series={this.state.brtDataChart} labels={this.state.labelsDiaria}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            <br/><br/>
                            <h4>Quantidade Mensal e velocidade</h4>
                            <MixedChart  id='mix-chart2' yaxis={this.state.brtDataMonthChartY} series={this.state.brtDataMonthChart} labels={this.state.labelsMonth}/>
                        </div>
                        {/*<div className="col-md-5">
                            <br/><br/>
                            <h4>Quantidade nas últimas 6 horas </h4>
                            <GroupedBarChart  id='groupe-bar-chart1' series={this.state.brtDataTenHoursChart} labels={this.state.labelsTenHours}/>
                        </div>*/}
                    </div>


                    <br/>
                    <div className="text-center">
                        <h2>BRTs</h2>
                        <p>Nessa área você consegue acompanha em tempo real a situação do BRTs</p>
                        <hr/>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive-sm">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Linha</th>
                                        <th>Código</th>
                                        <th>Trajeto</th>
                                        <th>Sentido</th>
                                        <th>Velocidade</th>
                                        {/*<th>Próximo</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        );

    }





}
