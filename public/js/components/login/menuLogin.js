class MenuLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let carrinho = this.props.carrinho;

        return React.createElement(
            "div",
            { className: "row box-margin" },
            React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                    "h4",
                    null,
                    "Quero me cadastrar"
                ),
                React.createElement("br", null),
                React.createElement(
                    "form",
                    { action: "/pre-register", method: "POST" },
                    carrinho,
                    React.createElement("input", { type: "hidden", name: "_token", value: $('meta[name="csrf-token"]').attr('content') }),
                    React.createElement("input", { type: "email", name: "email", className: "form-control", placeholder: "E-mail" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", name: "cep", className: "form-control", placeholder: "CEP" }),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { className: "btn btn-style-primary" },
                        "Criar Cadastro"
                    )
                )
            )
        );
    }
}