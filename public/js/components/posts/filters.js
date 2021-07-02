class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            members: [],
            archives: []

        };

        this.load = this.load.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
    }

    componentDidMount() {
        //this.load();
    }

    load() {
        $.ajax({
            method: 'GET',
            url: 'filters',
            data: {
                filters: {
                    teste: 1
                }
            },
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ loading: false, ads: data });
            }.bind(this),
            error: function (xhr, status, err) {
                //console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    filterCategories(categories) {
        this.setState({ categories: categories }, function () {
            //console.log(this.state.categories);
            this.props.filterCategories(categories);
        });
    }

    filterMembers(members) {
        this.setState({ members: members }, function () {
            //console.log(this.state.members);
            this.props.filterMembers(members);
        });
    }

    filterArchives(archives) {
        this.setState({ archives: archives }, function () {
            //console.log(this.state.archives);
            this.props.filterArchives(archives);
        });
    }

    render() {

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
                null,
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('div', { className: 'line-color' }),
                React.createElement(
                    'h2',
                    null,
                    React.createElement('i', { className: 'far fa-folder-open' }),
                    ' Categorias'
                ),
                React.createElement(CategoriesFilter, { filterCategories: this.filterCategories, categoriesUrl: this.props.categoriesUrl })
            ),
            React.createElement(
                'div',
                { className: 'float-none' },
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('div', { className: 'line-color' }),
                React.createElement(
                    'h2',
                    null,
                    React.createElement('i', { className: 'far fa-user' }),
                    ' Autores'
                ),
                React.createElement(MembersFilter, { filterMembers: this.filterMembers, membersUrl: this.props.membersUrl })
            ),
            React.createElement('br', null)
        );
    }
}