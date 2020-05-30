class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            text: [],
            editId: 0
        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'GET',
            url: '/detalhar-users-text/' + this.props.id,
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ text: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        console.log(this.state.text.id, this.state.text.max_id);

        let previous = null;
        if (this.state.text.previous_id) {
            previous = React.createElement(
                'li',
                { className: "previous" },
                React.createElement(
                    'a',
                    { href: "/dados-texto/" + this.state.text.previous_id },
                    React.createElement(
                        'span',
                        { 'aria-hidden': 'true' },
                        '\u2190'
                    ),
                    ' Anterior'
                )
            );
        }

        let next = null;
        if (this.state.text.next_id) {
            next = React.createElement(
                'li',
                { className: "next" },
                React.createElement(
                    'a',
                    { href: "/dados-texto/" + this.state.text.next_id },
                    'Pr\xF3ximo ',
                    React.createElement(
                        'span',
                        { 'aria-hidden': 'true' },
                        '\u2192'
                    )
                )
            );
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement('img', { src: "/imagens/texts/lg-" + this.state.text.imagem, alt: '', width: '100%' }),
                    React.createElement(
                        'h2',
                        { className: 'box-item-theme-p' },
                        this.state.text.title
                    ),
                    React.createElement('div', { className: 'box-item-theme-p box-item-theme-p-det ', dangerouslySetInnerHTML: { __html: this.state.text.description } }),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            ),
            React.createElement(
                'nav',
                { 'aria-label': '...' },
                React.createElement(
                    'ul',
                    { className: 'pager' },
                    previous,
                    next
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Text, { id: id }), document.getElementById('text'));