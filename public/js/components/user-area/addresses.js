class Addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      addresses: [],
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
      address: {},
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
    this.setState({
      actionForm: 'edit',
      showForm: false,
      editId: id
    });
  }
  cancelRemove(id) {
    let remove = this.state.remove;
    remove[id] = false;
    this.setState({
      remove: remove
    });
  }
  remove(id) {
    let remove = this.state.remove;
    if (!remove[id]) {
      remove[id] = true;
      this.setState({
        remove: remove
      });
      return;
    }
    let loadingRemove = this.state.loadingRemove;
    loadingRemove[id] = true;
    this.setState({
      loadingRemove: loadingRemove
    });
    $.ajax({
      method: 'GET',
      url: 'remove-user-address/' + id,
      data: {},
      cache: false,
      success: function (data) {
        //console.log(data);
        this.list();
        let loadingRemove = this.state.loadingRemove;
        loadingRemove[id] = false;
        this.setState({
          loadingRemove: loadingRemove
        });
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
    this.setState({
      showForm: showForm,
      actionForm: actionForm
    });
  }
  closeForm() {
    this.setState({
      showForm: false
    });
  }
  list() {
    this.setState({
      loadingList: true
    });
    $.ajax({
      method: 'POST',
      url: 'list-users-addresses',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: {},
      cache: false,
      success: function (data) {
        console.log(data);
        this.setState({
          addresses: data,
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
    //console.log(this.state.showForm);
    //console.log('state.remove', this.state.remove);

    let addresses = this.state.addresses.map(function (item, index) {
      let hr = null;
      if (index < this.state.addresses.length - 1) {
        hr = /*#__PURE__*/React.createElement("hr", null);
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "col-md-6",
        key: "address_" + item.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "panel panel-default"
      }, /*#__PURE__*/React.createElement("div", {
        className: "panel-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-md-offset-9 col-md-1"
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.edit(item.id)
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-pencil fa-2x"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "col-md-1"
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.remove(item.id),
        style: {
          display: this.state.loadingRemove[item.id] ? 'none' : 'block'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa  fa-2x " + (this.state.remove[item.id] ? "fa-times text-danger" : "fa-trash")
      })), /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: () => this.cancelRemove(item.id),
        style: {
          display: this.state.remove[item.id] && !this.state.loadingRemove[item.id] ? 'block' : 'none'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa  fa-2x fa-undo"
      })), /*#__PURE__*/React.createElement("i", {
        className: "fa fa-spin fa-spinner",
        style: {
          display: this.state.loadingRemove[item.id] ? '' : 'none'
        }
      }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, item.nome), /*#__PURE__*/React.createElement("p", null, item.endereco, ", ", item.numero, ", ", item.complemento), /*#__PURE__*/React.createElement("p", null, item.bairro), /*#__PURE__*/React.createElement("p", null, item.cep), /*#__PURE__*/React.createElement("p", null, item.cidade, " - ", item.estado), /*#__PURE__*/React.createElement("p", null, this.state.tipo[item.tipo])), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/React.createElement("strong", null, "OBS: "), item.obs)), /*#__PURE__*/React.createElement("div", {
        className: "row text-right"
      }, /*#__PURE__*/React.createElement("h6", null, this.state.principal[item.principal], " \xA0  ")))));
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("div", {
      style: {
        float: 'left'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-map-marker",
      "aria-hidden": "true"
    }), " Endere\xE7os cadastrados"), /*#__PURE__*/React.createElement("div", {
      style: {
        float: 'right',
        display: this.state.addresses.length < maxAddresses ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.showHideForm
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-plus",
      style: {
        display: this.state.showForm ? "none" : "block"
      }
    })), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.showHideForm
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times",
      style: {
        display: this.state.showForm ? "block" : "none"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        clear: 'both'
      }
    })), /*#__PURE__*/React.createElement("p", null, "Voc\xEA tem ", this.state.addresses.length, " endere\xE7os cadastrados"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.showForm ? 'block' : 'none'
      }
    }, /*#__PURE__*/React.createElement(FormAddress, {
      action: this.state.actionForm,
      list: this.list,
      id: this.state.editId,
      showHideForm: this.showHideForm,
      closeForm: this.closeForm
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.loadingList ? 'true' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        marginTop: '80px'
      },
      src: "/img/loading.gif",
      width: '150px',
      alt: "carregando",
      title: "carregando"
    })), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, addresses));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Addresses, null), document.getElementById('addresses'));