class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localidade: '',
            tipo: '',
            data: [],
            caracteristicas: [],
            evolucao_quantidade_osc_ano: [],
            natureza_juridica: [],
            trabalhadores: [],
            area_atuacao: [],
            orcamento: [],
            repasse_recursos: []

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

                /*////////////natureza_juridica////////////*/
                let series = [{
                    name: 'Quantidade OSCs',
                    type: 'column',
                    data: []
                }];
                let labels = [];
                data.natureza_juridica.series_1.find(function (item) {
                    series[0].data.push(item.value);
                    labels.push(item.label);
                });
                let natureza_juridica_chart = {
                    'labels': labels,
                    'series': series

                    /*////////////Trabalhadores////////////*/
                };let trabalhadores_series = [{
                    name: 'Número de Trabalhadores',
                    type: 'column',
                    data: []
                }];
                let trabalhadores_labels = [];
                data.trabalhadores.series_1.find(function (item) {
                    trabalhadores_series[0].data.push(item.value);
                    trabalhadores_labels.push(item.label);
                });
                let trabalhadores_chart = {
                    'labels': trabalhadores_labels,
                    'series': trabalhadores_series

                    /*////////////Área de Atuação////////////*/

                };let area_atuacao_series = [];
                let area_atuacao_labels = [];
                data.area_atuacao.series_1.find(function (item) {
                    area_atuacao_series.push(item.value);
                    area_atuacao_labels.push(item.label);
                });
                let area_atuacao_chart = {
                    'labels': area_atuacao_labels,
                    'series': area_atuacao_series
                    /*//////////////////////////////////////////////*/
                };let repasse_recursos_labels = [];
                let repasse_recursos_series = [];

                if (data.repasse_recursos) {

                    let groupSerie = [];
                    for (let serie in data.repasse_recursos.series_1) {

                        let serieName = data.repasse_recursos.series_1[serie].key;

                        let serieTeste = {
                            name: serieName,
                            type: 'line',
                            data: []
                        };

                        groupSerie.push(serieTeste);

                        for (let k in data.repasse_recursos.series_1[serie].values) {
                            repasse_recursos_labels.push(data.repasse_recursos.series_1[serie].values[k].x);

                            serieTeste.data.push(data.repasse_recursos.series_1[serie].values[k].y);
                        }
                    }

                    repasse_recursos_series.push(groupSerie);
                }

                let chart_repasse_recursos_series = repasse_recursos_series[0];

                let unique_repasse_recursos_labels = [...new Set(repasse_recursos_labels)];
                unique_repasse_recursos_labels = unique_repasse_recursos_labels.sort();

                let repasse_recursos_chart = {
                    'labels': unique_repasse_recursos_labels,
                    'series': chart_repasse_recursos_series

                    /*//////////////////////////////////////////////*/

                };this.setState({
                    loading: false,
                    caracteristicas: data.caracteristicas,
                    evolucao_quantidade_osc_ano: data.evolucao_quantidade_osc_ano,

                    natureza_juridica: data.natureza_juridica,
                    trabalhadores: data.trabalhadores,
                    repasse_recursos: data.repasse_recursos,
                    orcamento: data.orcamento,

                    natureza_juridica_chart: natureza_juridica_chart,
                    trabalhadores_chart: trabalhadores_chart,
                    area_atuacao_chart: area_atuacao_chart,
                    repasse_recursos_chart: repasse_recursos_chart,

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
        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////Natureza Juridica///////////////////////////////////////////
        let ft_natureza_juridica = null;
        if (this.state.natureza_juridica.fontes) {
            ft_natureza_juridica = this.state.natureza_juridica.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let tx_porcentagem_maior = '';
        if (this.state.natureza_juridica.tx_porcentagem_maior) {
            tx_porcentagem_maior = this.state.natureza_juridica.tx_porcentagem_maior[0];
        }
        let tx_porcentagem_maior_media_nacional = '';
        if (this.state.natureza_juridica.tx_porcentagem_maior_media_nacional) {
            tx_porcentagem_maior_media_nacional = this.state.natureza_juridica.tx_porcentagem_maior_media_nacional[0];
        }

        let natureza_juridica_chart = null;
        if (this.state.natureza_juridica_chart) {
            natureza_juridica_chart = React.createElement(ColumnChart, {
                id: 'natureza-chart',
                series: this.state.natureza_juridica_chart.series,
                labels: this.state.natureza_juridica_chart.labels
            });
        }
        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_trabalhadores = null;
        if (this.state.trabalhadores.fontes) {
            ft_trabalhadores = this.state.natureza_juridica.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let trabalhadores_chart = null;
        if (this.state.trabalhadores_chart) {
            trabalhadores_chart = React.createElement(ColumnChart, {
                id: 'natureza-chart',
                series: this.state.trabalhadores_chart.series,
                labels: this.state.trabalhadores_chart.labels
            });
        }

        let vinculos_deficiencia = "";
        let voluntarios = "";
        let vinculos_formais = "";
        if (this.state.trabalhadores.series_1) {
            vinculos_deficiencia = this.state.trabalhadores.series_1[0].value;
            voluntarios = this.state.trabalhadores.series_1[1].value;
            vinculos_formais = this.state.trabalhadores.series_1[2].value;
        }

        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_area_atuacao = null;
        if (this.state.area_atuacao.fontes) {
            ft_area_atuacao = this.state.area_atuacao.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let nr_area_atuacao = '';
        if (this.state.area_atuacao.media_nacional) {
            nr_area_atuacao = this.state.area_atuacao.media_nacional[0].nr_area_atuacao;
        }

        let tx_area_atuacao = '';
        if (this.state.area_atuacao.media_nacional) {
            tx_area_atuacao = this.state.area_atuacao.media_nacional[0].tx_area_atuacao;
        }

        let area_atuacao_chart = null;
        if (this.state.area_atuacao_chart) {
            area_atuacao_chart = React.createElement(PieChart, {
                id: 'area-atuacao-chart',
                width: 500,
                series: this.state.area_atuacao_chart.series,
                labels: this.state.area_atuacao_chart.labels
            });
        }

        //////////////////////////////////Repasse de Recursos///////////////////////////////////////////
        let ft_repasse_recursos = null;
        if (this.state.repasse_recursos.fontes) {
            ft_repasse_recursos = this.state.repasse_recursos.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }
        //////////////////////////////////Transferências Federais///////////////////////////////////////////
        let ft_orcamento = null;
        if (this.state.orcamento.fontes) {
            ft_orcamento = this.state.orcamento.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        /////////////////////////////////////////////////////////////////////////////////////////////

        /*let repasse_recursos_labels = [];
        let repasse_recursos_series = [];
         let callChart = false;
         if(this.state.repasse_recursos){
             let groupSerie = [];
            for(let serie in this.state.repasse_recursos.series_1){
                 let serieName = this.state.repasse_recursos.series_1[serie].key;
                 let serieTeste = {
                    name: serieName,
                    type: 'line',
                    data: []
                };
                 groupSerie.push(serieTeste);
                 for(let k in this.state.repasse_recursos.series_1[serie].values) {
                    repasse_recursos_labels.push(this.state.repasse_recursos.series_1[serie].values[k].x);
                     serieTeste.data.push(this.state.repasse_recursos.series_1[serie].values[k].y);
                }
             }
             repasse_recursos_series.push(groupSerie);
            callChart = true;
        }
         */

        let repasse_recursos_chart = null;
        if (this.state.repasse_recursos_chart) {

            repasse_recursos_chart = React.createElement(MixedChart, {
                id: 'mix-chart-repasse_recursos',
                series: this.state.repasse_recursos_chart.series,
                labels: this.state.repasse_recursos_chart.labels
            });
        }

        ///////////////////////////////////////////////////


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
                        labels: [1922, 1930, 1940, 1950, 1960, 1970]
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
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        'Na popula\xE7\xE3o de OSCs do estado, ',
                        this.state.natureza_juridica.nr_porcentagem_maior,
                        '% s\xE3o classificadas como ',
                        tx_porcentagem_maior,
                        '. A m\xE9dia nacional \xE9 de ',
                        this.state.natureza_juridica.nr_porcentagem_maior_media_nacional,
                        '% de OSCs identificadas como ',
                        tx_porcentagem_maior_media_nacional,
                        '.'
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
                        ft_natureza_juridica,
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary' },
                        'Visualize os dados em tabela.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    natureza_juridica_chart
                )
            ),
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
                            'Repasse de Recursos'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        this.state.localidade,
                        ' \xE9 o ',
                        this.state.repasse_recursos.nr_colocacao_nacional,
                        '\xBA\xA0 em rela\xE7\xE3o aos repasses de recursos para OSCs, com m\xE9dia de R$ ',
                        this.state.repasse_recursos.nr_repasse_media,
                        '\xA0 por ano. A m\xE9dia nacional por estado de repasse de recursos \xE9 de R$ ',
                        this.state.repasse_recursos.nr_repasse_media_nacional,
                        '\xA0 . Al\xE9m dos repasses federais, a categoria de recursos mais declarada foi Recursos p\xFAblicos com ',
                        this.state.repasse_recursos.nr_colocacao_nacional,
                        '%\xA0 do total.'
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
                        ft_repasse_recursos,
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary' },
                        'Visualize os dados em tabela.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    repasse_recursos_chart
                )
            ),
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
                            'Transfer\xEAncias Federais'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        'A m\xE9dia por estado de transfer\xEAncias Federais \xE9 de R$ ',
                        this.state.orcamento.media,
                        '.'
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
                        ft_orcamento,
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary' },
                        'Visualize os dados em tabela.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement(ColumnChart, {
                        id: 'mix-chart',
                        yaxis: ['Teste'],
                        series: [{
                            name: 'Quantidade OSCs',
                            type: 'column',
                            data: [31, 40, 28, 51, 42, 109]
                        }],
                        labels: ['1922', '1930', '1940', '1950', '1960', '1970']
                    })
                )
            ),
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
                            '\xC1rea de Atua\xE7\xE3o'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        this.state.localidade,
                        ' possui ',
                        this.state.area_atuacao.nr_porcentagem_maior,
                        '% das OSCs atuando em ',
                        tx_area_atuacao,
                        ', enquanto o percentual m\xE9dio nacional de OSCs nesta categoria \xE9 de ',
                        nr_area_atuacao,
                        '%.'
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
                        ft_area_atuacao,
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary' },
                        'Visualize os dados em tabela.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    area_atuacao_chart
                )
            ),
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
                            'Trabalhadores'
                        ),
                        React.createElement('div', { className: 'line line-fix block', 'data-move-x': '980px' }),
                        React.createElement('hr', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        this.state.localidade,
                        ' foram identificados ',
                        vinculos_deficiencia,
                        '\xA0 V\xEDnculos formais de pessoas com defici\xEAncia. Alem desses, as OSCS declararam ',
                        voluntarios,
                        '\xA0 Trabalhadores volunt\xE1rios e ',
                        vinculos_formais,
                        '\xA0 V\xEDnculos formais.'
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
                        ft_trabalhadores,
                        ' ',
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'btn btn-outline-primary' },
                        'Visualize os dados em tabela.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    trabalhadores_chart
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Perfil, null), document.getElementById('perfil'));