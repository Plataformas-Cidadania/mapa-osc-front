class OscMap extends React.Component{
    constructor(props){
        super(props);
        //console.log(props);
        this.state = {
            processingOsc: false,
            processingOscIdhUfs: false,
            processingOscUfs: false,
            processingOscPontos: false,
            processingHeatMap: false,
            mapId: props.mapId,
            firstTimeLoad: true,
            regioes: [],
            ufs: [],
            data: [],
            dataOscUf: [],
            dataIdhUf: [],
            dataOsc: null,
            dataCalor: [],
            //year:props.year,
            //month:props.month,
            //filters: props.filters,
            pais: 'BRA', //utilizado para o mapa de calor
            //tipoTerritorioSelecionado: props.tipoTerritorioSelecionado,
            codigoTerritorioSelecionado: props.codigoTerritorioSelecionado,
            //tipoTerritorioAgrupamento: props.tipoTerritorioAgrupamento,

            mapElements: {
                map:null,
            },
            tileLayerMap:1, //1 - Básico, 2 - Contraste, 3 - Satélite
            tilesLayers: {
                basic: null,
                contrast: null,
                satellite: null,
            },
            zoom: {
                1:4,//territorio 1 usa o zoom 4
                2:5,
                3:7,
                4:8,
            },
            classMarker: {
                1:'marker',
                2:'marker',
                3:'marker2',
                4:'marker2',
            },
            loadData:{
                1: function() {
                    //console.log('aaa');
                    this.loadDataTotalPorTerritorio();
                }.bind(this),
                2: function() {
                    //console.log('bbb');
                    //this.loadDataTotalPorTerritorio();
                    this.loadDataUf();
                }.bind(this),
                3: function() {
                    //console.log('ccc');
                    this.loadDataPontosPorTerritorio();
                }.bind(this),
                4: function() {
                    //console.log('ddd');
                    this.loadDataPontosPorTerritorio();
                }.bind(this),
            }
        };

        this.loadMap = this.loadMap.bind(this);
        //this.loadDataTotalPorTerritorio = this.loadDataTotalPorTerritorio.bind(this);
        this.loadDataPontosPorTerritorio = this.loadDataPontosPorTerritorio.bind(this);
        this.loadDataUf = this.loadDataUf.bind(this);
        //this.loadAllUfs = this.loadAllUfs.bind(this);
        this.populateMap = this.populateMap.bind(this);
        this.areaOscMap = this.areaOscMap.bind(this);
        this.areaIdhMap = this.areaIdhMap.bind(this);
        this.populateMapCluster = this.populateMapCluster.bind(this);
        this.heatMap = this.heatMap.bind(this);
        this.removeHeatMap = this.removeHeatMap.bind(this);
        this.addHeatMap = this.addHeatMap.bind(this);
        this.changeTileLayer = this.changeTileLayer.bind(this);
        this.removeMarkersGroup = this.removeMarkersGroup.bind(this);
        this.addMarkersGroup = this.addMarkersGroup.bind(this);

    }

    componentDidMount(){
        this.loadFirstMap();
        this.loadMap();
        //this.loadAllUfs();
    }

    componentWillReceiveProps(props){
        //console.log('will receve props');
        //console.log(props.data);
        if(props.data != this.state.data ||
            props.dataOscUf != this.state.dataOscUf ||
            props.dataIdhUf != this.state.dataIdhUf ||
            props.processingOsc != this.state.processingOsc ||
            props.processingOscIdhUfs != this.state.processingOscIdhUfs
        ){
            //console.log(props.data);
            this.setState({
                data: props.data,
                dataOscUf: props.dataOscUf,
                dataIdhUf: props.dataIdhUf,
                processingOsc: props.processingOsc,
                processingOscIdhUfs: props.processingOscIdhUfs
            }, function(){
                if(this.state.data && this.state.dataOscUf && this.state.dataIdhUf){
                    this.populateMap();
                    //this.areaOscMap();
                    this.areaIdhMap();
                }
            })
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


    loadFirstMap(){

        let mapElements = this.state.mapElements;

        let basic = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        let contrast = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 17,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        let tilesLayers = this.state.tilesLayers;
        tilesLayers.basic = basic;
        tilesLayers.contrast = contrast;
        tilesLayers.satellite = satellite;
        this.setState({tilesLayers: tilesLayers});

        var latlng = L.latLng(-13.70, -55.65);

        let tile = null;
        if(this.state.tileLayerMap==1){
            tile = basic;
        }
        if(this.state.tileLayerMap==2){
            tile = contrast;
        }
        if(this.state.tileLayerMap==3){
            tile = satellite;
        }

        mapElements.map = L.map(this.state.mapId, {
            center: latlng,
            zoom: 4,
            layers: [tile],
            fullscreenControl: true,
            fullscreenControlOptions: { // optional
                title:"Show me the fullscreen !",
                titleCancel:"Exit fullscreen mode"
            }
        });

        let thisReact = this;

        //////////////////DIV CONTAINER DOS CONTROLERS///////////////////////////////////
        //pega o div externo ao mapa
        let controlsMap = document.getElementById('controls-map');

        mapElements.controlContainer = L.Control.extend({
            options:{
                position: 'topright',
            },
            onAdd: function(){
                return L.DomUtil.get('controls-map');
            }
        }).bind(thisReact);
        mapElements.map.addControl(new mapElements.controlContainer());

        let controlsMap2 = document.getElementById('controls-map2');

        mapElements.controlContainer = L.Control.extend({
            options:{
                position: 'bottomleft',
            },
            onAdd: function(){
                return L.DomUtil.get('controls-map2');
            }
        }).bind(thisReact);
        mapElements.map.addControl(new mapElements.controlContainer());
        ///////////////////////////////////////////////////////////////////////////////

        mapElements.controlBasicMap = this.controlBasicMap(thisReact)
        let controlBasicMapObj = new mapElements.controlBasicMap();
        mapElements.map.addControl(controlBasicMapObj);
        //pega o div do controle
        let divControlBasicMap = controlBasicMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap2.appendChild(divControlBasicMap);

        mapElements.controlContrastMap = this.controlContrastMap(thisReact);
        let controlContrastMapObj = new mapElements.controlContrastMap();
        mapElements.map.addControl(controlContrastMapObj);
        //pega o div do controle
        let divControlContrastMap = controlContrastMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap2.appendChild(divControlContrastMap);

        mapElements.controlSatelliteMap = this.controlSatelliteMap(thisReact);
        let controlSatelliteMapObj = new mapElements.controlSatelliteMap();
        mapElements.map.addControl(controlSatelliteMapObj);
        //pega o div do controle
        let divControlSatelliteMap = controlSatelliteMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap2.appendChild(divControlSatelliteMap);

        ///////////////FIM CONTROLERS DOS MAPAS/////////////////////////////////////////

        //////////////////////////SEPARADOR/////////////////////////////////////////////
        mapElements.controlSeparator = L.Control.extend({
            options:{
                position: 'topright',
            },
            onAdd: function(){
                let container = L.DomUtil.create('div');
                container.style.marginRight = '0';
                container.style.borderBottom = 'solid 1px #e8e8e8';
                container.style.width = '100%';
                container.innerHTML = ' ';
                return container;
            }
        }).bind(thisReact);
        let controlSeparatorObj = new mapElements.controlSeparator();
        mapElements.map.addControl(controlSeparatorObj);
        //pega o div do controle
        let divControlSeparator = controlSeparatorObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlSeparator);
        ////////////////////////////FIM//////////////////////////////////////////////////

        ////////////////CONTROLERS DOS LAYERS////////////////////////////////////////////
        //Area OSC
        mapElements.controlAreaOscMap = this.controlAreaOsc(thisReact);
        let controlAreaOscMapObj = new mapElements.controlAreaOscMap();
        mapElements.map.addControl(controlAreaOscMapObj);
        //pega o div do controle
        let divControlAreaOscMap = controlAreaOscMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlAreaOscMap);

        //Area IDH
        mapElements.controlAreaIdhMap = this.controlAreaIdh(thisReact);
        let controlAreaIdhMapObj = new mapElements.controlAreaIdhMap();
        mapElements.map.addControl(controlAreaIdhMapObj);
        //pega o div do controle
        let divControlAreaIdhMap = controlAreaIdhMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlAreaIdhMap);

        //Clusters/Markers
        mapElements.controlClusterMap = this.controlMarker(thisReact);
        let controlMarkerMapObj = new mapElements.controlClusterMap();
        mapElements.map.addControl(controlMarkerMapObj);
        //pega o div do controle
        let divControlMarkerMap = controlMarkerMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlMarkerMap);

        //HeatMap
        mapElements.controlHeatMap = this.controlHeatMap(thisReact);
        let controlHeatMapObj = new mapElements.controlHeatMap();
        mapElements.map.addControl(controlHeatMapObj);
        //pega o div do controle
        let divControlHeatMap = controlHeatMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlHeatMap);
        ////////////////FIM CONTROLERS DOS LAYERS////////////////////////////////////////////


        ///////////////CONTROLE HABILITA/DESABILITA ZOOM/////////////////////////////////////
        //Clusters/Markers
        mapElements.controlZoomMap = this.controlZoomMap(thisReact);
        let controlZoomMapObj = new mapElements.controlZoomMap();
        mapElements.map.addControl(controlZoomMapObj);
        //pega o div do controle
        let divControlZoomMap = controlZoomMapObj.getContainer();
        //coloca o div do controle no div externo
        controlsMap.appendChild(divControlZoomMap);
        /////////////////////////////////////////////////////////////////////////////////////

        //DESABILITA O ZOOM PELO SCHROLL DO MOUSE
        mapElements.map.scrollWheelZoom.disable();

        this.setState({mapElements: mapElements}, function(){
            //this.loadMap();
        });
    }

    controlBasicMap(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
            },
            onAdd: function(){
                let container = L.DomUtil.create('div');
                container.onclick = function(){
                    thisReact.setState({tileLayerMap: 1});
                    thisReact.changeTileLayer(thisReact.state.tilesLayers.basic);
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                };

                container.id = 'controlBasic';
                container.className = 'control-data-types leaflet-control';
                if(thisReact.state.tileLayerMap==1){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.style.clear = 'none';
                container.innerHTML = '<img src="img/leaflet/controls/basic.png"  title="Mapa Básico">';

                return container;
            }
        }).bind(thisReact);

    }

    controlContrastMap(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: false,
            },
            onAdd: function(){
                let container = L.DomUtil.create('div');
                container.onclick = function(){
                    thisReact.setState({tileLayerMap: 2});
                    thisReact.changeTileLayer(thisReact.state.tilesLayers.contrast);
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                };

                container.id = 'controlContrast';
                container.className = 'control-data-types leaflet-control';
                if(thisReact.state.tileLayerMap==2){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.style.clear = 'none';
                container.innerHTML = '<img src="img/leaflet/controls/contrast.png"  title="Contraste">';

                return container;
            }
        });
    }

    controlSatelliteMap(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: false,
            },
            onAdd: function(){
                let container = L.DomUtil.create('div');
                container.onclick = function(){
                    thisReact.setState({tileLayerMap: 3});
                    thisReact.changeTileLayer(thisReact.state.tilesLayers.satellite);
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                };

                container.id = 'controlSatellite';
                container.className = 'control-data-types leaflet-control';
                if(thisReact.state.tileLayerMap==3){
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

    controlAreaOsc(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: true,
            },
            onAdd: function(){
                let options = this.options;
                //console.log(options.check);
                let container = L.DomUtil.create('div');
                container.id = "ctrlAreaOsc";
                container.onclick = function(){
                    //console.log(options.check);
                    options.check = !options.check;
                    container.className = 'control-data-types leaflet-control check-control-data-types';
                    thisReact.removeAreaIdhGroup();
                    thisReact.addAreaOscGroup();
                    document.getElementById('ctrlAreaIdh').className = "control-data-types leaflet-control";
                    console.log(container);
                }.bind(options, thisReact);

                container.className = 'control-data-types leaflet-control';
                if(options.check){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.innerHTML = '<img src="img/leaflet/controls/areaOsc.png" title="OSC">';

                return container;
            }
        }).bind(thisReact);
    }

    controlAreaIdh(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: false,
            },
            onAdd: function(){
                let options = this.options;
                //console.log(options.check);
                let container = L.DomUtil.create('div');
                container.id = "ctrlAreaIdh";
                container.onclick = function(){
                    //console.log(options.check);
                    options.check = !options.check;
                    container.className = 'control-data-types leaflet-control check-control-data-types';
                    thisReact.removeAreaOscGroup();
                    thisReact.addAreaIdhGroup();
                    document.getElementById('ctrlAreaOsc').className = "control-data-types leaflet-control";
                }.bind(options, thisReact);

                container.className = 'control-data-types leaflet-control';
                if(options.check){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.innerHTML = '<img src="img/leaflet/controls/areaIdh.png" title="IDH">';

                return container;
            }
        }).bind(thisReact);
    }



    controlMarker(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: true,
            },
            onAdd: function(){
                let options = this.options;
                //console.log(options.check);
                let container = L.DomUtil.create('div');
                container.onclick = function(){
                    //console.log(options.check);
                    options.check = !options.check;
                    container.className = 'control-data-types leaflet-control';
                    //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-off.png">';
                    thisReact.removeMarkersGroup();
                    if(options.check){
                        thisReact.addMarkersGroup();
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                        //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-on.png">';
                    }
                }.bind(options, thisReact);

                container.className = 'control-data-types leaflet-control';
                if(options.check){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.innerHTML = '<img src="img/leaflet/controls/marker.png" title="Marcadores">';

                return container;
            }
        }).bind(thisReact);
    }

    controlHeatMap(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: false,
                heatmapLoaded: false,
            },
            onAdd: function(){

                let options = this.options;
                //console.log(options.check);
                let container = L.DomUtil.create('div', 'control-data-types');
                container.onclick = function(){

                    /*if(thisReact.state.dataCalor.length === 0){
                        thisReact.loadDataHeatMap();
                    }*/

                    //console.log(options.check);
                    options.check = !options.check;
                    container.className = 'control-data-types leaflet-control';

                    //verifica se o mapa já foi carregado antes.
                    if(options.heatmapLoaded && !options.check){
                        thisReact.removeHeatMap();
                    }

                    if(options.heatmapLoaded && options.check){
                        thisReact.removeAreaOscGroup();
                        thisReact.removeAreaIdhGroup();
                        thisReact.addHeatMap();
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                    if(!options.heatmapLoaded && options.check){
                        thisReact.removeAreaOscGroup();
                        thisReact.removeAreaIdhGroup();
                        thisReact.loadDataHeatMap();
                        options.heatmapLoaded = true;
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                    }

                }.bind(options, thisReact);

                container.innerHTML = '<img src="img/leaflet/controls/heatmap.png" title="Mapa de Calor">';

                return container;
            }
        }).bind(thisReact);
    }

    controlZoomMap(thisReact){
        return L.Control.extend({
            options:{
                position: 'topright',
                check: false,
            },
            onAdd: function(){
                let options = this.options;
                //console.log('zoom', options.check);
                let container = L.DomUtil.create('div');
                container.onclick = function(){
                    options.check = !options.check;
                    //console.log(options.check);
                    container.className = 'control-data-types leaflet-control';
                    //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-off.png">';
                    thisReact.disableZoomMap();
                    if(options.check){
                        thisReact.enableZoomMap();
                        container.className = 'control-data-types check-control-data-types leaflet-control';
                        //container.innerHTML = '<img width="24px" height="32px" src="img/leaflet/marker-on.png">';
                    }
                }.bind(options, thisReact);

                container.className = 'control-data-types leaflet-control';
                if(options.check){
                    container.className = 'control-data-types check-control-data-types leaflet-control';
                }

                container.style.cursor = 'pointer';
                container.innerHTML = '<img src="img/leaflet/controls/zoom.png" title="Marcadores">';

                return container;
            }
        }).bind(thisReact);
    }

    loadMap(){

        let mapElements = this.state.mapElements;

        mapElements.map.setZoom(4);

        mapElements.map.eachLayer(function(layer){
            //if not the tile layer
            if (typeof layer._url === "undefined"){
                mapElements.map.removeLayer(layer);
            }
        }.bind(this));

        //mapElements.map.removeControl(mapElements.controlSatelliteMap);


        mapElements.markersGroup = L.layerGroup();
        mapElements.map.addLayer(mapElements.markersGroup);

        mapElements.areaIdhGroup = L.layerGroup();
        mapElements.map.addLayer(mapElements.areaIdhGroup);

        mapElements.areaOscGroup = L.layerGroup();
        mapElements.map.addLayer(mapElements.areaOscGroup);


        this.setState({mapElements: mapElements});

    }

    loadDataUf(){
        let _this = this;
        this.setState({processingOscUfs: true}, function (){
            $.ajax({
                method:'GET',
                url: 'get-osc/2/'+this.state.codigoTerritorioSelecionado,//tipo 2 região ao ser clicado irá carregas as ufs
                data:{
                },
                cache: false,
                success: function(data) {
                    console.log(data);
                    _this.setState({data: data, processingOscUfs: false});
                    _this.populateMap();
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({loading: false});
                }

            });
        });

    }

    loadDataHeatMap(){
        let _this = this;
        this.setState({processingHeatMap: true}, function (){
            $.ajax({
                method:'GET',
                url: 'get-all-oscs',
                data:{
                },
                cache: false,
                success: function(data) {
                    console.log(data);
                    _this.setState({dataCalor: data, processingHeatMap: false});
                    _this.heatMap();
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({loading: false});
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

    loadDataPontosPorTerritorio(){
        this.setState({processingOscPontos: true}, function (){
            $.ajax({
                method:'GET',
                url: 'get-osc/3/'+this.state.codigoTerritorioSelecionado,//tipo 2 região ao ser clicado irá carregas as ufs
                data:{
                },
                cache: false,
                success: function(data) {
                    //console.log(data);
                    this.setState({data: data, processingOscPontos: false}, function(){
                        this.populateMapCluster();
                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log('erro');
                }.bind(this)
            });
        });
    }

    loadDataPontosPorPais(){
        $.ajax({
            method:'POST',
            url: "pontos-transito-pais",
            data:{
                serie_id: this.props.id,
                start: this.state.start,
                end: this.state.end,
                pais: this.state.pais,
                types: this.state.types,
            },
            cache: false,
            success: function(data) {
                //console.log('pais', data);
                this.setState({dataCalor: data.valores}, function(){
                    this.heatMap();
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('erro');
            }.bind(this)
        });
    }

    gerarIntervalos(data){

        if(data===undefined){
            return null;
        }


        let valores = data.territorio.map(function(item){
            return item.nr_quantidade_osc_regiao;
        });

        //console.log(valores);
        let min = Math.min.apply(null, valores);
        let minUtil = parseInt(min + min * 10/100);
        let max = Math.max.apply(null, valores);
        let maxUtil = parseInt(max - max * 10/100);

        let qtdIntervalos = 5;
        let intervalo = parseInt(maxUtil / qtdIntervalos);

        //console.log('minUtil', minUtil);
        //console.log('intervalo', intervalo);

        let intervalos = [];
        intervalos.push(minUtil);
        let anterior = minUtil;
        for(let i=0;i<qtdIntervalos-1;i++){
            anterior += intervalo;
            intervalos.push(anterior);
        }

        //console.log(intervalos);

        return intervalos;
    }

    defineCor(valor, intervalos){
        let cor = null;
        for(let k in intervalos){
            if(valor < intervalos[k]){
                cor = parseInt(k)+1;
                break;
            }
        }
        //se o valor não é menor que ninguem então define a cor mais quente.
        if(cor===null){
            cor = intervalos.length;
        }

        return cor;
    }


    populateMap(){

        let _this = this;

        let mapElements = this.state.mapElements;

        //let markers = L.markerClusterGroup({ spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: true });

        let data = null;
        data = this.state.data;
        let territorio = this.state.data['territorio'];

        let intervalos = this.gerarIntervalos(data);

        let pontos = []; //será usado para enquadrar o mapa (fitBounds)

        for(let i in territorio){

            let cor = this.defineCor(territorio[i].nr_quantidade_osc_regiao, intervalos);
            let classMarker = _this.state.classMarker[data.tipo_territorio];
            //let classMarker = "marker";
            //console.log(classMarker);

            let icon = L.divIcon({
                className: classMarker+' markerCor'+cor,
                html: "<p style='color: #333;'>"+territorio[i].nr_quantidade_osc_regiao+"</p>"
            });

            let marker = L.marker(L.latLng(territorio[i].geo_lat_centroid_regiao, territorio[i].geo_lng_centroid_regiao), {icon: icon})
                .bindPopup('<strong>'+territorio[i].tx_nome_regiao+'</strong>')
                .openPopup();

            marker.on('mouseover', function(e){
                this.openPopup();
            });
            marker.on('mouseout', function(e){
                this.closePopup();
            });
            marker.on('click', function(e){
                let latlng = this.getLatLng();
                mapElements.map.removeLayer(this);
                let zoom = _this.state.zoom[parseInt(territorio[i].tipo_territorio)];
                _this.setState({
                    //tipoTerritorioSelecionado: territorio[i].tipo_territorio,//1 - país, 2 - regiao, 3 - uf, 4 - municipio
                    codigoTerritorioSelecionado: [territorio[i].id_regiao], //203 - Brasil 13 - SE, etc...
                    //tipoTerritorioAgrupamento: parseInt(territorio[i].tipo_territorio)+1,//1 - país, 2 - regiao, 3 - uf, 4 - municipio
                }, function(){
                    console.log(data.tipo_territorio);
                    _this.state.loadData[data.tipo_territorio]();
                    mapElements.map.setView([e.target._latlng.lat, e.target._latlng.lng], zoom);
                });

            });
            //mapElements.map.addLayer(marker);
            mapElements.markersGroup.addLayer(marker);

            pontos.push([territorio[i].geo_lat_centroid_regiao, territorio[i].geo_lng_centroid_regiao]);
        }

        if(data.tipo_territorio > 2){
            let bounds = new L.LatLngBounds(pontos);
            mapElements.map.fitBounds(bounds);
        }


        this.setState({mapElements: mapElements});
    }

    populateMapCluster(){

        let _this = this;
        let mapElements = this.state.mapElements;

        let markers = L.markerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true });

        let data = null;
        data = this.state.data;
        console.log(data['territorio']);

        data['territorio'].find(function(item){
            //console.log(item);

            let icon = L.icon({
                iconUrl: 'img/leaflet/controls/marker.png',
                iconSize:     [32, 32], // size of the icon
                iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
            });

            //console.log(data[i]);
            //console.log(this.props.allFilters);

            /*let allFilters = this.props.allFilters;
            let filterInfo = "";
            for(let j in allFilters){
                filterInfo += '<strong>'+allFilters[j]['titulo']+':</strong> '+data[i][allFilters[j]['slug']]+'<br>'
            }*/


            let marker = L.marker(L.latLng(item[1], item[2]), {icon: icon})
            //let marker = L.marker(L.latLng(data[i].lat, data[i].lng))
                .bindPopup('<div>carregando...</div>')
                .openPopup();

            marker.on('mouseover', function(e){
                //this.openPopup();
            });
            marker.on('mouseout', function(e){
                //this.closePopup();
            });
            marker.on('click', function(e){
                _this.dataOSC(item[0], marker);
                //this.openPopup();
            });
            markers.addLayer(marker);
        });
        //mapElements.map.addLayer(markers);
        mapElements.markersGroup.addLayer(markers);
        this.setState({mapElements: mapElements});
    }

    areaIdhMap(){
        let _this = this;
        let mapElements = this.state.mapElements;
        let areaIdh = L.geoJson(this.state.dataIdhUf, {
            style: function(feature) {
                return {
                    fillColor: this.getColorIDH(feature.properties.nr_valor),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.9
                };
            }.bind(this),
            onEachFeature: this.onEachFeature //listeners
        });

        mapElements.areaIdhGroup.addLayer(areaIdh);
        this.setState({mapElements: mapElements}, function(){
            this.areaOscMap();
        }.bind(this));
    }

    areaOscMap(){
        let _this = this;
        let mapElements = this.state.mapElements;
        let areaOsc = L.geoJson(this.state.dataOscUf, {
            style: function(feature) {
                return {
                    fillColor: this.getColorOsc(feature.properties.total),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.9
                };
            }.bind(this),
            onEachFeature: this.onEachFeature //listeners
        });

        mapElements.areaOscGroup.addLayer(areaOsc);
        this.setState({mapElements: mapElements});
    }




    dataOSC(id, marker){
        let _this = this;
        $.ajax({
            method:'GET',
            url: 'get-data-osc/'+id,
            data:{
            },
            cache: false,
            success: function(data) {
                data = JSON.parse(data);
                //console.log(data);
                marker.bindPopup('' +
                    '<strong>'+data['tx_nome_osc']+'</strong><hr style="margin:5px 0; padding:0;">'+
                    '<strong>Endereço: </strong>'+data['tx_endereco']+' - '+ data['tx_bairro']+'<br/>'+
                    '<strong>Atividade Econômica: </strong>'+data['tx_nome_atividade_economica']+'<br/>'+
                    '<strong>Natureza Jurídica: </strong>'+data['tx_nome_natureza_juridica']+'<br/>'+
                    "<div class='text-center'><a href='/detalhar/"+id+"'><br><button class='btn btn-primary'>Detalhar </button><br/></a></div>"
                )
                marker.openPopup();
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({loading: false});
            }

        });
    }


    heatMap(){

        let intensidades = {
            100: 20,
            500: 10,
            1000: 5,
            5000: 2,
        };

        let points = this.state.dataCalor;

        let qtd = points.length;
        let intensidade = 1;

        for(let i in intensidades){
            if(qtd <= i){
                intensidade = intensidades[i];
                break;
            }
        }

        let addressPoints = points.map(function (p) {
            return [parseFloat(p[0]), parseFloat(p[1]), intensidade];
        });

        let mapElements = this.state.mapElements;

        mapElements.heatmapLayer = L.heatLayer(addressPoints);

        mapElements.map.addLayer(mapElements.heatmapLayer);

        //console.log('map', mapElements);

        this.setState({mapElement: mapElements});
    }


    removeAreaOscGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.removeLayer(this.state.mapElements.areaOscGroup);
        this.setState({mapElements: mapElements});
    }

    addAreaOscGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.addLayer(this.state.mapElements.areaOscGroup);
        this.setState({mapElements: mapElements});
    }

    removeAreaIdhGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.removeLayer(this.state.mapElements.areaIdhGroup);
        this.setState({mapElements: mapElements});
    }

    addAreaIdhGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.addLayer(this.state.mapElements.areaIdhGroup);
        this.setState({mapElements: mapElements});
    }

    removeMarkersGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.removeLayer(this.state.mapElements.markersGroup);
        this.setState({mapElements: mapElements});
    }

    addMarkersGroup(){
        let mapElements = this.state.mapElements;
        mapElements.map.addLayer(this.state.mapElements.markersGroup);
        this.setState({mapElements: mapElements});
    }

    removeHeatMap(){
        let mapElements = this.state.mapElements;
        mapElements.map.removeLayer(this.state.mapElements.heatmapLayer);
        this.setState({mapElements: mapElements});
    };

    addHeatMap(){
        let mapElements = this.state.mapElements;
        mapElements.map.addLayer(this.state.mapElements.heatmapLayer);
        this.setState({mapElements: mapElements});
    };

    enableZoomMap(){
        //console.log('aaaaaaaaaaaaaaa');
        let mapElements = this.state.mapElements;
        mapElements.map.scrollWheelZoom.enable();
        this.setState({mapElements: mapElements});
    }

    disableZoomMap(){
        let mapElements = this.state.mapElements;
        mapElements.map.scrollWheelZoom.disable();
        this.setState({mapElements: mapElements});
    }

    changeTileLayer(tile){
        let mapElements = this.state.mapElements;
        document.getElementById('controlBasic').className = "control-data-types leaflet-control";
        document.getElementById('controlContrast').className = "control-data-types leaflet-control";
        document.getElementById('controlSatellite').className = "control-data-types leaflet-control";
        mapElements.map.removeLayer(this.state.tilesLayers.basic);
        mapElements.map.removeLayer(this.state.tilesLayers.contrast);
        mapElements.map.removeLayer(this.state.tilesLayers.satellite);
        mapElements.map.addLayer(tile);
        this.setState({mapElements: mapElements});
    }

    getColorOsc(d){
        //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
        //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
        return d > 60000 ? '#800026' :
            d > 45000  ? '#E31A1C' :
                d > 30000  ? '#FC4E2A' :
                    d > 15000   ? '#FEB24C' :
                        d > 1000  ? '#FED976' :
                            '#FFEDA0';
    }

    getColorIDH(d){
        //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
        //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
        return d > 0.799  ? '#527DA7' :
            d > 0.699  ? '#58935d' :
                d > 0.599   ? '#D2CE49' :
                    d > 0.499  ? '#CC9538' :
                        '#AD3735';
    }

    render(){

        let tableOsc = null;

        ////////////////////////////////////////////
        function removeAccent(text){
            text = text.toLowerCase();
            text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
            text = text.replace(new RegExp('[Ç]','gi'), 'c');
            text = text.replace(new RegExp('[ ]','gi'), '-');
            text = text.replace(new RegExp('[/]','gi'), '-');
            return text;
        }

        function formatCnpjCpf(value){
            const cnpjCpf = value.replace(/\D/g, '');

            if (cnpjCpf.length === 11) {
                return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
            }

            return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
        }
        ////////////////////////////////////////////



        if(this.state.data) {
            if(this.state.data.list) {

                //console.log('***', this.state.data);
                tableOsc = this.state.data.list.map(function (item, index) {

                    return (
                        <tr key={'tabela' + index}>
                            <td className="capitalize">
                                <div className="img-upload img-upload-p">
                                    <img src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif"
                                         alt=""/>
                                </div>
                                {item[1].toLowerCase()}</td>
                            <td>{formatCnpjCpf(item[2])}</td>
                            <td className="text-center">{item[3]}</td>
                            <td className="capitalize">{item[4].toLowerCase()}</td>
                            <td>
                                <a href={'detalhar/' + item[0] + '/' + removeAccent(item[1])}><i
                                    className="fas fa-share-square"/></a>
                            </td>
                        </tr>
                    );
                });
            }
        }

        let processingOsc =  this.state.processingOsc;
        let processingOscIdhUfs =  this.state.processingOscIdhUfs;
        let processingOscUfs =  this.state.processingOscUfs;
        let processingOscPontos =  this.state.processingOscPontos;
        let processingHeatMap =  this.state.processingHeatMap;

        return(
            <div>
                <div className="col-md-12">
                <div  style={{margin: '0 15px 0 0'}}>
                    <div style={{margin: '0 -15px 0 -15px'}}>
                        <div>
                            <div className="map-load" style={{display: (processingOsc || processingOscIdhUfs || processingOscUfs || processingOscPontos || processingHeatMap ? '' : 'none')}}
                            >{/*<i className="fa fa-spinner fa-spin fa-5x"/>*/}<img src="img/load.gif" alt="Load"/> </div>
                        </div>
                        <div style={{position:"relative", zIndex:"0", marginRight: "-15px"}}>
                            <div id={this.state.mapId} className="map" />
                            <div id="controls-map" className="control-container" />
                            <div id="controls-map2" className="control-container" />
                        </div>
                    </div>
                </div>
                </div>

                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive-sm">
                            <table className="table">
                                <thead className="bg-pri text-light">
                                <tr>
                                    <th>Nome da OSC</th>
                                    <th width="180">CNPJ</th>
                                    <th width="120">N. Juridica</th>
                                    <th>Endereço</th>
                                    <th>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableOsc}
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">Anterior</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">2 <span className="sr-only">(atual)</span></a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Próximo</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-12">

                    </div>
                </div>

            </div>




        );
    }
}
