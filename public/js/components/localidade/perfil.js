class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localidade: '',
            tipo: '',
            data: [],
            caracteristicas: [],
            evolucao_quantidade_osc_ano: []

        };
        this.load = this.load.bind(this);
        //this.load();
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'analises/localidade/33',
            cache: false,
            success: function (data) {
                this.setState({
                    loading: false,
                    caracteristicas: data.caracteristicas,
                    evolucao_quantidade_osc_ano: data.evolucao_quantidade_osc_ano,
                    localidade: data.tx_localidade,
                    tipo: data.tx_tipo_localidade
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {

        /////////////////////////////////////////////////////////////////////////////
        let ft_quantidade_projetos = null;
        if (this.state.caracteristicas.ft_quantidade_projetos) {
            ft_quantidade_projetos = this.state.caracteristicas.ft_quantidade_projetos.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let ft_quantidade_osc = null;
        if (this.state.caracteristicas.ft_quantidade_osc) {
            ft_quantidade_osc = this.state.caracteristicas.ft_quantidade_osc.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let ft_quantidade_trabalhadores = null;
        if (this.state.caracteristicas.ft_quantidade_trabalhadores) {
            ft_quantidade_trabalhadores = this.state.caracteristicas.ft_quantidade_trabalhadores.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let ft_quantidade_recursos = null;
        if (this.state.caracteristicas.ft_quantidade_recursos) {
            ft_quantidade_recursos = this.state.caracteristicas.ft_quantidade_recursos.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        /////////////////////////////////////////////////////////////////////////////
        let tx_primeiro_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado) {
            tx_primeiro_colocado_estado = this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado[0];
        }
        let tx_primeiro_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio) {
            tx_primeiro_colocado_municipio = this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio[0];
        }
        let tx_ultimo_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado) {
            tx_ultimo_colocado_estado = this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0];
        }
        let tx_ultimo_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio) {
            tx_ultimo_colocado_municipio = this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0];
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'title-style' },
                        React.createElement(
                            'h2',
                            null,
                            'Caracter\xEDsticas'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-12 text-center' },
                    React.createElement(
                        'h3',
                        null,
                        'Evolu\xE7\xE3o quantidade de OSCs por ano de funda\xE7\xE3o'
                    ),
                    React.createElement(MixedChart, {
                        id: 'mix-chart',
                        yaxis: ['Teste'],
                        series: [{
                            name: 'Quantidade OSCs',
                            type: 'line',
                            data: [31, 40, 28, 51, 42, 109, 100]
                        }, {
                            name: 'Quantidade OSCs Acumuladas',
                            type: 'area',
                            data: [50, 40, 80, 51, 200, 50, 80]
                        }],
                        labels: ['1922', '1930', '1940', '1950', '1960', '1970']
                        /*id={'mix-chart'+item.chart}
                        yaxis={['Teste']}
                        series={item.series}
                        labels={item.labels}*/
                    }),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary float-right' },
                        'Visualize os dados em tabela.'
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-3 text-center' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-hover p-2' },
                        React.createElement(
                            'h3',
                            null,
                            'Quantidade OSCs'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            this.state.caracteristicas.nr_quantidade_osc
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-3 text-center' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-hover p-2' },
                        React.createElement(
                            'h3',
                            null,
                            'Quantidade Trabalhadores'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            this.state.caracteristicas.nr_quantidade_trabalhadores
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-3 text-center' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-hover p-2' },
                        React.createElement(
                            'h3',
                            null,
                            'Transfer\xEAncias federais'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            this.state.caracteristicas.nr_quantidade_recursos
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-3 text-center' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-hover p-2' },
                        React.createElement(
                            'h3',
                            null,
                            'Quantidade Projetos'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            this.state.caracteristicas.nr_quantidade_projetos
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        this.state.localidade,
                        ' \xE9 o\xA0',
                        React.createElement(
                            'strong',
                            null,
                            this.state.evolucao_quantidade_osc_ano.nr_colocacao_nacional,
                            '\xBA'
                        ),
                        ' em rela\xE7\xE3o a quantidade de OSCs no \xE2mbito nacional. Nesse ranking, o estado\xA0 (',
                        tx_primeiro_colocado_estado,
                        ', ',
                        React.createElement(
                            'strong',
                            null,
                            this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado
                        ),
                        ') e o munic\xEDpio\xA0 (',
                        tx_primeiro_colocado_municipio,
                        ',\xA0',
                        React.createElement(
                            'strong',
                            null,
                            this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio
                        ),
                        ' OSCs) s\xE3o os que cont\xEAm mais OSCs. O estado\xA0 (',
                        tx_ultimo_colocado_estado,
                        ') e o munic\xEDpio\xA0 (',
                        tx_ultimo_colocado_municipio,
                        ') s\xE3o os que cont\xEAm menos OSCs,\xA0',
                        React.createElement(
                            'strong',
                            null,
                            this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado
                        ),
                        ' e\xA0',
                        React.createElement(
                            'strong',
                            null,
                            this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio
                        ),
                        ' respectivamente.'
                    ),
                    React.createElement(
                        'p',
                        { className: 'box-chart-font bg-lgt' },
                        React.createElement(
                            'strong',
                            null,
                            'Fonte quantidade OSCs:'
                        ),
                        '  ',
                        ft_quantidade_osc,
                        ' ',
                        React.createElement('br', null),
                        React.createElement(
                            'strong',
                            null,
                            'Fonte quantidade trabalhadores:'
                        ),
                        ' ',
                        ft_quantidade_trabalhadores,
                        ' ',
                        React.createElement('br', null),
                        React.createElement(
                            'strong',
                            null,
                            'Fonte valores de recursos:'
                        ),
                        ' ',
                        ft_quantidade_recursos,
                        ' ',
                        React.createElement('br', null),
                        React.createElement(
                            'strong',
                            null,
                            'Fonte quantidade projetos:'
                        ),
                        ' ',
                        ft_quantidade_projetos,
                        ' ',
                        React.createElement('br', null)
                    )
                )
            ),
            React.createElement('div', { className: 'space' }),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'title-style' },
                        React.createElement(
                            'h2',
                            null,
                            'Natureza Juridica'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Perfil, null), document.getElementById('perfil'));