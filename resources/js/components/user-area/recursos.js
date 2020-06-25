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


        this.setState({loading: true, button: false, showMsg: false, msg: '', showIcon: false, showIconErro: false}, function(){
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
                        this.setState({msg: msg, showIcon: true, showMsg: true, showIconErro: true, loading: false, button: true});
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

                                    <div className="title-user-area">
                                        <div className="mn-accordion-icon"><i className="fas fa-boxes" aria-hidden="true"/></div>
                                        <h3>Fontes de recursos anuais da OSC</h3>
                                        <hr/><br/>
                                    </div>

                                    {/*<div className="row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEstado">Situação do Imóvel</label>
                                            <select id="inputEstado" className="form-control">
                                                <option selected>Escolher...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                    </div>*/}
                                    <div style={{fontSize: "13px"}}>Anos: </div>
                                    <div className="btn-group" role="group" aria-label="Exemplo básico">
                                        <button type="button" className="btn btn-primary">2020</button>
                                        <button type="button" className="btn btn-outline-secondary">2019</button>
                                        <button type="button" className="btn btn-outline-secondary">2018</button>
                                        <button type="button" className="btn btn-outline-secondary">2017</button>
                                        <button type="button" className="btn btn-outline-secondary">2016</button>
                                        <button type="button" className="btn btn-outline-secondary">2015</button>
                                        <button type="button" className="btn btn-outline-secondary">2014</button>
                                        <button type="button" className="btn btn-outline-secondary">2013</button>
                                        <button type="button" className="btn btn-outline-secondary">2012</button>
                                        <button type="button" className="btn btn-outline-secondary">2011</button>
                                        <button type="button" className="btn btn-outline-secondary">2010</button>
                                    </div>
                                    <br/>
                                    <p className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Não possui recursos para este ano.
                                        </label>
                                    </p>


                                    <div className="box-itens-g">
                                        <h2>Recursos próprios</h2>
                                        <p className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                            <label className="form-check-label" htmlFor="gridCheck">
                                                Não possui recursos próprios para este ano.
                                            </label>
                                        </p>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Rendimentos de fundos patrimoniais</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Rendimentos financeiros de reservas ou c/c próprias</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Mensalidades ou contribuições de associados</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Prêmios recebidos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Venda de produtos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Prestação de serviços</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "} type="text" name="tx_link_estatuto_osc" onChange={this.handleInputChange} value={this.state.form.tx_link_estatuto_osc}
                                                       placeholder="Informe o valor" />
                                                <label htmlFor="tx_link_estatuto_osc">Venda de bens e direitos</label>
                                                <div className="label-box-info-off">
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div style={{marginTop: '-10px'}}>
                                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+this.state.color}>
                                                    <i className="far fa-check-circle" style={{display: this.state.showIcon ? '' : 'none'}}/>
                                                    <i className="far fa-times-circle" style={{display: this.state.showIconErro ? 'none' : ''}}/>
                                                    {this.state.msg}
                                                </div>
                                                <button className="btn btn-success" onClick={this.register}><i
                                                    className="fas fa-cloud-download-alt"/> Salvar fontes de recursos</button>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>


                                    {/*<div className="col-md-12">
                                        <div>
                                            <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.register}>Salvar</button>
                                            <br/>
                                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'text-'+this.state.color}>{this.state.msg}</div>
                                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                                        </div>
                                    </div>*/}


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
