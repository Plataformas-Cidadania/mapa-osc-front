class HeaderUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }


    }



    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                                <h2 style={{fontSize: 16}}>{text?.titulo}</h2>
                                <p dangerouslySetInnerHTML={{__html: text?.descricao}} style={{marginTop: -10}}></p>
                            </div>
                            <br/>
                            <h1>Minha conta</h1>
                            <h5><a href="/">Home</a></h5>
                            <div className="line line-fix "/>
                            <hr style={{marginTop: '-2px',}}/>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <HeaderUser/>,
    document.getElementById('header-user')
);
