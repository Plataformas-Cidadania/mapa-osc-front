class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            menu:[
               /* {id: 1, title: "Organização", txt: 'Encontre uma OSC, digite o nome ou CNPJ...', rota: 'search/osc/autocomplete/', qtd: '10', campo: 'tx_nome_osc'},
                {id: 2, title: "Município", txt: 'Digite o nome do município...', rota: 'menu/geo/municipio/', qtd: '25', campo: 'edmu_nm_municipio'},
                {id: 3, title: "Estado", txt: 'Digite o nome do estado...', rota: 'menu/geo/estado/', qtd: '10', campo: 'eduf_nm_uf'},
                {id: 4, title: "Região", txt: 'Digite o nome da região...', rota: 'menu/geo/regiao/', qtd: '10', campo: 'edre_nm_regiao'},*/
                {id: 1, title: "Organização", txt: 'Encontre uma OSC, digite o nome ou CNPJ...', rota: 'search/cnpj/autocomplete/', qtd: '10', campo: 'tx_nome_osc'},
                {id: 2, title: "Município", txt: 'Digite o nome do município...', rota: 'busca/municipio/', qtd: '25', campo: 'edmu_nm_municipio'},
                {id: 3, title: "Estado", txt: 'Digite o nome do estado...', rota: 'busca/estado/', qtd: '10', campo: 'eduf_nm_uf'},
                {id: 4, title: "Região", txt: 'Digite o nome da região...', rota: 'busca/regiao/', qtd: '10', campo: 'edre_nm_regiao'},
            ],
            searchOsc: '',
            searchOscId: 1,
            searchOscTxt: 'Encontre uma OSC, digite o nome ou CNPJ...',
            searchOscRota: 'search/osc/autocomplete/',
            searchOscQtd: '10',
            searchNameCampo: 'tx_nome_osc',

            listMenuItem: [],
            msg: '',
        };

        this.load = this.load.bind(this);
        this.handleSearchOsc = this.handleSearchOsc.bind(this);
        this.btnSearch = this.btnSearch.bind(this);

    }


    componentDidMount(){
        //this.load();
    }
    handleSearchOsc(e){
        //this.setState({searchOsc: ''});
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchOsc: search}, function(){
            if(search.length > 2){
                this.load(search);
            }
        });

    }
    btnSearch(id, txt, rota, qtd, campo){
        this.setState({
            msg: '',
            //searchOsc: '',
            searchOscId: id,
            searchOscTxt: txt,
            searchOscRota: rota,
            searchOscQtd: qtd,
            searchNameCampo: campo,
        }, function(){
            if(this.state.searchOsc.length > 2){
                this.load(this.state.searchOsc)
            }

        });
    }

    load(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + this.state.searchOscRota + this.state.searchOsc,
            data: {
            },
            cache: false,
            success: function(data){
                this.setState({listMenuItem: data, loadingList: false}, function(){});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false, msg: xhr.responseJSON.msg});
            }.bind(this)
        });
    }


    render(){

        let menu = this.state.menu.map(function (item) {
            return (
                <li
                    key={'menu' + item.id}
                    onClick={() => this.btnSearch(item.id, item.txt, item.rota, item.qtd, item.campo)}
                    className="cursor"
                    style={{borderBottom: item.id === this.state.searchOscId ? 'solid 2px #1b4b72' : ''}}
                >
                    {item.title}
                </li>
            )
        }.bind(this));

        let menuList = this.state.listMenuItem.map(function (item, index) {

            let tx_nome = '';
            let origem_id = 0;
            if(this.state.searchNameCampo==='tx_nome_osc'){
                tx_nome = item.tx_nome_osc;
                origem_id = item.tx_nome_osc;
            }else if(this.state.searchNameCampo==='edmu_nm_municipio'){
                if(item.edmu_nm_municipio!==undefined){
                    tx_nome = item.edmu_nm_municipio + ' - ' + item.eduf_sg_uf;
                    origem_id = item.edmu_cd_municipio;
                }

            }else if(this.state.searchNameCampo==='eduf_nm_uf'){
                tx_nome = item.eduf_nm_uf;
                origem_id = item.eduf_cd_uf;
            }else if(this.state.searchNameCampo==='edre_nm_regiao'){
                tx_nome = item.edre_nm_regiao;
                origem_id = item.edre_cd_regiao;
            }


            return (
                <li
                    key={'menuList' + index}
                    className="list-group-item d-flex"
                >
                    <a href={"mapa/"+origem_id}>
                        {tx_nome}
                    </a>
                </li>
            )
        }.bind(this));



        return (
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <br/><br/>
                        <ul className="menu-small mb-2">
                            {menu}
                            <li className="float-right"><a href="filtro"><i className="fas fa-filter"/> Filtro</a></li>
                        </ul>
                        <div className="input-icon">
                            <input id="ativarBox" type="text" className="form-control"
                                   placeholder={this.state.searchOscTxt} onChange={this.handleSearchOsc}/>
                                <i className="fas fa-search"/>
                        </div>
                        <ul className="box-search-itens box-busca">
                            <div className="text-center">
                                <img src="/img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loadingList ? '' : 'none'}}/>
                            </div>
                            <div style={{display: this.state.msg === '' ? '' : 'none'}}>
                                {menuList}
                            </div>
                            <div style={{display: this.state.msg === '' ? 'none' : ''}} className="p-2 text-center">
                                {this.state.msg}
                            </div>
                        </ul>


                </div>
            </div>

        );

    }


}


ReactDOM.render(
    <Search />,
    document.getElementById('search')
);




