class Osc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            osc: [],
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
            url: '/detalhar-users-osc/' + this.props.id,
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ osc: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        console.log(this.state.osc.id, this.state.osc.max_id);

        let previous = null;
        if (this.state.osc.previous_id) {
            previous = React.createElement(
                'li',
                { className: "previous" },
                React.createElement(
                    'a',
                    { href: "/dados-osco/" + this.state.osc.previous_id },
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
        if (this.state.osc.next_id) {
            next = React.createElement(
                'li',
                { className: "next" },
                React.createElement(
                    'a',
                    { href: "/dados-osco/" + this.state.osc.next_id },
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
                    React.createElement('img', { src: "/imagens/oscs/lg-" + this.state.osc.imagem, alt: '', width: '100%' }),
                    React.createElement(
                        'h2',
                        { className: 'box-item-theme-p' },
                        this.state.osc.tx_nome_osc
                    ),
                    React.createElement('div', { className: 'box-item-theme-p box-item-theme-p-det ', dangerouslySetInnerHTML: { __html: this.state.osc.description } }),
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

ReactDOM.render(React.createElement(Osc, { id: id }), document.getElementById('osc'));