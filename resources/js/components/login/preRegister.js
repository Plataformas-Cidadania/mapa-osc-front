class PreRegister extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        let carrinho = this.props.carrinho;

        return(
            <div className="row box-margin">
                <div className="col-md-12">
                    <h4>Quero me cadastrar</h4>
                    <br/>
                    <form action="/pre-register" method="POST">
                        {carrinho}
                        <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>
                        <input type="email" name="email" className="form-control" placeholder="E-mail"/><br/>
                        <input type="text" name="cep" className="form-control" placeholder="CEP"/><br/>
                        <button className="btn btn-style-primary">Criar Cadastro</button>
                    </form>
                </div>
            </div>
        );
    }
}