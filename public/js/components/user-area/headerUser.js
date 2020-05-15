class HeaderUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "title-box" },
                React.createElement("br", null),
                React.createElement(
                    "h2",
                    { className: "text-center" },
                    "\xC1rea do Associado"
                ),
                React.createElement("hr", null)
            )
        );
    }
}

ReactDOM.render(React.createElement(HeaderUser, null), document.getElementById('header-user'));