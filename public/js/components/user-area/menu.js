class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let menu = [React.createElement(
            "div",
            null,
            React.createElement(
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
                        { href: "/declaracao", target: "_blank" },
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
                )
            )
        )];

        if (pageRoute === true) {
            menu.push(React.createElement(
                "ul",
                { className: "menu-area" },
                React.createElement(
                    "li",
                    { className: "" },
                    "OSC Apac"
                ),
                React.createElement("div", { className: "line line-fix " }),
                React.createElement("br", null),
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
                        React.createElement("i", { className: "fas fa-align-justify", "aria-hidden": "true" }),
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
            ));
        }

        return menu;

        /*if(pageRoute===true){
            return(
                <div>
                    <ul className="menu-area">
                        <li><a href="/dashboard-user"><i className="fa fa-home" aria-hidden="true"></i> Minha área</a></li>
                        <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Minhas OSCs</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                        <li><a href="/declaracao" target='_blank'><i className="fa fa-user" aria-hidden="true"></i> Declaração</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                        <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
                    </ul>
                    <br/>
                    <ul className="menu-area">
                        <li className="">OSC Apac</li>
                        <div className="line line-fix "></div><br/>
                        <li><a href="/osc-user/789809"><i className="fa fa-user" aria-hidden="true"></i> Dados gerais</a></li>
                        <li><a href="/areas-atuacao-user"><i className="fa fa-user" aria-hidden="true"></i> Áreas de atuação</a></li>
                        <li><a href="/descricao-user"><i className="fas fa-align-justify" aria-hidden="true"></i> Descrição</a></li>
                        <li><a href="/certificates-user"><i className="fas fa-certificate" aria-hidden="true"></i> Títulos e Certificados</a></li>
                        <li><a href="/governancas-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Trabalho e Governança</a></li>
                        <li><a href="/participacoes-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Participação Social</a></li>
                        <li><a href="/projetos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Projetos</a></li>
                        <li><a href="/recursos-user"><i className="fas fa-briefcase" aria-hidden="true"></i> Fontes de recursos</a></li>
                    </ul>
                </div>
            );
        }else{
            return(
                <div>
                    <ul className="menu-area">
                        <li><a href="/dashboard-user"><i className="fa fa-home" aria-hidden="true"></i> Minha área</a></li>
                        <li><a href="/oscs-user"><i className="fa fa-user" aria-hidden="true"></i> Minhas OSCs</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</a></li>
                        <li><a href="/declaracao" target='_blank'><i className="fa fa-user" aria-hidden="true"></i> Declaração</a></li>
                        <li><a href="/dados-user"><i className="fa fa-user" aria-hidden="true"></i> Selo Site</a></li>
                        <li><a href="/logout-user"><i className="fa fa-power-off" aria-hidden="true"></i> Sair</a></li>
                    </ul>
                </div>
            );
        }*/
    }
}

ReactDOM.render(React.createElement(Menu, null), document.getElementById('menu'));