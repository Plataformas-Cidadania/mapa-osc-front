class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        if(pageRoute===true){
            return(
                <div>
                    <ul className="menu-area">
                        <li><a href="/dashboard-user"><i className="fa fa-home" aria-hidden="true"></i> Minha área</a></li>
                        <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Minhas OSCs</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                        <li><a href="/declaracao" target='_blank'><i className="fa fa-user" aria-hidden="true"></i> Declaração</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                        <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
                    </ul>
                    <br/>
                    <ul className="menu-area">
                        <li className="">OSC Apac</li>
                        <div className="line line-fix "></div><br/>
                        <li><a href="/osc-user/789809"><i className="fa fa-user" aria-hidden="true"></i> Dados gerais</a></li>
                        <li><a href="/areas-atuacao-user"><i className="fa fa-user" aria-hidden="true"></i> Áreas de atuação</a></li>
                        <li><a href="/descricao-user"><i className="fas fa-align-justify" aria-hidden="true"></i> Descrição</a></li>
                        <li><a href="/certificates-user"><i className="fas fa-certificate" aria-hidden="true"></i> Títulos e Certificados</a></li>
                        <li><a href="/governancas-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Trabalho e Governança</a></li>
                        <li><a href="/participacoes-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Participação Social</a></li>
                        <li><a href="/projetos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Projetos</a></li>
                        <li><a href="/recursos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Fontes de recursos</a></li>
                    </ul>
                </div>
            );
        }else{
            return(
                <div>
                    <ul className="menu-area">
                        <li><a href="/dashboard-user"><i className="fa fa-home" aria-hidden="true"></i> Minha área</a></li>
                        <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Minhas OSCs</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                        <li><a href="/declaracao" target='_blank'><i className="fa fa-user" aria-hidden="true"></i> Declaração</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                        <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
                    </ul>
                </div>
            );
        }

    }
}

ReactDOM.render(
    <Menu/>,
    document.getElementById('menu')
);
