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


        };
        this.load = this.load.bind(this);
        //this.load();
    }

    componentDidMount(){
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
                data.natureza_juridica.series_1.find(function(item){
                    series[0].data.push(item.value);
                    labels.push(item.label);
                });
                let natureza_juridica_chart = {
                    'labels': labels,
                    'series': series,
                }

                /*////////////Trabalhadores////////////*/
                let trabalhadores_series = [{
                    name: 'Número de Trabalhadores',
                    type: 'column',
                    data: []
                }];
                let trabalhadores_labels = [];
                data.trabalhadores.series_1.find(function(item){
                    trabalhadores_series[0].data.push(item.value);
                    trabalhadores_labels.push(item.label);
                });
                let trabalhadores_chart = {
                    'labels': trabalhadores_labels,
                    'series': trabalhadores_series,
                }

                /*////////////Área de Atuação////////////*/

                let area_atuacao_series = [];
                let area_atuacao_labels = [];
                data.area_atuacao.series_1.find(function(item){
                    area_atuacao_series.push(item.value);
                    area_atuacao_labels.push(item.label);
                });
                let area_atuacao_chart = {
                    'labels': area_atuacao_labels,
                    'series': area_atuacao_series,
                }

                this.setState({
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

                    localidade: data.tx_localidade,
                    tipo: data.tx_tipo_localidade,
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    render(){

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
        if(this.state.natureza_juridica.fontes){
            ft_natureza_juridica = this.state.natureza_juridica.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let tx_porcentagem_maior = '';
        if(this.state.natureza_juridica.tx_porcentagem_maior){
            tx_porcentagem_maior = this.state.natureza_juridica.tx_porcentagem_maior[0];
        }
        let tx_porcentagem_maior_media_nacional = '';
        if(this.state.natureza_juridica.tx_porcentagem_maior_media_nacional){
            tx_porcentagem_maior_media_nacional = this.state.natureza_juridica.tx_porcentagem_maior_media_nacional[0];
        }


        let natureza_juridica_chart = null;
        if(this.state.natureza_juridica_chart){
            natureza_juridica_chart = (
                <ColumnChart
                    id={'natureza-chart'}
                    series={this.state.natureza_juridica_chart.series}
                    labels={this.state.natureza_juridica_chart.labels}
                />
            );
        }
        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_trabalhadores = null;
        if(this.state.trabalhadores.fontes){
            ft_trabalhadores = this.state.natureza_juridica.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let trabalhadores_chart = null;
        if(this.state.trabalhadores_chart){
            trabalhadores_chart = (
                <ColumnChart
                    id={'natureza-chart'}
                    series={this.state.trabalhadores_chart.series}
                    labels={this.state.trabalhadores_chart.labels}
                />
            );
        }


        let vinculos_deficiencia = "";
        let voluntarios = "";
        let vinculos_formais = "";
        if(this.state.trabalhadores.series_1){
            vinculos_deficiencia = this.state.trabalhadores.series_1[0].value;
            voluntarios = this.state.trabalhadores.series_1[1].value;
            vinculos_formais = this.state.trabalhadores.series_1[2].value;
        }

        //////////////////////////////////Trabalhadores///////////////////////////////////////////
        let ft_area_atuacao = null;
        if(this.state.area_atuacao.fontes){
            ft_area_atuacao = this.state.area_atuacao.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        let nr_area_atuacao = '';
        if(this.state.area_atuacao.media_nacional){
            nr_area_atuacao = this.state.area_atuacao.media_nacional[0].nr_area_atuacao;
        }

        let tx_area_atuacao = '';
        if(this.state.area_atuacao.media_nacional){
            tx_area_atuacao = this.state.area_atuacao.media_nacional[0].tx_area_atuacao;
        }

        let area_atuacao_chart = null;
        if(this.state.area_atuacao_chart){
            area_atuacao_chart = (
                <PieChart
                    id={'area-atuacao-chart'}
                    width={500}
                    series={this.state.area_atuacao_chart.series}
                    labels={this.state.area_atuacao_chart.labels}
                />
            );
        }

        //////////////////////////////////Repasse de Recursos///////////////////////////////////////////
        let ft_repasse_recursos = null;
        if(this.state.repasse_recursos.fontes){
            ft_repasse_recursos = this.state.repasse_recursos.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }
        //////////////////////////////////Transferências Federais///////////////////////////////////////////
        let ft_orcamento = null;
        if(this.state.orcamento.fontes){
            ft_orcamento = this.state.orcamento.fontes.map(function (item, key) {
                return (
                    <span key={"ft_qp_" + key}>{item}, </span>
                );
            });
        }

        return (
            <div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="title-style">
                            <h2>Características</h2>
                            <div className="line line-fix block" data-move-x="980px"/>
                            <hr/>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <h3>Evolução quantidade de OSCs por ano de fundação</h3>
                        <MixedChart
                            id={'mix-chart'}
                            yaxis={['Teste']}
                            series={[{
                                name: 'Quantidade OSCs',
                                type: 'line',
                                data: [31, 40, 28, 51, 42, 109, 100]
                            },{
                                name: 'Quantidade OSCs Acumuladas',
                                type: 'area',
                                data: [50, 40, 80, 51, 200, 50, 80]
                            }]}
                            labels={['1922', '1930', '1940', '1950', '1960', '1970']}
                            /*id={'mix-chart'+item.chart}
                            yaxis={['Teste']}
                            series={item.series}
                            labels={item.labels}*/
                        />
                        <div className="btn btn-outline-primary float-right">Visualize os dados em tabela.</div><br/><br/><br/>
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
                            Na população de OSCs do estado, {this.state.natureza_juridica.nr_porcentagem_maior}%
                            são classificadas como {tx_porcentagem_maior}.
                            A média nacional é de {this.state.natureza_juridica.nr_porcentagem_maior_media_nacional}%
                            de OSCs identificadas como {tx_porcentagem_maior_media_nacional}.
                        </p>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte quantidade OSCs:</strong>  {ft_natureza_juridica} <br/>
                        </p>
                        <div className="btn btn-outline-primary">Visualize os dados em tabela.</div>
                    </div>
                    <div className="col-md-6">
                        {natureza_juridica_chart}
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
                            {this.state.localidade} é o {this.state.repasse_recursos.nr_colocacao_nacional}º&nbsp;
                            em relação aos repasses de recursos para OSCs, com média de R$ {this.state.repasse_recursos.nr_repasse_media}&nbsp;
                            por ano. A média nacional por estado de repasse de recursos é de R$ {this.state.repasse_recursos.nr_repasse_media_nacional}&nbsp;
                            . Além dos repasses federais, a categoria de recursos mais declarada foi Recursos públicos com {this.state.repasse_recursos.nr_colocacao_nacional}%&nbsp;
                            do total.
                        </p>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte quantidade OSCs:</strong>  {ft_repasse_recursos} <br/>
                        </p>
                        <div className="btn btn-outline-primary">Visualize os dados em tabela.</div>
                    </div>
                    <div className="col-md-6">

                        <ColumnChart
                            id={'mix-chart'}
                            yaxis={['Teste']}
                            series={[{
                                name: 'Quantidade OSCs',
                                type: 'column',
                                data: [31, 40, 28, 51, 42, 109]
                            }]}
                            labels={['1922', '1930', '1940', '1950', '1960', '1970']}
                        />
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
                            A média por estado de transferências Federais é de R$ {this.state.orcamento.media}.
                        </p>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte quantidade OSCs:</strong>  {ft_orcamento} <br/>
                        </p>
                        <div className="btn btn-outline-primary">Visualize os dados em tabela.</div>
                    </div>
                    <div className="col-md-6">

                        <ColumnChart
                            id={'mix-chart'}
                            yaxis={['Teste']}
                            series={[{
                                name: 'Quantidade OSCs',
                                type: 'column',
                                data: [31, 40, 28, 51, 42, 109]
                            }]}
                            labels={['1922', '1930', '1940', '1950', '1960', '1970']}
                        />
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
                            {this.state.localidade} possui {this.state.area_atuacao.nr_porcentagem_maior}%
                            das OSCs atuando em {tx_area_atuacao}, enquanto o percentual médio nacional de OSCs nesta categoria é de {nr_area_atuacao}%.
                        </p>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte quantidade OSCs:</strong>  {ft_area_atuacao} <br/>
                        </p>
                        <div className="btn btn-outline-primary">Visualize os dados em tabela.</div>
                    </div>
                    <div className="col-md-6">
                        {area_atuacao_chart}
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
                            {this.state.localidade} foram identificados {vinculos_deficiencia}&nbsp;
                            Vínculos formais de pessoas com deficiência. Alem desses, as OSCS declararam {voluntarios}&nbsp;
                            Trabalhadores voluntários e {vinculos_formais}&nbsp;
                            Vínculos formais.
                        </p>
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte quantidade OSCs:</strong>  {ft_trabalhadores} <br/>
                        </p>
                        <div className="btn btn-outline-primary">Visualize os dados em tabela.</div>
                    </div>
                    <div className="col-md-6">
                        {trabalhadores_chart}
                    </div>
                </div>
                {/*////////////*/}

            </div>

        );
    }
}


ReactDOM.render(
    <Perfil/>,
    document.getElementById('perfil')
);



