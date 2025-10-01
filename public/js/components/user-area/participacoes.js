'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Participacoes = (function (_React$Component) {
    _inherits(Participacoes, _React$Component);

    function Participacoes(props) {
        _classCallCheck(this, Participacoes);

        _get(Object.getPrototypeOf(Participacoes.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            conferencias: [],
            conselhos: [],
            outros: [],
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Endereço principal',
                2: ' '
            },

            showFormConselho: false,
            showFormConferencia: false,
            showFormOutro: false,

            actionFormConselho: '',
            actionFormConferencia: '',
            actionFormOutro: '',

            loadingRemove: [],

            conferencia: {},
            conselho: {},
            outro: {},

            editIdConselho: 0,
            editIdConferencia: 0,
            editIdOutro: 0,
            editId: 0,

            removeConselho: [],
            removeItem: [],
            removeOutro: [],

            removeItemConselho: null,
            removeItemTx: '',
            removeTipo: '',

            nao_possui: null,
            type: '',

            msgEspacos: 'Caso queira continuar com essa solicitação todos os dados serão apagados, esse processo apenas será validado após a confirmação.',
            showConselhoInfo: false,
            showConferenciaInfo: false,
            showOutroInfo: false

        };

        this.list = this.list.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
        this.showHideFormOutro = this.showHideFormOutro.bind(this);

        this.closeFormConselho = this.closeFormConselho.bind(this);
        this.closeFormConferencia = this.closeFormConferencia.bind(this);
        this.closeFormOutro = this.closeFormOutro.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);

        this.removeItem = this.removeItem.bind(this);

        this.callModal = this.callModal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);

        this.naoPossui = this.naoPossui.bind(this);
        this.updateNaoPossui = this.updateNaoPossui.bind(this);

        this.validate = this.validate.bind(this);
    }

    _createClass(Participacoes, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
            this.naoPossui();
        }
    }, {
        key: 'cancelRemove',
        value: function cancelRemove(id) {
            var remove = this.state.remove;
            remove[id] = false;
            this.setState({ remove: remove });
        }
    }, {
        key: 'showHideFormConselho',
        value: function showHideFormConselho(action) {
            var showFormConselho = !this.state.showFormConselho;
            var actionFormConselho = action;

            this.setState({ showFormConselho: showFormConselho, actionFormConselho: actionFormConselho });
        }
    }, {
        key: 'showHideFormConferencia',
        value: function showHideFormConferencia(action) {
            var showFormConferencia = !this.state.showFormConferencia;
            var actionFormConferencia = action;

            this.setState({ showFormConferencia: showFormConferencia, actionFormConferencia: actionFormConferencia });
        }
    }, {
        key: 'showHideFormOutro',
        value: function showHideFormOutro(action) {
            var showFormOutro = !this.state.showFormOutro;
            var actionFormOutro = action;

            this.setState({ showFormOutro: showFormOutro, actionFormOutro: actionFormOutro });
        }
    }, {
        key: 'showHideConselho',
        value: function showHideConselho() {
            var showConselho = !this.state.showConselho;

            if (showConselho === true) {
                this.updateNaoPossui('conselhos');
                this.setState({ showConselhoInfo: false });
            } else {
                this.setState({ showConselhoInfo: true });
            }

            this.setState({ showConselho: showConselho });
        }
    }, {
        key: 'showHideConferencia',
        value: function showHideConferencia() {
            var showConferencia = !this.state.showConferencia;

            if (showConferencia === true) {
                this.updateNaoPossui('conferencias');
                this.setState({ showConferenciaInfo: false });
            } else {
                this.setState({ showConferenciaInfo: true });
            }

            this.setState({ showConferencia: showConferencia });
        }
    }, {
        key: 'showHideOutro',
        value: function showHideOutro() {
            var showOutro = !this.state.showOutro;

            if (showOutro === true) {
                this.updateNaoPossui('outros');
                this.setState({ showOutroInfo: false });
            } else {
                this.setState({ showOutroInfo: true });
            }

            this.setState({ showOutro: showOutro });
        }
    }, {
        key: 'closeFormConselho',
        value: function closeFormConselho() {
            this.setState({ showForm: false });
        }
    }, {
        key: 'closeFormConferencia',
        value: function closeFormConferencia() {
            this.setState({ showFormConferencia: false });
        }
    }, {
        key: 'closeFormOutro',
        value: function closeFormOutro() {
            this.setState({ showFormOutro: false });
        }
    }, {
        key: 'list',
        value: function list() {

            this.setState({ loadingList: true });

            $.ajax({
                method: 'GET',
                //url: getBaseUrl2 + 'osc/participacao_social/611720',
                url: getBaseUrl2 + 'osc/participacao_social/' + this.props.id,
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({
                        conferencias: data.conferencias_politicas_publicas,
                        conselhos: data.conselhos_politicas_publicas,
                        outros: data.outros_espacos_participacao_social,
                        loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'naoPossui',
        value: function naoPossui() {

            $.ajax({
                method: 'GET',
                //url: getBaseUrl2 + 'osc/611720',
                url: getBaseUrl2 + 'osc/' + this.props.id,
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({
                        bo_nao_possui_ps_conselhos: data.bo_nao_possui_ps_conselhos,
                        bo_nao_possui_ps_conferencias: data.bo_nao_possui_ps_conferencias,
                        bo_nao_possui_ps_outros_espacos: data.bo_nao_possui_ps_outros_espacos,

                        showConselho: !data.bo_nao_possui_ps_conselhos,
                        showConferencia: !data.bo_nao_possui_ps_conferencias,
                        showOutro: !data.bo_nao_possui_ps_outros_espacos
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'validate',
        value: function validate() {
            var valid = true;

            var requireds = this.state.requireds;
            var form = this.state.form;

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'updateNaoPossui',
        value: function updateNaoPossui(type, origin) {

            if (!this.validate()) {
                return;
            }
            var data = {};
            if (origin === 'btn') {
                if (type === 'conselhos') {
                    data.bo_nao_possui_ps_conselhos = this.state.showConselho ? false : true;
                }
                if (type === 'conferencias') {
                    data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? false : true;
                }
                if (type === 'outros') {
                    data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? false : true;
                }
            } else {
                if (type === 'conselhos') {
                    data.bo_nao_possui_ps_conselhos = this.state.showConselho ? true : false;
                }
                if (type === 'conferencias') {
                    data.bo_nao_possui_ps_conferencias = this.state.showConferencia ? true : false;
                }
                if (type === 'outros') {
                    data.bo_nao_possui_ps_outros_espacos = this.state.showOutro ? true : false;
                }
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({

                    method: 'PUT',
                    //url: getBaseUrl2 + 'osc/611720',
                    url: getBaseUrl2 + 'osc/' + this.props.id,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: data,
                    cache: false,
                    success: (function (data) {
                        var msg = "Dados alterados com sucesso!";
                        this.setState({ loading: false, msg: msg, showMsg: true, updateOk: true, button: true, type: type, origin: origin });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        var msg = "Ocorreu um erro!";
                        this.setState({ loading: false, msg: msg, showMsg: true, updateOk: false, button: true, type: type });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'removeItem',
        value: function removeItem(id, tipo) {
            var remove = this.state.removeConselho;

            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/ps_' + tipo + '/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {},
                cache: false,
                success: (function (data) {
                    this.list();
                    $('#modalFormExcluir').modal('hide');
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'callModalExcluir',
        value: function callModalExcluir(id, tx_nome_conferencia, tipo) {
            var modalExcluir = this.state.modalExcluir;
            this.setState({
                modalExcluir: modalExcluir,
                removeItemConferencia: id,
                removeItemTx: tx_nome_conferencia,
                removeTipo: tipo
            }, function () {
                $('#modalFormExcluir').modal('show');
            });
        }
    }, {
        key: 'callModal',
        value: function callModal(id, type) {
            var modal = this.state.modal;
            this.setState({
                modal: modal,
                editId: id,
                editTipo: type
            }, function () {
                $('#modalForm').modal('show');
            });
        }
    }, {
        key: 'modalExcluir',
        value: function modalExcluir() {
            var _this = this;

            return React.createElement(
                'div',
                { id: 'modalFormExcluir', className: 'modal fade bd-example-modal-sm', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog modal-lg' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'h4',
                                { className: 'modal-title' },
                                React.createElement(
                                    'strong',
                                    null,
                                    'Excluir permanentemente'
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fechar' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '×'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body' },
                            'Tem certeza que quer excluir "',
                            this.state.removeItemTx,
                            '".'
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                                'Cancelar'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-danger', onClick: function () {
                                        return _this.removeItem(_this.state.removeItemConferencia, _this.state.removeTipo);
                                    } },
                                'Excluir'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'modal',
        value: function modal() {

            var form = null;

            if (this.state.editTipo == 'outra') {
                form = React.createElement(FormEditParticipacaoOutro, {
                    action: this.state.actionForm,
                    list: this.list,
                    id: this.state.editId,
                    id_osc: this.props.id,
                    closeForm: this.closeForm });
            }
            if (this.state.editTipo == 'conferencia') {
                form = React.createElement(FormEditParticipacaoConferencia, {
                    action: this.state.actionForm,
                    list: this.list,
                    id: this.state.editId,
                    id_osc: this.props.id,
                    closeForm: this.closeForm });
            }
            if (this.state.editTipo == 'conselho') {
                form = React.createElement(FormEditParticipacaoConselho, {
                    action: this.state.actionForm,
                    list: this.list,
                    id: this.state.editId,
                    id_osc: this.props.id,
                    closeForm: this.cleanFormConselho });
            }

            return React.createElement(
                'div',
                { id: 'modalForm', className: 'modal fade bd-example-modal-lg', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog modal-lg' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'h4',
                                { className: 'modal-title', id: 'exampleModalLabel' },
                                React.createElement(
                                    'strong',
                                    null,
                                    this.state.modalTitle
                                )
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fechar' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '×'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body' },
                            form
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            /////////////////////////////
            var modal = this.modal();
            var modalExcluir = this.modalExcluir();
            var conselhos = null;

            ////////////////////////////
            if (this.state.conselhos) {
                conselhos = this.state.conselhos.map((function (item, index) {
                    var _this2 = this;

                    return React.createElement(
                        'div',
                        { className: 'col-md-6', style: { border: '0' }, key: "conselho_" + index },
                        React.createElement(
                            'div',
                            { className: 'box-insert-g text-left' },
                            React.createElement(
                                'div',
                                { className: 'box-insert-item box-insert-list' },
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'float-right' },
                                    React.createElement(
                                        'a',
                                        { onClick: function () {
                                                return _this2.callModalExcluir(item.id_conselho, item.dc_conselho.tx_nome_conselho, 'conselho');
                                            }, style: { cursor: 'pointer' } },
                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                                    ),
                                    React.createElement(
                                        'a',
                                        { onClick: function () {
                                                return _this2.callModal(item.id_conselho, 'conselho');
                                            }, style: { cursor: 'pointer' } },
                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                                    )
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Nome do Conselho:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.dc_conselho.tx_nome_conselho
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Periodicidade da Reunião:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Data de início de vigência:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        formatDate(item.dt_data_inicio_conselho, 'pt-br')
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Data de fim de vigência:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        formatDate(item.dt_data_fim_conselho, 'pt-br')
                                    )
                                )
                            )
                        ),
                        React.createElement('br', null),
                        modal
                    );
                }).bind(this));
            }

            var conferencias = null;
            if (this.state.conferencias) {
                conferencias = this.state.conferencias.map((function (item, index) {
                    var _this3 = this;

                    return React.createElement(
                        'div',
                        { className: 'col-md-6', style: { border: '0' }, key: "conferencia_" + index },
                        React.createElement(
                            'div',
                            { className: 'box-insert-m' },
                            React.createElement(
                                'div',
                                { className: 'box-insert-item box-insert-list' },
                                React.createElement('br', null),
                                React.createElement(
                                    'a',
                                    { onClick: function () {
                                            return _this3.callModalExcluir(item.id_conferencia, item.dc_conferencia.tx_nome_conferencia, 'conferencia');
                                        }, style: { cursor: 'pointer' } },
                                    React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                                ),
                                React.createElement(
                                    'a',
                                    { onClick: function () {
                                            return _this3.callModal(item.id_conferencia, 'conferencia');
                                        }, style: { cursor: 'pointer' } },
                                    React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Nome da Conferência:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.dc_conferencia.tx_nome_conferencia
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Ano de realização da conferência:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.dt_ano_realizacao.replace('-01-01', '')
                                    )
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Forma de participação na conferência:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia
                                    )
                                )
                            )
                        ),
                        React.createElement('br', null),
                        modalExcluir
                    );
                }).bind(this));
            }

            var outros = null;
            if (this.state.outros) {
                outros = this.state.outros.map((function (item, index) {
                    var _this4 = this;

                    return React.createElement(
                        'div',
                        { className: 'col-md-6', style: { border: '0' }, key: "outros_" + index },
                        React.createElement(
                            'div',
                            { className: 'box-insert-p' },
                            React.createElement(
                                'div',
                                { className: 'box-insert-item box-insert-list' },
                                React.createElement('br', null),
                                React.createElement(
                                    'a',
                                    { onClick: function () {
                                            return _this4.callModalExcluir(item.id_participacao_social_outra, item.tx_nome_participacao_social_outra, 'outra');
                                        }, style: { cursor: 'pointer' } },
                                    React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                                ),
                                React.createElement(
                                    'a',
                                    { onClick: function () {
                                            return _this4.callModal(item.id_participacao_social_outra, 'outra');
                                        }, style: { cursor: 'pointer' } },
                                    React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.tx_nome_participacao_social_outra
                                    )
                                )
                            )
                        ),
                        React.createElement('br', null)
                    );
                }).bind(this));
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'title-user-area' },
                    React.createElement(
                        'div',
                        { className: 'mn-accordion-icon' },
                        React.createElement('i', { className: 'fa fa-users', 'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        'h3',
                        null,
                        'Espaços de participação social'
                    ),
                    React.createElement('hr', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'box-groups' },
                            React.createElement(
                                'h2',
                                null,
                                'Conselhos de políticas públicas'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox text-center' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkConselho', required: true, onClick: this.showHideConselho, defaultChecked: this.state.bo_nao_possui_ps_conselhos, onChange: this.bo_nao_possui_ps_conselhos }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'checkConselho' },
                                        'Não possui conselhos de políticas públicas'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-danger', style: { display: !this.state.showConselhoInfo ? 'none' : '' } },
                                        this.state.msgEspacos,
                                        ' ',
                                        React.createElement('br', null),
                                        React.createElement(
                                            'a',
                                            { type: 'button', className: 'btn-primary btn-xs float-right', onClick: function () {
                                                    return _this5.updateNaoPossui('conselhos', 'btn');
                                                } },
                                            'Confirmar'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: '10px', float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading && this.state.type === 'conselhos' ? 'block' : 'none' } },
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando ',
                                            React.createElement('br', null),
                                            ' ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg && this.state.type === 'conselhos' && this.state.origin === 'btn' ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                                            React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                                            this.state.msg
                                        ),
                                        React.createElement('br', null)
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row', style: { display: this.state.showConselho ? "" : "none" } },
                                conselhos,
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: ' box-insert-g' },
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert-btn text-center' },
                                            React.createElement(
                                                'a',
                                                { className: 'cursor', onClick: this.showHideFormConselho, style: { display: this.state.showFormConselho ? "none" : "block", marginTop: "50%" } },
                                                React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                React.createElement('br', null),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Novo Conselhos de Políticas Públicas'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.showFormConselho ? 'block' : 'none' } },
                                                React.createElement(
                                                    'a',
                                                    { onClick: this.showHideFormConselho },
                                                    React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                                ),
                                                React.createElement(FormParticipacaoConselho, {
                                                    actionConselho: this.state.actionFormConselho,
                                                    list: this.list,
                                                    id: this.state.editIdConselho,
                                                    id_osc: this.props.id,
                                                    showHideFormConselho: this.showHideFormConselho,
                                                    closeFormConselho: this.closeFormConselho })
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'box-groups' },
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'h2',
                                null,
                                'Conferências de políticas públicas'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox text-center' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkConferencia', required: true, onClick: this.showHideConferencia, defaultChecked: this.state.bo_nao_possui_ps_conferencias, onChange: this.bo_nao_possui_ps_conselhos }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'checkConferencia' },
                                        'Não possui conferências de políticas públicas'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-danger', style: { display: !this.state.showConferenciaInfo ? 'none' : '' } },
                                        this.state.msgEspacos,
                                        ' ',
                                        React.createElement('br', null),
                                        React.createElement(
                                            'a',
                                            { type: 'button', className: 'btn-primary btn-xs float-right', onClick: function () {
                                                    return _this5.updateNaoPossui('conferencias', 'btn');
                                                } },
                                            'Confirmar'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: '10px', float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading && this.state.type === 'conferencias' ? 'block' : 'none' } },
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando ',
                                            React.createElement('br', null),
                                            ' ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg && this.state.type === 'conferencias' && this.state.origin === 'btn' ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                                            React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                                            this.state.msg
                                        ),
                                        React.createElement('br', null)
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row', style: { display: this.state.showConferencia ? "" : "none" } },
                                conferencias,
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-m' },
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert-btn text-center' },
                                            React.createElement(
                                                'a',
                                                { className: 'cursor', onClick: this.showHideFormConferencia, style: { display: this.state.showFormConferencia ? "none" : "block", marginTop: "35%" } },
                                                React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                React.createElement('br', null),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Nova Conferência de Políticas Públicas'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.showFormConferencia ? 'block' : 'none' } },
                                                React.createElement(
                                                    'a',
                                                    { onClick: this.showHideFormConferencia },
                                                    React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                                ),
                                                React.createElement(FormParticipacaoConferencia, {
                                                    action: this.state.actionFormConferencia,
                                                    list: this.list,
                                                    id: this.state.editId,
                                                    id_osc: this.props.id,
                                                    showHideFormConferencia: this.showHideFormConferencia,
                                                    closeFormConferencia: this.closeFormConferencia })
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'box-groups' },
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'h2',
                                null,
                                'Outros espaços de participação social'
                            ),
                            React.createElement(
                                'div',
                                { className: 'text-center' },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox text-center' },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkOutro', required: true, onClick: this.showHideOutro, defaultChecked: this.state.bo_nao_possui_ps_outros_espacos, onChange: this.bo_nao_possui_ps_outros_espacos }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: 'checkOutro' },
                                        'Não possui outros espaços de participação social'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-danger', style: { display: !this.state.showOutroInfo ? 'none' : '' } },
                                        this.state.msgEspacos,
                                        ' ',
                                        React.createElement('br', null),
                                        React.createElement(
                                            'a',
                                            { type: 'button', className: 'btn-primary btn-xs float-right', onClick: function () {
                                                    return _this5.updateNaoPossui('outros', 'btn');
                                                } },
                                            'Confirmar'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: '10px', float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading && this.state.type === 'outros' ? 'block' : 'none' } },
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando ',
                                            React.createElement('br', null),
                                            ' ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg && this.state.type === 'outros' && this.state.origin === 'btn' ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                                            React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                                            this.state.msg
                                        ),
                                        React.createElement('br', null)
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row', style: { display: this.state.showOutro ? "" : "none" } },
                                outros,
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-p' },
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert-btn text-center' },
                                            React.createElement(
                                                'a',
                                                { className: 'cursor', onClick: this.showHideFormOutro, style: { display: this.state.showFormOutro ? "none" : "block", marginTop: "15%" } },
                                                React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                React.createElement('br', null),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Novo Outros espaços de participação social'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.showFormOutro ? 'block' : 'none' } },
                                                React.createElement(
                                                    'a',
                                                    { onClick: this.showHideFormOutro },
                                                    React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                                ),
                                                React.createElement(FormParticipacaoOutro, {
                                                    action: this.state.actionFormOutro,
                                                    list: this.list,
                                                    id: this.state.editId,
                                                    id_osc: this.props.id,
                                                    showHideFormOutro: this.showHideFormOutro,
                                                    closeFormOutro: this.closeFormOutro })
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('br', null)
                        )
                    )
                )
            );
        }
    }]);

    return Participacoes;
})(React.Component);

ReactDOM.render(React.createElement(Participacoes, { id: id }), document.getElementById('participacoes'));
/*<div>
<h3>Titularidade:</h3>
<p>{item.dc_tipo_participacao.tx_nome_tipo_participacao}</p>
<hr/>
</div>*/ /*<a onClick={() => this.callModal(item.id_conferencia)} style={{cursor: 'pointer'}}>*/