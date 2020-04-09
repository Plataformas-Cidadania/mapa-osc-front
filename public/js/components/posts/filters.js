class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [{ day: "Domingo", short: "DOM", checked: false }, { day: "Segunda-feira", short: "SEG", checked: false }, { day: "Terça-feira", short: "TER", checked: false }, { day: "Quarta-feira", short: "QUA", checked: false }, { day: "Quinta-feira", short: "QUI", checked: false }, { day: "Sexta-feira", short: "SEX", checked: false }, { day: "Sábado", short: "SAB", checked: false }],
            categories: [],
            Members: []

        };

        this.load = this.load.bind(this);
        this.checkDay = this.checkDay.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterDistricts = this.filterDistricts.bind(this);
        this.filterOffers = this.filterOffers.bind(this);
    }

    componentDidMount() {
        //this.load();
    }

    load() {
        $.ajax({
            method: 'GET',
            url: '/filters',
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

    checkDay(day) {
        let days = this.state.days;
        days.find(function (item) {
            if (item.day == day) {
                item.checked = !item.checked;
            }
        }.bind(this));
        this.setState({ days: days }, function () {
            this.props.filterDays(this.state.days);
        });
    }

    filterCategories(categories) {
        this.setState({ categories: categories }, function () {
            console.log(this.state.categories);
            this.props.filterCategories(categories);
        });
    }

    filterMembers(members) {
        this.setState({ members: members }, function () {
            console.log(this.state.members);
            this.props.filterMembers(members);
        });
    }

    filterDistricts(districts) {
        this.setState({ districts: districts }, function () {
            //console.log(this.state.districts);
            this.props.filterDistricts(districts);
        });
    }

    filterOffers(offers) {
        this.props.filterOffers(offers);
    }

    render() {

        let days = this.state.days.map(function (item, index) {
            return React.createElement(
                "li",
                { key: index, onClick: () => this.checkDay(item.day) },
                React.createElement("i", { className: "fa " + (item.checked ? 'fa-check-square-o' : 'fa-square-o') }),
                " ",
                item.day
            );
        }.bind(this));

        return React.createElement(
            "div",
            null,
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "input-icon" },
                React.createElement("input", { type: "text", className: "form-control", placeholder: "Busque um artigo..." }),
                React.createElement("i", { className: "fas fa-search" })
            ),
            React.createElement("br", null),
            React.createElement(
                "div",
                null,
                React.createElement("div", { className: "line-color" }),
                React.createElement(
                    "h2",
                    null,
                    React.createElement("i", { className: "far fa-calendar" }),
                    " Arquivo"
                ),
                React.createElement(
                    "ul",
                    { className: "list-group" },
                    React.createElement(
                        "li",
                        { className: "list-group-item d-flex justify-content-between align-items-center" },
                        "Fevereiro de 2020",
                        React.createElement(
                            "span",
                            { className: "badge badge-primary badge-pill" },
                            "7"
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: "list-group-item d-flex justify-content-between align-items-center" },
                        "Janeiro de 2020",
                        React.createElement(
                            "span",
                            { className: "badge badge-primary badge-pill" },
                            "x"
                        )
                    ),
                    React.createElement(
                        "li",
                        { className: "list-group-item d-flex justify-content-between align-items-center" },
                        "Dezembro de 2019",
                        React.createElement(
                            "span",
                            { className: "badge badge-primary badge-pill" },
                            "1"
                        )
                    )
                ),
                React.createElement(
                    "h4",
                    { className: "btn-plus float-right" },
                    "Mais 15"
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { className: "line-color" }),
                React.createElement(
                    "h2",
                    null,
                    React.createElement("i", { className: "far fa-folder-open" }),
                    " Categorias"
                ),
                React.createElement(CategoriesFilter, { filterCategories: this.filterCategories, categoriesUrl: this.props.categoriesUrl }),
                React.createElement(
                    "h4",
                    { className: "btn-plus float-right" },
                    React.createElement("i", { className: "fas fa-angle-down" })
                )
            ),
            React.createElement(
                "div",
                { className: "float-none" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("div", { className: "line-color" }),
                React.createElement(
                    "h2",
                    null,
                    React.createElement("i", { className: "far fa-user" }),
                    " Autores"
                ),
                React.createElement(MembersFilter, { filterMembers: this.filterMembers, membersUrl: this.props.membersUrl })
            ),
            React.createElement("br", null),
            React.createElement(
                "h4",
                null,
                "Bairros"
            ),
            React.createElement(DistrictsFilter, { filterDistricts: this.filterDistricts, districtsUrl: this.props.districtsUrl }),
            React.createElement("br", null),
            React.createElement(
                "h4",
                null,
                "Dias da Semana"
            ),
            React.createElement(
                "ul",
                { className: "check-ul" },
                days
            ),
            React.createElement("br", null),
            React.createElement(
                "h4",
                null,
                "Ofertas"
            ),
            React.createElement(OffersFilter, { filterOffers: this.filterOffers }),
            React.createElement("br", null)
        );
    }
}