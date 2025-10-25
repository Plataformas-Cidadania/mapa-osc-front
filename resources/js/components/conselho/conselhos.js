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
        return React.createElement(
            'div',
            { className: 'modal', style: { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' } },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement('h5', { className: 'modal-title' },
                            this.state.editingConselho ? 'Editar Conselho' : 'Novo Conselho'
                        ),
                        React.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'close',
                                onClick: () => this.closeModal()
                            },
                            '×'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Nome do Conselho'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: this.state.form.tx_nome_conselho,
                                onChange: (e) => this.handleInputChange('tx_nome_conselho', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Ato Legal'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: this.state.form.tx_ato_legal,
                                onChange: (e) => this.handleInputChange('tx_ato_legal', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Website'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: this.state.form.tx_website,
                                onChange: (e) => this.handleInputChange('tx_website', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Nível Federativo'),
                            React.createElement(
                                'select',
                                {
                                    className: 'form-control',
                                    value: this.state.form.cd_nivel_federativo,
                                    onChange: (e) => this.handleInputChange('cd_nivel_federativo', e.target.value ? parseInt(e.target.value) : '')
                                },
                                React.createElement('option', { value: '' }, 'Selecione...'),
                                this.state.nivelFederativo.map(nivel =>
                                    React.createElement('option', {
                                        key: nivel.cd_nivel_federativo,
                                        value: nivel.cd_nivel_federativo
                                    }, nivel.tx_nome_nivel_federativo)
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Tipo de Abrangência'),
                            React.createElement(
                                'select',
                                {
                                    className: 'form-control',
                                    value: this.state.form.cd_tipo_abrangencia,
                                    onChange: (e) => this.handleInputChange('cd_tipo_abrangencia', e.target.value ? parseInt(e.target.value) : '')
                                },
                                React.createElement('option', { value: '' }, 'Selecione...'),
                                this.state.tipoAbrangencia.map(tipo =>
                                    React.createElement('option', {
                                        key: tipo.cd_tipo_abrangencia,
                                        value: tipo.cd_tipo_abrangencia
                                    }, tipo.tx_nome_abrangencia)
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                null,
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: this.state.form.bo_conselho_ativo,
                                    onChange: (e) => this.handleInputChange('bo_conselho_ativo', e.target.checked)
                                }),
                                ' Conselho Ativo'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'btn btn-secondary',
                                onClick: () => this.closeModal()
                            },
                            'Cancelar'
                        ),
                        React.createElement(
                            'button',
                            {
                                type: 'button',
                                className: 'btn btn-primary',
                                onClick: () => this.saveConselho()
                            },
                            'Salvar'
                        )
                    )
                )
            )
        );
    }

    render() {
        if (this.state.loading) {
            return React.createElement('div', { className: 'text-center' }, 'Carregando...');
        }

        if (this.state.conselhos.length === 0) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'd-flex justify-content-between mb-3' },
                    React.createElement('h5', null, 'Meus Conselhos'),
                    React.createElement(
                        'button',
                        {
                            className: 'btn btn-primary',
                            onClick: () => this.openModal()
                        },
                        'Novo Conselho'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'alert alert-info' },
                    'Nenhum conselho encontrado.'
                )
            );
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'd-flex justify-content-between mb-3' },
                React.createElement('h5', null, 'Meus Conselhos'),
                React.createElement(
                    'button',
                    {
                        className: 'btn btn-primary',
                        onClick: () => this.setState({showModal: true, editingConselho: null})
                    },
                    'Novo Conselho'
                )
            ),
            React.createElement(
                'div',
                { className: 'table-responsive' },
                React.createElement(
                    'table',
                    { className: 'table table-striped' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement('th', null, 'ID'),
                            React.createElement('th', null, 'Nome'),
                            React.createElement('th', null, 'Ato Legal'),
                            React.createElement('th', null, 'Website'),
                            React.createElement('th', null, 'Status'),
                            React.createElement('th', null, 'Ações')
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.state.conselhos.map(conselho =>
                            React.createElement(
                                'tr',
                                { key: conselho.id_conselho },
                                React.createElement('td', null, conselho.id_conselho),
                                React.createElement('td', null, conselho.tx_nome_conselho || 'N/A'),
                                React.createElement('td', null, conselho.tx_ato_legal || 'N/A'),
                                React.createElement(
                                    'td',
                                    null,
                                    conselho.tx_website ?
                                        React.createElement(
                                            'a',
                                            {
                                                href: `http://${conselho.tx_website}`,
                                                target: '_blank',
                                                rel: 'noopener noreferrer'
                                            },
                                            conselho.tx_website
                                        ) : 'N/A'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'span',
                                        {
                                            className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`
                                        },
                                        conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo'
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-sm btn-warning mr-2',
                                            onClick: () => this.openModal(conselho)
                                        },
                                        'Editar'
                                    ),
                                    /*React.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-sm btn-danger',
                                            onClick: () => this.deleteConselho(conselho.id_conselho)
                                        },
                                        'Excluir'
                                    )*/
                                )
                            )
                        )
                    )
                ),
                this.state.showModal ? this.renderModal() : null
            )
        );
    }
}

ReactDOM.render(
    <Conselhos/>,
    document.getElementById('conselhos')
);
