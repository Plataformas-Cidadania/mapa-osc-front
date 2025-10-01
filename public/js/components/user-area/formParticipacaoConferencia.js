'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormParticipacaoConferencia = (function (_React$Component) {
    _inherits(FormParticipacaoConferencia, _React$Component);

    function FormParticipacaoConferencia(props) {
        _classCallCheck(this, FormParticipacaoConferencia);

        _get(Object.getPrototypeOf(FormParticipacaoConferencia.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                cd_conferencia: '',
                dt_ano_realizacao: '',
                cd_forma_participacao_conferencia: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                cd_conferencia: true,
                dt_ano_realizacao: true,
                cd_forma_participacao_conferencia: true
            },
            showMsg: false,
            msg: '',
            conferencias: [],
            maxAlert: false,
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Residencial',
                2: 'Comercial'
            },
            action: '', //new | edit
            editId: this.props.id,

            listConferencia: [],
            listForma: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanFormConferencia = this.cleanFormConferencia.bind(this);
    }

    _createClass(FormParticipacaoConferencia, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listConferencia();
            this.listForma();
        }
    }, {
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
                        this.cleanFormConferencia();
                    }
                });
            }
        }
    }, {
        key: 'edit',
        value: function edit() {
            $.ajax({
                method: 'GET',
                url: '/edit-user-conferencia/' + this.state.editId,
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
        key: 'cleanFormConferencia',
        value: function cleanFormConferencia() {
            var form = {
                cd_conferencia: 0,
                dt_ano_realizacao: 0,
                cd_forma_participacao_conferencia: 0
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

            var url = 'osc/ps_conferencia';
            var id = null;
            var method = 'POST';
            if (this.state.action === 'edit') {
                id = this.state.editId;
                url = 'osc/ps_conferencia/' + id;
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
                        cd_conferencia: this.state.form.cd_conferencia,
                        dt_ano_realizacao: this.state.form.dt_ano_realizacao,
                        cd_forma_participacao_conferencia: this.state.form.cd_forma_participacao_conferencia,
                        ft_conferencia: 'Representante de OSC',
                        ft_ano_realizacao: 'Representante de OSC',
                        ft_forma_participacao_conferencia: 'Representante de OSC',
                        bo_oficial: 0,
                        //id_osc: 611720,
                        id_osc: this.props.id_osc,
                        id: id
                    },
                    cache: false,
                    success: (function (data) {
                        this.props.list();
                        this.cleanFormConferencia();
                        this.props.showHideFormConferencia();

                        this.setState({ conferencias: data.conferencias, loading: false });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, button: true });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'listConferencia',
        value: function listConferencia() {
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                //url: getBaseUrl + 'menu/osc/conferencia',
                url: getBaseUrl2 + 'ps_conferencias',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ listConferencia: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'listForma',
        value: function listForma() {
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                //url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
                url: getBaseUrl2 + 'ps_conferencias_formas',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ listForma: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var anosLista = getOptions().map((function (item, index) {
                return React.createElement(
                    'option',
                    { value: item + '-01-01', key: 'anosLista' + index },
                    item
                );
            }).bind(this));

            var listConferencia = this.state.listConferencia.map((function (item, index) {
                return React.createElement(
                    'option',
                    { value: item.cd_conferencia, key: 'listReuniao' + index },
                    item.tx_nome_conferencia
                );
            }).bind(this));

            var listForma = this.state.listForma.map((function (item, index) {
                return React.createElement(
                    'option',
                    { value: item.cd_forma_participacao_conferencia, key: 'listReuniao' + index },
                    item.tx_nome_forma_participacao_conferencia
                );
            }).bind(this));

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
                            React.createElement(
                                'select',
                                { className: "form-control ",
                                    name: 'cd_conferencia', onChange: this.handleInputChange, value: this.state.form.cd_conferencia },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                listConferencia
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement(
                                'select',
                                { className: "form-control ",
                                    name: 'dt_ano_realizacao', onChange: this.handleInputChange, value: this.state.form.dt_ano_realizacao },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                anosLista
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement(
                                'select',
                                { className: "form-control ",
                                    name: 'cd_forma_participacao_conferencia', onChange: this.handleInputChange, value: this.state.form.cd_forma_participacao_conferencia },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                listForma
                            ),
                            React.createElement('br', null)
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
                            'Máximo de Conferenciaz Cadastrados'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return FormParticipacaoConferencia;
})(React.Component);