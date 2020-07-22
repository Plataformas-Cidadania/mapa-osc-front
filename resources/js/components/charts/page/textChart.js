class TextChart extends React.Component {
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

        /*$.ajax({
            method:'GET',
            url: 'get-indicador',
            //url: 'http://localhost:8000/api/analises?id=2',
            //url: 'http://172.22.0.3/api/indicadores',
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
        });*/

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
            url: getBaseUrl+'analises/localidade/33',
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
                <TextCharts
                    chartId="textChart"
                    data={this.state.data}
                />
            </div>

        );
    }
}

ReactDOM.render(
    <TextChart/>,
    document.getElementById('textChart')
);



