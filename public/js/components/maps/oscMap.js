class OscMap extends React.Component {
    constructor(props) {
        super(props);
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

    componentDidMount() {
        this.setState({ mymap: L.map(this.props.mapId, {
                fullscreenControl: true,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen !",
                    titleCancel: "Exit fullscreen mode"
                }
            }).setView([-14, -52], 4) }, function () {
            this.loadMap();
        });
    }

    componentWillReceiveProps(props) {

        if (this.state.data != props.data) {
            this.setState({ data: props.data }, function () {

                if (this.state.data) {
                    this.loadMap();
                }
            });
        }
    }

    loadMap() {

        let map = this.state.mymap;
        console.log(map);

        let tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

        this.setState({ mymap: map }, function () {
            if (this.state.data) {
                this.refreshMarkersOscs(this.state.data);
            }
        });
    }

    refreshMarkersOscs(data) {

        //console.log(data);

        let map = this.state.mymap;
        //let markers = L.layerGroup();

        let markers = L.markerClusterGroup();

        let linhas = {};

        for (let k in this.state.data[0]) {
            //linhas[k] = L.layerGroup();
            linhas[k] = L.markerClusterGroup();

            //console.log(k);
        }

        ///////////////ICONE/////////////////
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [40, 44],
                iconAnchor: [20, 43]
            }
        });
        ///////////////ICONE/////////////////
        let pontos = [];

        //let matrizOscs = [];

        let overlayMaps = {};
        let oscs = {
            titles: [],
            values: []
        };

        let matrizOscs = {
            titles: [],
            values: []
        };

        let tiposOscs = [];

        for (let osc in data) {

            let existe = false;
        }

        for (let i in tiposOscs) {
            matrizOscs['titles'].push(tiposOscs[i].tipo);
            matrizOscs['values'].push(tiposOscs[i].qtd);
        }

        for (let k in data[0]) {

            var markerTerminais = L.icon({
                iconUrl: 'imagens/oscs_icones/' + data[0][k]['properties'].icone,
                iconSize: [38, 38]
            });

            overlayMaps["<img src='imagens/oscs/" + data[0][k]['properties'].imagem + "' width='40' alt='" + k + "' title='" + k + "'> "] = linhas[k];

            L.geoJson(data[0][k], {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: markerTerminais
                    });
                }.bind(this),
                onEachFeature: function (f, l) {
                    l.bindPopup('<div style="text-align:center; width: 100%; border-bottom: solid 1px #CCCCCC; padding-bottom: 5px; margin-bottom: 5px;"><b>' + JSON.stringify(f.properties.titulo, null, ' ').replace(/[\{\}"]/g, '') + '</b></div>' + 'Velocidade: ' + f.properties.velocidade + '<br/>' + 'Sentido Duplo: ' + f.properties.sentido_duplo + '<br/>' + 'Sentido Todos: ' + f.properties.sentido_todos + '<br/>' + 'Direção real: ' + f.properties.direcao_real + '<br/>' + 'Sigla Rodovia: ' + f.properties.sigla_rodovia + '<br/>' + 'Km Rodovia: ' + f.properties.km_rodovia + '<br/>' + 'Status: ' + f.properties.status + '<br/>' + 'Longitude: ' + f.geometry.coordinates[0] + '<br/>' + 'Latitude: ' + f.geometry.coordinates[1] + '<br/><br/>');
                }
            }).addTo(linhas[k]);

            if (this.state.selectedOscs.includes(k)) {
                linhas[k].addTo(map);
            }

            //console.log(data[0][k].properties);

            oscs.titles.push(data[0][k].properties.titulo);
            oscs.values.push(data[0][k].features.length);

            for (let i in data[0][k]['features']) {
                pontos.push([data[0][k]["features"][i]["geometry"]["coordinates"][1], data[0][k]["features"][i]["geometry"]["coordinates"][0]]);
            }
        }

        let oscsGeral = {
            titles: [],
            values: []
        };

        for (let k in data[1]) {

            //console.log(data[1][k].velocidade);

            oscsGeral.titles.push(data[1][k].velocidade);
            oscsGeral.values.push(data[1][k].qtd);
        }

        console.log(oscsGeral);

        L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

        //let bounds = new L.LatLngBounds(pontos);


        let bounds = new L.LatLngBounds(pontos);
        map.fitBounds(bounds);
        //////////////MARKERS///////////////

        this.setState({ mymap: map, markers: markers, oscs: oscs, oscsGeral: oscsGeral, matrizOscs: matrizOscs });
    }

    render() {

        let icones = null;
        let tabela = null;
        let rows = null;

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
                        'Nessa \xE1rea voc\xEA encontra dados consolidados dos oscs'
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

}