class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cooldownTimer: null,
            loadingList: false,
            menu:[
                {id: 1, title: "Organização", txt: 'Encontre uma OSC, digite o nome ou CNPJ...', rota: 'busca/osc-autocomplete/', qtd: '10', campo: 'tx_nome_osc'},
                {id: 2, title: "Localização", txt: 'Digite o nome de um município, estado ou região...', rota: 'busca/todas_localizacoes/', qtd: '25', campo: 'todos'},
              //  {id: 3, title: "Estado", txt: 'Digite o nome do estado...', rota: 'busca/estado/', qtd: '10', campo: 'eduf_nm_uf'},
              //  {id: 4, title: "Região", txt: 'Digite o nome da região...', rota: 'busca/regiao/', qtd: '10', campo: 'edre_nm_regiao'},
            ],
            searchOsc: '',
            searchOscId: 1,
            searchOscTxt: 'Encontre uma OSC, digite o nome ou CNPJ...',
            searchOscRota: 'busca/osc-autocomplete/',
            //searchOscRota: 'busca/osc/',
            searchOscQtd: '10',
            searchNameCampo: 'tx_nome_osc',

            listMenuItem: [],
            msg: '',

        };

        this.load = this.load.bind(this);
        this.handleSearchOsc = this.handleSearchOsc.bind(this);
        this.btnSearch = this.btnSearch.bind(this);
        this.handleSearchOsc = this.handleSearchOsc.bind(this);


    }


    componentDidMount(){
        //this.load();
        const input = document.getElementById('searchInput');
        input.addEventListener('keyup', this.handleEnterKeyPress);
    }
    handleEnterKeyPress = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const searchOsc = this.state.searchOsc.trim();
            if (searchOsc) {
                this.startAdvancedSearch(searchOsc)
            }
        }
    }
    
    handleSearchOsc(e){
        //this.setState({searchOsc: ''});
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchOsc: search}, function(){
            if(search.length > 2){
                // Timer de 1s para iniciar a pesquisa
                if (this.state.cooldownTimer) {
                    clearTimeout(this.state.cooldownTimer);
                }
                const timer = setTimeout(() => {
                    this.load(search);
                }, 300);
                this.setState({ cooldownTimer: timer });
            }
        });

    }
    
    // Cria um elemento form shadow para permitir o browser fazer o redirecionamento pra nós. Fiz isso para evitar problemas de criar url post, criptografia e token
    startAdvancedSearch(oscName) {
        const shadowForm = document.createElement('form');
        shadowForm.action = 'mapa-busca-avancada'; 
        shadowForm.method = 'POST';
      
        const jsonInput = document.createElement('input');
        jsonInput.type = 'hidden';
        jsonInput.name = 'json';
        jsonInput.value = JSON.stringify({
          avancado: {
            dadosGerais: {
              tx_razao_social_osc: oscName
            }
          }
        });
        shadowForm.appendChild(jsonInput);
        document.body.appendChild(shadowForm);
        shadowForm.submit();
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

        let url = getBaseUrl2 + this.state.searchOscRota + this.state.searchOsc;
        let data = null;
        let searchOsc = this.state.searchOsc.substring(0,1) === '0' ? this.state.searchOsc.substring(1) : this.state.searchOsc;
        //a forma de requisição pra busca pelo nome da osc precisa ser diferente por conta da busca com acentos.
        if(this.state.searchOscRota === "busca/osc-autocomplete/"){
            url = getBaseUrl2 + this.state.searchOscRota;
            data = {
                texto_busca: searchOsc
            };
        }

        $.ajax({
            method: 'GET',
            url: url,
            data: data,
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

        let menuList;
        if (Array.isArray(this.state.listMenuItem)) {
            menuList = this.state.listMenuItem.map(function (item, index) {
                let tx_nome = '';
                let origem_id = 0;
                let cod_cnpj = '';
                let origem_url = '';
                let razao_social_osc = '';
                if (this.state.searchNameCampo === 'tx_nome_osc' && !item.hasOwnProperty('edmu_nm_municipio')) {
                    tx_nome = item.tx_nome_osc;
                    cod_cnpj = item.cd_identificador_osc.padStart(14, "0");  // fix cnpj
                    origem_id = item.id_osc;
                    origem_url = "detalhar/" + origem_id;
                    razao_social_osc = item.tx_razao_social_osc;
                } else if (this.state.searchNameCampo === 'todos') {
                    if (item.hasOwnProperty('edmu_nm_municipio')) {
                        if (item.edmu_nm_municipio !== undefined) {
                            tx_nome = item.edmu_nm_municipio + ' - ' + item.eduf_sg_uf;
                            origem_id = item.edmu_cd_municipio;
                        }
                    } else if (item.hasOwnProperty('eduf_nm_uf')) {
                        tx_nome = item.eduf_nm_uf;
                        origem_id = item.eduf_cd_uf;
                    } else if (item.hasOwnProperty('edre_nm_regiao')) {
                        tx_nome = item.edre_nm_regiao;
                        origem_id = item.edre_cd_regiao;
                    }
                    origem_url = "mapa/" + origem_id;
                }
                
                return (
                    <li
                        key={'menuList' + index}
                        className="list-group-item d-flex"
                    >
                        <a href={origem_url} title={razao_social_osc ? 'RAZÃO SOCIAL : '+ razao_social_osc : ''} >
                            {tx_nome} <p style={{padding: '0 5px', borderRadius: 5, backgroundColor: '#ebe7e7', display: 'inline-block', fontSize: 10, margin: 0}}>{identificarFilialMatriz(cod_cnpj)}</p>
                            <span style={{display: 'block', fontSize: 10}}>{return_cnpj(cod_cnpj)} </span>

                        </a>
                    </li>
                )
            }.bind(this));
        }

        // Adição do elemento que permite a pesquisa direta do que foi escrito no mapa, apenas para "Organizacao"
        if (this.state.searchOsc != '' && this.state.msg === '' && this.state.searchOsc.length > 2  && this.state.searchOscId == 1) {
            menuList.unshift(
            <li key={'menuList' + this.state.listMenuItem.length} className="list-group-item d-flex">
                <a onClick={() => this.startAdvancedSearch(this.state.searchOsc)}>
                    <p>Pressioner ENTER para buscar por "{this.state.searchOsc}" no mapa</p>
                </a>
            </li>
            );
        }
        function return_cnpj(cnpj){
            if(!cnpj || cnpj == "")
                return "";
            else
                return "CNPJ:" + cnpj
        }
        function identificarFilialMatriz(cnpj) {
            if(!cnpj || cnpj == "")
                return "";
            cnpj = cnpj.replace(/\D/g, '');
            if (cnpj.slice(8, 12) !== '0001') {
                return "Filial";
            } else {
                return "Matriz";
            }
        }

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <br/><br/>
                        <h2 className="text-center">Busque uma OSC no Mapa</h2>
                        <ul className="menu-small mb-2">
                            {menu}
                        </ul>
                        {/*NOVA BUSCA*/}
                        <div className="search-container">
                            <i className="fa fa-search search-icon" aria-hidden="true"/>
                            <input type="text" id="searchInput"  placeholder={this.state.searchOscTxt} onChange={this.handleSearchOsc}/>
                                <div className="dropdownSearch" id="myDropdownSearch" >
                                    <div>
                                        <div className="text-center">
                                            <img src="/img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loadingList ? '' : 'none'}}/>
                                        </div>
                                        <ul style={{display: this.state.msg === '' ? '' : 'none'}}>
                                            {menuList}
                                        </ul>
                                        <div style={{display: this.state.msg === '' ? 'none' : ''}} className="p-2 text-center">
                                            {this.state.msg}
                                        </div>
                                    </div>
                                </div>
                                {/*<i class="fa fa-spinner search-icon-spinner fa-spin" aria-hidden="true" />*/}
                        </div>
                        {/*NOVA BUSCA*/}
                    <br/>
                    <br/>


                        {/*<div className="input-icon">
                            <input id="ativarBox" type="search" className="form-control"
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
                        </ul>*/}

                    <div className="text-center">
                        <a className="btn btn-outline-primary btn-sm" href="filtro" style={{marginTop: '8px'}}><i className="fas fa-search"/> Utilize a Consulta Avançada</a>
                    </div>


                </div>
            </div>

        );

    }


}


ReactDOM.render(
    <Search />,
    document.getElementById('search')
);




