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
            showForm: false,
            actionForm: '',
            showFormConferencia: false,
            actionFormConferencia: '',
            showFormOutro: false,
            actionFormOutro: '',
            remove: [],
            loadingRemove: [],
            conferencia: {},
            conselho: {},
            outro: {},
            editId: 0,
        };

        this.list = this.list.bind(this);
        this.remove = this.remove.bind(this);

        this.showHideForm = this.showHideForm.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
        this.closeFormConferencia = this.closeFormConferencia.bind(this);
        this.showHideFormOutro = this.showHideFormOutro.bind(this);
        this.closeFormOutro = this.closeFormOutro.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);
    }

    componentDidMount(){
        this.list();
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
            }.bind(this)
        });

    }

    showHideForm(action){
        let showForm = !this.state.showForm;
        let actionForm = action;
        console.log(showForm);
        this.setState({showForm: showForm, actionForm: actionForm});
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

    closeForm(){
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
            //url: '/list-users-participacoes',
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

   /* list2(){

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
    }*/

    render(){

        let conselhos = this.state.conselhos.map(function(item, index){

            let hr = null;
            if(index < this.state.conselhos.length-1){
                hr = <hr/>;
            }

            return (

                <div className="col-md-6" style={{border: '0'}} key={"conselho_"+index}>
                    <div className="box-insert-g text-left">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <i className="far fa-trash-alt text-danger float-right" />
                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
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
                            <div>
                                <h3>Nome de representante:</h3>
                                <p>*For*{/*<input  value="Fernando Lima de Souza "/>*/}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Periodicidade da Reunião:</h3>
                                <p>{item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho}{/*<input  value="Mensal"/>*/}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Data de início de vigência:</h3>
                                <p>{item.dt_data_inicio_conselho}{/*<input  value="01/12/2019"/>*/}</p>
                                <hr/>
                            </div>
                            <div>
                                <h3>Data de fim de vigência:</h3>
                                <p>{item.dt_data_fim_conselho}{/*<input  value="01/12/2019"/>*/}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
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
                            <i className="far fa-trash-alt text-danger float-right" />
                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                            <br/>
                            <div>
                                <h3>Nome da Conferência:</h3>
                                <p>{item.dc_conferencia.tx_nome_conferencia}{/*<input  value="Conferência Brasileira de Arranjos Produtivos Locais"/>*/}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Ano de realização da conferência:</h3>
                                <p>{item.dt_ano_realizacao}{/*<input  value="1900"/>*/}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Forma de participação na conferência:</h3>
                                <p>{item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia}{/*<input  value="Membro de comissão organizadora nacional"/>*/}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>

            );
        }.bind(this));

        let outros = this.state.outros.map(function(item, index){

            let hr = null;
            if(index < this.state.outros.length-1){
                hr = <hr/>;
            }

            return (

                <div className="col-md-6" style={{border: '0'}} key={"outros_"+index}>
                    <div className="box-insert-p">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <i className="far fa-trash-alt text-danger float-right" />
                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                            <br/>
                            <div>
                                <h3>Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:</h3>
                                <p>{item.tx_nome_participacao_social_outra}{/*<input  value="Conferência Brasileira de Arranjos Produtivos Locais"/>*/}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>

                /*<div className="col-md-6" style={{border: '0'}} key={"conferencia_"+index}>
                    <div className="box-insert-m">
                        <div className="box-insert-item box-insert-list">
                            <br/>
                            <i className="far fa-trash-alt text-danger float-right" />
                            <i className="far fa-edit text-primary float-right" style={{marginRight: '20px'}}/>
                            <br/>
                            <div>
                                <h3>Nome da Conferência:</h3>
                                <p>{item.dc_conferencia.tx_nome_conferencia}{/!*<input  value="Conferência Brasileira de Arranjos Produtivos Locais"/>*!/}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Ano de realização da conferência:</h3>
                                <p>{item.dt_ano_realizacao}{/!*<input  value="1900"/>*!/}</p>
                            </div>
                            <hr/>
                            <div>
                                <h3>Forma de participação na conferência:</h3>
                                <p>{item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia}{/!*<input  value="Membro de comissão organizadora nacional"/>*!/}</p>
                            </div>
                        </div>
                    </div>
                </div>*/

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

                                {/*<div className="col-md-6" style={{border: '0'}}>
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
                                </div>*/}
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
                                                <FormParticipacaoConselho action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
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
                                {/*<div className="col-md-6" style={{border: '0'}}>
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
                                </div>*/}
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
                                                <FormParticipacaoConferencia action={this.state.actionFormConferencia} list={this.list} id={this.state.editId} showHideFormConferencia={this.showHideFormConferencia} closeFormConferencia={this.closeFormConferencia}/>
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
                                {/*<div className="col-md-6" style={{border: '0'}}>
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
                                </div>*/}
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
                                                <FormParticipacaoOutro action={this.state.actionFormOutro} list={this.list} id={this.state.editId} showHideFormOutro={this.showHideFormOutro} closeFormOutro={this.closeFormOutro}/>
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
