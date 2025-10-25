class DashboardConselho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stats: {
                totalConselhos: 0,
                totalConselheiros: 0
            }
        };
    }

    componentDidMount() {
        this.loadStats();
    }

    loadStats() {
        this.loadConselhos();
        this.loadConselheiros();
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
                console.log('Conselhos data:', data);
                console.log('Conselhos length:', data ? data.length : 0);
                this.setState({
                    stats: {
                        ...this.state.stats,
                        totalConselhos: Array.isArray(data) ? data.length : 0
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselhos:', status, err.toString());
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
                console.log('Conselheiros data:', data);
                console.log('Conselheiros length:', data ? data.length : 0);
                this.setState({
                    loading: false,
                    stats: {
                        ...this.state.stats,
                        totalConselheiros: Array.isArray(data) ? data.length : 0
                    }
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('Erro ao carregar conselheiros:', status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }


    render() {


        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card  " style={{border: 0, background: "#F8F8F8", boxShadow: '0 0 3px #FFFFFF'}}>
                            <div className="card-body text-center">
                                <h5>Total de Conselhos</h5>
                                <h2>{this.state.stats.totalConselhos}</h2>
                                <i className="fas fa-users fa-2x"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card " style={{border: 0, background: "#F8F8F8", boxShadow: '0 0 3px #FFFFFF'}}>
                            <div className="card-body text-center">
                                <h5>Total de Conselheiros</h5>
                                <h2>{this.state.stats.totalConselheiros}</h2>
                                <i className="fas fa-user-tie fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                {/*<div className="row">
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
                </div>*/}
            </div>
        );
    }
}

ReactDOM.render(
    <DashboardConselho/>,
    document.getElementById('dashboard-conselho')
);
