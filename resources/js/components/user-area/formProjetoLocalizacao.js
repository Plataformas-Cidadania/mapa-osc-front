class FormProjetoLocalizacao extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                id_projeto: null,
                tx_nome_financiador: '',
                ft_nome_financiador: '',
            },

            requireds: {
                tx_nome_financiador: true,
            },
            updateOk: false,
            loading: false,
            msg: '',
            filters: {
                parceira: null,
            },

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
        this.setState({
            form: {
                tx_nome_financiador: '',
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
                tx_nome_financiador: this.state.form.tx_nome_financiador,
                ft_nome_financiador: 'Representante de OSC',
            }

            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/projeto/financiador',
                data: data,
                cache: false,
                success: function(data) {
                    this.props.listFinanciadores();
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
                <form className="form-inline" autoComplete="off">
                    <div style={{width: '100%', margin: '0 0 0 -30px'}}>

                        <div className="label-float" style={{width: '65%', float: 'left'}}>
                            <input type="text" className="form-control mx-sm-3" name="tx_nome_financiador"  style={{width: '90%', margin: '-5px 0 0 0'}}  onChange={this.handleInputChange} placeholder="Inserir o financiador do projeto"/>
                            <label htmlFor="tx_nome_financiador"  style={{margin: '-2px 0 0 12px'}}>Inserir o financiador do projeto</label>
                        </div>

                        <button className="btn btn-success" onClick={this.register}>
                            <span>Adicionar</span>
                        </button>
                        <br/>
                        <br/>
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
