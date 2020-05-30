class ForgetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            msg: '',
            msgShow: false,
            email: '',
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.send = this.send.bind(this);
    }

    show(){
        $('#modalForgetPassword').modal('show');
    }

    handleEmail(e){
        this.setState({email: e.target.value});
    }

    send(e){
        e.preventDefault();

        this.setState({loading: true, msgShow: false});

        $.ajax({
            method: 'POST',
            url: '/forget-password',
            data:{
                email: this.state.email,
            },
            cache: false,
            success: function(data){
                console.log(data);

                this.setState({loading: false, msgShow: true, msg: data.msg})
            }.bind(this),
            error: function(xhr, status, err){
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    render(){
        return(
            <div>
                <div className="text-right">
                    <a href="#"  onClick={this.show}>Esqueci minha senha</a>
                </div>
                <div className="modal fade" id="modalForgetPassword" role="dialog" style={{zIndex: '999999'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Esqueci minha senha</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input type="email" className="form-control" name="email" onChange={this.handleEmail} placeholder="Digite seu e-mail"/>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando</div>
                                <div style={{display: this.state.msgShow ? 'block' : 'none'}}>{this.state.msg}</div>
                                <button type="button" className="btn btn-default" onClick={this.send}>Enviar</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}