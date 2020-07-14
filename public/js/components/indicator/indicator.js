class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mychart: null,
            data: {
                chart: {},
                chart2: {}
            },
            loading: false,
            yaxis: [],
            labels: [],
            series: [],
            charts: [],

            table: ['teste']
        };

        this.loadChart = this.loadChart.bind(this);
    }

    componentDidMount() {
        //this.loadChart();
    }

    componentWillReceiveProps(props) {

        let data = props.data;

        let charts = [];

        for (let i in data) {
            //console.log("######"+i+"######");
            let chart = data[i].series_1;

            let labels = [];
            let series = [];
            let name = data[i].titulo;
            let tituloX = data[i].titulo_colunas[0];
            let tituloY = data[i].titulo_colunas[1];
            let tipoGrafico = data[i].tipo_grafico;

            for (let j in chart) {

                if (chart[j].hasOwnProperty('key')) {

                    labels.push(chart[j].key);
                    let values = chart[j].values;

                    for (let k in values) {

                        if (!series[k]) {
                            series[k] = {};
                        }

                        series[k].name = values[k].label;
                        series[k].type = tipoGrafico;
                        if (!series[k].hasOwnProperty('data')) {
                            series[k].data = [];
                        }
                        series[k].data[j] = values[k].value;
                    }

                    //console.log(labels);
                    //console.log(series);
                    charts.push({ labels: labels, series: series });

                    continue;
                }

                if (!series[j]) {
                    series[j] = {
                        type: '',
                        values: []
                    };
                }
                labels.push(chart[j].label);
                series[j].type = tipoGrafico;
                series[j].values.push(chart[j.value]);

                //console.log(labels);
                //console.log(series);
                charts.push({ labels: labels, series: series });
            }
        }

        console.log(charts);

        this.setState({
            charts: charts,
            data: props.data
        });
    }

    loadChart(props) {}

    modal() {

        let tbody = [];

        if (this.state.table) {
            tbody = React.createElement(
                'tbody',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { scope: 'row' },
                        '1'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Mark'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Otto'
                    ),
                    React.createElement(
                        'td',
                        null,
                        '@mdo'
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { scope: 'row' },
                        '2'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Jacob'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Thornton'
                    ),
                    React.createElement(
                        'td',
                        null,
                        '@fat'
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { scope: 'row' },
                        '3'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Larry'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'the Bird'
                    ),
                    React.createElement(
                        'td',
                        null,
                        '@twitter'
                    )
                )
            );
        }

        return React.createElement(
            'div',
            { className: 'modal fade bd-example-modal-lg', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog modal-lg' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h5',
                            { className: 'modal-title', id: 'exampleModalLabel' },
                            'T\xEDtulo do modal'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fechar' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\xD7'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'table',
                            { className: 'table' },
                            React.createElement(
                                'thead',
                                { className: 'thead-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        '#'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'Primeiro'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        '\xDAltimo'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'Nickname'
                                    )
                                )
                            ),
                            tbody
                        ),
                        React.createElement(
                            'div',
                            { className: 'bd-callout bd-callout-warning' },
                            React.createElement(
                                'h5',
                                { id: 'incompatibilidade-jquery' },
                                'Fonte:'
                            ),
                            React.createElement(
                                'p',
                                { className: 'box-chart-model-font' },
                                'Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                            'Fechar'
                        )
                    )
                )
            )
        );
    }

    showHideColumn() {
        document.getElementById('line').setAttribute("class", "col-md-9");
        document.getElementById('column').setAttribute("class", "col-md-3");
        document.getElementById('column').style.display = "block";
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
    }
    showHideLine() {
        document.getElementById('line').setAttribute("class", "col-md-12");
        document.getElementById('column').style.display = "none";
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
    }

    render() {

        let charts = null;

        /*if(this.state.charts){
            charts = this.state.charts.map(function(item){
                return (
                    <div className="box-chart">
                        <div className="title-style" style={{perspective: '1000px'}}>
                            <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes
                                Regiões, 2018</h2>
                            <div className="line line-fix block" data-move-x="980px"
                                 style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                            <hr/>
                        </div>
                        <MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.data.chart.series} labels={this.state.data.chart.labels}/>
                        {/!*<MixedChart id='mix-chart1' yaxis={['Teste']} series={this.state.series} labels={this.state.labels}/>*!/}
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                        </p>
                        <div className="btn btn-outline-primary float-right" data-toggle="modal"
                             data-target=".bd-example-modal-lg">Visualize os dados em tabela
                        </div>
                        <br/><br/>
                    </div>
                );
            });
        }*/

        let modal = this.modal();

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
                        { className: 'col-md-12', style: { margin: '-20px 0 0 0' } },
                        React.createElement(
                            'a',
                            { onClick: () => this.showHideLine() },
                            React.createElement('i', { id: 'iconLine', className: 'fas fa-bars fa-2x float-right icons-top curso-poite cursor' })
                        ),
                        React.createElement(
                            'a',
                            { onClick: () => this.showHideColumn() },
                            React.createElement('i', { id: 'iconColumn', className: 'fas fa-columns fa-2x float-right icons-top icons-top-active cursor' })
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { id: 'column', className: 'col-md-3' },
                        React.createElement(
                            'ul',
                            { className: 'menu-left menu-left-chart' },
                            React.createElement(
                                'li',
                                { className: 'list-group-item-theme  menu-left-active' },
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    '1- Distribui\xE7\xE3o de OSCs, por faixas de v\xEDnculo formais, segundo Grandes Regi\xF5es, 2018'
                                )
                            ),
                            React.createElement(
                                'li',
                                { className: 'list-group-item-theme' },
                                React.createElement(
                                    'a',
                                    { href: '#' },
                                    '2- N\xFAmero de v\xEDnculos formais de trabalho nas OSC, segundo Grandes Regi\xF5es, 2018'
                                )
                            )
                        )
                    ),
                    React.createElement('div', { id: 'line', className: 'col-md-9' })
                ),
                modal
            )
        );
    }

}