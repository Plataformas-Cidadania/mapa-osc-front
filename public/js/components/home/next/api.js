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
            url: 'http://localhost:8000/api/menu/osc/area_atuacao',
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

    load() {
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/menu/osc/area_atuacao',
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
        console.log(index);
        this.setState({ loadingList: true });
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/osc/listaareaatuacao/' + index,
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

        /*$(".divOff").hide(1000);
        $("#divChart"+index).first().slideDown("slow");
         $(".menu-left-active").attr('class', "list-group-item-theme");
        $("#divMenuChart"+index).attr('class', "menu-left-active");*/
    }

    render() {

        console.log(this.state.nextsOsc);

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
        if (this.state.nextsOsc) {
            nextOsc = this.state.nextsOsc.map(function (item, index) {
                return React.createElement(
                    'div',
                    { id: 'icon' + index, className: 'rotate', onClick: () => this.callMenu2(item.id_osc) },
                    React.createElement(
                        'div',
                        { className: 'circle-item' },
                        item.id_osc
                    )
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            { className: 'col-md-12 text-center' },
            React.createElement(
                'ul',
                { className: 'menu-items' },
                menu
            ),
            React.createElement(
                'div',
                { className: 'circle' },
                nextOsc
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null)
        );
    }

}

ReactDOM.render(React.createElement(NextOsc, null), document.getElementById('nextOsc'));