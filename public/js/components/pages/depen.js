'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Depen = (function (_React$Component) {
    _inherits(Depen, _React$Component);

    function Depen(props) {
        _classCallCheck(this, Depen);

        _get(Object.getPrototypeOf(Depen.prototype), 'constructor', this).call(this, props);
        this.state = {
            data: []
        };
        this.load = this.load.bind(this);
    }

    _createClass(Depen, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            console.log('pages');
            $.ajax({
                method: 'GET',
                url: 'json/lista-osc-com-links.json',
                cache: false,
                success: (function (data) {
                    this.setState({ loading: false, data: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var itensLista = null;
            if (this.state.data) {
                itensLista = this.state.data.map(function (item, index) {
                    console.log(item);
                    return React.createElement(
                        'tr',
                        { key: 'trModal' + index },
                        React.createElement(
                            'td',
                            null,
                            item.cnpj
                        ),
                        React.createElement(
                            'td',
                            null,
                            item.nome
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'a',
                                { href: "detalhar/" + item.id },
                                React.createElement('i', { className: 'fas fa-share-square' })
                            )
                        )
                    );
                });
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'table',
                                { className: 'table table-hover' },
                                React.createElement(
                                    'thead',
                                    { className: 'thead-light' },
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,
                                            'CNPJ'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Nome'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            'Detalhar'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'tbody',
                                    null,
                                    itensLista
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Depen;
})(React.Component);

ReactDOM.render(React.createElement(Depen, null), document.getElementById('depen'));