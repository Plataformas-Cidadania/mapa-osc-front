'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Atuacoes = (function (_React$Component) {
    _inherits(Atuacoes, _React$Component);

    function Atuacoes(props) {
        _classCallCheck(this, Atuacoes);

        _get(Object.getPrototypeOf(Atuacoes.prototype), 'constructor', this).call(this, props);
        this.state = {
            loadingList: false,
            loading: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
            editId: 0,
            areaAtuacao: null,
            subareaAtuacao: null,
            titleSub: null,
            imputOutros: false,
            icons: {
                1: 'fas fa-hotel ',
                2: 'fas fa-briefcase-medical ',
                3: 'fas fa-theater-masks ',
                4: 'fas fa-graduation-cap ',
                5: 'fas fa-hands-helping ',
                6: 'fas fa-church ',
                7: 'fas fa-users ',
                8: 'fas fa-seedling ',
                9: 'fas fa-balance-scale ',
                10: 'fas fa-text-width ',
                11: 'fas fa-ellipsis-h ',
                12: ''
            },
            dataAtuacaoBd: [],
            dataAtuacaoSelected: [],
            form: {
                tx_nome_outra: ''
            },
            boxInfo: false,
            dataCnae: '',
            dataCnaeArea: '',
            dataCnaeSubArea: [],
            tooltip: 'Informações provenientes de bases de dados oficiais. Não é possível editar'

        };

        this.listArea = this.listArea.bind(this);
        this.listAreaSelected = this.listAreaSelected.bind(this);
        this.listCnae = this.listCnae.bind(this);
        this.listCnaeArea = this.listCnaeArea.bind(this);
        //this.checkArea = this.checkArea.bind(this);
        this.checkSubArea = this.checkSubArea.bind(this);
        this.checkedOutros = this.checkedOutros.bind(this);
        this.callSubareaAtuacao = this.callSubareaAtuacao.bind(this);
        this.loadSubareas = this.loadSubareas.bind(this);
        this.saveOutrosSub = this.saveOutrosSub.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    _createClass(Atuacoes, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listArea();
            //this.listAreaSelected();
            this.listCnae();
            this.listCnaeArea();
        }
    }, {
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
        key: 'listArea',
        value: function listArea() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'area_atuacao',
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                    });
                    this.setState({ loading: false, areaAtuacao: data, button: true }, function () {
                        this.listAreaSelected();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listCnae',
        value: function listCnae() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,

                url: getBaseUrl2 + 'osc/dados_gerais/' + this.props.id,
                success: (function (data) {
                    this.setState({ loading: false, dataCnae: data.tx_nome_atividade_economica_osc });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listCnaeArea',
        value: function listCnaeArea() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl2+'osc/areas_atuacao/'+597188,//789809
                url: getBaseUrl2 + 'osc/areas_atuacao/' + this.props.id,
                success: (function (data) {
                    var dataArea = '';
                    data.find(function (item) {
                        dataArea = item.dc_area_atuacao.tx_nome_area_atuacao;
                    });

                    this.setState({ loading: false, dataCnaeArea: dataArea, dataCnaeSubArea: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listAreaSelected',
        value: function listAreaSelected() {
            //this.loadSubareas();
            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/areas_atuacao_rep/' + this.props.id,
                success: (function (data) {
                    var itensAreas = [];
                    var areasAtuacao = this.state.areaAtuacao;

                    areasAtuacao.find(function (item) {
                        item.checkedAtuacaoArea = false;
                    });

                    data.find(function (item) {
                        itensAreas.push(item.cd_area_atuacao);
                        areasAtuacao.find(function (area) {
                            if (item.cd_area_atuacao === area.cd_area_atuacao) {
                                area.checkedAtuacaoArea = true;
                            }
                        });
                    });

                    this.setState({
                        dataAtuacaoSelected: itensAreas,
                        dataAtuacaoBd: data,
                        areasAtuacao: areasAtuacao
                    }, function () {
                        this.loadSubareas();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'loadSubareas',
        value: function loadSubareas() {
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'menu/osc/subarea_atuacao',
                url: getBaseUrl2 + 'subarea_atuacao/',
                success: (function (data) {
                    var areaAtuacao = this.state.areaAtuacao;
                    var imputOutros = this.state.imputOutros;

                    data.find(function (item) {
                        item.checked = false;
                    });

                    this.state.areaAtuacao.find(function (item) {
                        item.subareas = data.filter(function (subitem) {
                            return item.cd_area_atuacao === subitem.cd_area_atuacao;
                        });
                    });

                    this.setState({ loading: false, areaAtuacao: areaAtuacao, titleSub: true, imputOutros: imputOutros });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'callSubareaAtuacao',
        value: function callSubareaAtuacao(e) {

            var id = e.target.id.split("_")[1];
            var areas = this.state.areaAtuacao;

            /////////////////////////
            this.setState({ boxInfo: false });
            var arrayAreas = [];

            this.state.dataAtuacaoBd.find(function (itemSelectSub) {
                arrayAreas.push(itemSelectSub.cd_area_atuacao);
            });
            var arrUnique = [].concat(_toConsumableArray(new Set(arrayAreas)));

            if (arrUnique.indexOf(parseInt(id)) != -1) {
                this.setState({ boxInfo: true });
                return;
            }

            /////////////////////////

            areas.find(function (item) {
                if (item.cd_area_atuacao == id) {
                    item.checkedAtuacaoArea = !item.checkedAtuacaoArea;
                }
            });

            if (areas[0].subareas) {
                var checkedAtuacao = false;
                areas.find(function (item) {
                    if (item.cd_area_atuacao === id) {
                        item.checked = !item.checked;
                        checkedAtuacao = !item.checked;
                    }
                });

                this.setState({ areaAtuacao: areas });
                return;
            }

            this.setState({ button: false });
        }
    }, {
        key: 'checkSubArea',
        value: function checkSubArea(area_id, subarea_id, checkedAtuacao, idSelectedSub) {
            var areas = this.state.areaAtuacao;
            areas.find(function (item) {
                if (item.cd_area_atuacao === area_id) {
                    item.subareas.find(function (subitem) {
                        if (subitem.cd_subarea_atuacao === subarea_id) {
                            subitem.checked = !subitem.checked;
                        }
                    });
                }
            });

            /*//////////////////*/
            if (checkedAtuacao !== true) {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/area_atuacao_rep',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        //id_osc: 789809,
                        id_osc: this.props.id,
                        cd_area_atuacao: area_id,
                        cd_subarea_atuacao: subarea_id,
                        ft_area_atuacao: 'Representante de OSC'
                    },
                    cache: false,
                    success: (function (data) {
                        this.listAreaSelected();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            } else {
                $.ajax({
                    method: 'DELETE',
                    url: getBaseUrl2 + 'osc/area_atuacao_rep/' + idSelectedSub,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {},
                    cache: false,
                    success: (function (data) {
                        this.listAreaSelected();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            }
            /*//////////////////*/

            this.setState({ areaAtuacao: areas });
        }
    }, {
        key: 'checkedOutros',
        value: function checkedOutros(area_id) {
            var checked = false;
            this.state.areaAtuacao.find((function (item) {
                if (item.cd_area_atuacao === area_id) {
                    if (item.subareas) {
                        item.subareas.find((function (subitem) {
                            this.state.dataAtuacaoBd.find((function (itemSelectSub) {
                                if (itemSelectSub.cd_subarea_atuacao === subitem.cd_subarea_atuacao) {
                                    subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                    if (subitem.tx_nome_subarea_atuacao === "Outros") {
                                        checked = true;
                                    }
                                }
                            }).bind(this));
                        }).bind(this));
                    }
                }
            }).bind(this));

            return checked;
        }
    }, {
        key: 'saveOutrosSub',
        value: function saveOutrosSub(id) {
            this.setState({ saveLoading: id });
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/area_atuacao_rep/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {
                    tx_nome_outra: this.state.form.tx_nome_outra
                },
                cache: false,
                success: (function (data) {
                    this.setState({ saveLoading: false });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var areaAtuacao = null;
            var subareaAtuacao = [];
            if (this.state.areaAtuacao) {
                areaAtuacao = this.state.areaAtuacao.map((function (item) {
                    var _this2 = this;

                    var subarea = null;

                    if (item.subareas) {
                        subarea = item.subareas.map((function (subitem) {
                            var _this = this;

                            subitem.checkedSubarea = false;
                            subitem.idSelectedSub = 0;

                            this.state.dataAtuacaoBd.find(function (itemSelectSub) {
                                if (itemSelectSub.cd_subarea_atuacao === subitem.cd_subarea_atuacao) {
                                    subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                    subitem.checkedSubarea = true;
                                    item.tx_nome_outra = itemSelectSub.tx_nome_outra;
                                    item.idSelectedSub = itemSelectSub.id_area_atuacao;
                                }
                            });

                            return React.createElement(
                                'div',
                                { key: "subarea_" + subitem.cd_subarea_atuacao },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox', onChange: function () {
                                            return _this.checkSubArea(item.cd_area_atuacao, subitem.cd_subarea_atuacao, subitem.checkedSubarea, subitem.idSelectedSub);
                                        } },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_subarea_atuacao, required: true, defaultChecked: subitem.checkedSubarea }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_subarea_atuacao },
                                        subitem.tx_nome_subarea_atuacao
                                    )
                                ),
                                React.createElement('br', null)
                            );
                        }).bind(this));
                    }

                    subareaAtuacao.push(React.createElement(
                        'div',
                        { key: "divArea_" + item.cd_area_atuacao, className: 'card', style: { display: item.checkedAtuacaoArea ? '' : 'none' } },
                        React.createElement(
                            'div',
                            { className: 'bg-lgt p-2' },
                            React.createElement(
                                'strong',
                                null,
                                React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] + " fa-1x" }),
                                ' ',
                                item.tx_nome_area_atuacao
                            ),
                            React.createElement('br', null),
                            React.createElement('hr', null),
                            subarea,
                            React.createElement(
                                'div',
                                { style: { display: this.checkedOutros(item.cd_area_atuacao) ? '' : 'none' } },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_outra', placeholder: ' ', onChange: this.handleInputChange, defaultValue: item.tx_nome_outra }),
                                React.createElement(
                                    'div',
                                    { className: 'float-right', onClick: function () {
                                            return _this2.saveOutrosSub(item.idSelectedSub);
                                        }, style: { margin: '-30px 10px 0 0' } },
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === item.idSelectedSub ? 'none' : '' } },
                                        React.createElement('i', { className: 'far fa-save' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === item.idSelectedSub ? '' : 'none' } },
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                                    )
                                )
                            )
                        )
                    ));

                    return React.createElement(
                        'div',
                        { className: 'col-md-3', key: "area_" + item.cd_area_atuacao },
                        React.createElement(
                            'div',
                            { className: 'bg-lgt items-checkbox custom-checkbox-items' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-chetckbox text-center' },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', onChange: this.callSubareaAtuacao, id: "area_" + item.cd_area_atuacao, required: true, checked: item.checkedAtuacaoArea }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "area_" + item.cd_area_atuacao },
                                    React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] + " fa-2x" }),
                                    React.createElement(
                                        'p',
                                        null,
                                        item.tx_nome_area_atuacao
                                    )
                                )
                            )
                        ),
                        React.createElement('br', null)
                    );
                }).bind(this));
            }

            /////////////////////////////////////////
            var areaAtuacaoCnae = null;
            if (this.state.dataCnaeSubArea) {
                areaAtuacaoCnae = this.state.dataCnaeSubArea.map((function (item) {

                    var teste = '';
                    if (item.dc_subarea_atuacao === null) {
                        teste = 'Não informado';
                    } else {
                        teste = item.dc_subarea_atuacao.tx_nome_subarea_atuacao;
                    }

                    return React.createElement(
                        'div',
                        { key: "area_" + item.cd_area_atuacao },
                        React.createElement(
                            'strong',
                            null,
                            'Subárea: '
                        ),
                        teste
                    );
                }).bind(this));
            }
            /////////////////////////////////////////

            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'title-user-area' },
                        React.createElement(
                            'div',
                            { className: 'mn-accordion-icon' },
                            React.createElement('i', { className: 'fa fa-share-alt', 'aria-hidden': 'true' })
                        ),
                        React.createElement(
                            'h3',
                            null,
                            'Áreas e Subáreas de atuação da OSC'
                        ),
                        React.createElement('hr', null),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-row' },
                        React.createElement(
                            'div',
                            { className: 'form-group col-md-12' },
                            React.createElement(
                                'div',
                                { className: 'alert alert-secondary' },
                                React.createElement(
                                    'div',
                                    { className: 'tooltips float-right' },
                                    React.createElement('i', { className: 'fas fa-database tx-pri' }),
                                    React.createElement(
                                        'span',
                                        { className: 'tooltiptext' },
                                        this.state.tooltip
                                    )
                                ),
                                React.createElement(
                                    'strong',
                                    null,
                                    'Atividade econômica (CNAE): '
                                ),
                                ' ',
                                this.state.dataCnae,
                                ' ',
                                React.createElement('br', null),
                                React.createElement(
                                    'strong',
                                    null,
                                    'Área de Atuação: ',
                                    this.state.dataCnaeArea
                                ),
                                areaAtuacaoCnae
                            )
                        )
                    ),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement(
                                'strong',
                                null,
                                'Área de Atuação'
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'alert alert-danger', role: 'alert', style: { position: 'fixed', zIndex: '999', display: this.state.boxInfo ? '' : 'none' } },
                                    'É preciso excluir as Subárea de Atuação, para desativar uma área!  ',
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-danger', onClick: this.callSubareaAtuacao },
                                        'X'
                                    )
                                ),
                                areaAtuacao,
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12', style: { display: this.state.imputOutros ? '' : 'none' } },
                                    React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_uf', placeholder: ' ' }),
                                    React.createElement('br', null)
                                )
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'text-center', style: { display: this.state.dataAtuacaoBd.length > 0 ? 'none' : '' } },
                                    'Selecione uma área e subárea de atuação!'
                                ),
                                React.createElement(
                                    'strong',
                                    null,
                                    'Subárea de Atuação'
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { className: 'card-columns' },
                                    subareaAtuacao
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Atuacoes;
})(React.Component);

ReactDOM.render(React.createElement(Atuacoes, { id: id }), document.getElementById('atuacoes'));