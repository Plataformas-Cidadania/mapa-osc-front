class ColumnChart extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
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
                    }
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
                        trim: false
                    }
                },
                yaxis: {
                    title: {
                        text: props.series[0].name
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return " " + val + " ";
                        }
                    }
                }
            },
            /*series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }]*/
            series: props.series
        };
    }

    componentDidMount() {}

    render() {
        if (!this.state.series) {
            return;
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: this.props.id },
                React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'bar', height: '350' })
            ),
            React.createElement('div', { id: "html-dist-" + this.props.id })
        );
    }
}