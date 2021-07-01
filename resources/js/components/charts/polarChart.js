class PolarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: props.data.serie,
            options: {
                chart: {
                    type: 'polarArea',
                },
                labels: props.data.labels,
                legend: {
                    show: false,
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },

        };

    }

    componentDidMount(){

    }

    render() {
        if(!this.state.series){
            return;
        }
        return (
            <div>
                <div id={this.props.id}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" height="200" />
                </div>
                <div id={"html-dist-"+this.props.id}>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <PolarChart/>,
    document.getElementById('polarChart')
);
