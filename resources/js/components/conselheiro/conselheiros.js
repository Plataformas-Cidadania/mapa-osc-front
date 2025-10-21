class Conselheiros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            conselheiros: [],
            showModal: false,
            editingConselheiro: null
        };
    }

    componentDidMount() {
        this.loadConselheiros();
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
                url: getBaseUrl2 + 'conselheiro/' + id,
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

    render() {
        if (this.state.loading) {
            return <div className="text-center"><i className="fas fa-spinner fa-spin"></i> Carregando...</div>;
        }

        return (
            <div>
                <div className="d-flex justify-content-between mb-3">
                    <h5>Conselheiros</h5>
                    <button className="btn btn-primary" onClick={() => this.setState({showModal: true, editingConselheiro: null})}>
                        <i className="fas fa-plus"></i> Novo Conselheiro
                    </button>
                </div>

                {this.state.conselheiros.length === 0 ? (
                    <div className="alert alert-info">
                        <i className="fas fa-info-circle"></i> Nenhum conselheiro encontrado.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.conselheiros.map(conselheiro => (
                                    <tr key={conselheiro.id}>
                                        <td>{conselheiro.id}</td>
                                        <td>{conselheiro.nome || 'N/A'}</td>
                                        <td>{conselheiro.email || 'N/A'}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mr-2"
                                                onClick={() => this.viewConselheiro(conselheiro.id)}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-warning mr-2"
                                                onClick={() => this.setState({showModal: true, editingConselheiro: conselheiro})}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => this.deleteConselheiro(conselheiro.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(
    <Conselheiros/>,
    document.getElementById('conselheiros')
);
