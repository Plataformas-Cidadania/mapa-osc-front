'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormEditParticipacaoConselho = (function (_React$Component) {
    _inherits(FormEditParticipacaoConselho, _React$Component);

    function FormEditParticipacaoConselho(props) {
        _classCallCheck(this, FormEditParticipacaoConselho);

        _get(Object.getPrototypeOf(FormEditParticipacaoConselho.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                cd_conselho: '',
                //cd_tipo_participacao: '',
                //tx_nome_representante_conselho: '',
                cd_periodicidade_reuniao_conselho: '',
                dt_data_inicio_conselho: '',
                dt_data_fim_conselho: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                cd_conselho: true,
                //cd_tipo_participacao: true,
                //tx_nome_representante_conselho: true,
                cd_periodicidade_reuniao_conselho: true,
                dt_data_inicio_conselho: true,
                dt_data_fim_conselho: true
            },
            showMsg: false,
            msg: '',
            participacoes: [],

            action: '', //new | edit
            editId: this.props.id,

            listConselhos: [],
            listTipo: [],
            listReuniao: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateConselho = this.updateConselho.bind(this);
        this.editConselho = this.editConselho.bind(this);
        this.validate = this.validate.bind(this);
    }

    _createClass(FormEditParticipacaoConselho, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ editId: this.props.id }, function () {
                this.editConselho();
            });
            this.listConselho();
            this.listTipo();
            this.listReuniao();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.state.editId !== props.id) {
                this.setState({ editId: props.id }, function () {
                    this.editConselho();
                });
            }
        }
    }, {
        key: 'editConselho',
        value: function editConselho() {
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/ps_conselho/' + this.state.editId,
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

            //console.log(requireds);

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'updateConselho',
        value: function updateConselho(e) {
            e.preventDefault();
            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'PUT',
                    url: getBaseUrl2 + 'osc/ps_conselho/' + this.state.editId,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        cd_conselho: this.state.form.cd_conselho,
                        //cd_tipo_participacao: this.state.form.cd_tipo_participacao,
                        //tx_nome_representante_conselho: this.state.form.tx_nome_representante_conselho,
                        cd_periodicidade_reuniao_conselho: this.state.form.cd_periodicidade_reuniao_conselho,
                        dt_data_inicio_conselho: this.state.form.dt_data_inicio_conselho,
                        dt_data_fim_conselho: this.state.form.dt_data_fim_conselho,
                        bo_oficial: 0,
                        //id_osc: 611720,
                        id_osc: this.props.id_osc,
                        id: this.state.editId
                    },
                    cache: false,
                    success: (function (data) {
                        this.props.list();

                        //this.cleanFormConselho();
                        //this.props.showHideFormConselho();

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
        key: 'listConselho',
        value: function listConselho() {
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                //url: getBaseUrl + 'menu/osc/conselho',
                url: getBaseUrl2 + 'ps_conselhos',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ listConselhos: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'listTipo',
        value: function listTipo() {
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl + 'menu/osc/tipo_participacao',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ listTipo: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'listReuniao',
        value: function listReuniao() {
            this.setState({ loadingList: true });
            $.ajax({
                method: 'GET',
                //url: getBaseUrl + 'menu/osc/periodicidade_reuniao',
                url: getBaseUrl2 + 'ps_conselhos_periodicidade',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ listReuniao: data, loadingList: false });
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

            var listConselhos = this.state.listConselhos.map((function (item, index) {
                return React.createElement(
                    'option',
                    { value: item.cd_conselho, key: 'listConselhos' + index },
                    item.tx_nome_conselho
                );
            }).bind(this));

            var listReuniao = this.state.listReuniao.map((function (item, index) {
                return React.createElement(
                    'option',
                    { value: item.cd_periodicidade_reuniao_conselho, key: 'listReuniao' + index },
                    item.tx_nome_periodicidade_reuniao_conselho
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
                                    name: 'cd_conselho', onChange: this.handleInputChange, value: this.state.form.cd_conselho },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                listConselhos
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement(
                                'select',
                                { className: "form-control ",
                                    name: 'cd_periodicidade_reuniao_conselho', onChange: this.handleInputChange, value: this.state.form.cd_periodicidade_reuniao_conselho },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                listReuniao
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_inicio_conselho', onChange: this.handleInputChange, defaultValue: this.state.form.dt_data_inicio_conselho,
                                placeholder: 'Se houver, insira o link que' }),
                            React.createElement(
                                'label',
                                { htmlFor: 'dt_data_inicio_conselho' },
                                'Data de início de vigência'
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
                            'div',
                            { className: 'label-float' },
                            React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_fim_conselho', onChange: this.handleInputChange, defaultValue: this.state.form.dt_data_fim_conselho,
                                placeholder: 'Se houver, insira o link que' }),
                            React.createElement(
                                'label',
                                { htmlFor: 'dt_data_fim_conselho' },
                                'Data de fim de vigência'
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
                            { className: 'btn btn-primary', onClick: this.updateConselho },
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
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return FormEditParticipacaoConselho;
})(React.Component);