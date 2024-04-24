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

            editTipo:null,

            uf:{
                12: 'AC',
                27: 'AL',
                16: 'AP',
                13: 'AM',
                29: 'BA',
                23: 'CE',
                53: 'DF',
                32: 'ES',
                52: 'GO',
                21: 'MA',
                51: 'MT',
                50: 'MS',
                31: 'MG',
                15: 'PA',
                25: 'PB',
                41: 'PR',
                26: 'PE',
                22: 'PI',
                24: 'RN',
                43: 'RS',
                33: 'RJ',
                11: 'RO',
                14: 'RR',
                42: 'SC',
                35: 'SP',
                28: 'SE',
                17: 'TO',
            },
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



    cancelRemove(id){
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({remove: remove});
    }

    removeItem(id){
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/certificado/'+id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
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
            //url: getBaseUrl2 + 'osc/certificados/455128',
            url: getBaseUrl2+'osc/certificados/'+this.props.id,
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
                    id_osc={this.props.id}//id da osc
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
                    id_osc={this.props.id}//id da osc
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
        let certificates = null;

        if(this.state.certificates.Resposta!='Nenhum Certificado foi encontrado para essa OSC!'){
            certificates = this.state.certificates.map(function(item, index){
                let municipio = '';
                if(item?.municipio!=null){
                    municipio = item.municipio.edmu_nm_municipio + ' - ' + this.state.uf[item.municipio.eduf_cd_uf];
                }

                let estado = '';
                if(item?.uf!=null){
                    estado = item.uf?.eduf_sg_uf;
                }

                return (
                    <tr key={"certificate_"+index}>
                        <td>{item.ft_inicio_certificado === 'Representante de OSC' || item.ft_inicio_certificado == null ? null :
                            <i className="fas fa-database tx-pri"></i>} {item.dc_certificado.tx_nome_certificado} -{item.ft_inicio_certificado}-</td>
                        <td>{formatDate(item.dt_inicio_certificado, 'pt-br')}</td>
                        <td>{formatDate(item.dt_fim_certificado, 'pt-br')}</td>
                        <td>{/*{municipio}{estado}*/}
                            {item.cd_certificado === 8 ? municipio : estado}
                        </td>
                        <td width="70">
                            <div style={{display: (item.cd_certificado==7 || item.cd_certificado==8 ? '' : 'none')}}>
                                <a onClick={() => this.callModal(item.id_certificado, 'edit', 'Alterar')}><i className="far fa-edit text-primary cursor"/></a>&nbsp;&nbsp;
                                <a onClick={() => this.callModalExcluir(item.id_certificado, item.dc_certificado.tx_nome_certificado, 'certificado')} style={{cursor: 'pointer', top: '4px', position: 'relative'}}>
                                    <i className="far fa-trash-alt text-danger float-right"/>
                                </a>
                            </div>
                        </td>
                    </tr>
                );
            }.bind(this));
        }


        return(
            <div>
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fas fa-certificate" aria-hidden="true"/></div> <h3>Títulos e certificações</h3><br/>
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

                        <div className="text-center">
                            <img src="/img/load.gif" alt="" width="60" className="login-img" style={{display: this.state.loadingList ? '' : 'none'}}/>
                        </div>

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
    <Certificates id={id}/>,
    document.getElementById('certificates')
);
