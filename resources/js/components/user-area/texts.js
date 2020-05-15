class Texts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            texts:[],
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
            url: '/list-users-texts',
            data: {
            },
            cache: false,
            success: function(data){
                this.setState({texts: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        let texts = this.state.texts.map(function(item, index){

            let hr = null;
            if(index < this.state.texts.length-1){
                hr = <hr/>;
            }

            return (
                <div className="col-md-12" key={"text_"+item.id}>
                    <a href={"/dados-texto/"+item.id}>
                        <div className="box-item box-item-theme">
                            <br/>
                            <div className="box-item-theme-img">
                                <img src={"/imagens/texts/md-"+item.imagem} className="box-item-theme-img" alt="" width="100%" />
                            </div>
                            <br/>
                            <h4 className="box-item-theme-p">{item.title}</h4><br/>
                            <p className="box-item-theme-p box-item-theme-p-det ">{item.teaser}</p>
                        </div>
                    </a>
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="row">
                    {texts}
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Texts/>,
    document.getElementById('texts')
);