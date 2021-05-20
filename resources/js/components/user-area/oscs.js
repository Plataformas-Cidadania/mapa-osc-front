class Oscs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            oscs:[],
            editId: 0,
        };

        this.list = this.list.bind(this);
    }

    componentDidMount(){
        this.list();
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'get',
            url: getBaseUrl2 + 'osc/list-oscs-usuario',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data){
                this.setState({oscs: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        let oscs = this.state.oscs.map(function(item, index){

            let hr = null;
            if(index < this.state.oscs.length-1){
                hr = <hr/>;
            }

            return (
                    <tr key={"osc_"+item.id_osc}>
                        <th scope="row">{index+1}</th>
                        <td>
                           {/* <img src={"/imagens/oscs/md-"+item.imagem} className="box-item-theme-img" alt="" width="100%" />*/}
                            {item.tx_nome_osc}
                        </td>
                        <td width="230">
                            <div className="btn btn-primary">
                                <a href={"detalhar/"+item.id_osc+"/"+item.tx_nome_osc}><i className="fas fa-binoculars"/> Visualizar</a>
                            </div>
                            &nbsp;
                            <div className="btn btn-success">
                                <a href={"osc-user/"+item.id_osc}><i className="far fa-edit"/> Editar</a>
                            </div>
                        </td>
                    </tr>
            );
        }.bind(this));

        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome da OSC</th>
                                <th scope="col" className="text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {oscs}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Oscs/>,
    document.getElementById('oscs')
);
