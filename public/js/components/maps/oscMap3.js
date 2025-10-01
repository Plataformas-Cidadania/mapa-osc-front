'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OscMap = (function (_React$Component) {
    _inherits(OscMap, _React$Component);

    function OscMap(props) {
        _classCallCheck(this, OscMap);

        _get(Object.getPrototypeOf(OscMap.prototype), 'constructor', this).call(this, props);
        //console.log(props);
        this.state = {
            processingOsc: false,
            processingOscIdhUfs: false,
            processingOscUfs: false,
            processingOscPontos: false,
            processingHeatMap: false,
            processingList: false,
            processingExportacao: false,
            textoProcessingExportacao: "",
            mapId: props.mapId,
            firstTimeLoad: true,
            origem: props.origem,
            regioes: [],
            ufs: [],
            data: [],
            dataOscCluster: [],
            dataTerritorio: [],
            dataOscUf: [],
            dataIdhUf: [],
            dataIDHM: [],
            dataOsc: null,
            dataCalor: [],
            dataOscList: [],
            paginaOscList: 0,
            totalOscList: 0,
            dataExportacao: [],
            logos: [],
            labelsPesquisaAvancada: {
                //Dados Gerais
                'tx_razao_social_osc': 'Nome da Osc',
                'tx_nome_regiao': 'Regiao',
                'tx_nome_fantasia_osc': 'Nome Fantasia',
                'tx_nome_uf': 'UF',
                'cd_identificador_osc': 'CNPJ',
                'cd_situacao_imovel_osc': '',
                'anoFundacaoMIN': 'Ano fundação maior que',
                'anoFundacaoMAX': 'menor que',
                'tx_nome_municipio': 'Municipio',
                'cd_objetivo_osc': 'Objetivo OSC',
                'cd_meta_osc': 'Meta Osc',
                'cd_regiao': null,
                'cd_uf': null,
                'cd_municipio': null,
                'naturezaJuridica_associacaoPrivada': 'Associação Privada',
                'naturezaJuridica_fundacaoPrivada': 'Fundação Privada',
                'naturezaJuridica_organizacaoReligiosa': 'Organização Religiosa',
                'naturezaJuridica_organizacaoSocial': 'Organização Social',
                'naturezaJuridica_outra': 'Jurídica Outra'
            },
            //year:props.year,
            //month:props.month,
            //filters: props.filters,
            pais: 'BRA', //utilizado para o mapa de calor
            //tipoTerritorioSelecionado: props.tipoTerritorioSelecionado,
            codigoTerritorioSelecionado: props.codigoTerritorioSelecionado,
            //tipoTerritorioAgrupamento: props.tipoTerritorioAgrupamento,

            mapElements: {
                map: null
            },
            tileLayerMap: 1, //1 - Básico, 2 - Contraste, 3 - Satélite
            tilesLayers: {
                basic: null,
                contrast: null,
                satellite: null
            },
            zoom: {
                1: 4, //territorio 1 usa o zoom 4
                2: 5,
                3: 7,
                4: 8
            },
            classMarker: {
                1: 'marker',
                2: 'marker',
                3: 'marker2',
                4: 'marker2'
            },
            loadData: {
                1: (function () {
                    //console.log('aaa');
                    this.loadDataTotalPorTerritorio();
                }).bind(this),
                2: (function () {
                    //console.log('bbb');
                    //this.loadDataTotalPorTerritorio();
                    //this.loadDataUf();
                    this.loadTerritorioUf();
                }).bind(this),
                3: (function () {
                    //console.log('ccc');
                    this.loadDataPontosPorTerritorio();
                }).bind(this),
                4: (function () {
                    //console.log('ddd');
                    this.loadDataPontosPorTerritorio();
                }).bind(this)
            }
        };

        this.loadMap = this.loadMap.bind(this);
        //this.loadDataTotalPorTerritorio = this.loadDataTotalPorTerritorio.bind(this);
        this.loadDataPontosPorTerritorio = this.loadDataPontosPorTerritorio.bind(this);
        this.loadDataUf = this.loadDataUf.bind(this);
        this.loadOscList = this.loadOscList.bind(this);
        this.getLogos = this.getLogos.bind(this);
        this.setPageOscList = this.setPageOscList.bind(this);
        this.nextPaceOscList = this.nextPaceOscList.bind(this);
        this.previousPaceOscList = this.previousPaceOscList.bind(this);
        //this.loadAllUfs = this.loadAllUfs.bind(this);
        this.populateMap = this.populateMap.bind(this);
        this.areaOscMap = this.areaOscMap.bind(this);
        this.areaIdhMap = this.areaIdhMap.bind(this);
        this.idhLegend = this.idhLegend.bind(this);
        this.populateMapCluster = this.populateMapCluster.bind(this);
        this.heatMap = this.heatMap.bind(this);
        this.removeHeatMap = this.removeHeatMap.bind(this);
        this.addHeatMap = this.addHeatMap.bind(this);
        this.changeTileLayer = this.changeTileLayer.bind(this);
        this.removeMarkersGroup = this.removeMarkersGroup.bind(this);
        this.addMarkersGroup = this.addMarkersGroup.bind(this);

        //this.itensPesquisadosAvancada = this.itensPesquisadosAvancada.bind(this);
        this.exportar = this.exportar.bind(this);
        this.gerarCsvExportacao = this.gerarCsvExportacao.bind(this);

        this.highlightFeature = this.highlightFeature.bind(this);
        //this.resetHighlight = this.resetHighlight.bind(this);
        this.zoomToFeature = this.zoomToFeature.bind(this);
        //this.onEachFeature = this.onEachFeature.bind(this);
    }

    _createClass(OscMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadFirstMap();
            this.loadMap();
            this.loadOscList();
            //this.loadAllUfs();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            //console.log('will receve props');
            //console.log(props.data);
            if (props.data != this.state.data || props.origem != this.state.origem || props.dataTerritorio != this.state.dataTerritorio || props.dataOscUf != this.state.dataOscUf || props.dataIdhUf != this.state.dataIdhUf || props.processingOsc != this.state.processingOsc || props.processingOscIdhUfs != this.state.processingOscIdhUfs) {
                //console.log(props.data);
                this.setState({
                    data: props.data,
                    origem: props.origem,
                    //dataTerritorio: props.dataTerritorio,
                    dataOscUf: props.dataOscUf,
                    dataIdhUf: props.dataIdhUf,
                    processingOsc: props.processingOsc,
                    processingOscIdhUfs: props.processingOscIdhUfs
                }, function () {
                    //if(this.state.data && this.state.dataOscUf && this.state.dataIdhUf){
                    if (this.state.dataTerritorio && this.state.dataOscUf && this.state.dataIdhUf) {
                        var osc = true;
                        if (parseInt(this.state.origem) <= 5) {
                            this.loadTerritorio();
                            osc = false;
                        }
                        if (parseInt(this.state.origem) >= 11 && parseInt(this.state.origem) <= 53) {
                            this.loadTerritorioUf();
                            osc = false;
                        }
                        if (parseInt(this.state.origem) > 53) {
                            this.loadDataPontosPorMunicipio();
                            osc = false;
                        }
                        if (this.state.origem === 'busca-avancada') {
                            this.loadDataPontosOscPesquisaAvancada();
                            osc = false;
                        }
                        if (osc) {
                            this.loadDataPontosOscPesquisa();
                        }
                        //this.populateMap();
                        //this.areaOscMap();
                        this.areaIdhMap();
                    }
                });
            }

            /*if(props.filter==1 || (this.state.firstTimeLoad===true && props.start!=null && props.end != null)){
                this.setState({
                    firstTimeLoad: false,
                    types: props.types,
                    typesAccident: props.typesAccident,
                    genders: props.genders,
                    tipoTerritorioSelecionado: props.tipoTerritorioAgrupamento,
                    codigoTerritorioSelecionado: props.codigoTerritorioSelecionado,
                    tipoTerritorioAgrupamento: props.tipoTerritorioAgrupamento,
                    start: props.start,
                    end: props.end,
                    filters: props.filters
                }, function(){
                    //this.mountPer();
                    //console.log(this.state.start, this.state.end);
                    this.loadMap();
                    this.loadDataTotalPorTerritorio();
                });
            }*/
        }
    }, {
        key: 'makeInfoOsc',
        value: function makeInfoOsc() {
            //console.log('make info');
            var mapElements = this.state.mapElements;

            this.setState({ infoOsc: L.control() }, function () {
                this.state.infoOsc.onAdd = function () {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    this._div.id = 'infoOsc';
                    this._div.style.display = 'block';
                    return this._div;
                };

                // method that we will use to update the control based on feature properties passed
                var _this = this;
                this.state.infoOsc.update = function (props, tipo) {
                    //console.log('info', props);

                    this._div.innerHTML = props ? '<b>' + props.nome + '</b><br />' + tipo + ': ' + props.total : "Passe o mouse sobre na região.";
                };
                this.state.infoOsc.addTo(mapElements.map);
                this.setState({ mapElements: mapElements });
            });
        }
    }, {
        key: 'makeInfo',
        value: function makeInfo() {
            //console.log('make info');
            var mapElements = this.state.mapElements;

            this.setState({ info: L.control() }, function () {
                this.state.info.onAdd = function () {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    this._div.id = 'infoIdh';
                    this._div.style.display = 'none';
                    return this._div;
                };

                // method that we will use to update the control based on feature properties passed
                var _this = this;
                this.state.info.update = function (props, tipo) {
                    //console.log('info', props);
                    var nome = '';
                    if (props) {
                        nome = tipo === 'IDHM' ? props.nm_municipio : props.nm_uf;
                    }
                    this._div.innerHTML = props ? '<b>' + nome + '</b><br />' + tipo + ': ' + formatNumber(props.nr_valor, 2, ',', '.') : "Passe o mouse sobre na região";
                };
                this.state.info.addTo(mapElements.map);
                this.setState({ mapElements: mapElements });
            });
        }
    }, {
        key: 'loadFirstMap',
        value: function loadFirstMap() {

            var mapElements = this.state.mapElements;

            var basic = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

            var contrast = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

            var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 17,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            });

            var tilesLayers = this.state.tilesLayers;
            tilesLayers.basic = basic;
            tilesLayers.contrast = contrast;
            tilesLayers.satellite = satellite;
            this.setState({ tilesLayers: tilesLayers });

            var latlng = L.latLng(-13.70, -55.65);

            var tile = null;
            if (this.state.tileLayerMap == 1) {
                tile = basic;
            }
            if (this.state.tileLayerMap == 2) {
                tile = contrast;
            }
            if (this.state.tileLayerMap == 3) {
                tile = satellite;
            }

            mapElements.map = L.map(this.state.mapId, {
                center: latlng,
                zoom: 4,
                layers: [tile],
                fullscreenControl: true,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen !",
                    titleCancel: "Exit fullscreen mode"
                }
            });

            var thisReact = this;

            //////////////////DIV CONTAINER DOS CONTROLERS///////////////////////////////////
            //pega o div externo ao mapa
            var controlsMap = document.getElementById('controls-map');

            mapElements.controlContainer = L.Control.extend({
                options: {
                    position: 'topright'
                },
                onAdd: function onAdd() {
                    return L.DomUtil.get('controls-map');
                }
            }).bind(thisReact);
            mapElements.map.addControl(new mapElements.controlContainer());

            var controlsMap2 = document.getElementById('controls-map2');

            mapElements.controlContainer = L.Control.extend({
                options: {
                    position: 'bottomleft'
                },
                onAdd: function onAdd() {
                    return L.DomUtil.get('controls-map2');
                }
            }).bind(thisReact);
            mapElements.map.addControl(new mapElements.controlContainer());
            ///////////////////////////////////////////////////////////////////////////////

            mapElements.controlBasicMap = this.controlBasicMap(thisReact);
            var controlBasicMapObj = new mapElements.controlBasicMap();
            mapElements.map.addControl(controlBasicMapObj);
            //pega o div do controle
            var divControlBasicMap = controlBasicMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap2.appendChild(divControlBasicMap);

            mapElements.controlContrastMap = this.controlContrastMap(thisReact);
            var controlContrastMapObj = new mapElements.controlContrastMap();
            mapElements.map.addControl(controlContrastMapObj);
            //pega o div do controle
            var divControlContrastMap = controlContrastMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap2.appendChild(divControlContrastMap);

            mapElements.controlSatelliteMap = this.controlSatelliteMap(thisReact);
            var controlSatelliteMapObj = new mapElements.controlSatelliteMap();
            mapElements.map.addControl(controlSatelliteMapObj);
            //pega o div do controle
            var divControlSatelliteMap = controlSatelliteMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap2.appendChild(divControlSatelliteMap);

            ///////////////FIM CONTROLERS DOS MAPAS/////////////////////////////////////////

            //////////////////////////SEPARADOR/////////////////////////////////////////////
            mapElements.controlSeparator = L.Control.extend({
                options: {
                    position: 'topright'
                },
                onAdd: function onAdd() {
                    var container = L.DomUtil.create('div');
                    container.style.marginRight = '0';
                    container.style.borderBottom = 'solid 1px #e8e8e8';
                    container.style.width = '100%';
                    container.innerHTML = ' ';
                    return container;
                }
            }).bind(thisReact);
            var controlSeparatorObj = new mapElements.controlSeparator();
            mapElements.map.addControl(controlSeparatorObj);
            //pega o div do controle
            var divControlSeparator = controlSeparatorObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlSeparator);
            ////////////////////////////FIM//////////////////////////////////////////////////

            ////////////////CONTROLERS DOS LAYERS////////////////////////////////////////////
            //Area OSC
            mapElements.controlAreaOscMap = this.controlAreaOsc(thisReact);
            var controlAreaOscMapObj = new mapElements.controlAreaOscMap();
            mapElements.map.addControl(controlAreaOscMapObj);
            //pega o div do controle
            var divControlAreaOscMap = controlAreaOscMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlAreaOscMap);

            //Area IDH
            mapElements.controlAreaIdhMap = this.controlAreaIdh(thisReact);
            var controlAreaIdhMapObj = new mapElements.controlAreaIdhMap();
            mapElements.map.addControl(controlAreaIdhMapObj);
            //pega o div do controle
            var divControlAreaIdhMap = controlAreaIdhMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlAreaIdhMap);

            //Clusters/Markers
            mapElements.controlClusterMap = this.controlMarker(thisReact);
            var controlMarkerMapObj = new mapElements.controlClusterMap();
            mapElements.map.addControl(controlMarkerMapObj);
            //pega o div do controle
            var divControlMarkerMap = controlMarkerMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlMarkerMap);

            //HeatMap
            /*mapElements.controlHeatMap = this.controlHeatMap(thisReact);
            let controlHeatMapObj = new mapElements.controlHeatMap();
            mapElements.map.addControl(controlHeatMapObj);
            //pega o div do controle
            let divControlHeatMap = controlHeatMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlHeatMap);*/
            ////////////////FIM CONTROLERS DOS LAYERS////////////////////////////////////////////

            ///////////////CONTROLE HABILITA/DESABILITA ZOOM/////////////////////////////////////
            //Clusters/Markers
            mapElements.controlZoomMap = this.controlZoomMap(thisReact);
            var controlZoomMapObj = new mapElements.controlZoomMap();
            mapElements.map.addControl(controlZoomMapObj);
            //pega o div do controle
            var divControlZoomMap = controlZoomMapObj.getContainer();
            //coloca o div do controle no div externo
            controlsMap.appendChild(divControlZoomMap);
            /////////////////////////////////////////////////////////////////////////////////////

            //DESABILITA O ZOOM PELO SCHROLL DO MOUSE
            mapElements.map.scrollWheelZoom.disable();

            this.setState({ mapElements: mapElements }, function () {
                this.makeInfoOsc();
                this.makeInfo();
                //this.loadMap();
            });
        }
    }, {
        key: 'controlBasicMap',
        value: function controlBasicMap(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright'
                },
                onAdd: function onAdd() {
                    var container = L.DomUtil.create('div');
                    container.onclick = function () {
                        thisReact.setState({ tileLayerMap: 1 });
                        thisReact.changeTileLayer(thisReact.state.tilesLayers.basic);
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    };

                    container.id = 'controlBasic';
                    container.className = 'control-data-types leaflet-control';
                    if (thisReact.state.tileLayerMap == 1) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.style.clear = 'none';
                    container.innerHTML = '<img src="img/leaflet/controls/basic.png"  title="Mapa Básico">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'controlContrastMap',
        value: function controlContrastMap(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: false
                },
                onAdd: function onAdd() {
                    var container = L.DomUtil.create('div');
                    container.onclick = function () {
                        thisReact.setState({ tileLayerMap: 2 });
                        thisReact.changeTileLayer(thisReact.state.tilesLayers.contrast);
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    };

                    container.id = 'controlContrast';
                    container.className = 'control-data-types leaflet-control';
                    if (thisReact.state.tileLayerMap == 2) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.style.clear = 'none';
                    container.innerHTML = '<img src="img/leaflet/controls/contrast.png"  title="Contraste">';

                    return container;
                }
            });
        }
    }, {
        key: 'controlSatelliteMap',
        value: function controlSatelliteMap(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: false
                },
                onAdd: function onAdd() {
                    var container = L.DomUtil.create('div');
                    container.onclick = function () {
                        thisReact.setState({ tileLayerMap: 3 });
                        thisReact.changeTileLayer(thisReact.state.tilesLayers.satellite);
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    };

                    container.id = 'controlSatellite';
                    container.className = 'control-data-types leaflet-control';
                    if (thisReact.state.tileLayerMap == 3) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.style.clear = 'none';
                    /*container.style.borderBottom = 'solid 1px #ccc';*/
                    container.innerHTML = '<img src="img/leaflet/controls/satellite.png" title="Satélite">';

                    return container;
                }
            });
        }
    }, {
        key: 'controlAreaOsc',
        value: function controlAreaOsc(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: true
                },
                onAdd: function onAdd() {
                    var options = this.options;
                    //console.log(options.check);
                    var container = L.DomUtil.create('div');
                    container.id = "ctrlAreaOsc";
                    container.onclick = (function () {
                        //console.log(options.check);
                        options.check = !options.check;
                        container.className = 'control-data-types leaflet-control check-control-data-types';
                        thisReact.removeAreaIdhGroup();
                        thisReact.addAreaOscGroup();
                        document.getElementById('ctrlAreaIdh').className = "control-data-types leaflet-control";
                        //console.log(container);
                    }).bind(options, thisReact);

                    container.className = 'control-data-types leaflet-control';
                    if (options.check) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.innerHTML = '<img src="img/leaflet/controls/areaOsc.png" title="OSC">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'controlAreaIdh',
        value: function controlAreaIdh(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: false
                },
                onAdd: function onAdd() {
                    var options = this.options;
                    //console.log(options.check);
                    var container = L.DomUtil.create('div');
                    container.id = "ctrlAreaIdh";
                    container.onclick = (function () {
                        //console.log(options.check);
                        //console.log("CLICK CONTROL AREA IDH");
                        options.check = !options.check;
                        container.className = 'control-data-types leaflet-control check-control-data-types';
                        thisReact.removeAreaOscGroup();
                        thisReact.addAreaIdhGroup();
                        document.getElementById('ctrlAreaOsc').className = "control-data-types leaflet-control";
                    }).bind(options, thisReact);

                    container.className = 'control-data-types leaflet-control';
                    if (options.check) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.innerHTML = '<img src="img/leaflet/controls/areaIdh.png" title="IDH">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'controlMarker',
        value: function controlMarker(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: true
                },
                onAdd: function onAdd() {
                    var options = this.options;
                    //console.log(options.check);
                    var container = L.DomUtil.create('div');
                    container.onclick = (function () {
                        //console.log(options.check);
                        options.check = !options.check;
                        container.className = 'control-data-types leaflet-control';
                        //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-off.png">';
                        thisReact.removeMarkersGroup();
                        if (options.check) {
                            thisReact.addMarkersGroup();
                            container.className = 'control-data-types check-control-data-types leaflet-control';
                            //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-on.png">';
                        }
                    }).bind(options, thisReact);

                    container.className = 'control-data-types leaflet-control';
                    if (options.check) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.innerHTML = '<img src="img/leaflet/controls/marker.png" title="Marcadores">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'controlHeatMap',
        value: function controlHeatMap(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: false,
                    heatmapLoaded: false
                },
                onAdd: function onAdd() {

                    var options = this.options;
                    //console.log(options.check);
                    var container = L.DomUtil.create('div', 'control-data-types');
                    container.onclick = (function () {

                        /*if(thisReact.state.dataCalor.length === 0){
                            thisReact.loadDataHeatMap();
                        }*/

                        //console.log(options.check);
                        options.check = !options.check;
                        container.className = 'control-data-types leaflet-control';

                        //verifica se o mapa já foi carregado antes.
                        if (options.heatmapLoaded && !options.check) {
                            thisReact.removeHeatMap();
                        }

                        if (options.heatmapLoaded && options.check) {
                            thisReact.removeAreaOscGroup();
                            thisReact.removeAreaIdhGroup();
                            thisReact.addHeatMap();
                            container.className = 'control-data-types check-control-data-types leaflet-control';
                        }

                        if (!options.heatmapLoaded && options.check) {
                            thisReact.removeAreaOscGroup();
                            thisReact.removeAreaIdhGroup();
                            thisReact.loadDataHeatMap();
                            options.heatmapLoaded = true;
                            container.className = 'control-data-types check-control-data-types leaflet-control';
                        }
                    }).bind(options, thisReact);

                    container.innerHTML = '<img src="img/leaflet/controls/heatmap.png" title="Mapa de Calor">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'controlZoomMap',
        value: function controlZoomMap(thisReact) {
            return L.Control.extend({
                options: {
                    position: 'topright',
                    check: false
                },
                onAdd: function onAdd() {
                    var options = this.options;
                    //console.log('zoom', options.check);
                    var container = L.DomUtil.create('div');
                    container.onclick = (function () {
                        options.check = !options.check;
                        //console.log(options.check);
                        container.className = 'control-data-types leaflet-control';
                        //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-off.png">';
                        thisReact.disableZoomMap();
                        if (options.check) {
                            thisReact.enableZoomMap();
                            container.className = 'control-data-types check-control-data-types leaflet-control';
                            //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-on.png">';
                        }
                    }).bind(options, thisReact);

                    container.className = 'control-data-types leaflet-control';
                    if (options.check) {
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    container.style.cursor = 'pointer';
                    container.innerHTML = '<img src="img/leaflet/controls/zoom.png" title="Marcadores">';

                    return container;
                }
            }).bind(thisReact);
        }
    }, {
        key: 'loadMap',
        value: function loadMap() {

            var mapElements = this.state.mapElements;

            mapElements.map.setZoom(4);

            mapElements.map.eachLayer((function (layer) {
                //if not the tile layer
                if (typeof layer._url === "undefined") {
                    mapElements.map.removeLayer(layer);
                }
            }).bind(this));

            //mapElements.map.removeControl(mapElements.controlSatelliteMap);

            mapElements.markersGroup = L.layerGroup();
            mapElements.map.addLayer(mapElements.markersGroup);

            mapElements.areaIdhGroup = L.layerGroup();
            mapElements.map.addLayer(mapElements.areaIdhGroup);

            mapElements.areaIdhMGroup = L.layerGroup();
            mapElements.map.addLayer(mapElements.areaIdhMGroup);

            mapElements.areaOscGroup = L.layerGroup();
            mapElements.map.addLayer(mapElements.areaOscGroup);

            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'setPageOscList',
        value: function setPageOscList(page) {
            this.setState({ paginaOscList: page }, function () {
                this.loadOscList();
            });
        }
    }, {
        key: 'nextPaceOscList',
        value: function nextPaceOscList() {
            this.setPageOscList(this.state.pageOscList + 1);
        }
    }, {
        key: 'previousPaceOscList',
        value: function previousPaceOscList() {
            this.setPageOscList(this.state.pageOscList - 1);
        }
    }, {
        key: 'loadOscList',
        value: function loadOscList() {
            var method = 'GET'; //Será usado POST no caso da pesquisa avançada.
            var data = {}; //Será usado busca no caso da pesquisa avançada.
            var rota = 'lista_osc/' + this.state.paginaOscList;
            var origem = parseInt(this.state.origem);
            var pesquisaPorOsc = false;
            var buscaAvancada = false;
            if (origem === 0) {
                rota = getBaseUrl2 + 'lista_osc/' + this.state.paginaOscList;
            } else if (origem >= 1 && origem <= 5) {
                rota = getBaseUrl2 + 'lista_osc/regiao/' + origem + '/' + this.state.paginaOscList;
            } else if (origem >= 11 && origem <= 53) {
                rota = getBaseUrl2 + 'lista_osc/estado/' + origem + '/' + this.state.paginaOscList;
            } else if (origem > 53) {
                rota = getBaseUrl2 + 'lista_osc/municipio/' + origem + '/' + this.state.paginaOscList;
            } else if (this.state.origem === 'busca-avancada') {
                method = 'POST';
                rota = 'osc/busca_avancada/lista';
                data = {
                    busca: this.props.strJson,
                    pagina: this.state.paginaOscList
                };
                buscaAvancada = true;
            } else {
                pesquisaPorOsc = true;
                var origemOsc = this.state.origem;
                var avancado = '{"avancado":{"dadosGerais":{"tx_razao_social_osc":"' + origemOsc + '"}}}';
                //rota = getBaseUrl2 + 'osc/busca_avancada/lista/10/'+this.state.paginaOscList+'/'+avancado;
                method = 'POST';
                rota = 'osc/busca_avancada/lista';
                data = {
                    busca: avancado,
                    pagina: this.state.paginaOscList
                };
            }
            this.setState({ processingList: true }, function () {
                $.ajax({
                    method: method,
                    url: rota,
                    data: data,
                    cache: false,
                    success: (function (data) {
                        if (pesquisaPorOsc || buscaAvancada) {
                            data = {
                                lista: data,
                                total: data.length
                            };
                        }
                        var dadosState = { dataOscList: data.lista, processingList: false };
                        if (this.state.origem !== 'busca-avancada') {
                            dadosState.totalOscList = data.total;
                        }
                        this.setState(dadosState, function () {
                            console.log('loadOscList', this.state.dataOscList);
                            this.getLogos();
                        });
                        //this.populateMap();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ processingList: false });
                    }).bind(this)

                });
            });
        }
    }, {
        key: 'getLogos',
        value: function getLogos() {
            var _this3 = this;

            var logos = this.state.logos;

            var _loop = function (i) {
                if (i > 30) {
                    return 'break';
                }
                var id_osc = _this3.state.dataOscList[i].id_osc;
                //console.log(id_osc);
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + 'osc/logo/' + id_osc,
                    processData: false, //NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
                    contentType: false, //NECESSÁRIO PARA O UPLOAD DE ARQUIVOS
                    cache: false,
                    success: (function (data) {
                        //console.log(data);
                        if (typeof data === 'string') {
                            logos[id_osc] = data;
                        }
                        this.setState({ logos: logos });
                        //this.setState({logo: data});
                    }).bind(_this3),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(_this3)
                });
            };

            for (var i in this.state.dataOscList) {
                var _ret = _loop(i);

                if (_ret === 'break') break;
            }
        }
    }, {
        key: 'loadDataUf',
        value: function loadDataUf() {
            var _this = this;
            this.setState({ processingOscUfs: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: 'get-osc/2/' + this.state.codigoTerritorioSelecionado, //tipo 2 região ao ser clicado irá carregas as ufs
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log(data);
                        _this.setState({ data: data, processingOscUfs: false });
                        _this.populateMap();
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }
    }, {
        key: 'loadTerritorio',
        value: function loadTerritorio() {
            var _this = this;
            var rota = 'geo/regioes';
            if (parseInt(this.state.origem) > 0) {
                rota = 'geo/elem/' + this.state.origem;
            }
            this.setState({ processingOsc: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + rota,
                    //url: 'geo/regioes',
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log('loadTerritorio data', data);
                        var dataTemp = [];
                        if (parseInt(_this.state.origem) > 0) {
                            dataTemp[0] = data;
                            data = dataTemp;
                        }
                        var territorio = [];
                        //territorio.tipo_territorio = _this.state.territory+1
                        territorio.tipo_territorio = 2;
                        territorio.territorios = [];
                        //transformando objeto em array para poder usar o método .map()
                        for (var i in data) {
                            territorio.territorios.push(data[i]);
                        }
                        //console.log('loadTerritorio territorio',territorio);
                        _this.setState({ dataTerritorio: territorio, processingOsc: false }, function () {
                            _this.populateMap();
                        });
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }
    }, {
        key: 'loadTerritorioUf',
        value: function loadTerritorioUf() {
            var _this = this;
            var rota = "geo/estados/regiao/" + this.state.codigoTerritorioSelecionado;
            if (parseInt(this.state.origem) >= 11 && parseInt(this.state.origem) <= 53) {
                rota = 'geo/elem/' + this.state.origem;
            }
            this.setState({ processingOscUfs: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + rota,
                    //url: getBaseUrl2+"geo/estados/regiao/"+this.state.codigoTerritorioSelecionado,
                    //url: "geo/estados/regiao/"+this.state.codigoTerritorioSelecionado,
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log('loadTerritorioUf', data);
                        var dataTemp = [];
                        if (parseInt(_this.state.origem) > 0) {
                            dataTemp[0] = data;
                            data = dataTemp;
                        }
                        var territorio = [];
                        //territorio.tipo_territorio = _this.state.territory+1
                        territorio.tipo_territorio = 3;
                        territorio.territorios = [];
                        //transformando objeto em array para poder usar o método .map()
                        for (var i in data) {
                            territorio.territorios.push(data[i]);
                        }
                        //console.log(territorio);
                        _this.setState({ dataTerritorio: territorio, processingOscUfs: false }, function () {
                            _this.populateMap();
                        });
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }
    }, {
        key: 'loadDataIDHM',
        value: function loadDataIDHM(uf) {
            var _this = this;
            var baseUrl = getBaseUrl;
            baseUrl = 'http://mapaosc.ipea.gov.br/api/';
            this.setState({ processingOscUfs: true }, function () {
                $.ajax({
                    method: 'GET',
                    //url: baseUrl + 'analises/idhgeo/' + uf,
                    url: 'get-idhm/' + uf,
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log(data);
                        _this.setState({ dataIDHM: data.idh, processingOscUfs: false }, function () {
                            _this.areaIdhM();
                        });
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }
    }, {
        key: 'loadDataHeatMap',
        value: function loadDataHeatMap() {
            var _this = this;
            this.setState({ processingHeatMap: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: 'get-all-oscs',
                    data: {},
                    cache: false,
                    success: function success(data) {
                        //console.log(data);
                        _this.setState({ dataCalor: data, processingHeatMap: false });
                        _this.heatMap();
                    },
                    error: function error(xhr, status, err) {
                        console.error(status, err.toString());
                        _this.setState({ loading: false });
                    }

                });
            });
        }

        /*loadAllUfs(){
            let _this = this;
            $.ajax({
                method:'GET',
                url: 'get-osc-all-ufs/',
                data:{
                },
                cache: false,
                success: function(data) {
                    //console.log(data);
                    _this.setState({totalUfs: data});
                    //_this.populateMap();
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({loading: false});
                }
              });
        }*/

        /*loadDataTotalPorTerritorio(){
            //console.log('types', this.state.types);
            //console.log('períodos', this.state.start, this.state.end);
            if(!this.state.start || !this.state.end){
                return;
            }
              $.ajax({
                method:'POST',
                url: "total-transito-territorio",
                data:{
                    serie_id: this.props.id,
                    start: this.state.start,
                    end: this.state.end,
                    filters: this.state.filters,
                    types: this.state.types,
                    typesAccident: this.state.typesAccident,
                    genders: this.state.genders,
                    tipoTerritorioSelecionado: this.state.tipoTerritorioSelecionado, // tipo de territorio selecionado
                    codigoTerritorioSelecionado: this.state.codigoTerritorioSelecionado, //codigo do territorio, que pode ser codigo do país, regiao, uf, etc...
                    tipoTerritorioAgrupamento: this.state.tipoTerritorioAgrupamento // tipo de territorio em que os dados são agrupados
                },
                cache: false,
                success: function(data) {
                    //console.log(data);
                    this.setState({data: data.valores}, function(){
                        this.populateMap();
                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log('erro');
                }.bind(this)
            });
        }*/

    }, {
        key: 'loadDataPontosPorTerritorio',
        value: function loadDataPontosPorTerritorio() {
            this.setState({ processingOscPontos: true }, function () {
                $.ajax({
                    method: 'GET',
                    //url: 'get-osc/3/'+this.state.codigoTerritorioSelecionado,
                    //url: 'get-osc-uf/'+this.state.codigoTerritorioSelecionado,
                    url: getBaseUrl2 + 'geo/oscs/estado/' + this.state.codigoTerritorioSelecionado,
                    data: {},
                    cache: false,
                    success: (function (data) {
                        //console.log('loadPontosPorTerritorio', data);
                        //CONVERSÃO DA ESTRUTURA DO ARRAY NO FRONT////
                        var data2 = [];
                        //for ($data as $key => $item) {
                        for (var i in data) {
                            data2.push([data[i].id_osc, data[i].geo_lat, data[i].geo_lng]);
                            //array_push($data2, [$item->id_osc, $item->geo_lat, $item->geo_lng]);
                        }
                        data = data2;
                        //console.log(data);
                        /////////////////////////////////////////////
                        //this.setState({data: data, processingOscPontos: false}, function(){
                        this.setState({ dataOscCluster: data, processingOscPontos: false }, function () {
                            this.populateMapCluster();
                        });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('erro');
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'loadDataPontosPorMunicipio',
        value: function loadDataPontosPorMunicipio() {
            //console.log('CARREGAR PONTOS POR MUNICIPIO');
            this.setState({ processingOscPontos: true }, function () {
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + 'geo/oscs/municipio/' + this.state.origem,
                    data: {},
                    cache: false,
                    success: (function (data) {
                        //console.log('loadPontosPorTerritorio', data);
                        //CONVERSÃO DA ESTRUTURA DO ARRAY NO FRONT////
                        var data2 = [];
                        //for ($data as $key => $item) {
                        for (var i in data) {
                            data2.push([data[i].id_osc, data[i].geo_lat, data[i].geo_lng]);
                            //array_push($data2, [$item->id_osc, $item->geo_lat, $item->geo_lng]);
                        }
                        data = data2;
                        /////////////////////////////////////////////
                        //this.setState({data: data, processingOscPontos: false}, function(){
                        this.setState({ dataOscCluster: data, processingOscPontos: false }, function () {
                            this.populateMapCluster();
                        });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('erro');
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'loadDataPontosOscPesquisaAvancada',
        value: function loadDataPontosOscPesquisaAvancada() {
            //console.log('CARREGAR PONTOS OSC POR PESQUISA AVANCADA');
            //console.log(this.props.strJson);
            this.setState({ processingOscPontos: true }, function () {
                $.ajax({
                    //method:'GET',
                    method: 'POST',
                    //url: getBaseUrl2 + 'osc/busca_avancada/geo/10/0?avancado='+avancado,// O que estava sendo usado
                    url: 'osc/busca_avancada/geo',
                    data: {
                        busca: this.props.strJson
                    },
                    cache: false,
                    success: (function (data) {
                        if (!data) {
                            $('#modalAvancada').modal('show');
                            console.log('sem resultados');
                            this.setState({ processingOscPontos: false });
                            return;
                        }
                        //CONVERSÃO DA ESTRUTURA DO ARRAY NO FRONT////
                        var data2 = [];
                        data = JSON.parse(data);
                        /*for (let i in data) {
                            if(data[i].geo_lat && data[i].geo_lng){
                                data2.push([data[i].id_osc, data[i].geo_lat, data[i].geo_lng]);
                            }
                        }
                        data = data2;*/
                        /////////////////////////////////////////////
                        this.setState({ dataOscCluster: data, totalOscList: data.length, processingOscPontos: false }, function () {
                            this.populateMapCluster();
                        });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('erro');
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'loadDataPontosOscPesquisa',
        value: function loadDataPontosOscPesquisa() {
            //console.log('CARREGAR PONTOS OSC PESQUISADA');
            var origem = this.state.origem.replace(/ /g, "_");

            //let origem = this.state.origem;
            //let avancado = '{"dadosGerais":{"tx_razao_social_osc":"'+origem+'"}}';
            this.setState({ processingOscPontos: true }, function () {
                $.ajax({
                    method: 'GET',
                    //method:'POST',
                    //url: getBaseUrl2 + 'osc/busca_avancada/geo/10/0?avancado='+avancado,// O que estava sendo usado
                    //url: 'osc/busca_avancada/geo/10/0/'+avancado,//USANSO ROTA DO FRONT PRA TESTES LOCAIS
                    //url: getBaseUrl2 + 'osc/busca_avancada/geo/0/0',
                    //url: 'search/osc/geo/'+origem,
                    url: getBaseUrl2 + 'osc/busca/geo/' + origem,
                    data: {},
                    /*data:JSON.stringify({
                        avancado: {
                            dadosGerais: {
                                tx_razao_social_osc: origem
                            }
                        }
                    }),*/
                    cache: false,
                    success: (function (data) {
                        //console.log('loadPontosPorTerritorio', data);
                        //data = JSON.parse(data);
                        //CONVERSÃO DA ESTRUTURA DO ARRAY NO FRONT////
                        var data2 = [];
                        //for ($data as $key => $item) {
                        for (var i in data) {
                            //if(parseInt(i) > 0){ //ESSE IF PRECISAVA NA API ANTIGA PQ O INDICE ZERO VINHA COM OS DADOS VAZIOS
                            data2.push([data[i].id_osc, data[i].geo_lat, data[i].geo_lng]);
                            //}
                        }
                        data = data2;
                        /////////////////////////////////////////////
                        //this.setState({data: data, processingOscPontos: false}, function(){
                        this.setState({ dataOscCluster: data, processingOscPontos: false }, function () {
                            this.populateMapCluster();
                        });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('erro');
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'loadDataPontosPorPais',
        value: function loadDataPontosPorPais() {
            $.ajax({
                method: 'POST',
                url: "pontos-transito-pais",
                data: {
                    serie_id: this.props.id,
                    start: this.state.start,
                    end: this.state.end,
                    pais: this.state.pais,
                    types: this.state.types
                },
                cache: false,
                success: (function (data) {
                    //console.log('pais', data);
                    this.setState({ dataCalor: data.valores }, function () {
                        this.heatMap();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log('erro');
                }).bind(this)
            });
        }
    }, {
        key: 'gerarIntervalos',
        value: function gerarIntervalos(data) {
            //console.log('gerarIntevalos', data);

            if (data === undefined) {
                return null;
            }

            //let valores = data.territorio.map(function(item){
            var valores = data.map(function (item) {
                return item.nr_quantidade_osc_regiao;
            });

            //console.log(valores);
            var min = Math.min.apply(null, valores);
            var minUtil = parseInt(min + min * 10 / 100);
            var max = Math.max.apply(null, valores);
            var maxUtil = parseInt(max - max * 10 / 100);

            var qtdIntervalos = 5;
            var intervalo = parseInt(maxUtil / qtdIntervalos);

            //console.log('minUtil', minUtil);
            //console.log('intervalo', intervalo);

            var intervalos = [];
            intervalos.push(minUtil);
            var anterior = minUtil;
            for (var i = 0; i < qtdIntervalos - 1; i++) {
                anterior += intervalo;
                intervalos.push(anterior);
            }

            //console.log(intervalos);

            return intervalos;
        }
    }, {
        key: 'defineCor',
        value: function defineCor(valor, intervalos) {
            var cor = null;
            for (var k in intervalos) {
                if (valor < intervalos[k]) {
                    cor = parseInt(k) + 1;
                    break;
                }
            }
            //se o valor não é menor que ninguem então define a cor mais quente.
            if (cor === null) {
                cor = intervalos.length;
            }

            return cor;
        }
    }, {
        key: 'populateMap',
        value: function populateMap() {
            var _this4 = this;

            var _this = this;

            var mapElements = this.state.mapElements;

            //let markers = L.markerClusterGroup({ spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: true });

            var data = null;
            data = this.state.data;
            var dataTerritorio = this.state.dataTerritorio;
            //let territorio = this.state.data['territorio'];
            var territorio = dataTerritorio['territorios'];

            //let intervalos = this.gerarIntervalos(data);
            //console.log('dataTerritorio', dataTerritorio);
            var intervalos = this.gerarIntervalos(territorio);

            var pontos = []; //será usado para enquadrar o mapa (fitBounds)

            var _loop2 = function (i) {
                var cor = _this4.defineCor(territorio[i].nr_quantidade_osc_regiao, intervalos);
                //let classMarker = _this.state.classMarker[data.tipo_territorio];
                var classMarker = _this.state.classMarker[dataTerritorio.tipo_territorio];
                //let classMarker = "marker";
                //console.log(classMarker);

                var icon = L.divIcon({
                    className: classMarker + ' markerCor' + cor,
                    html: "<p style='color: #333;'>" + territorio[i].nr_quantidade_osc_regiao + "</p>"
                });

                var marker = L.marker(L.latLng(territorio[i].geo_lat_centroid_regiao, territorio[i].geo_lng_centroid_regiao), { icon: icon }).bindPopup('<strong>' + territorio[i].tx_nome_regiao + '</strong>').openPopup();

                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
                marker.on('click', function (e) {
                    var latlng = this.getLatLng();
                    mapElements.map.removeLayer(this);
                    var zoom = _this.state.zoom[parseInt(territorio[i].tipo_territorio)];
                    _this.setState({
                        //tipoTerritorioSelecionado: territorio[i].tipo_territorio,//1 - país, 2 - regiao, 3 - uf, 4 - municipio
                        codigoTerritorioSelecionado: [territorio[i].id_regiao] }, //203 - Brasil 13 - SE, etc...
                    //tipoTerritorioAgrupamento: parseInt(territorio[i].tipo_territorio)+1,//1 - país, 2 - regiao, 3 - uf, 4 - municipio
                    function () {
                        //console.log('marker click - tipo territorio', dataTerritorio.tipo_territorio);
                        _this.state.loadData[dataTerritorio.tipo_territorio]();
                        mapElements.map.setView([e.target._latlng.lat, e.target._latlng.lng], zoom);
                    });
                });
                //mapElements.map.addLayer(marker);
                mapElements.markersGroup.addLayer(marker);

                pontos.push([territorio[i].geo_lat_centroid_regiao, territorio[i].geo_lng_centroid_regiao]);
            };

            for (var i in territorio) {
                _loop2(i);
            }

            //if(data.tipo_territorio > 2){
            if (dataTerritorio.tipo_territorio > 2) {
                var bounds = new L.LatLngBounds(pontos);
                mapElements.map.fitBounds(bounds);
            }

            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'populateMapCluster',
        value: function populateMapCluster() {

            var _this = this;
            var mapElements = this.state.mapElements;

            var markers = L.markerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true });

            //let data = null;
            //data = this.state.data;
            //console.log(data['territorio']);

            //let territorios = this.state.dataTerritorio['territorios'];
            var territorios = this.state.dataOscCluster;
            //console.log('populateMapCluster', territorios);

            //data['territorio'].find(function(item){
            territorios.find(function (item) {
                //console.log(item);

                var icon = L.icon({
                    iconUrl: 'img/leaflet/controls/marker.png',
                    iconSize: [32, 32], // size of the icon
                    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -30] // point from which the popup should open relative to the iconAnchor
                });

                //console.log(data[i]);
                //console.log(this.props.allFilters);

                /*let allFilters = this.props.allFilters;
                let filterInfo = "";
                for(let j in allFilters){
                    filterInfo += '<strong>'+allFilters[j]['titulo']+':</strong> '+data[i][allFilters[j]['slug']]+'<br>'
                }*/

                var marker = L.marker(L.latLng(item[1], item[2]), { icon: icon })
                //let marker = L.marker(L.latLng(data[i].lat, data[i].lng))
                .bindPopup('<div>carregando...</div>').openPopup();

                marker.on('mouseover', function (e) {
                    //this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    //this.closePopup();
                });
                marker.on('click', function (e) {
                    _this.dataOSC(item[0], marker);
                    //this.openPopup();
                });
                markers.addLayer(marker);
            });
            //mapElements.map.addLayer(markers);
            mapElements.markersGroup.addLayer(markers);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'areaIdhMap',
        value: function areaIdhMap() {
            var _this = this;
            var mapElements = this.state.mapElements;
            var areaIdh = L.geoJson(this.state.dataIdhUf, {
                style: (function (feature) {
                    return {
                        fillColor: this.getColorIDH(feature.properties.nr_valor),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.9
                    };
                }).bind(this),
                onEachFeature: function onEachFeature(feature, layer) {
                    var _this2 = _this;
                    layer.on('mouseover', function () {
                        this.setStyle({
                            weight: 2,
                            color: '#333',
                            dashArray: '',
                            fillOpacity: 1
                        });
                        this.bringToFront();
                        _this2.state.info.update(layer.feature.properties, 'IDH');
                    });
                    layer.on('mouseout', function () {
                        _this2.state.info.update(null);
                        areaIdh.resetStyle(this);
                    });
                    layer.on('click', function () {
                        //console.log('click area idh');
                        var cod_uf = layer.feature.properties.cod_uf;
                        //console.log(cod_uf);
                        _this2.zoomToFeature();
                        _this2.loadDataIDHM(cod_uf);
                    });
                }
            });

            //onEachFeature: this.onEachFeature //listeners
            mapElements.areaIdhGroup.addLayer(areaIdh);
            this.setState({ mapElements: mapElements }, (function () {
                //this.areaOscMap();
                this.idhLegend();
            }).bind(this));
        }
    }, {
        key: 'areaIdhM',
        value: function areaIdhM() {
            var _this = this;
            var mapElements = this.state.mapElements;
            var areaIDHM = L.geoJson(this.state.dataIDHM, {
                style: (function (feature) {
                    return {
                        fillColor: this.getColorIDH(feature.properties.nr_valor),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.9
                    };
                }).bind(this),
                onEachFeature: function onEachFeature(feature, layer) {
                    var _this2 = _this;
                    layer.on('mouseover', function () {
                        this.setStyle({
                            weight: 2,
                            color: '#333',
                            dashArray: '',
                            fillOpacity: 1
                        });
                        this.bringToFront();
                        _this2.state.info.update(layer.feature.properties, 'IDHM');
                    });
                    layer.on('mouseout', function () {
                        _this2.state.info.update(null);
                        areaIDHM.resetStyle(this);
                    });
                }
                //onEachFeature: this.onEachFeature //listeners
            });

            mapElements.areaIdhGroup.addLayer(areaIDHM);
            this.setState({ mapElements: mapElements }, (function () {
                //this.areaOscMap();
                //this.idhLegend();
            }).bind(this));
        }
    }, {
        key: 'idhLegend',
        value: function idhLegend() {

            var mapElements = this.state.mapElements;
            var legend = L.control({ position: 'bottomright' });

            legend.onAdd = (function (mymap) {
                //console.log('map - intervalos:', this.state.intervalos);
                var div = L.DomUtil.create('div', 'info legend'),

                //grades = [0, 1000, 15000, 30000, 45000, 60000],
                grades = [0, 0.499, 0.599, 0.699, 0.799],

                //grades = intervalos,
                //grades = this.state.intervalos,
                labels = [];
                div.id = 'idhLegend';
                div.style.display = 'none';
                div.innerHTML += "<div><strong>Escala de IDH</strong></div><br>";
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<div style="clear: both; float:left; width: 20px; height:20px; background:' + this.getColorIDH(grades[i] + 0.001) + '"></div> ' + '<div style="float:left; margin-left: 5px;">' + numberDecimalPtBR(grades[i] + 0.001, 3) + (
                    //(grades[i + 1] ? '&nbsp;&ndash;&nbsp;' + numberDecimalPtBR(grades[i + 1], 3) + '<br>' : '+');
                    grades[i + 1] ? '&nbsp;&ndash;&nbsp;' + numberDecimalPtBR(grades[i + 1], 3) + '<br>' : '&nbsp;&ndash;&nbsp; 1') + '</div>';
                }
                return div;
            }).bind(this);

            /*if(lastIndexLegend!=0){
                this.state.mymap.removeControl(legend[lastIndexLegend]);
            }*/

            //legend.addTo(mapElements.map);
            legend.addTo(mapElements.map);
            this.setState({ mapaElements: mapElements }, function () {
                this.areaOscMap();
            });
        }
    }, {
        key: 'oscLegend',
        value: function oscLegend() {

            var mapElements = this.state.mapElements;
            var legend = L.control({ position: 'bottomright' });

            legend.onAdd = (function (mymap) {
                //console.log('map - intervalos:', this.state.intervalos);
                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 1000, 15000, 30000, 45000, 60000],

                //grades = intervalos,
                //grades = this.state.intervalos,
                labels = [];
                div.id = 'oscLegend';
                div.style.display = '';
                div.innerHTML += "<div><strong>Escala de OSCs</strong></div><br>";
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML += '<div style="clear: both; float:left; width: 20px; height:20px; background:' + this.getColorOsc(grades[i] + 1) + '"></div> ' + '<div style="float:left; margin-left: 5px;">' + (grades[i] + 1) + (
                    //(grades[i + 1] ? '&nbsp;&ndash;&nbsp;' + numberDecimalPtBR(grades[i + 1], 3) + '<br>' : '+');
                    grades[i + 1] ? '&nbsp;&ndash;&nbsp;' + numberDecimalPtBR(grades[i + 1], 3) + '<br>' : '+') + '</div>';
                }
                return div;
            }).bind(this);

            /*if(lastIndexLegend!=0){
                this.state.mymap.removeControl(legend[lastIndexLegend]);
            }*/

            legend.addTo(mapElements.map);
            this.setState({ mapaElements: mapElements }, function () {});
        }
    }, {
        key: 'highlightFeature',
        value: function highlightFeature(e) {
            //console.log(e);
            var layer = e.target;
            layer.setStyle({
                weight: 2,
                color: '#333',
                dashArray: '',
                fillOpacity: 1
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            this.state.info.update(layer.feature.properties);
        }

        /*resetHighlight(e) {
            let layer = e.target;
            this.state.mapElements.areaIdhGroup.resetStyle(e.target);
            //this.state.geojson.resetStyle(e.target);
            this.state.info.update();
        }*/
    }, {
        key: 'zoomToFeature',
        value: function zoomToFeature(e) {}
        //console.log('zoom');
        //console.log(e);
        //this.state.mapElements.map.fitBounds(e.target.getBounds);
        //this.state.mymap.fitBounds(e.target.getBounds());

        /*onEachFeature(feature, layer) {
            //console.log('feature', feature);
            //console.log('layer', layer);
            //console.log('this', this); //this do react. No constructor: this.onEachFeature = this.onEachFeature.bind(this);
            layer.on({
                mouseover: this.highlightFeature,
                mouseout: this.resetHighlight,
                click: this.zoomToFeature
            });
        }*/

    }, {
        key: 'areaOscMap',
        value: function areaOscMap() {
            var _this = this;
            var mapElements = this.state.mapElements;
            var areaOsc = L.geoJson(this.state.dataOscUf, {
                style: (function (feature) {
                    return {
                        fillColor: this.getColorOsc(feature.properties.total),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.9
                    };
                }).bind(this),
                onEachFeature: function onEachFeature(feature, layer) {
                    var _this2 = _this;
                    layer.on('mouseover', function () {
                        this.setStyle({
                            weight: 2,
                            color: '#333',
                            dashArray: '',
                            fillOpacity: 1
                        });
                        this.bringToFront();
                        _this2.state.infoOsc.update(layer.feature.properties, 'OSCs');
                    });
                    layer.on('mouseout', function () {
                        _this2.state.infoOsc.update(null);
                        areaOsc.resetStyle(this);
                    });
                }
                //onEachFeature: this.onEachFeature //listeners
            });

            mapElements.areaOscGroup.addLayer(areaOsc);
            this.setState({ mapElements: mapElements }, function () {
                this.oscLegend();
            });
        }
    }, {
        key: 'dataOSC',
        value: function dataOSC(id, marker) {
            var _this = this;
            $.ajax({
                method: 'GET',
                //url: 'get-data-osc/'+id,
                url: getBaseUrl2 + 'osc/popup/' + id,
                data: {},
                cache: false,
                success: function success(data) {
                    //data = JSON.parse(data);
                    data = data[0];
                    //console.log(data);
                    marker.bindPopup('' + '<strong>' + data['tx_nome_osc'] + '</strong><hr style="margin:5px 0; padding:0;">' + '<strong>Endereço: </strong>' + data['tx_endereco'] + ' - ' + data['tx_bairro'] + '<br/>' + '<strong>Atividade Econômica: </strong>' + data['tx_nome_atividade_economica_osc'] + '<br/>' + '<strong>Natureza Jurídica: </strong>' + data['tx_nome_natureza_juridica_osc'] + '<br/>' + "<div class='text-center'><a href='detalhar/" + id + "'><br><button class='btn btn-primary'>Detalhar </button><br/></a></div>");
                    marker.openPopup();
                },
                error: function error(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({ loading: false });
                }
            });
        }
    }, {
        key: 'heatMap',
        value: function heatMap() {

            var intensidades = {
                100: 20,
                500: 10,
                1000: 5,
                5000: 2
            };

            var points = this.state.dataCalor;

            var qtd = points.length;
            var intensidade = 1;

            for (var i in intensidades) {
                if (qtd <= i) {
                    intensidade = intensidades[i];
                    break;
                }
            }

            var addressPoints = points.map(function (p) {
                return [parseFloat(p[0]), parseFloat(p[1]), intensidade];
            });

            var mapElements = this.state.mapElements;

            mapElements.heatmapLayer = L.heatLayer(addressPoints);

            mapElements.map.addLayer(mapElements.heatmapLayer);

            //console.log('map', mapElements);

            this.setState({ mapElement: mapElements });
        }
    }, {
        key: 'removeAreaOscGroup',
        value: function removeAreaOscGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.removeLayer(this.state.mapElements.areaOscGroup);
            document.getElementById('oscLegend').style.display = 'none';
            document.getElementById('infoOsc').style.display = 'none';
            //console.log('removeAreaOscGrup');
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'addAreaOscGroup',
        value: function addAreaOscGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.addLayer(this.state.mapElements.areaOscGroup);
            //console.log('addAreaOscGroup');
            document.getElementById('oscLegend').style.display = '';
            document.getElementById('infoOsc').style.display = '';
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'removeAreaIdhGroup',
        value: function removeAreaIdhGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.removeLayer(this.state.mapElements.areaIdhGroup);
            document.getElementById('idhLegend').style.display = 'none';
            document.getElementById('infoIdh').style.display = 'none';
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'addAreaIdhGroup',
        value: function addAreaIdhGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.addLayer(this.state.mapElements.areaIdhGroup);
            //console.log('addAreaIdhGroup');
            document.getElementById('idhLegend').style.display = '';
            document.getElementById('infoIdh').style.display = '';
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'removeMarkersGroup',
        value: function removeMarkersGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.removeLayer(this.state.mapElements.markersGroup);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'addMarkersGroup',
        value: function addMarkersGroup() {
            var mapElements = this.state.mapElements;
            mapElements.map.addLayer(this.state.mapElements.markersGroup);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'removeHeatMap',
        value: function removeHeatMap() {
            var mapElements = this.state.mapElements;
            mapElements.map.removeLayer(this.state.mapElements.heatmapLayer);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'addHeatMap',
        value: function addHeatMap() {
            var mapElements = this.state.mapElements;
            mapElements.map.addLayer(this.state.mapElements.heatmapLayer);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'enableZoomMap',
        value: function enableZoomMap() {
            //console.log('aaaaaaaaaaaaaaa');
            var mapElements = this.state.mapElements;
            mapElements.map.scrollWheelZoom.enable();
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'disableZoomMap',
        value: function disableZoomMap() {
            var mapElements = this.state.mapElements;
            mapElements.map.scrollWheelZoom.disable();
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'changeTileLayer',
        value: function changeTileLayer(tile) {
            var mapElements = this.state.mapElements;
            document.getElementById('controlBasic').className = "control-data-types leaflet-control";
            document.getElementById('controlContrast').className = "control-data-types leaflet-control";
            document.getElementById('controlSatellite').className = "control-data-types leaflet-control";
            mapElements.map.removeLayer(this.state.tilesLayers.basic);
            mapElements.map.removeLayer(this.state.tilesLayers.contrast);
            mapElements.map.removeLayer(this.state.tilesLayers.satellite);
            mapElements.map.addLayer(tile);
            this.setState({ mapElements: mapElements });
        }
    }, {
        key: 'getColorOsc',
        value: function getColorOsc(d) {
            //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
            //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
            return d > 60000 ? '#800026' : d > 45000 ? '#E31A1C' : d > 30000 ? '#FC4E2A' : d > 15000 ? '#FEB24C' : d > 1000 ? '#FED976' : '#FFEDA0';
        }
    }, {
        key: 'getColorIDH',
        value: function getColorIDH(d) {
            //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
            //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
            return d > 0.799 ? '#527DA7' : d > 0.699 ? '#58935d' : d > 0.599 ? '#D2CE49' : d > 0.499 ? '#CC9538' : '#AD3735';
        }
    }, {
        key: 'exportar',
        value: function exportar() {
            $('#modalExportar').modal('show');
            if (this.state.origem === 'busca-avancada') {
                console.log('exportar');
                this.setState({ processingExportacao: true, textoProcessingExportacao: 'buscando dados' });
                $.ajax({
                    //contentType: 'application/json',
                    //dataType: 'json',
                    method: 'POST',
                    //url: 'osc/busca_avancada/lista',
                    //url: getBaseUrl2 + 'osc/exportar',
                    url: 'osc/exportar',
                    //data: this.props.strJson,
                    data: {
                        busca: this.props.strJson
                    },
                    cache: false,
                    success: (function (data) {
                        //console.log(data);
                        //data = JSON.parse(data);
                        //this.setState({dataExportacao: data, processingExportacao: false}, function(){
                        this.setState({ processingExportacao: false }, function () {
                            //this.gerarCsvExportacao();
                            this.gerarCsvExportacao(data);
                        });
                        //this.populateMap();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ processingExportacao: false });
                    }).bind(this)
                });
            }
        }

        //gerarCsvExportacao(){
    }, {
        key: 'gerarCsvExportacao',
        value: function gerarCsvExportacao(csv) {
            console.log('gerar csv');
            this.setState({ textoProcessingExportacao: 'gerando csv' });
            /*let firstRow = this.state.dataExportacao[0];
            let firsRowCsv = '';
            for(let column in firstRow){
                if(column !== 'im_logo'){
                    firsRowCsv += column+';';
                }
            }
            firsRowCsv = firsRowCsv.slice(0, -1);
            let columns = firsRowCsv.split(';');
            let csv = firsRowCsv+'\n';
              this.state.dataExportacao.forEach(function (item){
                let row = '';
                columns.forEach(function (column){
                    row += item[column]+';';
                });
                row = row.slice(0, -1);
                csv += row+'\n';
            });*/

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'exportacao.csv';
            hiddenElement.click();
            this.setState({ processingExportacao: false, textoProcessingExportacao: '' });
            $('#modalExportar').modal('hide');
        }

        /*itensPesquisadosAvancada(){
            let pesquisa = JSON.parse(this.props.strJson);
            console.log(pesquisa);
            let itens = [
                (<span><strong><u>Filtros utilizados:</u>&nbsp;</strong></span>)
            ];
            let avancado = pesquisa.avancado;
            for(let i in avancado){
                for(let j in avancado[i]){
                    itens.push(
                        <span>
                            <strong><i>{j}: </i></strong> {avancado[i][j]},&nbsp;
                        </span>
                    )
                }
            }
              itens.push(<div><br/></div>);
              return itens;
        }*/

    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            //console.log(this.state.mapElements.map);

            var tableOsc = null;

            ////////////////////////////////////////////
            function removeAccent(text) {
                text = text.toLowerCase();
                text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
                text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
                text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
                text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
                text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
                text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
                text = text.replace(new RegExp('[ ]', 'gi'), '-');
                text = text.replace(new RegExp('[/]', 'gi'), '-');
                return text;
            }

            function formatCnpjCpf(value) {
                var cnpjCpf = value.replace(/\D/g, '');

                if (cnpjCpf.length === 11) {
                    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
                }

                return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
            }
            ////////////////////////////////////////////
            function identificarFilialMatriz(cnpj) {
                // Remover caracteres não numéricos
                cnpj = cnpj.replace(/\D/g, '');

                // Verificar se a string possui 14 dígitos
                if (cnpj.length !== 14) {
                    return "CNPJ inválido";
                }

                // Verificar se a identificação da filial é diferente de zero
                if (cnpj.slice(8, 12) !== '0001') {
                    return "Filial";
                } else {
                    return "Matriz";
                }
            }

            if (this.state.dataOscList) {

                //console.log('***', this.state.data);
                //if(this.state.dataOscList.length < 50){
                tableOsc = this.state.dataOscList.map((function (item, index) {
                    if (index > 30) {
                        return;
                    }
                    var logo = this.state.logos[item.id_osc] ? this.state.logos[item.id_osc] : 'img/sem-imagem.png';
                    return React.createElement(
                        'tr',
                        { key: 'tabela' + index },
                        React.createElement(
                            'td',
                            { className: 'capitalize' },
                            React.createElement(
                                'div',
                                { className: 'img-upload img-upload-p' },
                                React.createElement('img', { src: logo,
                                    alt: '' })
                            ),
                            item.tx_nome_osc.toLowerCase()
                        ),
                        React.createElement(
                            'td',
                            null,
                            formatCnpjCpf(item.cd_identificador_osc),
                            React.createElement(
                                'p',
                                { style: { padding: '2px 5px', borderRadius: 5, backgroundColor: '#ebe7e7', display: 'inline-block', fontSize: 12 } },
                                React.createElement(
                                    'strong',
                                    null,
                                    identificarFilialMatriz(item.cd_identificador_osc)
                                )
                            )
                        ),
                        React.createElement(
                            'td',
                            { className: 'text-center' },
                            item.tx_natureza_juridica_osc
                        ),
                        React.createElement(
                            'td',
                            { className: 'capitalize' },
                            item.tx_endereco_osc.toLowerCase()
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'a',
                                { href: 'detalhar/' + item.id_osc + '/' + removeAccent(item.tx_nome_osc) },
                                React.createElement('i', {
                                    className: 'fas fa-share-square' })
                            )
                        )
                    );
                }).bind(this));
                //}
            }

            //MONTANDO A PAGINAÇÃO
            var pagina = this.state.paginaOscList;
            var p = []; //armazena todas as paginas
            var pages = []; //paginas q serão mostradas
            var n_paginas = Math.ceil(this.state.totalOscList / 10);
            //console.log('pagina', pagina);
            var qtdPages = n_paginas;

            var _loop3 = function (i) {
                var active = _this5.state.paginaOscList === i ? 'active' : '';
                p[i] = React.createElement(
                    'li',
                    { className: "page-item " + active },
                    React.createElement(
                        'a',
                        { className: 'page-link', style: { cursor: 'pointer' }, onClick: function () {
                                return _this5.setPageOscList(i);
                            } },
                        i + 1
                    )
                );
            };

            for (var i = 0; i < n_paginas; i++) {
                _loop3(i);
            }
            if (n_paginas <= 10) {
                for (var i = 0; i < qtdPages; i++) {
                    var active = this.state.paginaOscList === i ? 'active' : '';
                    pages.push(p[i]);
                }
            } else {
                if (pagina <= 5) {
                    pages.push(p[0]);
                    pages.push(p[1]);
                    pages.push(p[2]);
                    pages.push(p[3]);
                    pages.push(p[4]);
                    pages.push(p[5]);
                    pages.push(p[6]);
                    pages.push(React.createElement(
                        'li',
                        { className: 'page-item ' },
                        React.createElement(
                            'a',
                            { className: 'page-link', href: '#' },
                            '...'
                        )
                    ));
                    pages.push(p[n_paginas - 1]);
                } else if (pagina === n_paginas - 1 || pagina === n_paginas - 2) {
                    pages.push(p[0]);
                    pages.push(React.createElement(
                        'li',
                        { className: 'page-item ' },
                        React.createElement(
                            'a',
                            { className: 'page-link', href: '#' },
                            '...'
                        )
                    ));
                    pages.push(p[n_paginas - 8]);
                    pages.push(p[n_paginas - 7]);
                    pages.push(p[n_paginas - 6]);
                    pages.push(p[n_paginas - 5]);
                    pages.push(p[n_paginas - 4]);
                    pages.push(p[n_paginas - 3]);
                    pages.push(p[n_paginas - 2]);
                    pages.push(p[n_paginas - 1]);
                } else {
                    pages.push(p[0]);
                    pages.push(React.createElement(
                        'li',
                        { className: 'page-item ' },
                        React.createElement(
                            'a',
                            { className: 'page-link', href: '#' },
                            '...'
                        )
                    ));
                    if (parseInt(pagina) + 4 < n_paginas - 1) {
                        pages.push(p[parseInt(pagina) - 3]);
                        pages.push(p[parseInt(pagina) - 2]);
                        pages.push(p[parseInt(pagina) - 1]);
                        pages.push(p[pagina]);
                        pages.push(p[parseInt(pagina) + 1]);
                        pages.push(p[parseInt(pagina) + 2]);
                        pages.push(p[parseInt(pagina) + 3]);
                        pages.push(React.createElement(
                            'li',
                            { className: 'page-item ' },
                            React.createElement(
                                'a',
                                { className: 'page-link', href: '#' },
                                '...'
                            )
                        ));
                    } else {
                        pages.push(p[n_paginas - 8]);
                        pages.push(p[n_paginas - 7]);
                        pages.push(p[n_paginas - 6]);
                        pages.push(p[n_paginas - 5]);
                        pages.push(p[n_paginas - 4]);
                        pages.push(p[n_paginas - 3]);
                        pages.push(p[n_paginas - 2]);
                        pages.push(p[n_paginas - 1]);
                    }
                    pages.push(p[n_paginas - 1]);
                }
            }

            var pagination = React.createElement(
                'ul',
                { className: 'pagination' },
                React.createElement(
                    'li',
                    { className: 'page-item disabled', style: { display: this.state.pageOscList > 0 ? '' : 'none' } },
                    React.createElement(
                        'a',
                        { className: 'page-link', href: '#', tabIndex: '-1' },
                        'Anterior'
                    )
                ),
                pages,
                React.createElement(
                    'li',
                    { className: 'page-item', style: { display: this.state.pageOscList < parseInt(this.state.totalOscList / 10) ? '' : 'none' } },
                    React.createElement(
                        'a',
                        { className: 'page-link', href: '#' },
                        'Próximo'
                    )
                )
            );

            var processingOsc = this.state.processingOsc;
            var processingOscIdhUfs = this.state.processingOscIdhUfs;
            var processingOscUfs = this.state.processingOscUfs;
            var processingOscPontos = this.state.processingOscPontos;
            var processingHeatMap = this.state.processingHeatMap;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'modal fade', id: 'modalAvancada', tabindex: '-1', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
                    React.createElement(
                        'div',
                        { className: 'modal-dialog' },
                        React.createElement(
                            'div',
                            { className: 'modal-content' },
                            React.createElement(
                                'div',
                                { className: 'modal-header' },
                                React.createElement(
                                    'h5',
                                    { className: 'modal-title', id: 'exampleModalLabel' },
                                    'Consulta Avançada'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                    React.createElement(
                                        'span',
                                        { 'aria-hidden': 'true' },
                                        '×'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-body' },
                                React.createElement(
                                    'div',
                                    { className: 'container' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'h4',
                                                { className: 'text-center' },
                                                'Sua consulta não retornou resultados!'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-footer' },
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-info', onClick: function () {
                                            window.history.back();
                                        } },
                                    'Voltar'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'modal fade', id: 'modalExportar', tabindex: '-1', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
                    React.createElement(
                        'div',
                        { className: 'modal-dialog' },
                        React.createElement(
                            'div',
                            { className: 'modal-content' },
                            React.createElement(
                                'div',
                                { className: 'modal-header' },
                                React.createElement(
                                    'h5',
                                    { className: 'modal-title', id: 'exampleModalLabel' },
                                    'Exportar'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                    React.createElement(
                                        'span',
                                        { 'aria-hidden': 'true' },
                                        '×'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-body' },
                                React.createElement(
                                    'div',
                                    { className: 'container' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'div',
                                                { className: 'text-center', style: { display: this.state.origem === 'busca-avancada' ? '' : 'none' } },
                                                React.createElement('img', { src: 'img/load.gif', alt: 'Load' }),
                                                React.createElement('br', null),
                                                React.createElement(
                                                    'h3',
                                                    { className: 'text-center' },
                                                    this.state.textoProcessingExportacao
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'text-center', style: { display: this.state.origem === 'busca-avancada' ? 'none' : '' } },
                                                React.createElement(
                                                    'h3',
                                                    { className: 'text-center' },
                                                    'Utilize a consulta avançada para exportar os dados'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'text-right', style: { margin: '0 -30px 0 0' } },
                                this.state.origem != 0 && React.createElement(
                                    'a',
                                    { href: '', id: 'novaBuscaLink' },
                                    React.createElement(
                                        'button',
                                        {
                                            style: { float: 'inline-start' },
                                            onClick: function () {
                                                var novaBuscaLink = document.querySelector('#novaBuscaLink');
                                                novaBuscaLink.href = document.referrer;
                                                novaBuscaLink.click();
                                            },
                                            className: 'btn btn-outline-primary'
                                        },
                                        React.createElement('i', { className: 'fas fa-search' }),
                                        '  Nova busca'
                                    )
                                ),
                                this.state.origem === 'busca-avancada' && React.createElement(
                                    'button',
                                    {
                                        className: 'btn btn-primary',
                                        onClick: this.exportar,
                                        title: this.state.origem === 'busca-avancada' ? '' : 'Utilize a consulta avançada para exportar os dados'
                                    },
                                    'Exportar'
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'text-center ', style: { clear: 'both' } },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Quantidade de OSCs encontradas'
                                ),
                                React.createElement(
                                    'h1',
                                    null,
                                    React.createElement(
                                        'strong',
                                        null,
                                        this.state.totalOscList
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(VisualizarFiltros, { strJson: this.props.strJson })
                        ),
                        React.createElement(
                            'div',
                            { style: { margin: '0 15px 0 0' } },
                            React.createElement(
                                'div',
                                { style: { margin: '0 -15px 0 -15px' } },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'map-load', style: { display: processingOsc || processingOscIdhUfs || processingOscUfs || processingOscPontos || processingHeatMap ? '' : 'none' }
                                        },
                                        /*<i className="fa fa-spinner fa-spin fa-5x"/>*/React.createElement('img', { src: 'img/load.gif', alt: 'Load' }),
                                        ' '
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { position: "relative", zIndex: "0", marginRight: "-15px" } },
                                    React.createElement('div', { id: this.state.mapId, className: 'map' }),
                                    React.createElement('div', { id: 'controls-map', className: 'control-container' }),
                                    React.createElement('div', { id: 'controls-map2', className: 'control-container' })
                                )
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'text-center', style: { display: this.state.processingList ? '' : 'none' } },
                            React.createElement('img', { src: 'img/load.gif', alt: 'loading', title: 'loading' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'table-responsive-sm', style: { display: this.state.processingList ? 'none' : '' } },
                            React.createElement(
                                'p',
                                { style: { fontSize: '12px' } },
                                'Obs: Algumas OSCs com dados de endereço ausentes ou incompletos.'
                            ),
                            React.createElement(
                                'table',
                                { className: 'table' },
                                React.createElement(
                                    'thead',
                                    { className: 'bg-pri text-light' },
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,
                                            'Nome da OSC'
                                        ),
                                        React.createElement(
                                            'th',
                                            { width: '180' },
                                            'CNPJ'
                                        ),
                                        React.createElement(
                                            'th',
                                            { width: '220' },
                                            'N. Juridica'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Endereço'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Ações'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'tbody',
                                    null,
                                    tableOsc
                                )
                            )
                        ),
                        React.createElement(
                            'nav',
                            { 'aria-label': '...' },
                            pagination
                        )
                    ),
                    React.createElement('div', { className: 'col-md-12' })
                )
            );
        }
    }]);

    return OscMap;
})(React.Component);

/*<img src="img/sem-imagem.png"
alt=""/>*/ /*<li className="page-item"><a className="page-link" href="#">1</a></li>
           <li className="page-item active">
              <a className="page-link" href="#">2 <span className="sr-only">(atual)</span></a>
           </li>
           <li className="page-item"><a className="page-link" href="#">3</a></li>*/ /*Modal Sem Resultados Busca Avancada*/ /*Modal Exportar*/ /*<div className="box-qtd">
                                                                                                                                                  <p>Quantidade de OSCs</p>
                                                                                                                                                  <h2>{this.state.totalOscList}</h2>
                                                                                                                                               </div>*/ /*<i className="fa fa-spinner fa-spin fa-3x"/>*/