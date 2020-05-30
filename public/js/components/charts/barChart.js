class BarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    events: {
                        click: function (chart, w, e) {
                            console.log(chart, w, e);
                        }
                    },
                    id: props.id
                },
                colors: props.colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    //categories: ['BRT', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
                    categories: props.data ? props.data.titles : [],
                    labels: {
                        style: {
                            colors: props.colors,
                            fontSize: '14px'
                        }
                    }
                }
            },
            series: [{
                //data: props.data ? props.data.values : [10, 20, 30, 80, 70, 60, 50, 40]
                data: props.data ? props.data.values : []
            }]
        };

        this.update = this.update.bind(this);
    }

    componentWillReceiveProps(props) {
        //console.log(props);
        if (props.data) {
            if (props.data.titles != this.state.options.xaxis.categories || props.data.values != this.state.series[0].data) {
                let options = this.state.options;
                options.xaxis.categories = props.data.titles;
                let series = this.state.series;
                series[0].data = props.data.values;
                this.setState({ options: options, series: series });

                ApexCharts.exec(this.props.id, 'updateSeries', series);
                ApexCharts.exec(this.props.id, 'updateOptions', options);
            }
        }
    }

    update() {
        //let series = this.state.series;
        //series[0].data = [10, 200, 30, Math.floor(Math.random() * (90 - 50 + 1)) + 50, 70, 60, 50, Math.floor(Math.random() * (90 - 50 + 1)) + 50];
        ApexCharts.exec(this.props.id, 'updateSeries', [{
            data: [40, 55, 65, 11, 23, 44, 54, 33]
        }]);
        let options = this.state.options;
        options.xaxis.categories = ['aaa', 'sss', 'ddd', 'fff', 'ggg', 'hhh', 'jjj', 'kkk', 'lll'];
        ApexCharts.exec(this.props.id, 'updateOptions', options);
        //this.setState({series: series});
    }

    render() {

        //console.log(this.state);
        //console.log(this);

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'chart' },
                React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'bar', height: '350' })
            ),
            React.createElement('div', { id: 'html-dist' })
        );
    }
}