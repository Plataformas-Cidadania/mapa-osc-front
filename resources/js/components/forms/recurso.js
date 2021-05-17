class Recurso extends React.Component {
    constructor(props) {
        console.log('props1', props);
        super(props);
        this.state = {
            loadingList: false,
            value: null,
        };
        this.storeCampo = this.storeCampo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount(){

    }

    handleInputChange(event){
        //console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    storeCampo(cd, value, id){
        console.log('valores: ',cd, value, id);

        if(id>0){
            console.log('Update')
            this.setState({loading: true, button: false}, function(){
                $.ajax({
                    method:'PUT',
                    url: getBaseUrl2+'osc/recursos',
                    data:{
                        id_osc: '789809',
                        dt_ano_recursos_osc: '2016-01-01',
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: cd,
                    },
                    cache: false,
                    success: function(data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                    }.bind(this)
                });
            });

        }else{
            console.log('Insert')
            this.setState({loading: true, button: false}, function(){
                $.ajax({
                    method:'POST',
                    url: getBaseUrl2+'osc/recursos',
                    data:{
                        id_osc: '789809',
                        dt_ano_recursos_osc: '2016-01-01',
                        nr_valor_recursos_osc: value,
                        cd_fonte_recursos_osc: cd,
                    },
                    cache: false,
                    success: function(data) {
                        let msg = 'Dados alterados com sucesso!';
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                    }.bind(this)
                });
            });
        }


    }

    componentWillReceiveProps(props){
        this.setState({
            id: props.id,
            cd: props.cd,
            name: props.name,
            value: props.value,
            txt: props.txt,
        });
    }

    render(){
        return (
            <div className="col-md-6">
                <div className="label-float">
                    <input className={"form-control form-g "} type="text" name={this.state.name} onChange={this.handleInputChange}
                           defaultValue={this.state.value}
                           onBlur={() => this.storeCampo(this.state.cd, this.state.value, this.state.id)}
                           placeholder="Informe o valor"/>
                    <label htmlFor={this.state.name}>{this.state.txt}</label>
                    <div className="label-box-info-off">
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        );

    }

}

ReactDOM.render(
    <Recurso />,
    document.getElementById('recurso')
);




