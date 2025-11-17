class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sigla_osc: '',
        }
        this.getOsc = this.getOsc.bind(this);
    }
    componentDidMount(){
        this.getOsc();
    }

    getOsc(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2+'osc/dados_gerais/'+this.props.id,
            cache: false,
            success: function (data) {
                this.setState({loading: false, sigla_osc: data.tx_sigla_osc, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    render(){
        let menu = [];
        if(pageRoute===false) {
            menu = [
                <div key="menu">
                    <ul className="menu-area">
                        <li><a href="oscs-user"><i className="fas fa-list-alt"/> Minhas OSCs</a></li>
                        {/*<li><a href="dashboard-conselho"><i className="fas fa-tachometer-alt"/> Meus Conselhos</a></li>*/}
                        <li><a href="dados-user"><i className="fa fa-user" aria-hidden="true"/> Meus dados</a></li>
                        <li><a href="trocar-senha"><i className="fa fa-user" aria-hidden="true"/> Trocar Senha</a></li>
                        <li><a href="logout-user"><i className="fa fa-power-off" aria-hidden="true"/> Sair</a></li>
                    </ul>
                </div>
            ];
        }
        if(pageRoute===true){
            menu.push(
                <ul className="menu-area" key="menuOsc">
                    <li className="">OSC <strong>{this.state.sigla_osc}</strong></li>
                    <div className="line line-fix "/><br/>
                    {/*<li><a href="osc-user/789809"><i className="fa fa-file-alt" aria-hidden="true"/> Dados gerais</a></li>*/}
                    <li><a href={"osc-user/"+this.props.id}><i className="fa fa-file-alt" aria-hidden="true"/> Dados gerais</a></li>
                    <li><a href="objetivos-user"><i className="fas fa-globe-americas" aria-hidden="true"/> ODS</a></li>
                    <li><a href="areas-atuacao-user"><i className="fa fa-share-alt" aria-hidden="true"/> Áreas de atuação</a></li>
                    <li><a href="descricao-user"><i className="fas fa-align-justify" aria-hidden="true"/> Descrição</a></li>
                    <li><a href="certificates-user"><i className="fas fa-certificate" aria-hidden="true"/> Títulos e certificados</a></li>
                    <li><a href="governancas-user"><i className="fas fa-briefcase" aria-hidden="true"/> Trabalho e governança</a></li>
                    <li><a href="participacoes-user"><i className="fas fa-users" aria-hidden="true"/> Participação social</a></li>
                    <li><a href="projetos-user"><i className="fas fa-project-diagram" aria-hidden="true"/> Projetos</a></li>
                    <li><a href="recursos-user"><i className="fas fa-boxes" aria-hidden="true"/> Fontes de recursos</a></li>
                    <li><a href="oscs-user"><i className="far fa-arrow-alt-circle-left"/> Voltar</a></li>
                </ul>
            );
        }
        return menu;
    }
}

ReactDOM.render(
    <Menu id={id} />,
    document.getElementById('menu')
);
