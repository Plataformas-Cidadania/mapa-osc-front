class Oscs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            loadingSearch: false,
            loadingAddOsc: false,
            loadingRemoveOsc: false,
            search: '',
            oscs: [],
            oscsSearch: [],
            editId: 0,
            idOscRemove: 0
        };

        this.list = this.list.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.listSearch = this.listSearch.bind(this);
        this.addOsc = this.addOsc.bind(this);
        this.askRemove = this.askRemove.bind(this);
        this.removeOsc = this.removeOsc.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    list() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'get',
            url: getBaseUrl2 + 'osc/list-oscs-usuario',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                this.setState({ oscs: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    handleSearch(e) {
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ search: search }, function () {
            this.listSearch(search);
        });
    }
    clickSearch() {
        let search = this.state.search ? this.state.search : ' ';
        this.listSearch(search);
    }
    listSearch(search) {
        if (search.length >= 8) {
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'search/cnpj/autocomplete/' + search,
                cache: false,
                success: function (data) {
                    this.setState({ oscsSearch: data, loadingSearch: false });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingSearch: false });
                }.bind(this)
            });
        }
    }

    addOsc(id_osc) {
        $.ajax({
            method: 'POST',
            url: getBaseUrl2 + 'osc/representacao/',
            data: {
                id_osc: id_osc
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ search: '' });
                this.list();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingSearch: false });
            }.bind(this)
        });
    }

    askRemove(id_osc) {
        this.setState({ idOscRemove: id_osc });
    }

    cancelRemove(id_osc) {
        this.setState({ idOscRemove: 0 });
    }

    removeOsc(id_osc) {
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/representacao/' + id_osc,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            cache: false,
            success: function (data) {
                //console.log(data);
                this.list();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingSearch: false });
            }.bind(this)
        });
    }

    render() {

        let oscs = this.state.oscs.map(function (item, index) {

            let hr = null;
            if (index < this.state.oscs.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'tr',
                { key: "osc_" + item.id_osc },
                React.createElement(
                    'th',
                    { scope: 'row' },
                    index + 1
                ),
                React.createElement(
                    'td',
                    null,
                    item.tx_nome_osc
                ),
                React.createElement(
                    'td',
                    { width: '320' },
                    React.createElement(
                        'div',
                        { className: 'btn btn-primary' },
                        React.createElement(
                            'a',
                            { href: "detalhar/" + item.id_osc + "/" + item.tx_nome_osc },
                            React.createElement('i', { className: 'fas fa-binoculars' }),
                            ' Visualizar'
                        )
                    ),
                    '\xA0',
                    React.createElement(
                        'div',
                        { className: 'btn btn-success' },
                        React.createElement(
                            'a',
                            { href: "osc-user/" + item.id_osc },
                            React.createElement('i', { className: 'far fa-edit' }),
                            ' Editar'
                        )
                    ),
                    '\xA0',
                    React.createElement(
                        'div',
                        { className: 'btn btn-danger',
                            style: { display: item.id_osc === this.state.idOscRemove ? 'none' : '' },
                            onClick: () => this.askRemove(item.id_osc)
                        },
                        React.createElement(
                            'a',
                            { style: { cursor: 'pointer' } },
                            React.createElement('i', { className: 'fa fa-trash' })
                        )
                    ),
                    '\xA0',
                    React.createElement(
                        'div',
                        { className: 'btn btn-light',
                            style: { display: item.id_osc === this.state.idOscRemove ? '' : 'none' },
                            onClick: () => this.cancelRemove(item.id_osc)
                        },
                        React.createElement(
                            'a',
                            { style: { cursor: 'pointer' }, title: 'Cancelar' },
                            React.createElement('i', { className: 'fa fa-undo' })
                        )
                    ),
                    '\xA0',
                    React.createElement(
                        'div',
                        { className: 'btn btn-danger',
                            style: { display: item.id_osc === this.state.idOscRemove ? '' : 'none' },
                            onClick: () => this.removeOsc(item.id_osc)
                        },
                        React.createElement(
                            'a',
                            { style: { cursor: 'pointer' }, title: 'Remover' },
                            React.createElement('i', { className: 'fa fa-times' })
                        )
                    )
                )
            );
        }.bind(this));

        console.log(this.state.listSearch);

        let listSearch = this.state.oscsSearch.map(function (item, index) {
            let sizeSearch = this.state.search ? this.state.search.length : 0;
            let firstPiece = null;
            let secondPiece = item.tx_nome_osc;

            if (this.state.search) {
                firstPiece = item.tx_nome_osc.substr(0, sizeSearch);
                secondPiece = item.tx_nome_osc.substr(sizeSearch);
            }
            return React.createElement(
                'li',
                { key: 'cat_' + item.id_osc,
                    className: 'list-group-item d-flex ',
                    onClick: () => this.addOsc(item.id_osc)
                },
                React.createElement(
                    'u',
                    null,
                    firstPiece
                ),
                secondPiece
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
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
                                    { scope: 'col' },
                                    'Id'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Nome da OSC'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col', className: 'text-center' },
                                    'A\xE7\xF5es'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            oscs
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement('input', { type: 'text',
                        className: 'form-control float-left mx-sm-3',
                        placeholder: 'Digite o CNPJ e clique na OSC para adicionar.',
                        name: 'osc',
                        autoComplete: 'off',
                        onClick: this.clickSearch,
                        onChange: this.handleSearch,
                        defaultValue: this.state.search
                    }),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'ul',
                        { className: 'box-search-itens', style: { display: this.state.search ? '' : 'none' } },
                        React.createElement(
                            'div',
                            { className: 'col-md-12 text-center' },
                            React.createElement('img', { src: '/img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loadingSearch ? '' : 'none' } })
                        ),
                        listSearch
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Oscs, null), document.getElementById('oscs'));