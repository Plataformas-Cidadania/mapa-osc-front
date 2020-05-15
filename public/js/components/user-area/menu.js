class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return React.createElement(
            "ul",
            { className: "menu-area" },
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/dashboard-user" },
                    React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                    " Minha \xE1rea"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/dados-user" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Meus Dados"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/dados-textos" },
                    React.createElement("i", { className: "fa fa-book", "aria-hidden": "true" }),
                    " Textos"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/dados-arquivos" },
                    React.createElement("i", { className: "fa fa-file", "aria-hidden": "true" }),
                    " Arquivos"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/videos-privados" },
                    React.createElement("i", { className: "fa fa-video", "aria-hidden": "true" }),
                    " V\xEDdeos"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/logout-user" },
                    React.createElement("i", { className: "fa fa-power-off", "aria-hidden": "true" }),
                    " Sair"
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Menu, null), document.getElementById('menu'));