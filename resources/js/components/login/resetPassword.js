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
            requireds: {
                /*email: true,*/
                tx_senha_usuario: true,
            },


        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
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

    save(e){
        e.preventDefault();

        if(!this.validate()){
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

                    this.setState({msg: data.msg, msgShow: true, loading: false, button: true});
                    location.href = 'login';
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });


    }

    render(){
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
                                        <input type="password" name="tx_senha_usuario" className={"form-control "+(this.state.requireds.password ? '' : 'invalid-field')} onChange={this.handleInputChange} placeholder="Digite a nova senha"/><br/>
                                        <button className="btn btn-style-primary" onClick={this.save}>Continuar</button>
                                        <div style={{display: this.state.loading ? 'block' : 'none'}}><br/><i className="fa fa-spin fa-spinner"/> Processando</div>
                                        <div style={{display: this.state.msgShow ? 'block' : 'none'}}><br/>{this.state.msg}</div>
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
