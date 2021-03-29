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
            geo: null,
        };

        this.load = this.load.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.setAreaAtuacao = this.setAreaAtuacao.bind(this);
        this.loadMunicipios = this.loadMunicipios.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
    }


    componentDidMount(){
        this.load();
        this.setState({
            geo: JSON.parse(localStorage.getItem('geo')),
            cd_municipio: localStorage.getItem('cd_municipio'),
            nome_municipio: localStorage.getItem('nome_municipio'),
        });
    }

    load(){
        this.setState({loadingAreas: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl+'menu/osc/area_atuacao',
            //url: 'http://172.22.0.3/api/menu/osc/area_atuacao',
            data: {
            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({data: data, areaAtuacao: data[0].cd_area_atuacao, loadingAreas: false}, function(){
                    this.callMenu();//carregar as oscs da primeira área de atuação.
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingAreas: false});
            }.bind(this)
        });
    }

    callMenu(){
        //console.log("2 ", index);
        this.setState({loadingOscs: true});
        //let cd_municipio = JSON.parse(localStorage.getItem('cd_municipio'));
        //let geo = JSON.parse(localStorage.getItem('geo'));
        let cd_municipio = this.state.cd_municipio;
        let geo = this.state.geo;
        let url = getBaseUrl + 'osc/listaareaatuacao/' + this.state.areaAtuacao;
        if(cd_municipio){
            url = getBaseUrl + 'osc/listaareaatuacao/' + this.state.areaAtuacao + '/municipio/' + cd_municipio;
        }
        if(geo){
            let lat = geo.lat.toString();
            let lon = geo.lon.toString();
            lat = lat.replace(".", ",");
            lon = lon.replace(".", ",");
            url = getBaseUrl + 'osc/listaareaatuacao/' + this.state.areaAtuacao + "/geolocalizacao/" + lat + '/' + lon;
        }
        console.log(url);
        $.ajax({
            method: 'GET',
            //url: getBaseUrl+'osc/listaareaatuacao/'+index,
            url: url,
            //url: 'http://172.22.0.3/api/osc/listaareaatuacao/'+index,
            data: {
            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({nextsOsc: data, loadingOscs: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                //this.setState({loadingList: false});
            }.bind(this)
        });

        $("#txtNext").hide(1000);



        /*$(".divOff").hide(1000);
        $("#divChart"+index).first().slideDown("slow");

        $(".menu-left-active").attr('class', "list-group-item-theme");
        $("#divMenuChart"+index).attr('class', "menu-left-active");*/
    }

    loadMunicipios(){
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/municipio/'+this.state.searchMunicipio+'/10/0',
            data: {
            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({municipios: data, loadingMunicipios: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    setAreaAtuacao(areaAtuacao){
        this.setState({areaAtuacao: areaAtuacao}, function (){
            this.callMenu();
        });
    }

    handleSearchMunicipio(e){
        this.setState({searchMunicipio: e.target.value}, function(){
            this.loadMunicipios();
        });
    }
    setMunicipio(edmu_cd_municipio, edmu_nm_municipio, eduf_sg_uf){
        console.log(edmu_cd_municipio);
        localStorage.setItem('cd_municipio', edmu_cd_municipio);
        localStorage.setItem('nome_municipio', edmu_nm_municipio+' - '+eduf_sg_uf);
        $("#modalLocalidade").modal('hide');
        this.setState({searchMunicipio: "", cd_municipio: edmu_cd_municipio, nome_municipio: edmu_nm_municipio+' - '+eduf_sg_uf}, function(){
            this.callMenu();
        });
    }

    render(){

        //console.log("1 ", this.state.nextsOsc.length);
        console.log("1 ", nextOscTitle);

        let geoCity = localStorage.getItem('city')+' - '+localStorage.getItem('state');

        let municipios = this.state.municipios.map((item) => {
            return (
                <li style={{cursor: 'pointer'}} onClick={() => this.setMunicipio(item.edmu_cd_municipio, item.edmu_nm_municipio, item.eduf_sg_uf)}>
                    {item.edmu_nm_municipio} - {item.eduf_sg_uf}
                </li>
            );
        });

        let owNextOsc = null;
        let menu = null;
        if(this.state.data.length > 0){
            owNextOsc = (
                <ul className="menu-items owlNextOsc owl-carousel owl-theme">
                    {
                        this.state.data.map(function (item, index) {
                            return (
                                <li id={'menuArea'+index} className="item">
                                    <a onClick={() => this.setAreaAtuacao(item.cd_area_atuacao)}>
                                        <i className={"fa fa-user theme-"+index}/>
                                        <p>{item.tx_nome_area_atuacao}</p>
                                    </a>
                                </li>
                            )
                        }.bind(this))
                    }
                </ul>
            );
            let owl = $('.owlNextOsc');
            owl.owlCarousel({
                margin: 10,
                nav: false,
                loop: true,
                autoplay:true,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: 3,
                        margin: 20,
                        autoHeight: true,
                    },
                    780: {
                        items: 8,
                        margin: 20,
                        autoHeight: true,
                    },
                    1200: {
                        items: 9,
                        margin: 30,
                        autoHeight: true,
                    }
                }
            });
        }

        let nextOsc1 = null;
        let nextOsc2 = null;
        let nextOscTitulo = null;
        let totalnextsOsc =  this.state.nextsOsc.length

        let rotations = [
            [0,0],
            [30,-30],
            [60,-60],
            [90, -90],
            [120, -120],
            [150, -150],
            [180, -180],
            [210, -210],
            [240, -240],
            [270, -270],
            [300, -300],
            [330, -330],
        ]

        if(this.state.nextsOsc){
            nextOsc1 = this.state.nextsOsc.map(function (item, index) {
                if(index <= 2){
                    const random = Math.floor(Math.random() * rotations.length);
                    const rotation = rotations[random];
                    rotations.splice(random, 1);//remove do array o ratation utilizado.
                    return (
                        <div id={'icon'+index} className="rotate" onClick={() => this.callMenu2(item.id_osc)} style={{transform: "rotate("+rotation[0]+"deg)"}}>
                            <div className="circle-item" style={{transform: "rotate("+rotation[1]+"deg)"}}>
                                <img src="img/sem-imagem.png" alt="{item.id_osc}" width="65"/>
                            </div>
                        </div>
                    )
                }
            }.bind(this));

            nextOsc2 = this.state.nextsOsc.map(function (item, index) {
                if(index > 2){
                    const random = Math.floor(Math.random() * rotations.length);
                    const rotation = rotations[random];
                    rotations.splice(random, 1);//remove do array o ratation utilizado.
                    return (
                        <div id={'icon'+index} className="rotate" onClick={() => this.callMenu2(item.id_osc)} style={{transform: "rotate("+rotation[0]+"deg)"}}>
                            <div className="circle-item" style={{transform: "rotate("+rotation[1]+"deg)"}}>
                                <img src="img/sem-imagem.png" alt="{item.id_osc}" width="65"/>
                            </div>
                        </div>
                    )
                }
            }.bind(this));

            nextOscTitulo = this.state.nextsOsc.map(function (item, index) {
                    return (
                        <li id={'txt' + index}>
                            <a href={"detalhar/" + item.id_osc + "/" + item.tx_nome_osc} className="circle-item">
                                {index + 1} {item.tx_nome_osc} <i className="fas fa-file-import"/>
                            </a>
                            <hr/>
                        </li>
                    )
            }.bind(this));
        }



        return (
            <div className="col-md-12">
                <div className="modal fade" id="modalLocalidade" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><strong>Escolha seu Município</strong></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="municipioHome"><strong>Município</strong></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchMunicipio"
                                    onChange={this.handleSearchMunicipio} placeholder="Inserir o nome do seu Município"
                                    value={this.state.searchMunicipio}
                                />
                                <ul className="box-search-itens" style={{display: this.state.searchMunicipio ? '' : 'none'}}>
                                    {municipios}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Confirmar</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right" style={{marginTop: '-40px'}} >
                    {
                        (this.state.geo ? geoCity :
                            (
                                <a href="#" data-toggle="modal" data-target="#modalLocalidade">
                                    {this.state.cd_municipio ? this.state.nome_municipio : "Escolha a localidade"}
                                </a>
                            )
                        )
                    }
                </div>
                <br/>
                <div className="text-center">
                    {owNextOsc}
                </div>

                <div className="text-center" style={{display: this.state.loadingOscs ? '' : 'none', minHeight: '400px'}}>
                    <br/><br/><br/>
                    <i className="fa fa-spin fa-spinner fa-5x"/>
                </div>
                <div className="row">
                    <div className="col-md-7 bg-map" style={{backgroundImage: "url(" + nextOscImg + ")", display: this.state.loadingOscs ? 'none' : ''}}>
                        <br/><br/>
                        <div className="icon-next">
                            <i className="fas fa-user"/>
                        </div>
                        <div className="circle">
                            {nextOsc1}
                        </div>
                        <div className="circle2">
                            {nextOsc2}
                        </div>
                    </div>



                    <div className="col-md-5" style={{display: this.state.loadingOscs ? 'none' : ''}}>
                        <br/><br/><br/>
                        <h2>{totalnextsOsc} {nextOscTitle}</h2>
                        <ul className="menu-items-basic">
                            {nextOscTitulo}
                        </ul>

                        <p id="txtNext"> {nextOscDescription}</p>
                    </div>
                </div>

            </div>

        );

    }


}


ReactDOM.render(
    <NextOsc />,
    document.getElementById('nextOsc')
);




