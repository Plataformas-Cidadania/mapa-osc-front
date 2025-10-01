'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Seal = (function (_React$Component) {
    _inherits(Seal, _React$Component);

    function Seal(props) {
        _classCallCheck(this, Seal);

        _get(Object.getPrototypeOf(Seal.prototype), 'constructor', this).call(this, props);
        this.state = {
            osc: {},
            loading: false
        };

        this.list = this.list.bind(this);
    }

    _createClass(Seal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.list();
        }
    }, {
        key: 'list',
        value: function list() {

            this.setState({ loading: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/cabecalho/' + this.props.id_osc,
                cache: false,
                success: (function (data) {
                    //console.log(data);
                    this.setState({ osc: data });
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
                        ' Certificado para seu site'
                    ),
                    React.createElement('hr', null)
                ),
                React.createElement(
                    'p',
                    null,
                    'Essa área contém o código de um certificado para ambientes virtuais que identifica que sua instituição se encontra em nosso banco de dados. Copie o script e cole em seu site.'
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                this.state.osc.tx_razao_social_osc
                            )
                        ),
                        React.createElement('hr', null),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'label-float-tx' },
                            React.createElement('textarea', { className: 'form-control form-g',
                                name: 'tx_historico',
                                value: "<a href='" + this.props.app_url + "selo-osc/" + this.props.id_osc + "'>" + "<img src='" + this.props.app_url + "img/logo.png'>" + "</a>",
                                rows: '3' }),
                            React.createElement(
                                'label',
                                { htmlFor: 'tx_historico' },
                                'Script'
                            ),
                            React.createElement(
                                'div',
                                { className: 'label-box-info-tx-off' },
                                React.createElement(
                                    'p',
                                    null,
                                    ' '
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    ' ',
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return Seal;
})(React.Component);

ReactDOM.render(React.createElement(Seal, { id_osc: id_osc, app_url: app_url }), document.getElementById('seal'));