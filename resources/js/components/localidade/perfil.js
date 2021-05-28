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
                trabalhadores: ['Tipo',	'Número de trabalhadores'],
            },
            name: {
                evolucao_quantidade_osc_ano: 'Evolucao da quantidade OSCs por ano',
                natureza_juridica: 'Número de OSCs por natureza jurídica',
                repasse_recursos: 'Evolução de recursos transferidos para OSCs',
                orcamento: 'Transferências Federais para OSCs por ano',
                area_atuacao: 'Distribuição de OSCs por área de atuação',
                trabalhadores: 'Distribuição de trabalhodores',
            },
            loading: false,
            orcamento_txt: 0,
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

    componentDidMount(){
        this.load();
        this.evolucao_anual();
        this.caracteristicas();
        this.natureza_juridica();
        this.transferencias_federais();
        this.areas_atuacao();
        this.trabalhadores();
        this.repasseRecurdos();
    }

    evolucao_anual(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/evolucao_anual/33',
            data:{
            },
            cache: false,
            success: function(data) {
                //console.log(data);
                this.setState({evolucao_quantidade_osc_ano_chart: data.qtd_osc_por_ano});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    caracteristicas(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/caracteristicas/33',
            data:{
            },
            cache: false,
            success: function(data) {
                //console.log(data);
                this.setState({caracteristicas: data.caracteristicas});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    natureza_juridica(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/natureza_juridica/33',
            data:{
            },
            cache: false,
            success: function(data) {
                this.setState({natureza_juridica_chart: data.natureza_juridica});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    transferencias_federais(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/transferencias_federais/33',
            data:{
            },
            cache: false,
            success: function(data) {

                this.setState({
                    orcamento_chart: data.transferencias_federais,
                    orcamento_txt:data.transferencias_federais.media
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    areas_atuacao(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/qtds_areas_atuacao/33',
            data:{
            },
            cache: false,
            success: function(data) {
                this.setState({area_atuacao_chart: data.qtd_area_atuacao});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    trabalhadores(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/qtds_trabalhadores/33',
            data:{
            },
            cache: false,
            success: function(data) {
                this.setState({
                    trabalhadores_chart: data.qtd_trabalhores
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    repasseRecurdos(){
        $.ajax({
            method:'GET',
            url: getBaseUrl2 + 'perfil_localidade/repasse_recursos/33',
            data:{
            },
            cache: false,
            success: function(data) {
                this.setState({
                    repasse_recursos_chart: data.repasse_recursos
                });

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this),
        });
    }

    load() {
        this.setState({ button: false, loading: true});
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
                /*let evolucao_quantidade_osc_ano_labels = [];
                let evolucao_quantidade_osc_ano_series = [];

                if(data.evolucao_quantidade_osc_ano){
                    let groupSerie = [];
                    for(let serie in data.evolucao_quantidade_osc_ano.series_1){

                        let serieName = data.evolucao_quantidade_osc_ano.series_1[serie].key;

                        let serieTeste = {
                            name: serieName,
                            type: 'line',
                            data: []
                        };

                        groupSerie.push(serieTeste);

                        for(let k in data.evolucao_quantidade_osc_ano.series_1[serie].values) {
                            evolucao_quantidade_osc_ano_labels.push(data.evolucao_quantidade_osc_ano.series_1[serie].values[k].x);
                            serieTeste.data.push(data.evolucao_quantidade_osc_ano.series_1[serie].values[k].y);
                        }
                    }
                    evolucao_quantidade_osc_ano_series.push(groupSerie);
                }*/

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
                    //evolucao_quantidade_osc_ano: data.evolucao_quantidade_osc_ano,

                    //area_atuacao: data.area_atuacao,
                    //natureza_juridica: data.natureza_juridica,
                    //trabalhadores: data.trabalhadores,
                    //repasse_recursos: data.repasse_recursos,
                    //orcamento: data.orcamento,

                    //evolucao_quantidade_osc_ano_chart: evolucao_quantidade_osc_ano_chart,
                    //natureza_juridica_chart: natureza_juridica_chart,
                    //trabalhadores_chart: trabalhadores_chart,
                    //area_atuacao_chart: area_atuacao_chart,
                    //repasse_recursos_chart: repasse_recursos_chart,
                    //orcamento_chart: orcamento_chart,

                    repasse_recursos_table: repasse_recursos_table,


                    localidade: data.tx_localidade,
                    tipo: data.tx_tipo_localidade,
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    //////////////////////////////////////////MODAL TABELA///////////////////////////////////////////////////

    callModal(type, chart, col){

        let ft_table = null;
        if(this.state[chart].fontes){
            ft_table = this.state[chart].fontes.map(function (item, key) {
                return (
                    <span key={"ft_tb_" + key}>{item}, </span>
                );
            });
        }

        let modal = this.state.modal;
        let table = this.state[chart];


        //////////////////////////
        if(col===3){

            let teste = [];
            let teste2 = [];

            if(type==='evolucao_quantidade_osc_ano') {
                for(let key in table.series){
                    teste.push(table.dataLabels);
                }
            }

            if(type==='repasse_recursos'){
                //console.log('repasse_recursos');
                for(let key in table.series){
                    teste.push(table.labels);
                }
            }

            teste2 = teste2.concat(teste).join();
            teste2 = teste2.split(',');
            let testArray = teste2;

            let grupeRows = {
                0: [],
                1: testArray,
                2: [],
            };

            /*if(type==='repasse_recursos'){
                grupeRows[1] = table.labels;
            }*/

            for(let key in table.series){
                for(let key2 in table.series[key].data) {
                    grupeRows[0].push(table.series[key].name);
                    grupeRows[2].push(table.series[key].data[key2]);
                }
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index){
                return (<th key={'thModal'+index}>{item}</th>);
            })

            let gurpeCol = [];
            for(let key in grupeRows[0]) {
                gurpeCol.push(
                    <tr key={'trModal'+key}>
                        <td>{grupeRows[0][key]}</td>
                        <td>{grupeRows[1][key]}</td>
                        <td>{grupeRows[2][key]}</td>
                    </tr>
                );
            }
            modal.rows = gurpeCol;

        }else if(col===4){
            let grupeRows = {
                0: [],
                1: table.labels,
                2: [],
            };


            for(let key in table.series.data) {
                grupeRows[0].push(table.series.name);
                grupeRows[2].push(table.series.data[key]);
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index){
                return (<th key={'thModal'+index}>{item}</th>);
            })

            let gurpeCol = [];
            for(let key in grupeRows[0]) {
                gurpeCol.push(
                    <tr key={'trModal'+key}>
                        <td>{grupeRows[0][key]}</td>
                        <td>{grupeRows[1][key]}</td>
                        <td>{grupeRows[2][key]}</td>
                    </tr>
                );
            }
            modal.rows = gurpeCol;

        }else if(col===2){

            let grupeRows =  {
                0: table.labels,
                1: [],
            } ;

            if(table){
                for(let key in table.series.data) {
                    grupeRows[1].push(table.series.data[key]);
                }
            }

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index){
                return (<th key={'thModal'+index}>{item}</th>);
            })

            let gurpeCol = [];
            for(let key in grupeRows[0]) {
                gurpeCol.push(
                    <tr key={'trModal'+key}>
                        <td>{grupeRows[0][key]}</td>
                        <td>{grupeRows[1][key]}</td>
                    </tr>
                );
            }
            modal.rows = gurpeCol;

        }else{
            /*let grupeRows =  {
                0: table.labels,
                1: table.series,
            } ;

            console.log('labels 0', table.labels);

            modal.name = this.state.name[type];
            modal.fontes = ft_table;

            modal.head = this.state.head[type].map(function (item, index){
                return (<th key={'thModal'+index}>{item}</th>);
            })

            let gurpeCol = [];
            for(let key in grupeRows[0]) {
                gurpeCol.push(
                    <tr key={'trModal'+key}>
                        <td>{grupeRows[0][key]}</td>
                        <td>{grupeRows[1][key]}</td>
                    </tr>
                );
            }
            modal.rows = gurpeCol;*/
        }

        ////////////////////////////////


        this.setState({modal: modal}, function(){
            $('#modalTable').modal('show');
        });
    }

    modal(){


        return (

            <div id="modalTable" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel"><strong>{this.state.modal.name}</strong></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <table className="table table-hover">
                                <thead className="thead-light">
                                <tr>
                                    {this.state.modal.head}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.modal.rows}
                                </tbody>
                            </table>

                            <div className="bd-callout bd-callout-warning">
                                <h5 id="incompatibilidade-jquery">Fonte:</h5>
                                <p className="box-chart-model-font">{this.state.modal.fontes}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    ///////////////////////////////////////////////////


    render(){

        let modal = this.modal();

        /////////////////////////////////////////////////////////////////////////////
        let ft_quantidade_projetos = null;
        if(this.state.caracteristicas.ft_quantidade_projetos){
            ft_quantidade_projetos = this.state.caracteristicas.ft_quantidade_projetos.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let ft_quantidade_osc = null;
        if(this.state.caracteristicas.ft_quantidade_osc){
            ft_quantidade_osc = this.state.caracteristicas.ft_quantidade_osc.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let ft_quantidade_trabalhadores = null;
        if(this.state.caracteristicas.ft_quantidade_trabalhadores){
            ft_quantidade_trabalhadores = this.state.caracteristicas.ft_quantidade_trabalhadores.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let ft_quantidade_recursos = null;
        if(this.state.caracteristicas.ft_quantidade_recursos){
            ft_quantidade_recursos = this.state.caracteristicas.ft_quantidade_recursos.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }
        let evolucao_quantidade_osc_ano_chart = null;
        if(this.state.evolucao_quantidade_osc_ano_chart){

            evolucao_quantidade_osc_ano_chart = (
                <MixedChart
                    id={'mix-chart-evolucao_quantidade_osc_ano_chart'}
                    series={this.state.evolucao_quantidade_osc_ano_chart.series}
                    labels={this.state.evolucao_quantidade_osc_ano_chart.dataLabels}
                />
            );
        }
        /////////////////////////////////////////////////////////////////////////////
        let tx_primeiro_colocado_estado = '';
        if(this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado){
            tx_primeiro_colocado_estado = this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado[0];
        }
        let tx_primeiro_colocado_municipio = '';
        if(this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio){
            tx_primeiro_colocado_municipio = this.state.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio[0];
        }
        let tx_ultimo_colocado_estado = '';
        if(this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado){
            tx_ultimo_colocado_estado = this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0];
        }
        let tx_ultimo_colocado_municipio = '';
        if(this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio){
            tx_ultimo_colocado_municipio = this.state.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0];
        }
        /////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////Natureza Juridica///////////////////////////////////////////
        let ft_natureza_juridica = null;
        if(this.state.natureza_juridica_chart){
            ft_natureza_juridica = this.state.natureza_juridica_chart.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let nj_nr_porcentagem_maior = 0;
        let nj_tx_porcentagem_maior = '';
        let nj_nr_porcentagem_maior_media_nacional = 0;
        let nj_tx_porcentagem_maior_media_nacional = '';
        if(this.state.natureza_juridica_chart){
            nj_nr_porcentagem_maior = this.state.natureza_juridica_chart.nr_porcentagem_maior;
            nj_tx_porcentagem_maior = this.state.natureza_juridica_chart.tx_porcentagem_maior;
            nj_nr_porcentagem_maior_media_nacional = this.state.natureza_juridica_chart.nr_porcentagem_maior_media_nacional;
            nj_tx_porcentagem_maior_media_nacional = this.state.natureza_juridica_chart.tx_porcentagem_maior_media_nacional;
        }

        ///////////////////////////////////////////////////CHART
        let natureza_juridica_chart = null;

        if(this.state.natureza_juridica_chart){

            let natureza_juridica_labels = [];
            this.state.natureza_juridica_chart.labels.find(function(item){
                natureza_juridica_labels.push(item.split(' '));
            });

            let natureza_juridica_series = [{
                name: this.state.natureza_juridica_chart.series.name,
                type: 'column',
                data: this.state.natureza_juridica_chart.series.data,
            }];

            this.state.natureza_juridica_chart.series
            natureza_juridica_chart = (
                <ColumnChart
                    id={'natureza-chart'}
                    series={natureza_juridica_series}
                    labels={natureza_juridica_labels}
                />
            );
        }
        ///////////////////////////////////////////////////CHART
        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_trabalhadores = null;
        if(this.state.trabalhadores_chart){
            ft_trabalhadores = this.state.trabalhadores_chart.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        ///////////////////////////////////////////////////CHART
        let trabalhadores_chart = null;

        if(this.state.trabalhadores_chart){

            let trabalhadores_labels = [];
            this.state.trabalhadores_chart.labels.find(function(item){
                trabalhadores_labels.push(item.split(' '));
            });

            let trabalhadores_series = [{
                name: this.state.trabalhadores_chart.series.name,
                type: 'column',
                data: this.state.trabalhadores_chart.series.data,
            }];

            this.state.trabalhadores_chart.series
            trabalhadores_chart = (
                <ColumnChart
                    id={'natureza-chart'}
                    series={trabalhadores_series}
                    labels={trabalhadores_labels}
                />
            );
        }
        ///////////////////////////////////////////////////CHART

        console.log(this.state.trabalhadores_chart);
        let vinculos_deficiencia = "";
        let voluntarios = "";
        let vinculos_formais = "";
        if(this.state.trabalhadores_chart){
            vinculos_deficiencia = this.state.trabalhadores_chart.series.data[0];
            voluntarios = this.state.trabalhadores_chart.series.data[2];
            vinculos_formais = this.state.trabalhadores_chart.series.data[1];
        }

        //////////////////////////////////Área de atuação///////////////////////////////////////////
        let ft_area_atuacao = null;
        if(this.state.area_atuacao_chart){
            ft_area_atuacao = this.state.area_atuacao_chart.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let nr_porcentagem_maior = 0;
        let nr_area_atuacao = 0;
        let tx_area_atuacao = '';
        if(this.state.area_atuacao_chart){
            nr_porcentagem_maior = this.state.area_atuacao_chart.nr_porcentagem_maior;
            nr_area_atuacao = this.state.area_atuacao_chart.nr_media_nacional_area_atuacao;
            tx_area_atuacao = this.state.area_atuacao_chart.tx_porcentagem_maior;
        }




        let area_atuacao_chart = null;
        if(this.state.area_atuacao_chart){
            area_atuacao_chart = (
                <PieChart
                    id={'area-atuacao-chart'}
                    width={500}
                    series={this.state.area_atuacao_chart.series.data}
                    labels={this.state.area_atuacao_chart.labels}
                />
            );
        }

        //////////////////////////////////Repasse de Recursos///////////////////////////////////////////
        let ft_repasse_recursos = null;
        if(this.state.repasse_recursos_chart){
            ft_repasse_recursos = this.state.repasse_recursos_chart.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }
        let repasse_recursos_chart = null;

        if(this.state.repasse_recursos_chart){
            repasse_recursos_chart = (
                <MixedChart
                    id={'mix-chart-repasse_recursos'}
                    series={this.state.repasse_recursos_chart.series}
                    labels={this.state.repasse_recursos_chart.labels}
                />
            );
        }
        let nr_colocacao_nacional = 0;
        let nr_porcentagem_maior_tipo_repasse = 0;
        let nr_repasse_media = 0;
        let nr_repasse_media_nacional = 0;
        if(this.state.repasse_recursos_chart){
            nr_colocacao_nacional = this.state.repasse_recursos_chart.nr_colocacao_nacional;
            nr_porcentagem_maior_tipo_repasse = this.state.repasse_recursos_chart.nr_porcentagem_maior_tipo_repasse;
            nr_repasse_media = this.state.repasse_recursos_chart.nr_repasse_media;
            nr_repasse_media_nacional = this.state.repasse_recursos_chart.nr_repasse_media_nacional;
        }

        //////////////////////////////////Transferências Federais///////////////////////////////////////////
        let ft_orcamento = null;
        if(this.state.orcamento_chart){
            ft_orcamento = this.state.orcamento_chart.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        ///////////////////////////////////////////////////CHART
        let orcamento_chart = null;

        if(this.state.orcamento_chart){

            let orcamento_series = [{
                name: this.state.orcamento_chart.series.name,
                type: 'area',
                data: this.state.orcamento_chart.series.data,
            }];

            this.state.orcamento_chart.series
            orcamento_chart = (
                <MixedChart
                    id={'orcamento-chart'}
                    series={orcamento_series}
                    labels={this.state.orcamento_chart.labels}
                />
            );
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

        //console.log('****', this.state.orcamento_chart.media)


        return (
            <div>

                <div className="bg-lgt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <header>
                                    <br/>
                                        <h1>Rio de Janeiro</h1>
                                        <h5><a href="/">Home</a></h5>
                                        <br/>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <img src="/img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loading ? '' : 'none'}} />
                </div>
                <div className="container"  style={{display: this.state.loading ? 'none' : ''}}>

                    <div className="row">
                        <div className="col-md-12">
                            <br/><br/>
                            <div className="title-style">
                                <h2>Características</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <h3>Evolução quantidade de OSCs por ano de fundação</h3>
                            {evolucao_quantidade_osc_ano_chart}
                            <br/><br/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 text-center">
                            <div className="box-itens-hover p-2">
                                <h3>Quantidade OSCs</h3>
                                <h2>{this.state.caracteristicas.nr_quantidade_osc}</h2>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="box-itens-hover p-2">
                                <h3>Quantidade Trabalhadores</h3>
                                <h2>{this.state.caracteristicas.nr_quantidade_trabalhadores}</h2>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="box-itens-hover p-2">
                                <h3>Transferências federais</h3>
                                <h2>{this.state.caracteristicas.nr_quantidade_recursos}</h2>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="box-itens-hover p-2">
                                <h3>Quantidade Projetos</h3>
                                <h2>{this.state.caracteristicas.nr_quantidade_projetos}</h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/>
                            <p>
                                {this.state.localidade} é o&nbsp;
                                <strong>{this.state.evolucao_quantidade_osc_ano.nr_colocacao_nacional}º</strong> em relação a quantidade de OSCs no âmbito nacional. Nesse ranking, o estado&nbsp;
                                ({tx_primeiro_colocado_estado}, <strong>{this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado}</strong>) e o município&nbsp;
                                ({tx_primeiro_colocado_municipio},&nbsp;
                                <strong>{this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio}</strong> OSCs) são os que contêm mais OSCs. O estado&nbsp;
                                ({tx_ultimo_colocado_estado}) e o município&nbsp;
                                ({tx_ultimo_colocado_municipio}) são os que contêm menos OSCs,&nbsp;
                                <strong>{this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado}</strong> e&nbsp;
                                <strong>{this.state.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio}</strong> respectivamente.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_quantidade_osc} <br/>
                                <strong>Fonte quantidade trabalhadores:</strong> {ft_quantidade_trabalhadores} <br/>
                                <strong>Fonte valores de recursos:</strong> {ft_quantidade_recursos} <br/>
                                <strong>Fonte quantidade projetos:</strong> {ft_quantidade_projetos} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('evolucao_quantidade_osc_ano', 'evolucao_quantidade_osc_ano_chart', 3)}>Visualize os dados em tabela.</div><br/><br/><br/>

                        </div>
                    </div>

                    <div className="space"/>

                    {/*///////Natureza Juridica/////*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-style">
                                <h2>Natureza Juridica</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <p>
                                Na população de OSCs do estado, <strong>{nj_nr_porcentagem_maior}%</strong>&nbsp;
                                são classificadas como <strong>{nj_tx_porcentagem_maior}.</strong>&nbsp;
                                A média nacional é de <strong>{nj_nr_porcentagem_maior_media_nacional}%</strong>&nbsp;
                                de OSCs identificadas como <strong>{nj_tx_porcentagem_maior_media_nacional}</strong>.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_natureza_juridica} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('natureza_juridica', 'natureza_juridica_chart', 2)}>Visualize os dados em tabela.</div>
                        </div>
                        <div className="col-md-6">
                            {natureza_juridica_chart}
                            <br/><br/>
                        </div>

                    </div>


                    {/*///////Repasse de Recursos/////*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-style">
                                <h2>Repasse de Recursos</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <p>
                                {this.state.localidade} é o&nbsp;
                                <strong>{nr_colocacao_nacional}</strong>º em relação aos repasses de recursos para OSCs, com média de R$&nbsp;
                                <strong>{nr_repasse_media}</strong> por ano. A média nacional por estado de repasse de recursos é de R$&nbsp;
                                <strong>{nr_repasse_media_nacional}</strong>. Além dos repasses federais, a categoria de recursos mais declarada foi Recursos públicos com&nbsp;
                                <strong>{nr_porcentagem_maior_tipo_repasse}</strong>% do total.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_repasse_recursos} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('repasse_recursos', 'repasse_recursos_chart', 3)}>Visualize os dados em tabela.</div>
                        </div>
                        <div className="col-md-6">
                            {repasse_recursos_chart}
                            <br/><br/>
                        </div>
                    </div>
                    {/*////////////*/}
                    {/*///////Transferências Federais/////*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-style">
                                <h2>Transferências Federais</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <p>
                                A média por estado de transferências Federais é de R$ <strong>{this.state.orcamento_txt}</strong>.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_orcamento} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('orcamento', 'orcamento_chart', 4)}>Visualize os dados em tabela.</div>
                        </div>
                        <div className="col-md-6">
                            {orcamento_chart}
                            <br/><br/>
                        </div>
                    </div>
                    {/*////////////*/}
                    {/*///////Área de Atuação/////*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-style">
                                <h2>Área de Atuação</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <p>
                                {this.state.localidade} possui <strong>{nr_porcentagem_maior}</strong>%
                                das OSCs atuando em <strong>{tx_area_atuacao}</strong>, enquanto o percentual médio nacional de OSCs nesta categoria é de <strong>{nr_area_atuacao}</strong>%.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_area_atuacao} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('area_atuacao', 'area_atuacao_chart', 2)}>Visualize os dados em tabela.</div>
                        </div>
                        <div className="col-md-6">
                            {area_atuacao_chart}
                            <br/><br/>
                        </div>
                    </div>
                    {/*////////////*/}
                    {/*///////Trabalhadores/////*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-style">
                                <h2>Trabalhadores</h2>
                                <div className="line line-fix block" data-move-x="980px"/>
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <p>
                                {this.state.localidade} foram identificados <strong>{vinculos_deficiencia}</strong> vínculos formais de pessoas com deficiência. Além desses, as OSCS declararam <strong>{voluntarios}</strong> trabalhadores voluntários e <strong>{vinculos_formais}</strong> vínculos formais.
                            </p>
                            <p className="box-chart-font bg-lgt">
                                <strong>Fonte quantidade OSCs:</strong>  {ft_trabalhadores} <br/>
                            </p>
                            <div className="btn btn-outline-primary" onClick={() => this.callModal('trabalhadores', 'trabalhadores_chart', 2)}>Visualize os dados em tabela.</div>
                        </div>
                        <div className="col-md-6">
                            {trabalhadores_chart}
                            <br/><br/>
                        </div>
                    </div>
                    {/*////////////*/}

                </div>
                {modal}
            </div>

        );
    }
}


ReactDOM.render(
    <Perfil/>,
    document.getElementById('perfil')
);



