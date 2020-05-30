class HeaderUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement("br", null),
                        React.createElement(
                            "h1",
                            null,
                            "Minha conta"
                        ),
                        React.createElement(
                            "h5",
                            null,
                            React.createElement(
                                "a",
                                { href: "/" },
                                "Home"
                            )
                        ),
                        React.createElement("div", { className: "line line-fix " }),
                        React.createElement("hr", { style: { marginTop: '-2px' } }),
                        React.createElement("br", null)
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(HeaderUser, null), document.getElementById('header-user'));