'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArchivesFilter = (function (_React$Component) {
    _inherits(ArchivesFilter, _React$Component);

    function ArchivesFilter(props) {
        _classCallCheck(this, ArchivesFilter);

        _get(Object.getPrototypeOf(ArchivesFilter.prototype), 'constructor', this).call(this, props);
        this.state = {
            archives: [],
            search: '',
            showArchives: false,
            archivesSelected: [],
            showOtherItems: false
        };
        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addArchive = this.addArchive.bind(this);
        this.removeArchive = this.removeArchive.bind(this);
    }

    _createClass(ArchivesFilter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //this.setState({archivesSelected: this.props.archivesUrl});
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            $.ajax({
                method: 'POST',
                url: 'archives',
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

                    //importar arquivo passadas pela url//////////////
                    var archivesUrl = this.props.archivesUrl;
                    var archivesSelected = this.state.archivesSelected;
                    for (var i in data) {
                        for (var j in archivesUrl) {
                            if (data[i].id == archivesUrl[j]) {
                                var add = true;
                                for (var k in archivesSelected) {
                                    //console.log(archivesUrl[j], archivesSelected[k].id);
                                    if (archivesUrl[j] == archivesSelected[k].id) {
                                        add = false;
                                    }
                                }
                                if (add) {
                                    archivesSelected.push(data[i]);
                                }
                            }
                        }
                    }
                    //console.log('archivesSelected', archivesSelected);
                    //console.log('archivesUrl', this.props.archivesUrl);
                    ////////////////////////////////////////////////////

                    this.setState({ archives: data, archivesSelected: archivesSelected, loading: false });
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
            var showArchives = !this.state.showArchives;
            this.setState({ showArchives: showArchives }, function () {
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
        key: 'addArchive',
        value: function addArchive(item) {
            var add = true;
            this.state.archivesSelected.find(function (memb) {
                if (item.month == memb.month) {
                    add = false;
                }
            });
            if (add) {
                var archivesSelected = this.state.archivesSelected;
                archivesSelected.push(item);

                this.setState({ showArchives: false });
                this.setState({ archivesSelected: archivesSelected }, function () {
                    this.props.filterArchives(this.state.archivesSelected);
                });
            }
        }
    }, {
        key: 'removeArchive',
        value: function removeArchive(e) {

            var archivesSelected = this.state.archivesSelected;
            var archive = {};
            archivesSelected.find(function (item) {
                if (item.id == e.target.id) {
                    archive = item;
                }
            });
            var index = archivesSelected.indexOf(archive);
            archivesSelected.splice(index, 1);
            this.setState({ archivesSelected: archivesSelected }, function () {
                this.props.filterArchives(this.state.archivesSelected);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var qtdItems = this.state.archives.length;
            var showQtdItems = 5;

            var firstArchives = this.state.archives.map((function (item, index) {
                var _this = this;

                if (index < showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.month.substr(0, sizeSearch);
                    var month = item.month.substr(sizeSearch);
                    var year = item.year.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.archivesSelected.find(function (memb) {
                        if (item.month == memb.month) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'li',
                        { key: 'arc_' + index,
                            className: 'list-group-item d-flex justify-content-between align-items-center',
                            style: { cursor: 'pointer', color: color },
                            onClick: function () {
                                return _this.addArchive(item);
                            }
                        },
                        month,
                        ' de ',
                        year,
                        React.createElement(
                            'span',
                            { className: 'badge badge-primary badge-pill' },
                            qtd
                        )
                    );
                }
            }).bind(this));

            var otherArchives = this.state.archives.map((function (item, index) {
                var _this2 = this;

                if (index >= showQtdItems) {
                    var sizeSearch = this.state.search.length;
                    var firstPiece = item.month.substr(0, sizeSearch);
                    var month = item.month.substr(sizeSearch);
                    var year = item.year.substr(sizeSearch);
                    var qtd = item.qtd;

                    var color = '';
                    this.state.archivesSelected.find(function (memb) {
                        if (item.month == memb.month) {
                            color = '#b7b7b7';
                            return;
                        }
                    });

                    return React.createElement(
                        'li',
                        { key: 'arc_' + index,
                            className: "list-group-item " + (this.state.showOtherItems ? "d-flex" : "") + " justify-content-between align-items-center",
                            style: { cursor: 'pointer', color: color, display: this.state.showOtherItems ? '' : 'none' },
                            onClick: function () {
                                return _this2.addArchive(item);
                            }
                        },
                        month,
                        ' de ',
                        year,
                        React.createElement(
                            'span',
                            { className: 'badge badge-primary badge-pill' },
                            qtd
                        )
                    );
                }
            }).bind(this));

            var archivesSelected = this.state.archivesSelected.map((function (item, index) {
                return React.createElement(
                    'button',
                    { key: "btn_archive_" + index, id: index, onClick: this.removeArchive, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                    item.month,
                    ' de ',
                    item.year,
                    ' ',
                    React.createElement('i', { className: 'fas fa-times' })
                );
            }).bind(this));

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    archivesSelected
                ),
                React.createElement(
                    'ul',
                    { className: 'list-group', style: { clear: 'both' } },
                    firstArchives,
                    otherArchives
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

    return ArchivesFilter;
})(React.Component);