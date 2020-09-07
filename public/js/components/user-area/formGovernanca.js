class FormGovernanca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: '',
                cep: '',
                endereco: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                obs: ''
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                nome: true,
                cep: true,
                endereco: true,
                numero: true,
                bairro: true,
                cidade: true,
                estado: true,
                tipo: true,
                principal: true
            },
            showMsg: false,
            msg: '',
            governancas: [],
            maxAlert: false,
            tipo: {
                1: 'Residencial',
                2: 'Comercial'
            },
            principal: {
                1: 'Residencial',
                2: 'Comercial'
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
            url: '/edit-user-governanca/' + this.state.editId,
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

        let url = '/register-governanca';
        let id = null;
        if (this.state.action === 'edit') {
            id = this.state.editId;
            url = '/update-user-governanca';
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: url,
                data: {
                    form: this.state.form,
                    id: id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    if (data.max) {
                        let msg = data.msg;
                        this.setState({ loading: false, button: true, maxAlert: true, btnContinue: true, governancas: data.governancas });
                        return;
                    }

                    /*let button = true;
                    if(data.governancas.length >= data.maxGovernancas){
                        button = false;
                    }*/

                    let button = true;
                    if (this.state.action === 'new') {
                        if (data.governancas.length >= data.maxGovernancas) {
                            button = false;
                        }
                    }

                    let btnContinue = false;
                    /*if(data.governancas.length > 0){
                        btnContinue = true;
                    }*/

                    this.props.list();

                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({ governancas: data.governancas, loading: false, button: button, btnContinue: btnContinue });
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
                    React.createElement('input', { className: "form-control " + (this.state.requireds.nome ? '' : 'invalid-field'),
                        type: 'text', name: 'nome', onChange: this.handleInputChange,
                        value: this.state.form.nome, placeholder: 'Nome' }),
                    React.createElement('br', null),
                    React.createElement('input', { className: "form-control " + (this.state.requireds.cep ? '' : 'invalid-field'),
                        type: 'text', name: 'cep', onChange: this.handleInputChange,
                        value: this.state.form.cep, placeholder: 'Cargo do dirigente' }),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { style: { display: this.state.action === 'edit' ? 'block' : this.state.governancas.length < maxGovernancas ? 'block' : 'none' },
                            className: 'btn btn-success', onClick: this.register },
                        'Cadastrar'
                    ),
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
                        'M\xE1ximo de Governancaz Cadastrados'
                    )
                )
            )
        );
    }

}