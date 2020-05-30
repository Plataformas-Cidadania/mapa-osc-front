class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            document: [],
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
            url: '/detalhar-users-document/' + this.props.id,
            cache: false,
            success: function (data) {
                //console.log("1: "+this.props.id);
                //console.log(data);
                this.setState({ document: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        console.log(this.state.document.id, this.state.document.max_id);

        let previous = null;
        if (this.state.document.previous_id) {
            previous = React.createElement(
                'li',
                { className: "previous" },
                React.createElement(
                    'a',
                    { href: "/dados-arquivo/" + this.state.document.previous_id },
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
        if (this.state.document.next_id) {
            next = React.createElement(
                'li',
                { className: "next" },
                React.createElement(
                    'a',
                    { href: "/dados-arquivo/" + this.state.document.next_id },
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
                    React.createElement(
                        'h2',
                        { className: 'box-item-theme-p' },
                        this.state.document.title
                    ),
                    React.createElement('iframe', { src: "/arquivos/documents/" + this.state.document.arquivo, width: '100%', height: '1000px', frameBorder: '0' }),
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

ReactDOM.render(React.createElement(Document, { id: id }), document.getElementById('document'));