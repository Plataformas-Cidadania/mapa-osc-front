class ArquivosConselho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            documentos: [],
            conselhoId: null,
            conselho: null,
            showUploadForm: false,
            uploadForm: {
                titulo: '',
                arquivo: null
            }
        };

        this.handleUploadChange = this.handleUploadChange.bind(this);
        this.saveDocumento = this.saveDocumento.bind(this);
        this.deleteDocumento = this.deleteDocumento.bind(this);
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const conselhoId = urlParams.get('conselho');

        if (conselhoId) {
            this.setState({ conselhoId });
            this.loadConselho(conselhoId);
            this.loadDocumentos(conselhoId);
        } else {
            this.setState({ loading: false });
        }
    }

    loadConselho(conselhoId) {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/conselho/' + conselhoId,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({ conselho: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselho:', err);
            }.bind(this)
        });
    }

    loadDocumentos(conselhoId) {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/documento-por-conselho/' + conselhoId,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({
                    loading: false,
                    documentos: data || []
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar documentos:', err);
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    handleUploadChange(field, value) {
        this.setState({
            uploadForm: {
                ...this.state.uploadForm,
                [field]: value
            }
        });
    }

    saveDocumento() {
        if (!this.state.uploadForm.arquivo || !this.state.uploadForm.titulo) {
            alert('Por favor, selecione um arquivo e digite um título.');
            return;
        }

        let formData = new FormData();
        formData.append("documento", this.state.uploadForm.arquivo);
        formData.append("id_conselho", this.state.conselhoId);
        formData.append("tx_titulo_documento", this.state.uploadForm.titulo);

        $.ajax({
            method: 'POST',
            url: getBaseUrl2 + 'confocos/documento-conselho',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
                this.setState({
                    showUploadForm: false,
                    uploadForm: { titulo: '', arquivo: null }
                });
                this.loadDocumentos(this.state.conselhoId);
                alert('Documento enviado com sucesso!');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                alert('Erro ao enviar documento');
            }.bind(this)
        });
    }

    deleteDocumento(documentoId) {
        if (confirm('Tem certeza que deseja excluir este documento?')) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'confocos/documento-conselho/' + documentoId,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function() {
                    this.loadDocumentos(this.state.conselhoId);
                    alert('Documento excluído com sucesso!');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    alert('Erro ao excluir documento');
                }.bind(this)
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <div className="text-center">Carregando...</div>;
        }

        if (!this.state.conselhoId) {
            return (
                <div className="container-fluid">
                    <div className="bg-white text-center py-5">
                        <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h5>Conselho não especificado</h5>
                        <p className="text-muted">Acesse esta página através do dashboard de conselhos</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="bg-white border-bottom py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3><i className="fas fa-users"/> Arquivos do Conselho</h3>
                            <p>Nessa área você pode gerenciar seus arquivos</p>

                            {this.state.conselho && (
                                <small className="text-muted">{this.state.conselho.tx_nome_conselho}</small>
                            )}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.setState({ showUploadForm: !this.state.showUploadForm })}
                        >
                            {this.state.showUploadForm ? (
                                <><i className="fas fa-times"></i> Cancelar</>
                            ) : (
                                <><i className="fas fa-plus"></i> Novo Documento</>
                            )}
                        </button>
                    </div>
                </div>

                {this.state.showUploadForm && (
                    <div className="bg-light border-bottom p-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Título do Documento</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.uploadForm.titulo}
                                        onChange={(e) => this.handleUploadChange('titulo', e.target.value)}
                                        placeholder="Digite o título do documento"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Arquivo</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        onChange={(e) => this.handleUploadChange('arquivo', e.target.files[0])}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>&nbsp;</label>
                                    <button
                                        type="button"
                                        className="btn btn-success btn-block"
                                        onClick={this.saveDocumento}
                                    >
                                        <i className="fas fa-upload"></i> Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white">
                    {this.state.documentos.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">Nenhum documento encontrado</h5>
                            <p className="text-muted">Clique no botão "Novo Documento" para começar</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Tipo</th>
                                        <th>Data</th>
                                        <th width="100">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.documentos.map(doc => (
                                        <tr key={doc.id_documento_conselho}>
                                            <td>
                                                <i className="fas fa-file-alt text-primary mr-2"></i>
                                                {doc.tx_titulo_documento}
                                            </td>
                                            <td>{doc.tx_tipo_arquivo}</td>
                                            <td>{new Date(doc.dt_data_cadastro).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => this.deleteDocumento(doc.id_documento_conselho)}
                                                    title="Excluir documento"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ArquivosConselho/>,
    document.getElementById('arquivos-conselho')
);
