class PolarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [14, 25, 21, 17, 15, 20],
            options: {
                chart: {
                    type: 'polarArea',
                },
                labels: ['A','B','C','D','E','F'],
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

        /*this.state = {
            options: {
                chart: {
                    events: {
                        click: function (chart, w, e) {
                            console.log(chart, w, e)
                        }
                    },
                    id: props.id
                },
                colors: props.colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    //categories: ['BRT', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
                    categories: props.data ? props.data.titles : [],
                    labels: {
                        style: {
                            colors: props.colors,
                            fontSize: '14px'
                        }
                    }
                }
            },
            series: [{
                //data: props.data ? props.data.values : [10, 20, 30, 80, 70, 60, 50, 40]
                data: props.data ? props.data.values : []
            }],
        };*/

        //this.update = this.update.bind(this);
    }

    componentDidMount(){
        //console.log('aaaa');
    }

    render() {
        if(!this.state.series){
            return;
        }
        return (
            <div>
                <div id={this.props.id}>
                    {/*<ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />*/}
                    <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" height="250" />
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
