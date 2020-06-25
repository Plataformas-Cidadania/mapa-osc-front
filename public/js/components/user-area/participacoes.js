class Participacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            participacoes: [],
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
            participacao: {},
            conselho: {},
            editId: 0
        };

        this.list = this.list.bind(this);
        this.list2 = this.list2.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentDidMount() {
        this.list();
        this.list2();
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
            url: '/remove-user-participacao/' + id,
            data: {},
            cache: false,
            success: function (data) {
                //console.log(data);
                this.list();
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

    list() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'POST',
            url: '/list-users-participacoes',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ participacoes: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    list2() {

        this.setState({ loadingList: true });

        $.ajax({
            method: 'POST',
            url: '/list-users-conselhos',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ conselhos: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    render() {

        //console.log(this.state.showForm);
        //console.log('state.remove', this.state.remove);

        let participacoes = this.state.participacoes.map(function (item, index) {

            let hr = null;
            if (index < this.state.participacoes.length - 1) {
                hr = React.createElement('hr', null);
            }

            return (

                /*<div className="box-insert-list"  key={"participacao_"+index}>
                    <i className="far fa-trash-alt text-danger float-right"/>
                    <p>{item.tx_cargo_dirigente}</p>
                    <p>{item.tx_nome_dirigente}</p>
                    <hr/>
                </div>*/

                React.createElement(
                    'div',
                    { className: 'box-insert-list', key: "participacao_" + index },
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

                /*<div className="col-md-6"  key={"participacao_"+item.id}>
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
                { className: 'box-insert-list', key: "conselho_" + index },
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
                    this.state.participacoes.length,
                    ' Trabalhos ou Governan\xE7as cadastrados'
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    { style: { float: 'right', display: this.state.participacoes.length < maxConselhos ? 'block' : 'none' } },
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
                React.createElement(FormParticipacao, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
            ),
            React.createElement(
                'div',
                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
            ),
            React.createElement('br', null),
            '/////////////',
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'title-style' },
                        React.createElement(
                            'h2',
                            null,
                            'Espa\xE7os de Participa\xE7\xE3o Social'
                        ),
                        React.createElement('div', { className: 'line line-fix' }),
                        React.createElement('hr', null)
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-g' },
                        React.createElement(
                            'h2',
                            null,
                            'Conselhos de Pol\xEDticas P\xFAblicas'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox', id: 'gridCheck' }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                'N\xE3o possui conselhos de pol\xEDticas p\xFAblicas'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-g' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-item box-insert-list' },
                                        React.createElement('br', null),
                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Nome do Conselho:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Conselho Estadual Antidrogas/Conselho ' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Titularidade:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Suplente' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Nome de representante:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Fernando Lima de Souza ' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Periodicidade da Reuni\xE3o:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Mensal' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Data de in\xEDcio de vig\xEAncia:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: '01/12/2019' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Data de fim de vig\xEAncia:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: '01/12/2019' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-g' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn' },
                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            'Novo Conselhos de Pol\xEDticas P\xFAblicas'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-g' },
                        React.createElement(
                            'h2',
                            null,
                            'Confer\xEAncias de Pol\xEDticas P\xFAblicas'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                id: 'gridCheck' }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                'N\xE3o possui confer\xEAncias de pol\xEDticas p\xFAblicas'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-m' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-item box-insert-list' },
                                        React.createElement('br', null),
                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Nome da Confer\xEAncia:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Confer\xEAncia Brasileira de Arranjos Produtivos Locais' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Ano de realiza\xE7\xE3o da confer\xEAncia:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: '1900' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Forma de participa\xE7\xE3o na confer\xEAncia:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Membro de comiss\xE3o organizadora nacional' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-m' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn' },
                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            'Novo Conselhos de Pol\xEDticas P\xFAblicas'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'box-itens-g' },
                        React.createElement(
                            'h2',
                            null,
                            'Outros espa\xE7os de participa\xE7\xE3o social'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                id: 'gridCheck' }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                'N\xE3o possui outros espa\xE7os de participa\xE7\xE3o social'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-p' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-item box-insert-list' },
                                        React.createElement('br', null),
                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'h3',
                                                null,
                                                'Atua\xE7\xE3o em F\xF3runs, Articula\xE7\xF5es, Coletivos e Redes de OSCs:'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Confer\xEAncia Brasileira de Arranjos Produtivos Locais' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'div',
                                    { className: 'bg-lgt box-insert-p' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn-p' },
                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'p',
                                            null,
                                            'Novo Outros espa\xE7os de participa\xE7\xE3o social'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            '/////////////',
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
                        participacoes
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
                                        '11'
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'a'
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
                                        'aa'
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'aa'
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
                                        'aa'
                                    ),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        'aa'
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
                                    React.createElement('input', { type: 'number', value: '10', className: 'input-lg', min: '1' }),
                                    React.createElement(
                                        'p',
                                        { className: 'not-info' },
                                        '\xA0'
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

ReactDOM.render(React.createElement(Participacoes, null), document.getElementById('participacoes'));