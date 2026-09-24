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
                this.setState({listMenuItem: Array.isArray(data) ? data : [], loadingList: false}, function(){});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let msg = xhr.responseJSON && xhr.responseJSON.msg ? xhr.responseJSON.msg : err.toString();
                this.setState({listMenuItem: [], loadingList: false, msg: msg});
            }.bind(this)
        });
    }


    render(){

        let menu = this.state.menu.map(function (item) {
            return (
                <li
                    key={'menu' + item.id}
                    onClick={() => this.btnSearch(item.id, item.txt, item.rota, item.qtd, item.campo)}
                    className={item.id === this.state.searchOscId ? 'cursor active' : 'cursor'}
                >
                    <i className={item.id === 1 ? 'fas fa-landmark' : 'fas fa-map-marker-alt'} aria-hidden="true"/>
                    {item.title}
                </li>
            )
        }.bind(this));

        let menuList = [];
        if (Array.isArray(this.state.listMenuItem)) {
            menuList = this.state.listMenuItem.map(function (item, index) {
                let tx_nome = '';
                let origem_id = 0;
                let cod_cnpj = '';
                let origem_url = '';
                let razao_social_osc = '';
                let texto_secundario = '';
                if (this.state.searchNameCampo === 'tx_nome_osc' && !item.hasOwnProperty('edmu_nm_municipio')) {
                    tx_nome = item.tx_nome_osc;
                    cod_cnpj = normalizeCnpj(item.cd_identificador_osc);
                    origem_id = item.id_osc;
                    origem_url = "detalhar/" + origem_id;
                    razao_social_osc = item.tx_razao_social_osc;
                    texto_secundario = getTextoSecundarioOsc(item);
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
                            {texto_secundario ? <span style={{display: 'block', fontSize: 11}}>{texto_secundario}</span> : ''}
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
        function normalizeCnpj(cnpj) {
            if (!cnpj || cnpj === "") {
                return "";
            }

            let normalized = String(cnpj).toUpperCase().replace(/[^A-Z0-9]/g, '');

            if (/^\d+$/.test(normalized) && normalized.length < 14) {
                normalized = normalized.padStart(14, "0");
            }

            return normalized;
        }

        function return_cnpj(cnpj){
            cnpj = normalizeCnpj(cnpj);

            if(!cnpj || cnpj.length !== 14)
                return "";

            return "CNPJ: " + `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
        }
        function getTextoSecundarioOsc(item) {
            let nome = normalizarTextoComparacao(item.tx_nome_osc);
            let razaoSocial = item.tx_razao_social_osc ? item.tx_razao_social_osc.trim() : '';
            let nomeFantasia = item.tx_nome_fantasia_osc ? item.tx_nome_fantasia_osc.trim() : '';

            if (razaoSocial && normalizarTextoComparacao(razaoSocial) !== nome) {
                return razaoSocial;
            }

            if (nomeFantasia && normalizarTextoComparacao(nomeFantasia) !== nome) {
                return nomeFantasia;
            }

            return '';
        }
        function normalizarTextoComparacao(texto) {
            return texto ? texto.trim().toUpperCase() : '';
        }
        function identificarFilialMatriz(cnpj) {
            cnpj = normalizeCnpj(cnpj);

            if(!cnpj || cnpj.length !== 14)
                return "";

            if (cnpj.slice(8, 12) !== '0001') {
                return "Filial";
            } else {
                return "Matriz";
            }
        }

        return (
            <div className="row justify-content-md-center">
                <style>{`
                    .search-home { text-align: center; }
                    .search-home h2 {
                        color: #071f45;
                        font-size: 36px;
                        font-weight: 700;
                        letter-spacing: 0;
                        margin-bottom: 8px;
                    }
                    .search-home-subtitle {
                        color: #697986;
                        font-size: 17px;
                        margin-bottom: 24px;
                    }
                    .search-panel {
                        background: #ffffff;

                        border-radius: 18px;
                        box-shadow: none;
                        padding: 24px;
                        text-align: left;
                    }
                    .search-panel .menu-small {
                        background: #f3f6fa;
                        border-radius: 14px;
                        display: inline-flex;
                        gap: 4px;
                        margin-bottom: 18px !important;
                        padding: 4px;
                    }
                    .search-panel .menu-small li {
                        align-items: center;
                        border: 0 !important;
                        border-radius: 11px;
                        color: #697986;
                        display: flex;
                        font-size: 15px;
                        font-weight: 600;
                        gap: 10px;
                        min-height: 42px;
                        padding: 0 22px;
                    }
                    .search-panel .menu-small li i {
                        align-items: center;
                        color: inherit !important;
                        display: inline-flex;
                        font-size: 16px;
                        justify-content: center;
                        margin-right: 0 !important;
                        width: 18px;
                    }
                    .search-panel .menu-small li.active {
                        background: #0d67bd;
                        box-shadow: none;
                        color: #ffffff;
                    }
                    .advanced-search-action {
                        align-items: center;
                        border: 1px solid #b9d7f5;
                        border-radius: 16px;
                        color: #0d67bd !important;
                        display: inline-flex;
                        font-size: 15px;
                        font-weight: 700;
                        gap: 10px;
                        justify-content: center;
                        margin-top: 18px;
                        min-height: 48px;
                        padding: 0 28px;
                        text-decoration: none;
                        transition: background-color .15s ease, border-color .15s ease, color .15s ease;
                    }
                    .advanced-search-action:hover {
                        background: #f4f8fb;
                        border-color: #8fc0ef;
                        color: #0a559e;
                        text-decoration: none;
                    }
                    .advanced-search-action .fa-chevron-right {
                        font-size: 12px;
                    }
                    .advanced-search-action i {
                        align-items: center;
                        color: inherit !important;
                        display: inline-flex;
                        justify-content: center;
                        width: 18px;
                    }
                    .search-container {
                        display: block;
                        position: relative;
                        width: 100%;
                    }
                    .search-input-row {
                        position: relative;
                    }
                    .search-container .search-icon {
                        left: 16px;
                        top: 29px;
                        z-index: 4;
                    }
                    .search-container #searchInput {
                        background: #ffffff;
                        border: 1px solid #d7dde5;
                        border-radius: 16px;
                        box-shadow: none;
                        box-sizing: border-box;
                        color: #111827;
                        font-size: 16px;
                        height: 58px;
                        padding: 0 166px 0 44px;
                        transition: border-color .15s ease, border-radius .15s ease;
                        width: 100%;
                    }
                    .search-container #searchInput:hover,
                    .search-container #searchInput:focus {
                        border-color: #9fb4c8;
                        box-shadow: none !important;
                        outline: none;
                    }
                    .search-container #searchInput:focus {
                        border-radius: 16px 16px 0 0;
                    }
                    .search-clear-button {
                        align-items: center;
                        background: #edf2f7;
                        border: 0;
                        border-radius: 50%;
                        color: #697986;
                        display: flex;
                        font-size: 20px;
                        height: 34px;
                        justify-content: center;
                        position: absolute;
                        right: 126px;
                        top: 12px;
                        width: 34px;
                        z-index: 5;
                    }
                    .search-submit-button {
                        align-items: center;
                        background: #0d67bd;
                        border: 0;
                        border-radius: 13px;
                        box-shadow: none;
                        color: #ffffff;
                        display: flex;
                        font-size: 15px;
                        font-weight: 700;
                        gap: 8px;
                        height: 46px;
                        justify-content: center;
                        position: absolute;
                        right: 6px;
                        top: 6px;
                        width: 112px;
                        z-index: 5;
                    }
                    .search-submit-button:hover { background: #075aa8; }
                    .search-container .dropdownSearch {
                        background: #ffffff;
                        border: 1px solid #d7dde5;
                        border-top: 0;
                        border-radius: 0 0 18px 18px;
                        box-shadow: none;
                        box-sizing: border-box;
                        left: 0;
                        max-height: 460px;
                        overflow-y: auto;
                        padding: 8px 10px;
                        top: 58px;
                        width: 100%;
                    }
                    .search-container .dropdownSearch ul {
                        max-height: none;
                        overflow: visible;
                    }
                    .search-container .dropdownSearch li.list-group-item {
                        padding: 10px 12px;
                    }
                    .search-container .dropdownSearch li.list-group-item:hover,
                    .search-container .dropdownSearch li.list-group-item:focus-within {
                        background: #f4f8fb !important;
                    }
                    .search-container .dropdownSearch li.list-group-item:hover a,
                    .search-container .dropdownSearch li.list-group-item:focus-within a {
                        color: #263238 !important;
                    }
                    .search-container .dropdownSearch li.list-group-item > a > p {
                        background: #eef2f7 !important;
                        border-radius: 8px !important;
                        color: #52616b;
                        display: inline-block;
                        font-size: 10px !important;
                        line-height: 15px;
                        margin: 0 0 0 6px !important;
                        padding: 0 6px !important;
                        vertical-align: 2px;
                    }
                    .search-container .dropdownSearch li.list-group-item > a > span {
                        color: #697986;
                        line-height: 15px;
                    }
                    .search-container .dropdownSearch li.list-group-item > a > span:first-of-type {
                        color: #52616b;
                        display: -webkit-box !important;
                        font-size: 11px !important;
                        line-height: 15px;
                        margin-top: 3px;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    @media (min-width: 768px) {
                        .row.justify-content-md-center > .col-md-5 {
                            flex: 0 0 760px;
                            max-width: 760px;
                        }
                    }
                    @media (max-width: 767px) {
                        .search-home h2 { font-size: 28px; }
                        .search-home-subtitle {
                            font-size: 15px;
                            margin-bottom: 18px;
                        }
                        .search-panel {
                            border-radius: 18px;
                            padding: 16px;
                        }
                        .search-panel .menu-small {
                            display: flex;
                            width: 100%;
                        }
                        .search-panel .menu-small li {
                            flex: 1;
                            justify-content: center;
                            padding: 0 10px;
                        }
                        .advanced-search-action {
                            width: 100%;
                        }
                        .row.justify-content-md-center > .col-md-5 {
                            flex: 0 0 100%;
                            max-width: 100%;
                            padding-left: 16px;
                            padding-right: 16px;
                        }
                        .search-container #searchInput {
                            height: 56px;
                            padding-right: 110px;
                        }
                        .search-clear-button {
                            right: 58px;
                            top: 11px;
                        }
                        .search-submit-button {
                            font-size: 0;
                            height: 44px;
                            right: 6px;
                            top: 6px;
                            width: 46px;
                        }
                        .search-submit-button i {
                            font-size: 15px;
                        }
                        .search-container .dropdownSearch {
                            max-height: 68vh;
                            top: 56px;
                        }
                    }
                `}</style>
                <div className="col-md-5 search-home">
                    <br/><br/>
                        <h2 className="text-center">Busque uma OSC no Mapa</h2>
                        <p className="search-home-subtitle">Encontre organiza{"\u00e7\u00f5es"} da sociedade civil em todo o Brasil</p>
                        <div className="search-panel">
                            <ul className="menu-small mb-2">
                                {menu}
                            </ul>
                            {/*NOVA BUSCA*/}
                            <div className="search-container">
                                <div className="search-input-row">
                                    <i className="fa fa-search search-icon" aria-hidden="true"/>
                                    <input type="text" id="searchInput" value={this.state.searchOsc} placeholder={this.state.searchOscTxt} onChange={this.handleSearchOsc}/>
                                    {this.state.searchOsc ? <button type="button" className="search-clear-button" onClick={() => this.setState({searchOsc: '', listMenuItem: [], msg: ''})}>{"\u00d7"}</button> : ''}
                                    <button type="button" className="search-submit-button" onClick={() => this.state.searchOsc.trim() ? this.startAdvancedSearch(this.state.searchOsc.trim()) : null}>
                                        <i className="fa fa-search" aria-hidden="true"/> Buscar
                                    </button>
                                </div>
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
                            <div className="text-center">
                                <a className="advanced-search-action" href="filtro">
                                    <i className="fas fa-sliders-h" aria-hidden="true"/>
                                    Utilize a Consulta Avan{"\u00e7"}ada
                                    <i className="fas fa-chevron-right" aria-hidden="true"/>
                                </a>
                            </div>
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



                </div>
            </div>

        );

    }


}


ReactDOM.render(
    <Search />,
    document.getElementById('search')
);

