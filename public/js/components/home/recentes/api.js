class OscsRecentes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oscs: [],
            loading: false
        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.setState({ loading: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/lista_atualizada/9',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ oscs: data, loading: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    render() {

        let oscs = null;
        if (this.state.oscs) {
            oscs = this.state.oscs.map((item, index) => {
                return React.createElement(
                    'div',
                    { key: "recente" + index, className: 'col-md-4' },
                    React.createElement(
                        'a',
                        { href: "detalhar/" + item.id_osc + "/" + clean(item.tx_nome_osc) },
                        React.createElement(
                            'div',
                            { className: 'list-user list-lgt' },
                            React.createElement('img', { src: getBaseUrl2 + "osc/logo/" + item.id_osc, alt: item.tx_nome_osc, title: item.tx_nome_osc, width: '50', className: 'rounded-circle float-left', style: { backgroundColor: '#FFFFFF' } }),
                            React.createElement(
                                'h4',
                                { className: 'capitalize' },
                                titleize(item.tx_nome_osc, 50),
                                React.createElement('i', { className: 'fas fa-angle-right float-right list-icon' })
                            ),
                            React.createElement('hr', null)
                        )
                    )
                );
            });
        }

        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-12 text-center' },
                React.createElement('img', { src: 'img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loading ? '' : 'none' } })
            ),
            oscs,
            React.createElement(
                'div',
                { className: 'col-md-12 text-center' },
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'a',
                    { href: 'mapa' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-outline-light' },
                        'Visualize todas as OSCs'
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }
}

ReactDOM.render(React.createElement(OscsRecentes, null), document.getElementById('oscsRecentes'));