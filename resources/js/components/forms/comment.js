class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                email: '',
                description: '',
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                description: true,
            },
            showMsg: false,
            msg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.comment = this.comment.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});
    }

    validate(){

        let valid = true;

        let requireds = this.state.requireds;

        let form = this.state.form;

        for(let index in requireds){
            if(!form[index] || form[index]===''){
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


        this.setState({requireds: requireds});

        return valid;
    }

    validateName(name){
        let array_name = name.split(' ');
        //console.log(array_name);
        //console.log(array_name.length);
        if(array_name.length<2){
            return false;
        }

        return true;
    }


    comment(e){
        //console.log(this.validate());
        if(!this.validate()){
            return;
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){

            $.ajax({
                method:'POST',
                url: '/comment',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data:{
                    form: this.state.form,
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);
                    this.setState({loading: false});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false});
                }.bind(this)
            });
        });
    }


    render(){
        return (
            <div>



                            <form>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g "+(this.state.requireds.name ? '' : 'invalid-field')} type="text" name="name" onChange={this.handleInputChange} placeholder=" " required={this.state.requireds.name ? '' : 'required'}/>
                                                <label htmlFor="name">Nome</label>
                                                <div className="label-box-info">
                                                    <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite o nome e sobre nome</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="label-float">
                                                <input className={"form-control form-g"+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder=" " required={this.state.requireds.email ? '' : 'required'}/>
                                                <label htmlFor="email">E-mail</label>
                                                <div className="label-box-info">
                                                    <p style={{display: this.state.requireds.email ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Escolha um endereço de e-mail valido</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="label-float">
                                                <textarea className={"form-control form-g"} type="text" name="description" onChange={this.handleInputChange} value={this.state.form.description} placeholder=" "  required={this.state.requireds.description ? '' : 'required'} />
                                                <label htmlFor="description">Descrição</label>
                                                <div className="label-box-info">
                                                    <p style={{display: this.state.requireds.name ? 'none' : 'block'}}><i className="fas fa-exclamation-circle"></i> Digite uma descrição</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button type="button" style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-primary" onClick={this.comment}>Cadastrar</button>
                                            <br/>
                                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className="text-danger">{this.state.msg}</div>
                                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
                                        </div>
                                    </div>
                                </div>







                            </form>


                <br/><br/>
            </div>
        );
    }
}

ReactDOM.render(
    <Comment />,
    document.getElementById('comment')
);
