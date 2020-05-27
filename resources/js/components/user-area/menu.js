class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <ul className="menu-area">
                <li><a href="/dashboard-user"><i className="fa fa-home" aria-hidden="true"></i> Minha área</a></li>
                <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Minhas OSCs</a></li>
                <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Certificado</a></li>
                <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
            </ul>
        );
    }
}

ReactDOM.render(
    <Menu/>,
    document.getElementById('menu')
);
