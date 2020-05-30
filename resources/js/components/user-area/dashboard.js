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
                    <h3><i className="fa fa-home" aria-hidden="true"></i> Minha área</h3>
                    <hr/>
                </div>

                <p>Olá tudo bem! Estamos sentindo sua falta.</p>
                {/*Boa tarde, estamos sentindo sua falta, aproveite para ver os lançamentos de nossa loja.*/}
                <br/><br/>
                <div className="row">
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