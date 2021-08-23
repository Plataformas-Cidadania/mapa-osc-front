class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {},
            requireds: {
                email: true,
                password: true,
            },
            target: this.props.target,
            msg: '',
            msgShow: false,
            invalido: false,
            loading: false,
        };

        this.login = this.login.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        if(!this.props.target){
            this.setState({target: 'area-user'});
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
                valid = false;
            }else{
                requireds[index] = true;
            }
        }

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    login(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        this.setState({loading: true, msgShow: false, invalido: false}, function(){
            $.ajax({
                method: 'POST',
                //url: 'login',
                url: getBaseUrl2 + 'oauth/token',
                data:{
                    grant_type: 'password',
                    client_id: '2',
                    client_secret: 'QYDGG3kPaK3ubJhCE3a6EHup9etYfd2hDrY4JbnL',
                    username: this.state.form.email,
                    password: this.state.form.password,
                    scope: '',
                },
                cache: false,
                success: function(data){
                    console.log(data);

                    if(data.access_token){
                        //location.href = this.state.target;
                        localStorage.setItem('@App:token', data.access_token);
                        //location.href = 'area-user';
                        location.href = 'oscs-user';
                    }

                    this.setState({loading: false, msgShow: true, msg: data.msg})
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('xhr', xhr);
                    console.log('status', status);
                    console.log('err', err);
                    if(err === 'Unauthorized'){
                        this.setState({invalido: true});
                    }
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });


    }

    render(){




        let titleLogin = "Já tenho cadastro";


        return(
            <div>
                <div className="bg-lgt">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <header>
                                    <br/>
                                    <h1>Identificação</h1>
                                    <h5><a href="/">Home</a></h5>
                                    <br />
                                </header>
                            </div>
                        </div>
                    </div>
                </div>

                <br/><br/><br/>

                <div className="container">

                    <div className="row justify-content-md-center">
                        <div className="col-md-5">
                            <div className="row box-margin">
                                <div className="col-md-12">
                                    <h4>{titleLogin}</h4>
                                    <br/>
                                    <form>
                                        <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>
                                        <input type="email" name="email" className={"form-control "+(this.state.requireds.email ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="E-mail"/><br/>
                                        <div style={{fontSize: '12px'}}><ForgetPassword/></div>
                                        <input type="password" name="password" className={"form-control "+(this.state.requireds.password ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Senha"/><br/>
                                        <button className="btn btn-primary" onClick={this.login}>Continuar</button>
                                        <div style={{display: this.state.loading ? 'block' : 'none'}}><br/><i className="fa fa-spin fa-spinner"/> Processando</div>
                                        <div style={{display: this.state.msgShow ? 'block' : 'none'}}><br/>{this.state.msg}</div>
                                        <div style={{display: this.state.invalido ? 'block' : 'none'}} className="text-danger"><br/>Usuário inválido ou inativo!</div>
                                    </form>
                                    <br/><br/>
                                    <div className="text-center">
                                        <hr/>
                                        <p>ou</p>
                                        <p>Não tem cadastro? <a href="register" className="text-primary">Cadastre-se</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <br/><br/>

            </div>
        );
    }
}

ReactDOM.render(
    <Login/>,
    document.getElementById('login')
);
