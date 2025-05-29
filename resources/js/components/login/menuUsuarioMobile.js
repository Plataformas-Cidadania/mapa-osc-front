class MenuUsuarioMobile extends React.Component{
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

                <div className="text-center">
                    <br/>
                    <div className="bg-pri rounded-circle user-mobile">
                        <i className="far fa-user fa-3x"/><br/><br/>
                    </div>
                    <p>{usuario}</p>
                </div>
                <hr/>
                <div>
                    <ul className="menu-cel-login">
                        <li>
                            <a href="login" style={{display: this.state.tx_nome_usuario ? 'none' : ''}}>
                                <div className="btn btn-primary btn-login-menu" type="button">Entrar</div>
                            </a>
                        </li>
                        <li style={{display: this.state.tx_nome_usuario ? '' : 'none'}}>
                            <a href="oscs-user" >
                                <i className="far fa-address-card"/> Minha OSCs
                            </a>
                        </li>
                        <li style={{display: this.state.tx_nome_usuario ? '' : 'none'}}>
                            <a href="dados-user"><i className="far fa-edit"/> Meus Dados</a>
                        </li>
                        <li style={{display: this.state.tx_nome_usuario ? 'none' : ''}}>
                            <a href="register">
                                <i className="fas fa-user"/> Cadastre-se
                            </a>
                        </li>
                        <li className="float-right" style={{display: this.state.tx_nome_usuario ? '' : 'none'}} onClick={this.logout}>
                            <a href="logout-user"><i className="fas fa-sign-out-alt"  /> Sair </a>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <MenuUsuarioMobile/>,
    document.getElementById('menu-usuario-mobile')
);
