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

            tipoSelect: {
                estado: 'estado',
                municipio: 'município',
                regiao: 'região'
            },
            loading: false,
            orcamento_txt: 0,
            localidade_id: origem
        };
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
            url: getBaseUrl2 + 'perfil_localidade/evolucao_anual/' + this.state.localidade_id,
            data: {},
            cache: false,
            success: function (data) {
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
            url: getBaseUrl2 + 'perfil_localidade/caracteristicas/' + this.state.localidade_id,
            data: {},
            cache: false,
            success: function (data) {

                let tipo = this.state.tipoSelect[data.caracteristicas.tx_tipo_localidade];

                this.setState({
                    caracteristicas: data.caracteristicas,
                    localidade: data.caracteristicas.tx_localidade,
                    tipo: tipo
                });
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
            url: getBaseUrl2 + 'perfil_localidade/natureza_juridica/' + this.state.localidade_id,
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
            url: getBaseUrl2 + 'perfil_localidade/transferencias_federais/' + this.state.localidade_id,
            data: {},
            cache: false,
            success: function (data) {
                this.setState({
                    orcamento_chart: data.transferencias_federais,
                    orcamento_txt: data.transferencias_federais.media
                });
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
            url: getBaseUrl2 + 'perfil_localidade/qtds_areas_atuacao/' + this.state.localidade_id,
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
            url: getBaseUrl2 + 'perfil_localidade/qtds_trabalhadores/' + this.state.localidade_id,
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
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'perfil_localidade/repasse_recursos/' + this.state.localidade_id,
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

    //////////////////////////////////////////MODAL TABELA///////////////////////////////////////////////////

    callModal(type, chart, col) {

        let ft_table = null;
        if (this.state[chart].fontes) {
            ft_table = this.state[chart].fontes.map(function (item, key) {
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

            let teste = [];
            let teste2 = [];

            if (type === 'evolucao_quantidade_osc_ano') {
                for (let key in table.series) {
                    teste.push(table.dataLabels);
                }
            }

            if (type === 'repasse_recursos') {
                for (let key in table.series) {
                    teste.push(table.labels);
                }
            }

            teste2 = teste2.concat(teste).join();
            teste2 = teste2.split(',');
            let testArray = teste2;

            let grupeRows = {
                0: [],
                1: testArray,
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
            let grupeRows = {
                0: [],
                1: table.labels,
                2: []
            };

            for (let key in table.series.data) {
                grupeRows[0].push(table.series.name);
                grupeRows[2].push(table.series.data[key]);
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

            if (table) {
                for (let key in table.series.data) {
                    grupeRows[1].push(table.series.data[key]);
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
        let evolucao_nr_colocacao_nacional = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_nr_colocacao_nacional = this.state.evolucao_quantidade_osc_ano_chart.nr_colocacao_nacional;
        }
        let evolucao_nr_quantidade_oscs_primeiro_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_nr_quantidade_oscs_primeiro_colocado_estado = this.state.evolucao_quantidade_osc_ano_chart.nr_quantidade_oscs_primeiro_colocado_estado;
        }
        let evolucao_nr_quantidade_oscs_primeiro_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_nr_quantidade_oscs_primeiro_colocado_municipio = this.state.evolucao_quantidade_osc_ano_chart.nr_quantidade_oscs_primeiro_colocado_municipio;
        }
        let evolucao_nr_quantidade_oscs_ultimo_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_nr_quantidade_oscs_ultimo_colocado_estado = this.state.evolucao_quantidade_osc_ano_chart.nr_quantidade_oscs_ultimo_colocado_estado;
        }
        let evolucao_nr_quantidade_oscs_ultimo_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_nr_quantidade_oscs_ultimo_colocado_municipio = this.state.evolucao_quantidade_osc_ano_chart.nr_quantidade_oscs_ultimo_colocado_municipio;
        }

        let evolucao_tx_primeiro_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_tx_primeiro_colocado_estado = this.state.evolucao_quantidade_osc_ano_chart.tx_primeiro_colocado_estado;
        }
        let evolucao_tx_primeiro_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_tx_primeiro_colocado_municipio = this.state.evolucao_quantidade_osc_ano_chart.tx_primeiro_colocado_municipio;
        }
        let evolucao_tx_ultimo_colocado_estado = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_tx_ultimo_colocado_estado = this.state.evolucao_quantidade_osc_ano_chart.tx_ultimo_colocado_estado;
        }
        let evolucao_tx_ultimo_colocado_municipio = '';
        if (this.state.evolucao_quantidade_osc_ano_chart) {
            evolucao_tx_ultimo_colocado_municipio = this.state.evolucao_quantidade_osc_ano_chart.tx_ultimo_colocado_municipio;
        }
        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////Natureza Juridica///////////////////////////////////////////
        let ft_natureza_juridica = null;
        if (this.state.natureza_juridica_chart) {
            ft_natureza_juridica = this.state.natureza_juridica_chart.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let nj_nr_porcentagem_maior = 0;
        let nj_tx_porcentagem_maior = '';
        let nj_nr_porcentagem_maior_media_nacional = 0;
        let nj_tx_porcentagem_maior_media_nacional = '';
        if (this.state.natureza_juridica_chart) {
            nj_nr_porcentagem_maior = this.state.natureza_juridica_chart.nr_porcentagem_maior;
            nj_tx_porcentagem_maior = this.state.natureza_juridica_chart.tx_porcentagem_maior;
            nj_nr_porcentagem_maior_media_nacional = this.state.natureza_juridica_chart.nr_porcentagem_maior_media_nacional;
            nj_tx_porcentagem_maior_media_nacional = this.state.natureza_juridica_chart.tx_porcentagem_maior_media_nacional;
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
        if (this.state.area_atuacao_chart) {
            ft_area_atuacao = this.state.area_atuacao_chart.fontes.map(function (item, key) {
                return React.createElement(
                    'span',
                    { key: "ft_qp_" + key },
                    item,
                    ', '
                );
            });
        }

        let nr_porcentagem_maior = 0;
        let nr_area_atuacao = 0;
        let tx_area_atuacao = '';
        if (this.state.area_atuacao_chart) {
            nr_porcentagem_maior = this.state.area_atuacao_chart.nr_porcentagem_maior;
            nr_area_atuacao = this.state.area_atuacao_chart.nr_media_nacional_area_atuacao;
            tx_area_atuacao = this.state.area_atuacao_chart.tx_porcentagem_maior;
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
        if (this.state.repasse_recursos_chart) {
            ft_repasse_recursos = this.state.repasse_recursos_chart.fontes.map(function (item, key) {
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
            repasse_recursos_chart = React.createElement(MixedChart, {
                id: 'mix-chart-repasse_recursos',
                series: this.state.repasse_recursos_chart.series,
                labels: this.state.repasse_recursos_chart.labels
            });
        }
        let nr_colocacao_nacional = 0;
        let nr_porcentagem_maior_tipo_repasse = 0;
        let nr_repasse_media = 0;
        let nr_repasse_media_nacional = 0;
        if (this.state.repasse_recursos_chart) {
            nr_colocacao_nacional = this.state.repasse_recursos_chart.nr_colocacao_nacional;
            nr_porcentagem_maior_tipo_repasse = this.state.repasse_recursos_chart.nr_porcentagem_maior_tipo_repasse;
            nr_repasse_media = this.state.repasse_recursos_chart.nr_repasse_media;
            nr_repasse_media_nacional = this.state.repasse_recursos_chart.nr_repasse_media_nacional;
        }

        //////////////////////////////////Transferências Federais///////////////////////////////////////////
        let ft_orcamento = null;
        if (this.state.orcamento_chart) {
            ft_orcamento = this.state.orcamento_chart.fontes.map(function (item, key) {
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
                                    this.state.localidade
                                ),
                                React.createElement(
                                    'h5',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '/' },
                                        'Home'
                                    ),
                                    '/ ',
                                    React.createElement(
                                        'a',
                                        { href: "/mapa/" + this.state.localidade_id },
                                        'Mapa'
                                    ),
                                    ' / ',
                                    this.state.localidade
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
                                numberDecimalPtBR(this.state.caracteristicas.nr_quantidade_osc, 0)
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
                                numberDecimalPtBR(this.state.caracteristicas.nr_quantidade_trabalhadores, 0)
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
                                numberDecimalPtBR(this.state.caracteristicas.nr_quantidade_recursos, 0)
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
                                numberDecimalPtBR(this.state.caracteristicas.nr_quantidade_projetos, 0)
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
                                evolucao_nr_colocacao_nacional,
                                '\xBA'
                            ),
                            ' em rela\xE7\xE3o a quantidade de OSCs no \xE2mbito nacional. Nesse ranking, o estado\xA0 (',
                            evolucao_tx_primeiro_colocado_estado,
                            ', ',
                            React.createElement(
                                'strong',
                                null,
                                evolucao_nr_quantidade_oscs_primeiro_colocado_estado
                            ),
                            ') e o munic\xEDpio\xA0 (',
                            evolucao_tx_primeiro_colocado_municipio,
                            ',\xA0',
                            React.createElement(
                                'strong',
                                null,
                                evolucao_nr_quantidade_oscs_primeiro_colocado_municipio
                            ),
                            ' OSCs) s\xE3o os que cont\xEAm mais OSCs. O estado\xA0 (',
                            evolucao_tx_ultimo_colocado_estado,
                            ') e o munic\xEDpio\xA0 (',
                            evolucao_tx_ultimo_colocado_municipio,
                            ') s\xE3o os que cont\xEAm menos OSCs,\xA0',
                            React.createElement(
                                'strong',
                                null,
                                evolucao_nr_quantidade_oscs_ultimo_colocado_estado
                            ),
                            ' e\xA0',
                            React.createElement(
                                'strong',
                                null,
                                evolucao_nr_quantidade_oscs_ultimo_colocado_municipio
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
                            'Na popula\xE7\xE3o de OSCs do ',
                            this.state.tipo,
                            ', ',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nj_nr_porcentagem_maior, 2),
                                '%'
                            ),
                            '\xA0 s\xE3o classificadas como ',
                            React.createElement(
                                'strong',
                                null,
                                nj_tx_porcentagem_maior,
                                '.'
                            ),
                            '\xA0 A m\xE9dia nacional \xE9 de ',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nj_nr_porcentagem_maior_media_nacional, 2),
                                '%'
                            ),
                            '\xA0 de OSCs identificadas como ',
                            React.createElement(
                                'strong',
                                null,
                                nj_tx_porcentagem_maior_media_nacional
                            ),
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
                            ' \xE9 o\xA0',
                            React.createElement(
                                'strong',
                                null,
                                nr_colocacao_nacional
                            ),
                            '\xBA em rela\xE7\xE3o aos repasses de recursos para OSCs, com m\xE9dia de R$\xA0',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nr_repasse_media, 2)
                            ),
                            ' por ano. A m\xE9dia nacional por ',
                            this.state.tipo,
                            ' de repasse de recursos \xE9 de R$\xA0',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nr_repasse_media_nacional, 2)
                            ),
                            '. Al\xE9m dos repasses federais, a categoria de recursos mais declarada foi Recursos p\xFAblicos com\xA0',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nr_porcentagem_maior_tipo_repasse, 2)
                            ),
                            '% do total.'
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('repasse_recursos', 'repasse_recursos_chart', 3) },
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
                            'A m\xE9dia por ',
                            this.state.tipo,
                            ' de transfer\xEAncias Federais \xE9 de R$ ',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(this.state.orcamento_txt, 2)
                            ),
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('orcamento', 'orcamento_chart', 4) },
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
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nr_porcentagem_maior, 2)
                            ),
                            '% das OSCs atuando em ',
                            React.createElement(
                                'strong',
                                null,
                                tx_area_atuacao
                            ),
                            ', enquanto o percentual m\xE9dio nacional de OSCs nesta categoria \xE9 de ',
                            React.createElement(
                                'strong',
                                null,
                                numberDecimalPtBR(nr_area_atuacao, 2)
                            ),
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
                            { className: 'btn btn-outline-primary', onClick: () => this.callModal('area_atuacao', 'area_atuacao_chart', 2) },
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