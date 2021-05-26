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
            repasse_recursos: [],
            modal: {
                name: null,
                fontes: null,
                head: [],
                rows: []
            },
            head: {
                evolucao_quantidade_osc_ano: ['Evolução', 'Ano', 'Quantidade'],
                natureza_juridica: ['Natureza Jurídica', 'Quantidade OSC'],
                repasse_recursos: ['Repasse', 'Ano', 'Recursos'],
                orcamento: ['Transferências Federais', 'Ano', 'Quantidade'],
                area_atuacao: ['Atividade Econômica', 'Quantidade OSC'],
                trabalhadores: ['Tipo', 'Número de trabalhadores']
            },
            name: {
                evolucao_quantidade_osc_ano: 'Evolucao da quantidade OSCs por ano',
                natureza_juridica: 'Número de OSCs por natureza jurídica',
                repasse_recursos: 'Evolução de recursos transferidos para OSCs',
                orcamento: 'Transferências Federais para OSCs por ano',
                area_atuacao: 'Distribuição de OSCs por área de atuação',
                trabalhadores: 'Distribuição de trabalhodores'
            },
            loading: false

        };
        this.load = this.load.bind(this);
        this.callModal = this.callModal.bind(this);

        this.evolucao_anual = this.evolucao_anual.bind(this);
        this.caracteristicas = this.caracteristicas.bind(this);
        this.natureza_juridica = this.natureza_juridica.bind(this);
        this.transferencias_federais = this.transferencias_federais.bind(this);
        this.areas_atuacao = this.areas_atuacao.bind(this);
        this.trabalhadores = this.trabalhadores.bind(this);
        this.repasseRecurdos = this.repasseRecurdos.bind(this);
    }

    componentDidMount() {
        this.load();
        this.evolucao_anual();
        this.caracteristicas();
        this.natureza_juridica();
        this.transferencias_federais();
        this.areas_atuacao();
        this.trabalhadores();
        this.repasseRecurdos();
    }

    evolucao_anual() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/evolucao_anual/33',
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ evolucao_quantidade_osc_ano_chart: data.qtd_osc_por_ano });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    caracteristicas() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/caracteristicas/33',
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ caracteristicas: data.caracteristicas });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    natureza_juridica() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/natureza_juridica/33',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ natureza_juridica_chart: data.natureza_juridica });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    transferencias_federais() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/transferencias_federais/33',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ orcamento_chart: data.transferencias_federais });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    areas_atuacao() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/qtds_areas_atuacao/33',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ area_atuacao_chart: data.qtd_area_atuacao });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    trabalhadores() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/qtds_trabalhadores/33',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({
                    trabalhadores_chart: data.qtd_trabalhores
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    repasseRecurdos() {
        console.log('repasse_recursos');
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/repasse_recursos/33',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({
                    repasse_recursos_chart: data.repasse_recursos
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    load() {
        this.setState({ button: false, loading: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'analises/localidade/33',
            cache: false,
            success: function (data) {

                let repasse_recursos_table = data.repasse_recursos;

                /*////////////natureza_juridica////////////*/
                /*let series = [{
                    name: 'Quantidade OSCs',
                    type: 'column',
                    data: []
                }];
                let labels = [];
                data.natureza_juridica.series_1.find(function(item){
                    series[0].data.push(item.value);
                    labels.push(item.label.split(' '));
                });
                  let natureza_juridica_chart = {
                    'labels': labels,
                    'series': series,
                }*/

                /*////////////Trabalhadores////////////*/
                /*let trabalhadores_series = [{
                    name: 'Número de Trabalhadores',
                    type: 'column',
                    data: []
                }];
                let trabalhadores_labels = [];
                data.trabalhadores.series_1.find(function(item){
                    trabalhadores_series[0].data.push(item.value);
                    trabalhadores_labels.push(item.label.split(' '));
                });
                let trabalhadores_chart = {
                    'labels': trabalhadores_labels,
                    'series': trabalhadores_series,
                }*/

                /*////////////Área de Atuação////////////*/

                /* let area_atuacao_series = [];
                 let area_atuacao_labels = [];
                 data.area_atuacao.series_1.find(function(item){
                     area_atuacao_series.push(item.value);
                     area_atuacao_labels.push(item.label);
                 });
                 let area_atuacao_chart = {
                     'labels': area_atuacao_labels,
                     'series': area_atuacao_series,
                 }*/
                /*////////////////////Repasse Recursosos//////////////////////////*/

                ///////////////////////////////////////////////
                ///////////////////////////////////////////////
                /*let teste = [];
                 if(data.repasse_recursos){
                    for(let index in data.repasse_recursos.series_1[3].values){
                        teste.push(data.repasse_recursos.series_1[3].values[index].x)
                     }
                }
                for(let index in teste){
                    console.log(teste[index]);
                }
                 console.log(teste);*/

                ///////////////////////////////////////////////
                ///////////////////////////////////////////////

                /*let repasse_recursos_labels = [];
                let repasse_recursos_series = [];
                 if(data.repasse_recursos){
                     let groupSerie = [];
                    for(let serie in data.repasse_recursos.series_1){
                         let serieName = data.repasse_recursos.series_1[serie].key;
                         let serieTeste = {
                            name: serieName,
                            type: 'line',
                            data: []
                        };
                         groupSerie.push(serieTeste);
                        for(let k in data.repasse_recursos.series_1[serie].values) {
                             repasse_recursos_labels.push(data.repasse_recursos.series_1[serie].values[k].x);
                             serieTeste.data.push(data.repasse_recursos.series_1[serie].values[k].y);
                        }
                    }
                     repasse_recursos_series.push(groupSerie);
                 }
                 let chart_repasse_recursos_series = repasse_recursos_series[0]
                 let unique_repasse_recursos_labels = [...new Set(repasse_recursos_labels)];
                unique_repasse_recursos_labels = unique_repasse_recursos_labels.sort()
                 let repasse_recursos_chart = {
                    'labels': unique_repasse_recursos_labels,
                    'series': chart_repasse_recursos_series,
                }*/

                /*//////////////////////////////////////////////*/
                /*////////////////////Orçamento//////////////////////////*/
                /*let orcamento_labels = [];
                let orcamento_series = [];
                 if(data.orcamento){
                    let groupSerie = [];
                    for(let serie in data.orcamento.series_1){
                         let serieName = data.orcamento.series_1[serie].key;
                         let serieTeste = {
                            name: serieName,
                            type: 'line',
                            data: []
                        };
                         groupSerie.push(serieTeste);
                         for(let k in data.orcamento.series_1[serie].values) {
                            orcamento_labels.push(data.orcamento.series_1[serie].values[k].x);
                            serieTeste.data.push(data.orcamento.series_1[serie].values[k].y);
                        }
                    }
                    orcamento_series.push(groupSerie);
                }
                 let chart_orcamento_series = orcamento_series[0]
                 let unique_orcamento_labels = [...new Set(orcamento_labels)];
                unique_orcamento_labels = unique_orcamento_labels.sort()
                 let orcamento_chart = {
                    'labels': unique_orcamento_labels,
                    'series': chart_orcamento_series,
                }*/

                /*//////////////////////////////////////////////*/
                /*////////////////////evolucao_quantidade_osc_ano//////////////////////////*/
                let evolucao_quantidade_osc_ano_labels = [];
                let evolucao_quantidade_osc_ano_series = [];

                if (data.evolucao_quantidade_osc_ano) {
                    let groupSerie = [];
                    for (let serie in data.evolucao_quantidade_osc_ano.series_1) {

                        let serieName = data.evolucao_quantidade_osc_ano.series_1[serie].key;

                        let serieTeste = {
                            name: serieName,
                            type: 'line',
                            data: []
                        };

                        groupSerie.push(serieTeste);

                        for (let k in data.evolucao_quantidade_osc_ano.series_1[serie].values) {
                            evolucao_quantidade_osc_ano_labels.push(data.evolucao_quantidade_osc_ano.series_1[serie].values[k].x);
                            serieTeste.data.push(data.evolucao_quantidade_osc_ano.series_1[serie].values[k].y);
                        }
                    }
                    evolucao_quantidade_osc_ano_series.push(groupSerie);
                }

                /*let chart_evolucao_quantidade_osc_ano_series = evolucao_quantidade_osc_ano_series[0]
                 let unique_evolucao_quantidade_osc_ano_labels = [...new Set(evolucao_quantidade_osc_ano_labels)];
                unique_evolucao_quantidade_osc_ano_labels = unique_evolucao_quantidade_osc_ano_labels.sort()*/

                /*let evolucao_quantidade_osc_ano_chart = {
                    'labels': unique_evolucao_quantidade_osc_ano_labels,
                    'series': chart_evolucao_quantidade_osc_ano_series,
                }*/

                /*//////////////////////////////////////////////*/

                this.setState({
                    loading: false,
                    //caracteristicas: data.caracteristicas,
                    evolucao_quantidade_osc_ano: data.evolucao_quantidade_osc_ano,

                    //area_atuacao: data.area_atuacao,
                    natureza_juridica: data.natureza_juridica,
                    //trabalhadores: data.trabalhadores,
                    repasse_recursos: data.repasse_recursos,
                    orcamento: data.orcamento,

                    //evolucao_quantidade_osc_ano_chart: evolucao_quantidade_osc_ano_chart,
                    //natureza_juridica_chart: natureza_juridica_chart,
                    //trabalhadores_chart: trabalhadores_chart,
                    //area_atuacao_chart: area_atuacao_chart,
                    //repasse_recursos_chart: repasse_recursos_chart,
                    //orcamento_chart: orcamento_chart,

                    repasse_recursos_table: repasse_recursos_table,

                    localidade: data.tx_localidade,
                    tipo: data.tx_tipo_localidade
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    //////////////////////////////////////////MODAL TABELA///////////////////////////////////////////////////

    callModal(type, chart, col) {

        let ft_table = null;
        if (this.state[type].fontes) {
            ft_table = this.state[type].fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_tb_" + key },
                    item,
                    ', '
                );
            });
        }

        let modal = this.state.modal;
        let table = this.state[chart];

        //////////////////////////
        if (col === 3) {

            let grupeRows = {
                0: [],
                1: table.labels,
                2: []
            };

            for (let key in table.series) {
                for (let key2 in table.series[key].data) {
                    grupeRows[0].push(table.series[key].name);
                    grupeRows[2].push(table.series[key].data[key2]);
                }
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index) {
                return React.createElement(
                    'th',
                    { key: 'thModal' + index },
                    item
                );
            });

            let gurpeCol = [];
            for (let key in grupeRows[0]) {
                gurpeCol.push(React.createElement(
                    'tr',
                    { key: 'trModal' + key },
                    React.createElement(
                        'td',
                        null,
                        grupeRows[0][key]
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[1][key]
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[2][key]
                    )
                ));
            }
            modal.rows = gurpeCol;
        } else if (col === 4) {
            let table = this.state.repasse_recursos_table.series_1;
            //console.log('table', this.state.repasse_recursos_table);

            let grupeRows = {
                0: [],
                1: [],
                2: []
            };

            for (let key in this.state.repasse_recursos_table.series_1) {
                for (let key2 in table[3].values) {
                    grupeRows[0].push(table[key].key);
                    grupeRows[1].push(table[key].values[key2].x);
                    grupeRows[2].push(table[key].values[key2].y);
                }
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index) {
                return React.createElement(
                    'th',
                    { key: 'thModal' + index },
                    item
                );
            });

            let gurpeCol = [];
            for (let key in grupeRows[0]) {
                gurpeCol.push(React.createElement(
                    'tr',
                    { key: 'trModal' + key },
                    React.createElement(
                        'td',
                        null,
                        grupeRows[0][key]
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[1][key]
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[2][key]
                    )
                ));
            }
            modal.rows = gurpeCol;
        } else if (col === 2) {

            let grupeRows = {
                0: table.labels,
                1: []
            };

            for (let key in table.series) {
                for (let key2 in table.series[key].data) {
                    grupeRows[1].push(table.series[key].data[key2]);
                }
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index) {
                return React.createElement(
                    'th',
                    { key: 'thModal' + index },
                    item
                );
            });

            let gurpeCol = [];
            for (let key in grupeRows[0]) {
                gurpeCol.push(React.createElement(
                    'tr',
                    { key: 'trModal' + key },
                    React.createElement(
                        'td',
                        null,
                        grupeRows[0][key].join(' ')
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[1][key]
                    )
                ));
            }
            modal.rows = gurpeCol;
        } else {
            let grupeRows = {
                0: table.labels,
                1: table.series
            };

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index) {
                return React.createElement(
                    'th',
                    { key: 'thModal' + index },
                    item
                );
            });

            let gurpeCol = [];
            for (let key in grupeRows[0]) {
                gurpeCol.push(React.createElement(
                    'tr',
                    { key: 'trModal' + key },
                    React.createElement(
                        'td',
                        null,
                        grupeRows[0][key]
                    ),
                    React.createElement(
                        'td',
                        null,
                        grupeRows[1][key]
                    )
                ));
            }
            modal.rows = gurpeCol;
        }

        ////////////////////////////////


        this.setState({ modal: modal }, function () {
            $('#modalTable').modal('show');
        });
    }

    modal() {

        return React.createElement(
            'div',
            { id: 'modalTable', className: 'modal fade bd-example-modal-lg', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
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
                            'h4',
                            { className: 'modal-title', id: 'exampleModalLabel' },
                            React.createElement(
                                'strong',
                                null,
                                this.state.modal.name
                            )
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
                            { className: 'table table-hover' },
                            React.createElement(
                                'thead',
                                { className: 'thead-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    this.state.modal.head
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                this.state.modal.rows
                            )
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
                                this.state.modal.fontes
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
    ///////////////////////////////////////////////////


    render() {

        let modal = this.modal();

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
        let evolucao_quantidade_osc_ano_chart = null;
        if (this.state.evolucao_quantidade_osc_ano_chart) {

            evolucao_quantidade_osc_ano_chart = React.createElement(MixedChart, {
                id: 'mix-chart-evolucao_quantidade_osc_ano_chart',
                series: this.state.evolucao_quantidade_osc_ano_chart.series,
                labels: this.state.evolucao_quantidade_osc_ano_chart.dataLabels
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

        ///////////////////////////////////////////////////CHART
        let natureza_juridica_chart = null;

        if (this.state.natureza_juridica_chart) {

            let natureza_juridica_labels = [];
            this.state.natureza_juridica_chart.labels.find(function (item) {
                natureza_juridica_labels.push(item.split(' '));
            });

            let natureza_juridica_series = [{
                name: this.state.natureza_juridica_chart.series.name,
                type: 'column',
                data: this.state.natureza_juridica_chart.series.data
            }];

            this.state.natureza_juridica_chart.series;
            natureza_juridica_chart = React.createElement(ColumnChart, {
                id: 'natureza-chart',
                series: natureza_juridica_series,
                labels: natureza_juridica_labels
            });
        }
        ///////////////////////////////////////////////////CHART
        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_trabalhadores = null;
        if (this.state.trabalhadores_chart) {
            ft_trabalhadores = this.state.trabalhadores_chart.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        /*let trabalhadores_chart = null;
        if(this.state.trabalhadores_chart){
            trabalhadores_chart = (
                <ColumnChart
                    id={'trabalhadores-chart'}
                    series={this.state.trabalhadores_chart.series}
                    labels={this.state.trabalhadores_chart.labels}
                />
            );
        }*/
        ///////////////////////////////////////////////////CHART
        let trabalhadores_chart = null;

        if (this.state.trabalhadores_chart) {

            let trabalhadores_labels = [];
            this.state.trabalhadores_chart.labels.find(function (item) {
                trabalhadores_labels.push(item.split(' '));
            });

            let trabalhadores_series = [{
                name: this.state.trabalhadores_chart.series.name,
                type: 'column',
                data: this.state.trabalhadores_chart.series.data
            }];

            this.state.trabalhadores_chart.series;
            trabalhadores_chart = React.createElement(ColumnChart, {
                id: 'natureza-chart',
                series: trabalhadores_series,
                labels: trabalhadores_labels
            });
        }
        ///////////////////////////////////////////////////CHART

        console.log(this.state.trabalhadores_chart);
        let vinculos_deficiencia = "";
        let voluntarios = "";
        let vinculos_formais = "";
        if (this.state.trabalhadores_chart) {
            vinculos_deficiencia = this.state.trabalhadores_chart.series.data[0];
            voluntarios = this.state.trabalhadores_chart.series.data[2];
            vinculos_formais = this.state.trabalhadores_chart.series.data[1];
        }

        //////////////////////////////////Área de atuação///////////////////////////////////////////
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
                series: this.state.area_atuacao_chart.series.data,
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
        let repasse_recursos_chart = null;

        if (this.state.repasse_recursos_chart) {
            //console.log('this.state.repasse_recursos_chart', this.state.repasse_recursos_chart.series);
            repasse_recursos_chart = React.createElement(MixedChart, {
                id: 'mix-chart-repasse_recursos',
                series: this.state.repasse_recursos_chart.series,
                labels: this.state.repasse_recursos_chart.labels
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

        ///////////////////////////////////////////////////CHART
        let orcamento_chart = null;

        if (this.state.orcamento_chart) {

            let orcamento_series = [{
                name: this.state.orcamento_chart.series.name,
                type: 'area',
                data: this.state.orcamento_chart.series.data
            }];

            this.state.orcamento_chart.series;
            orcamento_chart = React.createElement(MixedChart, {
                id: 'orcamento-chart',
                series: orcamento_series,
                labels: this.state.orcamento_chart.labels
            });
        }
        ///////////////////////////////////////////////////CHART


        /*let orcamento_chart = null;
        if(this.state.orcamento_chart){
            orcamento_chart = (
                <MixedChart
                    id={'mix-chart-orcamento'}
                    series={this.state.orcamento_chart.series}
                    labels={this.state.orcamento_chart.labels}
                />
            );
        }*/

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'bg-lgt' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'header',
                                null,
                                React.createElement('br', null),
                                React.createElement(
                                    'h1',
                                    null,
                                    'Rio de Janeiro'
                                ),
                                React.createElement(
                                    'h5',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '/' },
                                        'Home'
                                    )
                                ),
                                React.createElement('br', null)
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'text-center' },
                React.createElement('img', { src: '/img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loading ? '' : 'none' } })
            ),
            React.createElement(
                'div',
                { className: 'container', style: { display: this.state.loading ? 'none' : '' } },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('br', null),
                        React.createElement('br', null),
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
                        evolucao_quantidade_osc_ano_chart,
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
                        ),
                        React.createElement(
                            'div',
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('evolucao_quantidade_osc_ano', 'evolucao_quantidade_osc_ano_chart', 3) },
                            'Visualize os dados em tabela.'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null)
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('natureza_juridica', 'natureza_juridica_chart', 2) },
                            'Visualize os dados em tabela.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        natureza_juridica_chart,
                        React.createElement('br', null),
                        React.createElement('br', null)
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('repasse_recursos', 'repasse_recursos_chart', 4) },
                            'Visualize os dados em tabela.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        repasse_recursos_chart,
                        React.createElement('br', null),
                        React.createElement('br', null)
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('orcamento', 'orcamento_chart', 3) },
                            'Visualize os dados em tabela.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        orcamento_chart,
                        React.createElement('br', null),
                        React.createElement('br', null)
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('area_atuacao', 'area_atuacao_chart', 0) },
                            'Visualize os dados em tabela.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        area_atuacao_chart,
                        React.createElement('br', null),
                        React.createElement('br', null)
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
                            React.createElement(
                                'strong',
                                null,
                                vinculos_deficiencia
                            ),
                            ' v\xEDnculos formais de pessoas com defici\xEAncia. Al\xE9m desses, as OSCS declararam ',
                            React.createElement(
                                'strong',
                                null,
                                voluntarios
                            ),
                            ' trabalhadores volunt\xE1rios e ',
                            React.createElement(
                                'strong',
                                null,
                                vinculos_formais
                            ),
                            ' v\xEDnculos formais.'
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('trabalhadores', 'trabalhadores_chart', 2) },
                            'Visualize os dados em tabela.'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        trabalhadores_chart,
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                )
            ),
            modal
        );
    }
}

ReactDOM.render(React.createElement(Perfil, null), document.getElementById('perfil'));