class Descricao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                tx_historico: '',
                tx_missao_osc: '',
                tx_visao_osc: '',
                tx_finalidades_estatutarias: '',
                tx_link_estatuto_osc: ''

            },
            requireds: {
                tx_historico: true,
                tx_missao_osc: true,
                tx_visao_osc: true,
                tx_finalidades_estatutarias: true,
                tx_link_estatuto_osc: true

            },
            loading: false,
            button: true,
            showMsg: false,
            showIcon: false,
            showIconErro: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getDescricao = this.getDescricao.bind(this);
    }

    componentDidMount() {
        this.getDescricao();
    }

    getDescricao() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: '/get-descricao',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data.descricao, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({ form: form });
    }

    validate() {
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '', showIcon: false, showIconErro: false }, function () {
            $.ajax({
                method: 'PUT',
                url: '/update-descricao',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    let msg = "Dados alterados com sucesso!";
                    this.setState({ msg: msg, showIcon: true, showMsg: true, loading: false, button: true, color: 'success' });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({ loading: false, msg: msg, showMsg: true, showIconErro: true, button: true, color: 'danger' });
                }.bind(this)
            });
        });
    }

    render() {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'title-user-area' },
                                React.createElement(
                                    'div',
                                    { className: 'mn-accordion-icon' },
                                    React.createElement('i', { className: 'fas fa-align-justify', 'aria-hidden': 'true' })
                                ),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Descri\xE7\xE3o da OSC'
                                ),
                                React.createElement('hr', null),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float-tx' },
                                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_historico', onChange: this.handleInputChange, value: this.state.form.tx_historico,
                                            rows: '3', placeholder: 'De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_historico' },
                                            'Hist\xF3rico'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-tx' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-float-tx' },
                                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_missao_osc', onChange: this.handleInputChange, value: this.state.form.tx_missao_osc,
                                            rows: '3', placeholder: 'Se houver, apresente qual a miss\xE3o da OSC' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_missao_osc' },
                                            'Miss\xE3o'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-tx' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-float-tx' },
                                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_visao_osc', onChange: this.handleInputChange, value: this.state.form.tx_visao_osc,
                                            rows: '3', placeholder: 'Se houver, apresente a vis\xE3o da OSC' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_visao_osc' },
                                            'Vis\xE3o'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-tx' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-float-tx' },
                                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_finalidades_estatutarias', onChange: this.handleInputChange, value: this.state.form.tx_finalidades_estatutarias,
                                            rows: '3', placeholder: 'Apresente as finalidades estatut\xE1rias da OSC. Se preferir, copie do estatuto da OSC' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_finalidades_estatutarias' },
                                            'Finalidades Estatut\xE1rias da OSC'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-tx' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.form.tx_link_estatuto_osc,
                                            placeholder: 'Se houver, insira o link que leva ao estatuto da OSC. Ex.: http://www.nomesite.com/link-completo.pdf' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_estatuto_osc' },
                                            'Link para o Estatutu da OSC'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: '-10px' } },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading ? 'block' : 'none' } },
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando ',
                                            React.createElement('br', null),
                                            ' ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + this.state.color },
                                            React.createElement('i', { className: 'far fa-check-circle', style: { display: this.state.showIcon ? 'none' : '' } }),
                                            React.createElement('i', { className: 'far fa-times-circle', style: { display: this.state.showIconErro ? 'none' : '' } }),
                                            this.state.msg
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-success', onClick: this.register },
                                            React.createElement('i', {
                                                className: 'fas fa-cloud-download-alt' }),
                                            ' Salvar descri\xE7\xE3o'
                                        ),
                                        React.createElement('br', null)
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'space' })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Descricao, null), document.getElementById('descricao'));