class FormProjetoPublico extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                id_projeto: null,
                tx_nome_publico_beneficiado: '',
                ft_nome_publico_beneficiado: '',
            },

            requireds: {
                tx_nome_publico_beneficiado: true,
            },
            updateOk: false,
            loading: false,
            msg: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    cleanForm(){
        console.log('11111111111');
        this.setState({
            form: {
                tx_nome_publico_beneficiado: '',
            },
        });
    }

    validate(){

        let valid = true;
        let requireds = this.state.requireds;

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){

        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let msg = "Dados inserido com sucesso!";

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){

            let data = {
                id_osc: '455128',
                id_projeto: this.props.id_projeto,
                tx_nome_publico_beneficiado: this.state.form.tx_nome_publico_beneficiado,
                ft_publico_beneficiado: 'Representante de OSC',
            }

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/projeto/publico',
                data: data,
                cache: false,
                success: function(data) {
                    this.props.listPublicos();
                    this.setState({loading: false, updateOk: true, msg: msg, showMsg: true});
                    this.cleanForm();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({msg: msg, updateOk: false});
                }.bind(this)
            });
        });

    }

    render(){
        return(
            <div>
                <form autoComplete="off">
                    <div className="row box-search">
                        <div className="col-md-8">
                            <div className="label-float">
                                <input type="text" className="form-control mx-sm-3" name="tx_nome_publico_beneficiado"   onChange={this.handleInputChange} placeholder="Inserir o publico beneficiado"/>
                                <label htmlFor="tx_nome_publico_beneficiado" >Inserir o público beneficiado</label>
                            </div>
                            <br/>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-success" onClick={this.register} style={{margin: '5px 0 0 0'}}>
                                <span>Adicionar</span>
                            </button>
                        </div>
                    </div>

                    <div style={{display: this.state.loading ? 'block' : 'none'}}>
                        <div><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                            <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                            {this.state.msg}
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}
