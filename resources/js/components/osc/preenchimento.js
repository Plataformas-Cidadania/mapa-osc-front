class Preenchimento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        this.load = this.load.bind(this);
           }

    componentDidMount(){
        this.load();
    }


    load(){
        let _this = this;

        $.ajax({
            method:'GET',
            url: getBaseUrl2+'osc/indice_preenchimento/'+this.props.id_osc,
            data:{

            },
            cache: false,
            success: function(data) {


                let transparencia = {
                    serie: [],
                    labels: [
                        'Áreas e Subáreas de Atuação da OSC',
                        'Dados Gerais',
                        'Descrição da OSC',
                        'Espaços de Participação Social',
                        'Fontes de recursos anuais da OSC',
                        'Projetos, atividades e/ou programas',
                        'Relações de Trabalho e Governança',
                        'Titulações e Certificações'
                    ],
                };

                transparencia.serie.push(data[0].transparencia_area_atuacao)
                transparencia.serie.push(data[0].transparencia_dados_gerais)
                transparencia.serie.push(data[0].transparencia_descricao)
                transparencia.serie.push(data[0].transparencia_espacos_participacao_social)
                transparencia.serie.push(data[0].transparencia_fontes_recursos)
                transparencia.serie.push(data[0].transparencia_projetos_atividades_programas)
                transparencia.serie.push(data[0].transparencia_relacoes_trabalho_governanca)
                transparencia.serie.push(data[0].transparencia_titulos_certificacoes)

                _this.setState({data: transparencia});

            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({loading: false});
            }
        });


    }

    render(){
        let polarChart = null;
        if(this.state.data){
            polarChart = (
                <PolarChart
                    polarChart="polarChart"
                    data={this.state.data}
                />
            )
        }
        return (
            <div>
                {polarChart}
            </div>
        );
    }
}


ReactDOM.render(
    <Preenchimento id_osc={id_osc}/>,
    document.getElementById('preenchimento')
);
