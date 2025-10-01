'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormProjetoPublico = (function (_React$Component) {
    _inherits(FormProjetoPublico, _React$Component);

    function FormProjetoPublico(props) {
        _classCallCheck(this, FormProjetoPublico);

        _get(Object.getPrototypeOf(FormProjetoPublico.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                id_projeto: null,
                tx_nome_publico_beneficiado: '',
                ft_nome_publico_beneficiado: ''
            },

            requireds: {
                tx_nome_publico_beneficiado: true
            },
            updateOk: false,
            loading: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    _createClass(FormProjetoPublico, [{
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
            console.log('11111111111');
            this.setState({
                form: {
                    tx_nome_publico_beneficiado: ''
                }
            });
        }
    }, {
        key: 'validate',
        value: function validate() {

            var valid = true;
            var requireds = this.state.requireds;

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

            var msg = "Dados inserido com sucesso!";

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

                var data = {
                    //id_osc: '455128',
                    id_osc: this.props.id_osc,
                    id_projeto: this.props.id_projeto,
                    tx_nome_publico_beneficiado: this.state.form.tx_nome_publico_beneficiado,
                    ft_publico_beneficiado: 'Representante de OSC'
                };

                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto/publico',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: data,
                    cache: false,
                    success: (function (data) {
                        this.props.listPublicos();
                        this.setState({ loading: false, updateOk: true, msg: msg, showMsg: true });
                        this.cleanForm();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        var msg = "Ocorreu um erro!";
                        this.setState({ msg: msg, updateOk: false });
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
                    'form',
                    { autoComplete: 'off' },
                    React.createElement(
                        'div',
                        { className: 'row box-search' },
                        React.createElement(
                            'div',
                            { className: 'col-md-8' },
                            React.createElement(
                                'div',
                                { className: 'label-float' },
                                React.createElement('input', { type: 'text', className: 'form-control mx-sm-3', name: 'tx_nome_publico_beneficiado', onChange: this.handleInputChange, placeholder: 'Inserir o publico beneficiado' }),
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tx_nome_publico_beneficiado', style: { margin: '4px 0 0 12px' } },
                                    'Inserir o público beneficiado'
                                ),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(
                                'button',
                                { className: 'btn btn-success', onClick: this.register, style: { marginTop: '5px' } },
                                React.createElement(
                                    'span',
                                    null,
                                    'Adicionar'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? 'block' : 'none' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                            ' Processando ',
                            React.createElement('br', null),
                            ' ',
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                            React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                            this.state.msg
                        )
                    )
                )
            );
        }
    }]);

    return FormProjetoPublico;
})(React.Component);