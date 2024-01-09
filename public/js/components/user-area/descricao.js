class Descricao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tx_historico: '',
        tx_missao_osc: '',
        tx_visao_osc: '',
        tx_finalidades_estatutarias: '',
        tx_link_estatuto_osc: ''
      },
      requireds: {
        tx_historico: true,
        tx_missao_osc: true,
        tx_visao_osc: true,
        tx_finalidades_estatutarias: true,
        tx_link_estatuto_osc: true
      },
      placeholder: {
        tx_historico: 'De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada',
        tx_missao_osc: 'Se houver, apresente qual a missão da OSC',
        tx_visao_osc: 'Se houver, apresente a visão e valores da OSC',
        tx_finalidades_estatutarias: 'Apresente as finalidades estatutárias da OSC. Se preferir, copie do estatuto da OSC',
        tx_link_estatuto_osc: 'Se houver, insira o link que leva ao estatuto da OSC. Ex.: http://www.nomesite.com/link-completo.pdf'
      },
      loading: false,
      button: true,
      showMsg: false,
      updateOk: false,
      msg: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateDescricao = this.updateDescricao.bind(this);
    this.validate = this.validate.bind(this);
    this.getDescricao = this.getDescricao.bind(this);
  }
  componentDidMount() {
    this.getDescricao();
  }
  getDescricao() {
    this.setState({
      button: false
    });
    $.ajax({
      method: 'GET',
      //url: getBaseUrl2 + 'osc/descricao/455128',
      url: getBaseUrl2 + 'osc/descricao/' + this.props.id,
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          form: data,
          button: true
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let form = this.state.form;
    let placeholder = this.state.placeholder;
    form[name] = value;
    this.setState({
      form: form,
      placeholder: placeholder
    });
  }
  validate() {
    let valid = true;
    let requireds = this.state.requireds;
    let form = this.state.form;
    this.setState({
      requireds: requireds
    });
    return valid;
  }
  updateDescricao(e) {
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
        //url: getBaseUrl2 + 'osc/descricao/455128',
        url: getBaseUrl2 + 'osc/descricao/' + this.props.id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: this.state.form,
        cache: false,
        success: function (data) {
          let msg = "Dados alterados com sucesso!";
          this.setState({
            loading: false,
            msg: msg,
            showMsg: true,
            updateOk: true,
            button: true
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          let msg = "Ocorreu um erro!";
          this.setState({
            loading: false,
            msg: msg,
            showMsg: true,
            updateOk: false,
            button: true
          });
        }.bind(this)
      });
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-align-justify",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("h3", null, "Descri\xE7\xE3o da OSC"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label-float-tx"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "form-control form-g",
      name: "tx_historico",
      onChange: this.handleInputChange,
      value: this.state.form.tx_historico,
      rows: "3",
      placeholder: this.state.placeholder.tx_historico
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_historico"
    }, "Hist\xF3rico"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-tx-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("div", {
      className: "label-float-tx"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "form-control form-g",
      name: "tx_missao_osc",
      onChange: this.handleInputChange,
      value: this.state.form.tx_missao_osc,
      rows: "3",
      placeholder: this.state.placeholder.tx_missao_osc
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_missao_osc"
    }, "Miss\xE3o"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-tx-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("div", {
      className: "label-float-tx"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "form-control form-g",
      name: "tx_visao_osc",
      onChange: this.handleInputChange,
      value: this.state.form.tx_visao_osc,
      rows: "3",
      placeholder: this.state.placeholder.tx_visao_osc
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_visao_osc"
    }, "Vis\xE3o e valores"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-tx-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("div", {
      className: "label-float-tx"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "form-control form-g",
      name: "tx_finalidades_estatutarias",
      onChange: this.handleInputChange,
      value: this.state.form.tx_finalidades_estatutarias,
      rows: "3",
      placeholder: this.state.placeholder.tx_finalidades_estatutarias
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_finalidades_estatutarias"
    }, "Finalidades estatut\xE1rias da OSC"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-tx-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))), /*#__PURE__*/React.createElement("div", {
      className: "label-float"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g ",
      type: "text",
      name: "tx_link_estatuto_osc",
      onChange: this.handleInputChange,
      value: this.state.form.tx_link_estatuto_osc,
      placeholder: this.state.placeholder.tx_link_estatuto_osc
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "tx_link_estatuto_osc"
    }, "Link para o estatuto da OSC"), /*#__PURE__*/React.createElement("div", {
      className: "label-box-info-off"
    }, /*#__PURE__*/React.createElement("p", null, "\xA0"))))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '-10px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), " Processando ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: 'alert alert-' + (this.state.updateOk ? "success" : "danger")
    }, /*#__PURE__*/React.createElement("i", {
      className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle")
    }), this.state.msg), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-success",
      onClick: this.updateDescricao
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-cloud-download-alt"
    }), " Salvar "), /*#__PURE__*/React.createElement("br", null))))), /*#__PURE__*/React.createElement("div", {
      className: "space"
    })))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Descricao, {
  id: id
}), document.getElementById('descricao'));