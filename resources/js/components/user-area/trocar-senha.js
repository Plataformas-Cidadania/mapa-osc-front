class TrocarSenha extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_email_usuario: '',
                tx_nome_usuario: '',
                nr_cpf_usuario: '',
            },
            button: true,
            loading: false,
            requireds: {
                senha_atual: true,
                nova_senha: true,
            },
            showMsg: false,
            msg: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
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

        this.setState({requireds: requireds});
        return valid;
    }

    trocarSenha(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: getBaseUrl2+'trocar-senha-user/',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data:{
                    senha_atual: this.state.form.senha_atual,
                    nova_senha: this.state.form.nova_senha,
                },
                cache: false,
                success: function(data) {
                    if(data.senha_atual_invalida){
                        this.setState({msg: 'Senha atual inválida!', showMsg: true, loading: false, button: true});
                        return;
                    }
                    msg = 'Senha alterada com sucesso!';
                    this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                }.bind(this)
            });
        });


    }


    render(){


        return (
            <div>
                <div className="title-user-area">
                    <h3><i className="fa fa-user" aria-hidden="true"/> Meus Dados</h3>
                    <hr/>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="col-md-8">
                                <label htmlFor="name">Senha Atual*</label><br/>
                                <input className={"form-control form-g "+(this.state.requireds.senha_atual ? '' : 'invalid-field')} type="text" name="senha_atual" onChange={this.handleInputChange} placeholder="Nome"/><br/>
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="email">Nova Senha*</label><br/>
                                <input className={"form-control form-g "+(this.state.requireds.nova_senha ? '' : 'invalid-field')} type="text" name="nova_senha" onChange={this.handleInputChange} placeholder="E-mail"/><br/>
                            </div>

                            <div className="clear-float"/>
                            <div className="col-md-12">

                                {/*<button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.register}>Salvar</button>*/}
                                <br/>
                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'text-'+this.state.color}>{this.state.msg}</div>
                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TrocarSenha id={id}/>,
    document.getElementById('trocar-senha')
);
