class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ad: {},
            offers: [],
            links: [],
            iconsLinks:{
                site: 'globe',
                facebook: 'facebook-square',
                twitter: 'twitter',
                youtube: 'youtube',
                instagram: 'instagram',
                googleplus: 'google-plus',
            },
            days:[
                {day:"Domingo", short:"DOM", show:false},
                {day:"Segunda-feira", short:"SEG", show:false},
                {day:"Terça-feira", short:"TER", show:false},
                {day:"Quarta-feira", short:"QUA", show:false},
                {day:"Quinta-feira", short:"QUI", show:false},
                {day:"Sexta-feira", short:"SEX", show:false},
                {day:"Sábado", short:"SAB", show:false},
            ],
        };

        this.load = this.load.bind(this);
    }

    componentDidMount(){
        this.load();

        this.setState({mymap: L.map('mapid').setView([-22, -43], 5)}, function(){

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJwYXNzb3MiLCJhIjoiY2l4N3l0bXF0MDFiczJ6cnNwODN3cHJidiJ9.qnfh8Jfn_be6gpo774j_nQ', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(this.state.mymap);

            let popup = L.popup();


        });

        //mymap = L.map('mapid').setView([-22.9105075,-43.1719758], 16);

    }

    load(){
        $.ajax({
            method:'GET',
            url: '/get-ad/'+this.props.id,
            cache: false,
            success: function(data) {
                console.log(data);

                //////MAPA//////////////
                let lat = data.lat_lon.lat;
                let lon = data.lat_lon.lon;
                let image = data.ad.imagem;

                //console.log(lat, lon, image);

                let atlasIcon = L.icon({
                    iconUrl: '/img/marker.png',

                    iconSize:     [40, 43], // size of the icon
                    iconAnchor:   [20, 42], // point of the icon which will correspond to marker's location
                    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
                });

                let src = "/imagens/ads/xs-"+image;

                L.marker([lat,lon], {icon: atlasIcon}).addTo(this.state.mymap)
                    .bindPopup("<b><img src="+src+" alt='' width='100%'></b><br />").openPopup();
                this.state.mymap.setView([lat,lon], 16);
                ///////////////////////////////

                /*$.getJSON( {
                    url  : 'https://maps.googleapis.com/maps/api/geocode/json',
                    data : {
                        sensor  : false,
                        address : 'av domingos damasceno duarte 866 - trindade - são gonçalo - rj'
                    },
                    success : function( data, textStatus ) {
                        console.log( textStatus, data );
                    }
                } );*/

                //criar um boolean para mostrar a descrição
                data.offers.find(function(item, index){
                    data.offers[index].showDesc = false;
                });

                let days = this.state.days;
                data.days.find(function(item, index){
                    days.find(function(it, i){
                        if(item.day==it.short){
                            days[i].show = true;
                        }
                    });
                }.bind(this));

                this.setState({
                    loading: false,
                    ad:data.ad,
                    offers:data.offers,
                    links:data.links,
                    days:days,
                })
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    showDescOff(id){
        let offers = this.state.offers;

        offers.find(function(item, index){
            if(item.id==id) {
                offers[index].showDesc = !offers[index].showDesc;
            }else{
                offers[index].showDesc = false;
            }
        });

        this.setState({offers: offers});
    }

    render(){

        console.log(this.state.offers);

        let offers = this.state.offers.map(function(off){

            return (
                <div key={"off_"+off.id} className="col-md-3">
                    <div className={"item-off " + (off.showDesc ? "item-off-active" : '')} onClick={() => this.showDescOff(off.id)} style={{cursor:'pointer'}}>
                        <h2>{off.off}%</h2>
                        <p>{off.obs}</p>
                        <i className="fa fa-chevron-down fa-5x" aria-hidden="true"/>
                    </div>
                </div>
            );
        }.bind(this));

        let links = this.state.links.map(function(link){

            return (
                <li key={"link_"+link.id}><i className={"fa fa-"+this.state.iconsLinks[link.type]}/> <a href={link.url} target="_blank">{link.url}</a></li>
            );
        }.bind(this));

        let descOffs = this.state.offers.map(function(off){
            return (
                <div className="col-md-12" key={"desc_off_"+off.id} style={{display: off.showDesc ? 'block' : 'none'}} >
                    <div style={{border:'solid 1px #eee', padding:'5px'}}>
                        {off.description}
                    </div>
                </div>
            );
        });

        let days = this.state.days.map(function(item, index){
            return (
                <li key={"days_ad_"+index} style={{display: item.show ? 'block' : 'none', float:'left'}}>{item.short}</li>
            );
        });

        let map = null;

        return(
            <div>
                <Header  webdoorOrigin="accreditedAd" webdoorOriginId={this.props.id}/>

                <div className="containe-fluid" style={{display: 'none'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 aria-label="Notícias">Aqui vai webddor com ate 2 imagens da loja (Pendei em usar o mesmo da home) </h1>
                            <picture>
                                <source srcSet="/img/banner.jpg" media="(max-width: 468px)"/>
                                <source srcSet="/img/banner.jpg" className="img-responsive"/>
                                <img srcSet="/img/banner.jpg" alt="" title="" width="100%" style={{margin: 0, padding: 0}}/>
                            </picture>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="title-box">
                        <br/><br/><br/>
                            <h2 className="text-center">Sobre o parceiro</h2>
                            <hr/><br/><br/>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <picture>
                                <source srcSet={"/imagens/ads/"+this.state.ad.imagem} media="(max-width: 468px)"/>
                                <source srcSet={"/imagens/ads/"+this.state.ad.imagem} className="img-responsive"/>
                                <img srcSet={"/imagens/ads/"+this.state.ad.imagem} alt="" title="" className="details-logo"/>
                            </picture>
                            <br/><br/>
                            <ul className="list-ul">
                                {days}
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <h2 className="details-title">{this.state.ad.title}</h2>
                            <div dangerouslySetInnerHTML={{__html: this.state.ad.description}} />
                            <br/>
                                <p className="details-txt"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.ad.address} {this.state.ad.number}  {this.state.ad.complemento}  - {this.state.ad.district} - {this.state.ad.city} - {this.state.ad.state}</p>
                                <p className="details-txt"><i className="fa fa-phone-square" aria-hidden="true"></i>
                                    <a href={"tel: "+this.state.ad.tel}>{this.state.ad.tel}</a>&nbsp;
                                    <a href={"tel: "+this.state.ad.cel}>{this.state.ad.cel}</a>&nbsp;
                                </p>
                                {/*<p className="details-txt"><i className="fa fa-globe" aria-hidden="true"></i> www.pets.com.br</p>*/}
                                <p>
                                    <ul className="clean-ul">
                                        {links}
                                    </ul>
                                </p>
                                <p className="details-txt"><i className="fa fa-envelope" aria-hidden="true"></i> {this.state.ad.email}</p>
                                <br/>
                                    <p>O desconto não é válido para pets não cadastrados<br/>
                                        {this.state.ad.obs}</p>
                        </div>
                    </div>

                    <div className="row">
                        <br/><br/><br/>
                            {offers}
                            <div style={{clear:'both'}}/>
                            <br/>
                            {descOffs}

                            {/*<div className="col-md-3">
                                <div className="item-off">
                                    <h2>40%</h2>
                                    <p>Segunda de 18:00 às 23:30</p>
                                    <i className="fa fa-chevron-down fa-5x" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="item-off">
                                    <h2>40%</h2>
                                    <p>Terça a Sábado de 12:00 às 23:30</p>
                                    <i className="fa fa-chevron-down fa-5x" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="item-off">
                                    <h2>60%</h2>
                                    <p>Domingo de 12:00 às 22:00</p>
                                    <i className="fa fa-chevron-down fa-5x" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="item-off">
                                    <h2>20%</h2>
                                    <p>Sexta de 18:00 às 23:30</p>
                                    <i className="fa fa-chevron-down fa-5x" aria-hidden="true"/>
                                </div>
                            </div>*/}
                    </div>


                    <ListImages origem="accrediteds_ads" id={this.props.id} folder={"imagens/images/"}/>




                    <div className="row">
                        <div className="title-box">
                            <br/><br/><br/><br/><br/>
                                <h2 className="text-center">Localização</h2>
                                <hr/><br/><br/>
                        </div>
                        <div className="col-md-12">
                            <div id="mapid" className="map" style={{height: "400px"}}/>

                            {map}

                            <br/><br/>
                        </div>
                    </div>

                </div>





                <Footer/>

            </div>
        );
    }
}

ReactDOM.render(
    <Details id={adId}/>,
    document.getElementById('detailsAd')
);
