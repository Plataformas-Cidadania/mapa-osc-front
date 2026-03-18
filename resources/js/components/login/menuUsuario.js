class MenuUsuario extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tx_nome_usuario: '',
            loading: false,
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        this.setState({loading: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'get-user-auth',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                let tx_nome_usuario = data.tx_nome_usuario ? data.tx_nome_usuario : '';
                this.setState({loading: false, tx_nome_usuario: tx_nome_usuario})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    logout(){
        localStorage.setItem('@App:token', '');
        localStorage.setItem('@App:userType', '');
        location.href = 'login';
    }

    render(){

        let usuario = 'Olá, faça seu login ou se cadastre';
        if(this.state.tx_nome_usuario){
            let arrayNome = this.state.tx_nome_usuario.split(' ')
            usuario = 'Olá, ' + arrayNome[0] + '. Seja bem-vind@!';
        }
        let userType = localStorage.getItem('@App:userType');
        let logado = this.state.tx_nome_usuario;
        let _conselhosAtivo = typeof conselhosAtivo !== 'undefined' && conselhosAtivo;

        return(
            <div>
                <div className="login" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="login-icon rounded-circle">
                        <i className="far fa-user"/>
                    </div>
                    <p>{usuario}</p>
                </div>
                <div className="dropdown-menu dropdown-menu-right">

                    {/* Deslogado */}
                    {!logado &&
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <a href="login">
                                    <button className="btn btn-primary btn-login-menu" type="button"><i className="fas fa-building"/> Gerenciar OSC</button>
                                </a>
                                {_conselhosAtivo &&
                                    <a href="login-conselho">
                                        <button className="btn btn-primary btn-login-menu" type="button"><i className="fas fa-users"/> Gerenciar Conselho</button>
                                    </a>
                                }
                            </div>
                            <a href="register">
                                <button className="dropdown-item" type="button">Cadastre-se</button>
                            </a>
                            <a href="representacoes">
                                <button className="dropdown-item" type="button">Representações</button>
                            </a>
                            <a href="buscar-email">
                                <button className="dropdown-item" type="button">Consultar e-mail</button>
                            </a>
                        </div>
                    }

                    {/* Logado OSC */}
                    {logado && userType === 'osc' &&
                        <div>
                            <a href="oscs-user">
                                <button className="dropdown-item" type="button"><i className="fas fa-building"/> Minha OSCs</button>
                            </a>
                            <a href="dados-user">
                                <button className="dropdown-item" type="button"><i className="far fa-edit"/> Meus Dados</button>
                            </a>
                            <a href="representacoes">
                                <button className="dropdown-item" type="button"><i className="fas fa-handshake"/> Representações</button>
                            </a>
                            <a href="buscar-email">
                                <button className="dropdown-item" type="button"><i className="fas fa-envelope"/> Consultar e-mail</button>
                            </a>
                        </div>
                    }

                    {/* Logado Conselho */}
                    {logado && userType === 'conselho' && _conselhosAtivo &&
                        <div>
                            <a href="dashboard-conselho">
                                <button className="dropdown-item" type="button"><i className="fas fa-users"/> Meus Conselhos</button>
                            </a>
                        </div>
                    }

                    {/* Sair - qualquer logado */}
                    {logado &&
                        <a onClick={this.logout}>
                            <button className="dropdown-item" type="button"><i className="fas fa-sign-out-alt"/> Sair</button>
                        </a>
                    }

                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <MenuUsuario/>,
    document.getElementById('menu-usuario')
);
