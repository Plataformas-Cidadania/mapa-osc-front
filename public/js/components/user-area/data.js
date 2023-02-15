class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tx_email_usuario: '',
        tx_nome_usuario: '',
        nr_cpf_usuario: ''
      },
      button: true,
      loading: false,
      requireds: {
        tx_email_usuario: true,
        tx_nome_usuario: true,
        nr_cpf_usuario: true
      },
      showMsg: false,
      msg: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
    this.validate = this.validate.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    this.setState({
      loadingCep: true,
      button: false
    });
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'get-user-auth',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
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
        this.setState({
          loadingCep: false
        });
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
    //console.log(this.state.form);
    let valid = true;
    let requireds = this.state.requireds;
    let form = this.state.form;

    /*for(let index in requireds){
        if(!form[index] || form[index]==''){
            requireds[index] = false;
            valid = false;
        }else{
            requireds[index] = true;
        }
    }*/

    /*for(let index in requireds){
        if(!form[index] || form[index]==''){
            requireds[index] = false;
            if((index==="cnpj" ) && !this.state.juridica){
                requireds[index] = true;
            }else{
                valid = false;
            }
        }else{
            requireds[index] = true;
        }
    }*/

    //console.log(requireds);

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
        url: getBaseUrl2 + 'user/' + this.state.form.id_usuario,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        data: {
          tx_nome_usuario: this.state.form.tx_nome_usuario,
          tx_email_usuario: this.state.form.tx_email_usuario,
          nr_cpf_usuario: this.state.form.nr_cpf_usuario
        },
        cache: false,
        success: function (data) {
          let msg = 'Já existe outro cadastro com esse';
          if (data.cpf || data.email) {
            if (data.cpf) {
              msg += ' cpf';
            }
            if (data.email) {
              msg += ' email';
            }
            this.setState({
              msg: msg,
              showMsg: true,
              loading: false,
              button: true
            });
            return;
          }
          msg = 'Dados alterados com sucesso!';
          this.setState({
            msg: msg,
            showMsg: true,
            loading: false,
            button: true,
            color: 'success'
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          this.setState({
            loading: false,
            msg: 'Ocorreu um erro!',
            showMsg: true,
            button: true,
            color: 'danger'
          });
        }.bind(this)
      });
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-user",
      "aria-hidden": "true"
    }), " Meus Dados"), /*#__PURE__*/React.createElement("p", null, "Procure manter seu e-mail sempre atualizado. Assim, voc\xEA garante o recebimento dos comunicados, avisos e demais informa\xE7\xF5es por parte da equipe do Mapa das OSC."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Seu nome e sobrenome*"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g " + (this.state.requireds.tx_nome_usuario ? '' : 'invalid-field'),
      type: "text",
      name: "tx_nome_usuario",
      onChange: this.handleInputChange,
      value: this.state.form.tx_nome_usuario,
      placeholder: "Nome"
    }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "E-mail*"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      className: "form-control form-g " + (this.state.requireds.tx_email_usuario ? '' : 'invalid-field'),
      type: "text",
      name: "tx_email_usuario",
      onChange: this.handleInputChange,
      value: this.state.form.tx_email_usuario,
      placeholder: "E-mail"
    }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "cpf"
    }, "CPF*"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      className: "form-control form-m " + (this.state.requireds.nr_cpf_usuario ? '' : 'invalid-field'),
      type: "text",
      name: "nr_cpf_usuario",
      onChange: this.handleInputChange,
      value: this.state.form.nr_cpf_usuario,
      placeholder: "Cpf"
    }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "clear-float"
    }), /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        display: this.state.button ? 'block' : 'none'
      },
      className: "btn btn-success",
      onClick: this.register
    }, "Salvar"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showMsg ? 'block' : 'none'
      },
      className: 'text-' + this.state.color
    }, this.state.msg), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loading ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-spin fa-spinner"
    }), "Processando"))))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Data, {
  id: id
}), document.getElementById('data'));