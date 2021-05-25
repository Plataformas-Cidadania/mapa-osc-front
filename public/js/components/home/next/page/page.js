class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
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

        let indicators = [1, 2, 3, 4, 5, 6, 7, 8];

        let data = _this.state.data;
        data = this.loadCharts(indicators, 0, data);
        //console.log(data);
        this.setState({ data: data });
    }

    loadCharts(indicators, i, data) {
        //console.log("=============================================")
        /*for(let k in data){
            console.log('data'+k, data[k]);
        }*/
        //console.log("=============================================")
        let _this = this;
        $.ajax({
            method: 'GET',

            url: getBaseUrl2+'osc/grafico/'+indicators[i],
            data: {},
            cache: false,
            async: false,
            success: function (result) {
                //console.log(result);

                data.push(result);
                i++;
                if (i < indicators.length) {
                    data = _this.loadCharts(indicators, i, data);
                }
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({ loading: false });
            }
        });

        return data;
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Depen, {
                indicatorId: 'indicator',
                data: this.state.data
            })
        );
    }
}

ReactDOM.render(React.createElement(Page, null), document.getElementById('page'));
