class FormParticipacaoConferencia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        cd_conferencia: '',
        dt_ano_realizacao: '',
        cd_forma_participacao_conferencia: ''
      },
      button: true,
      btnContinue: false,
      loading: false,
      requireds: {
        cd_conferencia: true,
        dt_ano_realizacao: true,
        cd_forma_participacao_conferencia: true
      },
      showMsg: false,
      msg: '',
      conferencias: [],
      maxAlert: false,
      tipo: {
        1: 'Residencial',
        2: 'Comercial'
      },
      principal: {
        1: 'Residencial',
        2: 'Comercial'
      },
      action: '',
      //new | edit
      editId: this.props.id,
      listConferencia: [],
      listForma: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.edit = this.edit.bind(this);
    this.validate = this.validate.bind(this);
    this.cleanFormConferencia = this.cleanFormConferencia.bind(this);
  }
  componentDidMount() {
    this.listConferencia();
    this.listForma();
  }
  componentWillReceiveProps(props) {
    let lastEditId = this.state.editId;
    if (this.state.action != props.action || this.state.editId != props.id) {
      this.setState({
        action: props.action,
        editId: props.id
      }, function () {
        if (lastEditId != props.id) {
          //this.props.showHideForm(this.state.action);
          this.edit();
        }
        if (this.state.action == 'new') {
          this.cleanFormConferencia();
        }
      });
    }
  }
  edit() {
    $.ajax({
      method: 'GET',
      url: '/edit-user-conferencia/' + this.state.editId,
      data: {},
      cache: false,
      success: function (data) {
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
  cleanFormConferencia() {
    let form = {
      cd_conferencia: 0,
      dt_ano_realizacao: 0,
      cd_forma_participacao_conferencia: 0
    };
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
    let url = 'osc/ps_conferencia';
    let id = null;
    let method = 'POST';
    if (this.state.action === 'edit') {
      id = this.state.editId;
      url = 'osc/ps_conferencia/' + id;
      method = 'PUT';
    }
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: method,
        url: getBaseUrl2 + url,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          cd_conferencia: this.state.form.cd_conferencia,
          dt_ano_realizacao: this.state.form.dt_ano_realizacao,
          cd_forma_participacao_conferencia: this.state.form.cd_forma_participacao_conferencia,
          ft_conferencia: 'Representante de OSC',
          ft_ano_realizacao: 'Representante de OSC',
          ft_forma_participacao_conferencia: 'Representante de OSC',
          bo_oficial: 0,
          //id_osc: 611720,
          id_osc: this.props.id_osc,
          id: id
        },
        cache: false,
        success: function (data) {
          this.props.list();
          this.cleanFormConferencia();
          this.props.showHideFormConferencia();
          this.setState({
            conferencias: data.conferencias,
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
  listConferencia() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/conferencia',
      url: getBaseUrl2 + 'ps_conferencias',
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          listConferencia: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  listForma() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl + 'menu/osc/forma_participacao_conferencia',
      url: getBaseUrl2 + 'ps_conferencias_formas',
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          listForma: data,
          loadingList: false
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingList: false
        });
      }.bind(this)
    });
  }
  render() {
    let anosLista = getOptions().map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        value: item + '-01-01',
        key: 'anosLista' + index
      }, item);
    }.bind(this));
    let listConferencia = this.state.listConferencia.map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        value: item.cd_conferencia,
        key: 'listReuniao' + index
      }, item.tx_nome_conferencia);
    }.bind(this));
    let listForma = this.state.listForma.map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        value: item.cd_forma_participacao_conferencia,
        key: 'listReuniao' + index
      }, item.tx_nome_forma_participacao_conferencia);
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control ",
      name: "cd_conferencia",
      onChange: this.handleInputChange,
      value: this.state.form.cd_conferencia
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Selecione"), listConferencia), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control ",
      name: "dt_ano_realizacao",
      onChange: this.handleInputChange,
      value: this.state.form.dt_ano_realizacao
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Selecione"), anosLista), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control ",
      name: "cd_forma_participacao_conferencia",
      onChange: this.handleInputChange,
      value: this.state.form.cd_forma_participacao_conferencia
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Selecione"), listForma), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-success",
      onClick: this.register
    }, "Salvar"), /*#__PURE__*/React.createElement("div", {
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
    }, "M\xE1ximo de Conferenciaz Cadastrados")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)));
  }
}