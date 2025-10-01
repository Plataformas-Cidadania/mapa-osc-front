'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPassword = (function (_React$Component) {
    _inherits(ResetPassword, _React$Component);

    function ResetPassword(props) {
        _classCallCheck(this, ResetPassword);

        _get(Object.getPrototypeOf(ResetPassword.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                id_usuario: props.id_usuario,
                hash: props.hash,
                tx_senha_usuario: ''
            },
            token: this.props.token,
            button: true,
            loading: false,
            msg: '',
            msgShow: false,
            requireds: {
                /*email: true,*/
                tx_senha_usuario: true
            }

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
    }

    _createClass(ResetPassword, [{
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            form[name] = value;

            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
            //console.log(this.state.form);
            var valid = true;

            var requireds = this.state.requireds;
            var form = this.state.form;

            for (var index in requireds) {
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
    }, {
        key: 'save',
        value: function save(e) {
            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, msgShow: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'trocar-senha-user',
                    data: {
                        form: this.state.form
                    },
                    /*token: this.props.token*/
                    cache: false,
                    success: (function (data) {

                        this.setState({ msg: data.msg, msgShow: true, loading: false, button: true });
                        location.href = 'login';
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false });
                    }).bind(this)
                });
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
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'title-box' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h2',
                            { className: 'text-center' },
                            'Redefinir Senha'
                        ),
                        React.createElement('hr', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: '', style: { margin: 'auto', width: '600px' } },
                            React.createElement(
                                'div',
                                { className: 'row box-margin' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'form',
                                        null,
                                        React.createElement('input', { type: 'password', name: 'tx_senha_usuario', className: "form-control " + (this.state.requireds.password ? '' : 'invalid-field'), onChange: this.handleInputChange, placeholder: 'Digite a nova senha' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-style-primary', onClick: this.save },
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

    return ResetPassword;
})(React.Component);

ReactDOM.render(React.createElement(ResetPassword, { hash: hash, id_usuario: id_usuario }), document.getElementById('reset-password'));
/*<input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>*/ /*<input type="email" name="email" className={"form-control "+(this.state.requireds.email ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Digite o e-mail"/><br/>*/