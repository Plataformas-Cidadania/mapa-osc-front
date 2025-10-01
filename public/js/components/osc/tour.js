'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tour = (function (_React$Component) {
    _inherits(Tour, _React$Component);

    function Tour(props) {
        _classCallCheck(this, Tour);

        _get(Object.getPrototypeOf(Tour.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            value: ''
        };
        this.callCookies = this.callCookies.bind(this);
        this.callPassos = this.callPassos.bind(this);
    }

    _createClass(Tour, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}

        /* storeCampo(cd, value, id, ano){
               value = clearMoeda(value);
               if(id>0){
                 this.setState({loading: true, button: false}, function(){
                     $.ajax({
                         method:'PUT',
                         url: getBaseUrl2+'osc/recursos/'+id,
                         data:{
                             id_osc: this.props.id_osc,
                             dt_ano_recursos_osc: ano,
                             nr_valor_recursos_osc: value,
                             cd_fonte_recursos_osc: cd,
                         },
                         headers: {
                             Authorization: 'Bearer '+localStorage.getItem('@App:token')
                         },
                         cache: false,
                         success: function(data) {
                             let msg = 'Dados alterados com sucesso!';
                             this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                         }.bind(this),
                         error: function(xhr, status, err) {
                             console.error(status, err.toString());
                             this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                         }.bind(this)
                     });
                 });
             }else{
                 this.setState({loading: true, button: false}, function(){
                     $.ajax({
                         method:'POST',
                         url: getBaseUrl2+'osc/recursos',
                         headers: {
                             Authorization: 'Bearer '+localStorage.getItem('@App:token')
                         },
                         data:{
                             //id_osc: '789809',
                             id_osc: this.props.id_osc,
                             dt_ano_recursos_osc: ano,
                             nr_valor_recursos_osc: value,
                             cd_fonte_recursos_osc: cd,
                         },
                         cache: false,
                         success: function(data) {
                             let msg = 'Dados alterados com sucesso!';
                             this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                         }.bind(this),
                         error: function(xhr, status, err) {
                             console.error(status, err.toString());
                             this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                         }.bind(this)
                     });
                 });
             }
         }*/

    }, {
        key: 'callCookies',
        value: function callCookies(acao) {
            this.props.desativarTour(acao);
            localStorage.setItem(this.state.storage, false);
        }
    }, {
        key: 'callPassos',
        value: function callPassos(acao) {
            this.props.desativarTour(acao);
            console.log('acao', acao);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({
                passo: props.passo,
                position: props.position,
                txt: props.txt,
                top: props.top,
                right: props.right,
                float: props.float,
                display: props.display,
                storage: props.storage
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                { className: "bg-pri box-help  " + this.state.float, style: { top: this.props.top, display: this.props.display ? '' : 'none' } },
                React.createElement(
                    'strong',
                    null,
                    this.state.passo,
                    'º Passo'
                ),
                React.createElement(
                    'p',
                    null,
                    this.state.txt
                ),
                React.createElement(
                    'div',
                    { className: 'box-help-btns' },
                    React.createElement(
                        'a',
                        { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { margin: '0 10px', display: this.props.position !== 1 ? '' : 'none' }, onClick: function () {
                                return _this.callPassos(_this.state.passo);
                            } },
                        'Próximo passo'
                    ),
                    React.createElement(
                        'a',
                        { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { display: this.props.position === 0 ? '' : 'none' }, onClick: function () {
                                return _this.callCookies(0);
                            } },
                        'Pular tour'
                    ),
                    React.createElement(
                        'a',
                        { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { display: this.props.position === 1 ? '' : 'none' }, onClick: function () {
                                return _this.callCookies(0);
                            } },
                        'Finalizar tour'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'box-help-i', style: { right: this.props.right } },
                    React.createElement('i', { className: 'fas fa-3x fa-caret-down' })
                )
            );
        }
    }]);

    return Tour;
})(React.Component);