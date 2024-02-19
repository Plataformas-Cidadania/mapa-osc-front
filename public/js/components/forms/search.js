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
          listMenuItem: data,
          loadingList: false
        }, function () {});
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false,
          msg: xhr.responseJSON.msg
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
    let menuList;
    if (Array.isArray(this.state.listMenuItem)) {
      menuList = this.state.listMenuItem.map(function (item, index) {
        let tx_nome = '';
        let origem_id = 0;
        let cod_cnpj = '';
        let origem_url = '';
        if (this.state.searchNameCampo === 'tx_nome_osc' && !item.hasOwnProperty('edmu_nm_municipio')) {
          tx_nome = item.tx_nome_osc;
          cod_cnpj = item.cd_identificador_osc.padStart(14, "0"); // fix cnpj
          origem_id = item.id_osc;
          origem_url = "detalhar/" + origem_id;
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
          href: origem_url
        }, tx_nome, " ", /*#__PURE__*/React.createElement("p", {
          style: {
            padding: '0 5px',
            borderRadius: 5,
            backgroundColor: '#ebe7e7',
            display: 'inline-block',
            fontSize: 10,
            margin: 0
          }
        }, identificarFilialMatriz(cod_cnpj)), /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'block',
            fontSize: 10
          }
        }, return_cnpj(cod_cnpj), " ")));
      }.bind(this));
    }

    // Adição do elemento que permite a pesquisa direta do que foi escrito no mapa, apenas para "Organizacao"
    if (this.state.searchOsc != '' && this.state.msg === '' && this.state.searchOsc.length > 2 && this.state.searchOscId == 1) {
      menuList.unshift( /*#__PURE__*/React.createElement("li", {
        key: 'menuList' + this.state.listMenuItem.length,
        className: "list-group-item d-flex"
      }, /*#__PURE__*/React.createElement("a", {
        onClick: () => this.startAdvancedSearch(this.state.searchOsc)
      }, /*#__PURE__*/React.createElement("p", null, "Pressioner ENTER para buscar por \"", this.state.searchOsc, "\" no mapa"))));
    }
    function return_cnpj(cnpj) {
      if (!cnpj || cnpj == "") return "";else return "CNPJ:" + cnpj;
    }
    function identificarFilialMatriz(cnpj) {
      if (!cnpj || cnpj == "") return "";
      cnpj = cnpj.replace(/\D/g, '');
      if (cnpj.slice(8, 12) !== '0001') {
        return "Filial";
      } else {
        return "Matriz";
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-md-center"
    }, /*#__PURE__*/React.createElement("div", {
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
ReactDOM.render( /*#__PURE__*/React.createElement(Search, null), document.getElementById('search'));