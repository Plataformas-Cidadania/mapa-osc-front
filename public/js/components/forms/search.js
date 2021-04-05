class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingAreas: false,
            menu: [{ id: 1, title: "Organização", txt: 'Encontre uma OSC, digite o nome ou CNPJ...' }, { id: 2, title: "Município", txt: 'Digite o nome do município...' }, { id: 3, title: "Estado", txt: 'Digite o nome do estado...' }, { id: 4, title: "Regição", txt: 'Digite o nome da região...' }],
            searchOsc: '',
            searchOscTxt: 'Encontre uma OSC, digite o nome ou CNPJ...'

        };

        this.load = this.load.bind(this);
        this.handleSearchOsc = this.handleSearchOsc.bind(this);
        this.btnSearch = this.btnSearch.bind(this);
    }

    componentDidMount() {
        this.load();
    }
    handleSearchOsc(e) {
        console.log(e);
        let search = e.target.value ? e.target.value : ' ';
        this.setState({ searchOsc: search }, function () {
            if (this.state.searchOsc != '') {
                this.load(search);
            }
        });
    }
    btnSearch(id, txt) {
        this.setState({ searchOscTxt: txt }, function () {});
    }

    load() {
        this.setState({ loadingAreas: true });
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'search/osc/' + this.state.searchOsc + '/10/0/0',
            data: {},
            cache: false,
            success: function (data) {

                this.setState({ data: data, areaAtuacao: data[0].cd_area_atuacao, loadingAreas: false }, function () {});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingAreas: false });
            }.bind(this)
        });
    }

    render() {

        let menu = this.state.menu.map(function (item) {
            return React.createElement(
                "li",
                { key: 'menu' + item.id, onClick: () => this.btnSearch(item.id, item.txt), className: "cursor" },
                item.title
            );
        }.bind(this));

        return React.createElement(
            "div",
            { className: "row justify-content-md-center" },
            React.createElement(
                "div",
                { className: "col-md-5" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "input-icon" },
                    React.createElement("input", { type: "text", className: "form-control",
                        placeholder: this.state.searchOscTxt, onChange: this.handleSearchOsc }),
                    React.createElement("i", { className: "fas fa-search" })
                ),
                React.createElement(
                    "ul",
                    { className: "menu-small" },
                    menu,
                    React.createElement(
                        "li",
                        { className: "float-right" },
                        React.createElement(
                            "a",
                            { href: "filtro" },
                            React.createElement("i", { className: "fas fa-filter" }),
                            " Filtro"
                        )
                    )
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }

}

ReactDOM.render(React.createElement(Search, null), document.getElementById('search'));