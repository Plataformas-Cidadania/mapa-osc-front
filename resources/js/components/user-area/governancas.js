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
            voluntarios: null,
            totalTrabalhadores: null,

        };

        this.governanca = this.governanca.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.removeConselho = this.removeConselho.bind(this);
        this.closeFormConselho = this.closeFormConselho.bind(this);
    }

    componentDidMount(){
        this.governanca();
    }

    edit(id){
        this.setState({actionForm: 'edit', showForm: false, editId: id});
    }

    cancelRemove(id){
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({remove: remove});
    }

    remove(id){
        let remove = this.state.remove;

        if(!remove[id]){
            remove[id] = true;
            this.setState({remove: remove});
            return;
        }

        let loadingRemove = this.state.loadingRemove;
        loadingRemove[id] = true;
        this.setState({loadingRemove: loadingRemove});
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/governanca/'+id,
            data: {

            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.governanca();
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                this.setState({loadingRemove: loadingRemove});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                //this.setState({loadingRemove: loadingRemove});
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
            url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({
                    governancas: data.governanca,
                    conselhos: data.conselho_fiscal,
                    deficiencia: data.relacoes_trabalho.nr_trabalhadores_deficiencia,
                    empregados: data.relacoes_trabalho.nr_trabalhadores_vinculo,
                    voluntarios: data.relacoes_trabalho.nr_trabalhadores_voluntarios,
                    totalTrabalhadores: data.relacoes_trabalho.nr_trabalhores,
                    loadingGovernanca: false
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingGovernanca: false});
            }.bind(this)
        });
    }

    editConselho(id){
        this.setState({actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id});
    }

    showHideFormConselho(action){
        let showFormConselho = !this.state.showFormConselho;
        this.setState({showFormConselho: showFormConselho, actionFormConselho: action});
    }

    closeFormConselho(){
        this.setState({showFormConselho: false});
    }

    removeConselho(id){
        let removeConselho = this.state.removeConselho;

        if(!removeConselho[id]){
            removeConselho[id] = true;
            this.setState({removeConselho: removeConselho});
            return;
        }

        let loadingRemoveConselho = this.state.loadingRemoveConselho;
        loadingRemoveConselho[id] = true;
        this.setState({loadingRemoveConselho: loadingRemoveConselho});
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/conselho/'+id,
            data: {

            },
            cache: false,
            success: function(data){
                this.governanca();
                let loadingRemoveConselho = this.state.loadingRemoveConselho;
                loadingRemoveConselho[id] = false;
                this.setState({loadingRemoveConselho: loadingRemoveConselho});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let loadingRemoveConselho = this.state.loadingRemoveConselho;
                loadingRemoveConselho[id] = false;
            }.bind(this)
        });

    }


    render(){


        let governancas = this.state.governancas.map(function(item, index){

            return (

                <div className="box-insert-governanca" key={"governanca_"+index}>
                    {/*<i className="far fa-trash-alt text-danger float-right"/>*/}
                    <div className="float-right" style={{marginRight: '40px'}}>
                        <a className="box-itens-btn-edit" onClick={() => this.edit(item.id_dirigente)}><i className="fa fa-edit"/></a>&nbsp;
                        <a className="box-itens-btn-del" onClick={() => this.remove(item.id_dirigente)} style={{display: this.state.loadingRemove[item.id_dirigente] ? 'none' : 'block'}}>
                            <i className={"fa "+( this.state.remove[item.id_dirigente] ? "fa-times text-danger" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemove(item.id_dirigente)} style={{display: this.state.remove[item.id_dirigente] && !this.state.loadingRemove[item.id_dirigente] ? 'block' : 'none'}}>
                            <i className={"fa fa-undo"}/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id_dirigente] ? '' : 'none'}}/>
                    </div>
                    <p>{item.tx_nome_dirigente}</p>
                    <p><strong>{item.tx_cargo_dirigente}</strong></p>

                </div>

            );
        }.bind(this));


        let conselhos = this.state.conselhos.map(function(item, index){

            return (
                <div className="box-insert-governanca" key={"conselho_"+index}>
                    <div className="float-right" style={{width: '50px'}}>
                        <a className="box-itens-btn-edit" onClick={() => this.editConselho(item.id_conselheiro)}><i className="fa fa-edit"/></a>&nbsp;
                        <a className="box-itens-btn-del" onClick={() => this.removeConselho(item.id_conselheiro)} style={{display: this.state.loadingRemoveConselho[item.id_conselheiro] ? 'none' : 'block'}}>
                            <i className={"fa "+( this.state.removeConselho[item.id_conselheiro] ? "fa-times text-danger" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemoveConselho(item.id_conselheiro)} style={{display: this.state.removeConselho[item.id_conselheiro] && !this.state.loadingRemoveConselho[item.id_conselheiro] ? 'block' : 'none'}}>
                            <i className={"fa fa-undo"}/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemoveConselho[item.id_conselheiro] ? '' : 'none'}}/>
                    </div>
                    <p>{item.tx_nome_conselheiro}</p>
                </div>
            );
        }.bind(this));


        return(


            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-briefcase" aria-hidden="true"/></div> <h3>Relações de Trabalho e Governança</h3><br/>
                    <p>Você tem {this.state.governancas.length} Trabalhos ou Governanças cadastrados</p>
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
                                <a className="btn-add" onClick={this.showHideForm}><i className="fas fa-plus-circle fa-2x" style={{display: this.state.showForm ? "none" : "block"}}/></a>
                                <a onClick={this.showHideForm}><i className="fa fa-times" style={{display: this.state.showForm ? "block" : "none"}}/></a>
                            </div>
                            <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                                <FormGovernanca action={this.state.actionForm} list={this.governanca} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                            </div>

                            {governancas}
                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Conselho Fiscal</h2>

                            <div style={{float: 'right'}}>
                                <a className="btn-add" onClick={this.showHideFormConselho}><i className="fas fa-plus-circle fa-2x" style={{display: this.state.showFormConselho ? "none" : "block"}}/></a>
                                <a onClick={this.showHideFormConselho}><i className="fa fa-times" style={{display: this.state.showFormConselho ? "block" : "none"}}/></a>
                            </div>
                            <div style={{display: this.state.showFormConselho ? 'block' : 'none'}}>
                                <FormConselho action={this.state.actionFormConselho} list={this.governanca} id={this.state.editIdConselho} showHideFormConselho={this.showHideFormConselho} closeForm={this.closeFormConselho}/>
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

                                        <input type="number" value={this.state.voluntarios} className="input-lg" min="1"/>
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
    <Governancas/>,
    document.getElementById('governancas')
);
