'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuscarEmail = (function (_React$Component) {
    _inherits(BuscarEmail, _React$Component);

    function BuscarEmail(props) {
        _classCallCheck(this, BuscarEmail);

        _get(Object.getPrototypeOf(BuscarEmail.prototype), 'constructor', this).call(this, props);
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

    _createClass(BuscarEmail, [{
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            // Remove everything except digits
            var raw = event.target.value.replace(/\D/g, '');
            this.setState({
                cpf: raw,
                buttonEnabled: raw.length > 0,
                showMsg: false,
                msg: ''
            });
        }
    }, {
        key: 'searchBuscarEmail',
        value: function searchBuscarEmail(e) {
            e.preventDefault();
            var cpf = this.state.cpf;

            if (!cpf) return;

            this.setState({ loading: true, buttonEnabled: false, showMsg: false, msg: '' });

            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + ('user/buscar-email/' + cpf),
                cache: false,
                success: (function (data) {
                    this.setState({
                        results: data,
                        loading: false,
                        buttonEnabled: true
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err);
                    this.setState({
                        msg: 'Erro ao buscar e-mail. Tente novamente.',
                        showMsg: true,
                        loading: false,
                        buttonEnabled: true
                    });
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var cpf = _state.cpf;
            var buttonEnabled = _state.buttonEnabled;
            var loading = _state.loading;
            var showMsg = _state.showMsg;
            var msg = _state.msg;
            var results = _state.results;

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
                                        'Buscar e-mail'
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
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row justify-content-md-center' },
                        React.createElement(
                            'div',
                            { className: 'col-md-8' },
                            React.createElement(
                                'form',
                                { onSubmit: this.searchBuscarEmail },
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Digite o CPF para buscar o e-mail do representante'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'cpf' },
                                        'CPF*'
                                    ),
                                    React.createElement('input', {
                                        type: 'text',
                                        name: 'cpf',
                                        value: cpf,
                                        onChange: this.handleInputChange,
                                        className: 'form-control',
                                        placeholder: 'Apenas números'
                                    })
                                ),
                                showMsg && React.createElement(
                                    'div',
                                    { className: 'text-danger mb-2' },
                                    msg
                                ),
                                loading && React.createElement(
                                    'div',
                                    null,
                                    React.createElement('i', { className: 'fa fa-spinner fa-spin' }),
                                    ' Processando...'
                                ),
                                React.createElement(
                                    'button',
                                    {
                                        type: 'submit',
                                        className: 'btn btn-primary',
                                        disabled: !buttonEnabled || loading
                                    },
                                    'Pesquisar'
                                )
                            ),
                            results.id_usuario !== undefined && React.createElement(
                                'div',
                                { className: 'mt-4' },
                                React.createElement(
                                    'h4',
                                    null,
                                    'Resultados'
                                ),
                                React.createElement(
                                    'ul',
                                    { className: 'list-group' },
                                    React.createElement(
                                        'li',
                                        { key: results.id_usuario, className: 'list-group-item', style: { display: 'flex', justifyContent: 'space-between' } },
                                        React.createElement(
                                            'strong',
                                            null,
                                            results.tx_nome_usuario
                                        ),
                                        ' ',
                                        results.tx_email_usuario
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
    }]);

    return BuscarEmail;
})(React.Component);

ReactDOM.render(React.createElement(BuscarEmail, { email: email }), document.getElementById('buscar-email'));