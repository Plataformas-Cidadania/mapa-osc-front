class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cooldownTimer: null,
      loadingList: false,
      menu: [{
        id: 1,
        title: "Organização",
        txt: 'Encontre uma OSC, digite o nome ou CNPJ...',
        rota: 'busca/osc-autocomplete/',
        qtd: '10',
        campo: 'tx_nome_osc'
      }, {
        id: 2,
        title: "Localização",
        txt: 'Digite o nome de um município, estado ou região...',
        rota: 'busca/todas_localizacoes/',
        qtd: '25',
        campo: 'todos'
      }
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
      msg: ''
    };
    this.load = this.load.bind(this);
    this.handleSearchOsc = this.handleSearchOsc.bind(this);
    this.btnSearch = this.btnSearch.bind(this);
    this.handleSearchOsc = this.handleSearchOsc.bind(this);
  }
  componentDidMount() {
    //this.load();
    const input = document.getElementById('searchInput');
    input.addEventListener('keyup', this.handleEnterKeyPress);
  }
  handleEnterKeyPress = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const searchOsc = this.state.searchOsc.trim();
      if (searchOsc) {
        this.startAdvancedSearch(searchOsc);
      }
    }
  };
  handleSearchOsc(e) {
    //this.setState({searchOsc: ''});
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      searchOsc: search
    }, function () {
      if (search.length > 2) {
        // Timer de 1s para iniciar a pesquisa
        if (this.state.cooldownTimer) {
          clearTimeout(this.state.cooldownTimer);
        }
        const timer = setTimeout(() => {
          this.load(search);
        }, 300);
        this.setState({
          cooldownTimer: timer
        });
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
  btnSearch(id, txt, rota, qtd, campo) {
    this.setState({
      msg: '',
      //searchOsc: '',
      searchOscId: id,
      searchOscTxt: txt,
      searchOscRota: rota,
      searchOscQtd: qtd,
      searchNameCampo: campo
    }, function () {
      if (this.state.searchOsc.length > 2) {
        this.load(this.state.searchOsc);
      }
    });
  }
  load() {
    this.setState({
      loadingList: true
    });
    let url = getBaseUrl2 + this.state.searchOscRota + this.state.searchOsc;
    let data = null;
    let searchOsc = this.state.searchOsc.substring(0, 1) === '0' ? this.state.searchOsc.substring(1) : this.state.searchOsc;
    //a forma de requisição pra busca pelo nome da osc precisa ser diferente por conta da busca com acentos.
    if (this.state.searchOscRota === "busca/osc-autocomplete/") {
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
      success: function (data) {
        this.setState({
          listMenuItem: Array.isArray(data) ? data : [],
          loadingList: false
        }, function () {});
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        let msg = xhr.responseJSON && xhr.responseJSON.msg ? xhr.responseJSON.msg : err.toString();
        this.setState({
          listMenuItem: [],
          loadingList: false,
          msg: msg
        });
      }.bind(this)
    });
  }
  render() {
    let menu = this.state.menu.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        key: 'menu' + item.id,
        onClick: () => this.btnSearch(item.id, item.txt, item.rota, item.qtd, item.campo),
        className: "cursor",
        style: {
          borderBottom: item.id === this.state.searchOscId ? 'solid 2px #1b4b72' : ''
        }
      }, item.title);
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
        return /*#__PURE__*/React.createElement("li", {
          key: 'menuList' + index,
          className: "list-group-item d-flex"
        }, /*#__PURE__*/React.createElement("a", {
          href: origem_url,
          title: razao_social_osc ? 'RAZÃO SOCIAL : ' + razao_social_osc : ''
        }, tx_nome, " ", /*#__PURE__*/React.createElement("p", {
          style: {
            padding: '0 5px',
            borderRadius: 5,
            backgroundColor: '#ebe7e7',
            display: 'inline-block',
            fontSize: 10,
            margin: 0
          }
        }, identificarFilialMatriz(cod_cnpj)), texto_secundario ? /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'block',
            fontSize: 11
          }
        }, texto_secundario) : '', /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'block',
            fontSize: 10
          }
        }, return_cnpj(cod_cnpj), " ")));
      }.bind(this));
    }

    // Adição do elemento que permite a pesquisa direta do que foi escrito no mapa, apenas para "Organizacao"
    if (this.state.searchOsc != '' && this.state.msg === '' && this.state.searchOsc.length > 2 && this.state.searchOscId == 1) {
      menuList.unshift(/*#__PURE__*/React.createElement("li", {
        key: 'menuList' + this.state.listMenuItem.length,
        className: "list-group-item d-flex"
      }, /*#__PURE__*/React.createElement("a", {
        onClick: () => this.startAdvancedSearch(this.state.searchOsc)
      }, /*#__PURE__*/React.createElement("p", null, "Pressioner ENTER para buscar por \"", this.state.searchOsc, "\" no mapa"))));
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
    function return_cnpj(cnpj) {
      cnpj = normalizeCnpj(cnpj);
      if (!cnpj || cnpj.length !== 14) return "";
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
      if (!cnpj || cnpj.length !== 14) return "";
      if (cnpj.slice(8, 12) !== '0001') {
        return "Filial";
      } else {
        return "Matriz";
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-md-center"
    }, /*#__PURE__*/React.createElement("style", null, `
                    .search-container {
                        display: block;
                        position: relative;
                        width: 100%;
                    }
                    .search-container .search-icon {
                        left: 16px;
                        top: 25px;
                        z-index: 4;
                    }
                    .search-container #searchInput {
                        background: #ffffff;
                        border: 1px solid #d7dde5;
                        border-radius: 26px;
                        box-shadow: 0 10px 28px rgba(15, 23, 42, .10);
                        box-sizing: border-box;
                        color: #111827;
                        font-size: 16px;
                        height: 54px;
                        padding: 0 18px 0 44px;
                        transition: border-color .15s ease, box-shadow .15s ease, border-radius .15s ease;
                        width: 100%;
                    }
                    .search-container #searchInput:hover,
                    .search-container #searchInput:focus {
                        border-color: #9fb4c8;
                        box-shadow: 0 12px 32px rgba(15, 23, 42, .14) !important;
                        outline: none;
                    }
                    .search-container #searchInput:focus {
                        border-radius: 26px 26px 0 0;
                    }
                    .search-container .dropdownSearch {
                        background: #ffffff;
                        border: 1px solid #d7dde5;
                        border-top: 0;
                        border-radius: 0 0 18px 18px;
                        box-shadow: 0 18px 34px rgba(15, 23, 42, .14);
                        box-sizing: border-box;
                        left: 0;
                        max-height: 460px;
                        overflow-y: auto;
                        padding: 8px 10px;
                        top: 54px;
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
                            flex: 0 0 680px;
                            max-width: 680px;
                        }
                    }
                    @media (max-width: 767px) {
                        .row.justify-content-md-center > .col-md-5 {
                            flex: 0 0 100%;
                            max-width: 100%;
                            padding-left: 16px;
                            padding-right: 16px;
                        }
                        .search-container .dropdownSearch {
                            max-height: 68vh;
                        }
                    }
                `), /*#__PURE__*/React.createElement("div", {
      className: "col-md-5"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", {
      className: "text-center"
    }, "Busque uma OSC no Mapa"), /*#__PURE__*/React.createElement("ul", {
      className: "menu-small mb-2"
    }, menu), /*#__PURE__*/React.createElement("div", {
      className: "search-container"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-search search-icon",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "searchInput",
      placeholder: this.state.searchOscTxt,
      onChange: this.handleSearchOsc
    }), /*#__PURE__*/React.createElement("div", {
      className: "dropdownSearch",
      id: "myDropdownSearch"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/img/load.gif",
      alt: "",
      width: "60",
      className: "login-img",
      style: {
        display: this.state.loadingList ? '' : 'none'
      }
    })), /*#__PURE__*/React.createElement("ul", {
      style: {
        display: this.state.msg === '' ? '' : 'none'
      }
    }, menuList), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.msg === '' ? 'none' : ''
      },
      className: "p-2 text-center"
    }, this.state.msg)))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-outline-primary btn-sm",
      href: "filtro",
      style: {
        marginTop: '8px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-search"
    }), " Utilize a Consulta Avan\xE7ada"))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Search, null), document.getElementById('search'));
