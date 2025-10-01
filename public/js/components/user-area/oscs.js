'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Oscs = (function (_React$Component) {
    _inherits(Oscs, _React$Component);

    function Oscs(props) {
        _classCallCheck(this, Oscs);

        _get(Object.getPrototypeOf(Oscs.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loadingSearch: false,
            search: '',
            oscs: [],
            oscsModal: [],
            oscsSearch: [],
            editId: 0,
            idOscRemove: 0,
            termos: [], // lista completa de termos
            termoAtual: null, // termo que precisa ser assinado
            signedOscs: [], // OSCs assinadas para o termoAtual
            loadingSignId: null,
            listRemove: [], // assinaturas já existentes
            showModal: false,
            showModalAdd: false, // modal de adicionar OSC
            osc_id: null,
            representacaoId: null
        };

        this.list = this.list.bind(this);
        this.getAssinaturasTermos = this.getAssinaturasTermos.bind(this);
        this.loadProximoTermo = this.loadProximoTermo.bind(this);
        this.getModal = this.getModal.bind(this);
        this.signTerm = this.signTerm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.listSearch = this.listSearch.bind(this);
        this.addOsc = this.addOsc.bind(this);
        this.askRemove = this.askRemove.bind(this);
        this.removeOsc = this.removeOsc.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    _createClass(Oscs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            return regeneratorRuntime.async(function componentDidMount$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(this.getAssinaturasTermos());

                    case 2:
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(this.list());

                    case 4:
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(this.loadProximoTermo());

                    case 6:
                        this.getModal();

                    case 7:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'getAssinaturasTermos',
        value: function getAssinaturasTermos() {
            var _this = this;

            var token = localStorage.getItem('@App:token');
            return new Promise(function (resolve) {
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + 'osc/assinatura-termos',
                    headers: { Authorization: 'Bearer ' + token },
                    cache: false,
                    success: function success(data) {
                        return _this.setState({ listRemove: data }, resolve);
                    },
                    error: function error(xhr, status, err) {
                        console.error(err);resolve();
                    }
                });
            });
        }
    }, {
        key: 'loadProximoTermo2',
        value: function loadProximoTermo2() {
            var _this2 = this;

            var token = localStorage.getItem('@App:token');
            fetch(getBaseUrl2 + 'osc/termos', { headers: { Authorization: 'Bearer ' + token } }).then(function (res) {
                if (!res.ok) throw new Error('Erro ao buscar termos');
                return res.json();
            }).then(function (data) {
                // --- 1) pega todos os termos e o último cadastrado
                var termos = Array.isArray(data) ? data : [data];
                if (!termos.length) {
                    _this2.setState({ termos: termos, termoAtual: null, showModal: false });
                    return;
                }
                var ultimo = termos[termos.length - 1];

                // --- 2) filtra somente as assinaturas desse termo
                var assinaturasDoTermo = _this2.state.listRemove.filter(function (sig) {
                    return sig.id_termo === ultimo.id_termo;
                });

                // --- 3) extrai os id_representacao já assinados
                var repsAssinadas = assinaturasDoTermo.map(function (sig) {
                    return sig.representacao.id_representacao;
                });

                // --- 4) monta a lista de OSCs que ainda faltam assinar
                var pendentes = _this2.state.oscs.filter(function (osc) {
                    return !repsAssinadas.includes(osc.id_representacao);
                });

                // --- 5) só abre o modal se ainda existir alguma pendente
                _this2.setState({
                    termos: termos,
                    termoAtual: pendentes.length ? ultimo : null,
                    showModal: pendentes.length > 0
                });
            })['catch'](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'loadProximoTermo',
        value: function loadProximoTermo() {
            var _this3 = this;

            var token = localStorage.getItem('@App:token');
            fetch(getBaseUrl2 + 'osc/termos', { headers: { Authorization: 'Bearer ' + token } }).then(function (res) {
                if (!res.ok) throw new Error('Erro ao buscar termos');
                return res.json();
            }).then(function (data) {
                var termos = Array.isArray(data) ? data : [data];
                if (!termos.length) {
                    return _this3.setState({ termos: termos, termoAtual: null, oscsModal: [], showModal: false });
                }

                // Pega o último termo
                var ultimo = termos[termos.length - 1];

                // Quais assinaturas já existem para ele?
                var assinaturasDoTermo = _this3.state.listRemove.filter(function (sig) {
                    return sig.id_termo === ultimo.id_termo;
                });

                var repsAssinadas = assinaturasDoTermo.map(function (sig) {
                    return sig.representacao.id_representacao;
                });

                // Filtra só as OSCs que AINDA NÃO assinaram
                var oscsModal = _this3.state.oscs.filter(function (osc) {
                    return !repsAssinadas.includes(osc.id_representacao);
                });

                // Atualiza o state com o modal apenas se houver pendentes
                _this3.setState({
                    termos: termos,
                    termoAtual: oscsModal.length ? ultimo : null,
                    oscsModal: oscsModal,
                    showModal: oscsModal.length > 0
                });
            })['catch'](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'getModal',
        value: function getModal() {
            var _this4 = this;

            fetch(getBaseUrl2 + 'osc/termos', { headers: { Authorization: 'Bearer ' + localStorage.getItem('@App:token') } }).then(function (res) {
                if (!res.ok) throw new Error('Erro ao buscar termo');return res.json();
            }).then(function (data) {
                var lastTermo = Array.isArray(data) && data.length ? data[data.length - 1] : data;
                _this4.setState({ termo: lastTermo, showModalAdd: true });
            })['catch'](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ showModal: false });
        }
    }, {
        key: 'list',
        value: function list() {
            var token, _ret;

            return regeneratorRuntime.async(function list$(context$2$0) {
                var _this6 = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        this.setState({ loadingList: true });
                        token = localStorage.getItem('@App:token');
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap((function callee$2$0() {
                            var resOs, oscs, resUser, user, oscsComRep, signedReps, oscsModal;
                            return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                                var _this5 = this;

                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return regeneratorRuntime.awrap(fetch(getBaseUrl2 + 'osc/list-oscs-usuario', { headers: { Authorization: 'Bearer ' + token } }));

                                    case 2:
                                        resOs = context$3$0.sent;
                                        context$3$0.next = 5;
                                        return regeneratorRuntime.awrap(resOs.json());

                                    case 5:
                                        oscs = context$3$0.sent;

                                        if (!(!Array.isArray(oscs) || !oscs.length)) {
                                            context$3$0.next = 8;
                                            break;
                                        }

                                        return context$3$0.abrupt('return', {
                                            v: this.setState({ loadingList: false, oscs: [] })
                                        });

                                    case 8:
                                        context$3$0.next = 10;
                                        return regeneratorRuntime.awrap(fetch(getBaseUrl2 + 'get-user-auth', { headers: { Authorization: 'Bearer ' + token } }));

                                    case 10:
                                        resUser = context$3$0.sent;
                                        context$3$0.next = 13;
                                        return regeneratorRuntime.awrap(resUser.json());

                                    case 13:
                                        user = context$3$0.sent;
                                        context$3$0.next = 16;
                                        return regeneratorRuntime.awrap(Promise.all(oscs.map(function callee$3$0(osc) {
                                            var repRes, repData;
                                            return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                                                while (1) switch (context$4$0.prev = context$4$0.next) {
                                                    case 0:
                                                        context$4$0.next = 2;
                                                        return regeneratorRuntime.awrap(fetch(getBaseUrl2 + 'osc/representacao/' + osc.id_osc + '/' + user.id_usuario, { headers: { Authorization: 'Bearer ' + token } }));

                                                    case 2:
                                                        repRes = context$4$0.sent;
                                                        context$4$0.next = 5;
                                                        return regeneratorRuntime.awrap(repRes.json());

                                                    case 5:
                                                        repData = context$4$0.sent;
                                                        return context$4$0.abrupt('return', _extends({}, osc, { id_representacao: repData.id_representacao }));

                                                    case 7:
                                                    case 'end':
                                                        return context$4$0.stop();
                                                }
                                            }, null, _this5);
                                        })));

                                    case 16:
                                        oscsComRep = context$3$0.sent;
                                        signedReps = this.state.listRemove.filter(function (sig) {
                                            return _this5.state.termoAtual && sig.id_termo === _this5.state.termoAtual.id_termo;
                                        }).map(function (sig) {
                                            return sig.representacao.id_representacao;
                                        });
                                        oscsModal = oscsComRep.filter(function (osc) {
                                            return !signedReps.includes(osc.id_representacao);
                                        });

                                        this.setState({
                                            oscs: oscsComRep,
                                            oscsModal: oscsModal,
                                            osc_id: oscsComRep[0].id_osc,
                                            representacaoId: oscsComRep[0].id_representacao,
                                            loadingList: false
                                        });

                                    case 20:
                                    case 'end':
                                        return context$3$0.stop();
                                }
                            }, null, _this6);
                        })());

                    case 5:
                        _ret = context$2$0.sent;

                        if (!(typeof _ret === 'object')) {
                            context$2$0.next = 8;
                            break;
                        }

                        return context$2$0.abrupt('return', _ret.v);

                    case 8:
                        context$2$0.next = 14;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.error(context$2$0.t0);
                        this.setState({ loadingList: false });

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 10]]);
        }
    }, {
        key: 'signTerm',
        value: function signTerm(idOsc, representacaoId) {
            var _this7 = this;

            this.setState({ loadingSignId: idOsc });
            var token = localStorage.getItem('@App:token');
            var termoId = this.state.termoAtual.id_termo;

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/assinatura-termos',
                data: { id_osc: idOsc, id_representacao: representacaoId, id_termo: termoId },
                headers: { Authorization: 'Bearer ' + token },
                success: function success() {
                    var signed = [].concat(_toConsumableArray(_this7.state.signedOscs), [idOsc]);
                    var allSigned = signed.length === _this7.state.oscsModal.length;
                    if (!allSigned) {
                        _this7.setState({ signedOscs: signed, loadingSignId: null });
                    } else {
                        _this7.setState({ loadingSignId: null, signedOscs: [] }, function callee$3$0() {
                            return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                                while (1) switch (context$4$0.prev = context$4$0.next) {
                                    case 0:
                                        context$4$0.next = 2;
                                        return regeneratorRuntime.awrap(this.getAssinaturasTermos());

                                    case 2:
                                        context$4$0.next = 4;
                                        return regeneratorRuntime.awrap(this.loadProximoTermo());

                                    case 4:
                                        this.list();

                                    case 5:
                                    case 'end':
                                        return context$4$0.stop();
                                }
                            }, null, _this7);
                        });
                    }
                },
                error: function error(xhr, status, err) {
                    console.error(err);_this7.setState({ loadingSignId: null });
                }
            });
        }
    }, {
        key: 'handleSearch',
        value: function handleSearch(e) {
            var _this8 = this;

            var val = e.target.value || ' ';
            this.setState({ search: val }, function () {
                return _this8.listSearch(_this8.state.search);
            });
        }
    }, {
        key: 'clickSearch',
        value: function clickSearch() {
            this.listSearch(this.state.search || ' ');
        }
    }, {
        key: 'listSearch',
        value: function listSearch(search) {
            var _this9 = this;

            if (search.length < 4) return;
            this.setState({ loadingSearch: true, oscsSearch: [] });
            var term = search.replace('/', '').normalize('NFD').replace(/[̀-ͯ]/g, '');
            term = term.startsWith('0') ? term.slice(1) : term;
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'busca/osc/' + term,
                cache: false,
                success: function success(data) {
                    return _this9.setState({ oscsSearch: data, loadingSearch: false });
                },
                error: function error(xhr, status, err) {
                    return _this9.setState({ loadingSearch: false });
                }
            });
        }
    }, {
        key: 'addOsc',
        value: function addOsc(id_osc) {
            var _this10 = this;

            $.ajax({ method: 'POST', url: getBaseUrl2 + 'osc/representacao', data: { id_osc: id_osc }, headers: { Authorization: 'Bearer ' + localStorage.getItem('@App:token') },
                success: function success() {
                    _this10.setState({ search: '' });_this10.list();
                },
                error: function error() {
                    return _this10.setState({ loadingSearch: false });
                }
            });
        }
    }, {
        key: 'askRemove',
        value: function askRemove(id_osc) {
            this.setState({ idOscRemove: id_osc });
        }
    }, {
        key: 'cancelRemove',
        value: function cancelRemove() {
            this.setState({ idOscRemove: 0 });
        }
    }, {
        key: 'removeOsc',
        value: function removeOsc(id_osc) {
            var _this11 = this;

            $.ajax({ method: 'DELETE', url: getBaseUrl2 + 'osc/representacao/' + id_osc, headers: { Authorization: 'Bearer ' + localStorage.getItem('@App:token') },
                success: function success() {
                    return _this11.list();
                }, error: function error() {
                    return _this11.setState({ loadingSearch: false });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            var _state = this.state;
            var termoAtual = _state.termoAtual;
            var showModal = _state.showModal;
            var oscsModal = _state.oscsModal;
            var loadingSignId = _state.loadingSignId;
            var signedOscs = _state.signedOscs;
            var oscs = _state.oscs;
            var search = _state.search;
            var oscsSearch = _state.oscsSearch;
            var loadingSearch = _state.loadingSearch;
            var idOscRemove = _state.idOscRemove;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'title-user-area' },
                    React.createElement(
                        'h3',
                        null,
                        React.createElement('i', { className: 'fas fa-list-alt' }),
                        ' Minhas OSCs'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Nessa área você pode gerenciar sua OSC ou várias'
                    ),
                    React.createElement(
                        'a',
                        { className: 'btn btn-primary float-right', 'data-toggle': 'modal', 'data-target': '#exampleModal', style: { marginTop: '-80px' } },
                        React.createElement('i', { className: 'fa fa-plus' }),
                        ' Adicionar OSC'
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
                            'table',
                            { className: 'table' },
                            React.createElement(
                                'thead',
                                { className: 'thead-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        'ID'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Nome da OSC'
                                    ),
                                    React.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        'Ações'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                oscs.map(function (item, index) {
                                    return React.createElement(
                                        'tr',
                                        { key: item.id_osc },
                                        React.createElement(
                                            'th',
                                            { scope: 'row' },
                                            index + 1
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            item.tx_razao_social_osc
                                        ),
                                        React.createElement(
                                            'td',
                                            { className: 'text-right', width: '500' },
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-outline-primary' },
                                                React.createElement(
                                                    'a',
                                                    { href: 'selo-osc-user/' + item.id_osc },
                                                    ' Certificado'
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-outline-primary' },
                                                React.createElement(
                                                    'a',
                                                    { href: 'declaracao/' + item.id_osc, target: '_blank' },
                                                    ' ',
                                                    React.createElement('i', { className: 'fas fa-certificate' }),
                                                    ' Declaração'
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-outline-primary' },
                                                React.createElement(
                                                    'a',
                                                    { href: 'detalhar/' + item.id_osc + '/' + item.tx_razao_social_osc },
                                                    React.createElement('i', { className: 'fas fa-binoculars' }),
                                                    ' Visualizar'
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-success' },
                                                React.createElement(
                                                    'a',
                                                    { href: 'osc-user/' + item.id_osc },
                                                    React.createElement('i', { className: 'far fa-edit' }),
                                                    ' Editar'
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-danger', style: { display: item.id_osc === idOscRemove ? 'none' : '' }, onClick: function () {
                                                        return _this12.askRemove(item.id_osc);
                                                    } },
                                                React.createElement(
                                                    'a',
                                                    { style: { cursor: 'pointer' } },
                                                    React.createElement('i', { className: 'fa fa-trash' })
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-light', style: { display: item.id_osc === idOscRemove ? '' : 'none' }, onClick: function () {
                                                        return _this12.cancelRemove();
                                                    } },
                                                React.createElement(
                                                    'a',
                                                    { style: { cursor: 'pointer' }, title: 'Cancelar' },
                                                    React.createElement('i', { className: 'fa fa-undo' })
                                                )
                                            ),
                                            ' ',
                                            React.createElement(
                                                'div',
                                                { className: 'btn btn-danger', style: { display: item.id_osc === idOscRemove ? '' : 'none' }, onClick: function () {
                                                        return _this12.removeOsc(item.id_osc);
                                                    } },
                                                React.createElement(
                                                    'a',
                                                    { style: { cursor: 'pointer' }, title: 'Remover' },
                                                    React.createElement('i', { className: 'fa fa-times' })
                                                )
                                            )
                                        )
                                    );
                                })
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'modal fade', id: 'exampleModal', tabIndex: '-1', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
                    React.createElement(
                        'div',
                        { className: 'modal-dialog' },
                        React.createElement(
                            'div',
                            { className: 'modal-content' },
                            React.createElement(
                                'div',
                                { className: 'modal-header' },
                                React.createElement(
                                    'h5',
                                    { className: 'modal-title', id: 'exampleModalLabel' },
                                    'Adicione uma OSC'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                                    React.createElement(
                                        'span',
                                        null,
                                        '×'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-body' },
                                React.createElement('input', { className: 'form-control', placeholder: 'Digite o CNPJ...', onClick: this.clickSearch, onChange: this.handleSearch, value: search }),
                                React.createElement('br', null),
                                React.createElement(
                                    'ul',
                                    { className: 'box-search-itens', style: { display: search ? '' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'text-center' },
                                        React.createElement('img', { src: '/img/load.gif', width: '60', style: { display: loadingSearch ? '' : 'none' } })
                                    ),
                                    oscsSearch.map(function (item) {
                                        return React.createElement(
                                            'li',
                                            { key: item.id_osc, className: 'list-group-item', onClick: function () {
                                                    return _this12.addOsc(item.id_osc);
                                                } },
                                            item.tx_nome_osc
                                        );
                                    })
                                )
                            )
                        )
                    )
                ),
                showModal && termoAtual && React.createElement(
                    'div',
                    { className: 'modal-overlay', style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'h2',
                            null,
                            'Termo ',
                            termoAtual.id_termo
                        ),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: termoAtual.tx_nome } }),
                        React.createElement(
                            'table',
                            { className: 'table' },
                            React.createElement(
                                'thead',
                                { className: 'thead-light' },
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        null,
                                        'Nome da OSC'
                                    ),
                                    React.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        'Ação'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                oscsModal.map(function (item) {
                                    var isSigned = signedOscs.includes(item.id_osc);
                                    var isLoading = loadingSignId === item.id_osc;
                                    return React.createElement(
                                        'tr',
                                        { key: item.id_osc },
                                        React.createElement(
                                            'th',
                                            null,
                                            item.tx_razao_social_osc
                                        ),
                                        React.createElement(
                                            'td',
                                            { className: 'text-center' },
                                            React.createElement(
                                                'button',
                                                { className: isSigned ? 'open-btn-sus' : 'open-btn', onClick: function () {
                                                        return _this12.signTerm(item.id_osc, item.id_representacao);
                                                    }, disabled: isSigned || isLoading, style: { marginTop: 0 } },
                                                isSigned ? 'Assinado' : isLoading ? 'Enviando…' : 'Aceitar termo'
                                            )
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Oscs;
})(React.Component);

ReactDOM.render(React.createElement(Oscs, null), document.getElementById('oscs'));
/* Modal adicionar OSC */ /* Modal termos */