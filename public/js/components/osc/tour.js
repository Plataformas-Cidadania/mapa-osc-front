class Tour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            value: ''
        };
        this.callCookies = this.callCookies.bind(this);
        this.callPassos = this.callPassos.bind(this);
    }

    componentDidMount() {}

    /* storeCampo(cd, value, id, ano){
           value = clearMoeda(value);
           if(id>0){
             this.setState({loading: true, button: false}, function(){
                 $.ajax({
                     method:'PUT',
                     url: getBaseUrl2+'osc/recursos/'+id,
                     data:{
                         id_osc: this.props.id_osc,
                         dt_ano_recursos_osc: ano,
                         nr_valor_recursos_osc: value,
                         cd_fonte_recursos_osc: cd,
                     },
                     headers: {
                         Authorization: 'Bearer '+localStorage.getItem('@App:token')
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
             this.setState({loading: true, button: false}, function(){
                 $.ajax({
                     method:'POST',
                     url: getBaseUrl2+'osc/recursos',
                     headers: {
                         Authorization: 'Bearer '+localStorage.getItem('@App:token')
                     },
                     data:{
                         //id_osc: '789809',
                         id_osc: this.props.id_osc,
                         dt_ano_recursos_osc: ano,
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
     }*/

    callCookies(acao) {
        this.props.desativarTour(acao);
        localStorage.setItem(this.state.storage, false);
    }

    callPassos(acao) {
        this.props.desativarTour(acao);
        console.log('acao', acao);
    }
    componentWillReceiveProps(props) {
        this.setState({
            passo: props.passo,
            position: props.position,
            txt: props.txt,
            top: props.top,
            right: props.right,
            float: props.float,
            display: props.display,
            storage: props.storage
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: "bg-pri box-help  " + this.state.float, style: { top: this.props.top, display: this.props.display ? '' : 'none' } },
            React.createElement(
                'strong',
                null,
                this.state.passo,
                '\xBA Passo'
            ),
            React.createElement(
                'p',
                null,
                this.state.txt
            ),
            React.createElement(
                'div',
                { className: 'box-help-btns' },
                React.createElement(
                    'a',
                    { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { margin: '0 10px', display: this.props.position !== 1 ? '' : 'none' }, onClick: () => this.callPassos(this.state.passo) },
                    'Pr\xF3ximo passo'
                ),
                React.createElement(
                    'a',
                    { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { display: this.props.position === 0 ? '' : 'none' }, onClick: () => this.callCookies(0) },
                    'Pular tour'
                ),
                React.createElement(
                    'a',
                    { className: 'btn btn-outline-light btn-outline-light-hover float-right', style: { display: this.props.position === 1 ? '' : 'none' }, onClick: () => this.callCookies(0) },
                    'Finalizar tour'
                )
            ),
            React.createElement(
                'div',
                { className: 'box-help-i', style: { right: this.props.right } },
                React.createElement('i', { className: 'fas fa-3x fa-caret-down' })
            )
        );
    }
}