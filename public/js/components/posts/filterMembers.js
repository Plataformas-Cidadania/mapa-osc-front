'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MembersFilter = (function (_React$Component) {
    _inherits(MembersFilter, _React$Component);

    function MembersFilter(props) {
        _classCallCheck(this, MembersFilter);

        _get(Object.getPrototypeOf(MembersFilter.prototype), 'constructor', this).call(this, props);
        this.state = {
            members: [],
            search: '',
            showMembers: false,
            membersSelected: [],
            showOtherItems: false
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }

    _createClass(MembersFilter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.setState({membersSelected: this.props.membersUrl});
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            $.ajax({
                method: 'POST',
                url: 'members',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    city: this.props.city,
                    search: this.state.search,
                    midia_id: midia_id
                },
                cache: false,
                success: (function (data) {
                    //console.log(data);

                    //importar membros passadas pela url//////////////
                    var membersUrl = this.props.membersUrl;
                    var membersSelected = this.state.membersSelected;
                    for (var i in data) {
                        for (var j in membersUrl) {
                            if (data[i].id == membersUrl[j]) {
                                var add = true;
                                for (var k in membersSelected) {
                                    //console.log(membersUrl[j], membersSelected[k].id);
                                    if (membersUrl[j] == membersSelected[k].id) {
                                        add = false;
                                    }
                                }
                                if (add) {
                                    membersSelected.push(data[i]);
                                }
                            }
                        }
                    }
                    //console.log('membersSelected', membersSelected);
                    //console.log('membersUrl', this.props.membersUrl);
                    ////////////////////////////////////////////////////
                    this.props.qtdMen(data.length);

                    this.setState({ members: data, membersSelected: membersSelected, loading: false });
                    //this.setState({loading: false, ads:data})
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'clickSearch',
        value: function clickSearch() {
            var showMembers = !this.state.showMembers;
            this.setState({ showMembers: showMembers }, function () {
                this.load();
            });
        }
    }, {
        key: 'handleSearch',
        value: function handleSearch(e) {
            this.setState({ search: e.target.value }, function () {
                this.load();
            });
        }
    }, {
        key: 'addMember',
        value: function addMember(item) {
            //console.log('addMember', item);
            var add = true;
            this.state.membersSelected.find(function (memb) {
                if (item.titulo == memb.titulo) {
                    add = false;
                }
            });
            if (add) {
                var membersSelected = this.state.membersSelected;
                membersSelected.push(item);
                console.log('addMember - membersSelected', membersSelected);
                this.setState({ showMembers: false });
                this.setState({ membersSelected: membersSelected }, function () {
                    this.props.filterMembers(this.state.membersSelected);
                });
            }
        }
    }, {
        key: 'removeMember',
        value: function removeMember(e) {

            var membersSelected = this.state.membersSelected;
            var member = {};
            membersSelected.find(function (item) {
                if (item.id == e.target.id) {
                    member = item;
                }
            });
            var index = membersSelected.indexOf(member);
            membersSelected.splice(index, 1);
            this.setState({ membersSelected: membersSelected }, function () {
                this.props.filterMembers(this.state.membersSelected);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var qtdItems = this.state.members.length;
            var showQtdItems = 5;

            var firstMembers = this.state.members.map((function (item, index) {
                var _this = this;

                if (index < showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.titulo.substr(0, sizeSearch);
                    var lastPiece = item.titulo.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.membersSelected.find(function (memb) {
                        if (item.titulo == memb.titulo) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'div',
                        { key: 'memb_' + item.id, className: 'list-user', style: { cursor: 'pointer', color: color },
                            onClick: function () {
                                return _this.addMember(item);
                            } },
                        React.createElement('img', { src: "imagens/integrantes/" + item.imagem, alt: '',
                            className: 'rounded-circle float-left', width: '40' }),
                        React.createElement(
                            'h4',
                            null,
                            React.createElement(
                                'u',
                                null,
                                firstPiece
                            ),
                            lastPiece,
                            React.createElement(
                                'span',
                                { className: 'badge badge-primary badge-pill float-right', style: { margin: '8px 20px 0 0' } },
                                qtd
                            )
                        ),
                        React.createElement('hr', null)
                    );
                }
            }).bind(this));

            var otherMembers = this.state.members.map((function (item, index) {
                var _this2 = this;

                if (index >= showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.titulo.substr(0, sizeSearch);
                    var lastPiece = item.titulo.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.membersSelected.find(function (memb) {
                        if (item.titulo == memb.titulo) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'div',
                        { key: 'memb_' + item.id, className: 'list-user',
                            style: { cursor: 'pointer', color: color, display: this.state.showOtherItems ? '' : 'none' },
                            onClick: function () {
                                return _this2.addMember(item);
                            } },
                        React.createElement('img', { src: "imagens/integrantes/" + item.imagem, alt: '',
                            className: 'rounded-circle float-left', width: '40' }),
                        React.createElement(
                            'h4',
                            null,
                            React.createElement(
                                'u',
                                null,
                                firstPiece
                            ),
                            lastPiece,
                            ' - ',
                            qtd
                        ),
                        React.createElement('hr', null)
                    );
                }
            }).bind(this));

            var membersSelected = this.state.membersSelected.map((function (item) {
                return React.createElement(
                    'button',
                    { key: "btn_member_" + item.id, id: item.id, onClick: this.removeMember, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                    item.titulo,
                    ' ',
                    React.createElement('i', { className: 'fas fa-times' })
                );
            }).bind(this));

            return React.createElement(
                'div',
                null,
                membersSelected,
                React.createElement(
                    'div',
                    { className: 'input-icon filter-input-icon' },
                    React.createElement('input', { type: 'text', name: 'titleMember', className: 'filter-search', onClick: this.clickSearch, onChange: this.handleSearch }),
                    React.createElement('i', { className: 'fas fa-search' })
                ),
                firstMembers,
                otherMembers,
                React.createElement(
                    'div',
                    { style: { display: qtdItems - showQtdItems > 0 ? '' : 'none' } },
                    React.createElement(
                        'h4',
                        { className: 'btn-plus float-right', style: { display: !this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: function () {
                                return _this3.setState({ showOtherItems: true });
                            } },
                        'Mais ',
                        qtdItems - showQtdItems,
                        ' ',
                        React.createElement('i', { className: 'fas fa-angle-down' })
                    ),
                    React.createElement(
                        'h4',
                        { className: 'btn-plus float-right', style: { display: this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: function () {
                                return _this3.setState({ showOtherItems: false });
                            } },
                        'Menos ',
                        qtdItems - showQtdItems,
                        ' ',
                        React.createElement('i', { className: 'fas fa-angle-up' })
                    )
                )
            );
        }
    }]);

    return MembersFilter;
})(React.Component);

/*{members}*/