class OscsRecentes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oscs: [],
            loading: false,
            logos: [],
        };

        this.load = this.load.bind(this);
        this.getLogos = this.getLogos.bind(this);

    }

    componentDidMount(){
        this.load();
    }

    load(){
        this.setState({loading: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2+'osc/lista_atualizada/9',
            data: {
            },
            cache: false,
            success: function(data){
                this.getLogos();
                this.setState({oscs: data, loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }
    getLogos(){
        let logos = this.state.logos;
        for(let i in this.state.dataOscList){
            let id_osc = this.state.dataOscList[i].id_osc;
            //console.log(id_osc);
            $.ajax({
                method: 'GET',
                url: getBaseUrl2+'osc/logo/'+id_osc,
                processData: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
                contentType: false,//NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
                cache: false,
                success: function(data){
                    //console.log(data);
                    logos[id_osc] = data;
                    this.setState({logos: logos});
                    //this.setState({logo: data});
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }

    }

    render() {

        let oscs = null;
        if(this.state.oscs){
            oscs = this.state.oscs.map((item, index) => {
                let logo = this.state.logos[item.id_osc] ? this.state.logos[item.id_osc] : 'img/sem-imagem.png';
                return (
                    <div key={"recente"+index} className="col-md-4">
                        <a href={"detalhar/"+item.id_osc+"/"+clean(item.tx_nome_osc)}>
                            <div className="list-user list-lgt">
                                <img src={logo} alt=""
                                     className="rounded-circle float-left" width="50" style={{backgroundColor: '#FFFFFF'}}/>
                                    <h4 className="capitalize">
                                        {titleize(item.tx_nome_osc, 50)}
                                        {/*{item.tx_nome_osc.substr(1, 150)}*/}
                                        <i className="fas fa-angle-right float-right list-icon"/>
                                    </h4>

                                    <hr/>
                            </div>
                        </a>
                    </div>
                );
            });
        }

        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src="img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loading ? '' : 'none'}}/>
                </div>
                {oscs}

                <div className="col-md-12 text-center">
                    <br/><br/>
                        <a href="mapa">
                            <button type="button" className="btn btn-outline-light">Visualize todas as OSCs</button>
                        </a>
                        <br/><br/><br/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <OscsRecentes />,
    document.getElementById('oscsRecentes')
);
