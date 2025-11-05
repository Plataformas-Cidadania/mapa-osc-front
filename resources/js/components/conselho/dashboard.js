class DashboardConselho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stats: {
                totalConselhos: 0,
                totalConselheiros: 0
            },
            representacoes: [],
            showModalAdd: false,
            search: '',
            todosConselhos: [],
            conselhosSearch: [],
            loadingSearch: false,
            nivelFederativo: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.addConselho = this.addConselho.bind(this);
        this.removeRepresentacao = this.removeRepresentacao.bind(this);
        this.loadTodosConselhos = this.loadTodosConselhos.bind(this);
    }

    componentDidMount() {
        this.loadStats();
        this.loadRepresentacoes();
        this.loadNivelFederativo();
    }

    loadStats() {
        this.loadConselhos();
        this.loadConselheiros();
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
                console.log('Conselhos data:', data);
                this.setState({
                    stats: {
                        ...this.state.stats,
                        totalConselhos: Array.isArray(data) ? data.length : 0
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselhos:', err);
            }.bind(this)
        });
    }

    loadConselheiros() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/conselheiro',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                console.log('Conselheiros data:', data);
                this.setState({
                    loading: false,
                    stats: {
                        ...this.state.stats,
                        totalConselheiros: Array.isArray(data) ? data.length : 0
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselheiros:', err);
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    loadRepresentacoes() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/representacao_conselho',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                console.log('Representações conselho:', data);
                this.setState({ representacoes: data || [] });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar representações:', err);
            }.bind(this)
        });
    }

    handleSearch(e) {
        const val = e.target.value.toLowerCase();
        this.setState({ search: val });

        if (val.length >= 2) {
            const filtered = this.state.todosConselhos.filter(conselho =>
                conselho.tx_nome_conselho.toLowerCase().includes(val)
            );
            this.setState({ conselhosSearch: filtered });
        } else {
            this.setState({ conselhosSearch: [] });
        }
    }

    loadTodosConselhos() {
        this.setState({ loadingSearch: true });
        $.ajax({
            method: 'GET',
            url: 'https://mapaosc.ipea.gov.br/api/api/confocos/conselho',
            cache: false,
            success: function(data) {
                console.log('Todos conselhos:', data);
                this.setState({
                    todosConselhos: data || [],
                    loadingSearch: false
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar todos conselhos:', err);
                this.setState({ loadingSearch: false });
            }.bind(this)
        });
    }

    addConselho(id_conselho) {
        $.ajax({
            method: 'POST',
            url: getBaseUrl2 + 'confocos/representacao_conselho',
            data: { id_conselho },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            success: function() {
                this.setState({
                    showModalAdd: false,
                    search: '',
                    conselhosSearch: [],
                    todosConselhos: []
                });
                this.loadRepresentacoes();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao adicionar conselho:', err);
                alert('Erro ao adicionar conselho');
            }.bind(this)
        });
    }

    removeRepresentacao(id) {
        if (confirm('Tem certeza que deseja remover esta representação?')) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'confocos/representacao_conselho/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function() {
                    this.loadRepresentacoes();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error('Erro ao remover representação:', err);
                    alert('Erro ao remover representação');
                }.bind(this)
            });
        }
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

    getNivelFederativoName(codigo) {
        const nivel = this.state.nivelFederativo.find(n => n.cd_nivel_federativo == codigo);
        return nivel ? nivel.tx_nome_nivel_federativo : null;
    }



    render() {
        return (
            <div>
               {/* <div className="row">
                    <div className="col-md-6">
                        <div className="card" style={{border: 0, background: "#F8F8F8", boxShadow: '0 0 3px #FFFFFF'}}>
                            <div className="card-body text-center">
                                <h5>Total de Conselhos</h5>
                                <h2>{this.state.representacoes.length}</h2>
                                <i className="fas fa-users fa-2x"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" style={{border: 0, background: "#F8F8F8", boxShadow: '0 0 3px #FFFFFF'}}>
                            <div className="card-body text-center">
                                <h5>Total de Conselheiros</h5>
                                <h2>{this.state.stats.totalConselheiros}</h2>
                                <i className="fas fa-user-tie fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <br/>
                <div className="title-user-area">
                    <h3><i className="fas fa-users"/> Meus conselheiros</h3>
                    <p>Nessa área você pode gerenciar seus conselheiros</p>
                    <button className="btn btn-primary float-right"
                            onClick={() => { this.setState({showModalAdd: true}); this.loadTodosConselhos(); }}
                            style={{ marginTop: '-80px' }}>
                        <i className="fa fa-plus"/> Adicionar Conselho
                    </button>
                    <hr/><br/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Conselho</th>
                                    <th width="150">N. Federativo</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.representacoes.map((item, index) => (
                                <tr key={item.id_representacao_conselho}>
                                    <th scope="row">{index+1}</th>
                                    <td width="500">{item.conselho?.tx_nome_conselho || 'N/A'}</td>
                                    <td>{this.getNivelFederativoName(item.conselho?.cd_nivel_federativo) || 'N/A'}</td>
                                    <td className="text-right" width="450">
                                        <div className="btn btn-outline-primary">
                                            <a href={`conselheiro?conselho=${item.conselho?.id_conselho}`}>
                                                <i className="fa fa-users"/> Conselheiros
                                            </a>
                                        </div>
                                        &nbsp;
                                        <div className="btn btn-outline-info">
                                            <a href={`arquivos-conselho?conselho=${item.conselho?.id_conselho}`}>
                                                <i className="fas fa-folder-open"/> Arquivos
                                            </a>
                                        </div>
                                        &nbsp;
                                        <div className="btn btn-danger" onClick={() => this.removeRepresentacao(item.conselho?.id_conselho)}>
                                            <a style={{cursor:'pointer'}}>
                                                <i className="fa fa-trash"/>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal adicionar Conselho */}
                {this.state.showModalAdd && (
                    <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Adicione um Conselho</h5>
                                    <button type="button" className="close"
                                            onClick={() => this.setState({showModalAdd: false, search: '', conselhosSearch: [], todosConselhos: []})}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Digite o nome do conselho para filtrar..."
                                        onChange={this.handleSearch}
                                        value={this.state.search}
                                    />

                                    {this.state.loadingSearch && (
                                        <div className="text-center">
                                            <i className="fas fa-spinner fa-spin"/> Carregando conselhos...
                                        </div>
                                    )}

                                    <div style={{maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px'}}>
                                        {(this.state.search ? this.state.conselhosSearch : this.state.todosConselhos).map(item =>
                                            <div key={item.id_conselho}
                                                 className="p-3 border-bottom"
                                                 onClick={() => this.addConselho(item.id_conselho)}
                                                 style={{cursor: 'pointer', backgroundColor: '#f8f9fa'}}>
                                                <strong>{item.tx_nome_conselho}</strong><br/>
                                                <small className="text-muted">
                                                    Ato Legal: {item.tx_ato_legal || 'N/A'} |
                                                    Website: {item.tx_website || 'N/A'}
                                                </small>
                                            </div>
                                        )}

                                        {!this.state.loadingSearch && this.state.todosConselhos.length === 0 && (
                                            <div className="text-center p-3">
                                                <i className="fas fa-info-circle"/> Nenhum conselho encontrado
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(
    <DashboardConselho/>,
    document.getElementById('dashboard-conselho')
);
