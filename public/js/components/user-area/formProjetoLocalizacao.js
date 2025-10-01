'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormProjetoLocalizacao = (function (_React$Component) {
    _inherits(FormProjetoLocalizacao, _React$Component);

    function FormProjetoLocalizacao(props) {
        _classCallCheck(this, FormProjetoLocalizacao);

        _get(Object.getPrototypeOf(FormProjetoLocalizacao.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                id_projeto: null,
                tx_nome_localizacao: '',
                ft_nome_localizacao: ''
            },

            requireds: {
                tx_nome_localizacao: true
            },
            updateOk: false,
            loading: false,
            msg: '',
            filters: {
                municipio: null
            },
            loadingLocal: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.clickSearchMunicipio = this.clickSearchMunicipio.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.listMunicipio = this.listMunicipio.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
        this.removeMunicipio = this.removeMunicipio.bind(this);
    }

    _createClass(FormProjetoLocalizacao, [{
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            form[name] = value;

            this.setState({ form: form });
        }
    }, {
        key: 'cleanForm',
        value: function cleanForm() {
            this.setState({
                form: {
                    tx_nome_localizacao: ''
                }

            });
        }
    }, {
        key: 'validate',
        value: function validate() {

            var valid = true;
            var requireds = this.state.requireds;

            this.setState({ requireds: requireds });
            return valid;
        }
    }, {
        key: 'register',
        value: function register(e) {

            e.preventDefault();

            if (!this.validate()) {
                return;
            }

            var msg = "Dados inserido com sucesso!";

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

                var data = {
                    id_projeto: this.props.id_projeto,
                    id_localizacao_projeto: this.state.filters.municipio.edmu_cd_municipio,
                    tx_nome_regiao_localizacao_projeto: this.state.filters.municipio.edmu_nm_municipio + ' - ' + this.state.filters.municipio.eduf_sg_uf,
                    ft_regiao_localizacao_projeto: 'Representante de OSC',
                    ft_nome_regiao_localizacao_projeto: 'Representante de OSC',
                    ft_localizacao_prioritaria: 'Representante de OSC'
                };

                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto/localizacao',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: data,
                    cache: false,
                    success: (function (data) {
                        this.props.listLocalizacoes();
                        this.setState({ loading: false, updateOk: true, msg: msg, showMsg: true });
                        this.cleanForm();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        var msg = "Ocorreu um erro!";
                        this.setState({ msg: msg, updateOk: false });
                    }).bind(this)
                });
            });
        }

        /*Municipio*/
    }, {
        key: 'handleSearchMunicipio',
        value: function handleSearchMunicipio(e) {
            var search = e.target.value ? e.target.value : ' ';
            this.setState({ searchMunicipio: search }, function () {
                this.listMunicipio(search);
            });
        }
    }, {
        key: 'clickSearchMunicipio',
        value: function clickSearchMunicipio() {
            var search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
            this.listMunicipio(search);
        }
    }, {
        key: 'listMunicipio',
        value: function listMunicipio(search) {
            if (search.length > 3) {
                this.setState({ loadingLocal: true });
                $.ajax({
                    method: 'GET',
                    //url: getBaseUrl + 'menu/geo/municipio/' + search,
                    url: getBaseUrl2 + 'busca/municipio/' + search,
                    cache: false,
                    success: (function (data) {
                        this.setState({ listMunicipio: data, loadingLocal: false });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                        this.setState({ loadingLocal: false });
                    }).bind(this)
                });
            }
        }
    }, {
        key: 'setMunicipio',
        value: function setMunicipio(item) {
            var filters = this.state.filters;
            var form = this.state.form;
            filters.municipio = item;
            form.cd_municipio = item.edmu_cd_municipio;
            this.setState({ filters: filters, form: form });
        }
    }, {
        key: 'removeMunicipio',
        value: function removeMunicipio() {
            var filters = this.state.filters;
            filters.municipio = null;
            this.setState({ filters: filters });
        }
    }, {
        key: 'render',
        value: function render() {

            var municipios = null;
            if (this.state.listMunicipio) {
                municipios = this.state.listMunicipio.map((function (item, index) {
                    var _this = this;

                    var sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
                    var firstPiece = null;
                    var secondPiece = item.edmu_nm_municipio;

                    if (this.state.searchMunicipio) {
                        firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
                        secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
                    }
                    secondPiece = secondPiece + ' - ' + item.eduf_sg_uf;

                    return React.createElement(
                        'li',
                        { key: 'cat_' + item.edmu_cd_municipio,
                            className: 'list-group-item d-flex ',
                            onClick: function () {
                                return _this.setMunicipio(item);
                            }
                        },
                        React.createElement(
                            'u',
                            null,
                            firstPiece
                        ),
                        secondPiece
                    );
                }).bind(this));
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { autoComplete: 'off' },
                    React.createElement(
                        'div',
                        { className: 'row box-search' },
                        React.createElement(
                            'div',
                            { className: 'col-md-8' },
                            React.createElement(
                                'div',
                                { className: 'input-icon', style: { display: this.state.form.cd_certificado == 7 || this.state.form.cd_certificado == 0 ? 'none' : '' } },
                                React.createElement('input', { type: 'text', className: 'form-control mx-sm-3',
                                    placeholder: 'Busque um município', name: 'cd_municipio',
                                    autoComplete: 'off',
                                    onClick: this.clickSearchMunicipio,
                                    onChange: this.handleSearchMunicipio,
                                    style: { display: this.state.filters.municipio ? 'none' : '' } }),
                                React.createElement('input', { type: 'text', className: 'form-control mx-sm-3', name: 'cd_municipio2',
                                    style: { display: this.state.filters.municipio ? '' : 'none' },
                                    autoComplete: 'off',
                                    readOnly: this.state.filters.municipio,
                                    defaultValue: this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : '' }),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.municipio ? 'none' : '', position: 'relative', margin: '0 -12px 0 0' } },
                                    React.createElement('i', { className: 'fas fa-search' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.filters.municipio ? '' : 'none', position: 'relative' }, onClick: this.removeMunicipio },
                                    React.createElement('i', { className: 'fas fa-times', style: { cursor: 'pointer' } })
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'ul',
                                    { className: 'box-search-itens', style: { display: (this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio ? '' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12 text-center' },
                                        React.createElement('img', { src: '/img/load.gif', alt: '', width: '60', className: 'login-img', style: { display: this.state.loadingLocal ? '' : 'none' } })
                                    ),
                                    municipios
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(
                                'button',
                                { className: 'btn btn-success', onClick: this.register, style: { marginTop: '-2px' } },
                                React.createElement(
                                    'span',
                                    null,
                                    'Adicionar'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? 'block' : 'none' } },
                        React.createElement(
                            'div',
                            null,
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
                        )
                    )
                )
            );
        }
    }]);

    return FormProjetoLocalizacao;
})(React.Component);