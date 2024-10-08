class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                email: '',
                cel: '',
                whatsapp: '',
                mensagem: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true,
                mensagem: true,
            },
            showMsg: 0,
            msg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.contact = this.contact.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.name==='cel'){
            value = maskCel(value);
        }
        if(target.name==='whatsapp'){
            value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    validate(){

        let valid = true;

        let requireds = this.state.requireds;

        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]===''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }

        if(!this.validateName(this.state.form.name)){
            requireds.name = false;
            valid = false;
        }

        if(this.validateCel(this.state.form.cel)===""){
            requireds.cel = false;
            valid = false;
        }

        this.setState({requireds: requireds});

        return valid;
    }

    validateName(name){
        let array_name = name.split(' ');
        if(array_name.length<2){
            return false;
        }

        return true;
    }

    validateCel(cel){
        cel = cel.replace(/[^0-9]/g,'');
        let qtd = cel.length;

        if(qtd < 10 || qtd > 11){
            return false;
        }
        if(qtd === 11){
            if(cel.substr(2,1)!=9){
                return false;
            }
            if(cel.substr(3,1)!=9 && cel.substr(3,1)!=8 && cel.substr(3,1)!=7 && cel.substr(3,1)!=6){
                return false;
            }
        }
        if(qtd === 10){
            if(cel.substr(2,1)!=9 && cel.substr(2,1)!=8 && cel.substr(2,1)!=7 && cel.substr(2,1)!=6){
                return false;
            }
        }
        return true;
    }

    contact(e){
        //console.log(this.validate());
        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: 0, msg: ''}, function(){

            $.ajax({
                method:'POST',
                url: 'contact',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data:{
                    form: this.state.form,
                },
                cache: false,
                success: function(data) {
                    this.setState({loading: false, showMsg: 1, msg: 'Enviado com sucesso!'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false, showMsg: 2, msg: 'Ocorreu um erro. Tente novamente!'});
                }.bind(this)
            });
        });
    }

    render(){
        return (
                    <form>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                        <div>

                            <select className="form-control" id="assunto">
                                <option value="">Como podemos ajudar?</option>
                                <option value="1">Cadastro Município-Estado</option>
                                <option value="2">Cadastro Representante</option>
                                <option value="3">Dúvidas</option>
                                <option value="4">Inserção/Edição de dados</option>
                                <option value="5">Pedidos de dados</option>
                                <option value="6">Relatar Problemas</option>
                                <option value="7">Sugestão</option>
                                <option value="8">Outros</option>
                            </select><br/>
                        </div>

                        <div className="label-float">
                            <input className={"form-control form-g "+(this.state.requireds.name ? '' : 'invalid-field')} type="text" name="name" onChange={this.handleInputChange} placeholder=" " required={this.state.requireds.name ? '' : 'required'}/>
                            <label htmlFor="name">Nome</label>
                            <div className="label-box-info">
                                <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite o nome e sobre nome</p>
                            </div>
                        </div>

                        <div className="label-float">
                            <input className={"form-control form-g"+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder=" " required={this.state.requireds.email ? '' : 'required'}/>
                            <label htmlFor="email">E-mail</label>
                            <div className="label-box-info">
                                <p style={{display: this.state.requireds.email ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Escolha um endereço de e-mail valido</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="label-float">
                                    <input className={"form-control form-g"} type="text" name="cel" onChange={this.handleInputChange} value={this.state.form.cel} placeholder=" " maxLength="15" required={this.state.requireds.cel ? '' : 'required'} />
                                    <label htmlFor="cel">Celular</label>
                                    <div className="label-box-info">
                                        <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite um número de celular</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="label-float">
                                    <input className={"form-control"} type="text" name="whatsapp" onChange={this.handleInputChange} value={this.state.form.whatsapp} placeholder=" " maxLength="15"/>
                                    <label htmlFor="name">Whatsapp<span className={"label-float-optional"}> - Opicional</span></label>
                                    <div className="label-box-info"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="label-float-tx">
                                   <textarea className="form-control" name="mensagem" onChange={this.handleInputChange} value={this.state.form.mensagem}
                                                      rows="5" placeholder=" "/>
                                    <label htmlFor="mensagem">Mansagem</label>
                                    <div className="label-box-info-tx-off">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="clear-float"/>

                        <button type="button" style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.contact}>Cadastrar</button>
                        <br/>

                        <div style={{display: this.state.showMsg === 1 ? '' : 'none'}} className="text-success">{this.state.msg}</div>
                        <div style={{display: this.state.showMsg === 2 ? '' : 'none'}} className="text-danger">{this.state.msg}</div>
                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                    </form>

        );
    }
}

ReactDOM.render(
    /*<Contact email={email}/>,*/
    <Contact />,
    document.getElementById('contact')
);
