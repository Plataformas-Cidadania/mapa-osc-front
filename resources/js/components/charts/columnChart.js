class ColumnChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: props.labels,
                    tickAmount: 10,
                    labels: {
                        rotate: 0,
                        trim: false,
                    }
                },
                yaxis: {
                    title: {
                        text: props.series.name,
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return " " + val + " "
                        }
                    }
                }
            },
            /*series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
                type: "column",
            }]*/
            series: props.series,
        };

    }

    componentDidMount(){

    }

    render() {
        if(!this.state.series){
            return;
        }
        return (
            <div>
                <div id={this.props.id}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
                </div>
                <div id={"html-dist-"+this.props.id}>
                </div>
            </div>
        );
    }
}
