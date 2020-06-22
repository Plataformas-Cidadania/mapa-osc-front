class Projetos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            projetos:[],
            cd_projeto:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            projeto: {},
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
            url: '/remove-user-projeto/'+id,
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
            url: '/list-users-projetos',
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({projetos: data, loadingList: false});
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

        let projetos = this.state.projetos.map(function(item, index){

            let hr = null;
            if(index < this.state.projetos.length-1){
                hr = <hr/>;
            }

            return (
                <tr key={"projeto_"+index}>
                    <td>{item.cd_projeto}</td>
                    <td>{item.dt_inicio_projeto}</td>
                    <td>{item.dt_fim_projeto}</td>
                    <td>{item.cd_uf}</td>
                    <td width="70">
                        <a onClick={() => this.edit(item.id)}><i className="far fa-edit text-primary"/></a>&nbsp;&nbsp;
                        <a onClick={() => this.remove(item.id_projeto)} style={{display: this.state.loadingRemove[item.id_projeto] ? 'none' : ''}}>
                            <i className={"fas "+( this.state.remove[item.id_projeto] ? "fa-times text-primary" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemove(item.id_projeto)} style={{display: this.state.remove[item.id_projeto] && !this.state.loadingRemove[item.id_projeto] ? '' : 'none'}}>
                            <i className="fas fa-undo"/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id_projeto] ? '' : 'none'}}/>
                    </td>
                </tr>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-projeto" aria-hidden="true"/></div> <h3>Títulos e Certificações</h3><br/>
                    <p>Você tem {this.state.projetos.length} títulos ou projetos cadastrados</p>
                    <hr/>
                </div>

                <div style={{display: this.state.loadingList ? 'true' : 'none'}}>
                    <img style={{marginTop: '80px'}} src="/img/loading.gif" width={'150px'} alt="carregando" title="carregando"/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead className="bg-pri text-light">
                            <tr>
                                <th scope="col">Titulo / Projeto</th>
                                <th scope="col">Início da validade</th>
                                <th scope="col">Fim da validade</th>
                                <th scope="col">Localidade</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                                {projetos}
                            </tbody>
                        </table>

                        <div style={{float: 'right', cursor: 'pointer', display: this.state.projetos.length < maxProjetos ? 'block' : 'none' }}>
                            <a onClick={this.showHideForm} style={{display: this.state.showForm ? "none" : "block"}} className="btn btn-warning"><i className="fa fa-plus"/> Adicionar novo título</a>
                            <a onClick={this.showHideForm} style={{display: this.state.showForm ? "block" : "none"}} className="btn btn-warning"><i className="fa fa-times"/> Cancelar</a>
                        </div>

                        <div style={{clear: 'both', display: this.state.showForm ? 'block' : 'none'}}>
                            <FormProjeto action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Projetos/>,
    document.getElementById('projetos')
);
