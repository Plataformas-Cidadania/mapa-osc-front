'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = (function (_React$Component) {
    _inherits(Document, _React$Component);

    function Document(props) {
        _classCallCheck(this, Document);

        _get(Object.getPrototypeOf(Document.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            document: [],
            editId: 0
        };

        this.load = this.load.bind(this);
    }

    _createClass(Document, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {

            this.setState({ loadingList: true });

            $.ajax({
                method: 'GET',
                url: 'detalhar-users-document/' + this.props.id,
                cache: false,
                success: (function (data) {
                    //console.log("1: "+this.props.id);
                    //console.log(data);
                    this.setState({ document: data, loadingList: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loadingList: false });
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            console.log(this.state.document.id, this.state.document.max_id);

            var previous = null;
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
                            '←'
                        ),
                        ' Anterior'
                    )
                );
            }

            var next = null;
            if (this.state.document.next_id) {
                next = React.createElement(
                    'li',
                    { className: "next" },
                    React.createElement(
                        'a',
                        { href: "/dados-arquivo/" + this.state.document.next_id },
                        'Próximo ',
                        React.createElement(
                            'span',
                            { 'aria-hidden': 'true' },
                            '→'
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
    }]);

    return Document;
})(React.Component);

ReactDOM.render(React.createElement(Document, { id: id }), document.getElementById('document'));