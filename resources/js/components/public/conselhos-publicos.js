class ConselhosPublicos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselhos: [],
            conselheiros: [],
            filteredData: [],
            viewMode: 'cards',
            documentos: {},
            stats: {
                totalConselhos: 0,
                totalConselheiros: 0,
                conselheirosAtivos: 0,
                conselheirosGovernamentais: 0
            },
            filters: {
                search: '',
                conselho: '',
                ativo: '',
                governamental: ''
            }
        };

        this.loadDocumentos = this.loadDocumentos.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        Promise.all([
            this.loadConselhos(),
            this.loadConselheiros()
        ]).then(() => {
            this.organizeData();
        });
    }

    loadConselhos() {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'confocos/conselho',
                cache: false,
                success: (data) => {
                    this.setState({ conselhos: data || [] });
                    resolve(data);
                },
                error: (xhr, status, err) => {
                    console.error('Erro ao carregar conselhos:', err);
                    reject(err);
                }
            });
        });
    }

    loadConselheiros() {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'confocos/conselheiro',
                cache: false,
                success: (data) => {
                    this.setState({ conselheiros: data || [] });
                    resolve(data);
                },
                error: (xhr, status, err) => {
                    console.error('Erro ao carregar conselheiros:', err);
                    reject(err);
                }
            });
        });
    }

    organizeData() {
        const { conselhos, conselheiros } = this.state;

        const organized = conselhos.map(conselho => ({
            ...conselho,
            conselheiros: conselheiros.filter(c => c.id_conselho === conselho.id_conselho)
        }));

        const stats = {
            totalConselhos: conselhos.length,
            totalConselheiros: conselheiros.length,
            conselheirosAtivos: conselheiros.filter(c => c.bo_conselheiro_ativo).length,
            conselheirosGovernamentais: conselheiros.filter(c => c.bo_eh_governamental).length
        };

        // Load documents for each conselho
        conselhos.forEach(conselho => {
            this.loadDocumentos(conselho.id_conselho);
        });

        this.setState({
            filteredData: organized,
            stats,
            loading: false
        }, () => {
            this.applyFilters();
        });
    }

    loadDocumentos(conselhoId) {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/documento-por-conselho/' + conselhoId,
            cache: false,
            success: (data) => {
                this.setState({
                    documentos: {
                        ...this.state.documentos,
                        [conselhoId]: data || []
                    }
                });
            },
            error: (xhr, status, err) => {
                console.error('Erro ao carregar documentos:', err);
            }
        });
    }

    handleFilterChange(field, value) {
        const newFilters = {
            ...this.state.filters,
            [field]: value
        };
        this.setState({ filters: newFilters }, () => {
            this.applyFilters();
        });
    }

    applyFilters() {
        let filtered = this.state.conselhos.map(conselho => ({
            ...conselho,
            conselheiros: this.state.conselheiros.filter(c => c.id_conselho === conselho.id_conselho)
        }));

        if (this.state.filters.search) {
            const searchTerm = this.state.filters.search.toLowerCase();
            filtered = filtered.map(conselho => ({
                ...conselho,
                conselheiros: conselho.conselheiros.filter(c =>
                    (c.tx_nome_conselheiro && c.tx_nome_conselheiro.toLowerCase().includes(searchTerm)) ||
                    (c.tx_orgao_origem && c.tx_orgao_origem.toLowerCase().includes(searchTerm))
                )
            })).filter(conselho =>
                (conselho.tx_nome_conselho && conselho.tx_nome_conselho.toLowerCase().includes(searchTerm)) ||
                conselho.conselheiros.length > 0
            );
        }

        if (this.state.filters.conselho) {
            filtered = filtered.filter(conselho => conselho.id_conselho == this.state.filters.conselho);
        }

        if (this.state.filters.ativo !== '') {
            const isActive = this.state.filters.ativo === 'true';
            filtered = filtered.map(conselho => ({
                ...conselho,
                conselheiros: conselho.conselheiros.filter(c => c.bo_conselheiro_ativo === isActive)
            }));
        }

        if (this.state.filters.governamental !== '') {
            const isGovernamental = this.state.filters.governamental === 'true';
            filtered = filtered.map(conselho => ({
                ...conselho,
                conselheiros: conselho.conselheiros.filter(c => c.bo_eh_governamental === isGovernamental)
            }));
        }

        this.setState({ filteredData: filtered });
    }

    renderHero() {
        return (
            <div className="bg-white border-bottom py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="display-4 mb-3 text-dark">Conselhos Públicos</h1>
                            <p className="lead mb-0 text-muted">
                                Transparência e participação social através dos conselhos e seus conselheiros
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fas fa-users fa-5x text-muted" style={{opacity: 0.3}}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderStats() {
        const { stats } = this.state;
        return (
            <div className="bg-light py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <div className="card border-0 bg-white shadow-sm">
                                <div className="card-body">
                                    <i className="fas fa-building fa-2x text-secondary mb-2"></i>
                                    <h3 className="text-dark mb-1">{stats.totalConselhos}</h3>
                                    <small className="text-muted">Conselhos</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="card border-0 bg-white shadow-sm">
                                <div className="card-body">
                                    <i className="fas fa-users fa-2x text-secondary mb-2"></i>
                                    <h3 className="text-dark mb-1">{stats.totalConselheiros}</h3>
                                    <small className="text-muted">Conselheiros</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="card border-0 bg-white shadow-sm">
                                <div className="card-body">
                                    <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
                                    <h3 className="text-dark mb-1">{stats.conselheirosAtivos}</h3>
                                    <small className="text-muted">Ativos</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="card border-0 bg-white shadow-sm">
                                <div className="card-body">
                                    <i className="fas fa-university fa-2x text-secondary mb-2"></i>
                                    <h3 className="text-dark mb-1">{stats.conselheirosGovernamentais}</h3>
                                    <small className="text-muted">Governamentais</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderFilters() {
        return (
            <div className="bg-white shadow-sm py-4">
                <div className="container">
                    <div className="row align-items-end mb-3">
                        <div className="col-md-3">
                            <label className="form-label mb-1">Buscar</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome ou órgão..."
                                    value={this.state.filters.search}
                                    onChange={(e) => this.handleFilterChange('search', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label mb-1">Conselho</label>
                            <select
                                className="form-control"
                                value={this.state.filters.conselho}
                                onChange={(e) => this.handleFilterChange('conselho', e.target.value)}
                            >
                                <option value="">Todos</option>
                                {this.state.conselhos.map(conselho =>
                                    <option key={conselho.id_conselho} value={conselho.id_conselho}>
                                        {conselho.tx_nome_conselho}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label mb-1">Status</label>
                            <select
                                className="form-control"
                                value={this.state.filters.ativo}
                                onChange={(e) => this.handleFilterChange('ativo', e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="true">Ativos</option>
                                <option value="false">Inativos</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label mb-1">Tipo</label>
                            <select
                                className="form-control"
                                value={this.state.filters.governamental}
                                onChange={(e) => this.handleFilterChange('governamental', e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="true">Governamental</option>
                                <option value="false">Não Governamental</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-1">Visualização</label>
                            <div className="btn-group w-100" role="group">
                                <button
                                    type="button"
                                    className={`btn ${this.state.viewMode === 'cards' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => this.setState({viewMode: 'cards'})}
                                >
                                    <i className="fas fa-th"></i> Cards
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${this.state.viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => this.setState({viewMode: 'list'})}
                                >
                                    <i className="fas fa-list"></i> Lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCards() {
        return (
            <div className="row">
                {this.state.filteredData.map((conselho, index) => (
                    <div key={`card-${conselho.id_conselho}-${index}`} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-light border-bottom">
                                <h6 className="mb-0 text-dark">
                                    <i className="fas fa-building mr-2 text-secondary"></i>
                                    {conselho.tx_nome_conselho || 'Sem nome'}
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="badge badge-light border">
                                        {conselho.conselheiros ? conselho.conselheiros.length : 0} conselheiro(s)
                                    </span>
                                    <span className={`badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`}>
                                        {conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>

                                {conselho.tx_ato_legal && (
                                    <div className="mb-2">
                                        <small className="text-muted d-block">Ato Legal:</small>
                                        <small>{conselho.tx_ato_legal}</small>
                                    </div>
                                )}

                                {conselho.tx_website && (
                                    <div className="mb-2">
                                        <small className="text-muted d-block">Website:</small>
                                        <a href={`http://${conselho.tx_website}`} target="_blank" rel="noopener noreferrer" className="small text-primary">
                                            {conselho.tx_website}
                                        </a>
                                    </div>
                                )}

                                {this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-2">Documentos:</small>
                                        <div className="d-flex flex-wrap">
                                            {this.state.documentos[conselho.id_conselho].slice(0, 2).map(doc => (
                                                <span key={doc.id_documento_conselho} className="badge badge-light border mr-1 mb-1" title={doc.tx_titulo_documento}>
                                                    <i className="fas fa-file-alt mr-1"></i>
                                                    {doc.tx_titulo_documento.length > 15 ? doc.tx_titulo_documento.substring(0, 15) + '...' : doc.tx_titulo_documento}
                                                </span>
                                            ))}
                                            {this.state.documentos[conselho.id_conselho].length > 2 && (
                                                <span className="badge badge-secondary">+{this.state.documentos[conselho.id_conselho].length - 2}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-3">
                                    <small className="text-muted d-block mb-2">Conselheiros:</small>
                                    {!conselho.conselheiros || conselho.conselheiros.length === 0 ? (
                                        <small className="text-muted">Nenhum conselheiro cadastrado</small>
                                    ) : (
                                        <div className="conselheiros-preview">
                                            {conselho.conselheiros.slice(0, 3).map((conselheiro, cIndex) => (
                                                <div key={`preview-${conselheiro.id_conselheiro}-${cIndex}`} className="d-flex justify-content-between align-items-center py-1 border-bottom">
                                                    <small className="text-truncate mr-2">{conselheiro.tx_nome_conselheiro || 'Sem nome'}</small>
                                                    <div>
                                                        <span className={`badge badge-sm ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} mr-1`}>
                                                            {conselheiro.bo_conselheiro_ativo ? 'A' : 'I'}
                                                        </span>
                                                        <span className={`badge badge-sm ${conselheiro.bo_eh_governamental ? 'badge-secondary' : 'badge-light border'}`}>
                                                            {conselheiro.bo_eh_governamental ? 'G' : 'NG'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {conselho.conselheiros.length > 3 && (
                                                <small className="text-muted">... e mais {conselho.conselheiros.length - 3} conselheiro(s)</small>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    renderList() {
        return (
            <div className="accordion" id="conselhosAccordion">
                {this.state.filteredData.map((conselho, index) => (
                    <div key={`list-${conselho.id_conselho}-${index}`} className="card mb-3 border-0 shadow-sm">
                        <div className="card-header bg-light" id={`heading${index}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className=" w-100">
                                    <h6 className="mb-0" >
                                        <button
                                            className="btn btn-link text-decoration-none p-0 text-left text-dark w-100"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target={`#collapse${index}`}
                                        >
                                            <i className="fas fa-building text-secondary mr-2"></i>
                                            {conselho.tx_nome_conselho}
                                        </button>
                                    </h6>
                                    <small className="text-muted">{conselho.conselheiros.length} conselheiro(s)</small>
                                </div>
                                <div>
                                    <span className={`badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'} mr-2`}>
                                        {conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                        <div id={`collapse${index}`} className="collapse" data-parent="#conselhosAccordion">
                            <div className="card-body">
                                {this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && (
                                    <div className="mb-4">
                                        <h6 className="text-secondary mb-3">
                                            <i className="fas fa-folder-open mr-2"></i>
                                            Documentos ({this.state.documentos[conselho.id_conselho].length})
                                        </h6>
                                        <div className="row">
                                            {this.state.documentos[conselho.id_conselho].map(doc => (
                                                <div key={doc.id_documento_conselho} className="col-md-4 mb-2">
                                                    <div className="card border-0 bg-light">
                                                        <div className="card-body py-2 px-3">
                                                            <div className="d-flex align-items-center">
                                                                <i className="fas fa-file-alt text-primary mr-2"></i>
                                                                <div className="flex-grow-1">
                                                                    <small className="d-block font-weight-bold text-truncate" title={doc.tx_titulo_documento}>
                                                                        {doc.tx_titulo_documento}
                                                                    </small>
                                                                    <small className="text-muted">
                                                                        {doc.tx_tipo_arquivo} | {new Date(doc.dt_data_cadastro).toLocaleDateString()}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {conselho.conselheiros.length === 0 ? (
                                    <div className="text-center text-muted py-3">
                                        <i className="fas fa-users fa-2x mb-2"></i>
                                        <p className="mb-0">Nenhum conselheiro cadastrado</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h6 className="text-secondary mb-3">
                                            <i className="fas fa-users mr-2"></i>
                                            Conselheiros ({conselho.conselheiros.length})
                                        </h6>
                                        <div className="conselheiros-container" style={{maxHeight: '400px', overflowY: 'auto'}}>
                                            <div className="row">
                                                {conselho.conselheiros && conselho.conselheiros.map((conselheiro, cIndex) => (
                                                    <div key={`list-item-${conselheiro.id_conselheiro}-${cIndex}`} className="col-md-6 col-lg-4 mb-2">
                                                        <div className="card border-0 bg-light h-100">
                                                            <div className="card-body py-2 px-3">
                                                                <div className="d-flex justify-content-between align-items-start">
                                                                    <div className="flex-grow-1 mr-2">
                                                                        <h6 className="mb-1 text-truncate" title={conselheiro.tx_nome_conselheiro}>
                                                                            {conselheiro.tx_nome_conselheiro || 'Sem nome'}
                                                                        </h6>
                                                                        {conselheiro.tx_orgao_origem && (
                                                                            <small className="text-muted d-block text-truncate" title={conselheiro.tx_orgao_origem}>
                                                                                {conselheiro.tx_orgao_origem}
                                                                            </small>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-right flex-shrink-0">
                                                                        <span className={`badge badge-sm ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} d-block mb-1`}>
                                                                            {conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'}
                                                                        </span>
                                                                        <span className={`badge badge-sm ${conselheiro.bo_eh_governamental ? 'badge-secondary' : 'badge-light border'}`}>
                                                                            {conselheiro.bo_eh_governamental ? 'Gov.' : 'Não Gov.'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {conselho.conselheiros.length > 12 && (
                                                <div className="text-center mt-2">
                                                    <small className="text-muted">
                                                        <i className="fas fa-info-circle mr-1"></i>
                                                        Role para ver todos os {conselho.conselheiros.length} conselheiros
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <div className="bg-white py-5">
                        <div className="container text-center">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Carregando...</span>
                            </div>
                            <p className="mt-3 mb-0 text-muted">Carregando conselhos...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {this.renderHero()}
                {this.renderStats()}
                {this.renderFilters()}

                <div className="container py-4">
                    {this.state.filteredData.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fas fa-search fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">Nenhum conselho encontrado</h5>
                            <p className="text-muted">Tente ajustar os filtros para encontrar o que procura</p>
                        </div>
                    ) : (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0">
                                    {this.state.filteredData.length} conselho(s) encontrado(s)
                                </h5>
                            </div>
                            {this.state.viewMode === 'cards' ? this.renderCards() : this.renderList()}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ConselhosPublicos/>,
    document.getElementById('conselhos-publicos')
);
