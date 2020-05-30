class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            territory: 1, //país (irá carregar as regiões),
            dataOscUf: null,
            dataIdhUf: null

        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
        this.loadOscUf();
    }

    load() {
        let _this = this;
        $.ajax({
            method: 'GET',
            url: 'get-osc/' + this.state.territory,
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                _this.setState({ data: data });
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({ loading: false });
            }

        });
    }

    loadOscUf() {
        let _this = this;
        $.ajax({
            method: 'GET',
            url: 'get-osc-all-ufs/',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                _this.setState({ dataOscUf: data['osc'], dataIdhUf: data['idh'] });
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({ loading: false });
            }

        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(OscMap, {
                mapId: 'mapTeste',
                data: this.state.data,
                dataOscUf: this.state.dataOscUf,
                dataIdhUf: this.state.dataIdhUf
            })
        );
    }
}

ReactDOM.render(React.createElement(Page, null), document.getElementById('page'));