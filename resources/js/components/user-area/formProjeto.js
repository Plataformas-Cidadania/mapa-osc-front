class FormProjeto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_nome_projeto: '',
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_projeto: true,
            },
            showMsg: false,
            msg: '',
            projetos: [],

            cd_projeto:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
            },
            action: '',//new | edit
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

            checkedRecurso: false,



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

    componentDidMount(){
        this.listArea();
        this.listStatusProjeto();
    }

    componentWillReceiveProps(props){
        this.cleanForm();
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    cleanForm(){
        /*let form = this.state.form;
        for(let i in form){
            form[i] = '';
        }*/

        let form = {
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
            cd_zona_atuacao_projeto: 0,
        };

        this.setState({form: form});
        this.cleanForm2();
    }

    cleanForm2(){


        let form = {};

        this.setState({form: form});
    }

    validate(){
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        //console.log('****', requireds);

        for(let index in requireds){
            if(!form[index] || form[index]=='' || form[index].trim().length === 0){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }


        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: getBaseUrl2+'osc/projeto',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data:{
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
                    ft_uf: 'Representante de OSC',
                },
                cache: false,
                success: function(data) {

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({
                        projetos: data.projetos,
                        loading: false,
                        editId: data.id_projeto,
                        boxMenuNav: false,
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, button: true});
                }.bind(this)
            });
        });

    }



    listRecursos(){

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/projeto/recursos/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){

                let id_recurso_publico = 0;
                let id_recurso_privado = 0;
                let id_recurso_proprio = 0;
                let id_recurso_nao_financeiro = 0;

                let ft_recursos_publico = false;
                let ft_recursos_privado = false;
                let ft_recursos_proprio = false;
                let ft_recursos_nao_financeiro = false;

                data.find(function(item){
                    if(item.cd_origem_fonte_recursos_projeto===1){
                        id_recurso_publico = item.id_fonte_recursos_projeto;
                        ft_recursos_publico = item.cd_origem_fonte_recursos_projeto === 1 ? true : false;
                    }
                    if(item.cd_origem_fonte_recursos_projeto===2){
                        id_recurso_privado = item.id_fonte_recursos_projeto;
                        ft_recursos_privado = item.cd_origem_fonte_recursos_projeto === 2 ? true : false;
                    }
                    if(item.cd_origem_fonte_recursos_projeto===4){
                        id_recurso_proprio = item.id_fonte_recursos_projeto;
                        ft_recursos_proprio = item.cd_origem_fonte_recursos_projeto === 4 ? true : false;
                    }
                    if(item.cd_origem_fonte_recursos_projeto===3){
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
                    ft_recursos_nao_financeiro: ft_recursos_nao_financeiro,
                }, function(){
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    listTipoParcerias(){

        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/projeto/tipo_parcerias/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){

                let id_tipo_parceria_cooperacao = 0;
                let id_tipo_parceria_fomento = 0;
                let id_tipo_parceria_colaboracao = 0;
                let id_tipo_parceria_parceria = 0;
                let id_tipo_parceria_gestao = 0;
                let id_tipo_parceria_convenio = 0;
                let id_tipo_parceria_outro = 0;

                let tp_cooperacao_tecnica = false;
                let tp_termo_fomento = false;
                let tp_termo_colaboracao = false;
                let tp_termo_parceria = false;
                let tp_contrato_gestao = false;
                let tp_convenio = false;
                let tp_outro = false;

                data.find(function(item){

                    if(item.cd_tipo_parceria_projeto===5){
                        id_tipo_parceria_cooperacao = item.id_tipo_parceria_projeto;
                        tp_cooperacao_tecnica = item.cd_tipo_parceria_projeto === 5 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===0){
                        id_tipo_parceria_fomento = item.id_tipo_parceria_projeto;
                        tp_termo_fomento = item.cd_tipo_parceria_projeto === 0 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===1){
                        id_tipo_parceria_colaboracao = item.id_tipo_parceria_projeto;
                        tp_termo_colaboracao = item.cd_tipo_parceria_projeto === 1 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===2){
                        id_tipo_parceria_parceria = item.id_tipo_parceria_projeto;
                        tp_termo_parceria = item.cd_tipo_parceria_projeto === 2 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===3){
                        id_tipo_parceria_gestao = item.id_tipo_parceria_projeto;
                        tp_contrato_gestao = item.cd_tipo_parceria_projeto === 3 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===4){
                        id_tipo_parceria_convenio = item.id_tipo_parceria_projeto;
                        tp_convenio = item.cd_tipo_parceria_projeto === 4 ? true : false;
                    }
                    if(item.cd_tipo_parceria_projeto===6){
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
                    tp_outro: tp_outro,

                }, function(){
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    checkRecurso(id_recurso, checkedRecurso, id){

        checkedRecurso = !checkedRecurso;

        if(checkedRecurso===true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/projeto/recurso',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {
                    id_projeto: this.state.editId,
                    //cd_fonte_recursos_projeto: id_recurso,
                    ft_fonte_recursos_projeto: 'Representante de OSC',
                    cd_origem_fonte_recursos_projeto: id_recurso,
                    ft_orgao_concedente: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    this.listRecursos();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/projeto/recurso/'+id,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {

                },
                cache: false,
                success: function(data){
                    this.listRecursos();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }
    }

    checkParceria(id_tipo, checkedParceria, id){

        checkedParceria = !checkedParceria;

        if(checkedParceria===true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/projeto/tipo_parceria',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {
                    cd_tipo_parceria_projeto: id_tipo,
                    id_projeto: this.state.editId,
                    ft_tipo_parceria_projeto: 'Representante de OSC',
                    id_fonte_recursos_projeto: this.state.id_recurso_publico,
                },
                cache: false,
                success: function(data){
                    this.listTipoParcerias();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/projeto/tipo_parceria/'+id,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {

                },
                cache: false,
                success: function(data){
                    this.listTipoParcerias();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }
    }


    listArea(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'menu/osc/objetivo_projeto',
            url: getBaseUrl2 + 'objetivos',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, objetivos: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    listParcerias(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/parceiras/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, datalistParcerias: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listObjetivos(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/objetivos/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, datalistParcerias: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listFinanciadores(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/financiadores/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, datalistFinanciadores: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listPublicos(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/publicos/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, datalistPublicos: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    listLocalizacoes(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/localizacoes/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({loading: false, datalistLocalizacoes: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubobjetivos(id){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'componente/metas_objetivo_projeto/'+id,
            url: getBaseUrl2+'objetivos/metas/'+id,
            success: function (data) {

                let objetivos = this.state.objetivos;
                let titleObjetivo = this.state.objetivos[id-1].tx_nome_objetivo_projeto;

                data.find(function(item){
                    item.display = true;
                    item.checked = false;

                });

                objetivos.find(function(item){
                    if(item.metas){
                        item.metas.find(function(itemMeta){
                            itemMeta.display = false;
                        });
                        if(item.cd_objetivo_projeto === id){
                            item.metas.find(function(itemMeta){
                                itemMeta.display = true;
                            });
                        }
                    }
                    if(item.cd_objetivo_projeto === id && !item.metas){
                        item.metas = data;
                    }
                });

                this.setState({
                    loading: false,
                    objetivos: objetivos,
                    id_area:id,
                    buttonObjetivos:id,
                    titleMeta:true,
                    titleObjetivo:titleObjetivo
                })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listChkboxMetas(){

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/projeto/objetivos/'+this.state.editId,
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                    item.metas = null;
                });

                this.setState({dataChkboxMetas: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    checkMetas(cd_objetivo, cd_meta, delId, checkedMeta){
        let objetivos = this.state.objetivos;
        objetivos.find(function(item){
            if(item.cd_objetivo_projeto === cd_objetivo){
                item.metas.find(function (itemMeta) {
                    if(itemMeta.cd_meta_projeto === cd_meta){
                        itemMeta.checked = true;
                    }
                });
            }
        });


        if(checkedMeta===true){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/projeto/objetivo',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {
                    cd_meta_projeto: cd_meta,
                    id_projeto: this.state.editId,
                    ft_objetivo_projeto: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    this.listChkboxMetas();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            console.log('Delete');
            console.log('delId', delId);
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/projeto/objetivo/'+delId,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: {

                },
                cache: false,
                success: function(data){
                    this.listChkboxMetas();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }


        this.setState({objetivos: objetivos});
    }
    /*******************/

    clickFontRecurso() {
        this.setState({
            active: !this.state.active
        });
    }

    showHideForm(action){
        let showForm = !this.state.showForm;
        this.setState({showForm: showForm, actionForm: action});
    }

    listStatusProjeto(){
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'status_projeto',
            success: function (data) {
                this.setState({loading: false, datalistStatusProjeto: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    remove(rota, id){
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2+'osc/projeto/'+rota+'/'+id,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            data: {

            },
            cache: false,
            success: function(data){
                if(rota==='financiador'){
                    this.listFinanciadores();
                }
                if(rota==='publico'){
                    this.listPublicos();
                }
                if(rota==='parceira'){
                    this.listParcerias();
                }
                if(rota==='localizacao'){
                    this.listLocalizacoes();
                }
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });

    }

    removeList(rota, id){
        let removeItem = rota+'_'+id;
        this.setState({removeItem: removeItem});
    }

    saveList(rota, id){
        //console.log('Save id:',id);
        this.setState({saveLoading: rota+'_'+id});
        let url = getBaseUrl2 + 'osc/projeto/'+rota+'/'+id;

        let data = {};
        if(rota==='financiador'){
            data = {
                tx_nome_financiador: this.state.form.tx_nome_financiador,
                id: id,
            }
        }
        if(rota==='publico'){
            data = {
                tx_nome_publico_beneficiado: this.state.form.tx_nome_publico_beneficiado,
                id: id,
            }
        }
        if(rota==='parceira'){
            data = {
                tx_nome_fantasia_osc: this.state.form.tx_nome_fantasia_osc,
                id: id,
            }
        }

        $.ajax({
            method: 'PUT',
            url: url,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('@App:token')
            },
            data: data,
            cache: false,
            success: function(data) {
                this.setState({saveLoading: false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    addList(rota){
        this.setState({showAdd: rota});
    }


    menuNav(id){
        this.setState({menuNavSelected: id});
    }

    menuNavClose(){
        this.setState({
            boxMenuNav: true,
            menuNavSelected: 0
        });
    }


    render(){

        let financiador_projeto = null;
        if(this.state.datalistFinanciadores) {
            financiador_projeto = this.state.datalistFinanciadores.map(function (item, index) {
                return (
                    <div className="label-float" key={"financiador_projeto_" + index}>
                        <input className={"form-control form-g "} type="text" name="tx_nome_financiador" onChange={this.handleInputChange}
                               defaultValue={item.tx_nome_financiador}
                               placeholder="Insica o CNPJ da OSC Parceira" />
                        <label htmlFor="tx_nome_financiador">Financiador do projeto</label>
                        <div className="label-box-info-off">
                            <p>&nbsp;</p>
                        </div>

                        <div className="float-right " style={{margin: '-50px 10px 0 0'}}>
                            <div style={{display: this.state.removeItem == 'financiador_'+item.id_financiador_projeto ? '' : 'none'}}>
                                <div className="btn-xs btn-danger" onClick={() => this.remove('financiador', item.id_financiador_projeto)}>Excluir</div>
                                <div className="btn-xs btn-light" onClick={() => this.removeList(item.id_financiador_projeto)}>Cancelar</div>
                            </div>
                            <div className="float-right" style={{display: this.state.removeItem == 'financiador_'+item.id_financiador_projeto ? 'none' : ''}}>
                                <div className="float-right" onClick={() => this.removeList('financiador', item.id_financiador_projeto)}>
                                    <i className="fas fa-trash-alt text-danger " />
                                </div>
                                <div className="float-right" onClick={() => this.saveList('financiador', item.id_financiador_projeto)}  style={{margin: '0 10px'}}>
                                    <div style={{display: this.state.saveLoading==='financiador_'+item.id_financiador_projeto ? 'none' : ''}}><i className="far fa-save"/></div>
                                    <div style={{display: this.state.saveLoading==='financiador_'+item.id_financiador_projeto ? '' : 'none'}}><i className="fa fa-spin fa-spinner"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));
        }


        let publico_projeto = null;
        if(this.state.datalistPublicos) {
            publico_projeto = this.state.datalistPublicos.map(function (item, index) {
                return (
                    <div className="label-float" key={"publico_projeto_" + index}>
                        <input className={"form-control form-g "} type="text" name="tx_nome_publico_beneficiado" onChange={this.handleInputChange}
                               defaultValue={item.tx_nome_publico_beneficiado}
                               placeholder="Insica o CNPJ da OSC Parceira" />
                        <label htmlFor="tx_nome_publico_beneficiado">Publico do projeto</label>
                        <div className="label-box-info-off">
                            <p>&nbsp;</p>
                        </div>

                        <div className="float-right " style={{margin: '-50px 10px 0 0'}}>
                            <div style={{display: this.state.removeItem == 'publico_'+item.id_publico_beneficiado_projeto ? '' : 'none'}}>
                                <div className="btn-xs btn-danger" onClick={() => this.remove('publico', item.id_publico_beneficiado_projeto)}>Excluir</div>
                                <div className="btn-xs btn-light" onClick={() => this.removeList(item.id_publico_beneficiado_projeto)}>Cancelar</div>
                            </div>
                            <div className="float-right" style={{display: this.state.removeItem == 'publico_'+item.id_publico_beneficiado_projeto ? 'none' : ''}}>
                                <div className="float-right cursor" onClick={() => this.removeList('publico', item.id_publico_beneficiado_projeto)} >
                                    <i className="fas fa-trash-alt text-danger " />
                                </div>
                                <div className="float-right" onClick={() => this.saveList('publico', item.id_publico_beneficiado_projeto)}  style={{margin: '0 10px'}}>
                                    <div style={{display: this.state.saveLoading==='publico_'+item.id_publico_beneficiado_projeto ? 'none' : ''}} className="cursor"><i className="far fa-save"/></div>
                                    <div style={{display: this.state.saveLoading==='publico_'+item.id_publico_beneficiado_projeto ? '' : 'none'}}><i className="fa fa-spin fa-spinner"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));
        }

        let localizacao_projeto = null;
        if(this.state.datalistLocalizacoes) {
            localizacao_projeto = this.state.datalistLocalizacoes.map(function (item, index) {
                return (
                    <div className="col-md-6" key={"localizacao_projeto_" + index}>
                        <div className="label-float">
                            <input className={"form-control form-g "} type="text" name="tx_nome_regiao_localizacao_projeto" onChange={this.handleInputChange}
                                   defaultValue={item.tx_nome_regiao_localizacao_projeto}
                                   placeholder="Insica o Local de execução" />
                            <label htmlFor="tx_nome_Localizacao">Local de execução</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>

                            <div className="float-right " style={{margin: '-50px 10px 0 0'}}>
                                <div style={{display: this.state.removeItem == 'localizacao_'+item.id_localizacao_projeto ? '' : 'none'}}>
                                    <div className="btn-xs btn-danger" onClick={() => this.remove('localizacao', item.id_localizacao_projeto)}>Excluir</div>
                                    <div className="btn-xs btn-light" onClick={() => this.removeList(item.id_localizacao_projeto)}>Cancelar</div>
                                </div>
                                <div className="float-right" style={{display: this.state.removeItem == 'localizacao_'+item.id_localizacao_projeto ? 'none' : ''}}>
                                    <div className="float-right" onClick={() => this.removeList('localizacao', item.id_localizacao_projeto)}>
                                        <i className="fas fa-trash-alt text-danger " />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            }.bind(this));
        }

        let parceira_projeto = null;
        if(this.state.datalistParcerias) {
            parceira_projeto = this.state.datalistParcerias.map(function (item, index) {
                return (
                    <div className="label-float listItemProject" key={"parceira_projeto_" + index}>
                        <input className={"form-control form-g "} type="text" name="tx_nome_fantasia_osc" onChange={this.handleInputChange}
                               defaultValue={item.tx_nome_fantasia_osc}
                               placeholder="Insica o CNPJ da OSC Parceira" />
                        <label htmlFor="tx_nome_fantasia_osc">OSC Parceira</label>
                        <div className="label-box-info-off">
                            <p>&nbsp;</p>
                        </div>


                        <div className="float-right " style={{margin: '-50px 10px 0 0'}}>
                            <div style={{display: this.state.removeItem == 'parceira_'+item.id_osc_parceira_projeto ? '' : 'none'}}>
                                <div className="btn-xs btn-danger" onClick={() => this.remove('parceira', item.id_osc_parceira_projeto)}>Excluir</div>
                                <div className="btn-xs btn-light" onClick={() => this.removeList(item.id_osc_parceira_projeto)}>Cancelar</div>
                            </div>
                            <div className="float-right" style={{display: this.state.removeItem == 'parceira_'+item.id_osc_parceira_projeto ? 'none' : ''}}>
                                <div className="float-right" onClick={() => this.removeList('parceira', item.id_osc_parceira_projeto)}>
                                    <i className="fas fa-trash-alt text-danger " />
                                </div>
                            </div>
                        </div>

                    </div>
                );
            }.bind(this));
        }

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = [];

        if(this.state.objetivos){
            objetivos = this.state.objetivos.map(function (item) {

                let png = padDigits(item.cd_objetivo_projeto, 2);
                let checkedMetas = false;

                if(item.metas){
                    metas.push(item.metas.map(function (itemMeta) {
                        if(itemMeta.checked){
                            checkedMetas = true;
                        }

                        let checkedMeta = false;
                        let id_objetivo_projeto = 0;
                        this.state.dataChkboxMetas.find((itemChecked) => {
                            if(itemMeta.cd_meta_projeto === itemChecked.cd_meta_projeto){
                                checkedMeta = true;
                                id_objetivo_projeto = itemChecked.id_objetivo_projeto;
                            }
                        });

                        return(
                            <div key={"subarea_"+itemMeta.cd_meta_projeto} style={{display: itemMeta.display ? '' : 'none'}}>
                                <div className="custom-control custom-checkbox" onChange={() => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_projeto, !checkedMeta)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+itemMeta.cd_meta_projeto} required defaultChecked={checkedMeta} onChange={this.handleInputChange}/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+itemMeta.cd_meta_projeto} >{itemMeta.tx_nome_meta_projeto}</label>
                                </div>
                                <hr />
                            </div>
                        );
                    }.bind(this)));
                }

                return (
                    <div className="custom-control custom-checkbox" key={"area_"+item.cd_objetivo_projeto} onChange={() => this.callSubobjetivos(item.cd_objetivo_projeto)} style={{paddingLeft: 0}}>
                        <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_objetivo_projeto} required />
                        <label  htmlFor={"area_"+item.cd_objetivo_projeto} style={{marginLeft: '0', marginRight: '5px', paddingBottom: 0, }}>
                            <img src={"img/ods/" + png + ".png"} alt="" className={(checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos==item.cd_objetivo_projeto ? " item-focus" : "")} width="80" style={{position: 'relative'}} title={item.tx_nome_objetivo_projeto}/>
                        </label>
                    </div>
                );
            }.bind(this));
        }


        let status_projeto = null;
        if (this.state.datalistStatusProjeto) {
            status_projeto = this.state.datalistStatusProjeto.map(function (item, index) {
                return (
                    <option value={item.cd_status_projeto}  key={"localizacao_projeto_" + index}>
                        {item.tx_nome_status_projeto}
                    </option>
                );
            }.bind(this));
        }

        return(

            <div>

                <div className="row">
                    <div className="col-md-12">
                        <form  style={{display: this.state.boxMenuNav ? '': 'none'}}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="label-float">
                                        <input className={"form-control form-g "+(this.state.requireds.tx_nome_projeto ? '' : 'invalid-field')} type="text" name="tx_nome_projeto" onChange={this.handleInputChange}
                                               value={this.state.form.tx_nome_projeto}
                                               placeholder="Nome do projeto, atividade ou programa"
                                               required={this.state.requireds.tx_nome_projeto ? '' : 'required'}
                                        />
                                        <label htmlFor="tx_nome_projeto">Nome do projeto, atividade ou programa</label>
                                        <div className="label-box-info-off">
                                            <p style={{display: this.state.requireds.tx_nome_projeto ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"/> Digite o nome do projeto</p>
                                        </div>
                                    </div>
                                    <br/>
                                </div>


                                <div className="col-md-4">

                                        <select className={"form-control form-m "}
                                                name="cd_status_projeto" onChange={this.handleInputChange} value={this.state.form.cd_status_projeto}  >
                                            <option value="-1">Selecione</option>
                                            {status_projeto}
                                            {/*<option value="1">Arquivado, cancelado ou indeferido</option>
                                            <option value="3">Proposta</option>
                                            <option value="4">Projeto em andamento</option>
                                            <option value="2">Finalizado</option>
                                            <option value="5">Outro</option>*/}
                                        </select>
                                        <label htmlFor="cd_status_projeto" className="label-select">Status</label>
                                </div>

                                <div className="form-group col-md-4">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="date" name="dt_data_inicio_projeto" onChange={this.handleInputChange}
                                               value={this.state.form.dt_data_inicio_projeto}
                                               placeholder="Data de Início" />
                                        <label htmlFor="dt_data_inicio_projeto">Data de Início</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-4">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="date" name="dt_data_fim_projeto" onChange={this.handleInputChange}
                                               value={this.state.form.dt_data_fim_projeto}
                                               placeholder="Data de Fim" />
                                        <label htmlFor="dt_data_fim_projeto">Data de Fim</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-8">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="tx_link_projeto" onChange={this.handleInputChange}
                                               value={this.state.form.tx_link_projeto}
                                               placeholder="Link para o projeto" />
                                        <label htmlFor="tx_link_projeto">Link para o projeto</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-4">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="nr_total_beneficiarios" onChange={this.handleInputChange}
                                               value={this.state.form.nr_total_beneficiarios}
                                               placeholder="Total de Beneficiários" />
                                        <label htmlFor="nr_total_beneficiarios">Total de Beneficiários</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-4">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="nr_valor_total_projeto" onChange={this.handleInputChange}
                                               value={formatCurrencyBR(this.state.form.nr_valor_total_projeto)}
                                               placeholder="Valor Total" />
                                        <label htmlFor="nr_valor_total_projeto">Valor Total</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-4">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="nr_valor_captado_projeto" onChange={this.handleInputChange}
                                               value={formatCurrencyBR(this.state.form.nr_valor_captado_projeto)}
                                               placeholder="Valor Recebido" />
                                        <label htmlFor="nr_valor_captado_projeto">Valor Recebido</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="tx_descricao_projeto" onChange={this.handleInputChange}
                                               value={this.state.form.tx_descricao_projeto}
                                               placeholder="Descrição do Projeto, atividade e/ou programa" />
                                        <label htmlFor="tx_descricao_projeto">Descrição do Projeto, atividade e/ou programa</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col-md-12">
                                    <div className="label-float">
                                        <input className={"form-control form-g "} type="text" name="tx_metodologia_monitoramento" onChange={this.handleInputChange}
                                               value={this.state.form.tx_metodologia_monitoramento}
                                               placeholder="Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa" />
                                        <label htmlFor="tx_metodologia_monitoramento">Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa</label>
                                        <div className="label-box-info-off">
                                            <p>&nbsp;</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    {/*<label htmlFor="cd_certificado">Abrangência de atuação*</label><br/>*/}
                                    <select className={"form-control form-m "}
                                            name="cd_abrangencia_projeto" onChange={this.handleInputChange} value={this.state.form.cd_abrangencia_projeto}>
                                        <option value="-1">Selecione</option>
                                        <option value="1">Municipal</option>
                                        <option value="2">Estadual</option>
                                        <option value="3">Regional</option>
                                        <option value="4">Nacional</option>
                                    </select>
                                    <label htmlFor="cd_abrangencia_projeto" className="label-select">Abrangência</label>
                                </div>

                                <div className="col-md-4">
                                    <select className={"form-control form-m "}
                                            name="cd_zona_atuacao_projeto" onChange={this.handleInputChange} value={this.state.form.cd_zona_atuacao_projeto}>
                                        <option value="-1">Selecione</option>
                                        <option value="1">Rural</option>
                                        <option value="2">Urbana</option>
                                        <option value="3">Rural/Urbana</option>
                                    </select>
                                    <label htmlFor="cd_zona_atuacao_projeto" className="label-select">Atuação</label>
                                </div>

                                <div className="col-md-12">
                                    <button className="btn btn-success" disabled={this.state.loading} onClick={this.register}>
                                        Atualizar
                                    </button>
                                    <br/>
                                    <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                                    <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                                </div>
                                <br/><br/><br/>
                            </div>
                        </form>


                        <div className="row box-menu-nav" style={{display: this.state.boxMenuNav ? 'none': ''}}>
                            <div className="col-md-12">
                                <strong>Parabéns!</strong>
                                <p>Seu projeto foi cadastrado com sucesso, complete os dados do mesmo abaixo, navegando pelos itens ou
                                    <button className="btn btn-outline-primary btn-xs"  data-dismiss="modal" aria-label="Fechar" onClick={() => this.menuNavClose()} style={{float: 'none'}}>
                                    completar cadastro mais tarde.
                                </button>
                                </p>
                                <br/>

                            </div>

                            <div className="col-md-2 text-center" onClick={() => this.menuNav(1)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 1 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>Fontes de Recursos</p>
                                </div>
                            </div>
                            <div className="col-md-2 text-center" onClick={() => this.menuNav(2)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 2 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>OSCs Parceiras</p>
                                </div>
                            </div>
                            <div className="col-md-2 text-center" onClick={() => this.menuNav(3)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 3 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>Público Beneficiado</p>
                                </div>
                            </div>
                            <div className="col-md-2 text-center" onClick={() => this.menuNav(4)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 4 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>Local de execução</p>
                                </div>
                            </div>
                            <div className="col-md-2 text-center" onClick={() => this.menuNav(5)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 5 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>Financiadores do Projeto</p>
                                </div>
                            </div>
                            <div className="col-md-2 text-center" onClick={() => this.menuNav(6)}>
                                <div className={"box-menu-nav-selected "+ (this.state.menuNavSelected === 6 ? 'box-menu-nav-selected-active' : '')}>
                                    <i className="fas fa-2x fa-circle"/>
                                    <p>ODS</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="box-menu-line"/>
                            </div>

                        </div>


                        <div className="row" style={{display: this.state.menuNavSelected === 1 ? '' : 'none'}}>


                            {/*Fontes recursos*/}
                            <div className={this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6'}>
                                <br/>
                                <h3>Fontes de Recursos</h3>
                                <hr/>
                                <div className="bg-lgt items-checkbox" onChange={this.clickFontRecurso}>
                                    <div className="custom-control custom-checkbox"  onChange={() => this.checkRecurso(1, this.state.ft_recursos_publico, this.state.id_recurso_publico)}>
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_publico"}  checked={this.state.ft_recursos_publico} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_publico"} >Recursos públicos</label>
                                    </div>
                                    <div className="float-right" style={{display: this.state.ft_recursos_publico === false ? 'none' : '', margin: '8px -20px 0 0'}}>
                                        <i className="fas fa-chevron-right " />
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkRecurso(2, this.state.ft_recursos_privado, this.state.id_recurso_privado)}>
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_privado"}  checked={this.state.ft_recursos_privado} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_privado"} >Recursos privados</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkRecurso(4, this.state.ft_recursos_proprio, this.state.id_recurso_proprio)}>
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_proprio"} checked={this.state.ft_recursos_proprio} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_proprio"} >Recursos próprios</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkRecurso(3,  this.state.ft_recursos_nao_financeiro, this.state.id_recurso_nao_financeiro)}>
                                        <input type="checkbox" className="custom-control-input" id={"fontes_recursos_nao_financeiro"} checked={this.state.ft_recursos_nao_financeiro} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"fontes_recursos_nao_financeiro"} >Recursos não financeiros</label>
                                    </div>
                                </div>
                            </div>
                            {/* ******************************** */}
                            <div className={this.state.ft_recursos_publico === false ? 'col-md-12' : 'col-md-6'} style={{display: this.state.ft_recursos_publico === false ? 'none' : ''}}>
                                <br/>
                                <h3>Tipo de Parceria</h3>
                                <hr/>


                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(5, this.state.tp_cooperacao_tecnica, this.state.id_tipo_parceria_cooperacao)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_cooperacao_tecnica"}  checked={this.state.tp_cooperacao_tecnica} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_cooperacao_tecnica"} >Acordo de cooperação técnica</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(0, this.state.tp_termo_fomento, this.state.id_tipo_parceria_fomento)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_termo_fomento"}  checked={this.state.tp_termo_fomento} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_termo_fomento"} >Termo de fomento</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(1, this.state.tp_termo_colaboracao, this.state.id_tipo_parceria_colaboracao)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_termo_colaboracao"}  checked={this.state.tp_termo_colaboracao} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_termo_colaboracao"} >Termo de colaboração</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(2, this.state.tp_termo_parceria, this.state.id_tipo_parceria_parceria)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_termo_parceria"}  checked={this.state.tp_termo_parceria} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_termo_parceria"} >Termo de parceria</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(3, this.state.tp_contrato_gestao, this.state.id_tipo_parceria_gestao)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_contrato_gestao"}  checked={this.state.tp_contrato_gestao} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_contrato_gestao"} >Contrato de gestão</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(4, this.state.tp_convenio, this.state.id_tipo_parceria_convenio)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_convenio"}  checked={this.state.tp_convenio} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_convenio"} >Convênio</label>
                                    </div>
                                </div>

                                <div className="bg-lgt items-checkbox">
                                    <div className="custom-control custom-checkbox" onChange={() => this.checkParceria(6, this.state.tp_outro, this.state.id_tipo_parceria_outro)}>
                                        <input type="checkbox" className="custom-control-input" id={"tp_outro"}  checked={this.state.tp_outro} onChange={this.handleInputChange}/>
                                        <label className="custom-control-label" htmlFor={"tp_outro"} >Outro</label>
                                    </div>
                                </div>
                            </div>
                            {/*Fontes recursos*/}
                            <div className="col-md-12">
                                <br/>
                                <button className="btn btn-success float-right" onClick={() => this.menuNav(2)}>
                                    Próximo
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <br/>
                                <div className="row" style={{display: this.state.menuNavSelected === 2 ? '' : 'none'}}>
                                    <div className="col-md-12">
                                        {/*//////////////////////OSCs Parceiras//////////////////////*/}
                                        <br/>
                                        <p><strong>OSCs Parceiras</strong></p>
                                        <div className="col-md-1 float-right" style={{marginTop: '15px', marginRight: '-40px'}}>
                                            <a className="btn-add" onClick={() => this.addList('parceira')} style={{display: this.state.showAdd==='parceira' ? "none" : "block"}}>
                                                <i className={"fas fa-2x fa-plus-circle"}/>
                                            </a>
                                            <a className="btn-add btn-add-warning" onClick={() => this.addList('off')} style={{display: this.state.showAdd==='parceira' ? "block" : "none"}}>
                                                <i className={"fas fa-2x fa-times-circle"}/>
                                            </a>
                                        </div>
                                        <hr/>
                                        <div  className="col-md-12" style={{display: this.state.showAdd==='parceira' ? 'block' : 'none'}}>
                                            <FormOscParceira
                                                action={this.state.actionForm}
                                                id={this.state.editId}
                                                listParcerias={this.listParcerias}
                                                showHideForm={this.showHideForm}
                                                closeForm={this.closeForm}
                                                id_projeto={this.state.editId}
                                            />
                                        </div>
                                        {parceira_projeto}
                                        {/*//////////////////////OSCs Parceiras//////////////////////*/}
                                    </div>
                                    <div className="col-md-12">
                                        <br/>
                                        <button className="btn btn-success float-left" onClick={() => this.menuNav(1)}>
                                            Anterior
                                        </button>
                                        <button className="btn btn-success float-right" onClick={() => this.menuNav(3)}>
                                            Próximo
                                        </button>
                                    </div>
                                </div>

                                <br/>
                                <div className="row">
                                    <div className="col-md-12" style={{display: this.state.menuNavSelected === 3 ? '' : 'none'}}>
                                        {/*//////////////////////Financiadores//////////////////////*/}
                                        <br/>
                                        <p><strong>Público Beneficiado</strong></p>
                                        <div className="col-md-1 float-right" style={{marginTop: '15px', marginRight: '-40px'}}>
                                            <a className="btn-add" onClick={() => this.addList('publico')} style={{display: this.state.showAdd==='publico' ? "none" : "block"}}>
                                                <i className={"fas fa-2x fa-plus-circle"}/>
                                            </a>
                                            <a className="btn-add btn-add-warning" onClick={() => this.addList('off')} style={{display: this.state.showAdd==='publico' ? "block" : "none"}}>
                                                <i className={"fas fa-2x fa-times-circle"}/>
                                            </a>
                                        </div>
                                        <hr/>
                                        <div  className="col-md-12" style={{display: this.state.showAdd==='publico' ? 'block' : 'none'}}>
                                            <FormProjetoPublico
                                                id_projeto={this.state.editId}
                                                listPublicos={this.listPublicos}
                                            />
                                        </div>
                                        {publico_projeto}
                                        {/*//////////////////////Financiadores//////////////////////*/}
                                        <div>
                                            <br/>
                                            <button className="btn btn-success float-left" onClick={() => this.menuNav(2)}>
                                                Anterior
                                            </button>
                                            <button className="btn btn-success float-right" onClick={() => this.menuNav(4)}>
                                                Próximo
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-12" style={{display: this.state.menuNavSelected === 4 ? '' : 'none'}}>
                                        {/*//////////////////////Local de execução//////////////////////*/}
                                        <br/>
                                        <p><strong>Local de execução</strong></p>
                                        <div className="col-md-1 float-right" style={{marginTop: '15px', marginRight: '-40px'}}>
                                            <a className="btn-add" onClick={() => this.addList('localizacao')} style={{display: this.state.showAdd==='localizacao' ? "none" : "block"}}>
                                                <i className={"fas fa-2x fa-plus-circle"}/>
                                            </a>
                                            <a className="btn-add btn-add-warning" onClick={() => this.addList('off')} style={{display: this.state.showAdd==='localizacao' ? "block" : "none"}}>
                                                <i className={"fas fa-2x fa-times-circle"}/>
                                            </a>
                                        </div>
                                        <hr/>
                                        <div  className="col-md-12" style={{display: this.state.showAdd==='localizacao' ? 'block' : 'none'}}>
                                            <FormProjetoLocalizacao
                                                id_projeto={this.state.editId}
                                                listLocalizacoes={this.listLocalizacoes}
                                            />
                                        </div>
                                        <div className="row">
                                            {localizacao_projeto}
                                        </div>
                                        <div>
                                            <br/>
                                            <button className="btn btn-success float-left" onClick={() => this.menuNav(3)}>
                                                Anterior
                                            </button>
                                            <button className="btn btn-success float-right" onClick={() => this.menuNav(5)}>
                                                Próximo
                                            </button>
                                        </div>
                                        {/*//////////////////////Local de execução//////////////////////*/}
                                    </div>
                                    <div className="col-md-12" style={{display: this.state.menuNavSelected === 5 ? '' : 'none'}}>
                                        {/*//////////////////////Financiadores//////////////////////*/}
                                        <br/>
                                        <p><strong>Financiadores do Projeto</strong></p>
                                        <div className="col-md-1 float-right" style={{marginTop: '15px', marginRight: '-40px'}}>
                                            <a className="btn-add" onClick={() => this.addList('financiador')} style={{display: this.state.showAdd==='financiador' ? "none" : "block"}}>
                                                <i className={"fas fa-2x fa-plus-circle"}/>
                                            </a>
                                            <a className="btn-add btn-add-warning" onClick={() => this.addList('off')} style={{display: this.state.showAdd==='financiador' ? "block" : "none"}}>
                                                <i className={"fas fa-2x fa-times-circle"}/>
                                            </a>
                                        </div>
                                        <hr/>
                                        <div  className="col-md-12" style={{display: this.state.showAdd==='financiador' ? 'block' : 'none'}}>
                                            <FormProjetoFinanciador
                                                id_projeto={this.state.editId}
                                                listFinanciadores={this.listFinanciadores}
                                            />
                                        </div>
                                        {financiador_projeto}
                                        <div>
                                            <br/>
                                            <button className="btn btn-success float-left" onClick={() => this.menuNav(4)}>
                                                Anterior
                                            </button>
                                            <button className="btn btn-success float-right" onClick={() => this.menuNav(6)}>
                                                Próximo
                                            </button>
                                        </div>
                                        {/*//////////////////////Financiadores//////////////////////*/}
                                    </div>
                                </div>


                                <div className="row"  style={{display: this.state.menuNavSelected === 6 ? '' : 'none'}}>
                                    <div className="col-md-12">
                                        <strong>Objetivos do Desenvolvimento Sustentável - ODS</strong><hr/>
                                        <div>
                                            {objetivos}
                                            <br/><br/>
                                        </div>
                                        <div style={{display: this.state.titleMeta ? '' : 'none'}}>
                                            <strong>Metas Relacionadas ao ODS definido</strong><hr/>
                                            {/* <div className="card-columns">*/}
                                            <div>
                                                <strong>{this.state.titleObjetivo}</strong><br/><br/>
                                                {metas}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <br/>
                                        <button className="btn btn-success float-left" onClick={() => this.menuNav(5)}>
                                            Anterior
                                        </button>
                                        <button className="btn btn-primary float-right"  data-dismiss="modal" aria-label="Fechar" onClick={() => this.menuNavClose()}>
                                            Finalizar
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <br/><br/>
                    </div>
                </div>
            </div>


        );
    }

}
