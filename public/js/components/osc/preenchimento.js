'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preenchimento = (function (_React$Component) {
    _inherits(Preenchimento, _React$Component);

    function Preenchimento(props) {
        _classCallCheck(this, Preenchimento);

        _get(Object.getPrototypeOf(Preenchimento.prototype), 'constructor', this).call(this, props);
        this.state = {
            data: null,
            total: 0
        };
        this.load = this.load.bind(this);
    }

    _createClass(Preenchimento, [{
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

                    var transparencia = {
                        serie: [],
                        labels: ['Áreas e Subáreas de Atuação da OSC', 'Dados Gerais', 'Descrição da OSC', 'Espaços de Participação Social', 'Fontes de recursos anuais da OSC', 'Projetos, atividades e/ou programas', 'Relações de Trabalho e Governança', 'Titulações e Certificações']
                    };

                    transparencia.serie.push(data[0].transparencia_area_atuacao);
                    transparencia.serie.push(data[0].transparencia_dados_gerais);
                    transparencia.serie.push(data[0].transparencia_descricao);
                    transparencia.serie.push(data[0].transparencia_espacos_participacao_social);
                    transparencia.serie.push(data[0].transparencia_fontes_recursos);
                    transparencia.serie.push(data[0].transparencia_projetos_atividades_programas);
                    transparencia.serie.push(data[0].transparencia_relacoes_trabalho_governanca);
                    transparencia.serie.push(data[0].transparencia_titulos_certificacoes);

                    /*////////////////////*/
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

                    /*////////////////////*/

                    _this.setState({
                        data: transparencia,
                        total: total
                    });
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
            console.log('this.state.data', this.state.data);
            var polarChart = null;
            if (this.state.data) {
                polarChart = React.createElement(PolarChart, {
                    polarChart: 'polarChart',
                    data: this.state.data
                });
            }
            if (this.state.data === null || this.state.data === []) {
                return React.createElement('div', null);
            }
            return React.createElement(
                'div',
                null,
                polarChart,
                React.createElement(
                    'div',
                    { className: 'indice-total' },
                    this.state.total
                )
            );
        }
    }]);

    return Preenchimento;
})(React.Component);

ReactDOM.render(React.createElement(Preenchimento, { id_osc: id_osc }), document.getElementById('preenchimento'));