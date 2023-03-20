class PolarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: props.data.serie,
            options: {
                chart: {
                    type: 'polarArea'
                },
                labels: props.data.labels,
                legend: {
                    show: false
                },
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
            }

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
                React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'polarArea', height: '200' })
            ),
            React.createElement('div', { id: "html-dist-" + this.props.id })
        );
    }
}

ReactDOM.render(React.createElement(PolarChart, null), document.getElementById('polarChart'));