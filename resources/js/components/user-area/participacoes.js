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

            nao_possui:null,
            type: '',

            msgEspacos: 'Caso queira continuar com essa solicitação todos os dados serão apagados, esse processo apenas será validado após a confirmação.',
            showConselhoInfo: false,
            showConferenciaInfo: false,
            showOutroInfo: false,

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

        this.naoPossui = this.naoPossui.bind(this);
        this.updateNaoPossui = this.updateNaoPossui.bind(this);

        this.validate = this.validate.bind(this);



    }

    componentDidMount(){
        this.list();
        this.naoPossui();
    }

    cancelRemove(id){
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({remove: remove});
    }


    showHideFormConselho(action){
        let showFormConselho = !this.state.showFormConselho;
        let actionFormConselho = action;

        this.setState({showFormConselho: showFormConselho, actionFormConselho: actionFormConselho});
    }
    showHideFormConferencia(action){
        let showFormConferencia = !this.state.showFormConferencia;
        let actionFormConferencia = action;

        this.setState({showFormConferencia: showFormConferencia, actionFormConferencia: actionFormConferencia});
    }
    showHideFormOutro(action){
        let showFormOutro = !this.state.showFormOutro;
        let actionFormOutro = action;

        this.setState({showFormOutro: showFormOutro, actionFormOutro: actionFormOutro});
    }

    showHideConselho(){
        let showConselho = !this.state.showConselho;

        if(showConselho===true){
            this.updateNaoPossui('conselhos');
            this.setState({showConselhoInfo: false});
        }else{
            this.setState({showConselhoInfo: true});
        }

        this.setState({showConselho: showConselho});
    }

    showHideConferencia(){
        let showConferencia = !this.state.showConferencia;

        if(showConferencia===true){
            this.updateNaoPossui('conferencias');
            this.setState({showConferenciaInfo: false});
        }else{
            this.setState({showConferenciaInfo: true});
        }

        this.setState({showConferencia: showConferencia});
    }

    showHideOutro(){
        let showOutro = !this.state.showOutro;

        if(showOutro===true){
            this.updateNaoPossui('outros');
            this.setState({showOutroInfo: false});
        }else{
            this.setState({showOutroInfo: true});
        }

        this.setState({showOutro: showOutro});
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
            //url: getBaseUrl2 + 'osc/participacao_social/611720',
            url: getBaseUrl2 + 'osc/participacao_social/'+this.props.id,
            data: {

            },
            cache: false,
            success: function(data){
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

    naoPossui(){

        $.ajax({
            method: 'GET',
            //url: getBaseUrl2 + 'osc/611720',
            url: getBaseUrl2 + 'osc/'+this.props.id,
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({
                    bo_nao_possui_ps_conselhos: data.bo_nao_possui_ps_conselhos,
                    bo_nao_possui_ps_conferencias: data.bo_nao_possui_ps_conferencias,
                    bo_nao_possui_ps_outros_espacos: data.bo_nao_possui_ps_outros_espacos,

                    showConselho: !data.bo_nao_possui_ps_conselhos,
                    showConferencia: !data.bo_nao_possui_ps_conferencias,
                    showOutro: !data.bo_nao_possui_ps_outros_espacos,
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({requireds: requireds});
        return valid;
    }

    updateNaoPossui(type, origin){

        if(!this.validate()){
            return;
        }
        let data = {};
        if(origin==='btn'){
            if(type==='conselhos'){
                data.bo_nao_possui_ps_conselhos = this.state.showConselho ?  false : true;
            }
            if(type==='conferencias'){
                data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? false : true;
            }
            if(type==='outros'){
                data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? false : true;
            }
        }else{
            if(type==='conselhos'){
                data.bo_nao_possui_ps_conselhos = this.state.showConselho ?  true : false;
            }
            if(type==='conferencias'){
                data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? true : false;
            }
            if(type==='outros'){
                data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? true : false;
            }

        }



        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({

                method:'PUT',
                //url: getBaseUrl2 + 'osc/611720',
                url: getBaseUrl2 + 'osc/'+this.props.id,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data : data,
                cache: false,
                success: function(data) {
                    let msg = "Dados alterados com sucesso!";
                    this.setState({loading: false, msg: msg, showMsg: true,  updateOk: true, button: true, type: type, origin: origin});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({loading: false,  msg: msg, showMsg: true, updateOk: false, button: true, type: type});
                }.bind(this)
            });
        });


    }

    removeItem(id, tipo){
        let remove = this.state.removeConselho;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/ps_'+tipo+'/'+id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
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
        this.setState({
            modal: modal,
            editId:id,
            editTipo:type
        }, function(){
            $('#modalForm').modal('show');
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

        let form = null;

        if(this.state.editTipo=='outra'){
            form = (
                <FormEditParticipacaoOutro
                    action={this.state.actionForm}
                    list={this.list}
                    id={this.state.editId}
                    id_osc={this.props.id_osc}
                    closeForm={this.closeForm}/>
            );
        }
        if(this.state.editTipo=='conferencia'){
            form = (
                <FormEditParticipacaoConferencia
                    action={this.state.actionForm}
                    list={this.list}
                    id={this.state.editId}
                    id_osc={this.props.id_osc}
                    closeForm={this.closeForm}/>
            );
        }
        if(this.state.editTipo=='conselho'){
            form = (
                <FormEditParticipacaoConselho
                    action={this.state.actionForm}
                    list={this.list}
                    id={this.state.editId}
                    id_osc={this.props.id_osc}
                    closeForm={this.cleanFormConselho}/>
            );
        }

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
                            {form}
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
        let conselhos = null;

        ////////////////////////////
        if(this.state.conselhos){
            conselhos = this.state.conselhos.map(function(item, index){

                return (

                    <div className="col-md-6" style={{border: '0'}} key={"conselho_"+index}>
                        <div className="box-insert-g text-left">
                            <div className="box-insert-item box-insert-list">
                                <br/>
                                <div className="float-right">


                                    <a onClick={() => this.callModalExcluir(item.id_conselho, item.dc_conselho.tx_nome_conselho, 'conselho')} style={{cursor: 'pointer'}}>
                                        <i className="far fa-trash-alt text-danger float-right"/>
                                    </a>

                                    <a onClick={() => this.callModal(item.id_conselho, 'conselho')} style={{cursor: 'pointer'}}>
                                        <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}} />
                                    </a>

                                </div>
                                <br/>
                                <div>
                                    <h3>Nome do Conselho:</h3>
                                    <p>{item.dc_conselho.tx_nome_conselho}</p>
                                    <hr/>
                                </div>
                                {/*<div>
                                <h3>Titularidade:</h3>
                                <p>{item.dc_tipo_participacao.tx_nome_tipo_participacao}</p>
                                <hr/>
                            </div>*/}

                                <div>
                                    <h3>Periodicidade da Reunião:</h3>
                                    <p>{item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho}</p>
                                    <hr/>
                                </div>
                                <div>
                                    <h3>Data de início de vigência:</h3>
                                    <p>{formatDate(item.dt_data_inicio_conselho, 'pt-br')}</p>
                                    <hr/>
                                </div>
                                <div>
                                    <h3>Data de fim de vigência:</h3>
                                    <p>{formatDate(item.dt_data_fim_conselho, 'pt-br')}</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        {modal}
                    </div>

                );
            }.bind(this));
        }

        let conferencias = null;
        if(this.state.conferencias){
            conferencias = this.state.conferencias.map(function(item, index){
                return (
                    <div className="col-md-6" style={{border: '0'}} key={"conferencia_"+index}>
                        <div className="box-insert-m">
                            <div className="box-insert-item box-insert-list">
                                <br/>
                                <a onClick={() => this.callModalExcluir(item.id_conferencia, item.dc_conferencia.tx_nome_conferencia, 'conferencia')} style={{cursor: 'pointer'}}>
                                    <i className="far fa-trash-alt text-danger float-right"/>
                                </a>
                                {/*<a onClick={() => this.callModal(item.id_conferencia)} style={{cursor: 'pointer'}}>*/}
                                <a onClick={() => this.callModal(item.id_conferencia, 'conferencia')} style={{cursor: 'pointer'}}>
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
                                    <p>{item.dt_ano_realizacao.replace('-01-01', '') }</p>
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
        }

        let outros = null;
        if(this.state.outros){
            outros = this.state.outros.map(function(item, index){
                return (

                    <div className="col-md-6" style={{border: '0'}} key={"outros_"+index}>
                        <div className="box-insert-p">
                            <div className="box-insert-item box-insert-list">
                                <br/>
                                <a onClick={() => this.callModalExcluir(item.id_participacao_social_outra, item.tx_nome_participacao_social_outra, 'outra')} style={{cursor: 'pointer'}}>
                                    <i className="far fa-trash-alt text-danger float-right"/>
                                </a>
                                <a onClick={() => this.callModal(item.id_participacao_social_outra, 'outra')} style={{cursor: 'pointer'}}>
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
        }


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
                                    <input type="checkbox" className="custom-control-input" id="checkConselho" required onClick={this.showHideConselho}  defaultChecked={this.state.bo_nao_possui_ps_conselhos} onChange={this.bo_nao_possui_ps_conselhos}/>
                                    <label className="custom-control-label" htmlFor="checkConselho" >Não possui conselhos de políticas públicas</label>

                                    <div className="alert alert-danger" style={{display: !this.state.showConselhoInfo ? 'none' : ''}}>
                                        {this.state.msgEspacos} <br/>
                                        <a type="button" className="btn-primary btn-xs float-right" onClick={() => this.updateNaoPossui('conselhos', 'btn')}>
                                            Confirmar
                                        </a>
                                    </div>
                                    <div style={{marginTop: '10px', float: 'right'}}>
                                        <div style={{display: this.state.loading && this.state.type === 'conselhos' ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                        <div style={{display: (this.state.showMsg && this.state.type === 'conselhos') && this.state.origin==='btn' ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                            <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                            {this.state.msg}
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>

                            <br/>
                            <div className="row" style={{display: this.state.showConselho ? "" : "none"}}>

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
                                                    id_osc={this.props.id_osc}
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
                                    <input type="checkbox" className="custom-control-input" id="checkConferencia" required onClick={this.showHideConferencia}  defaultChecked={this.state.bo_nao_possui_ps_conferencias} onChange={this.bo_nao_possui_ps_conselhos}/>
                                    <label className="custom-control-label" htmlFor="checkConferencia" >Não possui conferências de políticas públicas</label>

                                    <div className="alert alert-danger" style={{display: !this.state.showConferenciaInfo ? 'none' : ''}}>
                                        {this.state.msgEspacos} <br/>
                                        <a type="button" className="btn-primary btn-xs float-right" onClick={() => this.updateNaoPossui('conferencias', 'btn')}>
                                            Confirmar
                                        </a>
                                    </div>

                                    <div style={{marginTop: '10px', float: 'right'}}>
                                        <div style={{display: this.state.loading && this.state.type === 'conferencias' ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                        <div style={{display: (this.state.showMsg && this.state.type === 'conferencias') && this.state.origin==='btn' ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                            <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                            {this.state.msg}
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row" style={{display: this.state.showConferencia ? "" : "none"}}>

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
                                                    list={this.list}
                                                    id={this.state.editId}
                                                    id_osc={this.props.id_osc}
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
                                    <input type="checkbox" className="custom-control-input" id="checkOutro" required onClick={this.showHideOutro}  defaultChecked={this.state.bo_nao_possui_ps_outros_espacos} onChange={this.bo_nao_possui_ps_outros_espacos}/>
                                    <label className="custom-control-label" htmlFor="checkOutro" >Não possui outros espaços de participação social</label>

                                    <div className="alert alert-danger" style={{display: !this.state.showOutroInfo ? 'none' : ''}}>
                                        {this.state.msgEspacos} <br/>
                                        <a type="button" className="btn-primary btn-xs float-right" onClick={() => this.updateNaoPossui('outros', 'btn')}>
                                            Confirmar
                                        </a>
                                    </div>

                                    <div style={{marginTop: '10px', float: 'right'}}>

                                        <div style={{display: this.state.loading && this.state.type === 'outros' ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                        <div style={{display: (this.state.showMsg && this.state.type === 'outros') && this.state.origin==='btn' ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                            <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                            {this.state.msg}
                                        </div>
                                        <br/>
                                    </div>
                                </div>

                            </div>

                            <br/>
                            <div className="row" style={{display: this.state.showOutro ? "" : "none"}}>

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
                                                    list={this.list}
                                                    id={this.state.editId}
                                                    id_osc={this.props.id_osc}
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

                            <br/>


                        </div>
                    </div>
                </div>


            </div>
        );
    }
}


ReactDOM.render(
    <Participacoes id={id}/>,
    document.getElementById('participacoes')
);
