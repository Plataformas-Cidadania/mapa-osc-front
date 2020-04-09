class CategoriesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            search: '',
            showCategories: false,
            categoriesSelected: []
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    componentDidMount() {
        //this.setState({categoriesSelected: this.props.categoriesUrl});

        this.load();
    }

    load() {
        $.ajax({
            method: 'POST',
            url: '/categories',
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
                let categoriesUrl = this.props.categoriesUrl;
                let categoriesSelected = this.state.categoriesSelected;
                for (let i in data) {
                    for (let j in categoriesUrl) {
                        if (data[i].id == categoriesUrl[j]) {
                            let add = true;
                            for (let k in categoriesSelected) {
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

                this.setState({ categories: data, categoriesSelected: categoriesSelected, loading: false });
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    clickSearch() {
        let showCategories = !this.state.showCategories;
        this.setState({ showCategories: showCategories }, function () {
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
        this.state.categoriesSelected.find(function (cat) {
            if (item.title == cat.title) {
                add = false;
            }
        });
        if (add) {
            let categoriesSelected = this.state.categoriesSelected;
            categoriesSelected.push(item);
            //console.log('addCategory - categoriesSelected', categoriesSelected);
            this.setState({ showCategories: false });
            this.setState({ categoriesSelected: categoriesSelected }, function () {
                this.props.filterCategories(this.state.categoriesSelected);
            });
        }
    }

    removeCategory(e) {

        let categoriesSelected = this.state.categoriesSelected;
        let category = {};
        categoriesSelected.find(function (item) {
            if (item.id == e.target.id) {
                category = item;
            }
        });
        let index = categoriesSelected.indexOf(category);
        categoriesSelected.splice(index, 1);
        this.setState({ categoriesSelected: categoriesSelected }, function () {
            this.props.filterCategories(this.state.categoriesSelected);
        });
    }

    render() {

        let categories = this.state.categories.map(function (item) {
            let sizeSearch = this.state.search.length;
            let firstPiece = item.title.substr(0, sizeSearch);
            let lastPiece = item.title.substr(sizeSearch);

            let color = '';
            this.state.categoriesSelected.find(function (cat) {
                if (item.title == cat.title) {
                    color = '#b7b7b7';
                    return;
                }
            });

            return React.createElement(
                'li',
                { key: 'cat_' + item.id, className: 'list-group-item d-flex justify-content-between align-items-center', style: { cursor: 'pointer', color: color }, onClick: () => this.addCategory(item) },
                lastPiece,
                React.createElement(
                    'span',
                    { className: 'badge badge-primary badge-pill' },
                    '7'
                )
            );
        }.bind(this));

        let categoriesSelected = this.state.categoriesSelected.map(function (item) {
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
            categoriesSelected,
            React.createElement('input', { type: 'text', name: 'titleCategory', className: 'form-control input-sm', onClick: this.clickSearch, onChange: this.handleSearch }),
            React.createElement(
                'ul',
                { className: 'list-group' },
                categories
            )
        );
    }
}