class Conselheiros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselheiros: [],
            conselhos: [],
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
        };
    }

    componentDidMount() {
        this.loadConselheiros();
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

    loadConselheiros() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'confocos/conselheiro',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({
                    loading: false,
                    conselheiros: data || []
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
                            this.state.editingConselheiro ? 'Editar Conselheiro' : 'Novo Conselheiro'
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
                            React.createElement('label', null, 'Nome'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: this.state.form.tx_nome_conselheiro,
                                onChange: (e) => this.handleInputChange('tx_nome_conselheiro', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Órgão de Origem'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: this.state.form.tx_orgao_origem,
                                onChange: (e) => this.handleInputChange('tx_orgao_origem', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Conselho'),
                            React.createElement('select', {
                                className: 'form-control',
                                value: this.state.form.id_conselho,
                                onChange: (e) => this.handleInputChange('id_conselho', e.target.value)
                            },
                                React.createElement('option', { value: '' }, 'Selecione um conselho'),
                                this.state.conselhos.map(conselho =>
                                    React.createElement('option', {
                                        key: conselho.id_conselho,
                                        value: conselho.id_conselho
                                    }, conselho.tx_nome_conselho)
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Data de Vínculo'),
                            React.createElement('input', {
                                type: 'date',
                                className: 'form-control',
                                value: this.state.form.dt_data_vinculo,
                                onChange: (e) => this.handleInputChange('dt_data_vinculo', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement('label', null, 'Data Final de Vínculo'),
                            React.createElement('input', {
                                type: 'date',
                                className: 'form-control',
                                value: this.state.form.dt_data_final_vinculo,
                                onChange: (e) => this.handleInputChange('dt_data_final_vinculo', e.target.value)
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'form-check' },
                                React.createElement('input', {
                                    type: 'checkbox',
                                    className: 'form-check-input',
                                    checked: this.state.form.bo_conselheiro_ativo,
                                    onChange: (e) => this.handleInputChange('bo_conselheiro_ativo', e.target.checked)
                                }),
                                React.createElement('label', { className: 'form-check-label' }, 'Conselheiro Ativo')
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'form-check' },
                                React.createElement('input', {
                                    type: 'checkbox',
                                    className: 'form-check-input',
                                    checked: this.state.form.bo_eh_governamental,
                                    onChange: (e) => this.handleInputChange('bo_eh_governamental', e.target.checked)
                                }),
                                React.createElement('label', { className: 'form-check-label' }, 'É Governamental')
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
                                onClick: () => this.saveConselheiro()
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

        return React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-12' },
                    React.createElement(
                        'div',
                        { className: 'card' },
                        React.createElement(
                            'div',
                            { className: 'card-header d-flex justify-content-between align-items-center' },
                            React.createElement('h5', { className: 'mb-0' }, 'Conselheiros'),
                            React.createElement(
                                'button',
                                {
                                    className: 'btn btn-primary',
                                    onClick: () => this.openModal()
                                },
                                'Novo Conselheiro'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'card-body' },
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
                                            React.createElement('th', null, 'Nome'),
                                            React.createElement('th', null, 'Órgão'),
                                            React.createElement('th', null, 'Conselho'),
                                            React.createElement('th', null, 'Ativo'),
                                            React.createElement('th', null, 'Governamental'),
                                            React.createElement('th', null, 'Ações')
                                        )
                                    ),
                                    React.createElement(
                                        'tbody',
                                        null,
                                        this.state.conselheiros.map(conselheiro => {
                                            const conselho = this.state.conselhos.find(c => c.id_conselho === conselheiro.id_conselho);
                                            return React.createElement(
                                                'tr',
                                                { key: conselheiro.id_conselheiro },
                                                React.createElement('td', null, conselheiro.tx_nome_conselheiro),
                                                React.createElement('td', null, conselheiro.tx_orgao_origem),
                                                React.createElement('td', null, conselho ? conselho.tx_nome_conselho : '-'),
                                                React.createElement('td', null, conselheiro.bo_conselheiro_ativo ? 'Sim' : 'Não'),
                                                React.createElement('td', null, conselheiro.bo_eh_governamental ? 'Sim' : 'Não'),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'button',
                                                        {
                                                            className: 'btn btn-sm btn-outline-primary me-2',
                                                            onClick: () => this.openModal(conselheiro)
                                                        },
                                                        'Editar'
                                                    ),
                                                    React.createElement(
                                                        'button',
                                                        {
                                                            className: 'btn btn-sm btn-outline-danger',
                                                            onClick: () => this.deleteConselheiro(conselheiro.id_conselheiro)
                                                        },
                                                        'Excluir'
                                                    )
                                                )
                                            );
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            this.state.showModal && this.renderModal()
        );
    }
}

ReactDOM.render(
    <Conselheiros/>,
    document.getElementById('conselheiros')
);
