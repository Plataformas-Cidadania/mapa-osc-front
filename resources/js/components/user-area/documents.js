class Documents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            documents:[],
            editId: 0,
        };

        this.list = this.list.bind(this);
    }

    componentDidMount(){
        this.list();
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'POST',
            url: 'list-users-documents',
            data: {
            },
            cache: false,
            success: function(data){
                this.setState({documents: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        let documents = this.state.documents.map(function(item, index){

            let hr = null;
            if(index < this.state.documents.length-1){
                hr = <hr/>;
            }

            return (
                <div className="col-md-3  text-center" key={"document_"+item.id}>
                    <a href={"/dados-arquivo/"+item.id}>
                        <div className="box-item box-item-theme">
                            <br/><i className="far fa-file fa-3x"></i><br/><br/>
                            <p className="box-item-theme-p">{item.title}</p>
                        </div>
                    </a>
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="row">
                    {documents}
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Documents/>,
    document.getElementById('documents')
);
