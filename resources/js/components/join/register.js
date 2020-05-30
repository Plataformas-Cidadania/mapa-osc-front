class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: this.props.email,
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                password: true,
                cpf: true,
                cnpj: true,
            },
            showMsg: false,
            msg: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

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

        /*for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                if((index==="cnpj"/!* || index==="razao_social" || index==="inscricao_estadual"*!/)){
                    requireds[index] = true;
                }else{
                    valid = false;
                }
            }else{
                requireds[index] = true;
            }
        }*/


        if(!this.validateName(this.state.form.name)){
            requireds.name = false;
            valid = false;
        }


        if(!validateCpf(this.state.form.cpf)){
            requireds.cpf = false;
            valid = false;
        }

        console.log(valid);
        this.setState({requireds: requireds});
        return valid;


    }

    validateName(name){
        if(!name){
            return false;
        }
        let array_name = name.split(' ');
        if(array_name.length<2){
            return false;
        }

        return true;
    }


    register(e){
        e.preventDefault();

        ////Voltar o validar
        if(!this.validate()){
            return;
        }

        console.log("222");

        let form = this.state.form;

        this.setState({loading: true, button: false, showMsg: false, msg: '', form: form}, function(){
            $.ajax({
                method:'POST',
                url: '/register',
                data:{
                    form: this.state.form
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

                    location.href = '/login';
                    //this.setState({loading: false})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });


    }

    showHidePassword(){
        $('#password').get(0).type = $('#password').get(0).type === 'text' ? 'password' : 'text';
        $('#faView').attr("class", ($('#faView').get(0).classList[1]==="fa-eye" ? "fa-eye-slash" : "fa-eye"));

        /*if($('#faView').get(0).classList[1]==="fa-eye"){
            $('#faView').attr("class", "fa-eye-slash");
        }else{
            $('#faView').attr("class", "fa-eye");
        }*/
    }


    render(){

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
                                <br/>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="bg-light text-center p-3">
                                            <i className="fas fa-info-circle fa-3x text-primary"/><br/>
                                            Informar dados da organização<br/>&nbsp;
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="bg-light text-center p-3">
                                            <i className="fas fa-hands-helping fa-3x text-primary"/><br/>
                                            Compartilhar informações com seus amigos
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="bg-light text-center p-3">
                                            <i className="fas fa-puzzle-piece fa-3x text-primary"/><br/>
                                            Definir suas preferências no mapa
                                        </div>
                                    </div>
                                </div>
                                {/*<ul>
                                    <li>Informar dados da organização.</li>
                                    <li>Compartilhar informações com seus amigos.</li>
                                    <li>Definir suas preferências no mapa.</li>
                                </ul>*/}
                                <br/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <br/>
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
                                            <input id="password" className={"form-control form-m "+(this.state.requireds.password ? '' : 'invalid-field')} type="password" name="password" onChange={this.handleInputChange} placeholder="Senha"/>
                                            <a onClick={() => this.showHidePassword()}><i id="faView" className="far fa-eye-slash" style={{cursor: 'pointer'}} /></a>
                                        </div>
                                        <br/>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="name">
                                            <div>Seu nome e sobrenome*</div>
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
    <Register  email={email}/>,
    document.getElementById('register')
);
