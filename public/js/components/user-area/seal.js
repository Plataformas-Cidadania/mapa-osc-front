class Seal extends React.Component {
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
                    ' Selo para seu site'
                ),
                React.createElement('hr', null)
            ),
            React.createElement(
                'p',
                null,
                'Nessa \xE1rea voc\xEA encontrara selos que identificam que sua institui\xE7\xE3o se encontra em nosso banco de dados.'
            ),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'strong',
                            null,
                            'OSC Apac'
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'label-float-tx' },
                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_historico', value: '<a href=\'http://mapa-osc-laravel.local/selo-osc/www.ipea.gov.br/211212\'><img src=\'https://mapaosc.ipea.gov.br/img/logo.png\'></a>',
                            rows: '3' }),
                        React.createElement(
                            'label',
                            { htmlFor: 'tx_historico' },
                            'Script'
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-box-info-tx-off' },
                            React.createElement(
                                'p',
                                null,
                                '\xA0'
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                ' ',
                React.createElement('br', null)
            )
        );
    }
}

ReactDOM.render(React.createElement(Seal, null), document.getElementById('seal'));