class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {
                labels: props.data ? props.labels : []
            },
            options: {
                //labels: ['Team A', 'Team B'],
<<<<<<< HEAD

                //labels: props.data ? props.labels : [],
=======
                labels: props.data ? props.labels : [],
>>>>>>> d4a7eace6b0ed96a26ebd3e402a68ff582d0abca
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
            series: props.data ? props.series : null
        };
    }

    componentWillReceiveProps(props) {
        if (props) {
            if (props.labels != this.state.options.labels || props.series != this.state.series) {

                //let options = this.state.options;
                //options.labels = props.labels;
                let chartOptions = this.state.chartOptions;
                chartOptions.labels = props.labels;

<<<<<<< HEAD
                let series = this.state.series;
                series = props.series;

                this.setState({ options: chartOptions, series: series }, function () {
                    //ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                    //ApexCharts.exec(this.props.id, 'updateOptions', options);
                });

                console.log('*******', chartOptions);
                console.log('*******', series);
=======
                let series = props.series;

                this.setState({ options: options, series: series }, function () {});
>>>>>>> d4a7eace6b0ed96a26ebd3e402a68ff582d0abca
            }
        }
    }

    render() {
        let chart = null;
        if (this.state.series) {
            chart = React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: "pie", width: "780" });
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { id: this.props.id },
<<<<<<< HEAD
                React.createElement(ReactApexChart, { options: this.state.options, chartOptions: this.state.chartOptions, series: this.state.series, type: 'pie', width: '380' })
=======
                chart
>>>>>>> d4a7eace6b0ed96a26ebd3e402a68ff582d0abca
            ),
            React.createElement("div", { id: "html-dist-" + this.props.id })
        );
    }
}