class PieChart extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            options: {
                //labels: ['Team A', 'Team B'],

                labels: props.data ? props.data.titles : [],
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

            series: props.data ? props.data.values : [],
        }
    }

    componentWillReceiveProps(props){
       //console.log(props);
        if(props.data){
            if(props.data.titles != this.state.options.labels || props.data.values != this.state.series){
                let options = this.state.options;
                options.labels = props.data.titles;

                let series = this.state.series;
                series = props.data.values;
                this.setState({options: options, series: series});

                console.log(props.data);
                console.log(options);

                /*ApexCharts.exec(this.props.id, 'updateSeries', series);
                ApexCharts.exec(this.props.id, 'updateOptions', options);*/
            }
        }

    }




    render() {
        return (
            <div>
                <div  id={this.props.id}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="380" />
                </div>
                <div id={"html-dist-"+this.props.id}>
                </div>
            </div>
        );
    }
}
