class Preenchimento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.load = this.load.bind(this);
           }

    componentDidMount(){
        this.load();
    }


    load(){
        let _this = this;

        $.ajax({
            method:'GET',
            //url: 'osc/barratransparencia/565031',
            url: getBaseUrl+'osc/barratransparencia/565031',
            data:{

            },
            cache: false,
            success: function(data) {
                console.log(data);
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
                <PolarChart
                    polarChart="polarChart"
                    data={this.state.data}
                />
            </div>

        );
    }
}


ReactDOM.render(
    <Preenchimento/>,
    document.getElementById('preenchimento')
);



