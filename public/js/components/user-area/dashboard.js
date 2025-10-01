'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Daschboard = (function (_React$Component) {
    _inherits(Daschboard, _React$Component);

    function Daschboard(props) {
        _classCallCheck(this, Daschboard);

        _get(Object.getPrototypeOf(Daschboard.prototype), 'constructor', this).call(this, props);
        this.state = {
            totais: []
        };

        this.list = this.list.bind(this);
    }

    _createClass(Daschboard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
        }
    }, {
        key: 'list',
        value: function list() {

            this.setState({ loadingList: true });

            $.ajax({
                method: 'GET',
                url: '/dashboard-status',
                data: {},
                cache: false,
                success: (function (data) {
                    console.log(data);
                    this.setState({ totais: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    //this.setState({loadingList: false});
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var totais = this.state.totais.map(function (total, index) {
                return React.createElement(
                    'div',
                    { className: 'col-md-3 text-center', key: "totais_" + index, style: { marginBottom: '30px' } },
                    React.createElement(
                        'div',
                        { className: 'btn btn-default box-item-area' },
                        React.createElement(
                            'h2',
                            null,
                            total.qtdTotal
                        ),
                        React.createElement(
                            'p',
                            null,
                            total.status
                        )
                    )
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'title-user-area' },
                    React.createElement(
                        'h3',
                        null,
                        React.createElement('i', { className: 'fa fa-home', 'aria-hidden': 'true' }),
                        ' Minha área'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement(
                    'p',
                    null,
                    'Olá tudo bem! Estamos sentindo sua falta.'
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'row text-center' },
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement(
                            'div',
                            { className: 'box-border' },
                            React.createElement('br', null),
                            React.createElement(
                                'p',
                                null,
                                'Total de OSCs'
                            ),
                            React.createElement(
                                'h2',
                                null,
                                '20'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement(
                            'div',
                            { className: 'box-border' },
                            React.createElement('br', null),
                            React.createElement(
                                'p',
                                null,
                                'Total de projetos'
                            ),
                            React.createElement(
                                'h2',
                                null,
                                '10'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement(
                            'div',
                            { className: 'box-border' },
                            React.createElement('br', null),
                            React.createElement(
                                'p',
                                null,
                                'Total de certificados'
                            ),
                            React.createElement(
                                'h2',
                                null,
                                '30'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'box-border' },
                            React.createElement(
                                'table',
                                { className: 'table' },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { scope: 'col' },
                                            'QTD: 2'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col' },
                                            'OSC'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col' },
                                            'Últimos 30 dias'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col' },
                                            'Total'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'tbody',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { scope: 'row' },
                                            '1'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            'ASSOCIACAO CULTURAL PISADA DO SERTAO'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            '825'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            '3025'
                                        )
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { scope: 'row' },
                                            '2'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            'ASSOCIACAO CULTURAL PISADA DO SERTAO'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            '825'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            '3025'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    totais
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return Daschboard;
})(React.Component);

ReactDOM.render(React.createElement(Daschboard, { id: id }), document.getElementById('dashboard'));