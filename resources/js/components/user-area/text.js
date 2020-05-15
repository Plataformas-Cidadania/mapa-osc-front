class Text extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            text:[],
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
            url: '/detalhar-users-text/'+this.props.id,
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({text: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        console.log(this.state.text.id, this.state.text.max_id);

        let previous = null;
        if(this.state.text.previous_id){
            previous = (<li className={"previous"}><a href={"/dados-texto/"+(this.state.text.previous_id)}><span aria-hidden="true">&larr;</span> Anterior</a></li>);
        }

        let next = null;
        if(this.state.text.next_id){
            next = (<li className={"next"}><a href={"/dados-texto/"+(this.state.text.next_id)}>Próximo <span aria-hidden="true">&rarr;</span></a></li>);
        }

        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <img src={"/imagens/texts/lg-"+this.state.text.imagem}  alt="" width="100%" />
                        <h2 className="box-item-theme-p">{this.state.text.title}</h2>
                        <div className="box-item-theme-p box-item-theme-p-det " dangerouslySetInnerHTML={{__html: this.state.text.description}} />
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
    <Text id={id}/>,
    document.getElementById('text')
);