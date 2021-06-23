class NextOsc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingAreas: false,
            loadingOscs: false,
            areaAtuacao: 0,
            data: [],
            nextsOsc: [],
            searchMunicipio: "",
            cd_municipio: 0,
            nome_municipio: "",
            municipios: [],
            loadingMunicipios: false,
            txtAreaAtuacao: 'Habitação',
            geo: null,
            icon: {
                1: "fas fa-home",
                2: "fas fa-hospital",
                3: "fas fa-theater-masks",
                4: "fas fa-graduation-cap",
                5: "fas fa-users",
                6: "fas fa-church",
                7: "fas fa-network-wired",
                8: "fas fa-leaf",
                9: "fas fa-balance-scale",
                10: "fas fa-boxes",
                11: "fas fa-cogs"
            }
        };

        this.load = this.load.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.setAreaAtuacao = this.setAreaAtuacao.bind(this);
        this.loadMunicipios = this.loadMunicipios.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
    }

    componentDidMount() {
        this.load();
        this.setState({
            geo: JSON.parse(localStorage.getItem('geo')),
            cd_municipio: localStorage.getItem('cd_municipio'),
            nome_municipio: localStorage.getItem('nome_municipio')
        });
    }

    load() {
        this.setState({ loadingAreas: true });
        $.ajax({
            method: 'GET',
            //url: getBaseUrl+'menu/osc/area_atuacao',
            url: getBaseUrl2 + 'area_atuacao',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ data: data, areaAtuacao: data[0].cd_area_atuacao, loadingAreas: false }, function () {
                    this.callMenu(); //carregar as oscs da primeira área de atuação.
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingAreas: false });
            }.bind(this)
        });
    }

    callMenu() {

        this.setState({ loadingOscs: true });

        let cd_municipio = this.state.cd_municipio;
        let geo = this.state.geo;
        let url = getBaseUrl2 + 'lista_por_area_atuacao/' + this.state.areaAtuacao;
        if (cd_municipio) {
            url = getBaseUrl2 + 'lista_por_area_atuacao/' + this.state.areaAtuacao + '/municipio/' + cd_municipio;
        }
        if (geo) {
            let lat = geo.lat.toString();
            let lon = geo.lon.toString();
            lat = lat.replace(".", ",");
            lon = lon.replace(".", ",");
            url = getBaseUrl + 'lista_por_area_atuacao/' + this.state.areaAtuacao + "/geolocalizacao/" + lat + '/' + lon;
        }

        $.ajax({
            method: 'GET',
            url: url,
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ nextsOsc: data, loadingOscs: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this)
        });

        $("#txtNext").hide(1000);
    }

    loadMunicipios() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/municipio/' + this.state.searchMunicipio + '/10/0',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ municipios: data, loadingMunicipios: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    setAreaAtuacao(areaAtuacao, txt) {
        this.setState({ areaAtuacao: areaAtuacao, txtAreaAtuacao: txt }, function () {
            this.callMenu();
        });
    }

    handleSearchMunicipio(e) {
        this.setState({ searchMunicipio: e.target.value }, function () {
            this.loadMunicipios();
        });
    }
    setMunicipio(edmu_cd_municipio, edmu_nm_municipio, eduf_sg_uf) {
        localStorage.setItem('cd_municipio', edmu_cd_municipio);
        localStorage.setItem('nome_municipio', edmu_nm_municipio + ' - ' + eduf_sg_uf);
        $("#modalLocalidade").modal('hide');
        this.setState({ searchMunicipio: "", cd_municipio: edmu_cd_municipio, nome_municipio: edmu_nm_municipio + ' - ' + eduf_sg_uf }, function () {
            this.callMenu();
        });
    }

    render() {

        let geoCity = localStorage.getItem('city') + ' - ' + localStorage.getItem('state');

        let municipios = this.state.municipios.map((item, index) => {
            return React.createElement(
                "li",
                { style: { cursor: 'pointer' }, onClick: () => this.setMunicipio(item.edmu_cd_municipio, item.edmu_nm_municipio, item.eduf_sg_uf), key: 'mun' + index },
                item.edmu_nm_municipio,
                " - ",
                item.eduf_sg_uf
            );
        });

        let owNextOsc = null;
        let menu = null;
        if (this.state.data.length > 0) {
            owNextOsc = React.createElement(
                "ul",
                { className: "menu-items owlNextOsc owl-carousel owl-theme" },
                this.state.data.map(function (item, index) {

                    let tx_nome_area_atuacao = item.tx_nome_area_atuacao == 'Associações patronais, profissionais e de produtores rurais' ? 'Associações' : item.tx_nome_area_atuacao;
                    //item.push(item.tx_nome_area_atuacao== 'Associações patronais, profissionais e de produtores rurais' ? 'Associações' : item.tx_nome_area_atuacao)
                    return React.createElement(
                        "li",
                        { id: 'menuArea' + index, className: "item", key: 'menuArea' + index },
                        React.createElement(
                            "a",
                            { onClick: () => this.setAreaAtuacao(item.cd_area_atuacao, item.tx_nome_area_atuacao) },
                            React.createElement("i", { className: this.state.icon[item.cd_area_atuacao] + " theme-" + index }),
                            React.createElement(
                                "p",
                                null,
                                tx_nome_area_atuacao
                            )
                        )
                    );
                }.bind(this))
            );
            let owl = $('.owlNextOsc');
            owl.owlCarousel({
                margin: 10,
                nav: false,
                loop: true,
                autoplay: false,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: 3,
                        margin: 20,
                        autoHeight: true
                    },
                    780: {
                        items: 8,
                        margin: 20,
                        autoHeight: true
                    },
                    1200: {
                        items: 10,
                        margin: 30,
                        autoHeight: true
                    }
                }
            });
        }

        let nextOsc1 = null;
        let nextOsc2 = null;
        let nextOscTitulo = null;
        let totalnextsOsc = this.state.nextsOsc.length;

        let rotations = [[0, 0], [30, -30], [60, -60], [90, -90], [120, -120], [150, -150], [180, -180], [210, -210], [240, -240], [270, -270], [300, -300], [330, -330]];

        if (this.state.nextsOsc) {
            nextOsc1 = this.state.nextsOsc.map(function (item, index) {
                if (index <= 2) {
                    const random = Math.floor(Math.random() * rotations.length);
                    const rotation = rotations[random];
                    rotations.splice(random, 1); //remove do array o ratation utilizado.
                    return React.createElement(
                        "div",
                        { id: 'icon' + index, className: "rotate", onClick: () => this.callMenu2(item.id_osc), style: { transform: "rotate(" + rotation[0] + "deg)" }, key: 'listnext' + index },
                        React.createElement(
                            "div",
                            { className: "circle-item", style: { transform: "rotate(" + rotation[1] + "deg)" } },
                            React.createElement("img", { src: "img/sem-imagem.png", alt: "{item.id_osc}", width: "65" })
                        )
                    );
                }
            }.bind(this));

            nextOsc2 = this.state.nextsOsc.map(function (item, index) {
                if (index > 2) {
                    const random = Math.floor(Math.random() * rotations.length);
                    const rotation = rotations[random];
                    rotations.splice(random, 1); //remove do array o ratation utilizado.
                    return React.createElement(
                        "div",
                        { id: 'icon' + index, className: "rotate", onClick: () => this.callMenu2(item.id_osc), style: { transform: "rotate(" + rotation[0] + "deg)" }, key: 'listnext2' + index },
                        React.createElement(
                            "div",
                            { className: "circle-item", style: { transform: "rotate(" + rotation[1] + "deg)" } },
                            React.createElement("img", { src: "img/sem-imagem.png", alt: "{item.id_osc}", width: "65" })
                        )
                    );
                }
            }.bind(this));

            nextOscTitulo = this.state.nextsOsc.map(function (item, index) {
                return React.createElement(
                    "li",
                    { id: 'txt' + index },
                    React.createElement(
                        "a",
                        { href: "detalhar/" + item.id_osc + "/" + item.tx_nome_osc, className: "circle-item", key: 'listnext3' + index },
                        index + 1,
                        " ",
                        item.tx_nome_osc,
                        " ",
                        React.createElement("i", { className: "fas fa-file-import" })
                    ),
                    React.createElement("hr", null)
                );
            }.bind(this));
        }

        return React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
                "div",
                { className: "modal fade", id: "modalLocalidade", tabIndex: "-1", role: "dialog" },
                React.createElement(
                    "div",
                    { className: "modal-dialog", role: "document" },
                    React.createElement(
                        "div",
                        { className: "modal-content" },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "h5",
                                { className: "modal-title" },
                                React.createElement(
                                    "strong",
                                    null,
                                    "Escolha seu Munic\xEDpio"
                                )
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            React.createElement(
                                "label",
                                { htmlFor: "municipioHome" },
                                React.createElement(
                                    "strong",
                                    null,
                                    "Munic\xEDpio"
                                )
                            ),
                            React.createElement("input", {
                                type: "text",
                                className: "form-control",
                                name: "searchMunicipio",
                                onChange: this.handleSearchMunicipio, placeholder: "Inserir o nome do seu Munic\xEDpio",
                                value: this.state.searchMunicipio
                            }),
                            React.createElement(
                                "ul",
                                { className: "box-search-itens", style: { display: this.state.searchMunicipio ? '' : 'none' } },
                                municipios
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-primary" },
                                "Confirmar"
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                                "Cancelar"
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "text-right", style: { marginTop: '-40px' } },
                this.state.geo ? geoCity : React.createElement(
                    "a",
                    { href: "#", "data-toggle": "modal", "data-target": "#modalLocalidade" },
                    React.createElement("i", { className: "fas fa-map-marker-alt" }),
                    " ",
                    this.state.cd_municipio ? this.state.nome_municipio : "Escolha a localidade"
                )
            ),
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                    "div",
                    { className: "title-style" },
                    React.createElement(
                        "h2",
                        null,
                        this.state.nextsOsc.length,
                        " OSCs de ",
                        this.state.txtAreaAtuacao,
                        " pr\xF3ximas da sua localidade"
                    ),
                    React.createElement("div", { className: "line line-fix block", "data-move-x": "980px" }),
                    React.createElement("hr", null)
                )
            ),
            React.createElement(
                "div",
                { className: "text-center" },
                owNextOsc
            ),
            React.createElement(
                "div",
                { className: "text-center" },
                React.createElement("img", { src: "/img/load.gif", alt: "", width: "60", className: "login-img", style: { display: this.state.loadingOscs ? '' : 'none' } })
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-7 bg-map", style: { backgroundImage: "url(" + nextOscImg + ")", display: this.state.loadingOscs ? 'none' : '' } },
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(
                        "div",
                        { className: "icon-next" },
                        React.createElement("i", { className: "fas fa-user" })
                    ),
                    React.createElement(
                        "div",
                        { className: "circle" },
                        nextOsc1
                    ),
                    React.createElement(
                        "div",
                        { className: "circle2" },
                        nextOsc2
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-5", style: { display: this.state.loadingOscs ? 'none' : '' } },
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(
                        "h2",
                        null,
                        totalnextsOsc,
                        " OSCs de ",
                        this.state.txtAreaAtuacao,
                        " ",
                        nextOscTitle
                    ),
                    React.createElement(
                        "ul",
                        { className: "menu-items-basic" },
                        nextOscTitulo
                    ),
                    React.createElement(
                        "p",
                        { id: "txtNext" },
                        " ",
                        nextOscDescription
                    )
                )
            )
        );
    }

}

ReactDOM.render(React.createElement(NextOsc, null), document.getElementById('nextOsc'));