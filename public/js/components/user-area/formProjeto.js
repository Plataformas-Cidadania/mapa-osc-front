class FormProjeto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                dt_inicio_projeto: '',
                dt_fim_projeto: '',
                cd_uf: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_projeto: true,
                dt_fim_projeto: true,
                cd_uf: true,
                cd_projeto: true
            },
            showMsg: false,
            msg: '',
            projetos: [],
            maxAlert: false,
            cd_projeto: {
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual'
            },
            action: '', //new | edit
            editId: this.props.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log(props);
        let lastEditId = this.state.editId;
        if (this.state.action != props.action || this.state.editId != props.id) {
            this.setState({ action: props.action, editId: props.id }, function () {
                if (lastEditId != props.id) {
                    this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if (this.state.action == 'new') {
                    this.cleanForm();
                }
            });
        }
    }

    edit() {
        $.ajax({
            method: 'GET',
            url: '/edit-user-projeto/' + this.state.editId,
            data: {},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ form: data }, function () {
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({ form: form });
    }

    cleanForm() {
        let form = this.state.form;
        for (let i in form) {
            form[i] = '';
        }
        this.setState({ form: form });
    }

    validate() {
        console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        for (let index in requireds) {
            if (!form[index] || form[index] == '') {
                requireds[index] = false;
                valid = false;
            } else {
                requireds[index] = true;
            }
        }

        //console.log(requireds);

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        let url = '/register-projeto';
        let id = null;
        if (this.state.action === 'edit') {
            id = this.state.editId;
            url = '/update-user-projeto';
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: url,
                //url: '/register-projeto',
                data: {
                    form: this.state.form,
                    id: id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    if (data.max) {
                        let msg = data.msg;
                        this.setState({ loading: false, button: true, maxAlert: true, btnContinue: true, projetos: data.projetos });
                        return;
                    }

                    let button = true;
                    if (this.state.action === 'new') {
                        if (data.projetos.length >= data.maxProjetos) {
                            button = false;
                        }
                    }

                    let btnContinue = false;

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({ projetos: data.projetos, loading: false, button: button, btnContinue: btnContinue });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, button: true });
                }.bind(this)
            });
        });
    }

    getAge(dateString) {

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            age--;
        }

        console.log(age);

        return age;
    }

    render() {

        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-12' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'nome' },
                                'Nome*'
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'select',
                                { className: "form-control form-m " + (this.state.requireds.cd_projeto ? '' : 'invalid-field'),
                                    name: 'tipo', onChange: this.handleInputChange, value: this.state.form.cd_projeto },
                                React.createElement(
                                    'option',
                                    { value: '0' },
                                    'Selecione'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '1' },
                                    'Utilidade P\xFAblica Municipal'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '2' },
                                    'Utilidade P\xFAblica Estadual'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'tipo' },
                                'Localidade*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control " + (this.state.requireds.cd_uf ? '' : 'invalid-field'),
                                type: 'text', name: 'nome', onChange: this.handleInputChange,
                                value: this.state.form.cd_uf, placeholder: '' }),
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
                                'label',
                                { htmlFor: 'cep' },
                                'Data in\xEDcio da validade*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control " + (this.state.requireds.dt_inicio_projeto ? '' : 'invalid-field'),
                                type: 'date', name: 'cep', onChange: this.handleInputChange,
                                value: this.state.form.dt_inicio_projeto, placeholder: '' }),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'label',
                                { htmlFor: 'cep' },
                                'Data fim da validade*'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', { className: "form-control " + (this.state.requireds.dt_fim_projeto ? '' : 'invalid-field'),
                                type: 'date', name: 'cep', onChange: this.handleInputChange,
                                value: this.state.form.dt_fim_projeto, placeholder: '' }),
                            React.createElement('br', null)
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'i',
                            null,
                            '* campos obrigat\xF3rios'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement(
                                'button',
                                { style: { display: this.state.action === 'edit' ? 'block' : this.state.projetos.length < maxProjetos ? 'block' : 'none' },
                                    className: 'btn btn-success', onClick: this.register },
                                'Adicionar'
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-danger' },
                        this.state.msg
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.loading ? 'block' : 'none' } },
                        React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                        'Processando'
                    ),
                    React.createElement(
                        'div',
                        { style: { display: this.state.maxAlert ? 'block' : 'none' }, className: ' alert alert-danger' },
                        'M\xE1ximo de Certificatos Cadastrados'
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            )
        );
    }

}