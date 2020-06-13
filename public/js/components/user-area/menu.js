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
                    { href: "/oscs-user" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Minhas OSCs"
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
                    { href: "/declaracao" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Declara\xE7\xE3o"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/certificates-user" },
                    React.createElement("i", { className: "fas fa-certificate", "aria-hidden": "true" }),
                    " T\xEDtulos e Certificados"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/governancas-user" },
                    React.createElement("i", { className: "fas fa-briefcase", "aria-hidden": "true" }),
                    " Trabalho e Governan\xE7a"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/dados-user" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Selo Site"
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