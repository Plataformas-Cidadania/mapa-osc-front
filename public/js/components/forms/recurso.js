'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recurso = (function (_React$Component) {
    _inherits(Recurso, _React$Component);

    function Recurso(props) {
        _classCallCheck(this, Recurso);

        _get(Object.getPrototypeOf(Recurso.prototype), 'constructor', this).call(this, props);
        this.state = {
            loading: false,
            loadingSave: false,
            value: ''
        };
        this.storeCampo = this.storeCampo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /*ReactDOM.render(
        <Recurso/>,
        document.getElementById('recurso')
    );*/

    _createClass(Recurso, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            this.setState({ value: formatarMoeda(event.target.value) });
        }
    }, {
        key: 'storeCampo',
        value: function storeCampo(cd, value, id, ano) {

            this.setState({ loading: true, loadingSave: false });

            value = clearMoeda(value);

            if (id > 0) {
                this.setState({ button: false }, function () {
                    $.ajax({
                        method: 'PUT',
                        url: getBaseUrl2 + 'osc/recursos/' + id,
                        data: {
                            id_osc: this.props.id_osc,
                            dt_ano_recursos_osc: ano,
                            nr_valor_recursos_osc: value,
                            cd_fonte_recursos_osc: cd
                        },
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                        },
                        cache: false,
                        success: (function (data) {
                            var msg = 'Dados alterados com sucesso!';
                            this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success', loadingSave: true });
                        }).bind(this),
                        error: (function (xhr, status, err) {
                            console.error(status, err.toString());
                            this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                        }).bind(this)
                    });
                });
            } else {
                this.setState({ button: false }, function () {
                    $.ajax({
                        method: 'POST',
                        url: getBaseUrl2 + 'osc/recursos',
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                        },
                        data: {
                            id_osc: this.props.id_osc,
                            dt_ano_recursos_osc: ano,
                            nr_valor_recursos_osc: value,
                            cd_fonte_recursos_osc: cd
                        },
                        cache: false,
                        success: (function (data) {
                            var msg = 'Dados alterados com sucesso!';
                            this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success', loadingSave: true });
                        }).bind(this),
                        error: (function (xhr, status, err) {
                            console.error(status, err.toString());
                            this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
                        }).bind(this)
                    });
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({
                id: props.id,
                cd: props.cd,
                name: props.name,
                value: props.value,
                txt: props.txt,
                ano: props.ano,
                type: props.type
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                { className: 'col-md-6' },
                React.createElement(
                    'div',
                    { className: 'label-float' },
                    React.createElement('input', { className: "form-control form-g ", type: 'text', onChange: this.handleInputChange, placeholder: 'Informe o valor',
                        id: this.state.name,
                        name: this.state.name,
                        value: this.state.value,
                        //defaultValue={this.state.value}
                        onBlur: function () {
                            return _this.storeCampo(_this.state.cd, _this.state.value, _this.state.id, _this.state.ano);
                        }
                    }),
                    React.createElement(
                        'label',
                        { htmlFor: this.state.name },
                        this.state.txt
                    ),
                    React.createElement(
                        'div',
                        { className: 'label-box-info-off' },
                        React.createElement(
                            'p',
                            null,
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'float-right', style: { marginTop: '-50px', marginRight: '10px' } },
                        React.createElement(
                            'div',
                            { style: { display: this.state.loadingSave ? '' : 'none' } },
                            React.createElement('i', { className: 'far fa-save text-success' })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.loading ? '' : 'none' } },
                            React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                        )
                    )
                )
            );
        }
    }]);

    return Recurso;
})(React.Component);