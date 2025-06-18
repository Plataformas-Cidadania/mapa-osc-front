class Representacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cnpj: '',
            buttonEnabled: false,
            loading: false,
            showMsg: false,
            msg: '',
            results: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchRepresentacoes = this.searchRepresentacoes.bind(this);
    }

    handleInputChange(event) {
        // Remove everything except digits
        const raw = event.target.value.replace(/\D/g, '');
        this.setState({
            cnpj: raw,
            buttonEnabled: raw.length > 0,
            showMsg: false,
            msg: ''
        });
    }

    searchRepresentacoes(e) {
        e.preventDefault();
        const { cnpj } = this.state;
        if (!cnpj) return;

        this.setState({ loading: true, buttonEnabled: false, showMsg: false, msg: '' });

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + `representantes/buscar-representacoes/${cnpj}`,
            cache: false,
            success: function(data) {
                this.setState({
                    results: data,
                    loading: false,
                    buttonEnabled: true
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err);
                this.setState({
                    msg: 'Erro ao buscar representações. Tente novamente.',
                    showMsg: true,
                    loading: false,
                    buttonEnabled: true
                });
            }.bind(this)
        });
    }

    render() {
        const { cnpj, buttonEnabled, loading, showMsg, msg, results } = this.state;

        return (
            <div>
                <div className="bg-lgt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <header>
                                    <br />
                                    <h1>Buscar representações</h1>
                                    <h5><a href="/">Home</a></h5>
                                    <br />
                                </header>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-8">
                            <form onSubmit={this.searchRepresentacoes}>
                                <br /><br />
                                <h3>Digite o CNPJ para buscar representantes da OSC</h3>
                                <br />

                                <div className="form-group">
                                    <label htmlFor="cnpj">CNPJ*</label>
                                    <input
                                        type="text"
                                        name="cnpj"
                                        value={cnpj}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                        placeholder="Apenas números"
                                    />
                                </div>

                                {showMsg && <div className="text-danger mb-2">{msg}</div>}
                                {loading && <div><i className="fa fa-spinner fa-spin" /> Processando...</div>}

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!buttonEnabled || loading}
                                >
                                    Pesquisar
                                </button>
                            </form>

                            {results.length > 0 && (
                                <div className="mt-4">
                                    <h4>Resultados</h4>
                                    <ul className="list-group">
                                        {results.map(item => (
                                            <li key={item.id_usuario} className="list-group-item" style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <strong>{item.tx_nome_usuario}</strong> {item.tx_email_usuario}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        );
    }
}

ReactDOM.render(
    <Representacoes  email={email}/>,
    document.getElementById('representacoes')
);
