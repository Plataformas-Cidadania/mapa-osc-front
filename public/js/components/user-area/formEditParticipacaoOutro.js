class FormEditParticipacaoOutro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tx_nome_participacao_social_outra: ''
      },
      button: true,
      btnContinue: false,
      loading: false,
      requireds: {
        tx_nome_participacao_social_outra: true
      },
      showMsg: false,
      msg: '',
      participacoes: [],
      editId: this.props.id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.editOutro = this.editOutro.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.setState({
      editId: this.props.id
    }, function () {
      this.editOutro();
    });
  }
  componentWillReceiveProps(props) {
    if (this.state.editId !== props.id) {
      this.setState({
        editId: props.id
      }, function () {
        this.editOutro();
      });
    }
  }
  editOutro() {
    console.log('6: ', this.state.editId);
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/ps_outra/' + this.state.editId,
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
        url: getBaseUrl2 + 'osc/ps_outra/' + this.state.editId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          tx_nome_participacao_social_outra: this.state.form.tx_nome_participacao_social_outra,
          ft_participacao_social_outra: 'Representante de OSC',
          bo_oficial: 0,
          //id_osc: 611720,
          id_osc: this.props.id_osc,
          id: this.state.editId
        },
        cache: false,
        success: function (data) {
          this.props.list();
          this.setState({
            participacoes: data.participacoes,
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
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_nome_participacao_social_outra",
      onChange: this.handleInputChange,
      defaultValue: this.state.form.tx_nome_participacao_social_outra,
      placeholder: "Se houver, insira o link que"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_nome_participacao_social_outra-4273"
    }, "Nome da Confer\xEAncia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
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
    }, "M\xE1ximo de Participacaoz Cadastrados")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)));
  }
}