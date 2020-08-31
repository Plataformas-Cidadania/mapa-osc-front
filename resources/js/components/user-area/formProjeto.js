class FormProjeto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_projeto: true,
                dt_fim_projeto: true,
                cd_uf: true,
                cd_projeto: true,
            },
            showMsg: false,
            msg: '',
            projetos: [],
            maxAlert: false,
            cd_projeto:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
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
        $.ajax({
            method: 'GET',
            url: '/edit-user-projeto/'+this.state.editId,
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

        let url = '/register-projeto';
        let id = null;
        if(this.state.action==='edit'){
            id = this.state.editId;
            url = '/update-user-projeto';
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: url,
                data:{
                    form: this.state.form,
                    id: id,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, projetos: data.projetos});
                        return;
                    }

                    let button = true;
                    if(this.state.action==='new'){
                        if(data.projetos.length >= data.maxProjetos){
                            button = false;
                        }
                    }

                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({projetos: data.projetos, loading: false, button: button, btnContinue: btnContinue})
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

    render(){

        return(
            <div className="row">
                <div className="col-md-12">
                    <form>



                        <div className="row">



                            <div className="col-md-12">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_nome_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.tx_nome_projeto}
                                           placeholder="Nome do projeto, atividade ou programa" />
                                    <label htmlFor="tx_nome_projeto">Nome do projeto, atividade ou programa</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <select className={"form-control form-m "+(this.state.requireds.cd_certificado ? '' : 'invalid-field')}
                                        name="cd_certificado" onChange={this.handleInputChange} defaultValue={this.state.form.cd_certificado}>
                                    <option value="-1">Selecione</option>
                                    <option value="Arquivado, cancelado ou indeferido">Utilidade Pública Municipal</option>
                                    <option value="Proposta">Proposta</option>
                                    <option value="Projeto em andamento">Projeto em andamento</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Outro">Outro</option>
                                </select><br/>
                            </div>

                            <div className="form-group col-md-4">
                                <div className="label-float">
                                    <input className={"form-control form-g "} type="text" name="tx_nome_status_projeto" onChange={this.handleInputChange}
                                           value={this.state.form.tx_nome_status_projeto}
                                           placeholder="Situação do projeto" />
                                    <label htmlFor="tx_nome_status_projeto">Situação do projeto</label>
                                    <div className="label-box-info-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
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
                                           value={this.state.form.nr_valor_total_projeto}
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
                                           value={this.state.form.nr_valor_captado_projeto}
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
                                <select className={"form-control form-m "+(this.state.requireds.tx_nome_abrangencia_projeto ? '' : 'invalid-field')}
                                        name="tx_nome_abrangencia_projeto" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_abrangencia_projeto}>
                                    <option value="-1">Selecione</option>
                                    <option value="Municipal">Municipal</option>
                                    <option value="Estadual">Estadual</option>
                                    <option value="Regional">Regional</option>
                                    <option value="Nacional">Nacional</option>
                                </select><br/>
                            </div>

                            <div className="col-md-4">
                                {/*<label htmlFor="tx_nome_zona_atuacao">Zona de Atuação*</label><br/>*/}
                                <select className={"form-control form-m "+(this.state.requireds.tx_nome_zona_atuacao ? '' : 'invalid-field')}
                                        name="tx_nome_abrangencia_projeto" onChange={this.handleInputChange} defaultValue={this.state.form.tx_nome_zona_atuacao}>
                                    <option value="-1">Selecione</option>
                                    <option value="Rural">Rural</option>
                                    <option value="Urbana">Urbana</option>
                                </select><br/>
                            </div>


                        </div>


                        <p><i>* campos obrigatórios</i></p>
                        <div className="row">
                            <div className="col-md-6">
                                <button style={{display: this.state.action==='edit' ? 'block' : (this.state.projetos.length < maxProjetos ?  'block' : 'none')}}
                                        className="btn btn-success" onClick={this.register}>
                                    Adicionar
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
