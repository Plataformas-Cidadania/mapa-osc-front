class Depen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
        this.load = this.load.bind(this);
    }

    componentDidMount(){
        this.load();
    }

    load(){
        console.log('pages');
        $.ajax({
            method: 'GET',
            url: 'json/lista-osc-com-links.json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, data: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

    }

    render(){
        let itensLista = null;
        if(this.state.data){
            itensLista = this.state.data.map(function (item, index){
                console.log(item);
                return (
                    <tr key={'trModal'+index}>
                        <td>{item.cnpj}</td>
                        <td>{item.nome}</td>
                        <td><a href={"detalhar/"+item.id}><i className="fas fa-share-square"/></a></td>
                    </tr>
                );
            });
        }


        return (

            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                <tr>
                                    <th>CNPJ</th>
                                    <th>Nome</th>
                                    <th>Detalhar</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {itensLista}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
ReactDOM.render(
    <Depen/>,
    document.getElementById('depen')
);
