class PolarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: props.data.serie,
            options: {
                chart: {
                    type: 'polarArea',
                },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff'],
                labels: props.data.labels,
                /*legend: {
                    show: false,
                },*/
                legend: {
                    onItemClick: {
                        toggleDataSeries: false
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'left'
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
