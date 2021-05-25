class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        console.log('pages');
        $.ajax({
            method: 'GET',
            url: getBaseUrl + '/json/lista-osc-com-links.json',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Depen, {
                data: this.state.data
            })
        );
    }
}

ReactDOM.render(React.createElement(Page, null), document.getElementById('page'));