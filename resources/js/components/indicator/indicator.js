class Indicator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            legend: [],
            indexLegend: 1,
            lastIndexLegend: 0,
            carregado: false,


            yaxis: [0,1,2,5,6],
            series: null,
            labels: null,




        };



    }

    componentDidMount(){

    }

    componentWillReceiveProps(props){

        if(this.state.data != props.data){
            this.setState({data: props.data}, function(){
                if(this.state.data){
                    //console.log(this.state.data);
                }
            });
        }

    }


    render(){


        return (

            <div>
               {/* {this.state.data}*/}
                <div className="container">

                    <div className="row">
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
                                <MixedChart id='mix-chart1' yaxis={this.state.yaxis} series={this.state.series} labels={this.state.labels}/>
                                {/*<MixedChart id='mix-chart1' yaxis={this.state.yaxis} series={this.state.series} labels={this.state.labels}/>*/}
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