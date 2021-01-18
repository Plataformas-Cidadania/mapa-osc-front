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

            removeItemCertificado: null,
            removeItemTx: '',
            removeTipo: '',

            editTipo:null
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModal = this.callModal.bind(this);
        //this.edit = this.edit.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
    }

    componentDidMount(){
        this.list();
    }


    /*edit(id){
        this.setState({actionForm: 'edit', editId: id, modalTitle: 'Alterar título ou certificação'}, function(){
            this.callModal();
        });
    }*/

    cancelRemove(id){
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({remove: remove});
    }

    removeItem(id){
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/certificado/'+id,
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
                this.setState({certificates: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    callModal(id, type, txt){
        let modal = this.state.modal;
        this.setState({
            modal: modal,
            editId:id,
            editTipo:type,
            modalTitle: txt +' título ou certificação'
        }, function(){
            $('#modalForm').modal('show');
        });
    }

    callModalExcluir(id, tx_nome_conferencia, tipo){
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItemCertificado:id,
            removeItemTx:tx_nome_conferencia,
            removeTipo:tipo
        }, function(){
            $('#modalFormExcluir').modal('show');
        });
    }

    modal(){

        let form = null;

        if(this.state.editTipo=='insert'){
            form = (
                <FormCertificate
                    action={this.state.actionForm}
                    list={this.list}
                    showHideForm={this.showHideForm}
                    closeForm={this.closeForm}/>
            );
        }
        if(this.state.editTipo=='edit'){
            form = (
                <FormEditCertificate
                    action={this.state.actionForm}
                    list={this.list}
                    id={this.state.editId}
                    showHideForm={this.showHideForm}
                    closeForm={this.closeForm}/>
            );
        }

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
                            {form}
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            <button type="button" className="btn btn-danger" onClick={() => this.removeItem(this.state.removeItemCertificado, this.state.removeTipo)}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){

        let modalExcluir = this.modalExcluir();

        let modal = this.modal();
        let certificates = this.state.certificates.map(function(item, index){

            let municipio = '';
            if(item.municipio!=null){
                municipio = item.municipio.edmu_nm_municipio + ' - ';
            }
            let estado = '';
            if(item.uf!=null){
                estado = item.uf.eduf_sg_uf;
            }

            let hr = null;
            if(index < this.state.certificates.length-1){
                hr = <hr/>;
            }

            return (
                <tr key={"certificate_"+index}>
                    <td>{item.dc_certificado.tx_nome_certificado}</td>
                    <td>{formatDate(item.dt_inicio_certificado, 'pt-br')}</td>
                    <td>{formatDate(item.dt_fim_certificado, 'pt-br')}</td>
                    <td>{municipio}{estado}</td>
                    <td width="70">
                        <div style={{display: (item.cd_certificado==7 || item.cd_certificado==8 ? '' : 'none')}}>
                            {/*<a onClick={() => this.edit(item.id_certificado)}><i className="far fa-edit text-primary"/></a>&nbsp;&nbsp;*/}
                            <a onClick={() => this.callModal(item.id_certificado, 'edit', 'Alterar')}><i className="far fa-edit text-primary"/></a>&nbsp;&nbsp;
                            <a onClick={() => this.callModalExcluir(item.id_certificado, item.dc_certificado.tx_nome_certificado, 'certificado')} style={{cursor: 'pointer', top: '4px', position: 'relative'}}>
                                <i className="far fa-trash-alt text-danger float-right"/>
                            </a>
                        </div>
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
                            <a onClick={() => this.callModal(0, 'insert', 'Inserir')} className="btn btn-warning"><i className="fa fa-plus"/> Adicionar novo título</a>
                        </div>

                    </div>

                </div>

                {modal}
                {modalExcluir}
            </div>
        );
    }
}


ReactDOM.render(
    <Certificates/>,
    document.getElementById('certificates')
);
