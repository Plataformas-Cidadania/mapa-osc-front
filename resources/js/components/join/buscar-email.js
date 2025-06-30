class BuscarEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: '',
            buttonEnabled: false,
            loading: false,
            showMsg: false,
            msg: '',
            results: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchBuscarEmail = this.searchBuscarEmail.bind(this);
    }

    handleInputChange(event) {
        // Remove everything except digits
        const raw = event.target.value.replace(/\D/g, '');
        this.setState({
            cpf: raw,
            buttonEnabled: raw.length > 0,
            showMsg: false,
            msg: ''
        });
    }

    searchBuscarEmail(e) {
        e.preventDefault();
        const { cpf } = this.state;
        if (!cpf) return;

        this.setState({ loading: true, buttonEnabled: false, showMsg: false, msg: '' });

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + `user/buscar-email/${cpf}`,
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
                    msg: 'Erro ao buscar e-mail. Tente novamente.',
                    showMsg: true,
                    loading: false,
                    buttonEnabled: true
                });
            }.bind(this)
        });
    }

    render() {
        const { cpf, buttonEnabled, loading, showMsg, msg, results } = this.state;

        console.log('------->', results.id_usuario)

        return (
            <div>
                <div className="bg-lgt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <header>
                                    <br />
                                    <h1>Buscar e-mail</h1>
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
                            <form onSubmit={this.searchBuscarEmail}>
                                <br /><br />
                                <h3>Digite o CPF para buscar o e-mail do representante</h3>
                                <br />

                                <div className="form-group">
                                    <label htmlFor="cpf">CPF*</label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={cpf}
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

                            {results.id_usuario !== undefined &&
                                <div className="mt-4">
                                    <h4>Resultados</h4>
                                    <ul className="list-group">
                                        <li key={results.id_usuario} className="list-group-item" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <strong>{results.tx_nome_usuario}</strong> {results.tx_email_usuario}
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        );
    }
}

ReactDOM.render(
    <BuscarEmail  email={email}/>,
    document.getElementById('buscar-email')
);
