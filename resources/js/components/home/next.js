class Indicator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mychart: null,
            loading: false,
            yaxis: [],
            labels: [],
            series: [],
            charts: [],
            table: [],
            modal: {
                name: null,
                fontes: null,
                head: [],
                rows: []
            },
            menu: [],
        };

        this.loadChart = this.loadChart.bind(this);
        this.callModal = this.callModal.bind(this);
        this.callMenu = this.callMenu.bind(this);
    }

    componentDidMount(){
        //this.loadChart();
    }

    componentWillReceiveProps(props){

        let data = props.data;

        let charts = [];

        for(let chart in data){
            //console.log("######"+i+"######");
            let dataChart = data[chart].series_1;

            let labels = [];
            let series = [];
            let name = data[chart].titulo;
            let fontes = data[chart].fontes.join(', ')
            let tituloX = data[chart].titulo_colunas[0];
            let tituloY = data[chart].titulo_colunas[1];

            //let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" ? "column" : data[chart].tipo_grafico;
            let tipoGrafico = data[chart].tipo_grafico === "MultiBarChart" || data[chart].tipo_grafico === "BarChart" ? "column" :
                data[chart].tipo_grafico === "DonutChart" ? "pie" :
                data[chart].tipo_grafico;

            for(let j in dataChart){

                if(tipoGrafico === "pie"){
                    labels.push(dataChart[j].label);
                    series.push(dataChart[j].value);

                    continue;
                }

                //Quando tiver o key///////////////////////////////
                if(dataChart[j].hasOwnProperty('key')){

                    labels.push(dataChart[j].key);
                    let values = dataChart[j].values;

                    for(let k in values){

                        if(!series[k]){
                            series[k] = {};
                        }

                        series[k].name = values[k].label;
                        series[k].type = tipoGrafico;
                        if(!series[k].hasOwnProperty('data')){
                            series[k].data = [];
                        }
                        series[k].data[j] = values[k].value;
                    }
                    continue;
                }
                ///////////////////////////////////////////////////

                //Não é executado se tiver o key//////////////
                if(!series[0]){
                    series[0] = {
                        type: '',
                        data: []
                    };
                }
                labels.push(dataChart[j].label)
                //labels.push("")
                series[0].name = "";
                series[0].type = tipoGrafico;
                series[0].data.push(dataChart[j].value);

                ///////////////////////////////////////////////
            }
            charts.push({chart: chart, name: name, fontes: fontes, labels: labels, series: series, type: tipoGrafico});
        }

        this.setState({
            charts: charts,
            data: props.data,
        }, function(){
            this.generateTable(props.data);
            this.generateMenu(props.data);
        });
    }

    generateTable(data){

        let tables = [];

        for(let chart in data) {
            //console.log("######"+i+"######");
            let dataTable = data[chart].series_2;
            if(!dataTable){
                dataTable = data[chart].series_1;
            }

            let name = data[chart].titulo;
            let fontes = data[chart].fontes.join(', ')
            let head = data[chart].titulo_colunas;
            let rows = [];

            for(let h in head){
                head[h] = replaceAll(head[h], "'", "");
            }

            for(let j in dataTable){
                let table = dataTable[j];
                //Quando tiver o key///////////////////////////////
                if(table.hasOwnProperty('key')){
                    for(let k in table.values){
                        if(!rows[j]){
                            rows[j] = [];
                        }
                        rows.push([table.key, table.values[k].label, table.values[k].value]);
                    }
                    continue;
                }
            }
            tables.push({data: {head: head, rows: rows}, name: name, fontes: fontes});
        }
        this.setState({tables: tables});
    }

    generateMenu(data){
        let menu = [];
        for(let i in data){
            menu.push(data[i].titulo);
        }
        this.setState({menu: menu});
    }
    callMenu(index){
        $(".divOff").hide(1000);
        $("#divChart"+index).first().slideDown("slow");

        $(".menu-left-active").attr('class', "list-group-item-theme");
        $("#divMenuChart"+index).attr('class', "menu-left-active");
    }

    loadChart(props){

    }

    callModal(chart){

        let modal = this.state.modal;

        let table = this.state.tables[chart];
        //console.log(table);
        modal.name = table.name;
        modal.fontes = table.fontes;

        modal.head = table.data.head.map(function (item, index){
            return (<th key={'thModal'+index}>{item}</th>);
        })

        modal.rows = table.data.rows.map(function (item, index){
            return (
                <tr key={'trModal'+index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                </tr>
            );
        });

        this.setState({modal: modal}, function(){
            $('#modalTable').modal('show');
        });
    }

    modal(){


        return (

        <div id="modalTable" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel"><strong>{this.state.modal.name}</strong></h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    {this.state.modal.head}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.modal.rows}
                            </tbody>
                        </table>

                        <div className="bd-callout bd-callout-warning">
                            <h5 id="incompatibilidade-jquery">Fonte:</h5>
                            <p className="box-chart-model-font">{this.state.modal.fontes}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>

                </div>
            </div>
        </div>
        )
    }

    showHideColumn(){
        document.getElementById('line').setAttribute("class", "col-md-9");
        document.getElementById('column').setAttribute("class", "col-md-3");
        document.getElementById('column').style.display = "block";
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top cursor");
        $(".divOff").hide(1000);
        $("#divChart0").show(1000);
    }
    showHideLine(){
        document.getElementById('line').setAttribute("class", "col-md-12");
        document.getElementById('column').style.display = "none";
        document.getElementById('iconLine').setAttribute("class", "fas fa-bars fa-2x float-right icons-top icons-top-active cursor");
        document.getElementById('iconColumn').setAttribute("class", "fas fa-columns fa-2x float-right icons-top cursor");
        $(".divOff").show(1000);
    }


    render(){

        let charts = null;
        let menu = null;
        let modal = this.modal();

        if(this.state.charts){

            charts = this.state.charts.map(function(item, index){

                let chart = null;
                switch (item.type) {
                    case "column":
                        chart = <MixedChart id={'mix-chart'+item.chart} yaxis={['Teste']} series={item.series} labels={item.labels}/>;
                        break;
                    case "pie":
                        chart = <PieChart id={'pie-chart'+item.chart} series={item.series} labels={item.labels}/>;
                        break;
                }

                return (
                    <div className="box-chart divOff" key={"divChart"+item.chart} id={"divChart"+index} style={{display: index === 0 ? 'block' : ''}}>
                        <div className="title-style" style={{perspective: '1000px'}}>
                            <h2>{index+1} - {item.name}</h2>
                            <div className="line line-fix block" data-move-x="980px"
                                 style={{opacity: '1', transition: 'all 1s ease 0s, opacity 1.5s ease 0s'}} />
                            <hr/>
                        </div>
                        {chart}
                        <p className="box-chart-font bg-lgt">
                            <strong>Fonte:</strong> {item.fontes}
                        </p>
                        <div className="btn btn-outline-primary float-right" onClick={() => this.callModal(item.chart)}>Visualize os dados em tabela
                        </div>
                        <br/><br/>
                    </div>

                );
            }.bind(this));
        }



        if(this.state.menu) {
            menu = this.state.menu.map(function (item, index) {
                return (
                    <li className={index === 0 ? 'menu-left-active' : ''} key={'menu' + index} id={"divMenuChart"+index} style={{cursor:'pointer'}}>
                        <a onClick={() => this.callMenu(index)}>{index + 1} - {item}</a>
                    </li>
                )
                //console.log(this.callMenu());
            }.bind(this));
        }

        return (

            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" style={{margin: '-20px 0 0 0'}}>
                            <a onClick={() => this.showHideLine()}><i id="iconLine" className="fas fa-bars fa-2x float-right icons-top curso-poite cursor"/></a>
                            <a onClick={() => this.showHideColumn()}><i id="iconColumn" className="fas fa-columns fa-2x float-right icons-top icons-top-active cursor"/></a>
                            <br/><br/>
                        </div>
                        <div id="column" className="col-md-3">
                            <ul className="menu-left menu-left-chart">
                               {menu}
                            </ul>
                        </div>
                        <div id="line" className="col-md-9">
                            {charts}
                        </div>
                    </div>
                    {modal}
                </div>
            </div>
        );

    }

}
