class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            search: '',
            showFilters: false,
            filtersSelected: [],
            showOtherItems: false
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        $.ajax({
            method: 'POST',
            url: '/filters',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                city: this.props.city,
                search: this.state.search
            },
            cache: false,
            success: function (data) {
                //console.log(data);

                //importar categorias passadas pela url//////////////
                let filtersUrl = this.props.filtersUrl;
                let filtersSelected = this.state.filtersSelected;
                for (let i in data) {
                    for (let j in filtersUrl) {
                        if (data[i].id == filtersUrl[j]) {
                            let add = true;
                            for (let k in filtersSelected) {
                                //console.log(filtersUrl[j], filtersSelected[k].id);
                                if (filtersUrl[j] == filtersSelected[k].id) {
                                    add = false;
                                }
                            }
                            if (add) {
                                filtersSelected.push(data[i]);
                            }
                        }
                    }
                }
                ////////////////////////////////////////////////////

                this.setState({ filters: data, filtersSelected: filtersSelected, loading: false });
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    clickSearch() {
        let showFilters = !this.state.showFilters;
        this.setState({ showFilters: showFilters }, function () {
            this.load();
        });
    }

    handleSearch(e) {
        this.setState({ search: e.target.value }, function () {
            this.load();
        });
    }

    addCategory(item) {
        //console.log('addCategory', item);
        let add = true;
        this.state.filtersSelected.find(function (cat) {
            if (item.title == cat.title) {
                add = false;
            }
        });
        if (add) {
            let filtersSelected = this.state.filtersSelected;
            filtersSelected.push(item);
            //console.log('addCategory - filtersSelected', filtersSelected);
            this.setState({ showFilters: false });
            this.setState({ filtersSelected: filtersSelected }, function () {
                this.props.filterFilters(this.state.filtersSelected);
            });
        }
    }

    removeCategory(e) {

        let filtersSelected = this.state.filtersSelected;
        let category = {};
        filtersSelected.find(function (item) {
            if (item.id == e.target.id) {
                category = item;
            }
        });
        let index = filtersSelected.indexOf(category);
        filtersSelected.splice(index, 1);
        this.setState({ filtersSelected: filtersSelected }, function () {
            this.props.filterFilters(this.state.filtersSelected);
        });
    }

    render() {

        let qtdItems = this.state.filters.length;
        let showQtdItems = 5;

        let firstFilters = this.state.filters.map(function (item, index) {
            if (index < showQtdItems) {
                let sizeSearch = this.state.search.length;
                let firstPiece = item.title.substr(0, sizeSearch);
                let lastPiece = item.title.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.filtersSelected.find(function (cat) {
                    if (item.title == cat.title) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.id,
                        className: 'list-group-item d-flex justify-content-between align-items-center',
                        style: { cursor: 'pointer', color: color },
                        onClick: () => this.addCategory(item)
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
        }.bind(this));

        let otherFilters = this.state.filters.map(function (item, index) {
            if (index >= showQtdItems) {
                let sizeSearch = this.state.search.length;
                let firstPiece = item.title.substr(0, sizeSearch);
                let lastPiece = item.title.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.filtersSelected.find(function (cat) {
                    if (item.title == cat.title) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return React.createElement(
                    'li',
                    { key: 'cat_' + item.id,
                        className: "list-group-item " + (this.state.showOtherItems ? "d-flex" : "") + " justify-content-between align-items-center",
                        style: { cursor: 'pointer', color: color, display: this.state.showOtherItems ? '' : 'none' },
                        onClick: () => this.addCategory(item)
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
        }.bind(this));

        let filtersSelected = this.state.filtersSelected.map(function (item) {
            return React.createElement(
                'button',
                { key: "btn_category_" + item.id, id: item.id, onClick: this.removeCategory, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                item.title,
                ' ',
                React.createElement('i', { className: 'fas fa-times' })
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            filtersSelected,
            React.createElement(
                'div',
                { className: 'input-icon filter-input-icon' },
                React.createElement('input', { type: 'text', name: 'titleCategory', className: 'filter-search', onClick: this.clickSearch, onChange: this.handleSearch }),
                React.createElement('i', { className: 'fas fa-search' })
            ),
            React.createElement(
                'ul',
                { className: 'list-group' },
                firstFilters,
                otherFilters
            ),
            React.createElement(
                'div',
                { style: { display: qtdItems - showQtdItems > 0 ? '' : 'none' } },
                React.createElement(
                    'h4',
                    { className: 'btn-plus float-right', style: { display: !this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: () => this.setState({ showOtherItems: true }) },
                    'Mais ',
                    qtdItems - showQtdItems,
                    ' ',
                    React.createElement('i', { className: 'fas fa-angle-down' })
                ),
                React.createElement(
                    'h4',
                    { className: 'btn-plus float-right', style: { display: this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: () => this.setState({ showOtherItems: false }) },
                    'Menos ',
                    qtdItems - showQtdItems,
                    ' ',
                    React.createElement('i', { className: 'fas fa-angle-up' })
                )
            )
        );
    }
}