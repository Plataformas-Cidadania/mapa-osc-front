class Seal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            osc: {},
            loading: false,
        };

        this.list = this.list.bind(this);
    }

    componentDidMount(){
        this.list();
    }

    list(){

        this.setState({loading: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2+'osc/cabecalho/'+this.props.id_osc,
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({osc: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                //this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        return(
            <div>
                <div className="title-user-area">
                    <h3><i className="fa fa-home" aria-hidden="true"/> Selo para seu site</h3>
                    <hr/>
                </div>
                <p>Nessa área você encontrara selo que identificam que sua instituição se encontra em nosso banco de dados, copie o script e cole em seu site!</p>
                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <p><strong>{this.state.osc.tx_razao_social_osc}</strong></p>
                        <hr/><br/>
                    </div>
                    <div className="col-md-12">
                        <div className="label-float-tx">
                        <textarea className="form-control form-g"
                                  name="tx_historico"
                                  value={"<a href='"+this.props.app_url+"selo-osc/www.ipea.gov.br/"+this.props.id_osc+"'>" +
                                  "<img src='"+this.props.app_url+"img/logo.png'>" +
                                  "</a>"}
                                  rows="3"  />
                                <label htmlFor="tx_historico">Script</label>
                                <div className="label-box-info-tx-off">
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                    </div>
                    <br/><br/> <br/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Seal id_osc={id_osc} app_url={app_url}/>,
    document.getElementById('seal')
);
