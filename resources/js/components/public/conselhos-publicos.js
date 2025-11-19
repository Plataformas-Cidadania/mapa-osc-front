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
            showConselheirosModal: false,
            selectedConselho: null,
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
        this.showConselheirosModal = this.showConselheirosModal.bind(this);
        this.closeConselheirosModal = this.closeConselheirosModal.bind(this);
        this.openDocument = this.openDocument.bind(this);
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

    showConselheirosModal(conselho) {
        this.setState({
            selectedConselho: conselho,
            showConselheirosModal: true
        });
    }

    closeConselheirosModal() {
        this.setState({
            selectedConselho: null,
            showConselheirosModal: false
        });
    }

    openDocument(doc) {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/documento-conselho/' + doc.id_documento_conselho,
            cache: false,
            success: (data) => {
                try {
                    if (!data.arquivo) {
                        alert('Arquivo não encontrado');
                        return;
                    }

                    const byteCharacters = atob(data.arquivo);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: data.tx_tipo_arquivo });
                    const url = URL.createObjectURL(blob);
                    window.open(url, '_blank');
                } catch (error) {
                    console.error('Erro ao abrir documento:', error);
                    alert('Erro ao abrir o documento');
                }
            },
            error: (xhr, status, err) => {
                console.error('Erro ao buscar documento:', err);
                alert('Erro ao carregar o documento');
            }
        });
    }

    renderHero() {
        return (
            <div className="position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '400px'
            }}>
                <div className="position-absolute" style={{
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                }}></div>
                <div className="position-absolute" style={{
                    bottom: '-30px',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    transform: 'rotate(45deg)',
                    filter: 'blur(20px)'
                }}></div>

                <div className="container position-relative" style={{paddingTop: '80px', paddingBottom: '80px'}}>
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="mb-4">
                                <div className="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-3" style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <i className="fas fa-landmark me-2 text-white"></i>
                                    <span className="text-white fw-medium" style={{fontSize: '14px'}}> Transparência Pública</span>
                                </div>
                            </div>
                            <h1 className="display-4 fw-bold text-white mb-4" style={{lineHeight: '1.2'}}>
                                Conselhos <span style={{color: '#FFD700'}}>Públicos</span>
                            </h1>
                            <p className="lead text-white mb-4" style={{opacity: 0.9, fontSize: '1.25rem'}}>
                                Transparência e participação social através dos conselhos e seus conselheiros
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="d-flex align-items-center text-white">
                                    <div className="rounded-circle me-2 d-flex align-items-center justify-content-center" style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255,255,255,0.2)'
                                    }}>
                                        <i className="fas fa-eye" style={{fontSize: '16px'}}></i>
                                    </div>
                                    <span style={{fontSize: '14px'}}> &nbsp;Transparência</span>&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <div className="rounded-circle me-2 d-flex align-items-center justify-content-center" style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255,255,255,0.2)'
                                    }}>
                                        <i className="fas fa-handshake" style={{fontSize: '16px'}}></i>
                                    </div>
                                    <span style={{fontSize: '14px'}}> &nbsp;Participação</span>&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <div className="rounded-circle me-2 d-flex align-items-center justify-content-center" style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255,255,255,0.2)'
                                    }}>
                                        <i className="fas fa-balance-scale" style={{fontSize: '16px'}}></i>
                                    </div>
                                    <span style={{fontSize: '14px'}}> &nbsp;Controle Social</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="position-relative">
                                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{
                                    width: '200px',
                                    height: '200px',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(255,255,255,0.2)'
                                }}>
                                    <i className="fas fa-users text-white" style={{fontSize: '80px', opacity: 0.8}}></i>
                                </div>
                                <div className="position-absolute" style={{
                                    top: '20px',
                                    right: '20px',
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(255,215,0,0.3)',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderStats() {
        const { stats } = this.state;
        const statsData = [
            {
                icon: 'fas fa-landmark',
                value: stats.totalConselhos,
                label: 'Conselhos',
                color: '#667eea',
                bgColor: 'rgba(102, 126, 234, 0.1)'
            },
            {
                icon: 'fas fa-users',
                value: stats.totalConselheiros,
                label: 'Conselheiros',
                color: '#764ba2',
                bgColor: 'rgba(118, 75, 162, 0.1)'
            },
            {
                icon: 'fas fa-check-circle',
                value: stats.conselheirosAtivos,
                label: 'Ativos',
                color: '#10b981',
                bgColor: 'rgba(16, 185, 129, 0.1)'
            },
            {
                icon: 'fas fa-university',
                value: stats.conselheirosGovernamentais,
                label: 'Governamentais',
                color: '#f59e0b',
                bgColor: 'rgba(245, 158, 11, 0.1)'
            }
        ];

        return (
            <div className="position-relative" style={{
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                marginTop: '-60px',
                paddingTop: '80px',
                paddingBottom: '40px'
            }}>
                <div className="container">
                    <div className="row g-4">
                        {statsData.map((stat, index) => (
                            <div key={index} className="col-md-6 col-lg-3 card-animate">
                                <div className="stats-card position-relative overflow-hidden rounded-3 p-4 h-100" style={{
                                    background: 'white',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}>
                                    <div className="position-absolute" style={{
                                        top: '-20px',
                                        right: '-20px',
                                        width: '80px',
                                        height: '80px',
                                        background: stat.bgColor,
                                        borderRadius: '50%',
                                        opacity: 0.6
                                    }}></div>

                                    <div className="position-relative">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="rounded-3 d-flex align-items-center justify-content-center" style={{
                                                width: '56px',
                                                height: '56px',
                                                background: stat.bgColor,
                                                border: `2px solid ${stat.color}20`
                                            }}>
                                                <i className={stat.icon} style={{color: stat.color, fontSize: '24px'}}></i>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-bold" style={{fontSize: '2rem', color: stat.color, lineHeight: '1'}}>
                                                    {stat.value.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-dark mb-1" style={{fontSize: '14px'}}>
                                                {stat.label}
                                            </h6>
                                            <div className="progress" style={{height: '4px', background: '#f1f5f9'}}>
                                                <div className="progress-bar" style={{
                                                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                                                    width: '75%'
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    renderFilters() {
        return (
            <div className="position-sticky" style={{
                top: '0',
                zIndex: 100,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.08)'
            }}>
                <div className="container py-4">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label fw-bold text-dark mb-2" style={{fontSize: '13px'}}>Buscar</label>
                            <div className="position-relative">
                                {/*<div className="position-absolute start-0 top-50 translate-middle-y ps-3" style={{zIndex: 5}}>
                                    <i className="fas fa-search text-muted" style={{fontSize: '14px'}}></i>
                                </div>*/}
                                <input
                                    type="text"
                                    className="form-control ps-5 rounded-3 border-0"
                                    placeholder="Nome ou órgão..."
                                    value={this.state.filters.search}
                                    onChange={(e) => this.handleFilterChange('search', e.target.value)}
                                    style={{
                                        background: '#f8fafc',
                                        border: '2px solid transparent',
                                        fontSize: '14px',
                                        height: '48px',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>
                        {/*<div className="col-md-2">
                            <label className="form-label fw-bold text-dark mb-2" style={{fontSize: '13px'}}>Conselho</label>
                            <select
                                className="form-select rounded-3 border-0"
                                value={this.state.filters.conselho}
                                onChange={(e) => this.handleFilterChange('conselho', e.target.value)}
                                style={{
                                    background: '#f8fafc',
                                    fontSize: '14px',
                                    height: '48px'
                                }}
                            >
                                <option value="">Todos</option>
                                {this.state.conselhos.map(conselho =>
                                    <option key={conselho.id_conselho} value={conselho.id_conselho}>
                                        {conselho.tx_nome_conselho}
                                    </option>
                                )}
                            </select>
                        </div>*/}
                        <div className="col-md-2">
                            <label className="form-label fw-bold text-dark mb-2" style={{fontSize: '13px'}}>Status</label><br/>
                            <select
                                className="form-select rounded-3 border-0"
                                value={this.state.filters.ativo}
                                onChange={(e) => this.handleFilterChange('ativo', e.target.value)}
                                style={{
                                    background: '#f8fafc',
                                    fontSize: '14px',
                                    height: '48px'
                                }}
                            >
                                <option value="">Todos</option>
                                <option value="true">Ativos</option>
                                <option value="false">Inativos</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label fw-bold text-dark mb-2" style={{fontSize: '13px'}}>Tipo</label>
                            <select
                                className="form-select rounded-3 border-0"
                                value={this.state.filters.governamental}
                                onChange={(e) => this.handleFilterChange('governamental', e.target.value)}
                                style={{
                                    background: '#f8fafc',
                                    fontSize: '14px',
                                    height: '48px'
                                }}
                            >
                                <option value="">Todos</option>
                                <option value="true">Governamental</option>
                                <option value="false">Não Governamental</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-bold text-dark mb-2" style={{fontSize: '13px'}}>Visualização</label>
                            <div className="btn-group w-100 rounded-3 overflow-hidden" role="group" style={{
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                border: '1px solid #e2e8f0'
                            }}>
                                <button
                                    type="button"
                                    className={`btn ${this.state.viewMode === 'cards' ? 'text-white' : 'text-dark'} fw-medium`}
                                    onClick={() => this.setState({viewMode: 'cards'})}
                                    style={{
                                        background: this.state.viewMode === 'cards' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#ffffff',
                                        border: 'none',
                                        fontSize: '13px',
                                        height: '48px'
                                    }}
                                >
                                    <i className="fas fa-th me-2"></i> Cards
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${this.state.viewMode === 'list' ? 'text-white' : 'text-dark'} fw-medium`}
                                    onClick={() => this.setState({viewMode: 'list'})}
                                    style={{
                                        background: this.state.viewMode === 'list' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#ffffff',
                                        border: 'none',
                                        fontSize: '13px',
                                        height: '48px'
                                    }}
                                >
                                    <i className="fas fa-list me-2"></i> Lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCards() {
        const { filteredData, documentos } = this.state;

        return (
            <div className="row g-4">
                {filteredData.map((conselho, index) => {
                    const conselhoDocumentos = documentos[conselho.id_conselho] || [];
                    const hasDocuments = conselhoDocumentos.length > 0;
                    const hasWebsite = conselho.tx_website;
                    const isActive = conselho.bo_conselho_ativo;
                    const activeCount = conselho.conselheiros.filter(c => c.bo_conselheiro_ativo).length;
                    const govCount = conselho.conselheiros.filter(c => c.bo_eh_governamental).length;

                    return (
                        <div key={`conselho-${conselho.id_conselho}-${index}`} className="col-lg-6 col-xl-4 mb-3">
                            <div className="card border-0 h-100" style={{
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                borderRadius: '20px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                            }}>

                                {/* Subtle accent line */}
                                <div className="position-absolute top-0 start-0 w-100" style={{
                                    height: '4px',
                                    background: isActive ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #e5e7eb, #d1d5db)'
                                }}></div>

                                {/* Header */}
                                <div className="p-4 pb-3">
                                    <h6 className="fw-bold mb-2 text-dark" style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '1.3'
                                    }}>
                                        {conselho.tx_nome_conselho || 'Sem nome'}
                                    </h6>
                                    <div className="d-flex align-items-center gap-3 text-muted" style={{fontSize: '0.85rem'}}>
                                        <span><i className="fas fa-users me-1"></i> {conselho.conselheiros.length} membros &nbsp;&nbsp;</span>
                                        <span><i className="fas fa-check-circle me-1"></i> {activeCount} ativos</span>
                                    </div>
                                </div>

                                {/* Avatars */}
                                {conselho.conselheiros.length > 0 && (
                                    <div className="px-4 pb-3">
                                        <div className="d-flex align-items-center gap-1">
                                            {conselho.conselheiros.slice(0, 10).map((conselheiro, idx) => (
                                                <div key={idx} className="rounded-circle d-flex align-items-center justify-content-center" style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    background: conselheiro.bo_conselheiro_ativo ? '#28a745' : '#6c757d',
                                                    color: 'white',
                                                    fontSize: '11px',
                                                    fontWeight: '600'
                                                }}>
                                                    {conselheiro.tx_nome_conselheiro ? conselheiro.tx_nome_conselheiro.charAt(0).toUpperCase() : '?'}
                                                </div>
                                            ))}
                                            {conselho.conselheiros.length > 10 && (
                                                <div className="rounded-circle d-flex align-items-center justify-content-center ms-1" style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    background: '#e9ecef',
                                                    color: '#6c757d',
                                                    fontSize: '10px',
                                                    fontWeight: '600'
                                                }}>
                                                    +{conselho.conselheiros.length - 10}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="px-4 pb-3">
                                    <div className="d-flex gap-3 justify-content-between">
                                        <div className="text-center">
                                            <div className="fw-bold text-primary" style={{fontSize: '1.1rem'}}>{govCount}</div>
                                            <small className="text-muted">Governamental</small>
                                        </div>
                                        <div className="text-center">
                                            <div className="fw-bold text-warning" style={{fontSize: '1.1rem'}}>{conselho.conselheiros.length - govCount}</div>
                                            <small className="text-muted">Sociedade Civil</small>
                                        </div>
                                        <div className="text-center">
                                            <div className="fw-bold text-info" style={{fontSize: '1.1rem'}}>{conselhoDocumentos.length}</div>
                                            <small className="text-muted">Documentos</small>
                                        </div>
                                    </div>
                                </div>



                                {/* Footer */}
                                <div className="px-4 pb-4">
                                    <button
                                        className="btn btn-outline-primary btn-sm w-100"
                                        onClick={() => this.showConselheirosModal(conselho)}
                                    >
                                        <i className="fas fa-users me-2"></i>&nbsp;
                                        Ver detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderList() {
        return (
            <div className="list-view">
                {this.state.filteredData.map((conselho, index) => {
                    const conselhoDocumentos = this.state.documentos[conselho.id_conselho] || [];
                    const activeCount = conselho.conselheiros.filter(c => c.bo_conselheiro_ativo).length;
                    const govCount = conselho.conselheiros.filter(c => c.bo_eh_governamental).length;

                    return (
                        <div key={`list-${conselho.id_conselho}-${index}`} className="card mb-3 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center flex-grow-1">
                                        {/*<div className="me-4">
                                            <div className="rounded-3 d-flex align-items-center justify-content-center" style={{
                                                width: '48px',
                                                height: '48px',
                                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                color: 'white'
                                            }}>
                                                <i className="fas fa-landmark" style={{fontSize: '18px'}}></i>
                                            </div>
                                        </div>*/}
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-2 text-dark">{conselho.tx_nome_conselho}</h6>
                                            <div className="d-flex align-items-center gap-4 mb-2">
                                                <span className="text-muted" style={{fontSize: '0.85rem'}}>
                                                    <i className="fas fa-users me-1"></i> {conselho.conselheiros.length} membros &nbsp;&nbsp;&nbsp;
                                                </span>
                                                <span className="text-muted" style={{fontSize: '0.85rem'}}>
                                                    <i className="fas fa-check-circle me-1"></i> {activeCount} ativos
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                {conselho.conselheiros.slice(0, 12).map((conselheiro, idx) => (
                                                    <div key={idx} className="rounded-circle d-flex align-items-center justify-content-center" style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        background: conselheiro.bo_conselheiro_ativo ? '#28a745' : '#6c757d',
                                                        color: 'white',
                                                        fontSize: '10px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {conselheiro.tx_nome_conselheiro ? conselheiro.tx_nome_conselheiro.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                ))}
                                                {conselho.conselheiros.length > 12 && (
                                                    <div className="rounded-circle d-flex align-items-center justify-content-center ms-1" style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        background: '#e9ecef',
                                                        color: '#6c757d',
                                                        fontSize: '9px',
                                                        fontWeight: '600'
                                                    }}>
                                                        +{conselho.conselheiros.length - 12}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4 justify-content-between">
                                        <div className="d-flex gap-3">
                                            <div className="text-center m-2">
                                                <div className="fw-bold text-primary">{govCount}</div>
                                                <small className="text-muted">Gov</small>
                                            </div>
                                            <div className="text-center m-2">
                                                <div className="fw-bold text-warning">{conselho.conselheiros.length - govCount}</div>
                                                <small className="text-muted">Civil</small>
                                            </div>
                                            <div className="text-center m-2">
                                                <div className="fw-bold text-info">{conselhoDocumentos.length}</div>
                                                <small className="text-muted">Docs</small>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => this.showConselheirosModal(conselho)}
                                        >
                                            <i className="fas fa-users me-2"></i>
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderConselheirosModal() {
        const { selectedConselho, showConselheirosModal } = this.state;

        if (!showConselheirosModal || !selectedConselho) return null;

        const activeCount = selectedConselho.conselheiros.filter(c => c.bo_conselheiro_ativo).length;
        const govCount = selectedConselho.conselheiros.filter(c => c.bo_eh_governamental).length;

        return (
            <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={this.closeConselheirosModal}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content border-0" style={{borderRadius: '16px', overflow: 'hidden'}}>
                        {/* Header */}
                        <div className="p-4 pb-3" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="text-white fw-bold mb-2">{selectedConselho.tx_nome_conselho}</h5>
                                    <div className="d-flex align-items-center gap-3 text-white" style={{fontSize: '0.85rem', opacity: 0.9}}>
                                        <span><i className="fas fa-users me-1"></i> {selectedConselho.conselheiros.length} membros&nbsp;&nbsp;&nbsp;</span>
                                        <span><i className="fas fa-check-circle me-1"></i> {activeCount} ativos</span>
                                    </div>
                                </div>
                                <a type="button" className="" style={{color: 'white', fontSize: '1.5rem', cursor: 'pointer'}} onClick={this.closeConselheirosModal}>X</a>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="px-4 py-3" style={{background: '#f8fafc'}}>
                            <div className="d-flex gap-4 justify-content-around">
                                <div className="text-center">
                                    <div className="fw-bold text-primary" style={{fontSize: '1.2rem'}}>{govCount}</div>
                                    <small className="text-muted">Governamental</small>
                                </div>
                                <div className="text-center">
                                    <div className="fw-bold text-warning" style={{fontSize: '1.2rem'}}>{selectedConselho.conselheiros.length - govCount}</div>
                                    <small className="text-muted">Sociedade Civil</small>
                                </div>
                                <div className="text-center">
                                    <div className="fw-bold text-success" style={{fontSize: '1.2rem'}}>{activeCount}</div>
                                    <small className="text-muted">Ativos</small>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="modal-body p-0" style={{maxHeight: '400px', overflowY: 'auto'}}>
                            {selectedConselho.conselheiros.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                                    <h6 className="text-muted">Nenhum conselheiro cadastrado</h6>
                                </div>
                            ) : (
                                <div className="p-3">
                                    {selectedConselho.conselheiros.map((conselheiro, index) => (
                                        <div key={conselheiro.id_conselheiro} className="d-flex align-items-center p-2 mb-2 rounded-3" style={{background: '#f8fafc'}}>
                                            <div className="me-3">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    background: conselheiro.bo_conselheiro_ativo ? '#28a745' : '#6c757d',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    marginRight: '15px'
                                                }}>
                                                    {conselheiro.tx_nome_conselheiro ? conselheiro.tx_nome_conselheiro.charAt(0).toUpperCase() : '?'}
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="fw-medium text-dark mb-1" style={{fontSize: '14px'}}>
                                                    {conselheiro.tx_nome_conselheiro || 'Sem nome'}
                                                </div>
                                                {conselheiro.tx_orgao_origem && (
                                                    <div className="text-muted mb-2 " style={{fontSize: '12px', marginTop: -10}}>{conselheiro.tx_orgao_origem}</div>
                                                )}
                                            </div>
                                            <div className="d-flex gap-2">
                                                <span className={`badge p-2 ${conselheiro.bo_conselheiro_ativo ? 'bg-success' : 'bg-secondary'}`} style={{fontSize: '12px', color: '#FFFFFF', marginRight: 10}}>
                                                    {conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'}
                                                </span>
                                                <span className={`badge p-2 ${conselheiro.bo_eh_governamental ? 'bg-primary' : 'bg-warning'}`} style={{fontSize: '12px', color: '#FFFFFF'}}>
                                                    {conselheiro.bo_eh_governamental ? 'Gov' : 'Civil'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                            <div className="p-3">
                                <div><strong>Documentos ({this.state.documentos[selectedConselho.id_conselho].length}):</strong><br/><br/></div>
                                <div>
                                    <div >
                                        {this.state.documentos[selectedConselho.id_conselho].map((doc, index) => (
                                            <div key={index} className="w-100" >
                                                <a href="#" onClick={(e) => { e.preventDefault(); this.openDocument(doc); }} className="cursor" style={{backgroundColor: '#F8F8F8', marginBottom: 5, padding: 7, display: 'block'}}>
                                                    <i className="fas fa-file-alt me-2"></i> &nbsp;
                                                    {doc.tx_titulo_documento}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Footer with download button */}
                        <div className="modal-footer bg-light">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div></div>
                                {/*<small className="text-muted">
                                    <i className="fas fa-info-circle me-1"></i>
                                    {activeCount} ativos de {selectedConselho.conselheiros.length} total
                                </small>*/}
                                <div className="d-flex gap-2">

                                    &nbsp;
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={this.closeConselheirosModal}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="conselhos-publicos">
                    <div className="d-flex align-items-center justify-content-center" style={{
                        minHeight: '100vh',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}>
                        <div className="text-center">
                            <div className="position-relative mb-4">
                                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center glass-morphism loading-pulse" style={{
                                    width: '80px',
                                    height: '80px'
                                }}>
                                    <div className="spinner-border text-white" role="status" style={{width: '2rem', height: '2rem'}}>
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-white fw-bold mb-2">Carregando Conselhos</h5>
                            <p className="text-white" style={{opacity: 0.8, fontSize: '14px'}}>Aguarde enquanto organizamos os dados...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="conselhos-publicos">
                <div className="hero-section">
                    {this.renderHero()}
                </div>
                {this.renderStats()}
                <div className="filters-section">
                    {this.renderFilters()}
                </div>

                <div className="container py-5">
                    {this.state.filteredData.length === 0 ? (
                        <div className="empty-state text-center py-5 animate-fade-in">
                            <div className="empty-icon">
                                <i className="fas fa-search" style={{fontSize: '40px', color: '#94a3b8'}}></i>
                            </div>
                            <h4 className="fw-bold text-dark mb-3">Nenhum conselho encontrado</h4>
                            <p className="text-muted mb-4" style={{fontSize: '16px'}}>Tente ajustar os filtros para encontrar o que procura</p>
                            <button
                                className="btn rounded-pill px-4 py-2"
                                style={{
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '14px'
                                }}
                                onClick={() => this.setState({filters: {search: '', conselho: '', ativo: '', governamental: ''}}, () => this.applyFilters())}
                            >
                                <i className="fas fa-refresh me-2"></i>Limpar Filtros
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h4 className="fw-bold text-dark mb-1">
                                        {this.state.filteredData.length} conselho{this.state.filteredData.length !== 1 ? 's' : ''} encontrado{this.state.filteredData.length !== 1 ? 's' : ''}
                                    </h4>
                                </div>
                            </div>
                            {this.state.viewMode === 'cards' ? this.renderCards() : this.renderList()}
                        </div>
                    )}
                </div>

                {this.renderConselheirosModal()}
            </div>
        );
    }
}

ReactDOM.render(
    <ConselhosPublicos/>,
    document.getElementById('conselhos-publicos')
);
