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
                'tr',
                { key: "osc_" + item.id_osc },
                React.createElement(
                    'th',
                    { scope: 'row' },
                    index + 1
                ),
                React.createElement(
                    'td',
                    null,
                    item.tx_nome_osc
                ),
                React.createElement(
                    'td',
                    { width: '230' },
                    React.createElement(
                        'div',
                        { className: 'btn btn-primary' },
                        React.createElement(
                            'a',
                            { href: "/detalhar/" + item.id_osc + "/" + item.tx_nome_osc },
                            React.createElement('i', { className: 'fas fa-binoculars' }),
                            ' Visualizar'
                        )
                    ),
                    '\xA0',
                    React.createElement(
                        'div',
                        { className: 'btn btn-success' },
                        React.createElement(
                            'a',
                            { href: "/osc-user/" + item.id_osc },
                            React.createElement('i', { className: 'far fa-edit' }),
                            ' Editar'
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
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            { className: 'thead-light' },
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Id'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Nome da OSC'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col', className: 'text-center' },
                                    'A\xE7\xF5es'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            oscs
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Oscs, null), document.getElementById('oscs'));