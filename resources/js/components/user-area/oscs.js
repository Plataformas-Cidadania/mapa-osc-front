class Oscs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            loadingSearch: false,
            loadingAddOsc: false,
            loadingRemoveOsc: false,
            search: '',
            oscs:[],
            oscsSearch:[],
            editId: 0,
        };

        this.list = this.list.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.listSearch = this.listSearch.bind(this);
        this.addOsc = this.addOsc.bind(this);
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

    /*parceira*/
    handleSearch(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({search: search}, function(){
            this.listSearch(search);
        });
    }
    clickSearch(){
        let search = this.state.search ? this.state.search : ' ';
        this.listSearch(search);
    }
    listSearch(search){
        if (search.length>=8) {
            this.setState({loadingSearch: true});
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'search/cnpj/autocomplete/' + search,
                cache: false,
                success: function (data) {
                    this.setState({oscsSearch: data, loadingSearch: false});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({loadingSearch: false});
                }.bind(this)
            });
        }
    }

    addOsc(id_osc){
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'search/cnpj/autocomplete/' + search,
            cache: false,
            success: function (data) {
                this.setState({oscsSearch: data, loadingSearch: false});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({loadingSearch: false});
            }.bind(this)
        });
    }

    removeOsc(){

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

        console.log(this.state.listSearch);

        let listSearch = this.state.oscsSearch.map(function(item, index){
            let sizeSearch = this.state.search ? this.state.search.length : 0;
            let firstPiece = null;
            let secondPiece = item.tx_nome_osc;

            if (this.state.search) {
                firstPiece = item.tx_nome_osc.substr(0, sizeSearch);
                secondPiece = item.tx_nome_osc.substr(sizeSearch);
            }
            return(
                <li key={'cat_' + item.id_osc}
                    className="list-group-item d-flex "
                    onClick={() => this.addOsc(item.id_osc)}
                >
                    <u>{firstPiece}</u>{secondPiece}
                </li>
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
                <div className="row">
                    <div className="col-md-12">
                        <input type="text"
                               className="form-control float-left mx-sm-3"
                               placeholder="Digite o CNPJ da OSC parceira..."
                               name="cd_parceira"
                               autoComplete="off"
                               onClick={this.clickSearch}
                               onChange={this.handleSearch}
                               defaultValue={this.state.search}
                        />
                        <br/><br/>
                        <ul className="box-search-itens" style={{display: this.state.search ? '' : 'none'}}>
                            <div className="col-md-12 text-center">
                                <img src="/img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loadingSearch ? '' : 'none'}}/>
                            </div>
                            {listSearch}
                        </ul>
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
