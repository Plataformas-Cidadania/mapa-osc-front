'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormConselho = (function (_React$Component) {
    _inherits(FormConselho, _React$Component);

    function FormConselho(props) {
        _classCallCheck(this, FormConselho);

        _get(Object.getPrototypeOf(FormConselho.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                tx_nome_conselheiro: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_conselheiro: true
            },
            showMsg: false,
            msg: '',
            conselhos: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    _createClass(FormConselho, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.cleanForm();
        }
    }, {
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
        key: 'cleanForm',
        value: function cleanForm() {
            var form = this.state.form;
            for (var i in form) {
                form[i] = '';
            }
            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
            console.log(this.state.form);
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
        key: 'register',
        value: function register(e) {
            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/conselho',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        tx_nome_conselheiro: this.state.form.tx_nome_conselheiro,
                        bo_oficial: 0,
                        //id_osc: 455128,
                        id_osc: this.props.id_osc
                    },
                    cache: false,
                    success: (function (data) {
                        this.props.list();
                        this.cleanForm();
                        this.props.closeForm();

                        this.setState({ conselhos: data.conselhos, loading: false });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, button: true });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement('input', { className: "form-control " + (this.state.requireds.tx_nome_conselheiro ? '' : 'invalid-field'),
                            type: 'text', name: 'tx_nome_conselheiro', onChange: this.handleInputChange,
                            value: this.state.form.tx_nome_conselheiro, placeholder: 'Nome' }),
                        React.createElement('br', null),
                        React.createElement(
                            'button',
                            { className: 'btn btn-success', onClick: this.register },
                            'Cadastrar'
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-danger' },
                            this.state.msg
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.loading ? 'block' : 'none' } },
                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                            'Processando'
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.maxAlert ? 'block' : 'none' }, className: ' alert alert-danger' },
                            'Máximo de Conselhoz Cadastrados'
                        )
                    )
                )
            );
        }
    }]);

    return FormConselho;
})(React.Component);