class Texts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            texts: [],
            editId: 0
        };

        this.list = this.list.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    list() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'POST',
            url: '/list-users-texts',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ texts: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        let texts = this.state.texts.map(function (item, index) {

            let hr = null;
            if (index < this.state.texts.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'div',
                { className: 'col-md-12', key: "text_" + item.id },
                React.createElement(
                    'a',
                    { href: "/dados-texto/" + item.id },
                    React.createElement(
                        'div',
                        { className: 'box-item box-item-theme' },
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'box-item-theme-img' },
                            React.createElement('img', { src: "/imagens/texts/md-" + item.imagem, className: 'box-item-theme-img', alt: '', width: '100%' })
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'h4',
                            { className: 'box-item-theme-p' },
                            item.title
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'p',
                            { className: 'box-item-theme-p box-item-theme-p-det ' },
                            item.teaser
                        )
                    )
                )
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'row' },
                texts
            )
        );
    }
}

ReactDOM.render(React.createElement(Texts, null), document.getElementById('texts'));