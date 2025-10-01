'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Api = (function (_React$Component) {
    _inherits(Api, _React$Component);

    function Api(props) {
        _classCallCheck(this, Api);

        _get(Object.getPrototypeOf(Api.prototype), 'constructor', this).call(this, props);
        this.state = {
            data: []
        };
        this.getCertificado = this.getCertificado.bind(this);
        this.getAreaAtuacao = this.getAreaAtuacao.bind(this);
        this.getSituacaoImovel = this.getSituacaoImovel.bind(this);
        this.getObjetivoProjeto = this.getObjetivoProjeto.bind(this);
        this.getIpeaData = this.getIpeaData.bind(this);
        //this.getSubAreaAtuacao = this.getSubAreaAtuacao.bind(this);
    }

    _createClass(Api, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getCertificado();
            this.getAreaAtuacao();
            this.getSituacaoImovel();
            this.getObjetivoProjeto();
            this.getIpeaData();
            //this.getSubAreaAtuacao()
        }
    }, {
        key: 'getCertificado',
        value: function getCertificado() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'certificado',
                //url: 'menu/osc/certificado',
                success: (function (data) {
                    this.setState({ loading: false, certificados: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'getAreaAtuacao',
        value: function getAreaAtuacao() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'menu/osc/area_atuacao',
                url: getBaseUrl2 + 'area_atuacao',
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                    });
                    this.setState({ loading: false, areaAtuacao: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'getSituacaoImovel',
        value: function getSituacaoImovel() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'menu/osc/situacao_imovel',
                url: getBaseUrl2 + 'situacao_imovel',
                success: (function (data) {
                    this.setState({ loading: false, form: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'getObjetivoProjeto',
        value: function getObjetivoProjeto() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'menu/osc/objetivo_projeto',
                url: getBaseUrl2 + 'objetivos',
                success: (function (data) {
                    this.setState({ loading: false, form: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'getIpeaData',
        value: function getIpeaData() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'indice_ipeadata',
                //url: 'menu/osc/ipeadata',
                success: (function (data) {

                    this.setState({ loading: false, ipeaData: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            //console.log(this.state.ipeaData);
            return React.createElement(Filter, {
                csrf_token: this.props.csrf_token,
                certificados: this.state.certificados,
                areaAtuacao: this.state.areaAtuacao,
                ipeaData: this.state.ipeaData
            });
        }
    }]);

    return Api;
})(React.Component);

ReactDOM.render(React.createElement(Api, { csrf_token: csrf_token }), document.getElementById('api'));