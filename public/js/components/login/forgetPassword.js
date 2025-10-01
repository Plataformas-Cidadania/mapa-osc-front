'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgetPassword = (function (_React$Component) {
    _inherits(ForgetPassword, _React$Component);

    function ForgetPassword(props) {
        _classCallCheck(this, ForgetPassword);

        _get(Object.getPrototypeOf(ForgetPassword.prototype), 'constructor', this).call(this, props);
        this.state = {
            loading: false,
            msg: '',
            msgShow: false,
            email: ''
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.send = this.send.bind(this);
    }

    _createClass(ForgetPassword, [{
        key: 'show',
        value: function show() {
            $('#modalForgetPassword').modal('show');
        }
    }, {
        key: 'handleEmail',
        value: function handleEmail(e) {
            this.setState({ email: e.target.value });
        }
    }, {
        key: 'send',
        value: function send(e) {
            e.preventDefault();

            this.setState({ loading: true, msgShow: false });

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'esqueci-senha',
                data: {
                    email: this.state.email
                },
                cache: false,
                success: (function (data) {
                    console.log(data);

                    this.setState({ loading: false, msgShow: true, msg: data.Resposta });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'text-right' },
                    React.createElement(
                        'a',
                        { style: { cursor: 'pointer' }, onClick: this.show },
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
                                    '×'
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
    }]);

    return ForgetPassword;
})(React.Component);