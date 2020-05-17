class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        this.load = this.load.bind(this);
        //this.load();

    }

    componentDidMount(){
        this.load();
    }


    load(){
        let _this = this;
        $.ajax({
            method:'GET',
            url: 'get-indicador',
            data:{
            },
            cache: false,
            success: function(data) {
                //console.log(data);
                _this.setState({data: data.chart});

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
                <Indicator
                    indicatorId="indicator"
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



