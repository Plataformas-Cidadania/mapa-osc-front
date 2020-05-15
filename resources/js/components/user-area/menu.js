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
                <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                <li><a href="/dados-textos"><i className="fa fa-book" aria-hidden="true"></i> Textos</a></li>
                <li><a href="/dados-arquivos"><i className="fa fa-file" aria-hidden="true"></i> Arquivos</a></li>
                <li><a href="/videos-privados"><i className="fa fa-video" aria-hidden="true"></i> Vídeos</a></li>
                {/*<li><a href="/orders-user"><i className="fa fa-truck" aria-hidden="true"></i> Meus pedidos</a></li>*/}
                {/*<li><a href="/addresses-user"><i className="fa fa-map-marker" aria-hidden="true"></i> Meus endereços</a></li>*/}
                {/*<li><a href="/lista-desejo"><i className="fa fa-heart" aria-hidden="true"></i> Lista de desejos</a></li>*/}
                {/*<li><a href="/avaliacoes"><i className="fa fa-star" aria-hidden="true"></i> Gerir avaliações</a></li>*/}
                {/*<li><a href="/meus-cupons"><i className="fa fa-ticket" aria-hidden="true"></i> Meus cupons</a></li>*/}
                {/*<li><a href="/cartao-user"><i className="fa fa-address-card" aria-hidden="true"></i> Cartão</a></li>*/}
                {/*<li><a href="/troca"><i className="fa fa-exchange" aria-hidden="true"></i> Troca</a></li>*/}
                <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
            </ul>
        );
    }
}

ReactDOM.render(
    <Menu/>,
    document.getElementById('menu')
);
