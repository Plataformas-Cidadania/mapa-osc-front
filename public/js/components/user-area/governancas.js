class Governancas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingGovernanca: false,
            loading: false,
            governancas: [],
            conselhos: [],
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Endereço principal',
                2: ' '
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            governanca: {},
            conselho: {},
            editId: 0,

            deficiencia: null,
            empregados: null,
            voluntarios: null,
            totalTrabalhadores: null

        };

        this.governanca = this.governanca.bind(this);
        //this.conselhoFiscal = this.conselhoFiscal.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentDidMount() {
        this.governanca();
        //this.conselhoFiscal();
    }

    getAge(dateString) {

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            age--;
        }

        //console.log(age);

        return age;
    }

    edit(id) {
        // this.setState({actionForm: 'edit'});
        this.setState({ actionForm: 'edit', showForm: false, editId: id });
    }

    cancelRemove(id) {
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({ remove: remove });
    }

    remove(id) {
        let remove = this.state.remove;

        if (!remove[id]) {
            remove[id] = true;
            this.setState({ remove: remove });
            return;
        }

        let loadingRemove = this.state.loadingRemove;
        loadingRemove[id] = true;
        this.setState({ loadingRemove: loadingRemove });
        $.ajax({
            method: 'GET',
            url: '/remove-user-governanca/' + id,
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.governanca();
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                this.setState({ loadingRemove: loadingRemove });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                //this.setState({loadingRemove: loadingRemove});
            }.bind(this)
        });
    }

    showHideForm(action) {
        let showForm = !this.state.showForm;

        /*let action = this.state.actionForm;
        if(showForm){
            let actionForm = 'new';
        }
         this.setState({showForm: showForm, actionForm: action});*/

        let actionForm = action;

        this.setState({ showForm: showForm, actionForm: actionForm });
    }

    closeForm() {
        this.setState({ showForm: false });
    }

    governanca() {

        this.setState({ loadingGovernanca: true });

        $.ajax({
            method: 'GET',
            //url: '/governanca-users-governancas',
            url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({
                    governancas: data.governanca,
                    conselhos: data.conselho_fiscal,
                    deficiencia: data.relacoes_trabalho.nr_trabalhadores_deficiencia,
                    empregados: data.relacoes_trabalho.nr_trabalhadores_vinculo,
                    voluntarios: data.relacoes_trabalho.nr_trabalhadores_voluntarios,
                    totalTrabalhadores: data.relacoes_trabalho.nr_trabalhores,
                    loadingGovernanca: false
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingGovernanca: false });
            }.bind(this)
        });
    }

    /*conselhoFiscal(){
         this.setState({loadingGovernanca: true});
         $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
            data: {
             },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({conselhos: data.conselho_fiscal, loadingGovernanca: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingGovernanca: false});
            }.bind(this)
        });
    }*/

    render() {

        //console.log(this.state.showForm);
        //console.log('state.remove', this.state.remove);

        let governancas = this.state.governancas.map(function (item, index) {

            let hr = null;
            if (index < this.state.governancas.length - 1) {
                hr = React.createElement('hr', null);
            }

            return (

                /*<div className="box-insert-governanca"  key={"governanca_"+index}>
                    <i className="far fa-trash-alt text-danger float-right"/>
                    <p>{item.tx_cargo_dirigente}</p>
                    <p>{item.tx_nome_dirigente}</p>
                    <hr/>
                </div>*/

                React.createElement(
                    'div',
                    { className: 'box-insert-governanca', key: "governanca_" + index },
                    React.createElement(
                        'div',
                        { className: 'float-right', style: { marginRight: '40px' } },
                        React.createElement(
                            'a',
                            { className: 'box-itens-btn-edit', onClick: () => this.edit(item.id) },
                            React.createElement('i', { className: 'fa fa-edit' })
                        ),
                        '\xA0',
                        React.createElement(
                            'a',
                            { className: 'box-itens-btn-del', onClick: () => this.remove(item.id), style: { display: this.state.loadingRemove[item.id] ? 'none' : 'block' } },
                            React.createElement('i', { className: "fa " + (this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash-alt text-danger") })
                        ),
                        React.createElement(
                            'a',
                            { onClick: () => this.cancelRemove(item.id), style: { display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none' } },
                            React.createElement('i', { className: "fa fa-undo" })
                        ),
                        React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id] ? '' : 'none' } })
                    ),
                    React.createElement(
                        'p',
                        null,
                        item.tx_nome_dirigente
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'strong',
                            null,
                            item.tx_cargo_dirigente
                        )
                    )
                )

                /*<div className="col-md-6"  key={"governanca_"+item.id}>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-offset-9 col-md-1"><a href="#" onClick={() => this.edit(item.id)}><i className="fa fa-pencil fa-2x"/></a></div>
                                <div className="col-md-1">
                                    <a href="#" onClick={() => this.remove(item.id)} style={{display: this.state.loadingRemove[item.id] ? 'none' : 'block'}}>
                                        <i className={"fa  fa-2x "+( this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash")}/>
                                    </a>
                                    <a href="#" onClick={() => this.cancelRemove(item.id)} style={{display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none'}}>
                                        <i className={"fa  fa-2x fa-undo"}/>
                                    </a>
                                    <i className="fa fa-spin fa-spinner" style={{display: this.state.loadingRemove[item.id] ? '' : 'none'}}/>
                                </div>
                            </div>
                            <div>
                                <h3>{item.nome}</h3>
                                <p>{item.endereco}, {item.numero}, {item.complemento}</p>
                                <p>{item.bairro}</p>
                                <p>{item.cep}</p>
                                <p>{item.cidade} - {item.estado}</p>
                                <p>{this.state.tipo[item.tipo]}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><strong>OBS: </strong>{item.obs}</div>
                            </div>
                            <div className="row text-right">
                                <h6>{this.state.principal[item.principal]} &nbsp;  </h6>
                            </div>
                        </div>
                    </div>
                </div>*/

            );
        }.bind(this));

        let conselhos = this.state.conselhos.map(function (item, index) {

            let hr = null;
            if (index < this.state.conselhos.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'div',
                { className: 'box-insert-governanca', key: "conselho_" + index },
                React.createElement(
                    'div',
                    { className: 'float-right', style: { width: '50px' } },
                    React.createElement(
                        'a',
                        { className: 'box-itens-btn-edit', onClick: () => this.edit(item.id) },
                        React.createElement('i', { className: 'fa fa-edit' })
                    ),
                    '\xA0',
                    React.createElement(
                        'a',
                        { className: 'box-itens-btn-del', onClick: () => this.remove(item.id), style: { display: this.state.loadingRemove[item.id] ? 'none' : 'block' } },
                        React.createElement('i', { className: "fa " + (this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash-alt text-danger") })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.cancelRemove(item.id), style: { display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none' } },
                        React.createElement('i', { className: "fa fa-undo" })
                    ),
                    React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id] ? '' : 'none' } })
                ),
                React.createElement(
                    'p',
                    null,
                    item.tx_nome_conselheiro
                )
            );
        }.bind(this));

        console.log('test: ', this.state.governancas);

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'title-user-area' },
                React.createElement(
                    'div',
                    { className: 'mn-accordion-icon' },
                    React.createElement('i', { className: 'fas fa-briefcase', 'aria-hidden': 'true' })
                ),
                ' ',
                React.createElement(
                    'h3',
                    null,
                    'Rela\xE7\xF5es de Trabalho e Governan\xE7a'
                ),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'Voc\xEA tem ',
                    this.state.governancas.length,
                    ' Trabalhos ou Governan\xE7as cadastrados'
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    { style: { float: 'right', display: this.state.governancas.length < maxConselhos ? 'block' : 'none' } },
                    React.createElement(
                        'a',
                        { onClick: this.showHideForm },
                        React.createElement('i', { className: 'fa fa-plus', style: { display: this.state.showForm ? "none" : "block" } })
                    ),
                    React.createElement(
                        'a',
                        { onClick: this.showHideForm },
                        React.createElement('i', { className: 'fa fa-times', style: { display: this.state.showForm ? "block" : "none" } })
                    )
                ),
                React.createElement('div', { style: { clear: 'both' } })
            ),
            React.createElement(
                'div',
                { style: { display: this.state.showForm ? 'block' : 'none' } },
                React.createElement(FormGovernanca, { action: this.state.actionForm, list: this.governanca, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
            ),
            React.createElement(
                'div',
                { style: { display: this.state.loadingGovernanca ? 'true' : 'none' } },
                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
            ),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt box-itens-g min-h' },
                        React.createElement(
                            'h2',
                            null,
                            'Quadro de Dirigentes'
                        ),
                        governancas
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt box-itens-g min-h' },
                        React.createElement(
                            'h2',
                            null,
                            'Conselho Fiscal'
                        ),
                        conselhos
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'row text-center' },
                        React.createElement(
                            'div',
                            { className: 'col-md-12' },
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'strong',
                                null,
                                'Trabalhadores'
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3' },
                            React.createElement(
                                'div',
                                { className: 'bg-lgt box-itens' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Total de Trabalhadores'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h2',
                                        null,
                                        this.state.totalTrabalhadores
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'N\xE3o constam informa\xE7\xF5es nas bases de dados do Mapa.'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3' },
                            React.createElement(
                                'div',
                                { className: 'bg-lgt box-itens' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Empregados'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h2',
                                        null,
                                        this.state.empregados
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'N\xE3o constam informa\xE7\xF5es nas bases de dados do Mapa.'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3' },
                            React.createElement(
                                'div',
                                { className: 'bg-lgt box-itens' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Defici\xEAncia'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'h2',
                                        null,
                                        this.state.deficiencia
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'N\xE3o constam informa\xE7\xF5es nas bases de dados do Mapa.'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3' },
                            React.createElement(
                                'div',
                                { className: 'bg-lgt box-itens' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Volunt\xE1rios'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('input', { type: 'number', value: this.state.voluntarios, className: 'input-lg', min: '1' }),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'Atualize suas informa\xE7\xF5es sobre Volunt\xE1rios'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Governancas, null), document.getElementById('governancas'));