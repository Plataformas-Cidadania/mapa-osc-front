class Descricao extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                tx_historico: '',
                tx_missao_osc: '',
                tx_visao_osc: '',
                tx_finalidades_estatutarias: '',
                tx_link_estatuto_osc: '',

            },
            requireds: {
                tx_historico: true,
                tx_missao_osc: true,
                tx_visao_osc: true,
                tx_finalidades_estatutarias: true,
                tx_link_estatuto_osc: true,

            },
            loading: false,
            button: true,
            showMsg: false,
            showIcon: false,
            showIconErro: false,
            msg: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateDescricao = this.updateDescricao.bind(this);
        this.validate = this.validate.bind(this);
        this.getDescricao = this.getDescricao.bind(this);
    }

    componentDidMount(){
        this.getDescricao();
    }

    getDescricao(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: '/get-descricao',
            //url: 'http://mapa-osc-api.local/api/osc/descricao/455128',
            cache: false,
            success: function (data) {
                this.setState({loading: false, form: data.descricao, button:true})
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

    updateDescricao(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: '', showIcon: false, showIconErro: false}, function(){
            $.ajax({
                method:'PUT',
                url: '/update-descricao',
                data:{
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function(data) {
                    let msg = "Dados alterados com sucesso!";
                    this.setState({msg: msg, showIcon: true, showMsg: true, loading: false, button: true, color: 'success'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({loading: false,  msg: msg, showMsg: true, showIconErro: true, button: true, color: 'danger'});
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
                                <div className="title-user-area">
                                    <div className="mn-accordion-icon"><i className="fas fa-align-justify" aria-hidden="true"/></div>
                                    <h3>Descrição da OSC</h3>
                                    <hr/><br/>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-12">

                                        <div className="label-float-tx">
                                            <textarea className="form-control form-g" name="tx_historico" onChange={this.handleInputChange} value={this.state.form.tx_historico}
                                                      rows="3" placeholder="De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada" />
                                            <label htmlFor="tx_historico">Histórico</label>
                                            <div className="label-box-info-tx">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>

                                        <div className="label-float-tx">
                                            <textarea className="form-control form-g" name="tx_missao_osc" onChange={this.handleInputChange} value={this.state.form.tx_missao_osc}
                                                      rows="3" placeholder="Se houver, apresente qual a missão da OSC"/>
                                            <label htmlFor="tx_missao_osc">Missão</label>
                                            <div className="label-box-info-tx">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>

                                        <div className="label-float-tx">
                                            <textarea className="form-control form-g" name="tx_visao_osc" onChange={this.handleInputChange} value={this.state.form.tx_visao_osc}
                                                      rows="3" placeholder="Se houver, apresente a visão da OSC"/>
                                            <label htmlFor="tx_visao_osc">Visão</label>
                                            <div className="label-box-info-tx">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>

                                        <div className="label-float-tx">
                                            <textarea className="form-control form-g" name="tx_finalidades_estatutarias" onChange={this.handleInputChange} value={this.state.form.tx_finalidades_estatutarias}
                                                      rows="3" placeholder="Apresente as finalidades estatutárias da OSC. Se preferir, copie do estatuto da OSC"/>
                                            <label htmlFor="tx_finalidades_estatutarias">Finalidades Estatutárias da OSC</label>
                                            <div className="label-box-info-tx">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>

                                        <div className="label-float">
                                            <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                   placeholder="Se houver, insira o link que leva ao estatuto da OSC. Ex.: http://www.nomesite.com/link-completo.pdf" />
                                            <label htmlFor="tx_link_estatuto_osc">Link para o Estatutu da OSC</label>
                                            <div className="label-box-info">
                                                <p>&nbsp;</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{marginTop: '-10px'}}>
                                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+this.state.color}>
                                                <i className="far fa-check-circle" style={{display: this.state.showIcon ? 'none' : ''}}/>
                                                <i className="far fa-times-circle" style={{display: this.state.showIconErro ? 'none' : ''}}/>
                                                {this.state.msg}
                                            </div>
                                            <button  className="btn btn-success" onClick={this.register}><i
                                                className="fas fa-cloud-download-alt"/> Salvar descrição</button>
                                            {/*{this.state.color}2
                                            <br/>
                                            {this.state.showIcon}2
                                            <br/>
                                            {this.state.showIconErro}2*/}
                                            <br/>
                                        </div>
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
    <Descricao/>,
    document.getElementById('descricao')
);
