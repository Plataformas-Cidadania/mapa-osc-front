'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Addresses = (function (_React$Component) {
    _inherits(Addresses, _React$Component);

    function Addresses(props) {
        _classCallCheck(this, Addresses);

        _get(Object.getPrototypeOf(Addresses.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            addresses: [],
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Endereço principal',
                2: ' '
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            address: {},
            editId: 0
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    _createClass(Addresses, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
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

            //console.log(age);

            return age;
        }
    }, {
        key: 'edit',
        value: function edit(id) {
            // this.setState({actionForm: 'edit'});
            this.setState({ actionForm: 'edit', showForm: false, editId: id });
        }
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
                url: 'remove-user-address/' + id,
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
                method: 'POST',
                url: 'list-users-addresses',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {},
                cache: false,
                success: (function (data) {
                    console.log(data);
                    this.setState({ addresses: data, loadingList: false });
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

            //console.log(this.state.showForm);
            //console.log('state.remove', this.state.remove);

            var addresses = this.state.addresses.map((function (item, index) {
                var _this = this;

                var hr = null;
                if (index < this.state.addresses.length - 1) {
                    hr = React.createElement('hr', null);
                }

                return React.createElement(
                    'div',
                    { className: 'col-md-6', key: "address_" + item.id },
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        React.createElement(
                            'div',
                            { className: 'panel-body' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-offset-9 col-md-1' },
                                    React.createElement(
                                        'a',
                                        { href: '#', onClick: function () {
                                                return _this.edit(item.id);
                                            } },
                                        React.createElement('i', { className: 'fa fa-pencil fa-2x' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-1' },
                                    React.createElement(
                                        'a',
                                        { href: '#', onClick: function () {
                                                return _this.remove(item.id);
                                            }, style: { display: this.state.loadingRemove[item.id] ? 'none' : 'block' } },
                                        React.createElement('i', { className: "fa  fa-2x " + (this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash") })
                                    ),
                                    React.createElement(
                                        'a',
                                        { href: '#', onClick: function () {
                                                return _this.cancelRemove(item.id);
                                            }, style: { display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none' } },
                                        React.createElement('i', { className: "fa  fa-2x fa-undo" })
                                    ),
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id] ? '' : 'none' } })
                                )
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'h3',
                                    null,
                                    item.nome
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    item.endereco,
                                    ', ',
                                    item.numero,
                                    ', ',
                                    item.complemento
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    item.bairro
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    item.cep
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    item.cidade,
                                    ' - ',
                                    item.estado
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    this.state.tipo[item.tipo]
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'OBS: '
                                    ),
                                    item.obs
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row text-right' },
                                React.createElement(
                                    'h6',
                                    null,
                                    this.state.principal[item.principal],
                                    '    '
                                )
                            )
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
                        'h3',
                        null,
                        React.createElement(
                            'div',
                            { style: { float: 'left' } },
                            React.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                            ' Endereços cadastrados'
                        ),
                        React.createElement(
                            'div',
                            { style: { float: 'right', display: this.state.addresses.length < maxAddresses ? 'block' : 'none' } },
                            React.createElement(
                                'a',
                                { href: '#', onClick: this.showHideForm },
                                React.createElement('i', { className: 'fa fa-plus', style: { display: this.state.showForm ? "none" : "block" } })
                            ),
                            React.createElement(
                                'a',
                                { href: '#', onClick: this.showHideForm },
                                React.createElement('i', { className: 'fa fa-times', style: { display: this.state.showForm ? "block" : "none" } })
                            )
                        ),
                        React.createElement('div', { style: { clear: 'both' } })
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Você tem ',
                        this.state.addresses.length,
                        ' endereços cadastrados'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement(
                    'div',
                    { style: { display: this.state.showForm ? 'block' : 'none' } },
                    React.createElement(FormAddress, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
                ),
                React.createElement(
                    'div',
                    { style: { display: this.state.loadingList ? 'true' : 'none' } },
                    React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    addresses
                )
            );
        }
    }]);

    return Addresses;
})(React.Component);

ReactDOM.render(React.createElement(Addresses, null), document.getElementById('addresses'));
/*<FormAddress action={this.state.actionForm} list={this.list}/>*/