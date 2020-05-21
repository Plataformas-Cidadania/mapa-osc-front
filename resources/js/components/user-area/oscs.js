class Oscs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            oscs:[],
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
            url: '/list-users-oscs',
            data: {
            },
            cache: false,
            success: function(data){
                this.setState({oscs: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        let oscs = this.state.oscs.map(function(item, index){

            let hr = null;
            if(index < this.state.oscs.length-1){
                hr = <hr/>;
            }

            return (
                <div className="col-md-12" key={"osc_"+item.id_osc}>
                    <a href={"/osc-user/"+item.id_osc}>
                        <div className="box-item box-item-theme">
                            <br/>
                            <div className="box-item-theme-img">
                                <img src={"/imagens/oscs/md-"+item.imagem} className="box-item-theme-img" alt="" width="100%" />
                            </div>
                            <br/>
                            <h4 className="box-item-theme-p">{item.tx_nome_osc}</h4><br/>
                            <p className="box-item-theme-p box-item-theme-p-det ">{item.teaser}</p>
                        </div>
                    </a>
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="row">
                    {oscs}
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Oscs/>,
    document.getElementById('oscs')
);
