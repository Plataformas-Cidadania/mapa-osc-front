class Atuacoes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
            editId: 0,
            areaAtuacao: null,
            subareaAtuacao: null,
            titleSub: null,
            imputOutros: false,
            icons:{
                1: 'fas fa-hotel fa-2x',
                2: 'fas fa-briefcase-medical fa-2x',
                3: 'fas fa-theater-masks fa-2x',
                4: 'fas fa-graduation-cap fa-2x',
                5: 'fas fa-hands-helping fa-2x',
                6: 'fas fa-church fa-2x',
                7: 'fas fa-users fa-2x',
                8: 'fas fa-seedling fa-2x',
                9: 'fas fa-balance-scale fa-2x',
                10: '',
                11: '',
                12: '',
            },
        };

        this.listArea = this.listArea.bind(this);
        //this.checkArea = this.checkArea.bind(this);
        this.checkSubArea = this.checkSubArea.bind(this);
        this.checkedOutros = this.checkedOutros.bind(this);

    }

    componentDidMount(){
        this.listArea();
    }

    listArea(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/area_atuacao',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                });
                this.setState({loading: false, areaAtuacao: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubareaAtuacao(id){

        //this.checkArea(id);
        let areas = this.state.areaAtuacao;
        if(areas[0].subareas){
            areas.find(function(item){
                if(item.cd_area_atuacao === id){
                    item.checked = !item.checked;
                }
            });
            this.setState({areaAtuacao: areas});
            return;
        }

        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/subarea_atuacao',
            success: function (data) {
                let areaAtuacao = this.state.areaAtuacao;
                let imputOutros = this.state.imputOutros;

                data.find(function(item){
                    item.checked = false;
                });

                this.state.areaAtuacao.find(function(item){

                    if(item.cd_area_atuacao === id){
                        item.checked = !item.checked;
                        if(id===10){
                            imputOutros = !imputOutros;
                        }
                    }
                    item.subareas = data.filter(function(subitem){
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });
                this.setState({loading: false, areaAtuacao: areaAtuacao, id_area:id, titleSub:true, imputOutros:imputOutros})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    /*checkArea(id){
        console.log(id);
        let areas = this.state.areaAtuacao;
        areas.find(function(item){
            if(item.cd_area_atuacao === id){
                item.checked = !item.checked;
            }
        });
        this.setState({areaAtuacao: areas});
    }*/

    checkSubArea(area_id, subarea_id){
        console.log(area_id, subarea_id);
        let areas = this.state.areaAtuacao;
        areas.find(function(item){
            if(item.cd_area_atuacao === area_id){
                item.subareas.find(function(subitem){
                    if(subitem.cd_subarea_atuacao === subarea_id){
                        subitem.checked = !subitem.checked;
                    }
                });
            }
        });
        this.setState({areaAtuacao: areas});
    }

    checkedOutros(area_id){
        let checked = false;
        this.state.areaAtuacao.find(function(item){
            if(item.cd_area_atuacao === area_id){
                console.log('cd_area_atuacao', item.cd_area_atuacao);
                console.log(item.subareas);
                if(item.subareas){
                    item.subareas.find(function(subitem){
                        if(subitem.tx_nome_subarea_atuacao === "Outros"){
                            console.log("Outros");
                            checked = subitem.checked;
                            console.log('dentro do if', checked);
                        }
                    });
                }
            }
        });

        console.log(checked);

        return checked;
    }


    render(){

        //console.log(this.state.areaAtuacao);

        let areaAtuacao = null;
        let subareaAtuacao = [];
        if(this.state.areaAtuacao){
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;
                if(item.subareas){
                    subarea = item.subareas.map(function(subitem){
                        return(
                            <div key={"subarea_"+subitem.cd_subarea_atuacao}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkSubArea(item.cd_area_atuacao, subitem.cd_subarea_atuacao)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+subitem.cd_subarea_atuacao} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+subitem.cd_subarea_atuacao} >{subitem.tx_nome_subarea_atuacao}</label>
                                </div>
                                <br />
                            </div>
                        );
                    }.bind(this));
                }

                subareaAtuacao.push(
                    <div key={"divArea_"+item.cd_area_atuacao} className="card" style={{display: item.checked ? '' : 'none'}}>
                        <div className="bg-lgt p-2">
                            <strong><i className={this.state.icons[item.cd_area_atuacao]}/> {item.tx_nome_area_atuacao}</strong><br/>
                            <hr/>
                            {subarea}
                            <input className={"form-control form-g "} type="text" name="tx_nome_uf"  placeholder=" " style={{display: this.checkedOutros(item.cd_area_atuacao) ? '' : 'none'}}/>
                        </div>
                    </div>
                );

                return (
                    <div className="col-md-6" key={"area_"+item.cd_area_atuacao} onChange={() => this.callSubareaAtuacao(item.cd_area_atuacao)}>
                        <div className="bg-lgt items-checkbox">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_area_atuacao} required/>
                                <label className="custom-control-label" htmlFor={"area_"+item.cd_area_atuacao} ><i className={this.state.icons[item.cd_area_atuacao]}/>  {item.tx_nome_area_atuacao}</label>
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));
        }

        return(

        <div className="row">
            <div className="col-md-12">
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fa fa-share-alt" aria-hidden="true"/></div>
                    <h3>Áreas e Subáreas de atuação da OSC</h3>
                    <hr/><br/>
                </div>
                <div className="text-center">Atividade econômica (CNAE)</div>
                <br/>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <strong>Área de Atuação</strong><hr/>
                        <div className="row">
                            {areaAtuacao}
                            <br/>
                            <br/>
                            <div className="col-md-12"  style={{display: this.state.imputOutros ? '' : 'none'}}>
                                <input className={"form-control form-g "} type="text" name="tx_nome_uf"  placeholder=" "/><br/>
                            </div>

                        </div>
                        <div style={{display: this.state.titleSub ? '' : 'none'}}>
                            <strong>Subárea de Atuação</strong><hr/>
                            <div className="card-columns">
                                {subareaAtuacao}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}


ReactDOM.render(
<Atuacoes/>,
    document.getElementById('atuacoes')
);