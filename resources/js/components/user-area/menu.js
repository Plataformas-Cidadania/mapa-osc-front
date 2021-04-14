class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }
    render(){
        let menu = [
            <div key="menu">
                <ul className="menu-area">
                    <li><a href="dashboard-user"><i className="fa fa-home" aria-hidden="true"/> Minha área</a></li>
                    <li><a href="oscs-user"><i className="fa fa-user" aria-hidden="true"/> Minhas OSCs</a></li>
                    <li><a href="dados-user"><i className="fa fa-user" aria-hidden="true"/> Meus Dados</a></li>
                    <li><a href="declaracao" target='_blank'><i className="fa fa-user" aria-hidden="true"/> Declaração</a></li>
                    <li><a href="selo-user"><i className="fa fa-user" aria-hidden="true"/> Selo Site</a></li>
                    <li><a href="logout-user"><i className="fa fa-power-off" aria-hidden="true"/> Sair</a></li>
                </ul>
            </div>
        ];
        if(pageRoute===true){
            menu.push(
                <ul className="menu-area" key="menuOsc">
                    <li className="">OSC Apac</li>
                    <div className="line line-fix "/><br/>
                    <li><a href="osc-user/789809"><i className="fa fa-file-alt" aria-hidden="true"/> Dados gerais</a></li>
                    <li><a href="objetivos-user"><i className="fa fa-file-alt" aria-hidden="true"/> ODS</a></li>
                    <li><a href="areas-atuacao-user"><i className="fa fa-share-alt" aria-hidden="true"/> Áreas de atuação</a></li>
                    <li><a href="descricao-user"><i className="fas fa-align-justify" aria-hidden="true"/> Descrição</a></li>
                    <li><a href="certificates-user"><i className="fas fa-certificate" aria-hidden="true"/> Títulos e Certificados</a></li>
                    <li><a href="governancas-user"><i className="fas fa-briefcase" aria-hidden="true"/> Trabalho e Governança</a></li>
                    <li><a href="participacoes-user"><i className="fas fa-users" aria-hidden="true"/> Participação Social</a></li>
                    <li><a href="projetos-user"><i className="fas fa-project-diagram" aria-hidden="true"/> Projetos</a></li>
                    <li><a href="recursos-user"><i className="fas fa-boxes" aria-hidden="true"/> Fontes de recursos</a></li>
                </ul>
            );
        }
        return menu;
    }
}

ReactDOM.render(
    <Menu/>,
    document.getElementById('menu')
);
