class Indicator extends React.Component {
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


        let charts = [1,2,3,4,5,6,7,8]

        let data = _this.state.data;
        data = this.loadCharts(charts, 0, data);
        //console.log(data);
        this.setState({data: data});

    }

    loadCharts(charts, i, data){
       let _this = this;
        $.ajax({
            method:'GET',
            url: getBaseUrl2+'osc/grafico/'+charts[i],
            data:{

            },
            cache: false,
            async: false,
            success: function(result) {
                //console.log(result);

                data.push(result);
                i++;
                if(i < charts.length){
                    data = _this.loadCharts(charts, i, data);
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
                <Charts
                    chartId="chart"
                    data={this.state.data}
                />
            </div>

        );
    }
}

ReactDOM.render(
    <Indicator/>,
    document.getElementById('indicator')
);



