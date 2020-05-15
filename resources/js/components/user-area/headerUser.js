class HeaderUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="container">
                <div className="title-box">
                    <br/>
                    <h2 className="text-center">Área do Associado</h2>
                    <hr/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HeaderUser/>,
    document.getElementById('header-user')
);