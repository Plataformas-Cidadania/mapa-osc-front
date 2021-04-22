class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localidade: '',
            tipo: '',
            data: [],
            caracteristicas: [],
            evolucao_quantidade_osc_ano: [],


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
                this.setState({
                    loading: false,
                    caracteristicas: data.caracteristicas,
                    evolucao_quantidade_osc_ano: data.evolucao_quantidade_osc_ano,
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

                <div className="row">
                    <div className="col-md-12">
                        <div className="title-style">
                            <h2>Natureza Juridica</h2>
                            <div className="line line-fix block" data-move-x="980px"/>
                            <hr/>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


ReactDOM.render(
    <Perfil/>,
    document.getElementById('perfil')
);



