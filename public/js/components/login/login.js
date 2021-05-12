class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            requireds: {
                email: true,
                password: true
            },
            target: this.props.target,
            msg: '',
            msgShow: false,
            loading: false
        };

        this.login = this.login.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.target) {
            this.setState({ target: 'area-user' });
        }
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
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for (let index in requireds) {
            if (!form[index] || form[index] == '') {
                requireds[index] = false;
                valid = false;
            } else {
                requireds[index] = true;
            }
        }

        //console.log(requireds);

        this.setState({ requireds: requireds });
        return valid;
    }

    login(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, msgShow: false });

        $.ajax({
            method: 'POST',
            //url: 'login',
            url: getBaseUrl2 + 'v1/oauth/token',
            data: {
                grant_type: 'password',
                client_id: '2',
                client_secret: 'QYDGG3kPaK3ubJhCE3a6EHup9etYfd2hDrY4JbnL',
                username: this.state.form.email,
                password: this.state.form.password,
                scope: ''
            },
            cache: false,
            success: function (data) {
                console.log(data);

                if (data.status) {
                    location.href = this.state.target;
                }

                this.setState({ loading: false, msgShow: true, msg: data.msg });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    render() {

        let titleLogin = "Já tenho cadastro";

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'bg-lgt' },
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
                                'header',
                                null,
                                React.createElement('br', null),
                                React.createElement(
                                    'h1',
                                    null,
                                    'Identifica\xE7\xE3o'
                                ),
                                React.createElement(
                                    'h5',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '/' },
                                        'Home'
                                    )
                                ),
                                React.createElement('br', null)
                            )
                        )
                    )
                )
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row justify-content-md-center' },
                    React.createElement(
                        'div',
                        { className: 'col-md-5' },
                        React.createElement(
                            'div',
                            { className: 'row box-margin' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'h4',
                                    null,
                                    titleLogin
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'form',
                                    null,
                                    React.createElement('input', { type: 'hidden', name: '_token', value: $('meta[name="csrf-token"]').attr('content') }),
                                    React.createElement('input', { type: 'email', name: 'email', className: "form-control " + (this.state.requireds.email ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'E-mail' }),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { style: { fontSize: '12px' } },
                                        React.createElement(ForgetPassword, null)
                                    ),
                                    React.createElement('input', { type: 'password', name: 'password', className: "form-control " + (this.state.requireds.password ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'Senha' }),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-primary', onClick: this.login },
                                        'Continuar'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.loading ? 'block' : 'none' } },
                                        React.createElement('br', null),
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                        ' Processando'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.msgShow ? 'block' : 'none' } },
                                        React.createElement('br', null),
                                        this.state.msg
                                    )
                                ),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'text-center' },
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'p',
                                        null,
                                        'ou'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'N\xE3o tem cadastro? ',
                                        React.createElement(
                                            'a',
                                            { href: 'register', className: 'text-primary' },
                                            'Cadastre-se'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement('br', null),
            React.createElement('br', null)
        );
    }
}

ReactDOM.render(React.createElement(Login, null), document.getElementById('login'));