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
                1: 'fas fa-hotel ',
                2: 'fas fa-briefcase-medical ',
                3: 'fas fa-theater-masks ',
                4: 'fas fa-graduation-cap ',
                5: 'fas fa-hands-helping ',
                6: 'fas fa-church ',
                7: 'fas fa-users ',
                8: 'fas fa-seedling ',
                9: 'fas fa-balance-scale ',
                10: 'fas fa-text-width ',
                11: 'fas fa-ellipsis-h ',
                12: '',
            },
            dataAtuacaoBd: [],
            dataAtuacaoSelected: [],
            form: {
                tx_nome_outra: '',
            },
            boxInfo: false,
            dataCnae: '',
            dataCnaeArea: '',
            dataCnaeSubArea: [],
            tooltip: 'Informações provenientes de bases de dados oficiais. Não é possível editar',

        };

        this.listArea = this.listArea.bind(this);
        this.listAreaSelected = this.listAreaSelected.bind(this);
        this.listCnae = this.listCnae.bind(this);
        this.listCnaeArea = this.listCnaeArea.bind(this);
        //this.checkArea = this.checkArea.bind(this);
        this.checkSubArea = this.checkSubArea.bind(this);
        this.checkedOutros = this.checkedOutros.bind(this);
        this.callSubareaAtuacao = this.callSubareaAtuacao.bind(this);
        this.loadSubareas = this.loadSubareas.bind(this);
        this.saveOutrosSub = this.saveOutrosSub.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    componentDidMount(){
        this.listArea();
        this.listAreaSelected();
        this.listCnae();
        this.listCnaeArea();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
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

    listCnae(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'osc/dados_gerais/'+702542,
            url: getBaseUrl+'osc/dados_gerais/'+this.props.id,
            success: function (data) {
                this.setState({loading: false, dataCnae: data.tx_nome_atividade_economica_osc})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listCnaeArea(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/areas_atuacao/'+597188,//789809
            url: getBaseUrl2+'osc/areas_atuacao/'+this.props.id,
            success: function (data) {
                let dataArea = '';
                data.find(function(item){
                    dataArea = item.dc_area_atuacao.tx_nome_area_atuacao;
                });


                this.setState({loading: false, dataCnaeArea: dataArea, dataCnaeSubArea: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listAreaSelected(){
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/areas_atuacao_rep/'+789809,
            url: getBaseUrl2+'osc/areas_atuacao_rep/'+this.props.id,
            success: function (data) {
                let itensAreas = [];
                let areasAtuacao = this.state.areaAtuacao;

                areasAtuacao.find((item) => {
                    item.checkedAtuacaoArea = false;
                });

                data.find(function(item){
                    itensAreas.push(item.cd_area_atuacao);
                    areasAtuacao.find((area) => {
                        if(item.cd_area_atuacao === area.cd_area_atuacao){
                            area.checkedAtuacaoArea = true;
                        }
                    });
                });

                this.setState({
                    dataAtuacaoSelected: itensAreas,
                    dataAtuacaoBd: data,
                    areasAtuacao: areasAtuacao,
                }, function(){
                    this.loadSubareas();
                });

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    loadSubareas(){
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
                    item.subareas = data.filter(function(subitem){
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });

                this.setState({loading: false, areaAtuacao: areaAtuacao, titleSub:true, imputOutros:imputOutros})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubareaAtuacao(e){

        let id = e.target.id.split("_")[1];
        let areas = this.state.areaAtuacao;

        /////////////////////////
        this.setState({boxInfo: false});
        let arrayAreas = [];

        this.state.dataAtuacaoBd.find(function(itemSelectSub){
            arrayAreas.push(itemSelectSub.cd_area_atuacao);
        });
        const arrUnique = [...new Set(arrayAreas)];

        if(arrUnique.indexOf(parseInt(id)) != -1){
            this.setState({boxInfo: true});
            return;
        }

        /////////////////////////


        areas.find((item) => {
            if(item.cd_area_atuacao == id){
                item.checkedAtuacaoArea = !item.checkedAtuacaoArea;
            }
        });

        if(areas[0].subareas){
            let checkedAtuacao = false;
            areas.find(function(item){
                if(item.cd_area_atuacao === id){
                    item.checked = !item.checked;
                    checkedAtuacao = !item.checked;
                }
            });

            this.setState({areaAtuacao: areas});
            return;
        }

        this.setState({button:false});
    }


    checkSubArea(area_id, subarea_id, checkedAtuacao, idSelectedSub){
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

        /*//////////////////*/
        if(checkedAtuacao!==true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/area_atuacao_rep',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {
                    //id_osc: 789809,
                    id_osc: this.props.id,
                    cd_area_atuacao: area_id,
                    cd_subarea_atuacao: subarea_id,
                    ft_area_atuacao: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    this.listAreaSelected();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/area_atuacao_rep/'+idSelectedSub,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {

                },
                cache: false,
                success: function(data){
                    this.listAreaSelected();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }
        /*//////////////////*/

        this.setState({areaAtuacao: areas});
    }

    checkedOutros(area_id){
        let checked = false;
        this.state.areaAtuacao.find(function(item){
            if(item.cd_area_atuacao === area_id){
                if(item.subareas){
                    item.subareas.find(function(subitem){
                        this.state.dataAtuacaoBd.find(function(itemSelectSub){
                            if(itemSelectSub.cd_subarea_atuacao===subitem.cd_subarea_atuacao){
                                subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                if(subitem.tx_nome_subarea_atuacao === "Outros"){
                                    checked = true;
                                }
                            }
                        }.bind(this));
                    }.bind(this));
                }
            }
        }.bind(this));

        return checked;
    }
    saveOutrosSub(id){
        this.setState({saveLoading: id});
        $.ajax({
            method: 'PUT',
            url: getBaseUrl2+'osc/area_atuacao_rep/'+id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            data: {
                tx_nome_outra: this.state.form.tx_nome_outra,
            },
            cache: false,
            success: function(data) {
                this.setState({saveLoading: false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    render(){

        let areaAtuacao = null;
        let subareaAtuacao = [];
        if(this.state.areaAtuacao){
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;


                if(item.subareas){
                    subarea = item.subareas.map(function(subitem){

                        subitem.checkedSubarea = false;
                        subitem.idSelectedSub = 0;

                        this.state.dataAtuacaoBd.find(function(itemSelectSub){
                            if(itemSelectSub.cd_subarea_atuacao===subitem.cd_subarea_atuacao){
                                subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                subitem.checkedSubarea = true;
                                item.tx_nome_outra = itemSelectSub.tx_nome_outra;
                                item.idSelectedSub = itemSelectSub.id_area_atuacao;
                            }
                        });


                        return(
                            <div key={"subarea_"+subitem.cd_subarea_atuacao}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkSubArea(item.cd_area_atuacao, subitem.cd_subarea_atuacao, subitem.checkedSubarea, subitem.idSelectedSub)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+subitem.cd_subarea_atuacao} required defaultChecked={subitem.checkedSubarea}/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+subitem.cd_subarea_atuacao} >{subitem.tx_nome_subarea_atuacao}</label>
                                </div>
                                <br />
                            </div>
                        );
                    }.bind(this));
                }

                subareaAtuacao.push(
                    <div key={"divArea_"+item.cd_area_atuacao} className="card" style={{display: item.checkedAtuacaoArea ? '' : 'none'}}>
                        <div className="bg-lgt p-2">
                            <strong><i className={(this.state.icons[item.cd_area_atuacao])+" fa-1x"}/> {item.tx_nome_area_atuacao}</strong><br/>
                            <hr/>
                            {subarea}
                            <div style={{display: this.checkedOutros(item.cd_area_atuacao) ? '' : 'none'}}>
                                <input className={"form-control form-g "} type="text" name="tx_nome_outra"  placeholder=" " onChange={this.handleInputChange} defaultValue={item.tx_nome_outra}/>

                                <div className="float-right" onClick={() => this.saveOutrosSub(item.idSelectedSub)}  style={{margin: '-30px 10px 0 0'}}>
                                    <div style={{display: this.state.saveLoading===item.idSelectedSub ? 'none' : ''}}><i className="far fa-save"/></div>
                                    <div style={{display: this.state.saveLoading===item.idSelectedSub ? '' : 'none'}}><i className="fa fa-spin fa-spinner"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

                return (
                    <div className="col-md-3" key={"area_"+item.cd_area_atuacao}>
                        <div className="bg-lgt items-checkbox custom-checkbox-items">
                            <div className="custom-control custom-chetckbox text-center">
                                <input type="checkbox" className="custom-control-input" onChange={this.callSubareaAtuacao} id={"area_"+item.cd_area_atuacao} required checked={item.checkedAtuacaoArea}/>
                                <label className="custom-control-label" htmlFor={"area_"+item.cd_area_atuacao} ><i className={(this.state.icons[item.cd_area_atuacao])+" fa-2x"}/>
                                    <p>{item.tx_nome_area_atuacao}</p>
                                </label>
                            </div>
                        </div>
                        <br/>
                    </div>
                );
            }.bind(this));
        }


        /////////////////////////////////////////
        let areaAtuacaoCnae = null;
        if(this.state.dataCnaeSubArea){
            areaAtuacaoCnae = this.state.dataCnaeSubArea.map(function (item) {

                let teste = '';
                if(item.dc_subarea_atuacao===null){
                    teste = 'Não informado';
                }else{
                    teste = item.dc_subarea_atuacao.tx_nome_subarea_atuacao;
                }

                return (
                    <div key={"area_"+item.cd_area_atuacao}>
                        <strong>Subárea: </strong>{teste}
                    </div>
                );
            }.bind(this));
        }
        /////////////////////////////////////////


        return(

            <div className="row">
                <div className="col-md-12">
                    <div className="title-user-area">
                        <div className="mn-accordion-icon"><i className="fa fa-share-alt" aria-hidden="true"/></div>
                        <h3>Áreas e Subáreas de atuação da OSC</h3>
                        <hr/><br/>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="alert alert-secondary">

                                <div className="tooltips float-right">
                                    <i className="fas fa-database tx-pri"/>
                                    <span className="tooltiptext">{this.state.tooltip}</span>
                                </div>

                                <strong>Atividade econômica (CNAE): </strong> {this.state.dataCnae} <br/>
                                <strong>Área de Atuação: {this.state.dataCnaeArea}</strong>{areaAtuacaoCnae}
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <strong>Área de Atuação</strong><hr/>
                            <div className="row">
                                <div className="alert alert-danger" role="alert" style={{position: 'fixed', zIndex: '999', display: this.state.boxInfo ? '' : 'none'}}>
                                     É preciso excluir as Subárea de Atuação, para desativar uma área!  <button className="btn btn-danger" onClick={this.callSubareaAtuacao} >X</button>
                                </div>

                                {areaAtuacao}
                                <br/>
                                <div className="col-md-12"  style={{display: this.state.imputOutros ? '' : 'none'}}>
                                    <input className={"form-control form-g "} type="text" name="tx_nome_uf"  placeholder=" "/><br/>
                                </div>

                            </div>
                            <div>
                                <div className="text-center" style={{display: this.state.dataAtuacaoBd.length>0 ? 'none' : ''}}>Selecione uma área e subárea de atuação!</div>
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
    <Atuacoes id={id}/>,
    document.getElementById('atuacoes')
);
