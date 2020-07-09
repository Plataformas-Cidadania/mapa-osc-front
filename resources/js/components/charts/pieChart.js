class PieChart extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            chartOptions:{
                labels: props.data ? props.labels : [],
            },
            options: {
                //labels: ['Team A', 'Team B'],

                //labels: props.data ? props.labels : [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            //series: [44, 55, 13, 43, 22],

            series: props.data ? props.series : [],
        }
    }

    componentWillReceiveProps(props){

        if(props){

            if(props.labels != this.state.options.labels || props.series != this.state.series){

                //let options = this.state.options;
                //options.labels = props.labels;
                let chartOptions = this.state.chartOptions;
                chartOptions.labels = props.labels;

                let series = this.state.series;
                series = props.series;

                this.setState({options: chartOptions, series: series}, function(){
                    //ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                    //ApexCharts.exec(this.props.id, 'updateOptions', options);
                });

                console.log('*******', chartOptions);
                console.log('*******', series);

            }
        }

    }




    render() {
        return (
            <div>
                <div  id={this.props.id}>
                    <ReactApexChart options={this.state.options} chartOptions={this.state.chartOptions} series={this.state.series} type="pie" width="380" />
                </div>
                <div id={"html-dist-"+this.props.id}>
                </div>
            </div>
        );
    }
}
