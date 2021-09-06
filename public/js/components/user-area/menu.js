class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sigla_osc: ''
        };
        this.getOsc = this.getOsc.bind(this);
    }
    componentDidMount() {
        this.getOsc();
    }

    getOsc() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/dados_gerais/' + this.props.id,
            cache: false,
            success: function (data) {
                this.setState({ loading: false, sigla_osc: data.tx_sigla_osc, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
        let menu = [];
        if (pageRoute === false) {
            menu = [React.createElement(
                'div',
                { key: 'menu' },
                React.createElement(
                    'ul',
                    { className: 'menu-area' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'oscs-user' },
                            React.createElement('i', { className: 'fas fa-list-alt' }),
                            ' Minhas OSCs'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'dados-user' },
                            React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                            ' Meus dados'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'trocar-senha' },
                            React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                            ' Trocar Senha'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'logout-user' },
                            React.createElement('i', { className: 'fa fa-power-off', 'aria-hidden': 'true' }),
                            ' Sair'
                        )
                    )
                )
            )];
        }
        if (pageRoute === true) {
            menu.push(React.createElement(
                'ul',
                { className: 'menu-area', key: 'menuOsc' },
                React.createElement(
                    'li',
                    { className: '' },
                    'OSC ',
                    React.createElement(
                        'strong',
                        null,
                        this.state.sigla_osc
                    )
                ),
                React.createElement('div', { className: 'line line-fix ' }),
                React.createElement('br', null),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: "osc-user/" + this.props.id },
                        React.createElement('i', { className: 'fa fa-file-alt', 'aria-hidden': 'true' }),
                        ' Dados gerais'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'objetivos-user' },
                        React.createElement('i', { className: 'fas fa-globe-americas', 'aria-hidden': 'true' }),
                        ' ODS'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'areas-atuacao-user' },
                        React.createElement('i', { className: 'fa fa-share-alt', 'aria-hidden': 'true' }),
                        ' \xC1reas de atua\xE7\xE3o'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'descricao-user' },
                        React.createElement('i', { className: 'fas fa-align-justify', 'aria-hidden': 'true' }),
                        ' Descri\xE7\xE3o'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'certificates-user' },
                        React.createElement('i', { className: 'fas fa-certificate', 'aria-hidden': 'true' }),
                        ' T\xEDtulos e certificados'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'governancas-user' },
                        React.createElement('i', { className: 'fas fa-briefcase', 'aria-hidden': 'true' }),
                        ' Trabalho e governan\xE7a'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'participacoes-user' },
                        React.createElement('i', { className: 'fas fa-users', 'aria-hidden': 'true' }),
                        ' Participa\xE7\xE3o social'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'projetos-user' },
                        React.createElement('i', { className: 'fas fa-project-diagram', 'aria-hidden': 'true' }),
                        ' Projetos'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'recursos-user' },
                        React.createElement('i', { className: 'fas fa-boxes', 'aria-hidden': 'true' }),
                        ' Fontes de recursos'
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'oscs-user' },
                        React.createElement('i', { className: 'far fa-arrow-alt-circle-left' }),
                        ' Voltar'
                    )
                )
            ));
        }
        return menu;
    }
}

ReactDOM.render(React.createElement(Menu, { id: id }), document.getElementById('menu'));