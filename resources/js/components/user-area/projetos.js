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
        this.modal = this.modal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
        this.callModal = this.callModal.bind(this);
    }

    componentDidMount(){
        this.list();
    }

    removeItem(id){
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/projeto/'+id,
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
    callModalExcluir(id, title){
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItemConferencia:id,
            removeItemTx:title,
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
                            Tem certeza que quer excluir "<strong>{this.state.removeItemTx}</strong>"? Todas as informações cadastradas serão perdidas.
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


    edit(id){
       // this.setState({actionForm: 'edit'});
        //this.setState({actionForm: 'edit', showForm: false, editId: id});

        this.setState({actionForm: 'edit', editId: id}, function(){
            this.callModal();
        });
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
            method: 'GET',
            //url: '/list-users-projetos',
            url: getBaseUrl2 + 'osc/projetos/455128',
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

    callModal(){
        let modal = this.state.modal;
        this.setState({modal: modal}, function(){
            $('#modalForm').modal('show');
        });
    }

    modal(){
        return (

            <div id="modalForm" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-body">
                            <FormProjeto action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    render(){

        let modal = this.modal();
        let modalExcluir = this.modalExcluir();

        let projetos = this.state.projetos.map(function(item, index){

            let hr = null;
            if(index < this.state.projetos.length-1){
                hr = <hr/>;
            }

            return (
                <tr key={"projeto_"+index}>
                    <td>{item.titulo}</td>
                    <td>{formatDate(item.data_inicio, 'pt-br')}</td>
                    <td width="70">
                        <a onClick={() => this.edit(item.id)}><i className="far fa-edit text-primary"/></a>&nbsp;&nbsp;
                        <a onClick={() => this.callModalExcluir(item.id, item.titulo)} style={{cursor: 'pointer', position: 'relative', top: '4px'}}>
                            <i className="far fa-trash-alt text-danger float-right"/>
                        </a>
                    </td>
                </tr>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fa fa-project-diagram" aria-hidden="true"/></div> <h3>Projetos</h3><br/>
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
                                {/*<th scope="col">Fim da validade</th>
                                <th scope="col">Valor total projeto</th>*/}
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                                {projetos}
                            </tbody>
                        </table>

                        <div style={{float: 'right', cursor: 'pointer'}}>
                            <a onClick={this.callModal} className="btn btn-warning"><i className="fa fa-plus"/> Adicionar novo projeto</a>
                           {/* <a onClick={this.showHideForm} style={{display: this.state.showForm ? "block" : "none"}} className="btn btn-warning"><i className="fa fa-times"/> Cancelar</a>*/}
                        </div>

                        {/*<div style={{clear: 'both', display: this.state.showForm ? 'block' : 'none'}}>
                            <FormProjeto action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                        </div>*/}
                    </div>
                    {modal}
                    {modalExcluir}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Projetos/>,
    document.getElementById('projetos')
);
