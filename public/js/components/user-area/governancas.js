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
            //voluntarios: null,
            totalTrabalhadores: null,

            editIdOsc: 0,

            removeItem: null,
            removeItemTx: '',
            removeTipo: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.governanca = this.governanca.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        //this.remove = this.remove.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.showHideFormConselho = this.showHideFormConselho.bind(this);
        //this.removeConselho = this.removeConselho.bind(this);
        this.closeFormConselho = this.closeFormConselho.bind(this);

        this.updateVoluntario = this.updateVoluntario.bind(this);

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

    edit(id) {
        this.setState({ actionForm: 'edit', showForm: false, editId: id });
    }

    cancelRemove(id) {
        let remove = this.state.remove;
        remove[id] = false;
        this.setState({ remove: remove });
    }

    removeItem(id, tipo) {
        let remove = this.state.remove;

        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/' + tipo + '/' + id,
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

    /*remove(id){
        let remove = this.state.remove;
         if(!remove[id]){
            remove[id] = true;
            this.setState({remove: remove});
            return;
        }
         let loadingRemove = this.state.loadingRemove;
        loadingRemove[id] = true;
        this.setState({loadingRemove: loadingRemove});
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/governanca/'+id,
            data: {
             },
            cache: false,
            success: function(data){
                //console.log(data);
                this.governanca();
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                this.setState({loadingRemove: loadingRemove});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                //this.setState({loadingRemove: loadingRemove});
            }.bind(this)
        });
     }*/

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
            url: getBaseUrl2 + 'osc/rel_trabalho_e_governanca/455128',
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

    editConselho(id) {
        this.setState({ actionFormConselho: 'edit', showFormConselho: false, editIdConselho: id });
    }

    showHideFormConselho(action) {
        let showFormConselho = !this.state.showFormConselho;
        this.setState({ showFormConselho: showFormConselho, actionFormConselho: action });
    }

    closeFormConselho() {
        this.setState({ showFormConselho: false });
    }

    /*removeConselho(id){
        let removeConselho = this.state.removeConselho;
         if(!removeConselho[id]){
            removeConselho[id] = true;
            this.setState({removeConselho: removeConselho});
            return;
        }
         let loadingRemoveConselho = this.state.loadingRemoveConselho;
        loadingRemoveConselho[id] = true;
        this.setState({loadingRemoveConselho: loadingRemoveConselho});
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/conselho/'+id,
            data: {
             },
            cache: false,
            success: function(data){
                this.governanca();
                let loadingRemoveConselho = this.state.loadingRemoveConselho;
                loadingRemoveConselho[id] = false;
                this.setState({loadingRemoveConselho: loadingRemoveConselho});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let loadingRemoveConselho = this.state.loadingRemoveConselho;
                loadingRemoveConselho[id] = false;
            }.bind(this)
        });
     }*/

    validate() {
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        this.setState({ requireds: requireds });
        return valid;
    }

    updateVoluntario(e) {

        console.log('->', this.state);

        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loadingVoluntario: true, buttonVoluntario: false, showMsgVoluntario: false, msgVoluntario: '' }, function () {
            console.log('**', this.state.form.nr_trabalhadores_voluntarios);
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/rel_trabalho/' + this.state.editIdOsc,
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

    render() {

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
                        { className: 'box-itens-btn-edit', onClick: () => this.edit(item.id_dirigente), style: { cursor: 'pointer', float: 'right' } },
                        React.createElement('i', { className: 'fa fa-edit' })
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
                )
            );
        }.bind(this));

        let conselhos = this.state.conselhos.map(function (item, index) {

            return React.createElement(
                'div',
                { className: 'box-insert-governanca', key: "conselho_" + index },
                React.createElement(
                    'div',
                    { className: 'float-right', style: { width: '50px' } },
                    React.createElement(
                        'a',
                        { className: 'box-itens-btn-edit', onClick: () => this.editConselho(item.id_conselheiro) },
                        React.createElement('i', { className: 'fa fa-edit' })
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
                    ' Trabalhos ou Governan\xE7as cadastrados'
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
                                { className: 'btn-add', onClick: this.showHideForm },
                                React.createElement('i', { className: 'fas fa-plus-circle fa-2x', style: { display: this.state.showForm ? "none" : "block" } })
                            ),
                            React.createElement(
                                'a',
                                { onClick: this.showHideForm },
                                React.createElement('i', { className: 'fa fa-times', style: { display: this.state.showForm ? "block" : "none" } })
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
                                { className: 'btn-add', onClick: this.showHideFormConselho },
                                React.createElement('i', { className: 'fas fa-plus-circle fa-2x', style: { display: this.state.showFormConselho ? "none" : "block" } })
                            ),
                            React.createElement(
                                'a',
                                { onClick: this.showHideFormConselho },
                                React.createElement('i', { className: 'fa fa-times', style: { display: this.state.showFormConselho ? "block" : "none" } })
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