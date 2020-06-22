class Recursos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                tx_razao_social_recursos: true,
                tx_sigla_recursos: true,
                tx_nome_situacao_imovel_recursos: true,
                tx_nome_responsavel_legal: true,


                cnpj: true,
            },
            showMsg: false,
            msg: '',
            juridica: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getRecursos = this.getRecursos.bind(this);
    }

    componentDidMount(){
        this.getRecursos();
    }

    getRecursos(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: '/get-recursos',
            cache: false,
            success: function (data) {
                this.setState({loading: false, form: data.recursos, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
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

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: '/update-recursos',
                data:{
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if(data.tx_razao_social_recursos || data.email){
                        if(data.tx_razao_social_recursos){
                            msg+= ' tx_razao_social_recursos';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true});
                        return;
                    }

                    msg = 'Dados alterados com sucesso!';
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="title-style">
                                                <h2>Descrição da RECURSOS</h2>
                                                <div className="line line-fix"></div>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Histórico</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Missão</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Visão</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Finalidades Estatutárias da RECURSOS</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputEmail4">Link para o Estatutu da RECURSOS</label>
                                            <input type="emil" className="form-control" id="inputEmail4" placeholder="Email"/>
                                        </div>
                                    </div>



                                    <div className="col-md-12">
                                        <div>
                                            <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.register}>Salvar</button>
                                            <br/>
                                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'text-'+this.state.color}>{this.state.msg}</div>
                                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                                        </div>

                                    </div>


                                </form>

                                <div className="space"/>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Recursos/>,
    document.getElementById('recursos')
);
