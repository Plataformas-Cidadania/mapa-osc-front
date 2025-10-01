'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OscsRecentes = (function (_React$Component) {
    _inherits(OscsRecentes, _React$Component);

    function OscsRecentes(props) {
        _classCallCheck(this, OscsRecentes);

        _get(Object.getPrototypeOf(OscsRecentes.prototype), 'constructor', this).call(this, props);
        this.state = {
            oscs: [],
            loading: false,
            logos: []
        };

        this.load = this.load.bind(this);
        this.getLogos = this.getLogos.bind(this);
    }

    _createClass(OscsRecentes, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            this.setState({ loading: true });
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/lista_atualizada/9',
                data: {},
                cache: false,
                success: (function (data) {
                    this.setState({ oscs: data, loading: false }, function () {
                        this.getLogos();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'getLogos',
        value: function getLogos() {
            var _this = this;

            var logos = this.state.logos;

            var _loop = function (i) {
                var id_osc = _this.state.oscs[i].id_osc;
                $.ajax({
                    method: 'GET',
                    url: getBaseUrl2 + 'osc/logo/' + id_osc,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: (function (data) {
                        logos[id_osc] = data;
                        this.setState({ logos: logos });
                    }).bind(_this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(_this)
                });
            };

            for (var i in this.state.oscs) {
                _loop(i);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var oscs = null;
            if (this.state.oscs) {
                oscs = this.state.oscs.map(function (item, index) {

                    var logo = objTest(_this2.state.logos[item.id_osc]) ? _this2.state.logos[item.id_osc] : 'img/sem-imagem.png';
                    return React.createElement(
                        'div',
                        { key: "recente" + index, className: 'col-md-4' },
                        React.createElement(
                            'a',
                            { href: "detalhar/" + item.id_osc + "/" + clean(item.tx_nome_osc) },
                            React.createElement(
                                'div',
                                { className: 'list-user list-lgt' },
                                React.createElement('img', { src: logo, alt: '', className: 'rounded-circle float-left', width: '50', height: '50', style: { backgroundColor: '#FFFFFF' } }),
                                React.createElement(
                                    'h4',
                                    { className: 'capitalize' },
                                    titleize(item.tx_nome_osc, 50),
                                    React.createElement('i', { className: 'fas fa-angle-right float-right list-icon' })
                                ),
                                React.createElement('hr', null)
                            )
                        )
                    );
                });
            }

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12 text-center' },
                    React.createElement('img', { src: 'img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loading ? '' : 'none' } })
                ),
                oscs,
                React.createElement(
                    'div',
                    { className: 'col-md-12 text-center' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'a',
                        { href: 'mapa' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-outline-light' },
                            'Visualize todas as OSCs'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
            );
        }
    }]);

    return OscsRecentes;
})(React.Component);

ReactDOM.render(React.createElement(OscsRecentes, null), document.getElementById('oscsRecentes'));
/*{item.tx_nome_osc.substr(1, 150)}*/