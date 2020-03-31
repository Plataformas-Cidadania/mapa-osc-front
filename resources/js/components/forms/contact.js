class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                /*email: 'this.props.email',*/
                email: '',
                cel: '',
                whatsapp: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true,
            },
            showMsg: false,
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
            //value = maskCel(value);
        }
        if(target.name==='whatsapp'){
            //value = maskCel(value);
        }

        let form = this.state.form;
        form[name] = value;

        //console.log(form);

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

        if(!this.validateCel(this.state.form.cel)){
            requireds.cel = false;
            valid = false;
        }
        console.log(valid);


        this.setState({requireds: requireds});
        return valid;
    }

    validateName(name){
        let array_name = name.split(' ');
        console.log(array_name);
        console.log(array_name.length);
        if(array_name.length<2){
            return false;
        }

        return true;
    }

    validateCel(cel){
        cel = cel.replace(/[^0-9]/g,'');
        console.log(cel);
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

        if(!this.validate()){
            return;
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){

            $.ajax({
                method:'POST',
                url: '/contact',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data:{
                    form: this.state.form,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);
                    this.setState({loading: false});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="title-box">
                        <br/><br/><br/>
                        <h2 className="text-center">Cadastro de Associado</h2>
                        <hr/>
                    </div>
                    <div className="row" style={{maxWidth: '650px', margin: 'auto'}}>
                        <div className="col-md-12">


                            <form>
                                <div className="div-left">
                                    <label htmlFor="name">Como podemos ajudar?*</label><br/>
                                    <select className="form-control" id="assunto">
                                        <option value="">Selecione o assunto</option>
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

                                <div className="label-float">
                                    <input className={"form-control form-g"} type="text" name="cel" onChange={this.handleInputChange} value={this.state.form.cel} placeholder=" " maxLength="15" required={this.state.requireds.cel ? '' : 'required'} />
                                    <label htmlFor="cel">Celular</label>
                                    <div className="label-box-info">
                                        <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite um número de celular</p>
                                    </div>
                                </div>

                                <div className="label-float">
                                    <input className={"form-control"} type="text" name="whatsapp" onChange={this.handleInputChange} value={this.state.form.whatsapp} placeholder=" " maxLength="15"/>
                                    <label htmlFor="name">Whatsapp<span> - Opicional</span></label>
                                    <div className="label-box-info"></div>
                                </div>

                                <div className="clear-float"></div>
                                {/*<p><i>* campos obrigatórios</i></p>*/}


                                <button type="button" style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.contact}>Cadastrar</button>
                                <br/>
                                {/*{this.state.form.cel}*/}

                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                            </form>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

ReactDOM.render(
    /*<Contact email={email}/>,*/
    <Contact />,
    document.getElementById('contact')
);
