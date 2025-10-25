class Conselhos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselhos: [],
            showModal: false,
            editingConselho: null,
            form: {
                tx_nome_conselho: '',
                tx_ato_legal: '',
                tx_website: '',
                bo_conselho_ativo: true,
                cd_nivel_federativo: '',
                cd_tipo_abrangencia: ''
            },
            nivelFederativo: [],
            tipoAbrangencia: []
        };
    }

    componentDidMount() {
        this.loadConselhos();
        this.loadNivelFederativo();
        this.loadTipoAbrangencia();
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

    loadTipoAbrangencia() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/abrangencia_conselho',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({ tipoAbrangencia: data || [] });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar tipos de abrangência:', err);
            }.bind(this)
        });
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

    handleInputChange(field, value) {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value
            }
        });
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

    renderModal() {
        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.state.editingConselho ? 'Editar Conselho' : 'Novo Conselho'}
                            </h5>
                            <button type="button" className="close" onClick={() => this.closeModal()}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Nome do Conselho</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.form.tx_nome_conselho}
                                    onChange={(e) => this.handleInputChange('tx_nome_conselho', e.target.value)}
                                />
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
                            <div className="form-group">
                                <label>Tipo de Abrangência</label>
                                <select
                                    className="form-control"
                                    value={this.state.form.cd_tipo_abrangencia}
                                    onChange={(e) => this.handleInputChange('cd_tipo_abrangencia', e.target.value ? parseInt(e.target.value) : '')}
                                >
                                    <option value="">Selecione...</option>
                                    {this.state.tipoAbrangencia.map(tipo =>
                                        <option key={tipo.cd_tipo_abrangencia} value={tipo.cd_tipo_abrangencia}>
                                            {tipo.tx_nome_abrangencia}
                                        </option>
                                    )}
                                </select>
                            </div>
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
                    <div className="bg-white p-4 text-center py-5">
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
                <div className="bg-white p-4">
                    <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Ato Legal</th>
                                        <th>Website</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.conselhos.map(conselho =>
                                        <tr key={conselho.id_conselho}>
                                            <td>{conselho.id_conselho}</td>
                                            <td>{conselho.tx_nome_conselho || 'N/A'}</td>
                                            <td>{conselho.tx_ato_legal || 'N/A'}</td>
                                            <td>
                                                {conselho.tx_website ?
                                                    <a href={`http://${conselho.tx_website}`} target="_blank" rel="noopener noreferrer">
                                                        {conselho.tx_website}
                                                    </a> : 'N/A'
                                                }
                                            </td>
                                            <td>
                                                <span className={`badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`}>
                                                    {conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning mr-2"
                                                    onClick={() => this.openModal(conselho)}
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    </div>
                </div>
                {this.state.showModal && this.renderModal()}
            </div>
        );
    }
}

ReactDOM.render(
    <Conselhos/>,
    document.getElementById('conselhos')
);
