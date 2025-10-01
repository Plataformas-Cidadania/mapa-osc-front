'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormAtuacao = (function (_React$Component) {
    _inherits(FormAtuacao, _React$Component);

    function FormAtuacao(props) {
        _classCallCheck(this, FormAtuacao);

        _get(Object.getPrototypeOf(FormAtuacao.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                dt_inicio_atuacao: '',
                dt_fim_atuacao: '',
                cd_uf: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_atuacao: true,
                dt_fim_atuacao: true,
                cd_uf: true,
                cd_atuacao: true
            },
            showMsg: false,
            msg: '',
            atuacoes: [],
            maxAlert: false,
            cd_atuacao: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            action: '', //new | edit
            editId: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    _createClass(FormAtuacao, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            console.log(props);
            var lastEditId = this.state.editId;
            if (this.state.action != props.action || this.state.editId != props.id) {
                this.setState({ action: props.action, editId: props.id }, function () {
                    if (lastEditId != props.id) {
                        this.props.showHideForm(this.state.action);
                        this.edit();
                    }
                    if (this.state.action == 'new') {
                        this.cleanForm();
                    }
                });
            }
        }
    }, {
        key: 'edit',
        value: function edit() {
            $.ajax({
                method: 'GET',
                url: 'edit-user-atuacao/' + this.state.editId,
                data: {},
                cache: false,
                success: (function (data) {
                    console.log(data);
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

            var url = '/register-atuacao';
            var id = null;
            if (this.state.action === 'edit') {
                id = this.state.editId;
                url = '/update-user-atuacao';
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: url,
                    //url: '/register-atuacao',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        form: this.state.form,
                        id: id
                    },
                    cache: false,
                    success: (function (data) {
                        console.log('reg', data);

                        if (data.max) {
                            var msg = data.msg;
                            this.setState({ loading: false, button: true, maxAlert: true, btnContinue: true, atuacoes: data.atuacoes });
                            return;
                        }

                        var button = true;
                        if (this.state.action === 'new') {
                            if (data.atuacoes.length >= data.maxAtuacoes) {
                                button = false;
                            }
                        }

                        var btnContinue = false;

                        this.props.list();

                        this.cleanForm();
                        this.props.closeForm();

                        this.setState({ atuacoes: data.atuacoes, loading: false, button: button, btnContinue: btnContinue });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, button: true });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'getAge',
        value: function getAge(dateString) {

            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
                age--;
            }

            console.log(age);

            return age;
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
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'nome' },
                                    'Nome*'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'select',
                                    { className: "form-control form-m " + (this.state.requireds.cd_atuacao ? '' : 'invalid-field'),
                                        name: 'tipo', onChange: this.handleInputChange, value: this.state.form.cd_atuacao },
                                    React.createElement(
                                        'option',
                                        { value: '0' },
                                        'Selecione'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '1' },
                                        'Utilidade Pública Municipal'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '2' },
                                        'Utilidade Pública Estadual'
                                    )
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'tipo' },
                                    'Localidade*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control " + (this.state.requireds.cd_uf ? '' : 'invalid-field'),
                                    type: 'text', name: 'nome', onChange: this.handleInputChange,
                                    value: this.state.form.cd_uf, placeholder: '' }),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cep' },
                                    'Data início da validade*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control " + (this.state.requireds.dt_inicio_atuacao ? '' : 'invalid-field'),
                                    type: 'date', name: 'cep', onChange: this.handleInputChange,
                                    value: this.state.form.dt_inicio_atuacao, placeholder: '' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'cep' },
                                    'Data fim da validade*'
                                ),
                                React.createElement('br', null),
                                React.createElement('input', { className: "form-control " + (this.state.requireds.dt_fim_atuacao ? '' : 'invalid-field'),
                                    type: 'date', name: 'cep', onChange: this.handleInputChange,
                                    value: this.state.form.dt_fim_atuacao, placeholder: '' }),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'i',
                                null,
                                '* campos obrigatórios'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'button',
                                    { style: { display: this.state.action === 'edit' ? 'block' : this.state.atuacoes.length < maxAtuacoes ? 'block' : 'none' },
                                        className: 'btn btn-success', onClick: this.register },
                                    'Adicionar'
                                )
                            )
                        ),
                        React.createElement('br', null),
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
                            'Máximo de Certificatos Cadastrados'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return FormAtuacao;
})(React.Component);