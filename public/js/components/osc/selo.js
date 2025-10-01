'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selo = (function (_React$Component) {
    _inherits(Selo, _React$Component);

    function Selo(props) {
        _classCallCheck(this, Selo);

        _get(Object.getPrototypeOf(Selo.prototype), 'constructor', this).call(this, props);
        this.state = {
            nameImg: 'sem_medalha'
        };
        this.load = this.load.bind(this);
    }

    _createClass(Selo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/indice_preenchimento/' + this.props.id_osc,
                data: {},
                cache: false,
                success: function success(data) {

                    var soma = [];

                    soma.push(data[0].transparencia_area_atuacao / 800 * 100);
                    soma.push(data[0].transparencia_dados_gerais / 800 * 100);
                    soma.push(data[0].transparencia_descricao / 800 * 100);
                    soma.push(data[0].transparencia_espacos_participacao_social / 800 * 100);
                    soma.push(data[0].transparencia_fontes_recursos / 800 * 100);
                    soma.push(data[0].transparencia_projetos_atividades_programas / 800 * 100);
                    soma.push(data[0].transparencia_relacoes_trabalho_governanca / 800 * 100);
                    soma.push(data[0].transparencia_titulos_certificacoes / 800 * 100);

                    var total = 0;
                    var numeros = soma;
                    for (var i = 0; i < numeros.length; i++) {
                        total += parseInt(numeros[i]);
                    }

                    var nameImg = 'sem_medalha';
                    var titleImg = 'Sem medalha';

                    if (total > 50 && total < 70) {
                        nameImg = 'bronze';
                        titleImg = 'Bronze';
                    } else if (total > 71 && total < 90) {
                        nameImg = 'prata';
                        titleImg = 'Prata';
                    } else if (total > 91 && total < 99) {
                        nameImg = 'ouro';
                        titleImg = 'Ouro';
                    } else if (total > 100) {
                        nameImg = 'diamante';
                        titleImg = 'Diamante';
                    }

                    _this.setState({ nameImg: nameImg, titleImg: titleImg });
                },
                error: function error(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({ loading: false });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement('img', {
                    src: "img/selos/" + this.state.nameImg + ".png",
                    alt: this.state.titleImg,
                    title: this.state.titleImg,
                    width: '50', style: { float: 'left', marginTop: '-6px' } })
            );
        }
    }]);

    return Selo;
})(React.Component);

ReactDOM.render(React.createElement(Selo, { id_osc: id_osc }), document.getElementById('selo'));