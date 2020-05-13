class GroupedBarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                chart: {
                    stacked: false,
                    id: props.id
                },
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff']
                    }
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                },

                xaxis: {
                    categories: props.labels,
                }
            },
            series: [],
        }
    }


    componentWillReceiveProps(props){

        if(props.series){
            if(props.series != this.state.series || props.labels != this.state.options.labels){
                let options = this.state.options;
                options.xaxis.categories = props.labels;
                this.setState({series: props.series, options: options});
                ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                ApexCharts.exec(this.props.id, 'updateOptions', options);
            }
        }

    }

    render() {

        //console.log(this.state);
        //console.log(this);

        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
                </div>
                <div id="html-dist">
                </div>
            </div>

        );
    }
}
