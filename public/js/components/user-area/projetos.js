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
            editId: 0
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModal = this.callModal.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    edit(id) {
        // this.setState({actionForm: 'edit'});
        //this.setState({actionForm: 'edit', showForm: false, editId: id});

        this.setState({ actionForm: 'edit', editId: id }, function () {
            this.callModal();
        });
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
                console.log(data);
                this.setState({ projetos: data, loadingList: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
                this.setState({ loadingList: false });
            }.bind(this)
        });
    }

    callModal() {
        let modal = this.state.modal;
        this.setState({ modal: modal }, function () {
            $('#modalForm').modal('show');
        });
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
                                'T\xEDtulo'
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
                        React.createElement(FormProjeto, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
                    )
                )
            )
        );
    }

    render() {

        let modal = this.modal();
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
                    item.tx_nome_projeto
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_data_inicio_projeto
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_data_fim_projeto
                ),
                React.createElement(
                    'td',
                    null,
                    item.nr_valor_total_projeto
                ),
                React.createElement(
                    'td',
                    { width: '70' },
                    React.createElement(
                        'a',
                        { onClick: () => this.edit(item.id) },
                        React.createElement('i', { className: 'far fa-edit text-primary' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        'a',
                        { onClick: () => this.remove(item.id_projeto), style: { display: this.state.loadingRemove[item.id_projeto] ? 'none' : '' } },
                        React.createElement('i', { className: "fas " + (this.state.remove[item.id_projeto] ? "fa-times text-primary" : "fa-trash-alt text-danger") })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.cancelRemove(item.id_projeto), style: { display: this.state.remove[item.id_projeto] && !this.state.loadingRemove[item.id_projeto] ? '' : 'none' } },
                        React.createElement('i', { className: 'fas fa-undo' })
                    ),
                    React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id_projeto] ? '' : 'none' } })
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
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Fim da validade'
                                ),
                                React.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Valor total projeto'
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
                            { onClick: this.callModal, className: 'btn btn-warning' },
                            React.createElement('i', { className: 'fa fa-plus' }),
                            ' Adicionar novo projeto'
                        )
                    )
                ),
                modal
            )
        );
    }
}

ReactDOM.render(React.createElement(Projetos, null), document.getElementById('projetos'));