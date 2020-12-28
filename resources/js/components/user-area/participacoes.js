class Participacoes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            conferencias:[],
            conselhos:[],
            outros:[],
            tipo:{
                1: 'Residencial',
                2: 'Comercial',
            },
            principal:{
                1: 'Endereço principal',
                2: ' ',
            },

            showFormConselho: false,
            showFormConferencia: false,
            showFormOutro: false,

            actionFormConselho: '',
            actionFormConferencia: '',
            actionFormOutro: '',


            loadingRemove: [],

            conferencia: {},
            conselho: {},
            outro: {},

            editIdConselho: 0,
            editIdConferencia: 0,
            editIdOutro: 0,
            editId: 0,

            removeConselho: [],
            removeItem: [],
            removeOutro: [],


            removeItemConselho: null,
            removeItemTx: '',
            removeTipo: '',
        };

        this.list = this.list.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
        this.showHideFormOutro = this.showHideFormOutro.bind(this);

        this.closeFormConselho = this.closeFormConselho.bind(this);
        this.closeFormConferencia = this.closeFormConferencia.bind(this);
        this.closeFormOutro = this.closeFormOutro.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);

        this.removeItem = this.removeItem.bind(this);

        this.callModal = this.callModal.bind(this);

        this.callModalExcluir = this.callModalExcluir.bind(this);



    }

    componentDidMount(){
        this.list();
    }


    /*editConselho(id){
        this.setState({actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id}, function(){
            this.callModal();
        });
    }
    editConferencia(id){
       // this.setState({actionForm: 'edit'});
        this.setState({actionFormConferencia: 'edit', showFormConferencia: false, editIdConferencia: id}, function(){
            this.callModal();
        });
    }*/
    /*editOutro(id){
       // this.setState({actionForm: 'edit'});
        this.setState({actionFormOutro: 'edit', showFormOutro: false, editIdOutro: id}, function(){
            this.callModal();
        });
    }*/




    cancelRemove(id){
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({remove: remove});
    }


    showHideFormConselho(action){
        let showFormConselho = !this.state.showFormConselho;
        let actionFormConselho = action;
        console.log(showFormConselho);
        this.setState({showFormConselho: showFormConselho, actionFormConselho: actionFormConselho});
    }
    showHideFormConferencia(action){
        let showFormConferencia = !this.state.showFormConferencia;
        let actionFormConferencia = action;
        console.log(showFormConferencia);
        this.setState({showFormConferencia: showFormConferencia, actionFormConferencia: actionFormConferencia});
    }
    showHideFormOutro(action){
        let showFormOutro = !this.state.showFormOutro;
        let actionFormOutro = action;
        console.log(showFormOutro);
        this.setState({showFormOutro: showFormOutro, actionFormOutro: actionFormOutro});
    }

    showHideConselho(action){
        let showConselho = !this.state.showConselho;
        let actionConselho = action;
        this.setState({showConselho: showConselho, actionConselho: actionConselho});
    }

    showHideConferencia(action){
        let showConferencia = !this.state.showConferencia;
        let actionConferencia = action;
        this.setState({showConferencia: showConferencia, actionConferencia: actionConferencia});
    }

    showHideOutro(action){
        let showOutro = !this.state.showOutro;
        let actionOutro = action;
        this.setState({showOutro: showOutro, actionOutro: actionOutro});
    }

    closeFormConselho(){
        this.setState({showForm: false});
    }

    closeFormConferencia(){
        this.setState({showFormConferencia: false});
    }

    closeFormOutro(){
        this.setState({showFormOutro: false});
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/participacao_social/611720',
            //url: getBaseUrl2 + 'osc/participacao_social/785239',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({
                    conferencias: data.conferencias_politicas_publicas,
                    conselhos: data.conselhos_politicas_publicas,
                    outros: data.outros_espacos_participacao_social,
                    loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    removeItem(id, tipo){
        let remove = this.state.removeConselho;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/ps_'+tipo+'/'+id,
            data: {

            },
            cache: false,
            success: function(data){
                this.list();
                $('#modalFormExcluir').modal('hide');
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });

    }

    callModalExcluir(id, tx_nome_conferencia, tipo){
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItemConferencia:id,
            removeItemTx:tx_nome_conferencia,
            removeTipo:tipo
        }, function(){
            $('#modalFormExcluir').modal('show');
        });
    }

    callModal(id, type){
        let modal = this.state.modal;
        console.log('111');
        this.setState({
            modal: modal,
            editId:id,
            editTipo:type
        }, function(){
            $('#modalForm').modal('show');
            //this.editOutro(id);
        });
    }

    modalExcluir(){
        return (
            <div id="modalFormExcluir" className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" ><strong>Excluir permanentemente</strong></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Tem certeza que quer excluir "{this.state.removeItemTx}".
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.removeItem(this.state.removeItemConferencia, this.state.removeTipo)}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    modal(){
        return (

            <div id="modalForm" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel"><strong>{this.state.modalTitle}</strong></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            *{this.state.editTipo}*
                            <div style={{display: this.state.editTipo=='outra' ? 'block' : 'none'}}>
                                <FormEditParticipacaoOutro
                                    action={this.state.actionForm}
                                    list={this.list}
                                    id={this.state.editId}
                                    /*showHideForm={this.showHideForm}*/
                                    closeForm={this.closeForm}/>
                            </div>
                            <div style={{display: this.state.editTipo=='conferencia' ? 'block' : 'none'}}>
                                <FormEditParticipacaoConferencia
                                    action={this.state.actionForm}
                                    list={this.list}
                                    id={this.state.editId}
                                    /*showHideForm={this.showHideForm}*/
                                    closeForm={this.closeForm}/>
                            </div>
                            {/*<FormParticipacaoConselho
                                action={this.state.actionForm}
                                list={this.list}
                                id={this.state.editId}
                                showHideForm={this.showHideForm}
                                closeForm={this.closeForm}/>*/}
                        </div>


                    </div>
                </div>
            </div>
        )
    }


    render(){

        /////////////////////////////
        let modal = this.modal();
        let modalExcluir = this.modalExcluir();

        ////////////////////////////

        let conselhos = this.state.conselhos.map(function(item, index){


            return (

                <div className="col-md-6" style={{border: '0'}} key={"conselho_"+index}>
                    <div className="box-insert-g text-left">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <div className="float-right">


                                <a onClick={() => this.callModalExcluir(item.id_conselho, item.dc_conselho.tx_nome_conselho, 'conselho')} style={{cursor: 'pointer'}}>
                                    <i className="far fa-trash-alt text-danger float-right"/>
                                </a>

                                <a onClick={() => this.callModal(item.id_conselho)} style={{cursor: 'pointer'}}>
                                    <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}} />
                                </a>


                                {/*<a className="box-itens-btn-edit" onClick={() => this.callModal(item.id_conselho)}><i className="fa fa-edit"/></a>&nbsp;

                                <a className="box-itens-btn-del" onClick={() => this.removeConselho(item.id_conselho)} style={{display: this.state.loadingRemove[item.id_conselho] ? 'none' : 'block'}}>
                                    <i className={"fa "+( this.state.removeConselho[item.id_conselho] ? "fa-times text-danger" : "fa-trash-alt text-danger")}/>
                                </a>
                                <a onClick={() => this.cancelRemove(item.id_conselho)} style={{display: this.state.removeConselho[item.id_conselho] && !this.state.loadingRemove[item.id_conselho] ? 'block' : 'none'}}>
                                    <i className={"fa fa-undo"}/>
                                </a>
                                <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id_conselho] ? '' : 'none'}}/>*/}
                            </div>
                            <br/>
                            <div>
                                <h3>Nome do Conselho:</h3>
                                <p>{item.dc_conselho.tx_nome_conselho}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Titularidade:</h3>
                                <p>{item.dc_tipo_participacao.tx_nome_tipo_participacao}</p>
                                <hr/>
                            </div>
                            {/*<div>
                                <h3>Nome de representante:</h3>
                                <p>*For*</p>
                                <hr/>
                            </div>*/}
                            <div>
                                <h3>Periodicidade da Reunião:</h3>
                                <p>{item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Data de início de vigência:</h3>
                                <p>{item.dt_data_inicio_conselho}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Data de fim de vigência:</h3>
                                <p>{item.dt_data_fim_conselho}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {modal}
                </div>

            );
        }.bind(this));


        let conferencias = this.state.conferencias.map(function(item, index){

            let hr = null;
            if(index < this.state.conferencias.length-1){
                hr = <hr/>;
            }

            return (

                <div className="col-md-6" style={{border: '0'}} key={"conferencia_"+index}>
                    <div className="box-insert-m">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <a onClick={() => this.callModalExcluir(item.id_conferencia, item.dc_conferencia.tx_nome_conferencia, 'conferencia')} style={{cursor: 'pointer'}}>
                                <i className="far fa-trash-alt text-danger float-right"/>
                            </a>
                            {/*<a onClick={() => this.callModal(item.id_conferencia)} style={{cursor: 'pointer'}}>*/}
                            <a onClick={() => this.callModal(item.id_participacao_social_outra, 'conferencia')} style={{cursor: 'pointer'}}>
                                <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}} />
                            </a>

                            <br/>
                            <div>
                                <h3>Nome da Conferência:</h3>
                                <p>{item.dc_conferencia.tx_nome_conferencia}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Ano de realização da conferência:</h3>
                                <p>{item.dt_ano_realizacao}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Forma de participação na conferência:</h3>
                                <p>{item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {modalExcluir}
                </div>

            );
        }.bind(this));

        let outros = this.state.outros.map(function(item, index){

            return (

                <div className="col-md-6" style={{border: '0'}} key={"outros_"+index}>
                    <div className="box-insert-p">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <a onClick={() => this.callModalExcluir(item.id_participacao_social_outra, item.tx_nome_participacao_social_outra, 'outra')} style={{cursor: 'pointer'}}>
                                <i className="far fa-trash-alt text-danger float-right"/>
                            </a>
                            <a onClick={() => this.callModal(item.id_participacao_social_outra, 'outra')}>
                                <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}} />
                            </a>

                            <br/>
                            <div>
                                <h3>Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:</h3>
                                <p>{item.tx_nome_participacao_social_outra}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>


            );
        }.bind(this));




        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fa fa-users" aria-hidden="true"/></div>
                    <h3>Espaços de Participação Social</h3>
                    <hr/><br/>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-groups">
                            <h2>Conselhos de Políticas Públicas</h2>

                            <div className="text-center">
                                <div className="custom-control custom-checkbox text-center">
                                    <input type="checkbox" className="custom-control-input" id="checkConselho" required onClick={this.showHideConselho}/>
                                    <label className="custom-control-label" htmlFor="checkConselho" >Não possui conselhos de políticas públicas</label>
                                </div>
                            </div>

                            <br/>
                            <div className="row" style={{display: this.state.showConselho ? "none" : ""}}>

                                {conselhos}

                                <div className="col-md-6">
                                    <div className=" box-insert-g">

                                        <div className="box-insert-btn text-center">
                                            <a className="cursor" onClick={this.showHideFormConselho} style={{display: this.state.showFormConselho ? "none" : "block", marginTop: "50%"}}>
                                                <i className="fas fa-plus-circle fa-3x tx-pri" /><br/>
                                                <p>Novo Conselhos de Políticas Públicas</p>
                                            </a>
                                        </div>
                                        <div className="col-md-12">
                                            <div style={{display: this.state.showFormConselho ? 'block' : 'none'}}>
                                                <a onClick={this.showHideFormConselho}><i className="far fa-times-circle cursor text-warning" style={{margin: "-25px 0 0 0", float: "right"}}/></a>
                                                <FormParticipacaoConselho
                                                    actionConselho={this.state.actionFormConselho}
                                                    list={this.list}
                                                    id={this.state.editIdConselho}
                                                    showHideFormConselho={this.showHideFormConselho}
                                                    closeFormConselho={this.closeFormConselho}/>
                                            </div>
                                            <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                                                <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-groups">
                            <br/><br/>
                            <h2>Conferências de Políticas Públicas</h2>

                            <div className="text-center">
                                <div className="custom-control custom-checkbox text-center">
                                    <input type="checkbox" className="custom-control-input" id="checkConferencia" required onClick={this.showHideConferencia}/>
                                    <label className="custom-control-label" htmlFor="checkConferencia" >Não possui conferências de políticas públicas</label>
                                </div>
                            </div>
                            <br/>
                            <div className="row" style={{display: this.state.showConferencia ? "none" : ""}}>

                                {conferencias}

                                <div className="col-md-6">
                                    <div className="box-insert-m">
                                        <div className="box-insert-btn text-center">
                                            <a className="cursor" onClick={this.showHideFormConferencia} style={{display: this.state.showFormConferencia ? "none" : "block", marginTop: "35%"}}>
                                                <i className="fas fa-plus-circle fa-3x tx-pri" /><br/>
                                                <p>Nova Conferência de Políticas Públicas</p>
                                            </a>
                                        </div>
                                        <div className="col-md-12">
                                            <div style={{display: this.state.showFormConferencia ? 'block' : 'none'}}>
                                                <a onClick={this.showHideFormConferencia}><i className="far fa-times-circle cursor text-warning" style={{margin: "-25px 0 0 0", float: "right"}}/></a>
                                                <FormParticipacaoConferencia
                                                    action={this.state.actionFormConferencia}
                                                    list={this.list} id={this.state.editId}
                                                    showHideFormConferencia={this.showHideFormConferencia}
                                                    closeFormConferencia={this.closeFormConferencia}/>
                                            </div>
                                            <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                                                <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-groups">
                            <br/><br/>
                            <h2>Outros espaços de participação social</h2>

                            <div className="text-center">
                                <div className="custom-control custom-checkbox text-center">
                                    <input type="checkbox" className="custom-control-input" id="checkOutro" required onClick={this.showHideOutro}/>
                                    <label className="custom-control-label" htmlFor="checkOutro" >Não possui outros espaços de participação social</label>
                                </div>
                            </div>

                            <br/>
                            <div className="row" style={{display: this.state.showOutro ? "none" : ""}}>

                                {outros}

                                <div className="col-md-6">
                                    <div className="box-insert-p">
                                        <div className="box-insert-btn text-center">
                                            <a className="cursor" onClick={this.showHideFormOutro} style={{display: this.state.showFormOutro ? "none" : "block", marginTop: "15%"}}>
                                                <i className="fas fa-plus-circle fa-3x tx-pri" /><br/>
                                                <p>Novo Outros espaços de participação social</p>
                                            </a>
                                        </div>
                                        <div className="col-md-12">
                                            <div style={{display: this.state.showFormOutro ? 'block' : 'none'}}>
                                                <a onClick={this.showHideFormOutro}><i className="far fa-times-circle cursor text-warning" style={{margin: "-25px 0 0 0", float: "right"}}/></a>
                                                <FormParticipacaoOutro
                                                    action={this.state.actionFormOutro}
                                                    list={this.list} id={this.state.editId}
                                                    showHideFormOutro={this.showHideFormOutro}
                                                    closeFormOutro={this.closeFormOutro}/>
                                            </div>
                                            <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                                                <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                                            </div>
                                        </div>
                                    </div>
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
    <Participacoes/>,
    document.getElementById('participacoes')
);
