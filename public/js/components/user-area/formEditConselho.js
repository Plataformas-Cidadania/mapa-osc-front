class FormEditConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tx_nome_conselheiro: ''
      },
      button: true,
      btnContinue: false,
      loading: false,
      requireds: {
        tx_nome_conselheiro: true
      },
      showMsg: false,
      msg: '',
      conselhos: [],
      editId: this.props.id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.edit = this.edit.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    console.log('1', this.props.id);
    this.setState({
      editId: this.props.id
    }, function () {
      this.edit();
    });
  }
  componentWillReceiveProps(props) {
    console.log('2', this.props.id);
    if (this.state.editId !== props.id) {
      this.setState({
        editId: props.id
      }, function () {
        this.edit();
      });
    }
  }
  edit() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/conselho/' + this.state.editId,
      data: {},
      cache: false,
      success: function (data) {
        console.log(data);
        this.setState({
          form: data
        }, function () {
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
    this.setState({
      form: form
    });
  }
  validate() {
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
    this.setState({
      requireds: requireds
    });
    return valid;
  }
  register(e) {
    e.preventDefault();
    if (!this.validate()) {
      return;
    }
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: 'PUT',
        url: getBaseUrl2 + 'osc/conselho/' + this.state.editId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          tx_nome_conselheiro: this.state.form.tx_nome_conselheiro,
          bo_oficial: 0,
          //id_osc: 455128,
          id_osc: this.props.id_osc,
          id: this.state.editId
        },
        cache: false,
        success: function (data) {
          this.props.list();
          this.setState({
            conselhos: data.conselhos,
            loading: false
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          this.setState({
            loading: false,
            button: true
          });
        }.bind(this)
      });
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
      className: "form-control " + (this.state.requireds.tx_nome_conselheiro ? '' : 'invalid-field'),
      type: "text",
      name: "tx_nome_conselheiro",
      onChange: this.handleInputChange,
      value: this.state.form.tx_nome_conselheiro,
      placeholder: "Nome"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-success",
      onClick: this.register
    }, "Cadastrar"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: "alert alert-danger"
    }, this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), "Processando"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.maxAlert ? 'block' : 'none'
      },
      className: " alert alert-danger"
    }, "M\xE1ximo de Conselhoz Cadastrados"))));
  }
}