class Document extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            document:[],
            editId: 0,
        };

        this.load = this.load.bind(this);
    }

    componentDidMount(){
        this.load();
    }

    load(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'GET',
            url: '/detalhar-users-document/'+this.props.id,
            cache: false,
        success: function(data){
            //console.log("1: "+this.props.id);
            //console.log(data);
                this.setState({document: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        console.log(this.state.document.id, this.state.document.max_id);

        let previous = null;
        if(this.state.document.previous_id){
            previous = (<li className={"previous"}><a href={"/dados-arquivo/"+(this.state.document.previous_id)}><span aria-hidden="true">&larr;</span> Anterior</a></li>);
        }

        let next = null;
        if(this.state.document.next_id){
            next = (<li className={"next"}><a href={"/dados-arquivo/"+(this.state.document.next_id)}>Próximo <span aria-hidden="true">&rarr;</span></a></li>);
        }

        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="box-item-theme-p">{this.state.document.title}</h2>
                        <iframe src={"/arquivos/documents/"+this.state.document.arquivo} width="100%" height="1000px" frameBorder="0"></iframe>
                        <br/><br/>
                    </div>
                </div>
                <nav aria-label="...">
                    <ul className="pager">
                        {previous}
                        {next}
                    </ul>
                </nav>
            </div>

        );
    }
}


ReactDOM.render(
    <Document id={id}/>,
    document.getElementById('document')
);