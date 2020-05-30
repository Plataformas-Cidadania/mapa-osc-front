class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ad: {},
            offers: [],
            links: [],
            iconsLinks: {
                site: 'globe',
                facebook: 'facebook-square',
                twitter: 'twitter',
                youtube: 'youtube',
                instagram: 'instagram',
                googleplus: 'google-plus'
            },
            days: [{ day: "Domingo", short: "DOM", show: false }, { day: "Segunda-feira", short: "SEG", show: false }, { day: "Terça-feira", short: "TER", show: false }, { day: "Quarta-feira", short: "QUA", show: false }, { day: "Quinta-feira", short: "QUI", show: false }, { day: "Sexta-feira", short: "SEX", show: false }, { day: "Sábado", short: "SAB", show: false }]
        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();

        this.setState({ mymap: L.map('mapid').setView([-22, -43], 5) }, function () {

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJwYXNzb3MiLCJhIjoiY2l4N3l0bXF0MDFiczJ6cnNwODN3cHJidiJ9.qnfh8Jfn_be6gpo774j_nQ', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(this.state.mymap);

            let popup = L.popup();
        });

        //mymap = L.map('mapid').setView([-22.9105075,-43.1719758], 16);
    }

    load() {
        $.ajax({
            method: 'GET',
            url: '/get-ad/' + this.props.id,
            cache: false,
            success: function (data) {
                console.log(data);

                //////MAPA//////////////
                let lat = data.lat_lon.lat;
                let lon = data.lat_lon.lon;
                let image = data.ad.imagem;

                //console.log(lat, lon, image);

                let atlasIcon = L.icon({
                    iconUrl: '/img/marker.png',

                    iconSize: [40, 43], // size of the icon
                    iconAnchor: [20, 42], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
                });

                let src = "/imagens/ads/xs-" + image;

                L.marker([lat, lon], { icon: atlasIcon }).addTo(this.state.mymap).bindPopup("<b><img src=" + src + " alt='' width='100%'></b><br />").openPopup();
                this.state.mymap.setView([lat, lon], 16);
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
                data.offers.find(function (item, index) {
                    data.offers[index].showDesc = false;
                });

                let days = this.state.days;
                data.days.find(function (item, index) {
                    days.find(function (it, i) {
                        if (item.day == it.short) {
                            days[i].show = true;
                        }
                    });
                }.bind(this));

                this.setState({
                    loading: false,
                    ad: data.ad,
                    offers: data.offers,
                    links: data.links,
                    days: days
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    showDescOff(id) {
        let offers = this.state.offers;

        offers.find(function (item, index) {
            if (item.id == id) {
                offers[index].showDesc = !offers[index].showDesc;
            } else {
                offers[index].showDesc = false;
            }
        });

        this.setState({ offers: offers });
    }

    render() {

        console.log(this.state.offers);

        let offers = this.state.offers.map(function (off) {

            return React.createElement(
                'div',
                { key: "off_" + off.id, className: 'col-md-3' },
                React.createElement(
                    'div',
                    { className: "item-off " + (off.showDesc ? "item-off-active" : ''), onClick: () => this.showDescOff(off.id), style: { cursor: 'pointer' } },
                    React.createElement(
                        'h2',
                        null,
                        off.off,
                        '%'
                    ),
                    React.createElement(
                        'p',
                        null,
                        off.obs
                    ),
                    React.createElement('i', { className: 'fa fa-chevron-down fa-5x', 'aria-hidden': 'true' })
                )
            );
        }.bind(this));

        let links = this.state.links.map(function (link) {

            return React.createElement(
                'li',
                { key: "link_" + link.id },
                React.createElement('i', { className: "fa fa-" + this.state.iconsLinks[link.type] }),
                ' ',
                React.createElement(
                    'a',
                    { href: link.url, target: '_blank' },
                    link.url
                )
            );
        }.bind(this));

        let descOffs = this.state.offers.map(function (off) {
            return React.createElement(
                'div',
                { className: 'col-md-12', key: "desc_off_" + off.id, style: { display: off.showDesc ? 'block' : 'none' } },
                React.createElement(
                    'div',
                    { style: { border: 'solid 1px #eee', padding: '5px' } },
                    off.description
                )
            );
        });

        let days = this.state.days.map(function (item, index) {
            return React.createElement(
                'li',
                { key: "days_ad_" + index, style: { display: item.show ? 'block' : 'none', float: 'left' } },
                item.short
            );
        });

        let map = null;

        return React.createElement(
            'div',
            null,
            React.createElement(Header, { webdoorOrigin: 'accreditedAd', webdoorOriginId: this.props.id }),
            React.createElement(
                'div',
                { className: 'containe-fluid', style: { display: 'none' } },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'h1',
                            { 'aria-label': 'Not\xEDcias' },
                            'Aqui vai webddor com ate 2 imagens da loja (Pendei em usar o mesmo da home) '
                        ),
                        React.createElement(
                            'picture',
                            null,
                            React.createElement('source', { srcSet: '/img/banner.jpg', media: '(max-width: 468px)' }),
                            React.createElement('source', { srcSet: '/img/banner.jpg', className: 'img-responsive' }),
                            React.createElement('img', { srcSet: '/img/banner.jpg', alt: '', title: '', width: '100%', style: { margin: 0, padding: 0 } })
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'title-box' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'h2',
                        { className: 'text-center' },
                        'Sobre o parceiro'
                    ),
                    React.createElement('hr', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-3' },
                        React.createElement(
                            'picture',
                            null,
                            React.createElement('source', { srcSet: "/imagens/ads/" + this.state.ad.imagem, media: '(max-width: 468px)' }),
                            React.createElement('source', { srcSet: "/imagens/ads/" + this.state.ad.imagem, className: 'img-responsive' }),
                            React.createElement('img', { srcSet: "/imagens/ads/" + this.state.ad.imagem, alt: '', title: '', className: 'details-logo' })
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'ul',
                            { className: 'list-ul' },
                            days
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-9' },
                        React.createElement(
                            'h2',
                            { className: 'details-title' },
                            this.state.ad.title
                        ),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.ad.description } }),
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            { className: 'details-txt' },
                            React.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                            ' ',
                            this.state.ad.address,
                            ' ',
                            this.state.ad.number,
                            '  ',
                            this.state.ad.complemento,
                            '  - ',
                            this.state.ad.district,
                            ' - ',
                            this.state.ad.city,
                            ' - ',
                            this.state.ad.state
                        ),
                        React.createElement(
                            'p',
                            { className: 'details-txt' },
                            React.createElement('i', { className: 'fa fa-phone-square', 'aria-hidden': 'true' }),
                            React.createElement(
                                'a',
                                { href: "tel: " + this.state.ad.tel },
                                this.state.ad.tel
                            ),
                            '\xA0',
                            React.createElement(
                                'a',
                                { href: "tel: " + this.state.ad.cel },
                                this.state.ad.cel
                            ),
                            '\xA0'
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'ul',
                                { className: 'clean-ul' },
                                links
                            )
                        ),
                        React.createElement(
                            'p',
                            { className: 'details-txt' },
                            React.createElement('i', { className: 'fa fa-envelope', 'aria-hidden': 'true' }),
                            ' ',
                            this.state.ad.email
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            'O desconto n\xE3o \xE9 v\xE1lido para pets n\xE3o cadastrados',
                            React.createElement('br', null),
                            this.state.ad.obs
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    offers,
                    React.createElement('div', { style: { clear: 'both' } }),
                    React.createElement('br', null),
                    descOffs
                ),
                React.createElement(ListImages, { origem: 'accrediteds_ads', id: this.props.id, folder: "imagens/images/" }),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'title-box' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h2',
                            { className: 'text-center' },
                            'Localiza\xE7\xE3o'
                        ),
                        React.createElement('hr', null),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('div', { id: 'mapid', className: 'map', style: { height: "400px" } }),
                        map,
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                )
            ),
            React.createElement(Footer, null)
        );
    }
}

ReactDOM.render(React.createElement(Details, { id: adId }), document.getElementById('detailsAd'));