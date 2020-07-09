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
            showFormConferencia: false,
            actionFormConferencia: '',
            showFormOutro: false,
            actionFormOutro: '',
            remove: [],
            loadingRemove: [],
            participacao: {},
            conselho: {},
            editId: 0
        };

        this.list = this.list.bind(this);
        this.list2 = this.list2.bind(this);
        this.remove = this.remove.bind(this);

        this.showHideForm = this.showHideForm.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
        this.closeFormConferencia = this.closeFormConferencia.bind(this);
        this.showHideFormOutro = this.showHideFormOutro.bind(this);
        this.closeFormOutro = this.closeFormOutro.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);
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
        let actionForm = action;
        console.log(showForm);
        this.setState({ showForm: showForm, actionForm: actionForm });
    }
    showHideFormConferencia(action) {
        let showFormConferencia = !this.state.showFormConferencia;
        let actionFormConferencia = action;
        console.log(showFormConferencia);
        this.setState({ showFormConferencia: showFormConferencia, actionFormConferencia: actionFormConferencia });
    }
    showHideFormOutro(action) {
        let showFormOutro = !this.state.showFormOutro;
        let actionFormOutro = action;
        console.log(showFormOutro);
        this.setState({ showFormOutro: showFormOutro, actionFormOutro: actionFormOutro });
    }

    showHideConselho(action) {
        let showConselho = !this.state.showConselho;
        let actionConselho = action;
        this.setState({ showConselho: showConselho, actionConselho: actionConselho });
    }

    showHideConferencia(action) {
        let showConferencia = !this.state.showConferencia;
        let actionConferencia = action;
        this.setState({ showConferencia: showConferencia, actionConferencia: actionConferencia });
    }

    showHideOutro(action) {
        let showOutro = !this.state.showOutro;
        let actionOutro = action;
        this.setState({ showOutro: showOutro, actionOutro: actionOutro });
    }

    closeForm() {
        this.setState({ showForm: false });
    }

    closeFormConferencia() {
        this.setState({ showFormConferencia: false });
    }

    closeFormOutro() {
        this.setState({ showFormOutro: false });
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

            return React.createElement(
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
                React.createElement(
                    'h3',
                    null,
                    'Espa\xE7os de Participa\xE7\xE3o Social'
                ),
                React.createElement('hr', null),
                React.createElement('br', null)
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'box-groups' },
                        React.createElement(
                            'h2',
                            null,
                            'Conselhos de Pol\xEDticas P\xFAblicas'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check text-center' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox', id: 'checkConselho', onClick: this.showHideConselho }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label box-groups-info', htmlFor: 'checkConselho' },
                                'N\xE3o possui conselhos de pol\xEDticas p\xFAblicas'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showConselho ? "none" : "" } },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'box-insert-g text-left' },
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
                                            ),
                                            React.createElement('hr', null)
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
                                            ),
                                            React.createElement('hr', null)
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
                                            ),
                                            React.createElement('hr', null)
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
                                            ),
                                            React.createElement('hr', null)
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
                                            ),
                                            React.createElement('hr', null)
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
                                    { className: ' box-insert-g' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn text-center' },
                                        React.createElement(
                                            'a',
                                            { className: 'cursor', onClick: this.showHideForm, style: { display: this.state.showForm ? "none" : "block", marginTop: "50%" } },
                                            React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'p',
                                                null,
                                                'Novo Conselhos de Pol\xEDticas P\xFAblicas'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showForm ? 'block' : 'none' } },
                                            React.createElement(
                                                'a',
                                                { onClick: this.showHideForm },
                                                React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                            ),
                                            React.createElement(FormParticipacao, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                            React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
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
                        { className: 'box-groups' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h2',
                            null,
                            'Confer\xEAncias de Pol\xEDticas P\xFAblicas'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check text-center' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox', id: 'checkConferencia', onClick: this.showHideConferencia }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label box-groups-info', htmlFor: 'checkConferencia' },
                                'N\xE3o possui confer\xEAncias de pol\xEDticas p\xFAblicas'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showConferencia ? "none" : "" } },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'box-insert-m' },
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
                                        React.createElement('hr', null),
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
                                        React.createElement('hr', null),
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
                                    { className: 'box-insert-m' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn text-center' },
                                        React.createElement(
                                            'a',
                                            { className: 'cursor', onClick: this.showHideFormConferencia, style: { display: this.state.showFormConferencia ? "none" : "block", marginTop: "35%" } },
                                            React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'p',
                                                null,
                                                'Nova Confer\xEAncia de Pol\xEDticas P\xFAblicas'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showFormConferencia ? 'block' : 'none' } },
                                            React.createElement(
                                                'a',
                                                { onClick: this.showHideFormConferencia },
                                                React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                            ),
                                            React.createElement(FormParticipacaoConferencia, { action: this.state.actionFormConferencia, list: this.list, id: this.state.editId, showHideFormConferencia: this.showHideFormConferencia, closeFormConferencia: this.closeFormConferencia })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                            React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
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
                        { className: 'box-groups' },
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'h2',
                            null,
                            'Outros espa\xE7os de participa\xE7\xE3o social'
                        ),
                        React.createElement(
                            'p',
                            { className: 'form-check text-center' },
                            React.createElement('input', { className: 'form-check-input', type: 'checkbox', id: 'checkOutro', onClick: this.showHideOutro }),
                            React.createElement(
                                'label',
                                { className: 'form-check-label box-groups-info', htmlFor: 'checkOutro' },
                                'N\xE3o possui outros espa\xE7os de participa\xE7\xE3o social'
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showOutro ? "none" : "" } },
                            React.createElement(
                                'div',
                                { className: 'col-md-6', style: { border: '0' } },
                                React.createElement(
                                    'div',
                                    { className: 'box-insert-p' },
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
                                    { className: 'box-insert-p' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-insert-btn text-center' },
                                        React.createElement(
                                            'a',
                                            { className: 'cursor', onClick: this.showHideFormOutro, style: { display: this.state.showFormOutro ? "none" : "block", marginTop: "15%" } },
                                            React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'p',
                                                null,
                                                'Novo Outros espa\xE7os de participa\xE7\xE3o social'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-md-12' },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showFormOutro ? 'block' : 'none' } },
                                            React.createElement(
                                                'a',
                                                { onClick: this.showHideFormOutro },
                                                React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                            ),
                                            React.createElement(FormParticipacaoOutro, { action: this.state.actionFormOutro, list: this.list, id: this.state.editId, showHideFormOutro: this.showHideFormOutro, closeFormOutro: this.closeFormOutro })
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loadingList ? 'true' : 'none' } },
                                            React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
                                        )
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