class Conselheiros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselheiros: [],
            filteredConselheiros: [],
            conselhos: [],
            showModal: false,
            showDetailModal: false,
            editingConselheiro: null,
            detailConselheiro: null,
            filters: {
                search: '',
                conselho: '',
                ativo: '',
                governamental: ''
            },
            form: {
                tx_nome_conselheiro: '',
                tx_orgao_origem: '',
                cd_identificador_osc: '',
                dt_data_vinculo: '',
                dt_data_final_vinculo: '',
                bo_conselheiro_ativo: true,
                bo_eh_governamental: true,
                id_conselho: ''
            }
        };
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const id_conselho = urlParams.get('conselho');
        this.setState({ 
            filters: { ...this.state.filters, conselho: id_conselho || '' } 
        });
        this.loadConselheiros(id_conselho);
        this.loadConselhos();
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
                    conselhos: data || []
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselhos:', err);
            }.bind(this)
        });
    }

    openModal(conselheiro = null) {
        if (conselheiro) {
            this.setState({
                showModal: true,
                editingConselheiro: conselheiro,
                form: {
                    tx_nome_conselheiro: conselheiro.tx_nome_conselheiro || '',
                    tx_orgao_origem: conselheiro.tx_orgao_origem || '',
                    cd_identificador_osc: conselheiro.cd_identificador_osc || '',
                    dt_data_vinculo: conselheiro.dt_data_vinculo ? conselheiro.dt_data_vinculo.split(' ')[0] : '',
                    dt_data_final_vinculo: conselheiro.dt_data_final_vinculo ? conselheiro.dt_data_final_vinculo.split(' ')[0] : '',
                    bo_conselheiro_ativo: conselheiro.bo_conselheiro_ativo !== undefined ? conselheiro.bo_conselheiro_ativo : true,
                    bo_eh_governamental: conselheiro.bo_eh_governamental !== undefined ? conselheiro.bo_eh_governamental : true,
                    id_conselho: conselheiro.id_conselho || ''
                }
            });
        } else {
            this.setState({
                showModal: true,
                editingConselheiro: null,
                form: {
                    tx_nome_conselheiro: '',
                    tx_orgao_origem: '',
                    cd_identificador_osc: '',
                    dt_data_vinculo: '',
                    dt_data_final_vinculo: '',
                    bo_conselheiro_ativo: true,
                    bo_eh_governamental: true,
                    id_conselho: ''
                }
            });
        }
    }

    closeModal() {
        this.setState({
            showModal: false,
            editingConselheiro: null,
            form: {
                tx_nome_conselheiro: '',
                tx_orgao_origem: '',
                cd_identificador_osc: '',
                dt_data_vinculo: '',
                dt_data_final_vinculo: '',
                bo_conselheiro_ativo: true,
                bo_eh_governamental: true,
                id_conselho: ''
            }
        });
    }

    openDetailModal(conselheiro) {
        this.setState({
            showDetailModal: true,
            detailConselheiro: conselheiro
        });
    }

    closeDetailModal() {
        this.setState({
            showDetailModal: false,
            detailConselheiro: null
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
        let filtered = this.state.conselheiros;

        if (this.state.filters.search) {
            filtered = filtered.filter(c =>
                c.tx_nome_conselheiro.toLowerCase().includes(this.state.filters.search.toLowerCase()) ||
                c.tx_orgao_origem.toLowerCase().includes(this.state.filters.search.toLowerCase())
            );
        }

        if (this.state.filters.conselho) {
            filtered = filtered.filter(c => c.id_conselho == this.state.filters.conselho);
        }

        if (this.state.filters.ativo !== '') {
            filtered = filtered.filter(c => c.bo_conselheiro_ativo == (this.state.filters.ativo === 'true'));
        }

        if (this.state.filters.governamental !== '') {
            filtered = filtered.filter(c => c.bo_eh_governamental == (this.state.filters.governamental === 'true'));
        }

        this.setState({ filteredConselheiros: filtered });
    }

    handleInputChange(field, value) {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value
            }
        });
    }

    saveConselheiro() {
        const url = this.state.editingConselheiro
            ? getBaseUrl2 + 'confocos/conselheiro/' + this.state.editingConselheiro.id_conselheiro
            : getBaseUrl2 + 'confocos/conselheiro';

        const method = this.state.editingConselheiro ? 'PUT' : 'POST';

        const formData = {
            ...this.state.form,
            dt_data_vinculo: this.state.form.dt_data_vinculo || null,
            dt_data_final_vinculo: this.state.form.dt_data_final_vinculo || null
        };

        $.ajax({
            method: method,
            url: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData),
            success: function() {
                this.closeModal();
                this.loadConselheiros();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao salvar conselheiro:', err);
                alert('Erro ao salvar conselheiro');
            }.bind(this)
        });
    }

    loadConselheiros(id_conselho = null) {
        const url = id_conselho 
            ? getBaseUrl2 + `confocos/conselheiro-por-conselho/${id_conselho}`
            : getBaseUrl2 + 'confocos/conselheiro';
            
        $.ajax({
            method: 'GET',
            url: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({
                    loading: false,
                    conselheiros: data || [],
                    filteredConselheiros: data || []
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    deleteConselheiro(id) {
        if (confirm('Tem certeza que deseja excluir este conselheiro?')) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'confocos/conselheiro/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function() {
                    this.loadConselheiros();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    alert('Erro ao excluir conselheiro');
                }
            });
        }
    }

    renderFilters() {
        return (
            <div className="mb-3">
                <h6 className="mb-3">Filtros</h6>
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome ou órgão..."
                            value={this.state.filters.search}
                            onChange={(e) => this.handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
                    {/*<div className="col-md-3">
                        <select
                            className="form-control"
                            value={this.state.filters.governamental}
                            onChange={(e) => this.handleFilterChange('governamental', e.target.value)}
                        >
                            <option value="">Todos os tipos</option>
                            <option value="true">Governamental</option>
                            <option value="false">Não Governamental</option>
                        </select>
                    </div>*/}
                </div>
            </div>
        );
    }

    renderDetailModal() {
        if (!this.state.detailConselheiro) return null;

        const conselho = this.state.conselhos.find(c => c.id_conselho === this.state.detailConselheiro.id_conselho);

        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detalhes do Conselheiro</h5>
                            <button type="button" className="close" onClick={() => this.closeDetailModal()}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>ID: </strong>{this.state.detailConselheiro.id_conselheiro}
                                </div>
                                <div className="col-md-6">
                                    <strong>Nome: </strong>{this.state.detailConselheiro.tx_nome_conselheiro}
                                </div>
                            </div>
                            <hr/>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Órgão de Origem: </strong>{this.state.detailConselheiro.tx_orgao_origem || 'N/A'}
                                </div>
                                <div className="col-md-6">
                                    <strong>Conselho: </strong>{conselho ? conselho.tx_nome_conselho : 'N/A'}
                                </div>
                            </div>
                            <hr/>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Data de Vínculo: </strong>
                                    {this.state.detailConselheiro.dt_data_vinculo ?
                                        new Date(this.state.detailConselheiro.dt_data_vinculo).toLocaleDateString('pt-BR') : 'N/A'}
                                </div>
                                <div className="col-md-6">
                                    <strong>Data Final de Vínculo: </strong>
                                    {this.state.detailConselheiro.dt_data_final_vinculo ?
                                        new Date(this.state.detailConselheiro.dt_data_final_vinculo).toLocaleDateString('pt-BR') : 'N/A'}
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <strong>Status: </strong>
                                    <span className={this.state.detailConselheiro.bo_conselheiro_ativo ? 'badge badge-success' : 'badge badge-danger'}>
                                        {this.state.detailConselheiro.bo_conselheiro_ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <strong>Tipo: </strong>
                                    <span className={this.state.detailConselheiro.bo_eh_governamental ? 'badge badge-primary' : 'badge badge-secondary'}>
                                        {this.state.detailConselheiro.bo_eh_governamental ? 'Governamental' : 'Não Governamental'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.closeDetailModal()}>
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderModal() {
        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.state.editingConselheiro ? 'Editar Conselheiro' : 'Novo Conselheiro'}
                            </h5>
                            <button type="button" className="close" onClick={() => this.closeModal()}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_nome_conselheiro}
                                    onChange={(e) => this.handleInputChange('tx_nome_conselheiro', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Órgão de Origem</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_orgao_origem}
                                    onChange={(e) => this.handleInputChange('tx_orgao_origem', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Conselho</label>
                                <select
                                    className="form-control"
                                    value={this.state.form.id_conselho}
                                    onChange={(e) => this.handleInputChange('id_conselho', e.target.value)}
                                >
                                    <option value="">Selecione um conselho</option>
                                    {this.state.conselhos.map(conselho =>
                                        <option key={conselho.id_conselho} value={conselho.id_conselho}>
                                            {conselho.tx_nome_conselho}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Data de Vínculo</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.form.dt_data_vinculo}
                                    onChange={(e) => this.handleInputChange('dt_data_vinculo', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Data Final de Vínculo</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.form.dt_data_final_vinculo}
                                    onChange={(e) => this.handleInputChange('dt_data_final_vinculo', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={this.state.form.bo_conselheiro_ativo}
                                        onChange={(e) => this.handleInputChange('bo_conselheiro_ativo', e.target.checked)}
                                    />
                                    <label className="form-check-label">Conselheiro Ativo</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={this.state.form.bo_eh_governamental}
                                        onChange={(e) => this.handleInputChange('bo_eh_governamental', e.target.checked)}
                                    />
                                    <label className="form-check-label">É Governamental</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.saveConselheiro()}>
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

        return (
            <div className="container-fluid">
                <div className="bg-white border-bottom py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Meus conselheiros</h2>
                        <button className="btn btn-primary" onClick={() => this.openModal()}>
                            Novo Conselheiro
                        </button>
                    </div>
                </div>
                <div className="bg-white p-4">
                        {this.renderFilters()}
                        <br/>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Órgão</th>
                                        <th>Conselho</th>
                                        <th>Ativo</th>
                                        <th>Governamental</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredConselheiros.map(conselheiro => {
                                        const conselho = this.state.conselhos.find(c => c.id_conselho === conselheiro.id_conselho);
                                        return (
                                            <tr key={conselheiro.id_conselheiro}>
                                                <td>{conselheiro.tx_nome_conselheiro}</td>
                                                <td>{conselheiro.tx_orgao_origem}</td>
                                                <td>{conselho ? conselho.tx_nome_conselho : '-'}</td>
                                                <td>{conselheiro.bo_conselheiro_ativo ? 'Sim' : 'Não'}</td>
                                                <td>{conselheiro.bo_eh_governamental ? 'Sim' : 'Não'}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-info mr-1"
                                                        onClick={() => this.openDetailModal(conselheiro)}
                                                    >
                                                        Detalhes
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-warning mr-1"
                                                        onClick={() => this.openModal(conselheiro)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => this.deleteConselheiro(conselheiro.id_conselheiro)}
                                                    >
                                                        Excluir
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                </div>
                {this.state.showModal && this.renderModal()}
                {this.state.showDetailModal && this.renderDetailModal()}
            </div>
        );
    }
}

ReactDOM.render(
    <Conselheiros/>,
    document.getElementById('conselheiros')
);
