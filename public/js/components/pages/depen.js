class Depen extends React.Component {
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
            url: 'json/lista-osc-com-links.json',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
        let itensLista = null;
        if (this.state.data) {
            itensLista = this.state.data.map(function (item, index) {
                console.log(item);
                return React.createElement(
                    'tr',
                    { key: 'trModal' + index },
                    React.createElement(
                        'td',
                        null,
                        item.cnpj
                    ),
                    React.createElement(
                        'td',
                        null,
                        item.nome
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'a',
                            { href: "detalhar/" + item.id },
                            React.createElement('i', { className: 'fas fa-share-square' })
                        )
                    )
                );
            });
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'table',
                            { className: 'table table-hover' },
                            React.createElement(
                                'thead',
                                { className: 'thead-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        'CNPJ'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Nome'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Detalhar'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                itensLista
                            )
                        )
                    )
                )
            )
        );
    }

}
ReactDOM.render(React.createElement(Depen, null), document.getElementById('depen'));