class Daschboard extends React.Component{
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
            url: '/dashboard-status',
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
                    <h3><i className="fa fa-home" aria-hidden="true"/> Minha área</h3>
                    <hr/>
                </div>

                <p>Olá tudo bem! Estamos sentindo sua falta.</p>

                <br/>
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="box-border">
                            <br/>
                            <p>Total de OSCs</p>
                            <h2>20</h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box-border">
                            <br/>
                            <p>Total de projetos</p>
                            <h2>10</h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box-border">
                            <br/>
                            <p>Total de certificados</p>
                            <h2>30</h2>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <br/>
                        <div className="box-border">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">QTD: 2</th>
                                    <th scope="col">OSC</th>
                                    <th scope="col">Últimos 30 dias</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ASSOCIACAO CULTURAL PISADA DO SERTAO</td>
                                    <td>825</td>
                                    <td>3025</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>ASSOCIACAO CULTURAL PISADA DO SERTAO</td>
                                    <td>825</td>
                                    <td>3025</td>
                                </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>



                    {totais}

                </div>
                <div className="row">
                    <br/><br/> <br/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Daschboard/>,
    document.getElementById('dashboard')
);
