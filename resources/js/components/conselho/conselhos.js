class Conselhos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselhos: [],
            showModal: false,
            editingConselho: null
        };
    }

    componentDidMount() {
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
                url: getBaseUrl2 + 'representacao_conselho/' + id,
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
                            onClick: () => this.setState({showModal: true, editingConselho: null})
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
                                            onClick: () => this.setState({showModal: true, editingConselho: conselho})
                                        },
                                        'Editar'
                                    ),
                                    React.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-sm btn-danger',
                                            onClick: () => this.deleteConselho(conselho.id_conselho)
                                        },
                                        'Excluir'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(
    <Conselhos/>,
    document.getElementById('conselhos')
);
