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

        /*let action = this.state.actionForm;
        if(showForm){
            let actionForm = 'new';
        }

        this.setState({showForm: showForm, actionForm: action});*/

        let actionForm = action;

        this.setState({showForm: showForm, actionForm: actionForm});
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

                    <div className="mn-accordion-icon"><i className="fas fa-briefcase" aria-hidden="true"/></div> <h3>Relações de Trabalho e Governança</h3><br/>
                    <p>Você tem {this.state.participacoes.length} Trabalhos ou Governanças cadastrados</p>
                    <hr/>

                    <div style={{float: 'right', display: this.state.participacoes.length < maxConselhos ? 'block' : 'none' }}>
                        <a onClick={this.showHideForm}><i className="fa fa-plus" style={{display: this.state.showForm ? "none" : "block"}}/></a>
                        <a onClick={this.showHideForm}><i className="fa fa-times" style={{display: this.state.showForm ? "block" : "none"}}/></a>
                    </div>
                    <div style={{clear: 'both'}}/>

                </div>

                <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                    <FormParticipacao action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                </div>

                <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                    <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                </div><br/>

/////////////
                <div className="row">
                    <div className="col-md-12">
                        <br/><br/>
                        <div className="title-style">
                            <h2>Espaços de Participação Social</h2>
                            <div className="line line-fix"/>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box-itens-g">
                            <h2>Conselhos de Políticas Públicas</h2>
                            <p className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Não possui conselhos de políticas públicas
                                </label>
                            </p><br/>
                            <div className="row">
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="bg-lgt box-insert-g">
                                        <div className="box-insert-item box-insert-list">
                                            <br/>
                                            <i className="far fa-trash-alt text-danger float-right" />
                                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                                            <br/>
                                            <div>
                                                <h3>Nome do Conselho:</h3>
                                                <p><input  value="Conselho Estadual Antidrogas/Conselho "/></p>
                                            </div>
                                            <div>
                                                <h3>Titularidade:</h3>
                                                <p><input  value="Suplente"/></p>
                                            </div>
                                            <div>
                                                <h3>Nome de representante:</h3>
                                                <p><input  value="Fernando Lima de Souza "/></p>
                                            </div>
                                            <div>
                                                <h3>Periodicidade da Reunião:</h3>
                                                <p><input  value="Mensal"/></p>
                                            </div>
                                            <div>
                                                <h3>Data de início de vigência:</h3>
                                                <p><input  value="01/12/2019"/></p>
                                            </div>
                                            <div>
                                                <h3>Data de fim de vigência:</h3>
                                                <p><input  value="01/12/2019"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bg-lgt box-insert-g">
                                        <div className="box-insert-btn">
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
                        <div className="box-itens-g">
                            <h2>Conferências de Políticas Públicas</h2>
                            <p className="form-check">
                                <input className="form-check-input" type="checkbox"
                                       id="gridCheck"/>
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Não possui conferências de políticas públicas
                                </label>
                            </p><br/>
                            <div className="row">
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="bg-lgt box-insert-m">
                                        <div className="box-insert-item box-insert-list">
                                            <br/>
                                            <i className="far fa-trash-alt text-danger float-right" />
                                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                                            <br/>
                                            <div>
                                                <h3>Nome da Conferência:</h3>
                                                <p><input  value="Conferência Brasileira de Arranjos Produtivos Locais"/></p>
                                            </div>
                                            <div>
                                                <h3>Ano de realização da conferência:</h3>
                                                <p><input  value="1900"/></p>
                                            </div>
                                            <div>
                                                <h3>Forma de participação na conferência:</h3>
                                                <p><input  value="Membro de comissão organizadora nacional"/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bg-lgt box-insert-m">
                                        <div className="box-insert-btn">
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
                        <div className="box-itens-g">
                            <h2>Outros espaços de participação social</h2>
                            <p className="form-check">
                                <input className="form-check-input" type="checkbox"
                                       id="gridCheck"/>
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Não possui outros espaços de participação social
                                </label>
                            </p><br/>
                            <div className="row">
                                <div className="col-md-6" style={{border: '0'}}>
                                    <div className="bg-lgt box-insert-p">
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
                                    <div className="bg-lgt box-insert-p">
                                        <div className="box-insert-btn-p">
                                            <i className="fas fa-plus-circle fa-3x tx-pri"/><br/>
                                            <p>Novo Outros espaços de participação social</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     /////////////

                <div className="row">
                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Quadro de Dirigentes</h2>
                            {participacoes}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Conselho Fiscal</h2>
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
                                        <h2>11</h2>
                                        <p className='not-info'>a</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Empregados</h3>
                                    <div>

                                        <h2>aa</h2>

                                        <p className='not-info'>aa</p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Deficiência</h3>
                                    <div>

                                        <h2>aa</h2>

                                        <p className='not-info'>aa</p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="bg-lgt box-itens">
                                    <h3>Voluntários</h3>
                                    <div>

                                        <input type="number" value="10" className="input-lg" min="1"/>
                                        <p className='not-info'>&nbsp;</p>
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
