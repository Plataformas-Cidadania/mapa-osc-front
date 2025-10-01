'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projetos = (function (_React$Component) {
    _inherits(Projetos, _React$Component);

    function Projetos(props) {
        _classCallCheck(this, Projetos);

        _get(Object.getPrototypeOf(Projetos.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            projetos: [],
            cd_projeto: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            projeto: {},
            editId: 0,
            editTipo: ''
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
        this.callModal = this.callModal.bind(this);
    }

    _createClass(Projetos, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
        }
    }, {
        key: 'removeItem',
        value: function removeItem(id) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/projeto/' + id,
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
        value: function callModalExcluir(id, title) {
            var modalExcluir = this.state.modalExcluir;
            this.setState({
                modalExcluir: modalExcluir,
                removeItemConferencia: id,
                removeItemTx: title
            }, function () {
                $('#modalFormExcluir').modal('show');
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
                            React.createElement(
                                'strong',
                                null,
                                this.state.removeItemTx
                            ),
                            '"? Todas as informações cadastradas serão perdidas.'
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

        /*edit(id, type){
            this.setState({actionForm: 'edit', editId: id, editTipo:type,}, function(){
                this.callModal();
            });
        }*/

    }, {
        key: 'cancelRemove',
        value: function cancelRemove(id) {
            var remove = this.state.remove;
            remove[id] = false;
            this.setState({ remove: remove });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var remove = this.state.remove;

            if (!remove[id]) {
                remove[id] = true;
                this.setState({ remove: remove });
                return;
            }

            var loadingRemove = this.state.loadingRemove;
            loadingRemove[id] = true;
            this.setState({ loadingRemove: loadingRemove });
            $.ajax({
                method: 'GET',
                url: 'remove-user-projeto/' + id,
                data: {},
                cache: false,
                success: (function (data) {
                    //console.log(data);
                    this.list();
                    var loadingRemove = this.state.loadingRemove;
                    loadingRemove[id] = false;
                    this.setState({ loadingRemove: loadingRemove });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    var loadingRemove = this.state.loadingRemove;
                    loadingRemove[id] = false;
                    //this.setState({loadingRemove: loadingRemove});
                }).bind(this)
            });
        }
    }, {
        key: 'showHideForm',
        value: function showHideForm(action) {
            var showForm = !this.state.showForm;

            /*let action = this.state.actionForm;
            if(showForm){
                let actionForm = 'new';
            }
              this.setState({showForm: showForm, actionForm: action});*/

            var actionForm = action;

            this.setState({ showForm: showForm, actionForm: actionForm });
        }
    }, {
        key: 'closeForm',
        value: function closeForm() {
            this.setState({ showForm: false });
        }
    }, {
        key: 'list',
        value: function list() {

            this.setState({ loadingList: true });

            $.ajax({
                method: 'GET',
                //url: getBaseUrl2 + 'osc/projetos/455128',
                url: getBaseUrl2 + 'osc/projetos/' + this.props.id,
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ projetos: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'callModal',
        value: function callModal(id, type, txt) {
            var modal = this.state.modal;
            this.setState({
                modal: modal,
                editId: id,
                editTipo: type,
                modalTitle: txt
            }, function () {
                $('#modalForm').modal('show');
            });
        }
    }, {
        key: 'modal',
        value: function modal() {

            var form = '';

            if (this.state.editTipo == 'insert') {
                form = React.createElement(FormProjeto, { action: this.state.actionForm, list: this.list, id: this.state.editId, id_osc: this.props.id, showHideForm: this.showHideForm, closeForm: this.closeForm });
            }
            if (this.state.editTipo == 'edit') {
                form = React.createElement(FormEditProjeto, { action: this.state.actionForm, list: this.list, id: this.state.editId, id_osc: this.props.id, showHideForm: this.showHideForm, closeForm: this.closeForm });
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
            var _this3 = this;

            var modal = this.modal();
            var modalExcluir = this.modalExcluir();

            var projetos = this.state.projetos.map((function (item, index) {
                var _this2 = this;

                return React.createElement(
                    'tr',
                    { key: "projeto_" + index },
                    React.createElement(
                        'td',
                        null,
                        item.titulo
                    ),
                    React.createElement(
                        'td',
                        null,
                        formatDate(item.data_inicio, 'pt-br')
                    ),
                    React.createElement(
                        'td',
                        { width: '70' },
                        React.createElement(
                            'a',
                            { onClick: function () {
                                    return _this2.callModal(item.id, 'edit', 'Alterar projeto');
                                }, className: 'cursor' },
                            React.createElement('i', { className: 'far fa-edit text-primary' })
                        ),
                        '  ',
                        React.createElement(
                            'a',
                            { onClick: function () {
                                    return _this2.callModalExcluir(item.id, item.titulo);
                                }, style: { cursor: 'pointer', position: 'relative', top: '4px' } },
                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                        )
                    )
                );
            }).bind(this));

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'title-user-area' },
                    React.createElement(
                        'div',
                        { className: 'mn-accordion-icon' },
                        React.createElement('i', { className: 'fa fa-project-diagram', 'aria-hidden': 'true' })
                    ),
                    ' ',
                    React.createElement(
                        'h3',
                        null,
                        'Projetos'
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        'Você tem ',
                        this.state.projetos.length,
                        ' projetos cadastrados'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement(
                    'div',
                    { style: { display: this.state.loadingList ? 'true' : 'none' } },
                    React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'table',
                            { className: 'table' },
                            React.createElement(
                                'thead',
                                { className: 'bg-pri text-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'Titulo / Projeto'
                                    ),
                                    React.createElement(
                                        'th',
                                        { scope: 'col' },
                                        'Início da validade'
                                    ),
                                    React.createElement('th', { scope: 'col' })
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                projetos
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { float: 'right', cursor: 'pointer' } },
                            React.createElement(
                                'a',
                                { onClick: function () {
                                        return _this3.callModal(0, 'insert', 'Inserir projeto');
                                    }, className: 'btn btn-warning' },
                                React.createElement('i', { className: 'fa fa-plus' }),
                                ' Adicionar novo projeto'
                            )
                        )
                    ),
                    modal,
                    modalExcluir
                )
            );
        }
    }]);

    return Projetos;
})(React.Component);

ReactDOM.render(React.createElement(Projetos, { id: id }), document.getElementById('projetos'));