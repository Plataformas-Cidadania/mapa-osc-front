class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getCertificado = this.getCertificado.bind(this);
        this.getAreaAtuacao = this.getAreaAtuacao.bind(this);
        this.getSituacaoImovel = this.getSituacaoImovel.bind(this);
        this.getObjetivoProjeto = this.getObjetivoProjeto.bind(this);
        this.getIpeaData = this.getIpeaData.bind(this);
        //this.getSubAreaAtuacao = this.getSubAreaAtuacao.bind(this);
    }

    componentDidMount() {
        this.getCertificado()
        this.getAreaAtuacao()
        this.getSituacaoImovel()
        this.getObjetivoProjeto()
        this.getIpeaData()
        //this.getSubAreaAtuacao()
    }

    getCertificado(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'menu/osc/certificado',
            url: 'menu/osc/certificado',
            success: function (data) {
                this.setState({loading: false, certificados: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    getAreaAtuacao(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'menu/osc/area_atuacao',
            url: getBaseUrl2+'area_atuacao',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                });
                this.setState({loading: false, areaAtuacao: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    getSituacaoImovel(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/situacao_imovel',
            success: function (data) {
                this.setState({loading: false, form: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    getObjetivoProjeto(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'menu/osc/objetivo_projeto',
            url: getBaseUrl2+'objetivos',
            success: function (data) {
                this.setState({loading: false, form: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    getIpeaData(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/ipeadata',
            success: function (data) {

                this.setState({loading: false, ipeaData: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
        //console.log(this.state.ipeaData);
        return (
            <Filter
                csrf_token={this.props.csrf_token}
                certificados={this.state.certificados}
                areaAtuacao={this.state.areaAtuacao}
                ipeaData={this.state.ipeaData}
            />
        );

    }
}

ReactDOM.render(
    <Api csrf_token={csrf_token}/>,
    document.getElementById('api')
);
