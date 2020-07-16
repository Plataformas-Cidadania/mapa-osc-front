class MixedChart extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            labels: [],
            options: {
                chart: {
                    stacked: false,
                    id: props.id,
                    toolbar: {
                        tools: {
                            download: '<i class="fas fa-image chart-custom-icon"/>',
                            reset: '<i class="fas fa-undo-alt chart-custom-icon-reset"/>',
                            customIcons: [
                                {
                                    icon: '<i class="fas fa-chart-line"/>',
                                    index: 0,
                                    title: '',
                                    class: 'chart-custom-icon',
                                    click: () => {
                                        console.log('chart line');
                                    }
                                },
                                {
                                    icon: '<i class="fas fa-chart-bar"/>',
                                    index: 0,
                                    title: '',
                                    class: 'chart-custom-icon',
                                    click: () => {
                                        console.log('chart bar');
                                    }
                                },
                                {
                                    icon: '<i class="fas fa-chart-area"/>',
                                    index: 0,
                                    title: '',
                                    class: 'chart-custom-icon',
                                    click: () => {
                                        console.log('chart area');
                                        this.state.typeChart = 'area';
                                    }
                                }
                            ]
                        }
                    }
                },
                stroke: {
                    width: [2, 2, 5],
                    /*curve: 'smooth',*/
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%'
                    }
                },

                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                //labels: props.labels,
                //labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'number',
                    categories: props.labels,
                },
                yaxis: [props.yaxis],
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " ";
                                //return y.toFixed(0) + " points";
                            }
                            return y;
                        }
                    }
                }
            },
            series: [],
        };

    }

    //componentWillReceiveProps(props){
    componentDidUpdate(props){

        console.log("============================================================");
        console.log("============================================================");
        console.log("============================================================");
        console.log("============================================================");
        console.log("============================================================");
        console.log("============================================================");

        if(props.series){

            if(props.series != this.state.series || props.labels != this.state.labels){

                let labels = [];
                for(let i in props.labels){
                    labels.push(props.labels[i]);
                }

                let options = this.state.options;
                options.xaxis.categories = props.labels;
                options.yaxis = props.yaxis;
                for(let i in options.yaxis){
                    //options.yaxis[i]['labels'] = {
                    options.yaxis[i] = {
                        formatter: function(val, index) {
                            return val.toFixed(options.yaxis[i]['decimais']);
                        }
                    }
                }
                this.setState({series: props.series, options: options, labels: labels}, function(){
                    console.log(this.props.id);
                    console.log(this.props.id, 'labels', labels);
                    console.log(this.props.id, 'series', props.series);
                    console.log(this.props.id, 'options', options);

                    ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                    ApexCharts.exec(this.props.id, 'updateOptions', options);
                   // }


                });

            }
        }

    }

    render() {

        //console.log(this.state.series);

        if(!this.state.series){
            return;
        }

        return (
            <div>
                <div id={this.props.id}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                </div>
                <div id={"html-dist-"+this.props.id}>
                </div>
            </div>
        );
    }
}
