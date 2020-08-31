class FormCertificate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                dt_inicio_certificado: '',
                dt_fim_certificado: '',
                cd_uf: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_certificado: true,
                dt_fim_certificado: true,
                cd_uf: true,
                cd_certificado: true,
            },
            showMsg: false,
            msg: '',
            certificates: [],
            maxAlert: false,
            cd_certificado:{
                8: 'Utilidade Pública Municipal',
                7: 'Utilidade Pública Estadual',
            },
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
        console.log('edit: ', this.state.editId);
        $.ajax({
            method: 'GET',
            //url: '/edit-user-certificate/'+this.state.editId,
            url: getBaseUrl2 + 'osc/certificado/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({
                    form: data
                }, function(){
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
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        /*for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }*/

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let url = getBaseUrl2 + 'osc/certificados/455128';
        let id = null;
        let method = 'POST';

        if(this.state.action==='edit'){
            id = this.state.editId;
            method = 'PUT';
            url = getBaseUrl2 + 'osc/certificado/'+id;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:method,
                url: url,
                data:{
                    dt_inicio_certificado: this.state.form.dt_inicio_certificado,
                    dt_fim_certificado: this.state.form.dt_fim_certificado,
                    cd_uf: this.state.form.cd_uf,
                    cd_certificado: this.state.form.cd_certificado,
                    id: id,
                    id_osc: '455128',
                },
                cache: false,
                success: function(data) {
                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, certificates: data.certificates});
                        return;
                    }

                    let button = true;
                    if(this.state.action==='new'){
                        if(data.certificates.length >= data.maxCertificates){
                            button = false;
                        }
                    }

                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({certificates: data.certificates, loading: false, button: button, btnContinue: btnContinue})
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

        //console.log(age);

        return age;

    }

    render(){

        return(
            <div className="row">
                <div className="col-md-12">
                    <form>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="cd_certificado">Nome*</label><br/>
                                <select className={"form-control form-m "+(this.state.requireds.cd_certificado ? '' : 'invalid-field')}
                                        name="cd_certificado" onChange={this.handleInputChange} defaultValue={this.state.form.cd_certificado}>
                                    <option value="0">Selecione</option>
                                    <option value="8">Utilidade Pública Municipal</option>
                                    <option value="7">Utilidade Pública Estadual</option>
                                </select><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="cd_uf">Localidade*</label><br/>
                                <input className={"form-control "+(this.state.requireds.cd_uf ? '' : 'invalid-field')}
                                       type="text" name="cd_uf" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.cd_uf} placeholder=""/><br/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="dt_inicio_certificado">Data início da validade*</label><br/>
                                <input className={"form-control "+(this.state.requireds.dt_inicio_certificado ? '' : 'invalid-field')}
                                       type="date" name="dt_inicio_certificado" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.dt_inicio_certificado} placeholder=""/><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dt_fim_certificado">Data fim da validade*</label><br/>
                                <input className={"form-control "+(this.state.requireds.dt_fim_certificado ? '' : 'invalid-field')}
                                       type="date" name="dt_fim_certificado" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.dt_fim_certificado} placeholder=""/><br/>
                            </div>
                        </div>

                        <p><i>* campos obrigatórios</i></p>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-success" onClick={this.register}>
                                    <span style={{display: this.state.action==='edit' ? 'block' : "none"}}>Editar</span>
                                    <span style={{display: this.state.action==='edit' ? 'none' : "block"}}>Adicionar</span>
                                </button>
                            </div>
                        </div>
                        <br/>

                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="alert alert-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                        <div style={{display: this.state.maxAlert ? 'block' : 'none'}} className=" alert alert-danger">Máximo de Certificatos Cadastrados</div>

                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }

}
