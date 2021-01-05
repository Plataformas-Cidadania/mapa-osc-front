class Participacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            conferencias: [],
            conselhos: [],
            outros: [],
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Endereço principal',
                2: ' '
            },

            showFormConselho: false,
            showFormConferencia: false,
            showFormOutro: false,

            actionFormConselho: '',
            actionFormConferencia: '',
            actionFormOutro: '',

            loadingRemove: [],

            conferencia: {},
            conselho: {},
            outro: {},

            editIdConselho: 0,
            editIdConferencia: 0,
            editIdOutro: 0,
            editId: 0,

            removeConselho: [],
            removeItem: [],
            removeOutro: [],

            removeItemConselho: null,
            removeItemTx: '',
            removeTipo: ''
        };

        this.list = this.list.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.showHideFormConferencia = this.showHideFormConferencia.bind(this);
        this.showHideFormOutro = this.showHideFormOutro.bind(this);

        this.closeFormConselho = this.closeFormConselho.bind(this);
        this.closeFormConferencia = this.closeFormConferencia.bind(this);
        this.closeFormOutro = this.closeFormOutro.bind(this);

        this.showHideConselho = this.showHideConselho.bind(this);
        this.showHideConferencia = this.showHideConferencia.bind(this);
        this.showHideOutro = this.showHideOutro.bind(this);

        this.removeItem = this.removeItem.bind(this);

        this.callModal = this.callModal.bind(this);

        this.callModalExcluir = this.callModalExcluir.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    /*editConselho(id){
        this.setState({actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id}, function(){
            this.callModal();
        });
    }
    editConferencia(id){
       // this.setState({actionForm: 'edit'});
        this.setState({actionFormConferencia: 'edit', showFormConferencia: false, editIdConferencia: id}, function(){
            this.callModal();
        });
    }*/
    /*editOutro(id){
       // this.setState({actionForm: 'edit'});
        this.setState({actionFormOutro: 'edit', showFormOutro: false, editIdOutro: id}, function(){
            this.callModal();
        });
    }*/

    cancelRemove(id) {
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({ remove: remove });
    }

    showHideFormConselho(action) {
        let showFormConselho = !this.state.showFormConselho;
        let actionFormConselho = action;
        console.log(showFormConselho);
        this.setState({ showFormConselho: showFormConselho, actionFormConselho: actionFormConselho });
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

    closeFormConselho() {
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
            method: 'GET',
            url: getBaseUrl2 + 'osc/participacao_social/611720',
            //url: getBaseUrl2 + 'osc/participacao_social/785239',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({
                    conferencias: data.conferencias_politicas_publicas,
                    conselhos: data.conselhos_politicas_publicas,
                    outros: data.outros_espacos_participacao_social,
                    loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    removeItem(id, tipo) {
        let remove = this.state.removeConselho;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/ps_' + tipo + '/' + id,
            data: {},
            cache: false,
            success: function (data) {
                this.list();
                $('#modalFormExcluir').modal('hide');
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    callModalExcluir(id, tx_nome_conferencia, tipo) {
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItemConferencia: id,
            removeItemTx: tx_nome_conferencia,
            removeTipo: tipo
        }, function () {
            $('#modalFormExcluir').modal('show');
        });
    }

    callModal(id, type) {
        let modal = this.state.modal;
        console.log('id 1:', id);
        this.setState({
            modal: modal,
            editId: id,
            editTipo: type
        }, function () {
            $('#modalForm').modal('show');
            //this.editOutro(id);
        });
    }

    modalExcluir() {
        return React.createElement(
            'div',
            { id: 'modalFormExcluir', className: 'modal fade bd-example-modal-sm', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog modal-lg' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            React.createElement(
                                'strong',
                                null,
                                'Excluir permanentemente'
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fechar' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\xD7'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        'Tem certeza que quer excluir "',
                        this.state.removeItemTx,
                        '".'
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                            'Cancelar'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-danger', onClick: () => this.removeItem(this.state.removeItemConferencia, this.state.removeTipo) },
                            'Excluir'
                        )
                    )
                )
            )
        );
    }

    modal() {
        return React.createElement(
            'div',
            { id: 'modalForm', className: 'modal fade bd-example-modal-lg', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myLargeModalLabel', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog modal-lg' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title', id: 'exampleModalLabel' },
                            React.createElement(
                                'strong',
                                null,
                                this.state.modalTitle
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fechar' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\xD7'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { style: { display: this.state.editTipo == 'outra' ? 'block' : 'none' } },
                            React.createElement(FormEditParticipacaoOutro, {
                                action: this.state.actionForm,
                                list: this.list,
                                id: this.state.editId,
                                closeForm: this.closeForm })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.editTipo == 'conferencia' ? 'block' : 'none' } },
                            React.createElement(FormEditParticipacaoConferencia, {
                                action: this.state.actionForm,
                                list: this.list,
                                id: this.state.editId,
                                closeForm: this.closeForm })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.editTipo == 'conselho' ? 'block' : 'none' } },
                            React.createElement(FormEditParticipacaoConselho, {
                                action: this.state.actionForm,
                                list: this.list,
                                id: this.state.editId,
                                closeForm: this.cleanFormConselho })
                        )
                    )
                )
            )
        );
    }

    render() {

        /////////////////////////////
        let modal = this.modal();
        let modalExcluir = this.modalExcluir();

        ////////////////////////////

        let conselhos = this.state.conselhos.map(function (item, index) {

            return React.createElement(
                'div',
                { className: 'col-md-6', style: { border: '0' }, key: "conselho_" + index },
                React.createElement(
                    'div',
                    { className: 'box-insert-g text-left' },
                    React.createElement(
                        'div',
                        { className: 'box-insert-item box-insert-list' },
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'float-right' },
                            React.createElement(
                                'a',
                                { onClick: () => this.callModalExcluir(item.id_conselho, item.dc_conselho.tx_nome_conselho, 'conselho'), style: { cursor: 'pointer' } },
                                React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                            ),
                            React.createElement(
                                'a',
                                { onClick: () => this.callModal(item.id_conselho, 'conselho'), style: { cursor: 'pointer' } },
                                React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                            )
                        ),
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
                                item.dc_conselho.tx_nome_conselho
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
                                item.dc_tipo_participacao.tx_nome_tipo_participacao
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
                                item.dc_periodicidade_reuniao_conselho.tx_nome_periodicidade_reuniao_conselho
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
                                item.dt_data_inicio_conselho
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
                                item.dt_data_fim_conselho
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                modal
            );
        }.bind(this));

        let conferencias = this.state.conferencias.map(function (item, index) {

            let hr = null;
            if (index < this.state.conferencias.length - 1) {
                hr = React.createElement('hr', null);
            }

            console.log('item: ', item);

            return React.createElement(
                'div',
                { className: 'col-md-6', style: { border: '0' }, key: "conferencia_" + index },
                React.createElement(
                    'div',
                    { className: 'box-insert-m' },
                    React.createElement(
                        'div',
                        { className: 'box-insert-item box-insert-list' },
                        React.createElement('br', null),
                        React.createElement(
                            'a',
                            { onClick: () => this.callModalExcluir(item.id_conferencia, item.dc_conferencia.tx_nome_conferencia, 'conferencia'), style: { cursor: 'pointer' } },
                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                        ),
                        React.createElement(
                            'a',
                            { onClick: () => this.callModal(item.id_conferencia, 'conferencia'), style: { cursor: 'pointer' } },
                            React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                        ),
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
                                item.dc_conferencia.tx_nome_conferencia
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
                                item.dt_ano_realizacao
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
                                item.dc_forma_participacao_conferencia.tx_nome_forma_participacao_conferencia
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                modalExcluir
            );
        }.bind(this));

        let outros = this.state.outros.map(function (item, index) {

            return React.createElement(
                'div',
                { className: 'col-md-6', style: { border: '0' }, key: "outros_" + index },
                React.createElement(
                    'div',
                    { className: 'box-insert-p' },
                    React.createElement(
                        'div',
                        { className: 'box-insert-item box-insert-list' },
                        React.createElement('br', null),
                        React.createElement(
                            'a',
                            { onClick: () => this.callModalExcluir(item.id_participacao_social_outra, item.tx_nome_participacao_social_outra, 'outra'), style: { cursor: 'pointer' } },
                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                        ),
                        React.createElement(
                            'a',
                            { onClick: () => this.callModal(item.id_participacao_social_outra, 'outra') },
                            React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } })
                        ),
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
                                item.tx_nome_participacao_social_outra
                            )
                        )
                    )
                ),
                React.createElement('br', null)
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
                    React.createElement('i', { className: 'fa fa-users', 'aria-hidden': 'true' })
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
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox text-center' },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkConselho', required: true, onClick: this.showHideConselho }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: 'checkConselho' },
                                    'N\xE3o possui conselhos de pol\xEDticas p\xFAblicas'
                                )
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showConselho ? "none" : "" } },
                            conselhos,
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
                                            { className: 'cursor', onClick: this.showHideFormConselho, style: { display: this.state.showFormConselho ? "none" : "block", marginTop: "50%" } },
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
                                            { style: { display: this.state.showFormConselho ? 'block' : 'none' } },
                                            React.createElement(
                                                'a',
                                                { onClick: this.showHideFormConselho },
                                                React.createElement('i', { className: 'far fa-times-circle cursor text-warning', style: { margin: "-25px 0 0 0", float: "right" } })
                                            ),
                                            React.createElement(FormParticipacaoConselho, {
                                                actionConselho: this.state.actionFormConselho,
                                                list: this.list,
                                                id: this.state.editIdConselho,
                                                showHideFormConselho: this.showHideFormConselho,
                                                closeFormConselho: this.closeFormConselho })
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
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox text-center' },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkConferencia', required: true, onClick: this.showHideConferencia }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: 'checkConferencia' },
                                    'N\xE3o possui confer\xEAncias de pol\xEDticas p\xFAblicas'
                                )
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showConferencia ? "none" : "" } },
                            conferencias,
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
                                            React.createElement(FormParticipacaoConferencia, {
                                                action: this.state.actionFormConferencia,
                                                list: this.list, id: this.state.editId,
                                                showHideFormConferencia: this.showHideFormConferencia,
                                                closeFormConferencia: this.closeFormConferencia })
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
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox text-center' },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'checkOutro', required: true, onClick: this.showHideOutro }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: 'checkOutro' },
                                    'N\xE3o possui outros espa\xE7os de participa\xE7\xE3o social'
                                )
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'row', style: { display: this.state.showOutro ? "none" : "" } },
                            outros,
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
                                            React.createElement(FormParticipacaoOutro, {
                                                action: this.state.actionFormOutro,
                                                list: this.list, id: this.state.editId,
                                                showHideFormOutro: this.showHideFormOutro,
                                                closeFormOutro: this.closeFormOutro })
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