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
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'osc/listaareaatuacao/' + index,
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

        let menu = null;
        if (this.state.data) {
            menu = this.state.data.map(function (item, index) {
                return React.createElement(
                    'li',
                    { id: 'menuArea' + index },
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
            }.bind(this));
        }

        let nextOsc = null;
        let nextOscTitulo = null;
        let totalnextsOsc = this.state.nextsOsc.length;

        if (this.state.nextsOsc) {
            nextOsc = this.state.nextsOsc.map(function (item, index) {
                return React.createElement(
                    'div',
                    { id: 'icon' + index, className: 'rotate', onClick: () => this.callMenu2(item.id_osc) },
                    React.createElement(
                        'div',
                        { className: 'circle-item' },
                        React.createElement('img', { src: 'img/sem-imagem.png', alt: '{item.id_osc}', width: '65' })
                    )
                );
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
                React.createElement(
                    'ul',
                    { className: 'menu-items' },
                    menu
                )
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
                        nextOsc
                    ),
                    React.createElement(
                        'div',
                        { className: 'circle2' },
                        nextOsc
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