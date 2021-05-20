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
            form: {
                nr_trabalhadores_voluntarios: ''
            },
            requireds: {
                nr_trabalhadores_voluntarios: true
            },

            loadingRemove: [],
            governanca: {},
            conselho: {},
            editId: 0,
            showForm: false,
            actionForm: '',
            remove: [],

            showFormConselho: false,
            actionFormConselho: '',
            removeConselho: [],
            editIdConselho: 0,
            loadingRemoveConselho: [],

            deficiencia: null,
            empregados: null,
            totalTrabalhadores: null,

            editIdOsc: 0,

            removeItem: null,
            removeItemTx: '',
            removeTipo: '',
            modalTitle: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.governanca = this.governanca.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        this.closeFormConselho = this.closeFormConselho.bind(this);

        this.updateVoluntario = this.updateVoluntario.bind(this);

        this.callModal = this.callModal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const defaultValue = target.type === 'checkbox' ? target.checked : target.defaultValue;
        const name = target.name;

        let form = this.state.form;
        let placeholder = this.state.placeholder;
        form[name] = value;
        //form[name] = defaultValue;

        this.setState({ form: form, placeholder: placeholder });
    }

    componentDidMount() {
        this.governanca();
    }

    /*edit(id){
        this.setState({actionForm: 'edit', showForm: false, editId: id});
    }*/

    removeItem(id, tipo) {
        let remove = this.state.remove;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/' + tipo + '/' + id,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            data: {},
            cache: false,
            success: function (data) {
                this.governanca();
                $('#modalFormExcluir').modal('hide');
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    showHideForm(action) {
        let showForm = !this.state.showForm;
        this.setState({ showForm: showForm, actionForm: action });
    }

    closeForm() {
        this.setState({ showForm: false });
    }

    governanca() {

        this.setState({ loadingGovernanca: true });

        $.ajax({
            method: 'GET',
            //url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
            url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/' + this.props.id,
            data: {},
            cache: false,
            success: function (data) {
                this.setState({
                    governancas: data.governanca,
                    conselhos: data.conselho_fiscal,
                    deficiencia: data.relacoes_trabalho.nr_trabalhadores_deficiencia,
                    empregados: data.relacoes_trabalho.nr_trabalhadores_vinculo,

                    totalTrabalhadores: data.relacoes_trabalho.nr_trabalhores,
                    loadingGovernanca: false,
                    editIdOsc: data.relacoes_trabalho.id_osc,
                    form: {
                        nr_trabalhadores_voluntarios: data.relacoes_trabalho.nr_trabalhadores_voluntarios
                    }
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingGovernanca: false });
            }.bind(this)
        });
    }

    /*editConselho(id){
        this.setState({actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id});
    }*/

    showHideFormConselho(action) {
        let showFormConselho = !this.state.showFormConselho;
        this.setState({ showFormConselho: showFormConselho, actionFormConselho: action });
    }

    closeFormConselho() {
        this.setState({ showFormConselho: false });
    }

    validate() {
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({ requireds: requireds });
        return valid;
    }

    updateVoluntario(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loadingVoluntario: true, buttonVoluntario: false, showMsgVoluntario: false, msgVoluntario: '' }, function () {
            console.log('**', this.state.form.nr_trabalhadores_voluntarios);
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/rel_trabalho/' + this.state.editIdOsc,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: this.state.form,
                cache: false,
                success: function (data) {
                    let msgVoluntario = "Dados alterados com sucesso!";
                    this.setState({ loadingVoluntario: false, msgVoluntario: msgVoluntario, showMsgVoluntario: true, updateOkVoluntario: true, buttonVoluntario: true });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msgVoluntario = "Ocorreu um erro!";
                    this.setState({ loadingVoluntario: false, msgVoluntario: msgVoluntario, showMsgVoluntario: true, updateOkVoluntario: false, buttonVoluntario: true });
                }.bind(this)
            });
        });
    }

    callModal(id, type, txt) {
        console.log('3', id);
        let modal = this.state.modal;
        this.setState({
            modal: modal,
            editId: id,
            editTipo: type,
            modalTitle: txt
        }, function () {
            $('#modalForm').modal('show');
        });
    }

    callModalExcluir(id, tx_nome_conferencia, tipo) {
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItem: id,
            removeItemTx: tx_nome_conferencia,
            removeTipo: tipo
        }, function () {
            $('#modalFormExcluir').modal('show');
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
                            { type: 'button', className: 'btn btn-danger', onClick: () => this.removeItem(this.state.removeItem, this.state.removeTipo) },
                            'Excluir'
                        )
                    )
                )
            )
        );
    }

    modal() {

        let form = null;

        if (this.state.editTipo === 'conselho') {
            form = React.createElement(FormEditConselho, {
                action: this.state.actionFormConselho,
                list: this.governanca,
                id: this.state.editId,
                showHideFormConselho: this.showHideFormConselho,
                closeForm: this.closeFormConselho });
        }
        if (this.state.editTipo === 'governanca') {
            form = React.createElement(FormEditGovernanca, {
                action: this.state.actionForm,
                list: this.governanca,
                id: this.state.editId,
                showHideForm: this.showHideForm,
                closeForm: this.closeForm });
        }

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
                                'Alterar ',
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
                        form
                    )
                )
            )
        );
    }

    render() {

        let modal = this.modal();
        let modalExcluir = this.modalExcluir();

        let governancas = this.state.governancas.map(function (item, index) {
            return React.createElement(
                'div',
                { className: 'box-insert-governanca', key: "governanca_" + index },
                React.createElement(
                    'div',
                    { className: 'float-right' },
                    React.createElement(
                        'a',
                        { onClick: () => this.callModal(item.id_dirigente, 'governanca', 'governança'), className: 'box-itens-btn-edit', style: { cursor: 'pointer', float: 'right' } },
                        React.createElement('i', { className: 'far fa-edit' })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.callModalExcluir(item.id_dirigente, item.tx_nome_dirigente, 'governanca'), style: { cursor: 'pointer', margin: '0 0 0 25px', top: '4px', position: 'relative' } },
                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                    )
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
                ),
                modal
            );
        }.bind(this));

        let conselhos = this.state.conselhos.map(function (item, index) {

            return React.createElement(
                'div',
                { className: 'box-insert-governanca', key: "conselho_" + index },
                React.createElement(
                    'div',
                    { className: 'float-right' },
                    React.createElement(
                        'a',
                        { onClick: () => this.callModal(item.id_conselheiro, 'conselho', 'conselho'), className: 'box-itens-btn-edit', style: { cursor: 'pointer', float: 'right' } },
                        React.createElement('i', { className: 'far fa-edit' })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.callModalExcluir(item.id_conselheiro, item.tx_nome_conselheiro, 'conselho'), style: { cursor: 'pointer', margin: '0 0 0 25px', top: '4px', position: 'relative' } },
                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                    )
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
                    this.state.governancas.length,
                    ' dirigentes e ',
                    this.state.conselhos.length,
                    ' conselhos cadastrados'
                ),
                React.createElement('hr', null)
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
                        React.createElement(
                            'div',
                            { style: { float: 'right' } },
                            React.createElement(
                                'a',
                                { className: 'btn-add', onClick: this.showHideForm, style: { display: this.state.showForm ? "none" : "block" } },
                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                            ),
                            React.createElement(
                                'a',
                                { className: 'btn-add btn-add-warning', onClick: this.showHideForm, style: { display: this.state.showForm ? "block" : "none" } },
                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.showForm ? 'block' : 'none' } },
                            React.createElement(FormGovernanca, { action: this.state.actionForm, list: this.governanca, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
                        ),
                        governancas
                    ),
                    modalExcluir
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
                        React.createElement(
                            'div',
                            { style: { float: 'right' } },
                            React.createElement(
                                'a',
                                { className: 'btn-add', onClick: this.showHideFormConselho, style: { display: this.state.showFormConselho ? "none" : "block" } },
                                React.createElement('i', { className: "fas fa-2x fa-plus-circle" })
                            ),
                            React.createElement(
                                'a',
                                { className: 'btn-add btn-add-warning', onClick: this.showHideFormConselho, style: { display: this.state.showFormConselho ? "block" : "none" } },
                                React.createElement('i', { className: "fas fa-2x fa-times-circle" })
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.showFormConselho ? 'block' : 'none' } },
                            React.createElement(FormConselho, { action: this.state.actionFormConselho, list: this.governanca, id: this.state.editIdConselho, showHideFormConselho: this.showHideFormConselho, closeForm: this.closeFormConselho })
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
                                    React.createElement('div', { style: { clear: 'both', height: '1px' } }),
                                    React.createElement('input', { className: 'input-lg', type: 'number', min: '1', name: 'nr_trabalhadores_voluntarios', onChange: this.handleInputChange, defaultValue: this.state.form.nr_trabalhadores_voluntarios,
                                        style: { float: 'left' }, placeholder: '0' }),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'button',
                                            { type: 'button', className: 'btn btn-success', onClick: this.updateVoluntario },
                                            React.createElement('i', {
                                                className: 'fas fa-cloud-download-alt' }),
                                            ' '
                                        ),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement('div', { style: { clear: 'both' } }),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.loadingVoluntario ? 'block' : 'none' } },
                                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                        ' Processando ',
                                        React.createElement('br', null),
                                        ' ',
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.showMsgVoluntario ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOkVoluntario ? "success" : "danger") },
                                        React.createElement('i', { className: "far " + (this.state.updateOkVoluntario ? "fa-check-circle" : "fa-times-circle") }),
                                        this.state.msgVoluntario
                                    ),
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