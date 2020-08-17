class Certificates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            certificates: [],
            cd_certificado: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            certificate: {},
            editId: 0,
            modal: {}
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.modal = this.modal.bind(this);
        this.callModal = this.callModal.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.list();
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
            url: '/remove-user-certificate/' + id,
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
            //url: '/list-users-certificates',
            url: getBaseUrl2 + 'osc/certificados/455128',
            data: {},
            cache: false,
            success: function (data) {
                console.log("data: ", data);
                this.setState({ certificates: data, loadingList: false });
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
                        React.createElement(FormCertificate, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
                    )
                )
            )
        );
    }

    render() {

        let modal = this.modal();

        console.log("Certificado: ", this.state.certificates);
        //console.log(this.state.showForm);
        //console.log('state.remove', this.state.remove);

        let certificates = this.state.certificates.map(function (item, index) {

            let hr = null;
            if (index < this.state.certificates.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'tr',
                { key: "certificate_" + index },
                React.createElement(
                    'td',
                    null,
                    item.cd_certificado
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_inicio_certificado
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_fim_certificado
                ),
                React.createElement(
                    'td',
                    null,
                    item.cd_uf
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
                        { onClick: () => this.remove(item.id_certificado), style: { display: this.state.loadingRemove[item.id_certificado] ? 'none' : '' } },
                        React.createElement('i', { className: "fas " + (this.state.remove[item.id_certificado] ? "fa-times text-primary" : "fa-trash-alt text-danger") })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.cancelRemove(item.id_certificado), style: { display: this.state.remove[item.id_certificado] && !this.state.loadingRemove[item.id_certificado] ? '' : 'none' } },
                        React.createElement('i', { className: 'fas fa-undo' })
                    ),
                    React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id_certificado] ? '' : 'none' } })
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
                    React.createElement('i', { className: 'fas fa-certificate', 'aria-hidden': 'true' })
                ),
                ' ',
                React.createElement(
                    'h3',
                    null,
                    'T\xEDtulos e Certifica\xE7\xF5es'
                ),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'Voc\xEA tem ',
                    this.state.certificates.length,
                    ' t\xEDtulos ou certificados cadastrados'
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
                                    'Titulo / Certificado'
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
                                    'Localidade'
                                ),
                                React.createElement('th', { scope: 'col' })
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            certificates
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { float: 'right', cursor: 'pointer', display: this.state.certificates.length < maxCertificates ? 'block' : 'none' } },
                        React.createElement(
                            'a',
                            { onClick: this.callModal, style: { display: this.state.showForm ? "none" : "block" }, className: 'btn btn-warning' },
                            React.createElement('i', { className: 'fa fa-plus' }),
                            ' Adicionar novo t\xEDtulo'
                        )
                    )
                )
            ),
            modal
        );
    }
}

ReactDOM.render(React.createElement(Certificates, null), document.getElementById('certificates'));