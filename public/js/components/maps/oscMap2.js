'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OscMap2 = (function (_React$Component) {
    _inherits(OscMap2, _React$Component);

    function OscMap2(props) {
        _classCallCheck(this, OscMap2);

        _get(Object.getPrototypeOf(OscMap2.prototype), 'constructor', this).call(this, props);
        this.state = {
            mymap: null,
            data: null,
            legend: [],
            indexLegend: 1,
            lastIndexLegend: 0,
            carregado: false,
            colors: ['black', 'orange', 'blue', 'green'],
            oscs: null,
            oscsGeral: null,
            matrizOscs: null,
            colorsChart: ['#AC74AC', '#4DA6FF', '#7568EC', '#EC7F46', '#E01747', '#D9A300', '#226FB3', '#EDB621', '#698F36'],
            selectedOscs: ['fixo']
        };

        //this.loadMap = this.loadMap.bind(this);
        //this.refreshMarkersOscs = this.refreshMarkersOscs.bind(this);
    }

    _createClass(OscMap2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ mymap: L.map(this.props.mapId, {
                    fullscreenControl: true,
                    fullscreenControlOptions: { // optional
                        title: "Show me the fullscreen !",
                        titleCancel: "Exit fullscreen mode"
                    }
                }).setView([-14, -52], 4) }, function () {
                //this.loadMap();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {

            //console.log(this.state);

            if (this.state.data != props.data) {
                this.setState({ data: props.data }, function () {

                    if (this.state.data) {
                        this.loadMap();
                    }
                });
            }
        }
    }, {
        key: 'loadMap',
        value: function loadMap() {

            var map = this.state.mymap;
            //console.log(map);

            var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18
            }).addTo(map);

            map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

            this.setState({ mymap: map }, function () {
                if (this.state.data.regiao) {
                    this.refreshMarkersOscs(this.state.data.regiao);
                }
            });
        }
    }, {
        key: 'refreshMarkersOscs',
        value: function refreshMarkersOscs(data) {

            //console.log(data);

            var map = this.state.mymap;
            //let markers = L.layerGroup();

            var markers = L.markerClusterGroup();

            /* let linhas = {};
               for(let k in this.state.data[0]){
                 linhas[k] = L.markerClusterGroup();
             }*/

            ///////////////ICONE/////////////////
            var LeafIcon = L.Icon.extend({
                options: {
                    iconSize: [40, 44],
                    iconAnchor: [20, 43]
                }
            });
            ///////////////ICONE/////////////////
            var pontos = [];

            //let matrizOscs = [];

            var overlayMaps = {};

            var tiposOscs = [];

            for (var osc in data) {

                var existe = false;
            }

            for (var k in data.regiao) {

                var markerOscs = L.icon({
                    //iconUrl: 'imagens/oscs_icones/'+data[0][k]['properties'].icone,
                    iconUrl: 'img/ods/01.png',
                    //iconUrl: '<i class="fas fa-map-marker-alt"/>',
                    iconSize: [38, 38]
                });

                //overlayMaps["<img src='imagens/oscs/"+data[0][k]['properties'].imagem+"' width='40' alt='"+k+"' title='"+k+"'> "] = linhas[k];
                overlayMaps["<img src='img/ods/02.png' width='40' alt='" + k + "' title='" + k + "'> "];
                //overlayMaps["<i class='fas fa-user'/>"];

                L.geoJson(data, {
                    pointToLayer: (function (data) {
                        console.log(data);
                        return L.marker([data.regiao.geo_lat_centroid_regiao, data.regiao.geo_lng_centroid_regiao], {
                            icon: markerOscs
                        });
                    }).bind(this),
                    onEachFeature: function onEachFeature(f, l) {
                        l.bindPopup('<div style="text-align:center; width: 100%; border-bottom: solid 1px #CCCCCC; padding-bottom: 5px; margin-bottom: 5px;"><b>' + JSON.stringify(f.properties.tx_nome_regiao, null, ' ').replace(/[\{\}"]/g, '') + '</b></div>' + 'Velocidade: ' + f.properties.tx_nome_regiao + '<br/>' + 'Sentido Duplo: ' + f.properties.tx_sigla_regiao + '<br/>' + 'Longitude: ' + f.geometry.geo_lat_centroid_regiao + '<br/>' + 'Latitude: ' + f.geometry.geo_lng_centroid_regiao + '<br/><br/>');
                    }
                }).addTo(map);
                //}).addTo(linhas[k])

                /*if(this.state.selectedOscs.includes(k)){
                    linhas[k].addTo(map);
                }
                */
                //console.log(data[0][k].properties);

                /*oscs.titles.push(data[0][k].properties.titulo);
                oscs.values.push(data[0][k].features.length);*/

                /*oscs.titles.push(data[0].tx_nome_regiao);
                oscs.values.push(data[0].length);
                        for(let i in data[0][k]['features']){
                    pontos.push([data[0][k]["features"][i]["geometry"]["coordinates"][1], data[0][k]["features"][i]["geometry"]["coordinates"][0]]);
                }*/
            }

            var oscsGeral = {
                titles: [],
                values: []
            };

            /*for(let k in data[1]) {
                  //console.log(data[1][k].velocidade);
                  oscsGeral.titles.push(data[1][k].velocidade);
                oscsGeral.values.push(data[1][k].qtd);
              }*/

            //console.log(oscsGeral);

            L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

            //let bounds = new L.LatLngBounds(pontos);

            /*let bounds = new L.LatLngBounds(pontos);
            map.fitBounds(bounds);*/
            //////////////MARKERS///////////////

            //this.setState({mymap: map, markers: markers, oscs: oscs, oscsGeral: oscsGeral, matrizOscs: matrizOscs});
            this.setState({ mymap: map, markers: markers });
        }
    }, {
        key: 'render',
        value: function render() {

            var icones = null;
            var tabela = null;
            var rows = null;

            /*if(this.state.data){
                  rows = this.state.data[1].map(function(item, index){
                    return (
                        <tr key={'lista'+index}>
                            <td>
                                <h5><strong>{index+1}</strong></h5>
                            </td>
                            <td>
                                <p>{item.velocidade} km</p>
                            </td>
                            <td>
                                <p>{item.qtd}</p>
                            </td>
                        </tr>
                    );
                });
                  tabela =  (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Limite regulamentado</th>
                            <th>Quantidade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                );
              }*/

            return React.createElement(
                'div',
                null,
                React.createElement('div', { id: this.props.mapId, style: { height: '600px' } }),
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12 text-center' },
                            React.createElement('div', { id: 'map' })
                        )
                    ),
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12 text-center' },
                            React.createElement(
                                'h3',
                                null,
                                'Tipo de oscs'
                            ),
                            React.createElement('hr', null),
                            React.createElement('br', null)
                        )
                    ),
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12 text-center' },
                            React.createElement(
                                'h3',
                                null,
                                'Dados por velocidade'
                            ),
                            React.createElement('hr', null),
                            React.createElement('br', null)
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'text-center' },
                        React.createElement(
                            'h2',
                            null,
                            'Tabela'
                        ),
                        React.createElement(
                            'p',
                            null,
                            'Nessa área você encontra dados consolidados dos oscs'
                        ),
                        React.createElement('hr', null)
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'table-responsive-sm' },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'tab-content', id: 'v-pills-tabContent' },
                                            tabela
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return OscMap2;
})(React.Component);