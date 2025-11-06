class Conselheiros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselheiros: [],
            filteredConselheiros: [],
            conselhos: [],
            showForm: false,
            editingConselheiro: null,
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
                id_conselho: '',
                cd_tipo_conselheiro: 'Titular'
            },
            search: '',
            oscsSearch: [],
            loadingSearch: false
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

    showHideForm() {
        this.setState({
            showForm: !this.state.showForm,
            editingConselheiro: null,
            form: {
                tx_nome_conselheiro: '',
                tx_orgao_origem: '',
                cd_identificador_osc: '',
                dt_data_vinculo: '',
                dt_data_final_vinculo: '',
                bo_conselheiro_ativo: true,
                bo_eh_governamental: true,
                id_conselho: this.state.filters.conselho || '',
                cd_tipo_conselheiro: 'Titular'
            },
            search: '',
            oscsSearch: []
        });
    }

    editConselheiro(conselheiro) {
        this.setState({
            showForm: true,
            editingConselheiro: conselheiro,
            form: {
                tx_nome_conselheiro: conselheiro.tx_nome_conselheiro || '',
                tx_orgao_origem: conselheiro.tx_orgao_origem || '',
                cd_identificador_osc: conselheiro.cd_identificador_osc || '',
                dt_data_vinculo: conselheiro.dt_data_vinculo ? conselheiro.dt_data_vinculo.split(' ')[0] : '',
                dt_data_final_vinculo: conselheiro.dt_data_final_vinculo ? conselheiro.dt_data_final_vinculo.split(' ')[0] : '',
                bo_conselheiro_ativo: conselheiro.bo_conselheiro_ativo !== undefined ? conselheiro.bo_conselheiro_ativo : true,
                bo_eh_governamental: conselheiro.bo_eh_governamental !== undefined ? conselheiro.bo_eh_governamental : true,
                id_conselho: conselheiro.id_conselho || '',
                cd_tipo_conselheiro: conselheiro.cd_tipo_conselheiro || 'Titular'
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

    handleSearch(e) {
        const val = e.target.value || ' ';
        this.setState({ search: val }, () => this.listSearch(this.state.search));
    }

    clickSearch() {
        this.listSearch(this.state.search || ' ');
    }

    listSearch(search) {
        if (search.length < 4) return;
        this.setState({ loadingSearch: true, oscsSearch: [] });
        let term = search.replace('/', '').normalize('NFD').replace(/[̀-ͯ]/g, '');
        term = term.startsWith('0') ? term.slice(1) : term;
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'busca/osc/' + term,
            cache: false,
            success: (data) => this.setState({ oscsSearch: data, loadingSearch: false }),
            error: (xhr, status, err) => this.setState({ loadingSearch: false })
        });
    }

    selectOsc(osc) {
        this.setState({
            form: {
                ...this.state.form,
                cd_identificador_osc: osc.cd_identificador_osc,
                tx_orgao_origem: osc.tx_nome_osc
            },
            search: '',
            oscsSearch: []
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
                this.showHideForm();
                this.loadConselheiros(this.state.filters.conselho);
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
                    this.loadConselheiros(this.state.filters.conselho);
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
                <br/>
                <h6 className="mb-3">Filtros</h6>
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome ou órgão..."
                            value={this.state.filters.search}
                            onChange={(e) => this.handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    {/*<div className="col-md-3">
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
                    </div>*/}
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

    renderForm() {
        return (
            <div className="bg-lgt box-itens-g min-h mb-4">
                {/*<h3>{this.state.editingConselheiro ? 'Editar Conselheiro' : 'Novo Conselheiro'}</h3>*/}
                <div className="row">
                    <div className="col-md-6" style={{marginBottom:0, paddingBottom: 0}}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.form.tx_nome_conselheiro}
                                onChange={(e) => this.handleInputChange('tx_nome_conselheiro', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6" style={{marginBottom:0, paddingBottom: 0}}>
                        <div className="form-group">
                            <label>Representação</label>
                            <div>
                                <label className="mr-3">
                                    <input
                                        type="radio"
                                        name="bo_eh_governamental"
                                        checked={this.state.form.bo_eh_governamental === true}
                                        onChange={() => this.handleInputChange('bo_eh_governamental', true)}
                                    />
                                    {' '}Governamental
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="bo_eh_governamental"
                                        checked={this.state.form.bo_eh_governamental === false}
                                        onChange={() => this.handleInputChange('bo_eh_governamental', false)}
                                    />
                                    {' '}Não governamental
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" style={{margin: '0', padding: '0 12px'}}>
                        <div className="form-group">
                            <label>{this.state.form.bo_eh_governamental ? 'Órgão Governamental' : 'OSCs ao que está vinculado'} </label>
                            {!this.state.form.bo_eh_governamental ? (
                                <div>
                                    <input
                                        className="form-control"
                                        placeholder="Digite o CNPJ ou nome..."
                                        onClick={this.clickSearch.bind(this)}
                                        onChange={this.handleSearch.bind(this)}
                                        value={this.state.search}
                                    />
                                    <ul className="box-search-itens" style={{display: this.state.search ? '' : 'none'}}>
                                        <div className="text-center">
                                            <img src="/img/load.gif" width="60" style={{display: this.state.loadingSearch ? '' : 'none'}}/>
                                        </div>
                                        {this.state.oscsSearch.map(item =>
                                            <li key={item.id_osc} className="list-group-item" onClick={() => this.selectOsc(item)}>
                                                {item.tx_nome_osc}
                                            </li>
                                        )}
                                    </ul>
                                    {this.state.form.tx_orgao_origem && (
                                        <small className="text-muted">CNPJ: {this.state.form.cd_identificador_osc} - {this.state.form.tx_orgao_origem}</small>
                                    )}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_orgao_origem}
                                    onChange={(e) => this.handleInputChange('tx_orgao_origem', e.target.value)}
                                    placeholder="Digite o nome do órgão..."
                                />
                            )}
                        </div>
                    </div>
                    {!this.state.filters.conselho && (
                        <div className="col-md-12">
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
                        </div>
                    )}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Início do vínculo como conselheiro</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.form.dt_data_vinculo}
                                onChange={(e) => this.handleInputChange('dt_data_vinculo', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <label>Final do vínculo com conselheiro</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.form.dt_data_final_vinculo}
                                onChange={(e) => this.handleInputChange('dt_data_final_vinculo', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6" style={{margin: '0', padding: '0 10px 0 20px'}}>
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={this.state.form.bo_conselheiro_ativo}
                                    onChange={(e) => this.handleInputChange('bo_conselheiro_ativo', e.target.checked)}
                                    style={{width: 20, height: 20}}
                                />
                                <label className="form-check-label">Conselheiro Ativo</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{marginBottom:0, paddingBottom: 0}}>
                        <div className="form-group">
                            <label>Tipo</label>
                            <div>
                                <label className="mr-3">
                                    <input
                                        type="radio"
                                        name="cd_tipo_conselheiro"
                                        checked={this.state.form.cd_tipo_conselheiro === 1}
                                        onChange={() => this.handleInputChange('cd_tipo_conselheiro', 1)}
                                    />
                                    {' '}Titular
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="cd_tipo_conselheiro"
                                        checked={this.state.form.cd_tipo_conselheiro === 2}
                                        onChange={() => this.handleInputChange('cd_tipo_conselheiro', 2)}
                                    />
                                    {' '}Suplente
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button type="button" className="btn btn-secondary mr-2" onClick={() => this.showHideForm()}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.saveConselheiro()}>
                            Salvar
                        </button>
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
                <div className="bg-white border-bottom ">
                    <div className="d-flex justify-content-between align-items-center">

                        <div className="title-user-area">
                            <h3><i className="fas fa-users"/> Meus conselheiros</h3>
                            <p>Nessa área você pode gerenciar seus conselheiros</p>
                        </div>

                        <div>
                            <a className="btn-add" onClick={() => this.showHideForm()} style={{display: this.state.showForm ? "none" : "block", position: 'relative' ,bottom: -50}}>
                                <i className="fas fa-2x fa-plus-circle"/>
                            </a>
                            <a className="btn-add btn-add-warning" onClick={() => this.showHideForm()} style={{display: this.state.showForm ? "block" : "none", position: 'relative' ,bottom: -50}}>
                                <i className="fas fa-2x fa-times-circle"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                        <div style={{display: this.state.showForm ? 'block' : 'none'}}>
                            {this.renderForm()}
                        </div>
                        {this.renderFilters()}
                        <br/>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Órgão</th>
                                        <th>Conselho</th>
                                        {/*<th>Ativo</th>*/}
                                        {/*<th>Governamental</th>*/}
                                        <th width={150}>Ações</th>
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
                                                {/*<td>{conselheiro.bo_conselheiro_ativo ? 'Sim' : 'Não'}</td>*/}
                                                {/*<td>{conselheiro.bo_eh_governamental ? 'Sim' : 'Não'}</td>*/}
                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-warning mr-1"
                                                        onClick={() => this.editConselheiro(conselheiro)}
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

            </div>
        );
    }
}

ReactDOM.render(
    <Conselheiros/>,
    document.getElementById('conselheiros')
);
