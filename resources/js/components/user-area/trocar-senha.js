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
            requisitosSenha: {
                minLength: false,
                minuscula: false,
                maiuscula: false,
                numero: false,
                especial: false,
            },
            showMsg: false,
            msg: '',
            showSenhaAtual: false,
            showNovaSenha: false,
            mensagemTrocaObrigatoria: null,

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.trocarSenha = this.trocarSenha.bind(this);
        this.showHideSenhaAtual = this.showHideSenhaAtual.bind(this);
        this.showHideNovaSenha = this.showHideNovaSenha.bind(this);
        this.avaliarRequisitosSenha = this.avaliarRequisitosSenha.bind(this);
    }

    componentDidMount(){
        const mensagem = localStorage.getItem('@App:mensagemTrocaSenhaObrigatoria');

        if(mensagem){
            this.setState({mensagemTrocaObrigatoria: mensagem});
            localStorage.removeItem('@App:mensagemTrocaSenhaObrigatoria');
        }
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

        if (name === 'nova_senha') {
            this.setState({form: form, requisitosSenha: this.avaliarRequisitosSenha(value)});
            return;
        }

        this.setState({form: form});
    }

    validate(){
        let valid = true;

        for(let i in this.state.requireds){
            if (!this.state.form[i]){
                valid = false;
            }
        }

        let requisitos = this.state.requisitosSenha;
        for(let i in requisitos){
            if (!requisitos[i]){
                valid = false;
            }
        }

        return valid;
    }

    trocarSenha(e){
        e.preventDefault();

        if(!this.validate()){
            this.setState({loading: false,  msg: 'Preencha os campos obrigatórios e cumpra todos os requisitos de senha *', showMsg: true, button: true, color: 'danger'});
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: getBaseUrl2+'trocar-senha-na-area-restrita',
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
                    this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success', mensagemTrocaObrigatoria: null});
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

                        this.setState({loading: false, msg: mensagens.join(' '), showMsg: true, button: true, color: 'danger'});
                        return;
                    }

                    this.setState({loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});

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

        return (
            <div>
                <div className="title-user-area">
                    <h3><i className="fa fa-user" aria-hidden="true"/> Trocar Senha</h3>
                    <hr/>
                    <br/>
                </div>

                {this.state.mensagemTrocaObrigatoria &&
                    <div className="alert alert-warning" role="alert">
                        <i className="fa fa-exclamation-triangle" style={{marginRight: '8px'}} />
                        {this.state.mensagemTrocaObrigatoria}
                    </div>
                }

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

                                <ul style={{padding: 0, marginTop: '8px', marginBottom: '0px', fontSize: '13px'}}>
                                    {this.renderRequisito(req.minLength, 'Pelo menos 8 caracteres')}
                                    {this.renderRequisito(req.minuscula, 'Pelo menos uma letra minúscula')}
                                    {this.renderRequisito(req.maiuscula, 'Pelo menos uma letra maiúscula')}
                                    {this.renderRequisito(req.numero, 'Pelo menos um número')}
                                    {this.renderRequisito(req.especial, 'Pelo menos um caractere especial (@ # $ ! % & * _ -)')}
                                </ul>

                                <br/>
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