'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = (function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this, props);
        this.state = {
            processingOsc: false,
            processingOscIdhUfs: false,
            data: null,
            dataTerritorio: [],
            territory: 1, //país (irá carregar as regiões),
            dataOscUf: null,
            dataIdhUf: null

        };

        this.load = this.load.bind(this);
        //this.loadTerritorio = this.loadTerritorio.bind(this);
    }

    _createClass(Page, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.load();
            //this.loadTerritorio();
            this.loadOscUf();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;
            this.setState({ processingOsc: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: 'get-osc/' + this.state.territory,
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log(data);
                        _this.setState({ data: data, processingOsc: false });
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }

        /*loadTerritorio(){
            let _this = this;
            let rota = 'geo/regioes';
            this.setState({processingOsc: true}, function(){
                $.ajax({
                    method:'GET',
                    url: getBaseUrl2+'geo/regioes',
                    //url: 'geo/regioes',
                    data:{
                    },
                    cache: false,
                    success: function(data) {
                        console.log('loadTerritorio data', data);
                        let territorio = [];
                        territorio.tipo_territorio = _this.state.territory+1
                        territorio.territorios = [];
                        //transformando objeto em array para poder usar o método .map()
                        for(let i in data){
                            territorio.territorios.push(data[i]);
                        }
                        console.log('loadTerritorio territorio',territorio);
                        _this.setState({dataTerritorio: territorio, processingOsc: false});
                    },
                    error: function(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({loading: false});
                    }
                  });
            })
          }*/

    }, {
        key: 'loadOscUf',
        value: function loadOscUf() {
            var _this = this;
            this.setState({ processingOscIdhUfs: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: 'get-osc-all-ufs',
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log(data);
                        _this.setState({ dataOscUf: data['osc'], dataIdhUf: data['idh'], processingOscIdhUfs: false });
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(OscMap, {
                    mapId: 'mapTeste',
                    data: this.state.data,
                    origem: this.props.origem,
                    strJson: this.props.strJson,
                    //dataTerritorio={this.state.dataTerritorio}
                    dataOscUf: this.state.dataOscUf,
                    dataIdhUf: this.state.dataIdhUf,
                    processingOsc: this.state.processingOsc,
                    processingOscIdhUfs: this.state.processingOscIdhUfs
                })
            );
        }
    }]);

    return Page;
})(React.Component);

ReactDOM.render(React.createElement(Page, { origem: origem, strJson: strJson }), document.getElementById('page'));
/*<OscMap
   mapId="mapOsc"
   data={this.state.data}
/>*/