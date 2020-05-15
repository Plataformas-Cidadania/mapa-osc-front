class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: this.props.email,
                cep: this.props.cep,
                endereco: '',
                bairro: '',
                cidade: '',
                estado: '',
                complemento: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                password: true,
                cpf: true,
                nascimento: true,
                sexo: true,
                cel: true,
                cep: true,
                endereco: true,
                numero: true,
                bairro: true,
                cidade: true,
                estado: true,
                cnpj: true,
                razao_social: true,
                inscricao_estadual: true,
            },
            showMsg: false,
            msg: '',
            juridica: false

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.diplayJuridica = this.diplayJuridica.bind(this);
    }

    componentDidMount() {
        if (this.state.form.cep!=""){
            this.getAddress();
        }
    }

    diplayJuridica(value){
        this.setState({juridica: value})
    }

    getAddress(){
        this.setState({loadingCep: true});
        $.ajax({
            method: 'GET',
            url: '/get-address/'+this.state.form.cep,
            cache: false,
            success: function (data) {
                console.log(data);
                let address = data.address;

                let form = this.state.form;
                form.endereco = address.logradouro;
                form.bairro = address.bairro;
                form.cidade = address.localidade;
                form.estado = address.uf;

                this.setState({loadingCep: false, form: form})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.name==='cep'){
            value = maskCep(value);
        }
        if(target.name==='cpf'){
            value = maskCpf(value);
        }
        if(target.name==='cnpj'){
            value = maskCnpj(value);
        }
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
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                if((index==="cnpj" || index==="razao_social" || index==="inscricao_estadual") && !this.state.juridica){
                    requireds[index] = true;
                }else{
                    valid = false;
                }
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

        if(!validateCpf(this.state.form.cpf)){
            requireds.cpf = false;
            valid = false;
        }

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    validateName(name){
        if(!name){
            return false;
        }
        let array_name = name.split(' ');
        console.log(array_name);
        console.log(array_name.length);
        if(array_name.length<2){
            return false;
        }

        return true;
    }

    validateCel(cel){
        if(!cel){
            return false;
        }
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

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let form = this.state.form;
        form.tipo = 1;
        if(this.state.juridica){
            form.tipo = 2;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: '', form: form}, function(){
            $.ajax({
                method:'POST',
                url: '/register',
                data:{
                    form: this.state.form,
                    carrinho: this.props.carrinho
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    let msg = 'Já existe cadastro com esse';

                    if(data.cpf || data.email){
                        if(data.cpf){
                            msg+= ' cpf';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true});
                        return;
                    }

                    location.href = '/register-addresses';
                    //this.setState({loading: false})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });


    }


    render(){

        console.log(this.state.requireds.name);

        return (
            <div>

                <div className="bg-lgt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <header>
                                    <br/>
                                    <h1>Cadastro de Representante</h1>
                                    <h5><a href="/">Home</a></h5>
                                    <br />
                                </header>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">


                    <div className="row justify-content-md-center">

                        <div className="col-md-6">
                            <form>

                                <br/><br/>
                                <h3>Sendo um representante da organização, você poderá</h3>
                                <ul>
                                    <li>Informar dados da organização.</li>
                                    <li>Compartilhar informações com seus amigos.</li>
                                    <li>Definir suas preferências no mapa.</li>
                                </ul>
                                <br/>
                                <div className="row">

                                    <div className="col-md-6">
                                        <label htmlFor="cnpj">CNPJ*</label><br/>
                                        <input className={"form-control form-m "+(this.state.requireds.cnpj ? '' : 'invalid-field')} type="text" name="cnpj" onChange={this.handleInputChange} placeholder="CNPJ" value={this.state.form.cnpj}  maxLength="18"/><br/>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="email">E-mail*</label><br/>
                                        <input className={"form-control form-m "+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder="E-mail"/><br/>
                                    </div>

                                    <div className="col-md-5">
                                        <label htmlFor="password">Senha*</label><br/>
                                        <div className="input-icon">
                                            <input className={"form-control form-m "+(this.state.requireds.password ? '' : 'invalid-field')} type="password" name="password" onChange={this.handleInputChange} placeholder="Senha"/>
                                            <i className="far fa-eye-slash"/>
                                        </div>
                                        <br/>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="name">
                                            <div style={{display: this.state.juridica ? 'none' : 'block'}}>Seu nome e sobrenome*</div>
                                            <div style={{display: this.state.juridica ? 'block' : 'none'}}>Responsável*</div>
                                        </label><br/>
                                        <input className={"form-control form-g "+(this.state.requireds.name ? '' : 'invalid-field')} type="text" name="name" onChange={this.handleInputChange} placeholder="Nome"/><br/>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="cpf">CPF*</label><br/>
                                        <input className={"form-control form-m "+(this.state.requireds.cpf ? '' : 'invalid-field')} type="text" name="cpf" onChange={this.handleInputChange} placeholder="CPF" value={this.state.form.cpf}  maxLength="14"/><br/>
                                    </div>




                                    <div className="clear-float"/>


                                    <div className="col-md-12">
                                        <p><i>* campos obrigatórios</i></p>
                                        <br/>

                                        <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.register}>Cadastrar</button>
                                        <br/>
                                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>

                                    </div>

                                </div>
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
    <Register  email={email} cep={cep}/>,
    document.getElementById('register')
);
