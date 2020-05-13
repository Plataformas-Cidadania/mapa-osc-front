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
            brtDataChartY: null,
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

        // this.refreshMarkers = this.refreshMarkers.bind(this);

    }

    componentDidMount() {
        this.setState({ mymap: L.map(this.props.mapId, {
                fullscreenControl: true,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen !",
                    titleCancel: "Exit fullscreen mode"
                }
            }).setView([-14, -52], 4) }, function () {});
    }

    componentWillReceiveProps(props) {

        if (this.state.data != props.data) {
            this.setState({ data: props.data }, function () {

                if (this.state.data) {}
            });
        }
    }

    render() {

        let weekCharts = null;

        if (this.state.data) {

            if (this.state.brtDataHourChart) {
                weekCharts = this.state.brtDataHourChart.map(function (item, index) {
                    //console.log('brtDataHourChart', index, item);

                    return React.createElement(
                        'div',
                        { key: 'mix-chart-week-' + index, style: { display: index == this.state.diaSemanaSelecionado ? '' : 'none' } },
                        React.createElement(MixedChart, { id: 'mix-chart-week-' + index, yaxis: item['yaxis'], series: item['series'], labels: item['label'] })
                    );
                }.bind(this));
            }
        }

        return React.createElement(
            'div',
            null,
            React.createElement('div', { id: this.props.mapId, style: { height: '600px' } }),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h4',
                            null,
                            'Quantidade diaria e velocidade'
                        ),
                        React.createElement(MixedChart, { id: 'mix-chart1', yaxis: this.state.brtDataChartY, series: this.state.brtDataChart, labels: this.state.labelsDiaria })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-7' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h4',
                            null,
                            'Quantidade Mensal e velocidade'
                        ),
                        React.createElement(MixedChart, { id: 'mix-chart2', yaxis: this.state.brtDataMonthChartY, series: this.state.brtDataMonthChart, labels: this.state.labelsMonth })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'text-center' },
                    React.createElement(
                        'h2',
                        null,
                        'BRTs'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Nessa \xE1rea voc\xEA consegue acompanha em tempo real a situa\xE7\xE3o do BRTs'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'table-responsive-sm' },
                            React.createElement(
                                'table',
                                { className: 'table' },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,
                                            'Linha'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'C\xF3digo'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Trajeto'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Sentido'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Velocidade'
                                        )
                                    )
                                ),
                                React.createElement('tbody', null)
                            )
                        )
                    )
                )
            )
        );
    }

}