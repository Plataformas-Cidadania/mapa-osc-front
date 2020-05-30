class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            msg: '',
            msgShow: false,
            email: ''
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.send = this.send.bind(this);
    }

    show() {
        $('#modalForgetPassword').modal('show');
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    send(e) {
        e.preventDefault();

        this.setState({ loading: true, msgShow: false });

        $.ajax({
            method: 'POST',
            url: '/forget-password',
            data: {
                email: this.state.email
            },
            cache: false,
            success: function (data) {
                console.log(data);

                this.setState({ loading: false, msgShow: true, msg: data.msg });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'text-right' },
                React.createElement(
                    'a',
                    { href: '#', onClick: this.show },
                    'Esqueci minha senha'
                )
            ),
            React.createElement(
                'div',
                { className: 'modal fade', id: 'modalForgetPassword', role: 'dialog', style: { zIndex: '999999' } },
                React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                                '\xD7'
                            ),
                            React.createElement(
                                'h4',
                                { className: 'modal-title' },
                                'Esqueci minha senha'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body' },
                            React.createElement(
                                'form',
                                null,
                                React.createElement('input', { type: 'email', className: 'form-control', name: 'email', onChange: this.handleEmail, placeholder: 'Digite seu e-mail' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'div',
                                { style: { display: this.state.loading ? 'block' : 'none' } },
                                React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                ' Processando'
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.state.msgShow ? 'block' : 'none' } },
                                this.state.msg
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default', onClick: this.send },
                                'Enviar'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                                'Fechar'
                            )
                        )
                    )
                )
            )
        );
    }
}