class Daschboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totais: []
        };

        this.list = this.list.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    list() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'GET',
            url: '/dashboard-status',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ totais: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                //this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render() {

        let totais = this.state.totais.map(function (total, index) {
            return React.createElement(
                'div',
                { className: 'col-md-3 text-center', key: "totais_" + index, style: { marginBottom: '30px' } },
                React.createElement(
                    'div',
                    { className: 'btn btn-default box-item-area' },
                    React.createElement(
                        'h2',
                        null,
                        total.qtdTotal
                    ),
                    React.createElement(
                        'p',
                        null,
                        total.status
                    )
                )
            );
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'title-user-area' },
                React.createElement(
                    'h3',
                    null,
                    React.createElement('i', { className: 'fa fa-home', 'aria-hidden': 'true' }),
                    ' Minha \xE1rea'
                ),
                React.createElement('hr', null)
            ),
            React.createElement(
                'p',
                null,
                'Ol\xE1 tudo bem! Estamos sentindo sua falta.'
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'row' },
                totais
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement('br', null),
                React.createElement('br', null),
                ' ',
                React.createElement('br', null)
            )
        );
    }
}

ReactDOM.render(React.createElement(Daschboard, null), document.getElementById('dashboard'));