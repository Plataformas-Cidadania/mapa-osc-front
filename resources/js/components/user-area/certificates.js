class Certificates extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            certificates:[],
            cd_certificado:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            certificate: {},
            editId: 0,
            modal: {},
            modalTitle: 'Inserir título ou certificação',
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModal = this.callModal.bind(this);
        this.edit = this.edit.bind(this);
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

        return age;

    }

    edit(id){
        this.setState({actionForm: 'edit', editId: id, modalTitle: 'Alterar título ou certificação'}, function(){
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
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/certificados/'+id,
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

        this.setState({showForm: showForm, actionForm: actionForm});
    }

    closeForm(){
        this.setState({showForm: false});
    }

    list(){

        this.setState({loadingList: true});

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/certificados/455128',
            data: {
            },
            cache: false,
            success: function(data){
                console.log("data: ",data);
                this.setState({certificates: data, loadingList: false});
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

                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel"><strong>{this.state.modalTitle}</strong></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <FormCertificate action={this.state.actionForm} list={this.list} id={this.state.editId} showHideForm={this.showHideForm} closeForm={this.closeForm}/>
                        </div>
                        {/*<div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>*/}

                    </div>
                </div>
            </div>
        )
    }

    render(){

        let modal = this.modal();
        let certificates = this.state.certificates.map(function(item, index){

            let hr = null;
            if(index < this.state.certificates.length-1){
                hr = <hr/>;
            }

            return (
                <tr key={"certificate_"+index}>
                    <td>{item.dc_certificado.tx_nome_certificado}</td>
                    <td>{item.dt_inicio_certificado}</td>
                    <td>{item.dt_fim_certificado}</td>
                    <td>{item.edmu_nm_municipio}</td>
                    <td width="70">
                        <a onClick={() => this.edit(item.id_certificado)}><i className="far fa-edit text-primary"/></a>&nbsp;&nbsp;
                        <a onClick={() => this.remove(item.id_certificado)} style={{display: this.state.loadingRemove[item.id_certificado] ? 'none' : ''}}>
                            <i className={"fas "+( this.state.remove[item.id_certificado] ? "fa-times text-primary" : "fa-trash-alt text-danger")}/>
                        </a>
                        <a onClick={() => this.cancelRemove(item.id_certificado)} style={{display: this.state.remove[item.id_certificado] && !this.state.loadingRemove[item.id_certificado] ? '' : 'none'}}>
                            <i className="fas fa-undo"/>
                        </a>
                        <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id_certificado] ? '' : 'none'}}/>
                    </td>
                </tr>
            );
        }.bind(this));

        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-certificate" aria-hidden="true"/></div> <h3>Títulos e Certificações</h3><br/>
                    <p>Você tem {this.state.certificates.length} títulos ou certificados cadastrados</p>
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
                                <th scope="col">Titulo / Certificado</th>
                                <th scope="col">Início da validade</th>
                                <th scope="col">Fim da validade</th>
                                <th scope="col">Localidade</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                                {certificates}
                            </tbody>
                        </table>

                        <div style={{float: 'right', cursor: 'pointer'}}>
                            <a onClick={this.callModal}  className="btn btn-warning"><i className="fa fa-plus"/> Adicionar novo título</a>
                        </div>

                    </div>

                </div>

                {modal}
            </div>
        );
    }
}


ReactDOM.render(
    <Certificates/>,
    document.getElementById('certificates')
);
