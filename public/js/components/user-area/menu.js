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
            ),
            React.createElement(
                "li",
                null,
                React.createElement("br", null)
            ),
            React.createElement(
                "li",
                { className: "bg-pri text-light", style: { padding: '5px 10px' } },
                "OSC Apac"
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/osc-user/789809" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Dados gerais"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/areas-atuacao-user" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " \xC1reas de atua\xE7\xE3o"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/descricao-user" },
                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                    " Descri\xE7\xE3o"
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
                    { href: "/participacoes-user" },
                    React.createElement("i", { className: "fas fa-briefcase", "aria-hidden": "true" }),
                    " Participa\xE7\xE3o Social"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/projetos-user" },
                    React.createElement("i", { className: "fas fa-briefcase", "aria-hidden": "true" }),
                    " Projetos"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "/recursos-user" },
                    React.createElement("i", { className: "fas fa-briefcase", "aria-hidden": "true" }),
                    " Fontes de recursos"
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Menu, null), document.getElementById('menu'));