class Home extends React.Component {
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
        let charts = [9, 10, 11, 12];

        let data = _this.state.data;
        data = this.loadCharts(charts, 0, data);

        //console.log(data);
        this.setState({ data: data });
        /*$.ajax({
            method: 'GET',
            //url: getBaseUrl2+'osc/grafico/'+charts[i],
            url: 'indicadores/analises/',
            data: {},
            cache: false,
            async: false,
            success: function (result) {
                //console.log("=============", result);
                _this.loadCharts(result, 0, data);
            },
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                _this.setState({loading: false});
            }
        });*/
    }

    loadCharts(charts, i, data) {
        let _this = this;
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/grafico/' + charts[i],
            //url: getBaseUrl2+'osc/grafico/'+charts[i]['id_analise'],
            data: {},
            cache: false,
            async: false,
            success: function (result) {
                data.push(result);
                i++;
                if (i < charts.length) {
                    data = _this.loadCharts(charts, i, data);
                }
                /*_this.setState({data: data}, function(){
                    if(i < charts.length){
                        _this.loadCharts(charts, i, data);
                    }
                });*/
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
            React.createElement(Charts, {
                chartId: 'chart',
                data: this.state.data
            })
        );
    }
}

ReactDOM.render(React.createElement(Home, null), document.getElementById('home'));