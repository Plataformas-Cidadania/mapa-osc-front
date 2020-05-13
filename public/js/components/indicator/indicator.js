class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mymap: null,
            data: null,
            legend: [],
            indexLegend: 1,
            lastIndexLegend: 0,
            carregado: false,
            colors: ['black', 'orange', 'blue', 'green'],

            brtData: null,

            brtDataMonth: null,
            brtDataHour: null,
            brtDataTenHours: null,

            brtDataChart: null,
            yaxis: [0, 1, 2, 5, 6],
            brtDataMonthChart: null,
            brtDataMonthChartY: null,
            brtDataHourChart: null,
            brtDataHourChartY: null,
            brtDataTenHoursChart: null,

            labelsDiaria: null,
            labelsMonth: null,
            labelsHour: null,
            labelsTenHours: [1, 10]

        };
    }

    componentDidMount() {}

    componentWillReceiveProps(props) {

        if (this.state.data != props.data) {
            this.setState({ data: props.data }, function () {
                if (this.state.data) {
                    //console.log(this.state.data);
                }
            });
        }
    }

    render() {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-9' },
                        React.createElement(
                            'div',
                            { className: 'box-chart' },
                            React.createElement(
                                'div',
                                { className: 'title-style', style: { perspective: '1000px' } },
                                React.createElement(
                                    'h2',
                                    null,
                                    '1 - Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018'
                                ),
                                React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px',
                                    style: { opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s' } }),
                                React.createElement('hr', null)
                            ),
                            React.createElement(MixedChart, { id: 'mix-chart1', yaxis: this.state.yaxis, series: this.state.series, labels: this.state.labels }),
                            React.createElement(
                                'p',
                                { className: 'box-chart-font bg-lgt' },
                                React.createElement(
                                    'strong',
                                    null,
                                    'Fonte:'
                                ),
                                ' CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS'
                            ),
                            React.createElement(
                                'div',
                                { className: 'btn btn-outline-primary float-right', 'data-toggle': 'modal',
                                    'data-target': '.bd-example-modal-lg' },
                                'Visualize os dados em tabela'
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null)
                        )
                    )
                )
            )
        );
    }

}