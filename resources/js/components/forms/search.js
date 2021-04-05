class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingAreas: false,
            menu:[
                {id: 1, title: "Organização", txt: 'Encontre uma OSC, digite o nome ou CNPJ...'},
                {id: 2, title: "Município", txt: 'Digite o nome do município...'},
                {id: 3, title: "Estado", txt: 'Digite o nome do estado...'},
                {id: 4, title: "Regição", txt: 'Digite o nome da região...'},
            ],
            searchOsc: '',
            searchOscTxt: 'Encontre uma OSC, digite o nome ou CNPJ...',

        };

        this.load = this.load.bind(this);
        this.handleSearchOsc = this.handleSearchOsc.bind(this);
        this.btnSearch = this.btnSearch.bind(this);

    }


    componentDidMount(){
        this.load();

    }
    handleSearchOsc(e){
        console.log(e);
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchOsc: search}, function(){
            if(this.state.searchOsc!=''){
                this.load(search);
            }

        });

    }
    btnSearch(id, txt){
        this.setState({searchOscTxt: txt}, function(){});
    }

    load(){
        this.setState({loadingAreas: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl+'search/osc/'+this.state.searchOsc+'/10/0/0',
            data: {
            },
            cache: false,
            success: function(data){

                this.setState({data: data, areaAtuacao: data[0].cd_area_atuacao, loadingAreas: false}, function(){

                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingAreas: false});
            }.bind(this)
        });
    }


    render(){

        let menu = this.state.menu.map(function (item) {
            return (
                <li  key={'menu' + item.id} onClick={() => this.btnSearch(item.id, item.txt)} className="cursor">
                    {item.title}
                </li>
            )
        }.bind(this));



        return (
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <br/><br/>
                        <div className="input-icon">
                            <input type="text" className="form-control"
                                   placeholder={this.state.searchOscTxt} onChange={this.handleSearchOsc}/>
                                <i className="fas fa-search"/>
                        </div>
                        <ul className="menu-small">
                            {menu}
                            <li className="float-right"><a href="filtro"><i className="fas fa-filter"/> Filtro</a></li>
                        </ul>
                        <br/><br/><br/>
                </div>
            </div>

        );

    }


}


ReactDOM.render(
    <Search />,
    document.getElementById('search')
);




