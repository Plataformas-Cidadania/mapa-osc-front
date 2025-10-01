'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Descricao = (function (_React$Component) {
    _inherits(Descricao, _React$Component);

    function Descricao(props) {
        _classCallCheck(this, Descricao);

        _get(Object.getPrototypeOf(Descricao.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                tx_historico: '',
                tx_missao_osc: '',
                tx_visao_osc: '',
                tx_finalidades_estatutarias: '',
                tx_link_estatuto_osc: ''

            },
            requireds: {
                tx_historico: true,
                tx_missao_osc: true,
                tx_visao_osc: true,
                tx_finalidades_estatutarias: true,
                tx_link_estatuto_osc: true
            },
            placeholder: {
                tx_historico: 'De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada',
                tx_missao_osc: 'Se houver, apresente qual a missão da OSC',
                tx_visao_osc: 'Se houver, apresente a visão e valores da OSC',
                tx_finalidades_estatutarias: 'Apresente as finalidades estatutárias da OSC. Se preferir, copie do estatuto da OSC',
                tx_link_estatuto_osc: 'Se houver, insira o link que leva ao estatuto da OSC. Ex.: http://www.nomesite.com/link-completo.pdf'

            },
            loading: false,
            button: true,
            showMsg: false,
            updateOk: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateDescricao = this.updateDescricao.bind(this);
        this.validate = this.validate.bind(this);
        this.getDescricao = this.getDescricao.bind(this);
    }

    _createClass(Descricao, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getDescricao();
        }
    }, {
        key: 'getDescricao',
        value: function getDescricao() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                //url: getBaseUrl2 + 'osc/descricao/455128',
                url: getBaseUrl2 + 'osc/descricao/' + this.props.id,
                cache: false,
                success: (function (data) {
                    this.setState({ loading: false, form: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            var placeholder = this.state.placeholder;
            form[name] = value;

            this.setState({ form: form, placeholder: placeholder });
        }
    }, {
        key: 'validate',
        value: function validate() {
            var valid = true;

            var requireds = this.state.requireds;
            var form = this.state.form;

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'updateDescricao',
        value: function updateDescricao(e) {
            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'PUT',
                    //url: getBaseUrl2 + 'osc/descricao/455128',
                    url: getBaseUrl2 + 'osc/descricao/' + this.props.id,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: this.state.form,
                    cache: false,
                    success: (function (data) {
                        var msg = "Dados alterados com sucesso!";
                        this.setState({ loading: false, msg: msg, showMsg: true, updateOk: true, button: true });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        var msg = "Ocorreu um erro!";
                        this.setState({ loading: false, msg: msg, showMsg: true, updateOk: false, button: true });
                    }).bind(this)
                });
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
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'form',
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'title-user-area' },
                                    React.createElement(
                                        'div',
                                        { className: 'mn-accordion-icon' },
                                        React.createElement('i', { className: 'fas fa-align-justify', 'aria-hidden': 'true' })
                                    ),
                                    React.createElement(
                                        'h3',
                                        null,
                                        'Descrição da OSC'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group col-md-12' },
                                        React.createElement(
                                            'div',
                                            { className: 'label-float-tx' },
                                            React.createElement('textarea', { className: 'form-control form-g', name: 'tx_historico', onChange: this.handleInputChange, value: this.state.form.tx_historico,
                                                rows: '3', placeholder: this.state.placeholder.tx_historico }),
                                            React.createElement(
                                                'label',
                                                { htmlFor: 'tx_historico' },
                                                'Histórico'
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
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-float-tx' },
                                            React.createElement('textarea', { className: 'form-control form-g', name: 'tx_missao_osc', onChange: this.handleInputChange, value: this.state.form.tx_missao_osc,
                                                rows: '3', placeholder: this.state.placeholder.tx_missao_osc }),
                                            React.createElement(
                                                'label',
                                                { htmlFor: 'tx_missao_osc' },
                                                'Missão'
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
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-float-tx' },
                                            React.createElement('textarea', { className: 'form-control form-g', name: 'tx_visao_osc', onChange: this.handleInputChange, value: this.state.form.tx_visao_osc,
                                                rows: '3', placeholder: this.state.placeholder.tx_visao_osc }),
                                            React.createElement(
                                                'label',
                                                { htmlFor: 'tx_visao_osc' },
                                                'Visão e valores'
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
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-float-tx' },
                                            React.createElement('textarea', { className: 'form-control form-g', name: 'tx_finalidades_estatutarias', onChange: this.handleInputChange, value: this.state.form.tx_finalidades_estatutarias,
                                                rows: '3', placeholder: this.state.placeholder.tx_finalidades_estatutarias }),
                                            React.createElement(
                                                'label',
                                                { htmlFor: 'tx_finalidades_estatutarias' },
                                                'Finalidades estatutárias da OSC'
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
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-float' },
                                            React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_estatuto_osc', onChange: this.handleInputChange, value: this.state.form.tx_link_estatuto_osc,
                                                placeholder: this.state.placeholder.tx_link_estatuto_osc }),
                                            React.createElement(
                                                'label',
                                                { htmlFor: 'tx_link_estatuto_osc' },
                                                'Link para o estatuto da OSC'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'label-box-info-off' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    ' '
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { style: { marginTop: '-10px' } },
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.loading ? 'block' : 'none' } },
                                                React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                                ' Processando ',
                                                React.createElement('br', null),
                                                ' ',
                                                React.createElement('br', null)
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                                                React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                                                this.state.msg
                                            ),
                                            React.createElement(
                                                'button',
                                                { type: 'button', className: 'btn btn-success', onClick: this.updateDescricao },
                                                React.createElement('i', {
                                                    className: 'fas fa-cloud-download-alt' }),
                                                ' Salvar '
                                            ),
                                            React.createElement('br', null)
                                        )
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'space' })
                        )
                    )
                )
            );
        }
    }]);

    return Descricao;
})(React.Component);

ReactDOM.render(React.createElement(Descricao, { id: id }), document.getElementById('descricao'));