class Atuacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            atuacoes: [],
            cd_atuacao: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
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
            url: '/remove-user-atuacao/' + id,
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
            url: '/list-users-atuacoes',
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ atuacoes: data, loadingList: false });
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

        let atuacoes = this.state.atuacoes.map(function (item, index) {

            let hr = null;
            if (index < this.state.atuacoes.length - 1) {
                hr = React.createElement('hr', null);
            }

            return React.createElement(
                'tr',
                { key: "atuacao_" + index },
                React.createElement(
                    'td',
                    null,
                    item.cd_atuacao
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_inicio_atuacao
                ),
                React.createElement(
                    'td',
                    null,
                    item.dt_fim_atuacao
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
                        { onClick: () => this.remove(item.id_atuacao), style: { display: this.state.loadingRemove[item.id_atuacao] ? 'none' : '' } },
                        React.createElement('i', { className: "fas " + (this.state.remove[item.id_atuacao] ? "fa-times text-primary" : "fa-trash-alt text-danger") })
                    ),
                    React.createElement(
                        'a',
                        { onClick: () => this.cancelRemove(item.id_atuacao), style: { display: this.state.remove[item.id_atuacao] && !this.state.loadingRemove[item.id_atuacao] ? '' : 'none' } },
                        React.createElement('i', { className: 'fas fa-undo' })
                    ),
                    React.createElement('i', { className: 'fa fa-spin fa-spinner', style: { display: this.state.loadingRemove[item.id_atuacao] ? '' : 'none' } })
                )
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
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
                            '\xC1reas e Sub\xE1reas de atua\xE7\xE3o da OSC'
                        ),
                        React.createElement('div', { className: 'line line-fix' }),
                        React.createElement('hr', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'text-center' },
                        'Atividade econ\xF4mica (CNAE)'
                    ),
                    React.createElement('br', null)
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-6' },
                    React.createElement(
                        'div',
                        { className: 'alert alert-secondary' },
                        React.createElement(
                            'h2',
                            { className: 'text-center' },
                            '\xC1rea de atua\xE7\xE3o 1'
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-icon' },
                            React.createElement('input', { type: 'text', className: 'form-control',
                                placeholder: 'Busque um artigo...' }),
                            React.createElement('i', { className: 'fas fa-search' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'div',
                                    { className: 'form-check' },
                                    React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                        id: 'gridCheck' }),
                                    React.createElement(
                                        'label',
                                        { className: 'form-check-label',
                                            htmlFor: 'gridCheck' },
                                        'Educa\xE7\xE3o infantil'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-check' },
                                    React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                        id: 'gridCheck2' }),
                                    React.createElement(
                                        'label',
                                        { className: 'form-check-label',
                                            htmlFor: 'gridCheck2' },
                                        'Ensino m\xE9dio'
                                    )
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
                        { className: 'alert alert-secondary' },
                        React.createElement(
                            'h2',
                            { className: 'text-center' },
                            '\xC1rea de atua\xE7\xE3o 2'
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-icon' },
                            React.createElement('input', { type: 'text', className: 'form-control',
                                placeholder: 'Busque um artigo...' }),
                            React.createElement('i', { className: 'fas fa-search' })
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Atuacoes, null), document.getElementById('atuacoes'));