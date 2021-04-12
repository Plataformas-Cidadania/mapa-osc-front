class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processingOsc: false,
            processingOscIdhUfs: false,
            data: null,
            territory: 1,//país (irá carregar as regiões),
            dataOscUf: null,
            dataIdhUf: null,

        };

        this.load = this.load.bind(this);
    }

    componentDidMount(){
        this.load();
        this.loadOscUf();
    }

    load(){
        let _this = this;
        this.setState({processingOsc: true}, function(){
            $.ajax({
                method:'GET',
                url: 'get-osc/'+this.state.territory,
                data:{
                },
                cache: false,
                success: function(data) {
                    //console.log(data);
                    _this.setState({data: data, processingOsc: false});
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({loading: false});
                }

            });
        })

    }

    loadOscUf(){
        let _this = this;
        this.setState({processingOscIdhUfs: true}, function() {
            $.ajax({
                method: 'GET',
                url: 'get-osc-all-ufs',
                data: {},
                cache: false,
                success: function (data) {
                    console.log(data);
                    _this.setState({dataOscUf: data['osc'], dataIdhUf: data['idh'], processingOscIdhUfs: false});
                },
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({loading: false});
                }

            });
        });
    }



    render(){
        return (
            <div>
                {/*<OscMap
                    mapId="mapOsc"
                    data={this.state.data}
                />*/}
                <OscMap
                    mapId="mapTeste"
                    data={this.state.data}
                    dataOscUf={this.state.dataOscUf}
                    dataIdhUf={this.state.dataIdhUf}
                    processingOsc={this.state.processingOsc}
                    processingOscIdhUfs={this.state.processingOscIdhUfs}
                />

            </div>

        );
    }
}


ReactDOM.render(
    <Page />,
    document.getElementById('page')
);



