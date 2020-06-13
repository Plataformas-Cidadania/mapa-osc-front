class Governancas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            governancas:[],
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
            governanca: {},
            conselhos: {},
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
            url: '/remove-user-governanca/'+id,
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
            url: '/list-users-governancas',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({governancas: data, loadingList: false});
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
                this.setState({concelhos: data, loadingList: false});
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

        let governancas = this.state.governancas.map(function(item, index){

            let hr = null;
            if(index < this.state.governancas.length-1){
                hr = <hr/>;
            }

            return (

                /*<div className="box-insert-list"  key={"governanca_"+index}>
                    <i className="far fa-trash-alt text-danger float-right"/>
                    <p>{item.tx_cargo_dirigente}</p>
                    <p>{item.tx_nome_dirigente}</p>
                    <hr/>
                </div>*/

                <div className="box-insert-list" key={"governanca_"+index}>
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

                /*<div className="col-md-6"  key={"governanca_"+item.id}>
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
                    <p>{item.tx_nome_dirigente}</p>
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">

                    <div className="mn-accordion-icon"><i className="fas fa-briefcase" aria-hidden="true"/></div> <h3>Relações de Trabalho e Governança</h3><br/>
                    <p>Você tem {this.state.governancas.length} Trabalhos ou Governanças cadastrados</p>
                    <hr/>

                    <div style={{float: 'right', display: this.state.governancas.length < maxConselhos ? 'block' : 'none' }}>
                        <a onClick={this.showHideForm}><i className="fa fa-plus" style={{display: this.state.showForm ? "none" : "block"}}/></a>
                        <a onClick={this.showHideForm}><i className="fa fa-times" style={{display: this.state.showForm ? "block" : "none"}}/></a>
                    </div>
                    <div style={{clear: 'both'}}/>

                </div>

                <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                    <FormGovernanca action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                </div>

                <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                    <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                </div><br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bg-lgt box-itens-g min-h">
                            <h2>Quadro de Dirigentes</h2>
                            {governancas}
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
    <Governancas/>,
    document.getElementById('governancas')
);
