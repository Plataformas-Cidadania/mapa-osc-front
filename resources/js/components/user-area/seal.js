class Seal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totais: [],
        };

        this.list = this.list.bind(this);
    }

    componentDidMount(){
        this.list();
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'GET',
            url: 'dashboard-status',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({totais: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                //this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        let totais = this.state.totais.map(function(total, index) {
            return(
                <div className="col-md-3 text-center" key={"totais_"+index}  style={{marginBottom: '30px'}}>
                    <div className="btn btn-default box-item-area">
                        <h2>{total.qtdTotal}</h2>
                        <p>{total.status}</p>
                    </div>
                </div>
            );
        });

        return(
            <div>
                <div className="title-user-area">
                    <h3><i className="fa fa-home" aria-hidden="true"/> Selo para seu site</h3>
                    <hr/>
                </div>
                <p>Nessa área você encontrara selos que identificam que sua instituição se encontra em nosso banco de dados.</p>
                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <p><strong>OSC Apac</strong></p>
                        <hr/><br/>
                    </div>
                    <div className="col-md-12">
                        <div className="label-float-tx">
                        <textarea className="form-control form-g" name="tx_historico" value="<a href='http://mapa-osc-laravel.local/selo-osc/www.ipea.gov.br/211212'><img src='https://mapaosc.ipea.gov.br/img/logo.png'></a>"
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
    <Seal/>,
    document.getElementById('seal')
);
