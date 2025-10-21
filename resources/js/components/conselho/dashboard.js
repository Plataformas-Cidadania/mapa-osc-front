class DashboardConselho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stats: {
                totalConselhos: 0,
                totalConselheiros: 0,
                meusConselhos: 0
            }
        };
    }

    componentDidMount() {
        this.loadStats();
    }

    loadStats() {
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'api/representacao_conselho',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function(data) {
                this.setState({
                    loading: false,
                    stats: {
                        ...this.state.stats,
                        meusConselhos: data.length || 0
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar representações:', status, err.toString());
                this.setState({
                    loading: false,
                    stats: {
                        totalConselhos: 0,
                        totalConselheiros: 0,
                        meusConselhos: 0
                    }
                });
            }.bind(this)
        });
    }

    render() {
        if (this.state.loading) {
            return <div className="text-center"><i className="fas fa-spinner fa-spin"></i> Carregando...</div>;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5>Meus Conselhos</h5>
                                <h2>{this.state.stats.meusConselhos}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5>Total Conselheiros</h5>
                                <h2>{this.state.stats.totalConselheiros}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <h5>Total Conselhos</h5>
                                <h2>{this.state.stats.totalConselhos}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <a href="conselho" className="btn btn-primary btn-block">
                            <i className="fas fa-users"></i> Gerenciar Conselhos
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href="conselheiro" className="btn btn-success btn-block">
                            <i className="fas fa-user-tie"></i> Gerenciar Conselheiros
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <DashboardConselho/>,
    document.getElementById('dashboard-conselho')
);
