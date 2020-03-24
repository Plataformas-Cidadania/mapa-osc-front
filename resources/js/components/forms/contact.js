class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                email: this.props.email,
                cel: '',
                whatsapp: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                cel: true,
            },
            showMsg: false,
            msg: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.contact = this.contact.bind(this);
        this.checkCity = this.checkCity.bind(this);
        this.validate = this.validate.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    componentDidMount(){
        this.getAddress();
    }

    getAddress(){
        this.setState({loadingCep: true});
        $.ajax({
            method: 'GET',
            url: '/get-address/'+this.state.form.cep,
            cache: false,
            success: function (data) {
                console.log(data);
                let address = data.address;

                let form = this.state.form;
                form.endereco = address.logradouro;
                form.bairro = address.bairro;
                form.cidade = address.localidade;
                form.estado = address.uf;

                this.setState({loadingCep: false, form: form})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.name==='cel'){
            value = maskCel(value);
        }
        if(target.name==='whatsapp'){
            value = maskCel(value);
        }

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

        if(!this.validateName(this.state.form.name)){
            requireds.name = false;
            valid = false;
        }

        if(!this.validateCel(this.state.form.cel)){
            requireds.cel = false;
            valid = false;
        }

        if(!validateCpf(this.state.form.cpf)){
            requireds.cpf = false;
            valid = false;
        }


        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    validateName(name){
        let array_name = name.split(' ');
        console.log(array_name);
        console.log(array_name.length);
        if(array_name.length<2){
            return false;
        }

        return true;
    }

    validateCel(cel){
        cel = cel.replace(/[^0-9]/g,'');
        console.log(cel);
        let qtd = cel.length;

        if(qtd < 10 || qtd > 11){
            return false;
        }

        if(qtd === 11){
            if(cel.substr(2,1)!=9){
                return false;
            }
            if(cel.substr(3,1)!=9 && cel.substr(3,1)!=8 && cel.substr(3,1)!=7 && cel.substr(3,1)!=6){
                return false;
            }
        }

        if(qtd === 10){
            if(cel.substr(2,1)!=9 && cel.substr(2,1)!=8 && cel.substr(2,1)!=7 && cel.substr(2,1)!=6){
                return false;
            }
        }

        return true;
    }


    checkCity(e){
        e.preventDefault();

        if(cities.search(this.state.form.cidade+'/'+this.state.form.estado)==-1){
            $('#notice').modal();
        }else{
            this.contact();
        }

    }

    cancel(){
        location.href = '/';
    }

    contact(){

        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: '/contact',
                data:{
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    let msg = 'Já existe cadastro com esse';

                    if(data.cpf || data.email){
                        if(data.cpf){
                            msg+= ' cpf';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true});
                        return;
                    }

                    location.href = '/contact-pets';
                    //this.setState({loading: false})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });


    }

    render(){

        console.log(this.state.requireds.name);

        return (
            <div>

                <Header/>

                <div className="container">
                    <div className="title-box">
                        <br/><br/><br/>
                        <h2 className="text-center">Cadastro de Associado</h2>
                        <hr/>
                    </div>
                    <div className="row" style={{maxWidth: '650px', margin: 'auto'}}>
                        <div className="col-md-12">
                            <form>


                                <div className="div-left">
                                    <label htmlFor="name">Nome*</label><br/>
                                    <input className={"form-control form-g "+(this.state.requireds.name ? '' : 'invalid-field')} type="text" name="name" onChange={this.handleInputChange} placeholder="Nome"/><br/>
                                </div>

                                <div className="clear-float"></div>

                                <div className="div-left">
                                    <label htmlFor="email">E-mail*</label><br/>
                                    <input className={"form-control form-m "+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder="E-mail"/><br/>
                                </div>


                                <div className="clear-float"></div>

                                <div className="div-left">
                                    <label htmlFor="cel">Celular*</label><br/>
                                    <input className={"form-control form-m "+(this.state.requireds.cel ? '' : 'invalid-field')} type="text" name="cel" onChange={this.handleInputChange} value={this.state.form.cel} placeholder="Cel" maxLength="15"/><br/>
                                </div>

                                <div className="div-left">
                                    <label htmlFor="name">Whatsapp</label><br/>
                                    <input className={"form-control form-m "} type="text" name="whatsapp" onChange={this.handleInputChange} value={this.state.form.whatsapp} placeholder="Whatsapp" maxLength="15"/><br/>
                                </div>

                                <div className="clear-float"></div>

                                <p><i>* campos obrigatórios</i></p>


                                <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-style-primary" onClick={this.checkCity}>Cadastrar</button>
                                <br/>
                                <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                                <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                            </form>
                        </div>
                    </div>
                </div>

                <br/><br/>

                <Footer/>

                <div id="notice" className="modal fade" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title text-warning"><i className="fa fa-exclamation-circle"/> Aviso</h4>
                            </div>
                            <div className="modal-body">
                                <p>Infelizmente <strong>{this.state.form.cidade+'/'+this.state.form.estado}</strong> não está dentro de nossa rede de credenciados. No momento nossa rede se encontra em <strong>{cities}</strong>.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancel}>Cancelar Cadastro</button>
                                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.contact}>Cadastrar mesmo assim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Contact email={email}/>,
    document.getElementById('contact')
);
