class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                id_usuario: props.id_usuario,
                hash: props.hash,
                tx_senha_usuario: '',
            },
            token: this.props.token,
            button: true,
            loading: false,
            msg: '',
            msgShow: false,
            color: '',
            requireds: {
                /*email: true,*/
                tx_senha_usuario: true,
            },
            requisitosSenha: {
                minLength: false,
                minuscula: false,
                maiuscula: false,
                numero: false,
                especial: false,
            },


        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.avaliarRequisitosSenha = this.avaliarRequisitosSenha.bind(this);
    }

    avaliarRequisitosSenha(senha){
        return {
            minLength: senha.length >= 8,
            minuscula: /[a-z]/.test(senha),
            maiuscula: /[A-Z]/.test(senha),
            numero: /\d/.test(senha),
            especial: /[@#$!%&*_\-]/.test(senha),
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        if (name === 'tx_senha_usuario') {
            this.setState({form: form, requisitosSenha: this.avaliarRequisitosSenha(value)});
            return;
        }

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

        let requisitos = this.state.requisitosSenha;
        for(let i in requisitos){
            if (!requisitos[i]){
                valid = false;
            }
        }

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    save(e){
        e.preventDefault();

        if(!this.validate()){
            this.setState({msg: 'Preencha a senha e cumpra todos os requisitos *', msgShow: true, color: 'danger'});
            return;
        }


        this.setState({loading: true, button: false, msgShow: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: getBaseUrl2 + 'trocar-senha-user',
                data:{
                    form: this.state.form,
                    /*token: this.props.token*/
                },
                cache: false,
                success: function(data) {

                    this.setState({msg: data.msg, msgShow: true, loading: false, button: true, color: 'success'});
                    location.href = 'login';
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());

                    if (xhr.status === 422 && xhr.responseJSON && xhr.responseJSON.errors) {
                        let mensagens = [];
                        let errors = xhr.responseJSON.errors;

                        for (let campo in errors) {
                            errors[campo].forEach(function(msg) {
                                mensagens.push(msg);
                            });
                        }

                        this.setState({loading: false, button: true, msg: mensagens.join(' '), msgShow: true, color: 'danger'});
                        return;
                    }

                    this.setState({loading: false, button: true, msg: 'Ocorreu um erro, tente novamente!', msgShow: true, color: 'danger'});
                }.bind(this)
            });
        });


    }

    renderIconeCheck(cumprido) {

        if(cumprido){

            return (
                <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>
            );

        }

        return (
            <svg width="14" height="14" viewBox="0 0 384 512" fill="currentColor" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        );

    }

    renderRequisito(cumprido, texto) {

        return (
            <li className={cumprido ? 'text-success' : 'text-danger'} style={{listStyle: 'none'}}>
                <strong>{this.renderIconeCheck(cumprido)}</strong>
                {texto}
            </li>
        );

    }

    render(){

        const req = this.state.requisitosSenha;

        return(
            <div>
                <div className="container">
                    <div className="title-box">
                        <br/><br/><br/>
                        <h2 className="text-center">Redefinir Senha</h2>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className="" style={{margin: 'auto', width:'600px'}}>
                            <div className="row box-margin">
                                <div className="col-md-12">
                                    <form>
                                        {/*<input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>*/}
                                        {/*<input type="email" name="email" className={"form-control "+(this.state.requireds.email ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Digite o e-mail"/><br/>*/}
                                        <input type="password" name="tx_senha_usuario" className={"form-control "+(this.state.requireds.tx_senha_usuario ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Digite a nova senha"/><br/>

                                        <ul style={{padding: 0, marginTop: '8px', marginBottom: '0px', fontSize: '13px'}}>
                                            {this.renderRequisito(req.minLength, 'Pelo menos 8 caracteres')}
                                            {this.renderRequisito(req.minuscula, 'Pelo menos uma letra minúscula')}
                                            {this.renderRequisito(req.maiuscula, 'Pelo menos uma letra maiúscula')}
                                            {this.renderRequisito(req.numero, 'Pelo menos um número')}
                                            {this.renderRequisito(req.especial, 'Pelo menos um caractere especial (@ # $ ! % & * _ -)')}
                                        </ul>

                                        <br/>
                                        <button className="btn btn-style-primary" onClick={this.save}>Continuar</button>
                                        <div style={{display: this.state.loading ? 'block' : 'none'}}><br/><i className="fa fa-spin fa-spinner"/> Processando</div>
                                        <div style={{display: this.state.msgShow ? 'block' : 'none'}} className={'text-'+this.state.color}><br/>{this.state.msg}</div>
                                    </form>
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
    <ResetPassword hash={hash} id_usuario={id_usuario}/>,
    document.getElementById('reset-password')
);