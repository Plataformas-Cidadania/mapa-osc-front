class FormEditParticipacaoConferencia extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                cd_conferencia: '',
                dt_ano_realizacao: '',
                cd_forma_participacao_conferencia: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                cd_conferencia: true,
                dt_ano_realizacao: true,
                cd_forma_participacao_conferencia: true,
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
        this.editConferencia = this.editConferencia.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    componentDidMount(){
        this.listConferencia();
        this.listForma();
    }

    componentWillReceiveProps(props){
        let lastEditId = this.state.editId;
        if(props.id){
            this.setState({editId: props.id}, function(){
                this.editConferencia();
            });
        }
    }

    editConferencia(){
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/ps_conferencia/'+this.state.editId,
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
        console.log('1111');
        console.log(this.state.editId);

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/ps_conferencia/'+this.state.editId,
                data:{
                    cd_conferencia: this.state.form.cd_conferencia,
                    dt_ano_realizacao: this.state.form.dt_ano_realizacao,
                    cd_forma_participacao_conferencia: this.state.form.cd_forma_participacao_conferencia,
                    ft_conferencia: 'Representante de OSC',
                    ft_ano_realizacao: 'Representante de OSC',
                    ft_forma_participacao_conferencia: 'Representante de OSC',
                    bo_oficial: 0,
                    id_osc: 611720,
                    id: this.state.editId,
                },
                cache: false,
                success: function(data) {
                    console.log('2222', data);

                    this.props.list();
                    this.cleanForm();
                    //this.props.showHideFormConferencia();

                    this.setState({conferencias: data.conferencias, loading: false})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, button: true});
                }.bind(this)
            });
        });


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

        console.log(this.state.editId)

        let anosLista = getOptions().map(function(item, index){
            return (
                <option value={item+'-01-01'} key={'anosLista'+index}>{item}</option>
            );
        }.bind(this));

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
                                     name="cd_conferencia" onChange={this.handleInputChange} defaultValue={this.state.form.cd_conferencia}>
                                <option value="0">Selecione</option>
                                {listConferencia}
                            </select><br/>
                        </div>
                        <div className="label-float">

                            <select  className={"form-control "}
                                     name="dt_ano_realizacao" onChange={this.handleInputChange} defaultValue={this.state.form.dt_ano_realizacao}>
                                <option value="2020-01-01">2020</option>
                                {anosLista}
                            </select><br/>
                        </div>
                        <div className="label-float">
                            <select  className={"form-control "}
                                     name="cd_forma_participacao_conferencia" onChange={this.handleInputChange} defaultValue={this.state.form.cd_forma_participacao_conferencia}>
                                <option value="0">Selecione</option>
                                {listForma}
                            </select><br/>
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
