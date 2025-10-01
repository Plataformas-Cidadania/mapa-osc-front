'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormProjeto = (function (_React$Component) {
    _inherits(FormProjeto, _React$Component);

    function FormProjeto(props) {
        _classCallCheck(this, FormProjeto);

        _get(Object.getPrototypeOf(FormProjeto.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                tx_nome_projeto: '',
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_projeto: true
            },
            showMsg: false,
            msg: '',
            projetos: [],

            cd_projeto: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            action: '', //new | edit
            editId: this.props.id,

            objetivos: null,
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,

            active: false,

            financiador_projeto: [],
            publico_projeto: [],
            parceira_projeto: [],
            localizacao_projeto: [],

            showForm: false,
            actionForm: '',
            datalistParcerias: [],

            datalistFinanciadores: [],
            datalistPublicos: [],
            datalistLocalizacoes: [],
            removeItem: null,

            showAdd: false,
            saveLoading: '',

            dataChkboxMetas: [],

            menuNavSelected: 0,

            boxMenuNav: true,

            checkedRecurso: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        //this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
        this.cleanForm2 = this.cleanForm2.bind(this);

        this.checkMetas = this.checkMetas.bind(this);
        this.listArea = this.listArea.bind(this);
        this.listParcerias = this.listParcerias.bind(this);
        this.listObjetivos = this.listObjetivos.bind(this);
        this.listChkboxMetas = this.listChkboxMetas.bind(this);
        this.listFinanciadores = this.listFinanciadores.bind(this);
        this.listPublicos = this.listPublicos.bind(this);
        this.listLocalizacoes = this.listLocalizacoes.bind(this);
        this.listRecursos = this.listRecursos.bind(this);
        this.listTipoParcerias = this.listTipoParcerias.bind(this);

        this.clickFontRecurso = this.clickFontRecurso.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);

        this.removeList = this.removeList.bind(this);
        this.saveList = this.saveList.bind(this);
        this.addList = this.addList.bind(this);

        this.menuNav = this.menuNav.bind(this);
        this.menuNavClose = this.menuNavClose.bind(this);

        this.checkRecurso = this.checkRecurso.bind(this);
        this.listStatusProjeto = this.listStatusProjeto.bind(this);
    }

    _createClass(FormProjeto, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listArea();
            this.listStatusProjeto();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.cleanForm();
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
        key: 'cleanForm',
        value: function cleanForm() {
            /*let form = this.state.form;
            for(let i in form){
                form[i] = '';
            }*/

            var form = {
                tx_nome_projeto: '',
                cd_status_projeto: 0,
                dt_data_inicio_projeto: '',
                dt_data_fim_projeto: '',
                tx_link_projeto: '',
                nr_total_beneficiarios: '',
                nr_valor_total_projeto: '',
                nr_valor_captado_projeto: '',
                tx_descricao_projeto: '',
                tx_metodologia_monitoramento: '',
                cd_abrangencia_projeto: 0,
                cd_zona_atuacao_projeto: 0
            };

            this.setState({ form: form });
            this.cleanForm2();
        }
    }, {
        key: 'cleanForm2',
        value: function cleanForm2() {

            var form = {};

            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {
            var valid = true;

            var requireds = this.state.requireds;
            var form = this.state.form;

            //console.log('****', requireds);

            for (var index in requireds) {
                if (!form[index] || form[index] == '' || form[index].trim().length === 0) {
                    requireds[index] = false;
                    valid = false;
                } else {
                    requireds[index] = true;
                }
            }

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

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        //id_osc: 455128,
                        id_osc: this.props.id_osc,
                        tx_nome_projeto: this.state.form.tx_nome_projeto,
                        cd_status_projeto: this.state.form.cd_status_projeto,
                        dt_data_inicio_projeto: this.state.form.dt_data_inicio_projeto,
                        dt_data_fim_projeto: this.state.form.dt_data_fim_projeto,
                        tx_link_projeto: this.state.form.tx_link_projeto,
                        nr_total_beneficiarios: this.state.form.nr_total_beneficiarios,
                        nr_valor_total_projeto: this.state.form.nr_valor_total_projeto,
                        nr_valor_captado_projeto: this.state.form.nr_valor_captado_projeto,
                        tx_descricao_projeto: this.state.form.tx_descricao_projeto,
                        tx_metodologia_monitoramento: this.state.form.tx_metodologia_monitoramento,
                        cd_abrangencia_projeto: this.state.form.cd_abrangencia_projeto,
                        cd_zona_atuacao_projeto: this.state.form.cd_zona_atuacao_projeto,

                        ft_nome_projeto: 'Representante de OSC',
                        ft_status_projeto: 'Representante de OSC',
                        ft_data_inicio_projeto: 'Representante de OSC',
                        ft_data_fim_projeto: 'Representante de OSC',
                        ft_link_projeto: 'Representante de OSC',
                        ft_total_beneficiarios: 'Representante de OSC',
                        ft_valor_captado_projeto: 'Representante de OSC',
                        ft_valor_total_projeto: 'Representante de OSC',
                        ft_abrangencia_projeto: 'Representante de OSC',
                        ft_zona_atuacao_projeto: 'Representante de OSC',
                        ft_descricao_projeto: 'Representante de OSC',
                        ft_metodologia_monitoramento: 'Representante de OSC',
                        ft_identificador_projeto_externo: 'Representante de OSC',
                        ft_municipio: 'Representante de OSC',
                        ft_uf: 'Representante de OSC'
                    },
                    cache: false,
                    success: (function (data) {

                        this.props.list();

                        this.cleanForm();
                        this.props.closeForm();

                        this.setState({
                            projetos: data.projetos,
                            loading: false,
                            editId: data.id_projeto,
                            boxMenuNav: false
                        });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false, button: true });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'listRecursos',
        value: function listRecursos() {

            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/projeto/recursos/' + this.state.editId,
                data: {},
                cache: false,
                success: (function (data) {

                    var id_recurso_publico = 0;
                    var id_recurso_privado = 0;
                    var id_recurso_proprio = 0;
                    var id_recurso_nao_financeiro = 0;

                    var ft_recursos_publico = false;
                    var ft_recursos_privado = false;
                    var ft_recursos_proprio = false;
                    var ft_recursos_nao_financeiro = false;

                    data.find(function (item) {
                        if (item.cd_origem_fonte_recursos_projeto === 1) {
                            id_recurso_publico = item.id_fonte_recursos_projeto;
                            ft_recursos_publico = item.cd_origem_fonte_recursos_projeto === 1 ? true : false;
                        }
                        if (item.cd_origem_fonte_recursos_projeto === 2) {
                            id_recurso_privado = item.id_fonte_recursos_projeto;
                            ft_recursos_privado = item.cd_origem_fonte_recursos_projeto === 2 ? true : false;
                        }
                        if (item.cd_origem_fonte_recursos_projeto === 4) {
                            id_recurso_proprio = item.id_fonte_recursos_projeto;
                            ft_recursos_proprio = item.cd_origem_fonte_recursos_projeto === 4 ? true : false;
                        }
                        if (item.cd_origem_fonte_recursos_projeto === 3) {
                            id_recurso_nao_financeiro = item.id_fonte_recursos_projeto;
                            ft_recursos_nao_financeiro = item.cd_origem_fonte_recursos_projeto === 3 ? true : false;
                        }
                    });

                    this.setState({
                        id_recurso_publico: id_recurso_publico,
                        id_recurso_privado: id_recurso_privado,
                        id_recurso_proprio: id_recurso_proprio,
                        id_recurso_nao_financeiro: id_recurso_nao_financeiro,
                        ft_recursos_publico: ft_recursos_publico,
                        ft_recursos_privado: ft_recursos_privado,
                        ft_recursos_proprio: ft_recursos_proprio,
                        ft_recursos_nao_financeiro: ft_recursos_nao_financeiro
                    }, function () {
                        //this.props.showHideForm();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listTipoParcerias',
        value: function listTipoParcerias() {

            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'osc/projeto/tipo_parcerias/' + this.state.editId,
                data: {},
                cache: false,
                success: (function (data) {

                    var id_tipo_parceria_cooperacao = 0;
                    var id_tipo_parceria_fomento = 0;
                    var id_tipo_parceria_colaboracao = 0;
                    var id_tipo_parceria_parceria = 0;
                    var id_tipo_parceria_gestao = 0;
                    var id_tipo_parceria_convenio = 0;
                    var id_tipo_parceria_outro = 0;

                    var tp_cooperacao_tecnica = false;
                    var tp_termo_fomento = false;
                    var tp_termo_colaboracao = false;
                    var tp_termo_parceria = false;
                    var tp_contrato_gestao = false;
                    var tp_convenio = false;
                    var tp_outro = false;

                    data.find(function (item) {

                        if (item.cd_tipo_parceria_projeto === 5) {
                            id_tipo_parceria_cooperacao = item.id_tipo_parceria_projeto;
                            tp_cooperacao_tecnica = item.cd_tipo_parceria_projeto === 5 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 0) {
                            id_tipo_parceria_fomento = item.id_tipo_parceria_projeto;
                            tp_termo_fomento = item.cd_tipo_parceria_projeto === 0 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 1) {
                            id_tipo_parceria_colaboracao = item.id_tipo_parceria_projeto;
                            tp_termo_colaboracao = item.cd_tipo_parceria_projeto === 1 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 2) {
                            id_tipo_parceria_parceria = item.id_tipo_parceria_projeto;
                            tp_termo_parceria = item.cd_tipo_parceria_projeto === 2 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 3) {
                            id_tipo_parceria_gestao = item.id_tipo_parceria_projeto;
                            tp_contrato_gestao = item.cd_tipo_parceria_projeto === 3 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 4) {
                            id_tipo_parceria_convenio = item.id_tipo_parceria_projeto;
                            tp_convenio = item.cd_tipo_parceria_projeto === 4 ? true : false;
                        }
                        if (item.cd_tipo_parceria_projeto === 6) {
                            id_tipo_parceria_outro = item.id_tipo_parceria_projeto;
                            tp_outro = item.cd_tipo_parceria_projeto === 6 ? true : false;
                        }
                    });

                    this.setState({
                        id_tipo_parceria_cooperacao: id_tipo_parceria_cooperacao,
                        id_tipo_parceria_fomento: id_tipo_parceria_fomento,
                        id_tipo_parceria_colaboracao: id_tipo_parceria_colaboracao,
                        id_tipo_parceria_parceria: id_tipo_parceria_parceria,
                        id_tipo_parceria_gestao: id_tipo_parceria_gestao,
                        id_tipo_parceria_convenio: id_tipo_parceria_convenio,
                        id_tipo_parceria_outro: id_tipo_parceria_outro,

                        tp_cooperacao_tecnica: tp_cooperacao_tecnica,
                        tp_termo_fomento: tp_termo_fomento,
                        tp_termo_colaboracao: tp_termo_colaboracao,
                        tp_termo_parceria: tp_termo_parceria,
                        tp_contrato_gestao: tp_contrato_gestao,
                        tp_convenio: tp_convenio,
                        tp_outro: tp_outro

                    }, function () {
                        //this.props.showHideForm();
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'checkRecurso',
        value: function checkRecurso(id_recurso, checkedRecurso, id) {

            checkedRecurso = !checkedRecurso;

            if (checkedRecurso === true) {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto/recurso',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        id_projeto: this.state.editId,
                        //cd_fonte_recursos_projeto: id_recurso,
                        ft_fonte_recursos_projeto: 'Representante de OSC',
                        cd_origem_fonte_recursos_projeto: id_recurso,
                        ft_orgao_concedente: 'Representante de OSC'
                    },
                    cache: false,
                    success: (function (data) {
                        this.listRecursos();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            } else {
                $.ajax({
                    method: 'DELETE',
                    url: getBaseUrl2 + 'osc/projeto/recurso/' + id,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {},
                    cache: false,
                    success: (function (data) {
                        this.listRecursos();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            }
        }
    }, {
        key: 'checkParceria',
        value: function checkParceria(id_tipo, checkedParceria, id) {

            checkedParceria = !checkedParceria;

            if (checkedParceria === true) {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto/tipo_parceria',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        cd_tipo_parceria_projeto: id_tipo,
                        id_projeto: this.state.editId,
                        ft_tipo_parceria_projeto: 'Representante de OSC',
                        id_fonte_recursos_projeto: this.state.id_recurso_publico
                    },
                    cache: false,
                    success: (function (data) {
                        this.listTipoParcerias();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            } else {
                $.ajax({
                    method: 'DELETE',
                    url: getBaseUrl2 + 'osc/projeto/tipo_parceria/' + id,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {},
                    cache: false,
                    success: (function (data) {
                        this.listTipoParcerias();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            }
        }
    }, {
        key: 'listArea',
        value: function listArea() {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'menu/osc/objetivo_projeto',
                url: getBaseUrl2 + 'objetivos',
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, objetivos: data, button: true });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listParcerias',
        value: function listParcerias() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/parceiras/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, datalistParcerias: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listObjetivos',
        value: function listObjetivos() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/objetivos/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, datalistParcerias: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listFinanciadores',
        value: function listFinanciadores() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/financiadores/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, datalistFinanciadores: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listPublicos',
        value: function listPublicos() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/publicos/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, datalistPublicos: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listLocalizacoes',
        value: function listLocalizacoes() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/localizacoes/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ loading: false, datalistLocalizacoes: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'callSubobjetivos',
        value: function callSubobjetivos(id) {
            this.setState({ button: false });
            $.ajax({
                method: 'GET',
                cache: false,
                //url: getBaseUrl+'componente/metas_objetivo_projeto/'+id,
                url: getBaseUrl2 + 'objetivos/metas/' + id,
                success: (function (data) {

                    var objetivos = this.state.objetivos;
                    var titleObjetivo = this.state.objetivos[id - 1].tx_nome_objetivo_projeto;

                    data.find(function (item) {
                        item.display = true;
                        item.checked = false;
                    });

                    objetivos.find(function (item) {
                        if (item.metas) {
                            item.metas.find(function (itemMeta) {
                                itemMeta.display = false;
                            });
                            if (item.cd_objetivo_projeto === id) {
                                item.metas.find(function (itemMeta) {
                                    itemMeta.display = true;
                                });
                            }
                        }
                        if (item.cd_objetivo_projeto === id && !item.metas) {
                            item.metas = data;
                        }
                    });

                    this.setState({
                        loading: false,
                        objetivos: objetivos,
                        id_area: id,
                        buttonObjetivos: id,
                        titleMeta: true,
                        titleObjetivo: titleObjetivo
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'listChkboxMetas',
        value: function listChkboxMetas() {

            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'osc/projeto/objetivos/' + this.state.editId,
                success: (function (data) {
                    data.find(function (item) {
                        item.checked = false;
                        item.metas = null;
                    });

                    this.setState({ dataChkboxMetas: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'checkMetas',
        value: function checkMetas(cd_objetivo, cd_meta, delId, checkedMeta) {
            var objetivos = this.state.objetivos;
            objetivos.find(function (item) {
                if (item.cd_objetivo_projeto === cd_objetivo) {
                    item.metas.find(function (itemMeta) {
                        if (itemMeta.cd_meta_projeto === cd_meta) {
                            itemMeta.checked = true;
                        }
                    });
                }
            });

            if (checkedMeta === true) {
                $.ajax({
                    method: 'POST',
                    url: getBaseUrl2 + 'osc/projeto/objetivo',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {
                        cd_meta_projeto: cd_meta,
                        id_projeto: this.state.editId,
                        ft_objetivo_projeto: 'Representante de OSC'
                    },
                    cache: false,
                    success: (function (data) {
                        this.listChkboxMetas();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            } else {
                console.log('Delete');
                console.log('delId', delId);
                $.ajax({
                    method: 'DELETE',
                    url: getBaseUrl2 + 'osc/projeto/objetivo/' + delId,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                    },
                    data: {},
                    cache: false,
                    success: (function (data) {
                        this.listChkboxMetas();
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log(status, err.toString());
                    }).bind(this)
                });
            }

            this.setState({ objetivos: objetivos });
        }

        /*******************/

    }, {
        key: 'clickFontRecurso',
        value: function clickFontRecurso() {
            this.setState({
                active: !this.state.active
            });
        }
    }, {
        key: 'showHideForm',
        value: function showHideForm(action) {
            var showForm = !this.state.showForm;
            this.setState({ showForm: showForm, actionForm: action });
        }
    }, {
        key: 'listStatusProjeto',
        value: function listStatusProjeto() {
            $.ajax({
                method: 'GET',
                cache: false,
                url: getBaseUrl2 + 'status_projeto',
                success: (function (data) {
                    this.setState({ loading: false, datalistStatusProjeto: data });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'remove',
        value: function remove(rota, id) {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/projeto/' + rota + '/' + id,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {},
                cache: false,
                success: (function (data) {
                    if (rota === 'financiador') {
                        this.listFinanciadores();
                    }
                    if (rota === 'publico') {
                        this.listPublicos();
                    }
                    if (rota === 'parceira') {
                        this.listParcerias();
                    }
                    if (rota === 'localizacao') {
                        this.listLocalizacoes();
                    }
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log(status, err.toString());
                }).bind(this)
            });
        }
    }, {
        key: 'removeList',
        value: function removeList(rota, id) {
            var removeItem = rota + '_' + id;
            this.setState({ removeItem: removeItem });
        }
    }, {
        key: 'saveList',
        value: function saveList(rota, id) {
            //console.log('Save id:',id);
            this.setState({ saveLoading: rota + '_' + id });
            var url = getBaseUrl2 + 'osc/projeto/' + rota + '/' + id;

            var data = {};
            if (rota === 'financiador') {
                data = {
                    tx_nome_financiador: this.state.form.tx_nome_financiador,
                    id: id
                };
            }
            if (rota === 'publico') {
                data = {
                    tx_nome_publico_beneficiado: this.state.form.tx_nome_publico_beneficiado,
                    id: id
                };
            }
            if (rota === 'parceira') {
                data = {
                    tx_nome_fantasia_osc: this.state.form.tx_nome_fantasia_osc,
                    id: id
                };
            }

            $.ajax({
                method: 'PUT',
                url: url,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: data,
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
        key: 'addList',
        value: function addList(rota) {
            this.setState({ showAdd: rota });
        }
    }, {
        key: 'menuNav',
        value: function menuNav(id) {
            this.setState({ menuNavSelected: id });
        }
    }, {
        key: 'menuNavClose',
        value: function menuNavClose() {
            this.setState({
                boxMenuNav: true,
                menuNavSelected: 0
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var financiador_projeto = null;
            if (this.state.datalistFinanciadores) {
                financiador_projeto = this.state.datalistFinanciadores.map((function (item, index) {
                    var _this = this;

                    return React.createElement(
                        'div',
                        { className: 'label-float', key: "financiador_projeto_" + index },
                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_financiador', onChange: this.handleInputChange,
                            defaultValue: item.tx_nome_financiador,
                            placeholder: 'Insica o CNPJ da OSC Parceira' }),
                        React.createElement(
                            'label',
                            { htmlFor: 'tx_nome_financiador' },
                            'Financiador do projeto'
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
                            { className: 'float-right ', style: { margin: '-50px 10px 0 0' } },
                            React.createElement(
                                'div',
                                { style: { display: this.state.removeItem == 'financiador_' + item.id_financiador_projeto ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-danger', onClick: function () {
                                            return _this.remove('financiador', item.id_financiador_projeto);
                                        } },
                                    'Excluir'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-light', onClick: function () {
                                            return _this.removeList(item.id_financiador_projeto);
                                        } },
                                    'Cancelar'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'float-right', style: { display: this.state.removeItem == 'financiador_' + item.id_financiador_projeto ? 'none' : '' } },
                                React.createElement(
                                    'div',
                                    { className: 'float-right', onClick: function () {
                                            return _this.removeList('financiador', item.id_financiador_projeto);
                                        } },
                                    React.createElement('i', { className: 'fas fa-trash-alt text-danger ' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'float-right', onClick: function () {
                                            return _this.saveList('financiador', item.id_financiador_projeto);
                                        }, style: { margin: '0 10px' } },
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === 'financiador_' + item.id_financiador_projeto ? 'none' : '' } },
                                        React.createElement('i', { className: 'far fa-save' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === 'financiador_' + item.id_financiador_projeto ? '' : 'none' } },
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                                    )
                                )
                            )
                        )
                    );
                }).bind(this));
            }

            var publico_projeto = null;
            if (this.state.datalistPublicos) {
                publico_projeto = this.state.datalistPublicos.map((function (item, index) {
                    var _this2 = this;

                    return React.createElement(
                        'div',
                        { className: 'label-float', key: "publico_projeto_" + index },
                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_publico_beneficiado', onChange: this.handleInputChange,
                            defaultValue: item.tx_nome_publico_beneficiado,
                            placeholder: 'Insica o CNPJ da OSC Parceira' }),
                        React.createElement(
                            'label',
                            { htmlFor: 'tx_nome_publico_beneficiado' },
                            'Publico do projeto'
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
                            { className: 'float-right ', style: { margin: '-50px 10px 0 0' } },
                            React.createElement(
                                'div',
                                { style: { display: this.state.removeItem == 'publico_' + item.id_publico_beneficiado_projeto ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-danger', onClick: function () {
                                            return _this2.remove('publico', item.id_publico_beneficiado_projeto);
                                        } },
                                    'Excluir'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-light', onClick: function () {
                                            return _this2.removeList(item.id_publico_beneficiado_projeto);
                                        } },
                                    'Cancelar'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'float-right', style: { display: this.state.removeItem == 'publico_' + item.id_publico_beneficiado_projeto ? 'none' : '' } },
                                React.createElement(
                                    'div',
                                    { className: 'float-right cursor', onClick: function () {
                                            return _this2.removeList('publico', item.id_publico_beneficiado_projeto);
                                        } },
                                    React.createElement('i', { className: 'fas fa-trash-alt text-danger ' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'float-right', onClick: function () {
                                            return _this2.saveList('publico', item.id_publico_beneficiado_projeto);
                                        }, style: { margin: '0 10px' } },
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === 'publico_' + item.id_publico_beneficiado_projeto ? 'none' : '' }, className: 'cursor' },
                                        React.createElement('i', { className: 'far fa-save' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.saveLoading === 'publico_' + item.id_publico_beneficiado_projeto ? '' : 'none' } },
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                                    )
                                )
                            )
                        )
                    );
                }).bind(this));
            }

            var localizacao_projeto = null;
            if (this.state.datalistLocalizacoes) {
                localizacao_projeto = this.state.datalistLocalizacoes.map((function (item, index) {
                    var _this3 = this;

                    return React.createElement(
                        'div',
                        { className: 'col-md-6', key: "localizacao_projeto_" + index },
                        React.createElement(
                            'div',
                            { className: 'label-float' },
                            React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_regiao_localizacao_projeto', onChange: this.handleInputChange,
                                defaultValue: item.tx_nome_regiao_localizacao_projeto,
                                placeholder: 'Insica o Local de execução' }),
                            React.createElement(
                                'label',
                                { htmlFor: 'tx_nome_Localizacao' },
                                'Local de execução'
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
                                { className: 'float-right ', style: { margin: '-50px 10px 0 0' } },
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.removeItem == 'localizacao_' + item.id_localizacao_projeto ? '' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'btn-xs btn-danger', onClick: function () {
                                                return _this3.remove('localizacao', item.id_localizacao_projeto);
                                            } },
                                        'Excluir'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'btn-xs btn-light', onClick: function () {
                                                return _this3.removeList(item.id_localizacao_projeto);
                                            } },
                                        'Cancelar'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'float-right', style: { display: this.state.removeItem == 'localizacao_' + item.id_localizacao_projeto ? 'none' : '' } },
                                    React.createElement(
                                        'div',
                                        { className: 'float-right', onClick: function () {
                                                return _this3.removeList('localizacao', item.id_localizacao_projeto);
                                            } },
                                        React.createElement('i', { className: 'fas fa-trash-alt text-danger ' })
                                    )
                                )
                            )
                        )
                    );
                }).bind(this));
            }

            var parceira_projeto = null;
            if (this.state.datalistParcerias) {
                parceira_projeto = this.state.datalistParcerias.map((function (item, index) {
                    var _this4 = this;

                    return React.createElement(
                        'div',
                        { className: 'label-float listItemProject', key: "parceira_projeto_" + index },
                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_fantasia_osc', onChange: this.handleInputChange,
                            defaultValue: item.tx_nome_fantasia_osc,
                            placeholder: 'Insica o CNPJ da OSC Parceira' }),
                        React.createElement(
                            'label',
                            { htmlFor: 'tx_nome_fantasia_osc' },
                            'OSC Parceira'
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
                            { className: 'float-right ', style: { margin: '-50px 10px 0 0' } },
                            React.createElement(
                                'div',
                                { style: { display: this.state.removeItem == 'parceira_' + item.id_osc_parceira_projeto ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-danger', onClick: function () {
                                            return _this4.remove('parceira', item.id_osc_parceira_projeto);
                                        } },
                                    'Excluir'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-xs btn-light', onClick: function () {
                                            return _this4.removeList(item.id_osc_parceira_projeto);
                                        } },
                                    'Cancelar'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'float-right', style: { display: this.state.removeItem == 'parceira_' + item.id_osc_parceira_projeto ? 'none' : '' } },
                                React.createElement(
                                    'div',
                                    { className: 'float-right', onClick: function () {
                                            return _this4.removeList('parceira', item.id_osc_parceira_projeto);
                                        } },
                                    React.createElement('i', { className: 'fas fa-trash-alt text-danger ' })
                                )
                            )
                        )
                    );
                }).bind(this));
            }

            function padDigits(number, digits) {
                return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
            }

            var objetivos = null;
            var metas = [];

            if (this.state.objetivos) {
                objetivos = this.state.objetivos.map((function (item) {
                    var _this6 = this;

                    var png = padDigits(item.cd_objetivo_projeto, 2);
                    var checkedMetas = false;

                    if (item.metas) {
                        metas.push(item.metas.map((function (itemMeta) {
                            var _this5 = this;

                            if (itemMeta.checked) {
                                checkedMetas = true;
                            }

                            var checkedMeta = false;
                            var id_objetivo_projeto = 0;
                            this.state.dataChkboxMetas.find(function (itemChecked) {
                                if (itemMeta.cd_meta_projeto === itemChecked.cd_meta_projeto) {
                                    checkedMeta = true;
                                    id_objetivo_projeto = itemChecked.id_objetivo_projeto;
                                }
                            });

                            return React.createElement(
                                'div',
                                { key: "subarea_" + itemMeta.cd_meta_projeto, style: { display: itemMeta.display ? '' : 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'custom-control custom-checkbox', onChange: function () {
                                            return _this5.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_projeto, !checkedMeta);
                                        } },
                                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + itemMeta.cd_meta_projeto, required: true, defaultChecked: checkedMeta, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'label',
                                        { className: 'custom-control-label', htmlFor: "subarea_" + itemMeta.cd_meta_projeto },
                                        itemMeta.tx_nome_meta_projeto
                                    )
                                ),
                                React.createElement('hr', null)
                            );
                        }).bind(this)));
                    }

                    return React.createElement(
                        'div',
                        { className: 'custom-control custom-checkbox', key: "area_" + item.cd_objetivo_projeto, onChange: function () {
                                return _this6.callSubobjetivos(item.cd_objetivo_projeto);
                            }, style: { paddingLeft: 0 } },
                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_objetivo_projeto, required: true }),
                        React.createElement(
                            'label',
                            { htmlFor: "area_" + item.cd_objetivo_projeto, style: { marginLeft: '0', marginRight: '5px', paddingBottom: 0 } },
                            React.createElement('img', { src: "img/ods/" + png + ".png", alt: '', className: (checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos == item.cd_objetivo_projeto ? " item-focus" : ""), width: '80', style: { position: 'relative' }, title: item.tx_nome_objetivo_projeto })
                        )
                    );
                }).bind(this));
            }

            var status_projeto = null;
            if (this.state.datalistStatusProjeto) {
                status_projeto = this.state.datalistStatusProjeto.map((function (item, index) {
                    return React.createElement(
                        'option',
                        { value: item.cd_status_projeto, key: "localizacao_projeto_" + index },
                        item.tx_nome_status_projeto
                    );
                }).bind(this));
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'form',
                            { style: { display: this.state.boxMenuNav ? '' : 'none' } },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g " + (this.state.requireds.tx_nome_projeto ? '' : 'invalid-field'), type: 'text', name: 'tx_nome_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.tx_nome_projeto,
                                            placeholder: 'Nome do projeto, atividade ou programa',
                                            required: this.state.requireds.tx_nome_projeto ? '' : 'required'
                                        }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_nome_projeto' },
                                            'Nome do projeto, atividade ou programa'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                { style: { display: this.state.requireds.tx_nome_projeto ? 'none' : 'block' } },
                                                React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                                ' Digite o nome do projeto'
                                            )
                                        )
                                    ),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'select',
                                        { className: "form-control form-m ",
                                            name: 'cd_status_projeto', onChange: this.handleInputChange, value: this.state.form.cd_status_projeto },
                                        React.createElement(
                                            'option',
                                            { value: '-1' },
                                            'Selecione'
                                        ),
                                        status_projeto
                                    ),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'cd_status_projeto', className: 'label-select' },
                                        'Status'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_inicio_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.dt_data_inicio_projeto,
                                            placeholder: 'Data de Início' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'dt_data_inicio_projeto' },
                                            'Data de Início'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_data_fim_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.dt_data_fim_projeto,
                                            placeholder: 'Data de Fim' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'dt_data_fim_projeto' },
                                            'Data de Fim'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-8' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_link_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.tx_link_projeto,
                                            placeholder: 'Link para o projeto' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_link_projeto' },
                                            'Link para o projeto'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_total_beneficiarios', onChange: this.handleInputChange,
                                            value: this.state.form.nr_total_beneficiarios,
                                            placeholder: 'Total de Beneficiários' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'nr_total_beneficiarios' },
                                            'Total de Beneficiários'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_valor_total_projeto', onChange: this.handleInputChange,
                                            value: formatCurrencyBR(this.state.form.nr_valor_total_projeto),
                                            placeholder: 'Valor Total' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'nr_valor_total_projeto' },
                                            'Valor Total'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'nr_valor_captado_projeto', onChange: this.handleInputChange,
                                            value: formatCurrencyBR(this.state.form.nr_valor_captado_projeto),
                                            placeholder: 'Valor Recebido' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'nr_valor_captado_projeto' },
                                            'Valor Recebido'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_descricao_projeto', onChange: this.handleInputChange,
                                            value: this.state.form.tx_descricao_projeto,
                                            placeholder: 'Descrição do Projeto, atividade e/ou programa' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_descricao_projeto' },
                                            'Descrição do Projeto, atividade e/ou programa'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_metodologia_monitoramento', onChange: this.handleInputChange,
                                            value: this.state.form.tx_metodologia_monitoramento,
                                            placeholder: 'Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_metodologia_monitoramento' },
                                            'Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa'
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
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'select',
                                        { className: "form-control form-m ",
                                            name: 'cd_abrangencia_projeto', onChange: this.handleInputChange, value: this.state.form.cd_abrangencia_projeto },
                                        React.createElement(
                                            'option',
                                            { value: '-1' },
                                            'Selecione'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            'Municipal'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            'Estadual'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            'Regional'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '4' },
                                            'Nacional'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'cd_abrangencia_projeto', className: 'label-select' },
                                        'Abrangência'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-4' },
                                    React.createElement(
                                        'select',
                                        { className: "form-control form-m ",
                                            name: 'cd_zona_atuacao_projeto', onChange: this.handleInputChange, value: this.state.form.cd_zona_atuacao_projeto },
                                        React.createElement(
                                            'option',
                                            { value: '-1' },
                                            'Selecione'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            'Rural'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            'Urbana'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            'Rural/Urbana'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'cd_zona_atuacao_projeto', className: 'label-select' },
                                        'Atuação'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-success', disabled: this.state.loading, onClick: this.register },
                                        'Atualizar'
                                    ),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-danger' },
                                        this.state.msg
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.loading ? 'block' : 'none' } },
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                        'Processando'
                                    )
                                ),
                                React.createElement('br', null),
                                React.createElement('br', null),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row box-menu-nav', style: { display: this.state.boxMenuNav ? 'none' : '' } },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'strong',
                                    null,
                                    'Parabéns!'
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    'Seu projeto foi cadastrado com sucesso, complete os dados do mesmo abaixo, navegando pelos itens ou',
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-outline-primary btn-xs', 'data-dismiss': 'modal', 'aria-label': 'Fechar', onClick: function () {
                                                return _this7.menuNavClose();
                                            }, style: { float: 'none' } },
                                        'completar cadastro mais tarde.'
                                    )
                                ),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(1);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 1 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Fontes de Recursos'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(2);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 2 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'OSCs Parceiras'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(3);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 3 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Público Beneficiado'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(4);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 4 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Local de execução'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(5);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 5 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Financiadores do Projeto'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-2 text-center', onClick: function () {
                                        return _this7.menuNav(6);
                                    } },
                                React.createElement(
                                    'div',
                                    { className: "box-menu-nav-selected " + (this.state.menuNavSelected === 6 ? 'box-menu-nav-selected-active' : '') },
                                    React.createElement('i', { className: 'fas fa-2x fa-circle' }),
                                    React.createElement(
                                        'p',
                                        null,
                                        'ODS'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement('div', { className: 'box-menu-line' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.menuNavSelected === 1 ? '' : 'none' } },
                            React.createElement(
                                'div',
                                { className: this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6' },
                                React.createElement('br', null),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Fontes de Recursos'
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox', onChange: this.clickFontRecurso },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkRecurso(1, _this7.state.ft_recursos_publico, _this7.state.id_recurso_publico);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_publico", checked: this.state.ft_recursos_publico, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "fontes_recursos_publico" },
                                            'Recursos públicos'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'float-right', style: { display: this.state.ft_recursos_publico === false ? 'none' : '', margin: '8px -20px 0 0' } },
                                        React.createElement('i', { className: 'fas fa-chevron-right ' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkRecurso(2, _this7.state.ft_recursos_privado, _this7.state.id_recurso_privado);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_privado", checked: this.state.ft_recursos_privado, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "fontes_recursos_privado" },
                                            'Recursos privados'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkRecurso(4, _this7.state.ft_recursos_proprio, _this7.state.id_recurso_proprio);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_proprio", checked: this.state.ft_recursos_proprio, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "fontes_recursos_proprio" },
                                            'Recursos próprios'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkRecurso(3, _this7.state.ft_recursos_nao_financeiro, _this7.state.id_recurso_nao_financeiro);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "fontes_recursos_nao_financeiro", checked: this.state.ft_recursos_nao_financeiro, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "fontes_recursos_nao_financeiro" },
                                            'Recursos não financeiros'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6', style: { display: this.state.ft_recursos_publico === false ? 'none' : '' } },
                                React.createElement('br', null),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Tipo de Parceria'
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(5, _this7.state.tp_cooperacao_tecnica, _this7.state.id_tipo_parceria_cooperacao);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_cooperacao_tecnica", checked: this.state.tp_cooperacao_tecnica, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_cooperacao_tecnica" },
                                            'Acordo de cooperação técnica'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(0, _this7.state.tp_termo_fomento, _this7.state.id_tipo_parceria_fomento);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_fomento", checked: this.state.tp_termo_fomento, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_termo_fomento" },
                                            'Termo de fomento'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(1, _this7.state.tp_termo_colaboracao, _this7.state.id_tipo_parceria_colaboracao);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_colaboracao", checked: this.state.tp_termo_colaboracao, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_termo_colaboracao" },
                                            'Termo de colaboração'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(2, _this7.state.tp_termo_parceria, _this7.state.id_tipo_parceria_parceria);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_termo_parceria", checked: this.state.tp_termo_parceria, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_termo_parceria" },
                                            'Termo de parceria'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(3, _this7.state.tp_contrato_gestao, _this7.state.id_tipo_parceria_gestao);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_contrato_gestao", checked: this.state.tp_contrato_gestao, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_contrato_gestao" },
                                            'Contrato de gestão'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(4, _this7.state.tp_convenio, _this7.state.id_tipo_parceria_convenio);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_convenio", checked: this.state.tp_convenio, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_convenio" },
                                            'Convênio'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt items-checkbox' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox', onChange: function () {
                                                return _this7.checkParceria(6, _this7.state.tp_outro, _this7.state.id_tipo_parceria_outro);
                                            } },
                                        React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "tp_outro", checked: this.state.tp_outro, onChange: this.handleInputChange }),
                                        React.createElement(
                                            'label',
                                            { className: 'custom-control-label', htmlFor: "tp_outro" },
                                            'Outro'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement('br', null),
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-success float-right', onClick: function () {
                                            return _this7.menuNav(2);
                                        } },
                                    'Próximo'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'row', style: { display: this.state.menuNavSelected === 2 ? '' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                'OSCs Parceiras'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-1 float-right', style: { marginTop: '15px', marginRight: '-40px' } },
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add', onClick: function () {
                                                        return _this7.addList('parceira');
                                                    }, style: { display: this.state.showAdd === 'parceira' ? "none" : "block" } },
                                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                                            ),
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add btn-add-warning', onClick: function () {
                                                        return _this7.addList('off');
                                                    }, style: { display: this.state.showAdd === 'parceira' ? "block" : "none" } },
                                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                                            )
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12', style: { display: this.state.showAdd === 'parceira' ? 'block' : 'none' } },
                                            React.createElement(FormOscParceira, {
                                                action: this.state.actionForm,
                                                id: this.state.editId,
                                                listParcerias: this.listParcerias,
                                                showHideForm: this.showHideForm,
                                                closeForm: this.closeForm,
                                                id_projeto: this.state.editId
                                            })
                                        ),
                                        parceira_projeto
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-success float-left', onClick: function () {
                                                    return _this7.menuNav(1);
                                                } },
                                            'Anterior'
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-success float-right', onClick: function () {
                                                    return _this7.menuNav(3);
                                                } },
                                            'Próximo'
                                        )
                                    )
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12', style: { display: this.state.menuNavSelected === 3 ? '' : 'none' } },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Público Beneficiado'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-1 float-right', style: { marginTop: '15px', marginRight: '-40px' } },
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add', onClick: function () {
                                                        return _this7.addList('publico');
                                                    }, style: { display: this.state.showAdd === 'publico' ? "none" : "block" } },
                                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                                            ),
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add btn-add-warning', onClick: function () {
                                                        return _this7.addList('off');
                                                    }, style: { display: this.state.showAdd === 'publico' ? "block" : "none" } },
                                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                                            )
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12', style: { display: this.state.showAdd === 'publico' ? 'block' : 'none' } },
                                            React.createElement(FormProjetoPublico, {
                                                id_projeto: this.state.editId,
                                                listPublicos: this.listPublicos
                                            })
                                        ),
                                        publico_projeto,
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('br', null),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-left', onClick: function () {
                                                        return _this7.menuNav(2);
                                                    } },
                                                'Anterior'
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-right', onClick: function () {
                                                        return _this7.menuNav(4);
                                                    } },
                                                'Próximo'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12', style: { display: this.state.menuNavSelected === 4 ? '' : 'none' } },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Local de execução'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-1 float-right', style: { marginTop: '15px', marginRight: '-40px' } },
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add', onClick: function () {
                                                        return _this7.addList('localizacao');
                                                    }, style: { display: this.state.showAdd === 'localizacao' ? "none" : "block" } },
                                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                                            ),
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add btn-add-warning', onClick: function () {
                                                        return _this7.addList('off');
                                                    }, style: { display: this.state.showAdd === 'localizacao' ? "block" : "none" } },
                                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                                            )
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12', style: { display: this.state.showAdd === 'localizacao' ? 'block' : 'none' } },
                                            React.createElement(FormProjetoLocalizacao, {
                                                id_projeto: this.state.editId,
                                                listLocalizacoes: this.listLocalizacoes
                                            })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            localizacao_projeto
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('br', null),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-left', onClick: function () {
                                                        return _this7.menuNav(3);
                                                    } },
                                                'Anterior'
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-right', onClick: function () {
                                                        return _this7.menuNav(5);
                                                    } },
                                                'Próximo'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12', style: { display: this.state.menuNavSelected === 5 ? '' : 'none' } },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Financiadores do Projeto'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-1 float-right', style: { marginTop: '15px', marginRight: '-40px' } },
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add', onClick: function () {
                                                        return _this7.addList('financiador');
                                                    }, style: { display: this.state.showAdd === 'financiador' ? "none" : "block" } },
                                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                                            ),
                                            React.createElement(
                                                'a',
                                                { className: 'btn-add btn-add-warning', onClick: function () {
                                                        return _this7.addList('off');
                                                    }, style: { display: this.state.showAdd === 'financiador' ? "block" : "none" } },
                                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                                            )
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12', style: { display: this.state.showAdd === 'financiador' ? 'block' : 'none' } },
                                            React.createElement(FormProjetoFinanciador, {
                                                id_projeto: this.state.editId,
                                                listFinanciadores: this.listFinanciadores
                                            })
                                        ),
                                        financiador_projeto,
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('br', null),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-left', onClick: function () {
                                                        return _this7.menuNav(4);
                                                    } },
                                                'Anterior'
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-success float-right', onClick: function () {
                                                        return _this7.menuNav(6);
                                                    } },
                                                'Próximo'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'row', style: { display: this.state.menuNavSelected === 6 ? '' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Objetivos do Desenvolvimento Sustentável - ODS'
                                        ),
                                        React.createElement('hr', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            objetivos,
                                            React.createElement('br', null),
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.titleMeta ? '' : 'none' } },
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Metas Relacionadas ao ODS definido'
                                            ),
                                            React.createElement('hr', null),
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement(
                                                    'strong',
                                                    null,
                                                    this.state.titleObjetivo
                                                ),
                                                React.createElement('br', null),
                                                React.createElement('br', null),
                                                metas
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement('br', null),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-success float-left', onClick: function () {
                                                    return _this7.menuNav(5);
                                                } },
                                            'Anterior'
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-primary float-right', 'data-dismiss': 'modal', 'aria-label': 'Fechar', onClick: function () {
                                                    return _this7.menuNavClose();
                                                } },
                                            'Finalizar'
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null)
                    )
                )
            );
        }
    }]);

    return FormProjeto;
})(React.Component);

/*<option value="1">Arquivado, cancelado ou indeferido</option>
<option value="3">Proposta</option>
<option value="4">Projeto em andamento</option>
<option value="2">Finalizado</option>
<option value="5">Outro</option>*/ /*<label htmlFor="cd_certificado">Abrangência de atuação*</label><br/>*/ /*Fontes recursos*/ /* ******************************** */ /*Fontes recursos*/ /*//////////////////////OSCs Parceiras//////////////////////*/ /*//////////////////////OSCs Parceiras//////////////////////*/ /*//////////////////////Financiadores//////////////////////*/ /*//////////////////////Financiadores//////////////////////*/ /*//////////////////////Local de execução//////////////////////*/ /*//////////////////////Local de execução//////////////////////*/ /*//////////////////////Financiadores//////////////////////*/ /*//////////////////////Financiadores//////////////////////*/ /* <div className="card-columns">*/