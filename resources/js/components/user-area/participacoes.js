class Participacoes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            participacoes:[],
            conselhos:[],
            tipo:{
                1: 'Residencial',
                2: 'Comercial',
            },
            principal:{
                1: 'Endereço principal',
                2: ' ',
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            participacao: {},
            conselho: {},
            editId: 0,
        };

        this.list = this.list.bind(this);
        this.list2 = this.list2.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);
    }

    componentDidMount(){
        this.list();
        this.list2();
    }

    getAge(dateString){

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))        {
            age--;
        }

        //console.log(age);

        return age;

    }

    edit(id){
       // this.setState({actionForm: 'edit'});
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
            method: 'GET',
            url: '/remove-user-participacao/'+id,
            data: {

            },
            cache: false,
            success: function(data){
                //console.log(data);
                this.list();
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
        let actionForm = action;
        console.log(showForm);
        this.setState({showForm: showForm, actionForm: actionForm});
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

    closeForm(){
        this.setState({showForm: false});
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'POST',
            url: '/list-users-participacoes',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({participacoes: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    list2(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'POST',
            url: '/list-users-conselhos',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({conselhos: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){

        //console.log(this.state.showForm);
        //console.log('state.remove', this.state.remove);

        let participacoes = this.state.participacoes.map(function(item, index){

            let hr = null;
            if(index < this.state.participacoes.length-1){
                hr = <hr/>;
            }

            return (

                /*<div className="box-insert-list"  key={"participacao_"+index}>
                    <i className="far fa-trash-alt text-danger float-right"/>
                    <p>{item.tx_cargo_dirigente}</p>
                    <p>{item.tx_nome_dirigente}</p>
                    <hr/>
                </div>*/

                <div className="box-insert-list" key={"participacao_"+index}>
                    {/*<i className="far fa-trash-alt text-danger float-right"/>*/}
                    <div className="float-right" style={{marginRight: '40px'}}>
                        <a className="box-itens-btn-edit" onClick={() => this.edit(item.id)}><i className="fa fa-edit"/></a>&nbsp;
                        <a className="box-itens-btn-del" onClick={() => this.remove(item.id)} style={{display: this.state.loadingRemove[item.id] ? 'none' : 'block'}}>
                            <i className={"fa "+( this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemove(item.id)} style={{display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none'}}>
                            <i className={"fa fa-undo"}/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id] ? '' : 'none'}}/>
                    </div>
                    <p>{item.tx_nome_dirigente}</p>
                    <p><strong>{item.tx_cargo_dirigente}</strong></p>

                </div>

                /*<div className="col-md-6"  key={"participacao_"+item.id}>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-offset-9 col-md-1"><a href="#" onClick={() => this.edit(item.id)}><i className="fa fa-pencil fa-2x"/></a></div>
                                <div className="col-md-1">
                                    <a href="#" onClick={() => this.remove(item.id)} style={{display: this.state.loadingRemove[item.id] ? 'none' : 'block'}}>
                                        <i className={"fa  fa-2x "+( this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash")}/>
                                    </a>
                                    <a href="#" onClick={() => this.cancelRemove(item.id)} style={{display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none'}}>
                                        <i className={"fa  fa-2x fa-undo"}/>
                                    </a>
                                    <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id] ? '' : 'none'}}/>
                                </div>
                            </div>
                            <div>
                                <h3>{item.nome}</h3>
                                <p>{item.endereco}, {item.numero}, {item.complemento}</p>
                                <p>{item.bairro}</p>
                                <p>{item.cep}</p>
                                <p>{item.cidade} - {item.estado}</p>
                                <p>{this.state.tipo[item.tipo]}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><strong>OBS: </strong>{item.obs}</div>
                            </div>
                            <div className="row text-right">
                                <h6>{this.state.principal[item.principal]} &nbsp;  </h6>
                            </div>
                        </div>
                    </div>
                </div>*/
            );
        }.bind(this));


        let conselhos = this.state.conselhos.map(function(item, index){

            let hr = null;
            if(index < this.state.conselhos.length-1){
                hr = <hr/>;
            }

            return (
                <div className="box-insert-list" key={"conselho_"+index}>
                    <div className="float-right" style={{width: '50px'}}>
                        <a className="box-itens-btn-edit" onClick={() => this.edit(item.id)}><i className="fa fa-edit"/></a>&nbsp;
                        <a className="box-itens-btn-del" onClick={() => this.remove(item.id)} style={{display: this.state.loadingRemove[item.id] ? 'none' : 'block'}}>
                            <i className={"fa "+( this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemove(item.id)} style={{display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none'}}>
                            <i className={"fa fa-undo"}/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id] ? '' : 'none'}}/>
                    </div>
                    <p>{item.tx_nome_conselheiro}</p>
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-briefcase" aria-hidden="true"/></div>
                    <h3>Espaços de Participação Social</h3>
                    <hr/><br/>
                </div>

                {/*<div className="row">
                    <div className="col-md-12">
                        <br/><br/>
                        <div className="title-style">
                            <h2>Espaços de Participação Social</h2>
                            <div className="line line-fix"/>
                            <hr/>
                        </div>
                    </div>
                </div>*/}
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-groups">
                            <h2>Conselhos de Políticas Públicas</h2>
                            <p className="form-check text-center">
                                <input className="form-check-input" type="checkbox" id="checkConselho" onClick={this.showHideConselho}/>
                                <label className="form-check-label box-groups-info" htmlFor="checkConselho">
                                    Não possui conselhos de políticas públicas
                                </label>
                            </p><br/>
                            <div className="row" style={{display: this.state.showConselho ? "none" : ""}}>
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="box-insert-g text-left">
                                        <div className="box-insert-item box-insert-list">
                                            <br/>
                                            <i className="far fa-trash-alt text-danger float-right" />
                                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                                            <br/>
                                            <div>
                                                <h3>Nome do Conselho:</h3>
                                                <p><input  value="Conselho Estadual Antidrogas/Conselho "/></p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <h3>Titularidade:</h3>
                                                <p><input  value="Suplente"/></p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <h3>Nome de representante:</h3>
                                                <p><input  value="Fernando Lima de Souza "/></p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <h3>Periodicidade da Reunião:</h3>
                                                <p><input  value="Mensal"/></p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <h3>Data de início de vigência:</h3>
                                                <p><input  value="01/12/2019"/></p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <h3>Data de fim de vigência:</h3>
                                                <p><input  value="01/12/2019"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" box-insert-g">
                                        <div className="box-insert-btn text-center">
                                            <a className="cursor" onClick={this.showHideForm} style={{display: this.state.showForm ? "none" : "block", marginTop: "50%"}}>
                                                <i className="fas fa-plus-circle fa-3x tx-pri" /><br/>
                                                <p>Novo Conselhos de Políticas Públicas</p>
                                            </a>
                                        </div>
                                        <div className="col-md-12">
                                            <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                                                <a onClick={this.showHideForm}><i className="far fa-times-circle cursor text-warning" style={{margin: "-25px 0 0 0", float: "right"}}/></a>
                                                <FormParticipacao action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
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
                            <p className="form-check text-center">
                                <input className="form-check-input" type="checkbox" id="checkConferencia" onClick={this.showHideConferencia}/>
                                <label className="form-check-label box-groups-info" htmlFor="checkConferencia">
                                    Não possui conferências de políticas públicas
                                </label>
                            </p><br/>
                            <div className="row" style={{display: this.state.showConferencia ? "none" : ""}}>
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="box-insert-m">
                                        <div className="box-insert-item box-insert-list">
                                            <br/>
                                            <i className="far fa-trash-alt text-danger float-right" />
                                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                                            <br/>
                                            <div>
                                                <h3>Nome da Conferência:</h3>
                                                <p><input  value="Conferência Brasileira de Arranjos Produtivos Locais"/></p>
                                            </div>
                                            <hr/>
                                            <div>
                                                <h3>Ano de realização da conferência:</h3>
                                                <p><input  value="1900"/></p>
                                            </div>
                                            <hr/>
                                            <div>
                                                <h3>Forma de participação na conferência:</h3>
                                                <p><input  value="Membro de comissão organizadora nacional"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="box-insert-m">
                                        <div className="box-insert-btn text-center">
                                            <i className="fas fa-plus-circle fa-3x tx-pri"/><br/>
                                            <p>Novo Conselhos de Políticas Públicas</p>
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
                            <p className="form-check text-center">
                                <input className="form-check-input" type="checkbox" id="checkOutro" onClick={this.showHideOutro}/>
                                <label className="form-check-label box-groups-info" htmlFor="checkOutro">
                                    Não possui outros espaços de participação social
                                </label>
                            </p><br/>
                            <div className="row" style={{display: this.state.showOutro ? "none" : ""}}>
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="box-insert-p">
                                        <div className="box-insert-item box-insert-list">
                                            <br/>
                                            <i className="far fa-trash-alt text-danger float-right" />
                                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                                            <br/>
                                            <div>
                                                <h3>Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:</h3>
                                                <p><input  value="Conferência Brasileira de Arranjos Produtivos Locais"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="box-insert-p">
                                        <div className="box-insert-btn-p text-center">
                                            <i className="fas fa-plus-circle fa-3x tx-pri"/><br/>
                                            <p>Novo Outros espaços de participação social</p>
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
