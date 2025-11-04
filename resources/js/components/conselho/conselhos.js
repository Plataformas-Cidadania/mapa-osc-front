class Conselhos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselhos: [],
            showModal: false,
            showDocumentosModal: false,
            showUploadModal: false,
            selectedConselhoId: null,
            editingConselho: null,
            uploadForm: {
                titulo: '',
                arquivo: null
            },
            form: {
                tx_nome_conselho: '',
                tx_ato_legal: '',
                tx_website: '',
                bo_conselho_ativo: true,
                cd_nivel_federativo: '',
                cd_tipo_abrangencia: ''
            },
            nivelFederativo: [],
            tipoAbrangencia: [],
            selectedEstado: '',
            municipios: [],
            documentos: {}
        };

        this.setDocumento = this.setDocumento.bind(this);
        this.saveDocumento = this.saveDocumento.bind(this);
        this.loadDocumentos = this.loadDocumentos.bind(this);
        this.deleteDocumento = this.deleteDocumento.bind(this);
        this.openDocumentosModal = this.openDocumentosModal.bind(this);
        this.closeDocumentosModal = this.closeDocumentosModal.bind(this);
        this.openUploadModal = this.openUploadModal.bind(this);
        this.closeUploadModal = this.closeUploadModal.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
    }

    componentDidMount() {
        this.loadConselhos();
        this.loadNivelFederativo();
    }

    loadNivelFederativo() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/nivel_federativo',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({ nivelFederativo: data || [] });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar níveis federativos:', err);
            }.bind(this)
        });
    }



    loadGeographicData(nivelFederativo) {
        if (nivelFederativo == 1) {
            this.setState({ tipoAbrangencia: [{ cd_tipo_abrangencia: 'BR', tx_nome_abrangencia: 'Brasil' }] });
        } else if (nivelFederativo == 2) {
            this.loadEstados();
        } else if (nivelFederativo == 3) {
            this.loadEstados();
        }
    }

    loadEstados() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'geo/estados',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                const estados = Object.values(data).map(estado => ({
                    cd_tipo_abrangencia: estado.id_regiao,
                    tx_nome_abrangencia: estado.tx_nome_regiao
                }));
                this.setState({ tipoAbrangencia: estados });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar estados:', err);
            }.bind(this)
        });
    }

    loadMunicipios(estadoId) {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'geo/municipios/estado/' + estadoId,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                const municipios = (data || []).map(municipio => ({
                    cd_tipo_abrangencia: municipio.id_regiao,
                    tx_nome_abrangencia: municipio.tx_nome_regiao
                }));
                this.setState({ municipios });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar municípios:', err);
            }.bind(this)
        });
    }

    getAvailableAbrangencia(sourceArray) {
        const currentNivel = this.state.form.cd_nivel_federativo;
        const currentConselhoId = this.state.editingConselho?.id_conselho;
        
        const registeredAbrangencias = this.state.conselhos
            .filter(conselho => 
                conselho.cd_nivel_federativo == currentNivel && 
                conselho.id_conselho !== currentConselhoId
            )
            .map(conselho => conselho.cd_tipo_abrangencia.toString());
        
        return sourceArray.filter(item => 
            !registeredAbrangencias.includes(item.cd_tipo_abrangencia.toString())
        );
    }

    openModal(conselho = null) {
        if (conselho) {
            this.setState({
                showModal: true,
                editingConselho: conselho,
                form: {
                    tx_nome_conselho: conselho.tx_nome_conselho || '',
                    tx_ato_legal: conselho.tx_ato_legal || '',
                    tx_website: conselho.tx_website || '',
                    bo_conselho_ativo: conselho.bo_conselho_ativo || true,
                    cd_nivel_federativo: conselho.cd_nivel_federativo || '',
                    cd_tipo_abrangencia: conselho.cd_tipo_abrangencia || ''
                }
            });
        } else {
            this.setState({
                showModal: true,
                editingConselho: null,
                form: {
                    tx_nome_conselho: '',
                    tx_ato_legal: '',
                    tx_website: '',
                    bo_conselho_ativo: true,
                    cd_nivel_federativo: '',
                    cd_tipo_abrangencia: ''
                }
            });
        }
    }

    closeModal() {
        this.setState({
            showModal: false,
            editingConselho: null,
            form: {
                tx_nome_conselho: '',
                tx_ato_legal: '',
                tx_website: '',
                bo_conselho_ativo: true,
                cd_nivel_federativo: '',
                cd_tipo_abrangencia: ''
            }
        });
    }

    generateConselhoName() {
        const nivel = this.state.nivelFederativo.find(n => n.cd_nivel_federativo == this.state.form.cd_nivel_federativo);
        const abrangencia = this.state.form.cd_nivel_federativo == 3 ?
            this.state.municipios.find(m => m.cd_tipo_abrangencia == this.state.form.cd_tipo_abrangencia) :
            this.state.tipoAbrangencia.find(a => a.cd_tipo_abrangencia == this.state.form.cd_tipo_abrangencia);

        if (nivel && abrangencia) {
            const nivelText = nivel.tx_nome_nivel_federativo.toLowerCase();
            const preposicao = this.state.form.cd_nivel_federativo == 3 ? 'do município de' :
                              this.state.form.cd_nivel_federativo == 2 ? 'do estado de' : 'do';
            const nomeConselho = `Conselho ${nivelText} de Fomento e Colaboração ${preposicao} ${abrangencia.tx_nome_abrangencia}`;

            this.setState({
                form: {
                    ...this.state.form,
                    tx_nome_conselho: nomeConselho
                }
            });
        }
    }

    handleInputChange(field, value) {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value
            }
        });

        if (field === 'cd_nivel_federativo') {
            this.loadGeographicData(value);
            this.setState({
                form: {
                    ...this.state.form,
                    [field]: value,
                    cd_tipo_abrangencia: '',
                    tx_nome_conselho: ''
                },
                selectedEstado: '',
                municipios: []
            });
        } else if (field === 'selectedEstado' && this.state.form.cd_nivel_federativo == 3) {
            this.loadMunicipios(value);
            this.setState({
                selectedEstado: value,
                form: {
                    ...this.state.form,
                    cd_tipo_abrangencia: ''
                }
            });
        } else if (field === 'cd_tipo_abrangencia') {
            setTimeout(() => this.generateConselhoName(), 100);
        }
    }

    saveConselho() {
        const url = this.state.editingConselho
            ? getBaseUrl2 + 'confocos/conselho/' + this.state.editingConselho.id_conselho
            : getBaseUrl2 + 'confocos/conselho';

        const method = this.state.editingConselho ? 'PUT' : 'POST';

        $.ajax({
            method: method,
            url: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(this.state.form),
            success: function() {
                this.closeModal();
                this.loadConselhos();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao salvar conselho:', err);
                alert('Erro ao salvar conselho');
            }.bind(this)
        });
    }

    loadConselhos() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/conselho',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({
                    loading: false,
                    conselhos: data || []
                });
                if (data && data.length > 0) {
                    data.forEach(conselho => {
                        this.loadDocumentos(conselho.id_conselho);
                    });
                }
                console.log('conselho:::::::::', data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    deleteConselho(id) {
        if (confirm('Tem certeza que deseja excluir este conselho?')) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'confocos/conselho/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function() {
                    this.loadConselhos();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    alert('Erro ao excluir conselho');
                }
            });
        }
    }

    setDocumento(conselhoId) {
        this.openUploadModal(conselhoId);
    }

    openUploadModal(conselhoId) {
        this.setState({
            showUploadModal: true,
            selectedConselhoId: conselhoId,
            uploadForm: { titulo: '', arquivo: null }
        });
    }

    closeUploadModal() {
        this.setState({
            showUploadModal: false,
            selectedConselhoId: null,
            uploadForm: { titulo: '', arquivo: null }
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
        formData.append("id_conselho", this.state.selectedConselhoId);
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
                this.loadDocumentos(this.state.selectedConselhoId);
                this.closeUploadModal();
                alert('Documento enviado com sucesso!');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                alert('Erro ao enviar documento');
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
                    documentos: {
                        ...this.state.documentos,
                        [conselhoId]: data || []
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar documentos:', err);
            }.bind(this)
        });
    }

    deleteDocumento(documentoId, conselhoId) {
        if (confirm('Tem certeza que deseja excluir este documento?')) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'confocos/documento-conselho/' + documentoId,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function() {
                    this.loadDocumentos(conselhoId);
                    alert('Documento excluído com sucesso!');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    alert('Erro ao excluir documento');
                }.bind(this)
            });
        }
    }

    openDocumentosModal(conselhoId) {
        this.setState({
            showDocumentosModal: true,
            selectedConselhoId: conselhoId
        });
    }

    closeDocumentosModal() {
        this.setState({
            showDocumentosModal: false,
            selectedConselhoId: null
        });
    }

    renderModal() {
        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <strong>{this.state.editingConselho ? 'Editar Conselho' : 'Novo Conselho'}</strong>
                            </h5>
                            <button type="button" className="close" onClick={() => this.closeModal()}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Nome do Conselho</label>
                                <div className="form-control bg-light" style={{minHeight: '60px', padding: '6px 12px', fontWeight: 'bold'}}>
                                    {this.state.form.tx_nome_conselho || 'Selecione o nível federativo e abrangência para gerar o nome'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Ato Legal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_ato_legal}
                                    onChange={(e) => this.handleInputChange('tx_ato_legal', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_website}
                                    onChange={(e) => this.handleInputChange('tx_website', e.target.value)}
                                />
                            </div>
                            {!this.state.editingConselho &&
                                <div>
                                    <div className="form-group">
                                        <label>Nível Federativo</label>
                                        <select
                                            className="form-control"
                                            value={this.state.form.cd_nivel_federativo}
                                            onChange={(e) => this.handleInputChange('cd_nivel_federativo', e.target.value ? parseInt(e.target.value) : '')}
                                        >
                                            <option value="">Selecione...</option>
                                            {this.state.nivelFederativo.map(nivel =>
                                                <option key={nivel.cd_nivel_federativo} value={nivel.cd_nivel_federativo}>
                                                    {nivel.tx_nome_nivel_federativo}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    {this.state.form.cd_nivel_federativo == 1 && (
                                        <div className="form-group">
                                            <label>País</label>
                                            <select
                                                className="form-control"
                                                value={this.state.form.cd_tipo_abrangencia}
                                                onChange={(e) => this.handleInputChange('cd_tipo_abrangencia', e.target.value)}
                                            >
                                                <option value="">Selecione...</option>
                                                {this.state.tipoAbrangencia.map(tipo =>
                                                    <option key={tipo.cd_tipo_abrangencia} value={tipo.cd_tipo_abrangencia}>
                                                        {tipo.tx_nome_abrangencia}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    )}
                                    {this.state.form.cd_nivel_federativo == 2 && (
                                        <div className="form-group">
                                            <label>Estado</label>
                                            <select
                                                className="form-control"
                                                value={this.state.form.cd_tipo_abrangencia}
                                                onChange={(e) => this.handleInputChange('cd_tipo_abrangencia', e.target.value)}
                                            >
                                                <option value="">Selecione...</option>
                                                {this.getAvailableAbrangencia(this.state.tipoAbrangencia).map(tipo =>
                                                    <option key={tipo.cd_tipo_abrangencia} value={tipo.cd_tipo_abrangencia}>
                                                        {tipo.tx_nome_abrangencia}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    )}
                                    {this.state.form.cd_nivel_federativo == 3 && (
                                        <>
                                            <div className="form-group">
                                                <label>Estado</label>
                                                <select
                                                    className="form-control"
                                                    value={this.state.selectedEstado}
                                                    onChange={(e) => this.handleInputChange('selectedEstado', e.target.value)}
                                                >
                                                    <option value="">Selecione...</option>
                                                    {this.state.tipoAbrangencia.map(estado =>
                                                        <option key={estado.cd_tipo_abrangencia} value={estado.cd_tipo_abrangencia}>
                                                            {estado.tx_nome_abrangencia}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                            {this.state.selectedEstado && (
                                                <div className="form-group">
                                                    <label>Município</label>
                                                    <select
                                                        className="form-control"
                                                        value={this.state.form.cd_tipo_abrangencia}
                                                        onChange={(e) => this.handleInputChange('cd_tipo_abrangencia', e.target.value)}
                                                    >
                                                        <option value="">Selecione...</option>
                                                        {this.getAvailableAbrangencia(this.state.municipios).map(municipio =>
                                                            <option key={municipio.cd_tipo_abrangencia} value={municipio.cd_tipo_abrangencia}>
                                                                {municipio.tx_nome_abrangencia}
                                                            </option>
                                                        )}
                                                    </select>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            }



                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.form.bo_conselho_ativo}
                                        onChange={(e) => this.handleInputChange('bo_conselho_ativo', e.target.checked)}
                                    />
                                    {' '}Conselho Ativo
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.saveConselho()}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return <div className="text-center">Carregando...</div>;
        }

        if (this.state.conselhos.length === 0) {
            return (
                <div className="container-fluid">
                    <div className="bg-white border-bottom py-3 px-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Conselhos</h4>
                            <button className="btn btn-primary" onClick={() => this.openModal()}>
                                Novo Conselho
                            </button>
                        </div>
                    </div>
                    <div className="bg-white text-center">
                        <i className="fas fa-users fa-3x text-muted mb-3"></i>
                        <h5 className="text-muted">Nenhum conselho encontrado</h5>
                        <p className="text-muted">Clique no botão "Novo Conselho" para começar</p>
                    </div>
                    {this.state.showModal && this.renderModal()}
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="bg-white border-bottom py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Meus conselhos</h2>
                        <button className="btn btn-primary" onClick={() => this.openModal()}>
                            Novo Conselho
                        </button>
                    </div>
                </div>
                <div className="">
                    <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Ato Legal</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.conselhos.map(conselho =>
                                        <tr key={conselho.id_conselho}>
                                            <td>{conselho.tx_nome_conselho || 'N/A'} <br/>
                                                {conselho.tx_website ?
                                                    <a href={`http://${conselho.tx_website}`} target="_blank" rel="noopener noreferrer">
                                                        <i class="fa fa-globe"></i> {conselho.tx_website}
                                                    </a> : 'N/A'
                                                }
                                            </td>
                                            <td>{conselho.tx_ato_legal || 'N/A'}</td>
                                            <td>
                                                <span className={`badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`}>
                                                    {conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-wrap gap-1">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => this.openModal(conselho)}
                                                        title="Editar conselho"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-success"
                                                        onClick={() => this.setDocumento(conselho.id_conselho)}
                                                        title="Enviar documento"
                                                    >
                                                        <i className="fas fa-cloud-upload-alt"></i>
                                                    </button>

                                                    {this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && (
                                                        <button
                                                            className="btn btn-sm btn-outline-info position-relative"
                                                            onClick={() => this.openDocumentosModal(conselho.id_conselho)}
                                                            title={`${this.state.documentos[conselho.id_conselho].length} documento(s)`}
                                                        >
                                                            <i className="fas fa-folder-open"></i>
                                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                                                                {this.state.documentos[conselho.id_conselho].length}
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    </div>
                </div>
                {this.state.showModal && this.renderModal()}
                {this.state.showDocumentosModal && this.renderDocumentosModal()}
                {this.state.showUploadModal && this.renderUploadModal()}
            </div>
        );
    }

    renderDocumentosModal() {
        const documentos = this.state.documentos[this.state.selectedConselhoId] || [];

        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-folder-open mr-2"></i>
                                Documentos do Conselho
                            </h5>
                            <button type="button" className="close" onClick={this.closeDocumentosModal}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            {documentos.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                                    <p className="text-muted">Nenhum documento encontrado</p>
                                </div>
                            ) : (
                                <div className="list-group">
                                    {documentos.map(doc => (
                                        <div key={doc.id_documento_conselho} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-file-alt text-primary mr-3"></i>
                                                <div>
                                                    <h6 className="mb-1">{doc.tx_titulo_documento}</h6>
                                                    <small className="text-muted">
                                                        Tipo: {doc.tx_tipo_arquivo} | Data: {new Date(doc.dt_data_cadastro).toLocaleDateString()}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => this.deleteDocumento(doc.id_documento_conselho, this.state.selectedConselhoId)}
                                                    title="Excluir documento"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeDocumentosModal}>
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderUploadModal() {
        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-cloud-upload-alt mr-2"></i>
                                Enviar Documento
                            </h5>
                            <button type="button" className="close" onClick={this.closeUploadModal}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeUploadModal}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-success" onClick={this.saveDocumento}>
                                <i className="fas fa-upload mr-1"></i>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Conselhos/>,
    document.getElementById('conselhos')
);
