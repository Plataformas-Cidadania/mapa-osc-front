class Projetos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      projetos: [],
      cd_projeto: {
        1: 'Utilidade Pública Municipal',
        2: 'Utilidade Pública Estadual'
      },
      showForm: false,
      actionForm: '',
      remove: [],
      loadingRemove: [],
      projeto: {},
      editId: 0,
      editTipo: ''
    };
    this.list = this.list.bind(this);
    this.showHideForm = this.showHideForm.bind(this);
    this.remove = this.remove.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.modal = this.modal.bind(this);
    this.callModalExcluir = this.callModalExcluir.bind(this);
    this.callModal = this.callModal.bind(this);
  }
  componentDidMount() {
    this.list();
  }
  removeItem(id) {
    $.ajax({
      method: 'DELETE',
      url: getBaseUrl2 + 'osc/projeto/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: {},
      cache: false,
      success: function (data) {
        this.list();
        $('#modalFormExcluir').modal('hide');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  callModalExcluir(id, title) {
    let modalExcluir = this.state.modalExcluir;
    this.setState({
      modalExcluir: modalExcluir,
      removeItemConferencia: id,
      removeItemTx: title
    }, function () {
      $('#modalFormExcluir').modal('show');
    });
  }
  modalExcluir() {
    return /*#__PURE__*/React.createElement("div", {
      id: "modalFormExcluir",
      className: "modal fade bd-example-modal-sm",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, /*#__PURE__*/React.createElement("strong", null, "Excluir permanentemente")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, "Tem certeza que quer excluir \"", /*#__PURE__*/React.createElement("strong", null, this.state.removeItemTx), "\"? Todas as informa\xE7\xF5es cadastradas ser\xE3o perdidas."), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-danger",
      onClick: () => this.removeItem(this.state.removeItemConferencia, this.state.removeTipo)
    }, "Excluir")))));
  }

  /*edit(id, type){
      this.setState({actionForm: 'edit', editId: id, editTipo:type,}, function(){
          this.callModal();
      });
  }*/

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
      url: 'remove-user-projeto/' + id,
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
      method: 'GET',
      //url: getBaseUrl2 + 'osc/projetos/455128',
      url: getBaseUrl2 + 'osc/projetos/' + this.props.id,
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          projetos: data,
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
  callModal(id, type, txt) {
    let modal = this.state.modal;
    this.setState({
      modal: modal,
      editId: id,
      editTipo: type,
      modalTitle: txt
    }, function () {
      $('#modalForm').modal('show');
    });
  }
  modal() {
    let form = '';
    if (this.state.editTipo == 'insert') {
      form = /*#__PURE__*/React.createElement(FormProjeto, {
        action: this.state.actionForm,
        list: this.list,
        id: this.state.editId,
        id_osc: this.props.id,
        showHideForm: this.showHideForm,
        closeForm: this.closeForm
      });
    }
    if (this.state.editTipo == 'edit') {
      form = /*#__PURE__*/React.createElement(FormEditProjeto, {
        action: this.state.actionForm,
        list: this.list,
        id: this.state.editId,
        id_osc: this.props.id,
        showHideForm: this.showHideForm,
        closeForm: this.closeForm
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      id: "modalForm",
      className: "modal fade bd-example-modal-lg",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, /*#__PURE__*/React.createElement("strong", null, this.state.modalTitle)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, form))));
  }
  render() {
    let modal = this.modal();
    let modalExcluir = this.modalExcluir();
    let projetos = this.state.projetos.map(function (item, index) {
      return /*#__PURE__*/React.createElement("tr", {
        key: "projeto_" + index
      }, /*#__PURE__*/React.createElement("td", null, item.titulo), /*#__PURE__*/React.createElement("td", null, formatDate(item.data_inicio, 'pt-br')), /*#__PURE__*/React.createElement("td", {
        width: "70"
      }, /*#__PURE__*/React.createElement("a", {
        onClick: () => this.callModal(item.id, 'edit', 'Alterar projeto'),
        className: "cursor"
      }, /*#__PURE__*/React.createElement("i", {
        className: "far fa-edit text-primary"
      })), "\xA0\xA0", /*#__PURE__*/React.createElement("a", {
        onClick: () => this.callModalExcluir(item.id, item.titulo),
        style: {
          cursor: 'pointer',
          position: 'relative',
          top: '4px'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "far fa-trash-alt text-danger float-right"
      }))));
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-project-diagram",
      "aria-hidden": "true"
    })), " ", /*#__PURE__*/React.createElement("h3", null, "Projetos"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Voc\xEA tem ", this.state.projetos.length, " projetos cadastrados"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
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
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "bg-pri text-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Titulo / Projeto"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "In\xEDcio da validade"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }))), /*#__PURE__*/React.createElement("tbody", null, projetos)), /*#__PURE__*/React.createElement("div", {
      style: {
        float: 'right',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => this.callModal(0, 'insert', 'Inserir projeto'),
      className: "btn btn-warning"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-plus"
    }), " Adicionar novo projeto"))), modal, modalExcluir));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Projetos, {
  id: id
}), document.getElementById('projetos'));