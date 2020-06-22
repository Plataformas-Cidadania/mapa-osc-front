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
                <li><a href="/declaracao"><i className="fa fa-user" aria-hidden="true"></i> Declaração</a></li>

                <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
                <li><br/></li>
                <li className="bg-pri text-light" style={{padding: '5px 10px'}}>OSC Apac</li>
                <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Dados gerais</a></li>
                <li><a href="/atuacao-user"><i className="fa fa-user" aria-hidden="true"></i> Áreas de atuação</a></li>
                <li><a href="/descricao-user"><i className="fa fa-user" aria-hidden="true"></i> Descrição</a></li>
                <li><a href="/certificates-user"><i className="fas fa-certificate" aria-hidden="true"></i> Títulos e Certificados</a></li>
                <li><a href="/governancas-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Trabalho e Governança</a></li>
                <li><a href="/participacao-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Participação Social</a></li>
                <li><a href="/projetos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Projetos</a></li>
                <li><a href="/recursos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Fontes de recursos</a></li>
            </ul>
        );
    }
}

ReactDOM.render(
    <Menu/>,
    document.getElementById('menu')
);
