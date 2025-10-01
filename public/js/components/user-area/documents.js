'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Documents = (function (_React$Component) {
    _inherits(Documents, _React$Component);

    function Documents(props) {
        _classCallCheck(this, Documents);

        _get(Object.getPrototypeOf(Documents.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            documents: [],
            editId: 0
        };

        this.list = this.list.bind(this);
    }

    _createClass(Documents, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
        }
    }, {
        key: 'list',
        value: function list() {

            this.setState({ loadingList: true });

            $.ajax({
                method: 'POST',
                url: 'list-users-documents',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ documents: data, loadingList: false });
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

            var documents = this.state.documents.map((function (item, index) {

                var hr = null;
                if (index < this.state.documents.length - 1) {
                    hr = React.createElement('hr', null);
                }

                return React.createElement(
                    'div',
                    { className: 'col-md-3  text-center', key: "document_" + item.id },
                    React.createElement(
                        'a',
                        { href: "/dados-arquivo/" + item.id },
                        React.createElement(
                            'div',
                            { className: 'box-item box-item-theme' },
                            React.createElement('br', null),
                            React.createElement('i', { className: 'far fa-file fa-3x' }),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'p',
                                { className: 'box-item-theme-p' },
                                item.title
                            )
                        )
                    )
                );
            }).bind(this));

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    documents
                )
            );
        }
    }]);

    return Documents;
})(React.Component);

ReactDOM.render(React.createElement(Documents, null), document.getElementById('documents'));