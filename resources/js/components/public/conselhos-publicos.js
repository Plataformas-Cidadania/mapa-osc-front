class ConselhosPublicos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselhos: [],
            conselheiros: [],
            filteredData: [],
            filters: {
                search: '',
                conselho: '',
                ativo: ''
            }
        };
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

        this.setState({
            filteredData: organized,
            loading: false
        }, () => {
            this.applyFilters();
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
            filtered = filtered.map(conselho => ({
                ...conselho,
                conselheiros: conselho.conselheiros.filter(c =>
                    c.tx_nome_conselheiro.toLowerCase().includes(this.state.filters.search.toLowerCase()) ||
                    c.tx_orgao_origem.toLowerCase().includes(this.state.filters.search.toLowerCase())
                )
            })).filter(conselho =>
                conselho.tx_nome_conselho.toLowerCase().includes(this.state.filters.search.toLowerCase()) ||
                conselho.conselheiros.length > 0
            );
        }

        if (this.state.filters.conselho) {
            filtered = filtered.filter(conselho => conselho.id_conselho == this.state.filters.conselho);
        }

        if (this.state.filters.ativo !== '') {
            filtered = filtered.map(conselho => ({
                ...conselho,
                conselheiros: conselho.conselheiros.filter(c =>
                    c.bo_conselheiro_ativo == (this.state.filters.ativo === 'true')
                )
            }));
        }

        this.setState({ filteredData: filtered });
    }

    renderFilters() {
        return (
            <div className="bg-white p-4 mb-4 border-bottom">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome ou órgão..."
                            value={this.state.filters.search}
                            onChange={(e) => this.handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={this.state.filters.conselho}
                            onChange={(e) => this.handleFilterChange('conselho', e.target.value)}
                        >
                            <option value="">Todos os conselhos</option>
                            {this.state.conselhos.map(conselho =>
                                <option key={conselho.id_conselho} value={conselho.id_conselho}>
                                    {conselho.tx_nome_conselho}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={this.state.filters.ativo}
                            onChange={(e) => this.handleFilterChange('ativo', e.target.value)}
                        >
                            <option value="">Todos os status</option>
                            <option value="true">Ativos</option>
                            <option value="false">Inativos</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Carregando...</span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="bg-white border-bottom py-3 px-4">
                    <h4 className="mb-0">Conselhos</h4>
                </div>

                {this.renderFilters()}

                <div className="bg-white p-4">
                    {this.state.filteredData.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 className="text-muted">Nenhum conselho encontrado</h5>
                        </div>
                    ) : (
                        this.state.filteredData.map(conselho => (
                            <div key={conselho.id_conselho} className="mb-4">
                                <div className="border-left border-primary pl-3 mb-3">
                                    <h5 className="mb-1">{conselho.tx_nome_conselho}</h5>
                                    <small className="text-muted">
                                        {conselho.conselheiros.length} conselheiro(s)
                                    </small>
                                </div>

                                {conselho.conselheiros.length === 0 ? (
                                    <div className="ml-4 text-muted">
                                        <small>Nenhum conselheiro cadastrado</small>
                                    </div>
                                ) : (
                                    <div className="ml-4">
                                        {conselho.conselheiros.map(conselheiro => (
                                            <div key={conselheiro.id_conselheiro} className="border-bottom py-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>{conselheiro.tx_nome_conselheiro}</strong>
                                                        {conselheiro.tx_orgao_origem && (
                                                            <div className="text-muted small">
                                                                {conselheiro.tx_orgao_origem}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`badge ${conselheiro.bo_conselheiro_ativo ? 'badge-success' : 'badge-secondary'} mr-2`}>
                                                            {conselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                        <span className={`badge ${conselheiro.bo_eh_governamental ? 'badge-primary' : 'badge-light'}`}>
                                                            {conselheiro.bo_eh_governamental ? 'Governamental' : 'Não Governamental'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
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
