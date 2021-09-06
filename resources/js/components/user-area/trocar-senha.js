class TrocarSenha extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                senha_atual: '',
                nova_senha: '',
            },
            button: true,
            loading: false,
            requireds: {
                senha_atual: true,
                nova_senha: true,
            },
            showMsg: false,
            msg: '',
            showSenhaAtual: false,
            showNovaSenha: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
        this.showHideSenhaAtual = this.showHideSenhaAtual.bind(this);
        this.showHideNovaSenha = this.showHideNovaSenha.bind(this);
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
        let valid = true;

        for(let i in this.state.requireds){
            if (!this.state.form[i]){
                valid = false;
            }
        }
        return valid;
    }

    trocarSenha(e){
        e.preventDefault();

        if(!this.validate()){
            this.setState({loading: false,  msg: 'Informe os campos obrigatórios *', showMsg: true, button: true, color: 'danger'});
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: getBaseUrl2+'trocar-senha-na-area-restrita/',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data:{
                    senha_atual: this.state.form.senha_atual,
                    nova_senha: this.state.form.nova_senha,
                },
                cache: false,
                success: function(data) {
                    let msg = data.Resposta;
                    if(msg === 'Senha atual inválida!'){
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'danger'});
                        return;
                    }
                    this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                }.bind(this)
            });
        });


    }

    showHideSenhaAtual(){
        this.setState({showSenhaAtual: !this.state.showSenhaAtual});
    }

    showHideNovaSenha(){
        this.setState({showNovaSenha: !this.state.showNovaSenha});
    }

    render(){


        return (
            <div>
                <div className="title-user-area">
                    <h3><i className="fa fa-user" aria-hidden="true"/> Trocar Senha</h3>
                    <hr/>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="col-md-8">
                                <label htmlFor="name">Senha Atual *</label><br/>
                                <div className="input-icon">
                                    <input
                                        id="senha_atual"
                                        className={"form-control form-m "+(this.state.requireds.senha_atual ? '' : 'invalid-field')}
                                        type={this.state.showSenhaAtual ? "text" : "password"}
                                        name="senha_atual"
                                        onChange={this.handleInputChange}
                                    />
                                    <a onClick={this.showHideSenhaAtual}><i id="faView" className="far fa-eye-slash" style={{cursor: 'pointer'}} /></a>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="email">Nova Senha *</label><br/>
                                <div className="input-icon">
                                    <input
                                        id="nova_senha"
                                        className={"form-control form-m "+(this.state.requireds.senha_atual ? '' : 'invalid-field')}
                                        type={this.state.showNovaSenha ? "text" : "password"}
                                        name="nova_senha"
                                        onChange={this.handleInputChange}
                                    />
                                    <a onClick={this.showHideNovaSenha}><i id="faView" className="far fa-eye-slash" style={{cursor: 'pointer'}} /></a>
                                </div>
                                <br/><br/>
                            </div>

                            <div className="clear-float"/>
                            <div className="col-md-12">

                                <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.trocarSenha}>Salvar</button>
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
