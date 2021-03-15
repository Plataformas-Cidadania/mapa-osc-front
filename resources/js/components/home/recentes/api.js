class OscsRecentes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oscs: [],
            loading: false
        };

        this.load = this.load.bind(this);

    }

    componentDidMount(){
        console.log('oscs-recentes');
        this.load();
    }

    load(){
        this.setState({loading: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl+'osc/listaatualizadas/9',
            data: {
            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({oscs: data, loading: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    /*titleize(text) {
        var words = text.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            if(words[a] != "de" && words[a] != "da" && words[a] != "do" && words[a] != "dos" && words[a] != "das"){
                var w = words[a];
                words[a] = w[0].toUpperCase() + w.slice(1);
            }
        }
        return words.join(" ");
    }*/


    render() {

        console.log('oscs-recentes render');

        let oscs = null;
        if(this.state.oscs){
            oscs = this.state.oscs.map((item, index) => {
                return (
                    <div key={"recente"+index} className="col-md-4">
                        <a href={"detalhar/"+item.id_osc+"/"+clean(item.tx_nome_osc)}>
                            <div className="list-user list-lgt">
                                <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt=""
                                     className="rounded-circle float-left" width="50"/>
                                    <h4 className="capitalize">
                                        {titleize(item.tx_nome_osc)}
                                        <i className="fas fa-angle-right float-right list-icon"/>
                                    </h4>
                                    <p>&nbsp;</p>
                                    <hr/>
                            </div>
                        </a>
                    </div>
                );
            });
        }

        return (
            <div className="row">

                {oscs}

                <div className="col-md-12 text-center">
                    <br/><br/>
                        <a href="mapa/">
                            <button type="button" className="btn btn-outline-light">Visualize todas as OSCs</button>
                        </a>
                        <br/><br/><br/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <OscsRecentes />,
    document.getElementById('oscsRecentes')
);
