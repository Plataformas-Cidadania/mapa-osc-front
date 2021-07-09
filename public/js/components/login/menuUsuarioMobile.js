class MenuUsuarioMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tx_nome_usuario: '',
            loading: false
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({ loading: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'get-user-auth',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                let tx_nome_usuario = data.tx_nome_usuario ? data.tx_nome_usuario : '';
                this.setState({ loading: false, tx_nome_usuario: tx_nome_usuario });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    logout() {
        localStorage.setItem('@App:token', '');
        location.href = 'login';
    }

    render() {

        let usuario = 'Olá, faça seu login ou se cadastre';
        if (this.state.tx_nome_usuario) {
            let arrayNome = this.state.tx_nome_usuario.split(' ');
            usuario = 'Olá, ' + arrayNome[0] + '. Seja bem-vind@!';
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'text-center' },
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'bg-pri rounded-circle user-mobile' },
                    React.createElement('i', { className: 'far fa-user fa-3x' }),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'p',
                    null,
                    usuario
                )
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: 'menu-cel-login' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'login', style: { display: this.state.tx_nome_usuario ? 'none' : '' } },
                            React.createElement(
                                'a',
                                { className: 'btn btn-primary btn-login-menu', type: 'button' },
                                'Entrar'
                            )
                        )
                    ),
                    React.createElement(
                        'li',
                        { style: { display: this.state.tx_nome_usuario ? '' : 'none' } },
                        React.createElement(
                            'a',
                            { href: 'oscs-user' },
                            React.createElement('i', { className: 'far fa-address-card' }),
                            ' Minha OSCs'
                        )
                    ),
                    React.createElement(
                        'li',
                        { style: { display: this.state.tx_nome_usuario ? '' : 'none' } },
                        React.createElement(
                            'a',
                            { href: 'dados-user' },
                            React.createElement('i', { className: 'far fa-edit' }),
                            ' Meus Dados'
                        )
                    ),
                    React.createElement(
                        'li',
                        { style: { display: this.state.tx_nome_usuario ? 'none' : '' } },
                        React.createElement(
                            'a',
                            { href: 'register' },
                            React.createElement('i', { className: 'fas fa-user' }),
                            ' Cadastre-se'
                        )
                    ),
                    React.createElement(
                        'li',
                        { className: 'float-right', style: { display: this.state.tx_nome_usuario ? '' : 'none' }, onClick: this.logout },
                        React.createElement(
                            'a',
                            { href: 'logout-user' },
                            React.createElement('i', { className: 'fas fa-sign-out-alt' }),
                            ' Sair '
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(MenuUsuarioMobile, null), document.getElementById('menu-usuario-mobile'));