class Recurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingSave: false,
            value: ''
        };
        this.storeCampo = this.storeCampo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {}

    handleInputChange(event) {
        this.setState({ value: formatarMoeda(event.target.value) });
    }

    storeCampo(cd, value, id, ano) {

        this.setState({ loading: true, loadingSave: false });

        value = clearMoeda(value);

        if (id > 0) {
            this.setState({ button: false }, function () {
                $.ajax({
                    method: 'PUT',
                    url: getBaseUrl2 + 'osc/recursos/' + id,
                    data: {
                        id_osc: this.props.id_osc,
                        dt_ano_recursos_osc: ano,
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: cd
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    cache: false,
                    success: function (data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success', loadingSave: true });
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                    }.bind(this)
                });
            });
        } else {
            this.setState({ button: false }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/recursos',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        id_osc: this.props.id_osc,
                        dt_ano_recursos_osc: ano,
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: cd
                    },
                    cache: false,
                    success: function (data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success', loadingSave: true });
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                    }.bind(this)
                });
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.id,
            cd: props.cd,
            name: props.name,
            value: props.value,
            txt: props.txt,
            ano: props.ano,
            type: props.type
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'col-md-6' },
            React.createElement(
                'div',
                { className: 'label-float' },
                React.createElement('input', { className: "form-control form-g ", type: 'text', onChange: this.handleInputChange, placeholder: 'Informe o valor',
                    id: this.state.name,
                    name: this.state.name,
                    value: this.state.value
                    //defaultValue={this.state.value}
                    , onBlur: () => this.storeCampo(this.state.cd, this.state.value, this.state.id, this.state.ano)
                }),
                React.createElement(
                    'label',
                    { htmlFor: this.state.name },
                    this.state.txt
                ),
                React.createElement(
                    'div',
                    { className: 'label-box-info-off' },
                    React.createElement(
                        'p',
                        null,
                        '\xA0'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'float-right', style: { marginTop: '-50px', marginRight: '10px' } },
                    React.createElement(
                        'div',
                        { style: { display: this.state.loadingSave ? '' : 'none' } },
                        React.createElement('i', { className: 'far fa-save text-success' })
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? '' : 'none' } },
                        React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                    )
                )
            )
        );
    }
}

/*ReactDOM.render(
    <Recurso/>,
    document.getElementById('recurso')
);*/