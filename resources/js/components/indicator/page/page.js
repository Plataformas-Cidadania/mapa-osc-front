class Page extends React.Component {
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

        let indicators = [1,2,3,4,5,6,7,8]

        let data = _this.state.data;
        data = this.loadCharts(indicators, 0, data);

        this.setState({data: data});

    }

    loadCharts(indicators, i, data){

        let _this = this;
        $.ajax({
            method:'GET',

            url: getBaseUrl2+'osc/grafico/'+indicators[i],

            data:{

            },
            cache: false,
            async: false,
            success: function(result) {
                //console.log(result);

                data.push(result);
                i++;
                if(i < indicators.length){
                    data = _this.loadCharts(indicators, i, data);
                }


            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({loading: false});
            }
        });

        return data;
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
