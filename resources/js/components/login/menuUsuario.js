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
        location.href = 'login';
    }

    render(){

        let usuario = 'Olá, faça seu login ou se cadastre';
        if(this.state.tx_nome_usuario){
            let arrayNome = this.state.tx_nome_usuario.split(' ')
            usuario = 'Olá, ' + arrayNome[0] + '. Seja bem-vind@!';
        }
        return(
            <div>
                <div className="login" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="login-icon rounded-circle">
                        <i className="far fa-user"/>
                    </div>
                    <p>{usuario}</p>
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                    <a href="login" style={{display: this.state.tx_nome_usuario ? 'none' : ''}}>
                        <button className="btn btn-primary btn-login-menu" type="button">Entrar</button>
                    </a>

                    <a href="register" style={{display: this.state.tx_nome_usuario ? 'none' : ''}}>
                        <button className="dropdown-item" type="button">Cadastre-se</button>
                    </a>
                    {/*<a href="register">
                        <button className="dropdown-item" type="button">Estado e Município</button>
                    </a>*/}
                    <a href="oscs-user" style={{display: this.state.tx_nome_usuario ? '' : 'none'}}>
                        <button className="dropdown-item" type="button">Minha OSCs</button>
                    </a>
                    <a href="dados-user" style={{display: this.state.tx_nome_usuario ? '' : 'none'}}>
                        <button className="dropdown-item" type="button">Meus Dados</button>
                    </a>
                    {/*<a href="oscs-user">
                        <button className="dropdown-item " type="button">Editar</button>
                    </a>*/}
                    <a href="representacoes">
                        <button className="dropdown-item" type="button">Representações</button>
                    </a>
                    <a href="buscar-email">
                        <button className="dropdown-item" type="button">Consultar e-mail</button>
                    </a>
                    <a onClick={this.logout} style={{display: this.state.tx_nome_usuario ? '' : 'none'}}>
                        <button className="dropdown-item" type="button">Sair</button>
                    </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <MenuUsuario/>,
    document.getElementById('menu-usuario')
);
