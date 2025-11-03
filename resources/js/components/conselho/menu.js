class MenuConselho extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        let menu = [];
        menu = [
            <div key="menu">
                <ul className="menu-area">
                    <li><a href="oscs-user"><i className="fas fa-list-alt"/> Minhas OSCs</a></li>
                    <li><a href="conselho"><i className="fas fa-file"/> Meus conselhos</a></li>
                    <li><a href="dashboard-conselho"><i className="fas fa-users"/> Meus conselheiros</a></li>
                    {/*<li><a href="conselheiro"><i className="fas fa-user-tie"/> Conselheiros</a></li>*/}
                    <li><a href="logout-user"><i className="fa fa-power-off" aria-hidden="true"/> Sair</a></li>
                </ul>
            </div>
        ];
        return menu;
    }
}

ReactDOM.render(
    <MenuConselho/>,
    document.getElementById('menu')
);
