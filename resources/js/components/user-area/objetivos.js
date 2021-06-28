class Objetivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showIcon: false,
            objetivos: [],
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,
            dataChkboxMetas: [],

            tour1: true,
            tour2: false,

            loading: false,
            loadingSave: false,
            metaSelected: 0,
            maxObjetivos: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.checkMetas = this.checkMetas.bind(this);
        this.listChkboxMetas = this.listChkboxMetas.bind(this);
        this.checkMetas = this.checkMetas.bind(this);
        this.listObjetivos = this.listObjetivos.bind(this);
        this.listChkboxMetas = this.listChkboxMetas.bind(this);
        this.listArea = this.listArea.bind(this);

        this.desativarTour = this.desativarTour.bind(this);
    }

    desativarTour(acao){

        if(acao===1){
            this.setState({tour1: false})
            this.setState({tour2: true})
        }
        if(acao===0){
            this.setState({
                tour1: false,
                tour2: false,
            })
        }
    }

    componentDidMount(){
        this.listArea();
        this.listChkboxMetas();
        this.listObjetivos();
        if(localStorage.getItem('tourODS')==="false"){
            this.setState({
                tour1: false,
                tour2: false,
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        //const name = target.name;

        //let form = this.state.form;
        //let txt = this.state.txt;
        //form[name] = value;

        //this.setState({form: form, txt: txt});
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        //let form = this.state.form;
        //let txt = this.state.txt;

        this.setState({requireds: requireds});
        return valid;
    }

    listArea(){
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'menu/osc/objetivo_projeto',
            url: getBaseUrl2 + 'objetivos',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });
                this.setState({objetivos: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listObjetivos(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/objetivos/'+this.props.id,
            success: function (data) {
                let objetosSelected = [];
                data.find(function(item){
                    objetosSelected.push(item.meta_projeto.objetivo_projeto.cd_objetivo_projeto);
                });

                const arrUnique = [...new Set(objetosSelected)];
                this.setState({datalistObjetivos: arrUnique});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubobjetivos(id){

        let maxObjetivos = false;
        if(this.state.datalistObjetivos.indexOf(id)!==-1){
            maxObjetivos = true;
        }

        this.setState({maxObjetivos: maxObjetivos})

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'objetivos/metas/'+id,
            success: function (data) {

                let objetivos = this.state.objetivos;
                let titleObjetivo = this.state.objetivos[id-1].tx_nome_objetivo_projeto;

                data.find(function(item){
                    item.display = true;
                    item.checked = false;

                });

                objetivos.find(function(item){
                    if(item.metas){
                        item.metas.find(function(itemMeta){
                            itemMeta.display = false;
                        });
                        if(item.cd_objetivo_projeto === id){
                            item.metas.find(function(itemMeta){
                                itemMeta.display = true;
                            });
                        }
                    }
                    if(item.cd_objetivo_projeto === id && !item.metas){
                        item.metas = data;
                    }
                });

                this.setState({
                    objetivos: objetivos,
                    id_area:id,
                    buttonObjetivos:id,
                    titleMeta:true,
                    titleObjetivo:titleObjetivo
                })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    /*callSubobjetivos(id){
        this.setState({button:false, loading: true, loadingSave: false});

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'objetivos/metas/'+id,
            success: function (data) {

                let objetivos = this.state.objetivos;
                let titleObjetivo = this.state.objetivos[id-1].tx_nome_objetivo_projeto;

                data.find(function(item){
                    item.display = true;
                    item.checked = false;

                });
                objetivos.find(function(item){
                    if(item.metas){
                        item.metas.find(function(itemMeta){
                            itemMeta.display = false;
                        });

                        if(item.cd_objetivo_projeto === id){
                            item.metas.find(function(itemMeta){
                                itemMeta.display = true;
                            });
                        }
                    }
                    if(item.cd_objetivo_projeto === id && !item.metas){
                        item.metas = data;
                    }
                });

                this.setState({objetivos: objetivos, id_area:id, buttonObjetivos:id, titleMeta:true, titleObjetivo:titleObjetivo, loading: false, loadingSave: true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }*/

    listChkboxMetas(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/objetivos/'+this.props.id,
            success: function (data) {
                data.find(function(item){
                    item.checked = true;
                    item.metas = null;
                });

                this.setState({dataChkboxMetas: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    checkMetas(cd_objetivo, cd_meta, id_objetivo_osc, checkedMeta){

        this.setState({loading: true, loadingSave: false, metaSelected: cd_meta});

        let objetivos = this.state.objetivos;
        objetivos.find(function(item){
            if(item.cd_objetivo_projeto === cd_objetivo){
                item.metas.find(function (itemMeta) {
                    if(itemMeta.cd_meta_projeto === cd_meta){
                        itemMeta.checked = true;
                    }
                });
            }
        });

        if(checkedMeta===true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/objetivo',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {
                    cd_meta_osc: cd_meta,
                    //id_osc: 455128,
                    id_osc: this.props.id,
                    ft_objetivo_osc: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    this.listObjetivos();
                    this.listChkboxMetas();
                    this.setState({loading: false, loadingSave: true});
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/objetivo/'+id_objetivo_osc,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {

                },
                cache: false,
                success: function(data){
                    this.listObjetivos();
                    this.listChkboxMetas();
                    this.setState({loading: false, loadingSave: true});
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }


        this.setState({objetivos: objetivos});
    }




    render(){

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = [];
        if(this.state.objetivos){
            objetivos = this.state.objetivos.map(function (item) {


                let checkedMetas = false;


                if(this.state.datalistObjetivos){
                    if(this.state.datalistObjetivos.indexOf(item.cd_objetivo_projeto) != -1){
                        checkedMetas = true;
                    }
                }

                let png = padDigits(item.cd_objetivo_projeto, 2);

                if(item.metas){

                    metas.push(item.metas.map(function (itemMeta) {

                        let checkedMeta2 = false;
                        let id_objetivo_osc = 0;
                        this.state.dataChkboxMetas.find((itemChecked) => {
                            if(itemMeta.cd_meta_projeto === itemChecked.cd_meta_osc){
                                checkedMetas = true;
                                checkedMeta2 = true;
                                id_objetivo_osc = itemChecked.id_objetivo_osc;
                            }
                        });

                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_osc, !checkedMeta2)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required  defaultChecked={checkedMeta2} onChange={this.handleInputChange}/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto}  >{itemMeta.tx_nome_meta_projeto}</label>
                                </div>
                                <div className="save-check" style={{display: itemMeta.cd_meta_projeto===this.state.metaSelected ? '' : 'none'}}>
                                    <div style={{display: this.state.loadingSave ? '' : 'none'}}><i className="far fa-save text-success"/></div>
                                    <div style={{display: this.state.loading ? '' : 'none'}}><i className="fa fa-spin fa-spinner"/></div>
                                </div>
                                <hr />
                            </div>
                        );
                    }.bind(this)));
                }


                return (
                    <div className="custom-control custom-checkbox" key={"area_"+item.cd_objetivo_projeto} onChange={() => this.callSubobjetivos(item.cd_objetivo_projeto)} style={{paddingLeft: 0}}>
                        <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_objetivo_projeto} required />
                        <label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '0', marginRight: '5px', paddingBottom: 0, }}>
                            <img src={"img/ods/" + png + ".png"} alt="" className={(checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos==item.cd_objetivo_projeto ? " item-focus" : "")} width="83" style={{position: 'relative'}} title={item.tx_nome_objetivo_projeto}/>
                        </label>
                    </div>
                );
            }.bind(this));
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-user-area">
                                    <div className="mn-accordion-icon"><i className="fas fa-globe-americas" aria-hidden="true"/></div>
                                    <h3>Objetivos do Desenvolvimento Sustentável - ODS</h3>
                                    <hr/>
                                    {/*<p>Você pode alinhar as atividades da sua OSC aos ODS da ONU. É muito simples. Basta escolher até 3 ODS relacionados às ações desenvolvidas e suas respectivas metas. O salvamento dessa página é automático.</p>*/}
                                    <br/>
                                </div>
                            </div>
                        </div>

                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    {/*=============================*/}
                                    <Tour
                                        position={0}//0 pular | 1 finalizar 2 1 none
                                        passo={1}
                                        txt={'Você pode alinhar as atividades da sua OSC aos ODS da ONU. É muito simples. Basta escolher até 3 ODS relacionados às ações desenvolvidas e suas respectivas metas, Para visualizar o próximo passo selecione um Objetivo.'}
                                        top={'-240px'}
                                        right={''}
                                        display={this.state.tour1}
                                        desativarTour={this.desativarTour}
                                        storage={'tourODS'}
                                    />
                                    {/*=============================*/}
                                    <div>
                                        {objetivos}
                                        <br/><br/>
                                    </div>
                                    <div style={{display: this.state.titleMeta ? '' : 'none'}}>
                                        <strong>Metas relacionadas ao ODS definido</strong><hr/>
                                        <div>
                                            <strong>{this.state.titleObjetivo}</strong><br/><br/>
                                            {/*=============================*/}
                                            <Tour
                                                position={1}//0 pular | 1 finalizar | 2 none
                                                passo={2}
                                                txt={'Selecione quais metas a sua organização se enquadra, ao clicar o salvamento será automático.'}
                                                top={'140px'}
                                                right={'8px'}
                                                float={''}
                                                display={this.state.tour2}
                                                desativarTour={this.desativarTour}
                                                storage={'tourRecursos'}
                                            />
                                            {/*/=============================*/}
                                            <div style={{display: this.state.maxObjetivos ? '' : 'none'}}>
                                                {metas}
                                            </div>
                                            <div className="alert alert-info"  style={{display: this.state.maxObjetivos ? 'none' : ''}}>
                                                <p>Você atingiu a quantidade máxima de objetivos permitidos (3)! </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="space"/>

                    </div>
                </div>
            </div>


        );
    }
}

ReactDOM.render(
    <Objetivos id={id}/>,
    document.getElementById('objetivos')
);
