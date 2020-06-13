class Addresses extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            addresses:[],
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
            address: {},
            editId: 0,
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentDidMount(){
        this.list();
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
            url: '/remove-user-address/'+id,
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
            url: '/list-users-addresses',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({addresses: data, loadingList: false});
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

        let addresses = this.state.addresses.map(function(item, index){

            let hr = null;
            if(index < this.state.addresses.length-1){
                hr = <hr/>;
            }

            return (
                <div className="col-md-6" key={"address_"+item.id}>
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
                </div>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">
                    <h3>
                        <div style={{float: 'left'}}><i className="fa fa-map-marker" aria-hidden="true"></i> Endereços cadastrados</div>

                        <div style={{float: 'right', display: this.state.addresses.length < maxAddresses ? 'block' : 'none' }}>
                            <a href="#" onClick={this.showHideForm}><i className="fa fa-plus" style={{display: this.state.showForm ? "none" : "block"}}/></a>
                            <a href="#" onClick={this.showHideForm}><i className="fa fa-times" style={{display: this.state.showForm ? "block" : "none"}}/></a>
                        </div>
                        <div style={{clear: 'both'}}/>
                    </h3>
                    <p>Você tem {this.state.addresses.length} endereços cadastrados</p>
                    <hr/>
                </div>

                <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                    {/*<FormAddress action={this.state.actionForm} list={this.list}/>*/}
                    <FormAddress action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                </div>

                <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                    <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                </div>
                <div className="row">
                    {addresses}
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Addresses/>,
    document.getElementById('addresses')
);