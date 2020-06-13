class Governancas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            governancas: [],
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
            editId: 0
        };

        this.list = this.list.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);
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
            url: '/list-users-governancas',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ governancas: data, loadingList: false });
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

        let governancas = this.state.governancas.map(function (item, index) {

            let hr = null;
            if (index < this.state.governancas.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'div',
                { className: 'col-md-6', key: "governanca_" + item.id },
                React.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-offset-9 col-md-1' },
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: () => this.edit(item.id) },
                                    React.createElement('i', { className: 'fa fa-pencil fa-2x' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-1' },
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: () => this.remove(item.id), style: { display: this.state.loadingRemove[item.id] ? 'none' : 'block' } },
                                    React.createElement('i', { className: "fa  fa-2x " + (this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash") })
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: () => this.cancelRemove(item.id), style: { display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none' } },
                                    React.createElement('i', { className: "fa  fa-2x fa-undo" })
                                ),
                                React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id] ? '' : 'none' } })
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h3',
                                null,
                                item.nome
                            ),
                            React.createElement(
                                'p',
                                null,
                                item.endereco,
                                ', ',
                                item.numero,
                                ', ',
                                item.complemento
                            ),
                            React.createElement(
                                'p',
                                null,
                                item.bairro
                            ),
                            React.createElement(
                                'p',
                                null,
                                item.cep
                            ),
                            React.createElement(
                                'p',
                                null,
                                item.cidade,
                                ' - ',
                                item.estado
                            ),
                            React.createElement(
                                'p',
                                null,
                                this.state.tipo[item.tipo]
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'strong',
                                    null,
                                    'OBS: '
                                ),
                                item.obs
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row text-right' },
                            React.createElement(
                                'h6',
                                null,
                                this.state.principal[item.principal],
                                ' \xA0  '
                            )
                        )
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
                    'h3',
                    null,
                    React.createElement(
                        'div',
                        { style: { float: 'left' } },
                        React.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                        ' Endere\xE7os cadastrados'
                    ),
                    React.createElement(
                        'div',
                        { style: { float: 'right', display: this.state.governancas.length < maxGovernancas ? 'block' : 'none' } },
                        React.createElement(
                            'a',
                            { href: '#', onClick: this.showHideForm },
                            React.createElement('i', { className: 'fa fa-plus', style: { display: this.state.showForm ? "none" : "block" } })
                        ),
                        React.createElement(
                            'a',
                            { href: '#', onClick: this.showHideForm },
                            React.createElement('i', { className: 'fa fa-times', style: { display: this.state.showForm ? "block" : "none" } })
                        )
                    ),
                    React.createElement('div', { style: { clear: 'both' } })
                ),
                React.createElement(
                    'p',
                    null,
                    'Voc\xEA tem ',
                    this.state.governancas.length,
                    ' endere\xE7os cadastrados'
                ),
                React.createElement('hr', null)
            ),
            React.createElement(
                'div',
                { style: { display: this.state.showForm ? 'block' : 'none' } },
                React.createElement(FormGovernanca, { action: this.state.actionForm, list: this.list, id: this.state.editId, showHideForm: this.showHideForm, closeForm: this.closeForm })
            ),
            React.createElement(
                'div',
                { style: { display: this.state.loadingList ? 'true' : 'none' } },
                React.createElement('img', { style: { marginTop: '80px' }, src: '/img/loading.gif', width: '150px', alt: 'carregando', title: 'carregando' })
            ),
            React.createElement(
                'div',
                { className: 'row' },
                governancas
            )
        );
    }
}

ReactDOM.render(React.createElement(Governancas, null), document.getElementById('governancas'));