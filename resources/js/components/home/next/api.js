class NextOsc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextsOsc: [],
        };

        this.load = this.load.bind(this);
    }

    componentDidMount(){
        this.load();
    }

    load(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl+'menu/osc/area_atuacao',
            //url: 'http://172.22.0.3/api/menu/osc/area_atuacao',
            data: {
            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({data: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    callMenu(index){
        //console.log("2 ", index);
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl+'osc/listaareaatuacao/'+index,
            //url: 'http://172.22.0.3/api/osc/listaareaatuacao/'+index,
            data: {
            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.setState({nextsOsc: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });

        $("#txtNext").hide(1000);



        /*$(".divOff").hide(1000);
        $("#divChart"+index).first().slideDown("slow");

        $(".menu-left-active").attr('class', "list-group-item-theme");
        $("#divMenuChart"+index).attr('class', "menu-left-active");*/
    }


    render(){

        //console.log("1 ", this.state.nextsOsc.length);
        console.log("1 ", nextOscTitle);



        let menu = null;
        if(this.state.data){
           menu = this.state.data.map(function (item, index) {
                return (
                    <li id={'menuArea'+index}>
                        <a onClick={() => this.callMenu(item.cd_area_atuacao)}>
                            <i className={"fa fa-user theme-"+index}/>
                            <p>{item.tx_nome_area_atuacao}</p>
                        </a>
                    </li>
                )
            }.bind(this));
        }

        let nextOsc = null;
        let nextOscTitulo = null;
        let totalnextsOsc =  this.state.nextsOsc.length



        if(this.state.nextsOsc){
            nextOsc = this.state.nextsOsc.map(function (item, index) {
                return (
                    <div id={'icon'+index} className="rotate" onClick={() => this.callMenu2(item.id_osc)}>
                        <div className="circle-item">
                            <img src="img/sem-imagem.png" alt="{item.id_osc}" width="65"/>
                        </div>
                    </div>
                )
            }.bind(this));

            nextOscTitulo = this.state.nextsOsc.map(function (item, index) {
                return (
                    <li id={'txt'+index}>
                        <a href={"detalhar/"+item.id_osc+"/"+item.tx_nome_osc} className="circle-item">
                            {index+1} {item.tx_nome_osc} <i className="fas fa-file-import"/>
                        </a>
                        <hr/>
                    </li>
                )
            }.bind(this));
        }



        return (
            <div className="col-md-12">
                <div className="text-center">
                    <ul className="menu-items">
                        {menu}
                    </ul>
                </div>

                <div className="row">
                    <div className="col-md-7 bg-map" style={{backgroundImage: "url(" + nextOscImg + ")"}}>
                        <div className="icon-next">
                            <i className="fas fa-user"/>
                        </div>
                        <div className="circle">
                            {nextOsc}
                        </div>
                        <div className="circle2">
                            {nextOsc}
                        </div>
                    </div>



                    <div className="col-md-5">
                        <br/><br/><br/>
                        <h2>{totalnextsOsc} {nextOscTitle}</h2>
                        <ul className="menu-items-basic">
                            {nextOscTitulo}
                        </ul>

                        <p id="txtNext"> {nextOscDescription}</p>
                    </div>
                </div>

                <br/><br/><br/>
            </div>

        );

    }


}


ReactDOM.render(
    <NextOsc />,
    document.getElementById('nextOsc')
);




