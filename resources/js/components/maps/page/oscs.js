class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        //this.load = this.load.bind(this);
        this.load();

    }

    componentDidMount(){
    }

    load(){
        let _this = this;
        $.ajax({
            method:'GET',
            url: 'get-osc',
            data:{
            },
            cache: false,
            success: function(data) {
                //console.log(data);
                _this.setState({data: data});

            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({loading: false});
            }

        });
    }



    render(){
        return (
            <div>
                <Map
                    mapId="mapOsc"
                    data={this.state.data}
                />
            </div>

        );
    }
}


ReactDOM.render(
    <Page/>,
    document.getElementById('page')
);



