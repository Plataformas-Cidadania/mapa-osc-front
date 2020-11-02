class FormParticipacaoConselho extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_nome_conselho: '',
                tx_nome_tipo_participacao: '',
                tx_nome_representante_conselho: '',
                tx_periodicidade_reuniao: '',
                dt_data_inicio_conselho: '',
                dt_data_fim_conselho: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_conselho: true,
                tx_nome_tipo_participacao: true,
                tx_nome_representante_conselho: true,
                tx_periodicidade_reuniao: true,
                dt_data_inicio_conselho: true,
                dt_data_fim_conselho: true,
            },
            showMsg: false,
            msg: '',
            participacoes: [],

            tx_nome_conselho2:{
                1: 'Residencial',
                2: 'Comercial',
            },
            tx_nome_tipo_participacao2:{
                1: 'Titular',
                2: 'Suplente',
                3: 'Comercial',
            },
            tx_periodicidade_reuniao2:{
                1: 'Semanal',
                2: 'Mensal',
                3: 'Trimestral',
                4: 'Semestral',
                5: 'Anual',
                6: 'Outra',
            },
            action: '',//new | edit
            editId: this.props.id,


            listConselhos: [],
            listTipo: [],
            listReuniao: [],
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanFormConselho = this.cleanFormConselho.bind(this);


        //this.listConselho = this.listConselho.bind(this);
    }

    componentDidMount(){
        this.listConselho();
        this.listTipo();
        this.listReuniao();
    }

    componentWillReceiveProps(props){
        console.log(props);
        let lastEditId = this.state.editId;
        if(this.state.action != props.action || this.state.editId != props.id){
            this.setState({action: props.action, editId: props.id}, function(){
                if(lastEditId != props.id){
                    this.props.showHideFormConselho(this.state.action);
                    this.edit();
                }
                if(this.state.action=='new'){
                    this.cleanFormConselho();
                }
            });
        }
    }

    edit(){
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/ps_conselho/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({form: data}, function(){
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    cleanFormConselho(){
        let form = this.state.form;
        for(let i in form){
            form[i] = '';
        }
        this.setState({form: form});
    }

    validate(){
        console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let url = 'osc/ps_conselho';
        let id = null;
        let method = 'POST';
        if(this.state.action==='edit'){
            id = this.state.editId;
            url = 'osc/ps_conselho/'+id;
            method = 'PUT';
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:method,
                url: getBaseUrl2 + url,
                data:{
                    cd_conselho: this.state.form.tx_nome_conselho,
                    cd_tipo_participacao: this.state.form.tx_nome_tipo_participacao,
                    tx_nome_representante_conselho: this.state.form.tx_nome_representante_conselho,
                    cd_periodicidade_reuniao_conselho: this.state.form.tx_periodicidade_reuniao,
                    dt_data_inicio_conselho: this.state.form.dt_data_inicio_conselho,
                    dt_data_fim_conselho: this.state.form.dt_data_fim_conselho,
                    bo_oficial: 0,
                    id_osc: 611720,
                    id: id,
                },
                cache: false,
                success: function(data) {

                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, btnContinue:true, participacoes: data.participacoes});
                        return;
                    }

                    let button = true;
                    let btnContinue = false;

                    this.props.list();

                    this.cleanFormConselho();
                    this.props.closeFormConselho();

                    this.setState({participacoes: data.participacoes, loading: false, button: button, btnContinue: btnContinue})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, button: true});
                }.bind(this)
            });
        });


    }

    getAge(dateString){

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))        {
            age--;
        }

        console.log(age);

        return age;

    }

    listConselho(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/conselho',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({listConselhos: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    listTipo(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/tipo_participacao',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({listTipo: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    listReuniao(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/periodicidade_reuniao',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({listReuniao: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }



    render(){


        let listConselhos = this.state.listConselhos.map(function(item, index){
            return (
                <option value={item.cd_conselho} key={'listConselhos'+index}>{item.tx_nome_conselho}</option>
            );
        }.bind(this));

        let listTipo = this.state.listTipo.map(function(item, index){
            return (
                <option value={item.cd_tipo_participacao} key={'listTipo'+index}>{item.tx_nome_tipo_participacao}</option>
            );
        }.bind(this));

        let listReuniao = this.state.listReuniao.map(function(item, index){
            return (
                <option value={item.cd_periodicidade_reuniao_conselho} key={'listReuniao'+index}>{item.tx_nome_periodicidade_reuniao_conselho}</option>
            );
        }.bind(this));




        return(
            <div className="row">
                <div className="col-md-12">
                    <form>


                        <div className="label-float">

                            {/*<label htmlFor="tx_nome_conselho">Nome do Conselho</label><br/>*/}
                            <select  className={"form-control "}
                                name="tx_nome_conselho" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_conselho}>
                                <option value="0">Selecione</option>
                                {listConselhos}
                            </select><br/>

                        </div>
                        <div className="label-float">
                            <select  className={"form-control "}
                                     name="tx_nome_tipo_participacao" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_tipo_participacao}>
                                <option value="0">Selecione</option>
                                {listTipo}
                            </select><br/>

                        </div>
                        <div className="label-float">
                            <input className={"form-control form-g "} type="text" name="tx_nome_representante_conselho" onChange={this.handleInputChange} value={this.state.form.tx_nome_representante_conselho}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="tx_nome_representante_conselho">Nome de representante</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>
                        </div>
                        <div className="label-float">
                            <select  className={"form-control "}
                                     name="tx_periodicidade_reuniao" onChange={this.handleInputChange} defaultValue={this.state.form.tx_periodicidade_reuniao}>
                                <option value="0">Selecione</option>
                                {listReuniao}
                            </select><br/>

                        </div>
                        <div className="label-float">
                            <input className={"form-control form-g "} type="date" name="dt_data_inicio_conselho" onChange={this.handleInputChange} value={this.state.form.dt_data_inicio_conselho}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="dt_data_inicio_conselho">Data de início de vigência</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>
                        </div>
                        <div className="label-float">
                            <input className={"form-control form-g "} type="date" name="dt_data_fim_conselho" onChange={this.handleInputChange} value={this.state.form.dt_data_fim_conselho}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="dt_data_fim_conselho">Data de fim de vigência</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={this.register}>
                            Cadastrar
                        </button>


                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>

                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }

}
