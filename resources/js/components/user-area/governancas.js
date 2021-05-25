class Governancas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingGovernanca:false,
            loading:false,
            governancas:[],
            conselhos:[],
            tipo:{
                1: 'Residencial',
                2: 'Comercial',
            },
            principal:{
                1: 'Endereço principal',
                2: ' ',
            },
            form: {
                nr_trabalhadores_voluntarios: '',
            },
            requireds: {
                nr_trabalhadores_voluntarios: true,
            },

            loadingRemove: [],
            governanca: {},
            conselho: {},
            editId: 0,
            showForm: false,
            actionForm: '',
            remove: [],

            showFormConselho: false,
            actionFormConselho: '',
            removeConselho: [],
            editIdConselho: 0,
            loadingRemoveConselho: [],

            deficiencia: null,
            empregados: null,
            totalTrabalhadores: null,

            editIdOsc: 0,


            removeItem: null,
            removeItemTx: '',
            removeTipo: '',
            modalTitle: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.governanca = this.governanca.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.closeFormConselho = this.closeFormConselho.bind(this);

        this.updateVoluntario = this.updateVoluntario.bind(this);

        this.callModal = this.callModal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const defaultValue = target.type === 'checkbox' ? target.checked : target.defaultValue;
        const name = target.name;

        let form = this.state.form;
        let placeholder = this.state.placeholder;
        form[name] = value;
        //form[name] = defaultValue;

        this.setState({form: form, placeholder: placeholder});
    }

    componentDidMount(){
        this.governanca();
    }

    /*edit(id){
        this.setState({actionForm: 'edit', showForm: false, editId: id});
    }*/


    removeItem(id, tipo){
        let remove = this.state.remove;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/'+tipo+'/'+id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            data: {

            },
            cache: false,
            success: function(data){
                this.governanca();
                $('#modalFormExcluir').modal('hide');
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });

    }

    showHideForm(action){
        let showForm = !this.state.showForm;
        this.setState({showForm: showForm, actionForm: action});
    }

    closeForm(){
        this.setState({showForm: false});
    }

    governanca(){

        this.setState({loadingGovernanca: true});

        $.ajax({
            method: 'GET',
            //url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
            url: getBaseUrl2+'osc/rel_trabalho_e_governanca/'+this.props.id,
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({
                    governancas: data.governanca,
                    conselhos: data.conselho_fiscal,
                    deficiencia: data.relacoes_trabalho.nr_trabalhadores_deficiencia,
                    empregados: data.relacoes_trabalho.nr_trabalhadores_vinculo,

                    totalTrabalhadores: data.relacoes_trabalho.nr_trabalhores,
                    loadingGovernanca: false,
                    editIdOsc: data.relacoes_trabalho.id_osc,
                    form:{
                        nr_trabalhadores_voluntarios: data.relacoes_trabalho.nr_trabalhadores_voluntarios,
                    }
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingGovernanca: false});
            }.bind(this)
        });
    }

    /*editConselho(id){
        this.setState({actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id});
    }*/

    showHideFormConselho(action){
        let showFormConselho = !this.state.showFormConselho;
        this.setState({showFormConselho: showFormConselho, actionFormConselho: action});
    }

    closeFormConselho(){
        this.setState({showFormConselho: false});
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({requireds: requireds});
        return valid;
    }

    updateVoluntario(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        this.setState({loadingVoluntario: true, buttonVoluntario: false, showMsgVoluntario: false, msgVoluntario: ''}, function(){
            console.log('**', this.state.form.nr_trabalhadores_voluntarios);
            $.ajax({
                method:'PUT',
                url: getBaseUrl2 + 'osc/rel_trabalho/'+this.state.editIdOsc,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: this.state.form,
                cache: false,
                success: function(data) {
                    let msgVoluntario = "Dados alterados com sucesso!";
                    this.setState({loadingVoluntario: false, msgVoluntario: msgVoluntario, showMsgVoluntario: true,  updateOkVoluntario: true, buttonVoluntario: true});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msgVoluntario = "Ocorreu um erro!";
                    this.setState({loadingVoluntario: false,  msgVoluntario: msgVoluntario, showMsgVoluntario: true, updateOkVoluntario: false, buttonVoluntario: true});
                }.bind(this)
            });
        });

    }

    callModal(id, type, txt){
        console.log('3', id);
        let modal = this.state.modal;
        this.setState({
            modal: modal,
            editId:id,
            editTipo:type,
            modalTitle: txt
        }, function(){
            $('#modalForm').modal('show');
        });
    }

    callModalExcluir(id, tx_nome_conferencia, tipo){
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItem:id,
            removeItemTx:tx_nome_conferencia,
            removeTipo:tipo
        }, function(){
            $('#modalFormExcluir').modal('show');
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
                            <button type="button" className="btn btn-danger" onClick={() => this.removeItem(this.state.removeItem, this.state.removeTipo)}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    modal(){

        let form = null;

        if(this.state.editTipo==='conselho'){
            form = (
                <FormEditConselho
                    action={this.state.actionFormConselho}
                    list={this.governanca}
                    id_osc={this.props.id}
                    id={this.state.editId}
                    showHideFormConselho={this.showHideFormConselho}
                    closeForm={this.closeFormConselho}/>
            );
        }
        if(this.state.editTipo==='governanca'){
            form = (
                <FormEditGovernanca
                    action={this.state.actionForm}
                    list={this.governanca}
                    id={this.state.editId}
                    id_osc={this.props.id}
                    showHideForm={this.showHideForm}
                    closeForm={this.closeForm}/>
            );
        }

        return (

            <div id="modalForm" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel"><strong>Alterar {this.state.modalTitle}</strong></h4>
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

        let modal = this.modal();
        let modalExcluir = this.modalExcluir();

        let governancas = this.state.governancas.map(function(item, index){
            return (
                <div className="box-insert-governanca" key={"governanca_"+index}>
                    <div className="float-right">

                        <a onClick={() => this.callModal(item.id_dirigente, 'governanca', 'governança')} className="box-itens-btn-edit"  style={{cursor: 'pointer', float:'right'}}>
                            <i className="far fa-edit" />
                        </a>

                        <a onClick={() => this.callModalExcluir(item.id_dirigente, item.tx_nome_dirigente, 'governanca')} style={{cursor: 'pointer', margin:'0 0 0 25px', top: '4px', position: 'relative'}}>
                            <i className="far fa-trash-alt text-danger float-right"/>
                        </a>
                    </div>
                    <p>{item.tx_nome_dirigente}</p>
                    <p><strong>{item.tx_cargo_dirigente}</strong></p>
                    {modal}
                </div>

            );
        }.bind(this));


        let conselhos = this.state.conselhos.map(function(item, index){

            return (
                <div className="box-insert-governanca" key={"conselho_"+index}>
                    <div className="float-right" >

                        <a onClick={() => this.callModal(item.id_conselheiro, 'conselho', 'conselho')} className="box-itens-btn-edit"  style={{cursor: 'pointer', float:'right'}}>
                            <i className="far fa-edit" />
                        </a>

                        <a onClick={() => this.callModalExcluir(item.id_conselheiro, item.tx_nome_conselheiro, 'conselho')} style={{cursor: 'pointer', margin:'0 0 0 25px', top: '4px', position: 'relative'}}>
                            <i className="far fa-trash-alt text-danger float-right"/>
                        </a>
                    </div>
                    <p>{item.tx_nome_conselheiro}</p>
                </div>
            );
        }.bind(this));


        return(


            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-briefcase" aria-hidden="true"/></div> <h3>Relações de Trabalho e Governança</h3><br/>
                    <p>Você tem {this.state.governancas.length} dirigentes e {this.state.conselhos.length} conselhos cadastrados</p>
                    <hr/>
                </div>


                <div style={{display: this.state.loadingGovernanca ? 'true' : 'none'}}>
                    <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                </div><br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Quadro de Dirigentes</h2>

                            <div style={{float: 'right'}}>
                                <a className="btn-add" onClick={this.showHideForm} style={{display: this.state.showForm ? "none" : "block"}}>
                                    <i className={"fas fa-2x fa-plus-circle"}/>
                                </a>
                                <a className="btn-add btn-add-warning" onClick={this.showHideForm} style={{display: this.state.showForm ? "block" : "none"}}>
                                    <i className={"fas fa-2x fa-times-circle"}/>
                                </a>
                            </div>
                            <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                                <FormGovernanca action={this.state.actionForm} list={this.governanca} id={this.state.editId} id_osc:this.props.id showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                            </div>
                            {governancas}
                        </div>
                        {modalExcluir}
                    </div>

                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Conselho Fiscal</h2>

                            <div style={{float: 'right'}}>
                                <a className="btn-add" onClick={this.showHideFormConselho} style={{display: this.state.showFormConselho ? "none" : "block"}}>
                                    <i className={"fas fa-2x fa-plus-circle"}/>
                                </a>
                                <a className="btn-add btn-add-warning" onClick={this.showHideFormConselho} style={{display: this.state.showFormConselho ? "block" : "none"}}>
                                    <i className={"fas fa-2x fa-times-circle"}/>
                                </a>
                            </div>
                            <div style={{display: this.state.showFormConselho ? 'block' : 'none'}}>
                                <FormConselho action={this.state.actionFormConselho} list={this.governanca} id={this.state.editIdConselho} id_osc={this.props.id} showHideFormConselho={this.showHideFormConselho} closeForm={this.closeFormConselho}/>
                            </div>
                            {conselhos}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row text-center">
                            <div className="col-md-12">
                                <br/><br/>
                                <strong>Trabalhadores</strong><br/><br/>
                            </div>

                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Total de Trabalhadores</h3>
                                    <div>
                                        <h2>{this.state.totalTrabalhadores}</h2>
                                        <p className='not-info'>Não constam informações nas bases de dados do Mapa.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Empregados</h3>
                                    <div>
                                        <h2>{this.state.empregados}</h2>
                                        <p className='not-info'>Não constam informações nas bases de dados do Mapa.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Deficiência</h3>
                                    <div>
                                        <h2>{this.state.deficiencia}</h2>
                                        <p className='not-info'>Não constam informações nas bases de dados do Mapa.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Voluntários</h3>
                                    <div>
                                        <div style={{clear: 'both', height:'1px'}}/>

                                        <input className="input-lg" type="number" min="1" name="nr_trabalhadores_voluntarios" onChange={this.handleInputChange} defaultValue={this.state.form.nr_trabalhadores_voluntarios}
                                               style={{float: 'left'}} placeholder="0" />
                                        <div>
                                            <button type="button" className="btn btn-success" onClick={this.updateVoluntario}><i
                                                className="fas fa-cloud-download-alt"/> </button>
                                            <br/>
                                        </div>

                                        <div style={{clear: 'both'}}/>
                                        <div style={{display: this.state.loadingVoluntario ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                        <div style={{display: this.state.showMsgVoluntario ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOkVoluntario ? "success" : "danger")}>
                                            <i className={"far "+(this.state.updateOkVoluntario ? "fa-check-circle" : "fa-times-circle")} />
                                            {this.state.msgVoluntario}
                                        </div>
                                        <p className='not-info'>Atualize suas informações sobre Voluntários</p>

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
    <Governancas id={id}/>,
    document.getElementById('governancas')
);
