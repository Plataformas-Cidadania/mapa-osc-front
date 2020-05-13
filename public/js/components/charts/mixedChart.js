class MixedChart extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            labels: [],
            options: {
                chart: {
                    stacked: false,
                    id: props.id
                },
                stroke: {
                    width: [0, 2, 5],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%'
                    }
                },

                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                //labels: props.labels,

                //labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'number',
                    categories: props.labels
                },
                yaxis: [props.yaxis]
                /*yaxis: [{
                    title: {
                        text: 'Website Blog',
                    },
                  }, {
                    opposite: true,
                    title: {
                        text: 'Social Media'
                    }
                }]*/
                /*yaxis: {
                    title: {
                        text: 'Valores baseado primeira série',
                    },
                    min: 0
                }*/
                , tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " ";
                                //return y.toFixed(0) + " points";
                            }
                            return y;
                        }
                    }
                }
            },
            series: []
        };
        //console.log(props.labels);
        //console.log(series);
    }

    componentWillReceiveProps(props) {

        if (props.series) {
            /*console.log(this.props.id, 'props series', props.series);
            console.log(this.props.id, 'state series', this.state.series);
            console.log(this.props.id, 'props labels', props.labels);
            console.log(this.props.id, 'state labels', this.state.labels);*/

            if (props.series != this.state.series || props.labels != this.state.labels) {

                let labels = [];
                for (let i in props.labels) {
                    labels.push(props.labels[i]);
                }

                let options = this.state.options;
                options.xaxis.categories = props.labels;
                options.yaxis = props.yaxis;
                for (let i in options.yaxis) {
                    options.yaxis[i]['labels'] = {
                        formatter: function (val, index) {
                            return val.toFixed(options.yaxis[i]['decimais']);
                        }
                    };
                }
                this.setState({ series: props.series, options: options, labels: labels }, function () {
                    //console.log(this.props.id);
                    //console.log(this.props.id, 'labels', labels);
                    ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                    ApexCharts.exec(this.props.id, 'updateOptions', options);
                });
            }
        }
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: this.props.id },
                React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'line', height: '350' })
            ),
            React.createElement('div', { id: "html-dist-" + this.props.id })
        );
    }
}