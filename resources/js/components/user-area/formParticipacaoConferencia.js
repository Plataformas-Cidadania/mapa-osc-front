class FormParticipacaoConferencia extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_nome_conferencia: '',
                dt_ano_realizacao: '',
                tx_nome_forma_participacao_conferencia: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_conferencia: true,
                dt_ano_realizacao: true,
                tx_nome_forma_participacao_conferencia: true,
            },
            showMsg: false,
            msg: '',
            conferencias: [],
            maxAlert: false,
            tipo:{
                1: 'Residencial',
                2: 'Comercial',
            },
            principal:{
                1: 'Residencial',
                2: 'Comercial',
            },
            action: '',//new | edit
            editId: this.props.id,


            listConferencia: [],
            listForma: [],
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    componentDidMount(){
        this.listConferencia();
        this.listForma();
    }

    componentWillReceiveProps(props){
        console.log(props);
        let lastEditId = this.state.editId;
        if(this.state.action != props.action || this.state.editId != props.id){
            this.setState({action: props.action, editId: props.id}, function(){
                if(lastEditId != props.id){
                    this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if(this.state.action=='new'){
                    this.cleanForm();
                }
            });
        }
    }

    edit(){
        $.ajax({
            method: 'GET',
            url: '/edit-user-conferencia/'+this.state.editId,
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

    cleanForm(){
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

        let url = '/register-conferencia';
        let id = null;
        if(this.state.action==='edit'){
            id = this.state.editId;
            url = '/update-user-conferencia';
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: url,
                //url: '/register-conferencia',
                data:{
                    tx_nome_conferencia: this.state.form.tx_nome_conferencia,
                    dt_ano_realizacao: this.state.form.dt_ano_realizacao,
                    tx_nome_forma_participacao_conferencia: this.state.form.tx_nome_forma_participacao_conferencia,
                    bo_oficial: 0,
                    id_osc: 455128,
                    id: id,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, conferencias: data.conferencias});
                        return;
                    }

                    /*let button = true;
                    if(data.conferencias.length >= data.maxConferencias){
                        button = false;
                    }*/

                    let button = true;
                    if(this.state.action==='new'){
                        if(data.conferencias.length >= data.maxConferencias){
                            button = false;
                        }
                    }

                    let btnContinue = false;
                    /*if(data.conferencias.length > 0){
                        btnContinue = true;
                    }*/

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({conferencias: data.conferencias, loading: false, button: button, btnContinue: btnContinue})
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

    listConferencia(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/conferencia',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({listConferencia: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    listForma(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({listForma: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }




    render(){

        let listConferencia = this.state.listConferencia.map(function(item, index){
            return (
                <option value={item.cd_conferencia} key={'listReuniao'+index}>{item.tx_nome_conferencia}</option>
            );
        }.bind(this));

        let listForma = this.state.listForma.map(function(item, index){
            return (
                <option value={item.cd_forma_participacao_conferencia} key={'listReuniao'+index}>{item.tx_nome_forma_participacao_conferencia}</option>
            );
        }.bind(this));


        return(
            <div className="row">
                <div className="col-md-12">
                    <form>


                        <div className="label-float">
                            <select  className={"form-control "}
                                     name="tx_nome_conselho" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_conferencia}>
                                <option value="0">Selecione</option>
                                {listConferencia}
                            </select><br/>
                            {/*<input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="tx_link_estatuto_osc">Nome da Conferência</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>*/}
                        </div>
                        <div className="label-float">

                            <select  className={"form-control "}
                                     name="dt_ano_realizacao" onChange={this.handleInputChange} defaultValue={this.state.form.dt_ano_realizacao}>
                                <option value="2020-01-01">2020</option>
                            </select><br/>
                            {/*<input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="tx_link_estatuto_osc">Ano de realização da conferência</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>*/}
                        </div>
                        <div className="label-float">
                            <select  className={"form-control "}
                                     name="tx_nome_conselho" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_conselho}>
                                <option value="0">Selecione</option>
                                {listForma}
                            </select><br/>
                            {/*<input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                   placeholder="Se houver, insira o link que" />
                            <label htmlFor="tx_link_estatuto_osc">Forma de participação na conferência</label>
                            <div className="label-box-info-off">
                                <p>&nbsp;</p>
                            </div>*/}
                        </div>

                        <button className="btn btn-primary" onClick={this.register}>
                            Cadastrar
                        </button>


                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                        <div style={{display: this.state.maxAlert ? 'block' : 'none'}} className=" alert alert-danger">Máximo de Conferenciaz Cadastrados</div>

                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }

}
