'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = (function (_React$Component) {
    _inherits(Filters, _React$Component);

    function Filters(props) {
        _classCallCheck(this, Filters);

        _get(Object.getPrototypeOf(Filters.prototype), 'constructor', this).call(this, props);
        this.state = {
            categories: [],
            members: [],
            archives: [],
            qtdCat: 0,
            qtdMen: 0
        };

        this.load = this.load.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);

        this.qtdCat = this.qtdCat.bind(this);
        this.qtdMen = this.qtdMen.bind(this);
    }

    _createClass(Filters, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            $.ajax({
                method: 'GET',
                url: 'filters',
                data: {
                    filters: {
                        teste: 1
                    }
                },
                cache: false,
                success: (function (data) {
                    this.setState({ loading: false, ads: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'filterCategories',
        value: function filterCategories(categories) {
            this.setState({ categories: categories }, function () {
                this.props.filterCategories(categories);
            });
        }
    }, {
        key: 'filterMembers',
        value: function filterMembers(members) {
            this.setState({ members: members }, function () {
                this.props.filterMembers(members);
            });
        }
    }, {
        key: 'filterArchives',
        value: function filterArchives(archives) {
            this.setState({ archives: archives }, function () {
                this.props.filterArchives(archives);
            });
        }
    }, {
        key: 'qtdCat',
        value: function qtdCat(qtd) {
            this.setState({ qtdCat: qtd });
        }
    }, {
        key: 'qtdMen',
        value: function qtdMen(qtd) {
            this.setState({ qtdMen: qtd });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(Search, { setSearch: this.props.setSearch }),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement('div', { className: 'line-color' }),
                    React.createElement(
                        'h2',
                        null,
                        React.createElement('i', { className: 'far fa-calendar' }),
                        ' Arquivo'
                    ),
                    React.createElement(ArchivesFilter, { filterArchives: this.filterArchives, archivesUrl: this.props.archivesUrl })
                ),
                React.createElement(
                    'div',
                    { style: { display: parseInt(this.state.qtdCat) < 1 ? 'none' : '' } },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('div', { className: 'line-color' }),
                    React.createElement(
                        'h2',
                        null,
                        React.createElement('i', { className: 'far fa-folder-open' }),
                        ' Categorias'
                    ),
                    React.createElement(CategoriesFilter, {
                        filterCategories: this.filterCategories,
                        categoriesUrl: this.props.categoriesUrl,
                        qtdCat: this.qtdCat
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'float-none', style: { display: parseInt(this.state.qtdMen) <= 0 ? 'none' : '' } },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('div', { className: 'line-color' }),
                    React.createElement(
                        'h2',
                        null,
                        React.createElement('i', { className: 'far fa-user' }),
                        ' Autores'
                    ),
                    React.createElement(MembersFilter, {
                        filterMembers: this.filterMembers,
                        membersUrl: this.props.membersUrl,
                        qtdMen: this.qtdMen
                    })
                ),
                React.createElement('br', null)
            );
        }
    }]);

    return Filters;
})(React.Component);