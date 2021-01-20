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
            React.createElement(
                'div',
                { className: 'row text-center' },
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            'Total de OSCs'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            '20'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            'Total de projetos'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            '10'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            'Total de certificados'
                        ),
                        React.createElement(
                            'h2',
                            null,
                            '30'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement(
                            'table',
                            { className: 'table' },
                            React.createElement(
                                'thead',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        '#'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'OSC'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        '\xDAltimos 30 dias'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'Total'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { scope: 'row' },
                                        '1'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        'ASSOCIACAO CULTURAL PISADA DO SERTAO'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        '825'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        '3025'
                                    )
                                ),
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { scope: 'row' },
                                        '2'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        'ASSOCIACAO CULTURAL PISADA DO SERTAO'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        '825'
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        '3025'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'Dados gerais'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '2 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                '\xC1reas de atua\xE7\xE3o'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '2 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'Descri\xE7\xE3o'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '2 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'T\xEDtulos e Certificados'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '2 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'Trabalho e Governan\xE7a'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '3 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'Projetos'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '1 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'box-border' },
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'Fontes de recursos'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '2 OSCs com dados incompletos '
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-outline-primary' },
                            'Atualizar'
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                ),
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