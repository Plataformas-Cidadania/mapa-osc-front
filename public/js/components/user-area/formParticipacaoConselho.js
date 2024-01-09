class FormParticipacaoConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tx_nome_conselho: 0,
        //tx_nome_tipo_participacao: 0,
        //tx_nome_representante_conselho: '',
        tx_periodicidade_reuniao: 0,
        dt_data_inicio_conselho: '',
        dt_data_fim_conselho: ''
      },
      button: true,
      btnContinue: false,
      loading: false,
      requireds: {
        tx_nome_conselho: true,
        //tx_nome_tipo_participacao: true,
        //tx_nome_representante_conselho: true,
        tx_periodicidade_reuniao: true,
        dt_data_inicio_conselho: true,
        dt_data_fim_conselho: true
      },
      showMsg: false,
      msg: '',
      participacoes: [],
      tx_nome_conselho2: {
        1: 'Residencial',
        2: 'Comercial'
      },
      tx_nome_tipo_participacao2: {
        1: 'Titular',
        2: 'Suplente',
        3: 'Comercial'
      },
      tx_periodicidade_reuniao2: {
        1: 'Semanal',
        2: 'Mensal',
        3: 'Trimestral',
        4: 'Semestral',
        5: 'Anual',
        6: 'Outra'
      },
      action: '',
      //new | edit
      editId: this.props.id,
      listConselhos: [],
      //listTipo: [],
      listReuniao: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.edit = this.edit.bind(this);
    this.validate = this.validate.bind(this);
    this.cleanFormConselho = this.cleanFormConselho.bind(this);
  }
  componentDidMount() {
    this.listConselho();
    this.listReuniao();
  }
  componentWillReceiveProps() {
    this.cleanFormConselho();
  }
  edit() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/ps_conselho/' + this.state.editId,
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
  cleanFormConselho() {
    let form = {
      tx_nome_conselho: 0,
      tx_periodicidade_reuniao: 0,
      dt_data_inicio_conselho: '',
      dt_data_fim_conselho: ''
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
    this.setState({
      loading: true,
      button: false,
      showMsg: false,
      msg: ''
    }, function () {
      $.ajax({
        method: 'POST',
        url: getBaseUrl2 + 'osc/ps_conselho',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          cd_conselho: this.state.form.tx_nome_conselho,
          //cd_tipo_participacao: this.state.form.tx_nome_tipo_participacao,
          //tx_nome_representante_conselho: this.state.form.tx_nome_representante_conselho,
          cd_periodicidade_reuniao_conselho: this.state.form.tx_periodicidade_reuniao,
          dt_data_inicio_conselho: this.state.form.dt_data_inicio_conselho,
          dt_data_fim_conselho: this.state.form.dt_data_fim_conselho,
          bo_oficial: 0,
          //id_osc: 611720,
          id_osc: this.props.id_osc
        },
        cache: false,
        success: function (data) {
          this.props.list();
          this.cleanFormConselho();
          this.props.showHideFormConselho();
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
  listConselho() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'ps_conselhos',
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          listConselhos: data,
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
  listReuniao() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'ps_conselhos_periodicidade',
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          listReuniao: data,
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
    let listConselhos = this.state.listConselhos.map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        value: item.cd_conselho,
        key: 'listConselhos' + index
      }, item.tx_nome_conselho);
    }.bind(this));
    let listReuniao = this.state.listReuniao.map(function (item, index) {
      return /*#__PURE__*/React.createElement("option", {
        value: item.cd_periodicidade_reuniao_conselho,
        key: 'listReuniao' + index
      }, item.tx_nome_periodicidade_reuniao_conselho);
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control ",
      name: "tx_nome_conselho",
      onChange: this.handleInputChange,
      value: this.state.form.tx_nome_conselho
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Selecione"), listConselhos), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("select", {
      className: "form-control ",
      name: "tx_periodicidade_reuniao",
      onChange: this.handleInputChange,
      value: this.state.form.tx_periodicidade_reuniao
    }, /*#__PURE__*/React.createElement("option", {
      value: "0"
    }, "Selecione"), listReuniao), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "date",
      name: "dt_data_inicio_conselho",
      onChange: this.handleInputChange,
      value: this.state.form.dt_data_inicio_conselho,
      placeholder: "Se houver, insira o link que"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_inicio_conselho"
    }, "Data de in\xEDcio de vig\xEAncia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "date",
      name: "dt_data_fim_conselho",
      onChange: this.handleInputChange,
      value: this.state.form.dt_data_fim_conselho,
      placeholder: "Se houver, insira o link que"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dt_data_fim_conselho"
    }, "Data de fim de vig\xEAncia"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("button", {
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
    }), "Processando")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)));
  }
}