class FormConselho extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_nome_conselheiro: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                tx_nome_conselheiro: true,
            },
            showMsg: false,
            msg: '',
            conselhos: [],
            maxAlert: false,
            action: '',//new | edit
            editId: this.props.id,
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    componentWillReceiveProps(props){
        let lastEditId = this.state.editId;
        if(this.state.action != props.action || this.state.editId != props.id){
            this.setState({action: props.action, editId: props.id}, function(){
                if(lastEditId != props.id){
                    this.props.showHideFormConselho(this.state.action);
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
            url: getBaseUrl2 + 'osc/conselho/'+this.state.editId,
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

        let url = 'osc/conselho';
        let id = null;
        let method = 'POST';
        if(this.state.action==='edit'){
            id = this.state.editId;
            url = 'osc/conselho/'+id;
            method = 'PUT';
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:method,
                url: getBaseUrl2 + url,
                data:{
                    tx_nome_conselheiro: this.state.form.tx_nome_conselheiro,
                    bo_oficial: 0,
                    id_osc: 455128,
                    id: id,
                },
                cache: false,
                success: function(data) {

                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, conselhos: data.conselhos});
                        return;
                    }

                    let button = true;
                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({conselhos: data.conselhos, loading: false, button: button, btnContinue: btnContinue})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, button: true});
                }.bind(this)
            });
        });


    }

    render(){

        return(
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <input className={"form-control "+(this.state.requireds.tx_nome_conselheiro ? '' : 'invalid-field')}
                               type="text" name="tx_nome_conselheiro" onChange={this.handleInputChange}
                               value={this.state.form.tx_nome_conselheiro} placeholder="Nome"/><br/>

                        <button className="btn btn-success" onClick={this.register}>
                            Cadastrar
                        </button>

                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                        <div style={{display: this.state.maxAlert ? 'block' : 'none'}} className=" alert alert-danger">Máximo de Conselhoz Cadastrados</div>
                    </form>
                </div>
            </div>
        );
    }

}
