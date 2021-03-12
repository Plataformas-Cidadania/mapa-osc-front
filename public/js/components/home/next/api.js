class NextOsc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextsOsc: []
        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/area_atuacao',
            //url: 'http://172.22.0.3/api/menu/osc/area_atuacao',
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.callMenu(data[0].cd_area_atuacao); //carregar as oscs da primeira área de atuação.
                this.setState({ data: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    callMenu(index) {
        //console.log("2 ", index);
        this.setState({ loadingList: true });
        let geo = JSON.parse(localStorage.getItem('geo'));
        let lat = geo.lat.toString();
        let lon = geo.lon.toString();
        lat = lat.replace(".", ",");
        lon = lon.replace(".", ",");
        let url = null;
        $.ajax({
            method: 'GET',
            //url: getBaseUrl+'osc/listaareaatuacao/'+index,
            url: getBaseUrl + 'osc/listaareaatuacao/' + index + "/geolocalizacao/" + lat + '/' + lon,
            //url: 'http://172.22.0.3/api/osc/listaareaatuacao/'+index,
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ nextsOsc: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });

        $("#txtNext").hide(1000);

        /*$(".divOff").hide(1000);
        $("#divChart"+index).first().slideDown("slow");
         $(".menu-left-active").attr('class', "list-group-item-theme");
        $("#divMenuChart"+index).attr('class', "menu-left-active");*/
    }

    render() {

        //console.log("1 ", this.state.nextsOsc.length);
        console.log("1 ", nextOscTitle);

        let owNextOsc = null;
        let menu = null;
        if (this.state.data.length > 0) {
            owNextOsc = React.createElement(
                'ul',
                { className: 'menu-items owlNextOsc owl-carousel owl-theme' },
                this.state.data.map(function (item, index) {
                    return React.createElement(
                        'li',
                        { id: 'menuArea' + index, className: 'item' },
                        React.createElement(
                            'a',
                            { onClick: () => this.callMenu(item.cd_area_atuacao) },
                            React.createElement('i', { className: "fa fa-user theme-" + index }),
                            React.createElement(
                                'p',
                                null,
                                item.tx_nome_area_atuacao
                            )
                        )
                    );
                }.bind(this))
            );
            let owl = $('.owlNextOsc');
            owl.owlCarousel({
                margin: 10,
                nav: false,
                loop: false,
                autoplay: true,
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
                        items: 12,
                        margin: 30,
                        autoHeight: true
                    }
                }
            });
            /*menu = this.state.data.map(function (item, index) {
                 return (
                     <li id={'menuArea'+index} className="item">
                         <a onClick={() => this.callMenu(item.cd_area_atuacao)}>
                             <i className={"fa fa-user theme-"+index}/>
                             <p>{item.tx_nome_area_atuacao}</p>
                         </a>
                     </li>
                 )
             }.bind(this));*/
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
                        'div',
                        { id: 'icon' + index, className: 'rotate', onClick: () => this.callMenu2(item.id_osc), style: { transform: "rotate(" + rotation[0] + "deg)" } },
                        React.createElement(
                            'div',
                            { className: 'circle-item', style: { transform: "rotate(" + rotation[1] + "deg)" } },
                            React.createElement('img', { src: 'img/sem-imagem.png', alt: '{item.id_osc}', width: '65' })
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
                        'div',
                        { id: 'icon' + index, className: 'rotate', onClick: () => this.callMenu2(item.id_osc), style: { transform: "rotate(" + rotation[0] + "deg)" } },
                        React.createElement(
                            'div',
                            { className: 'circle-item', style: { transform: "rotate(" + rotation[1] + "deg)" } },
                            React.createElement('img', { src: 'img/sem-imagem.png', alt: '{item.id_osc}', width: '65' })
                        )
                    );
                }
            }.bind(this));

            nextOscTitulo = this.state.nextsOsc.map(function (item, index) {
                return React.createElement(
                    'li',
                    { id: 'txt' + index },
                    React.createElement(
                        'a',
                        { href: "detalhar/" + item.id_osc + "/" + item.tx_nome_osc, className: 'circle-item' },
                        index + 1,
                        ' ',
                        item.tx_nome_osc,
                        ' ',
                        React.createElement('i', { className: 'fas fa-file-import' })
                    ),
                    React.createElement('hr', null)
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
                'div',
                { className: 'text-center' },
                owNextOsc
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-7 bg-map', style: { backgroundImage: "url(" + nextOscImg + ")" } },
                    React.createElement(
                        'div',
                        { className: 'icon-next' },
                        React.createElement('i', { className: 'fas fa-user' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'circle' },
                        nextOsc1
                    ),
                    React.createElement(
                        'div',
                        { className: 'circle2' },
                        nextOsc2
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-5' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'h2',
                        null,
                        totalnextsOsc,
                        ' ',
                        nextOscTitle
                    ),
                    React.createElement(
                        'ul',
                        { className: 'menu-items-basic' },
                        nextOscTitulo
                    ),
                    React.createElement(
                        'p',
                        { id: 'txtNext' },
                        ' ',
                        nextOscDescription
                    )
                )
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null)
        );
    }

}

ReactDOM.render(React.createElement(NextOsc, null), document.getElementById('nextOsc'));