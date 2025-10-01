'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoriesFilter = (function (_React$Component) {
    _inherits(CategoriesFilter, _React$Component);

    function CategoriesFilter(props) {
        _classCallCheck(this, CategoriesFilter);

        _get(Object.getPrototypeOf(CategoriesFilter.prototype), 'constructor', this).call(this, props);
        this.state = {
            categories: [],
            search: '',
            showCategories: false,
            categoriesSelected: [],
            showOtherItems: false
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    _createClass(CategoriesFilter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.setState({categoriesSelected: this.props.categoriesUrl});

            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            $.ajax({
                method: 'POST',
                url: 'categories',
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

                    //importar categorias passadas pela url//////////////
                    var categoriesUrl = this.props.categoriesUrl;
                    var categoriesSelected = this.state.categoriesSelected;
                    for (var i in data) {
                        for (var j in categoriesUrl) {
                            if (data[i].id == categoriesUrl[j]) {
                                var add = true;
                                for (var k in categoriesSelected) {
                                    //console.log(categoriesUrl[j], categoriesSelected[k].id);
                                    if (categoriesUrl[j] == categoriesSelected[k].id) {
                                        add = false;
                                    }
                                }
                                if (add) {
                                    categoriesSelected.push(data[i]);
                                }
                            }
                        }
                    }
                    //console.log('categoriesSelected', categoriesSelected);
                    //console.log('categoriesUrl', this.props.categoriesUrl);
                    ////////////////////////////////////////////////////
                    this.props.qtdCat(data.length);

                    this.setState({ categories: data, categoriesSelected: categoriesSelected, loading: false });
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
            var showCategories = !this.state.showCategories;
            this.setState({ showCategories: showCategories }, function () {
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
        key: 'addCategory',
        value: function addCategory(item) {
            //console.log('addCategory', item);
            var add = true;
            this.state.categoriesSelected.find(function (cat) {
                if (item.titulo == cat.titulo) {
                    add = false;
                }
            });
            if (add) {
                var categoriesSelected = this.state.categoriesSelected;
                categoriesSelected.push(item);
                //console.log('addCategory - categoriesSelected', categoriesSelected);
                this.setState({ showCategories: false });
                this.setState({ categoriesSelected: categoriesSelected }, function () {
                    this.props.filterCategories(this.state.categoriesSelected);
                });
            }
        }
    }, {
        key: 'removeCategory',
        value: function removeCategory(e) {

            var categoriesSelected = this.state.categoriesSelected;
            var category = {};
            categoriesSelected.find(function (item) {
                if (item.id == e.target.id) {
                    category = item;
                }
            });
            var index = categoriesSelected.indexOf(category);
            categoriesSelected.splice(index, 1);
            this.setState({ categoriesSelected: categoriesSelected }, function () {
                this.props.filterCategories(this.state.categoriesSelected);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var qtdItems = this.state.categories.length;
            var showQtdItems = 5;

            var firstCategories = this.state.categories.map((function (item, index) {
                var _this = this;

                if (index < showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.titulo.substr(0, sizeSearch);
                    var lastPiece = item.titulo.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.categoriesSelected.find(function (cat) {
                        if (item.titulo == cat.titulo) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'li',
                        { key: 'cat_' + item.id,
                            className: 'list-group-item d-flex justify-content-between align-items-center',
                            style: { cursor: 'pointer', color: color },
                            onClick: function () {
                                return _this.addCategory(item);
                            }
                        },
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'u',
                                null,
                                firstPiece
                            ),
                            lastPiece
                        ),
                        React.createElement(
                            'span',
                            { className: 'badge badge-primary badge-pill' },
                            qtd
                        )
                    );
                }
            }).bind(this));

            var otherCategories = this.state.categories.map((function (item, index) {
                var _this2 = this;

                if (index >= showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.titulo.substr(0, sizeSearch);
                    var lastPiece = item.titulo.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.categoriesSelected.find(function (cat) {
                        if (item.titulo == cat.titulo) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'li',
                        { key: 'cat_' + item.id,
                            className: "list-group-item " + (this.state.showOtherItems ? "d-flex" : "") + " justify-content-between align-items-center",
                            style: { cursor: 'pointer', color: color, display: this.state.showOtherItems ? '' : 'none' },
                            onClick: function () {
                                return _this2.addCategory(item);
                            }
                        },
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'u',
                                null,
                                firstPiece
                            ),
                            lastPiece
                        ),
                        React.createElement(
                            'span',
                            { className: 'badge badge-primary badge-pill' },
                            qtd
                        )
                    );
                }
            }).bind(this));

            var categoriesSelected = this.state.categoriesSelected.map((function (item) {
                return React.createElement(
                    'button',
                    { key: "btn_category_" + item.id, id: item.id, onClick: this.removeCategory, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                    item.titulo,
                    ' ',
                    React.createElement('i', { className: 'fas fa-times' })
                );
            }).bind(this));

            return React.createElement(
                'div',
                null,
                categoriesSelected,
                React.createElement(
                    'div',
                    { className: 'input-icon filter-input-icon' },
                    React.createElement('input', { type: 'text', name: 'titleCategory', className: 'filter-search', onClick: this.clickSearch, onChange: this.handleSearch }),
                    React.createElement('i', { className: 'fas fa-search' })
                ),
                React.createElement(
                    'ul',
                    { className: 'list-group' },
                    firstCategories,
                    otherCategories
                ),
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

    return CategoriesFilter;
})(React.Component);