"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
//var _string = require("lodash/string");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Search = /*#__PURE__*/function (_React$Component) {
  _inherits(Search, _React$Component);
  var _super = _createSuper(Search);
  function Search(props) {
    var _this;
    _classCallCheck(this, Search);
    _this = _super.call(this, props);
    _this.state = {
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
    _this.load = _this.load.bind(_assertThisInitialized(_this));
    _this.handleSearchOsc = _this.handleSearchOsc.bind(_assertThisInitialized(_this));
    _this.btnSearch = _this.btnSearch.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //this.load();
    }
  }, {
    key: "handleSearchOsc",
    value: function handleSearchOsc(e) {
      //this.setState({searchOsc: ''});
      var search = e.target.value ? e.target.value : ' ';
      this.setState({
        searchOsc: search
      }, function () {
        if (search.length > 2) {
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
  }, {
    key: "btnSearch",
    value: function btnSearch(id, txt, rota, qtd, campo) {
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
  }, {
    key: "load",
    value: function load() {
      this.setState({
        loadingList: true
      });
      var url = getBaseUrl2 + this.state.searchOscRota + this.state.searchOsc;
      var data = null;
      var searchOsc = this.state.searchOsc.substring(0, 1) === '0' ? this.state.searchOsc.substring(1) : this.state.searchOsc;
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
  }, {
    key: "render",
    value: function render() {
      var menu = this.state.menu.map(function (item) {
        var _this2 = this;
        return /*#__PURE__*/React.createElement("li", {
          key: 'menu' + item.id,
          onClick: function onClick() {
            return _this2.btnSearch(item.id, item.txt, item.rota, item.qtd, item.campo);
          },
          className: "cursor",
          style: {
            borderBottom: item.id === this.state.searchOscId ? 'solid 2px #1b4b72' : ''
          }
        }, item.title);
      }.bind(this));
      var menuList = this.state.listMenuItem.map(function (item, index) {
        var tx_nome = '';
        var origem_id = 0;
        if (this.state.searchNameCampo === 'tx_nome_osc') {
          tx_nome = item.tx_nome_osc;
          origem_id = item.tx_nome_osc;
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
        }
        return /*#__PURE__*/React.createElement("li", {
          key: 'menuList' + index,
          className: "list-group-item d-flex"
        }, /*#__PURE__*/React.createElement("a", {
          href: "mapa/" + origem_id
        }, tx_nome));
      }.bind(this));

      // Adição do elemento que permite a pesquisa direta do que foi escrito no mapa
      if (this.state.searchOsc != '' && this.state.msg === '' && this.state.listMenuItem.length === 0) {
        menuList.push( /*#__PURE__*/React.createElement("li", {
          key: 'menuList' + this.state.listMenuItem.length,
          className: "list-group-item d-flex"
        }, /*#__PURE__*/React.createElement("a", {
          href: "mapa/" + this.state.searchOsc
        }, /*#__PURE__*/React.createElement("p", null, "Buscar por \"", this.state.searchOsc, "\" no mapa"))));
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
        className: "input-icon"
      }, /*#__PURE__*/React.createElement("input", {
        id: "ativarBox",
        type: "text",
        className: "form-control",
        placeholder: this.state.searchOscTxt,
        onChange: this.handleSearchOsc
      }), /*#__PURE__*/React.createElement("i", {
        className: "fas fa-search"
      })), /*#__PURE__*/React.createElement("ul", {
        className: "box-search-itens box-busca"
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/img/load.gif",
        alt: "",
        width: "60",
        className: "login-img",
        style: {
          display: this.state.loadingList ? '' : 'none'
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: this.state.msg === '' ? '' : 'none'
        }
      }, menuList), /*#__PURE__*/React.createElement("div", {
        style: {
          display: this.state.msg === '' ? 'none' : ''
        },
        className: "p-2 text-center"
      }, this.state.msg)), /*#__PURE__*/React.createElement("a", {
        className: "btn btn-outline-primary btn-sm",
        href: "filtro",
        style: {
          marginTop: '8px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-search"
      }), " Consulta avan\xE7ada")));
    }
  }]);
  return Search;
}(React.Component);
ReactDOM.render( /*#__PURE__*/React.createElement(Search, null), document.getElementById('search'));
