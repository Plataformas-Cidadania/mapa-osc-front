class Oscs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            oscs: [],
            editId: 0
        };

        this.list = this.list.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    list() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'POST',
            url: '/list-users-oscs',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ oscs: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        let oscs = this.state.oscs.map(function (item, index) {

            let hr = null;
            if (index < this.state.oscs.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'div',
                { className: 'col-md-12', key: "osc_" + item.id_osc },
                React.createElement(
                    'a',
                    { href: "/osc-user/" + item.id_osc },
                    React.createElement(
                        'div',
                        { className: 'box-item box-item-theme' },
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'box-item-theme-img' },
                            React.createElement('img', { src: "/imagens/oscs/md-" + item.imagem, className: 'box-item-theme-img', alt: '', width: '100%' })
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'h4',
                            { className: 'box-item-theme-p' },
                            item.tx_nome_osc
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            { className: 'box-item-theme-p box-item-theme-p-det ' },
                            item.teaser
                        )
                    )
                )
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                oscs
            )
        );
    }
}

ReactDOM.render(React.createElement(Oscs, null), document.getElementById('oscs'));