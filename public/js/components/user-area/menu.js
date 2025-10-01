'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = (function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
        this.state = {
            sigla_osc: ''
        };
        this.getOsc = this.getOsc.bind(this);
    }

    _createClass(Menu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getOsc();
        }
    }, {
        key: 'getOsc',
        value: function getOsc() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/dados_gerais/' + this.props.id,
                cache: false,
                success: (function (data) {
                    this.setState({ loading: false, sigla_osc: data.tx_sigla_osc, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var menu = [];
            if (pageRoute === false) {
                menu = [React.createElement(
                    'div',
                    { key: 'menu' },
                    React.createElement(
                        'ul',
                        { className: 'menu-area' },
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: 'oscs-user' },
                                React.createElement('i', { className: 'fas fa-list-alt' }),
                                ' Minhas OSCs'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: 'dados-user' },
                                React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                                ' Meus dados'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: 'trocar-senha' },
                                React.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' }),
                                ' Trocar Senha'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: 'logout-user' },
                                React.createElement('i', { className: 'fa fa-power-off', 'aria-hidden': 'true' }),
                                ' Sair'
                            )
                        )
                    )
                )];
            }
            if (pageRoute === true) {
                menu.push(React.createElement(
                    'ul',
                    { className: 'menu-area', key: 'menuOsc' },
                    React.createElement(
                        'li',
                        { className: '' },
                        'OSC ',
                        React.createElement(
                            'strong',
                            null,
                            this.state.sigla_osc
                        )
                    ),
                    React.createElement('div', { className: 'line line-fix ' }),
                    React.createElement('br', null),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: "osc-user/" + this.props.id },
                            React.createElement('i', { className: 'fa fa-file-alt', 'aria-hidden': 'true' }),
                            ' Dados gerais'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'objetivos-user' },
                            React.createElement('i', { className: 'fas fa-globe-americas', 'aria-hidden': 'true' }),
                            ' ODS'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'areas-atuacao-user' },
                            React.createElement('i', { className: 'fa fa-share-alt', 'aria-hidden': 'true' }),
                            ' Áreas de atuação'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'descricao-user' },
                            React.createElement('i', { className: 'fas fa-align-justify', 'aria-hidden': 'true' }),
                            ' Descrição'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'certificates-user' },
                            React.createElement('i', { className: 'fas fa-certificate', 'aria-hidden': 'true' }),
                            ' Títulos e certificados'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'governancas-user' },
                            React.createElement('i', { className: 'fas fa-briefcase', 'aria-hidden': 'true' }),
                            ' Trabalho e governança'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'participacoes-user' },
                            React.createElement('i', { className: 'fas fa-users', 'aria-hidden': 'true' }),
                            ' Participação social'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'projetos-user' },
                            React.createElement('i', { className: 'fas fa-project-diagram', 'aria-hidden': 'true' }),
                            ' Projetos'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'recursos-user' },
                            React.createElement('i', { className: 'fas fa-boxes', 'aria-hidden': 'true' }),
                            ' Fontes de recursos'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: 'oscs-user' },
                            React.createElement('i', { className: 'far fa-arrow-alt-circle-left' }),
                            ' Voltar'
                        )
                    )
                ));
            }
            return menu;
        }
    }]);

    return Menu;
})(React.Component);

ReactDOM.render(React.createElement(Menu, { id: id }), document.getElementById('menu'));
/*<li><a href="osc-user/789809"><i className="fa fa-file-alt" aria-hidden="true"/> Dados gerais</a></li>*/