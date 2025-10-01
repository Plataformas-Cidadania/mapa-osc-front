'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormParticipacaoOutro = (function (_React$Component) {
    _inherits(FormParticipacaoOutro, _React$Component);

    function FormParticipacaoOutro(props) {
        _classCallCheck(this, FormParticipacaoOutro);

        _get(Object.getPrototypeOf(FormParticipacaoOutro.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                tx_nome_participacao_social_outra: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_participacao_social_outra: true
            },
            showMsg: false,
            msg: '',
            participacoes: [],
            action: '', //new | edit
            editId: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanFormOutro = this.cleanFormOutro.bind(this);
    }

    _createClass(FormParticipacaoOutro, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var lastEditId = this.state.editId;
            if (this.state.action != props.action || this.state.editId != props.id) {
                this.setState({ action: props.action, editId: props.id }, function () {
                    if (lastEditId != props.id) {
                        //this.props.showHideForm(this.state.action);
                        this.edit();
                    }
                    if (this.state.action == 'new') {
                        this.cleanFormOutro();
                    }
                });
            }
        }
    }, {
        key: 'edit',
        value: function edit() {
            $.ajax({
                method: 'GET',
                url: '/edit-user-participacao/' + this.state.editId,
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ form: data }, function () {
                        //this.props.showHideForm();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                }).bind(this)
            });
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
        key: 'cleanFormOutro',
        value: function cleanFormOutro() {
            var form = {
                tx_nome_participacao_social_outra: ''
            };
            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
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

            var url = 'osc/ps_outra';
            var id = null;
            var method = 'POST';
            if (this.state.action === 'edit') {
                id = this.state.editId;
                url = 'osc/ps_outra/' + id;
                method = 'PUT';
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: method,
                    url: getBaseUrl2 + url,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        tx_nome_participacao_social_outra: this.state.form.tx_nome_participacao_social_outra,
                        ft_participacao_social_outra: 'Representante de OSC',
                        bo_oficial: 0,
                        //id_osc: 611720,
                        id_osc: this.props.id_osc,
                        id: id
                    },
                    cache: false,
                    success: (function (data) {

                        this.props.list();

                        this.cleanFormOutro();
                        this.props.showHideFormOutro();

                        this.setState({ participacoes: data.participacoes, loading: false });
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
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_participacao_social_outra', onChange: this.handleInputChange, value: this.state.form.tx_nome_participacao_social_outra,
                                placeholder: 'Se houver, insira o link que' }),
                            React.createElement(
                                'label',
                                { htmlFor: 'tx_nome_participacao_social_outra-4273' },
                                'Nome da Conferência'
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-box-info-off' },
                                React.createElement(
                                    'p',
                                    null,
                                    ' '
                                )
                            )
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-success', onClick: this.register },
                            'Salvar'
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
                            'Máximo de Participacaoz Cadastrados'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return FormParticipacaoOutro;
})(React.Component);