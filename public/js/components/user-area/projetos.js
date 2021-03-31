class Projetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            projetos: [],
            cd_projeto: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            projeto: {},
            editId: 0,
            editTipo: ''
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModalExcluir = this.callModalExcluir.bind(this);
        this.callModal = this.callModal.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    removeItem(id) {
        $.ajax({
            method: 'DELETE',
            url: getBaseUrl2 + 'osc/projeto/' + id,
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
    callModalExcluir(id, title) {
        let modalExcluir = this.state.modalExcluir;
        this.setState({
            modalExcluir: modalExcluir,
            removeItemConferencia: id,
            removeItemTx: title
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
                        React.createElement(
                            'strong',
                            null,
                            this.state.removeItemTx
                        ),
                        '"? Todas as informa\xE7\xF5es cadastradas ser\xE3o perdidas.'
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

    /*edit(id, type){
        this.setState({actionForm: 'edit', editId: id, editTipo:type,}, function(){
            this.callModal();
        });
    }*/

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
            url: '/remove-user-projeto/' + id,
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
            method: 'GET',
            //url: '/list-users-projetos',
            url: getBaseUrl2 + 'osc/projetos/455128',
            data: {},
            cache: false,
            success: function (data) {
                this.setState({ projetos: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    /*callModal(){
        let modal = this.state.modal;
        this.setState({modal: modal}, function(){
            $('#modalForm').modal('show');
        });
    }*/

    callModal(id, type, txt) {
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

    modal() {

        let form = null;

        if (this.state.editTipo == 'insert') {
            form = React.createElement(FormProjeto, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm });
        }
        if (this.state.editTipo == 'edit') {
            form = React.createElement(FormEditProjeto, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm });
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

        let projetos = this.state.projetos.map(function (item, index) {

            let hr = null;
            if (index < this.state.projetos.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'tr',
                { key: "projeto_" + index },
                React.createElement(
                    'td',
                    null,
                    item.titulo
                ),
                React.createElement(
                    'td',
                    null,
                    formatDate(item.data_inicio, 'pt-br')
                ),
                React.createElement(
                    'td',
                    { width: '70' },
                    React.createElement(
                        'a',
                        { onClick: () => this.callModal(item.id, 'edit', 'Alterar projeto') },
                        React.createElement('i', { className: 'far fa-edit text-primary' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        'a',
                        { onClick: () => this.callModalExcluir(item.id, item.titulo), style: { cursor: 'pointer', position: 'relative', top: '4px' } },
                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' })
                    )
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
                    React.createElement('i', { className: 'fa fa-project-diagram', 'aria-hidden': 'true' })
                ),
                ' ',
                React.createElement(
                    'h3',
                    null,
                    'Projetos'
                ),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'Voc\xEA tem ',
                    this.state.projetos.length,
                    ' t\xEDtulos ou projetos cadastrados'
                ),
                React.createElement('hr', null)
            ),
            React.createElement(
                'div',
                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            { className: 'bg-pri text-light' },
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Titulo / Projeto'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'In\xEDcio da validade'
                                ),
                                React.createElement('th', { scope: 'col' })
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            projetos
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { float: 'right', cursor: 'pointer' } },
                        React.createElement(
                            'a',
                            { onClick: () => this.callModal(0, 'insert', 'Inserir projeto'), className: 'btn btn-warning' },
                            React.createElement('i', { className: 'fa fa-plus' }),
                            ' Adicionar novo projeto'
                        )
                    )
                ),
                modal,
                modalExcluir
            )
        );
    }
}

ReactDOM.render(React.createElement(Projetos, null), document.getElementById('projetos'));