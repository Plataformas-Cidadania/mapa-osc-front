class Certificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      certificates: [],
      cd_certificado: {
        1: 'Utilidade Pública Municipal',
        2: 'Utilidade Pública Estadual'
      },
      showForm: false,
      actionForm: '',
      remove: [],
      loadingRemove: [],
      certificate: {},
      editId: 0,
      modal: {},
      modalTitle: 'Inserir título ou certificação',
      removeItemCertificado: null,
      removeItemTx: '',
      removeTipo: '',
      editTipo: null,
      uf: {
        12: 'AC',
        27: 'AL',
        16: 'AP',
        13: 'AM',
        29: 'BA',
        23: 'CE',
        53: 'DF',
        32: 'ES',
        52: 'GO',
        21: 'MA',
        51: 'MT',
        50: 'MS',
        31: 'MG',
        15: 'PA',
        25: 'PB',
        41: 'PR',
        26: 'PE',
        22: 'PI',
        24: 'RN',
        43: 'RS',
        33: 'RJ',
        11: 'RO',
        14: 'RR',
        42: 'SC',
        35: 'SP',
        28: 'SE',
        17: 'TO'
      }
    };
    this.list = this.list.bind(this);
    this.showHideForm = this.showHideForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.modal = this.modal.bind(this);
    this.callModal = this.callModal.bind(this);
    //this.edit = this.edit.bind(this);
    this.callModalExcluir = this.callModalExcluir.bind(this);
  }
  componentDidMount() {
    this.list();
  }
  cancelRemove(id) {
    let remove = this.state.remove;
    remove[id] = false;
    this.setState({
      remove: remove
    });
  }
  removeItem(id) {
    $.ajax({
      method: 'DELETE',
      url: getBaseUrl2 + 'osc/certificado/' + id,
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
  showHideForm(action) {
    let showForm = !this.state.showForm;
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
      //url: getBaseUrl2 + 'osc/certificados/455128',
      url: getBaseUrl2 + 'osc/certificados/' + this.props.id,
      data: {},
      cache: false,
      success: function (data) {
        this.setState({
          certificates: data,
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
      modalTitle: txt + ' título ou certificação'
    }, function () {
      $('#modalForm').modal('show');
    });
  }
  callModalExcluir(id, tx_nome_conferencia, tipo) {
    let modalExcluir = this.state.modalExcluir;
    this.setState({
      modalExcluir: modalExcluir,
      removeItemCertificado: id,
      removeItemTx: tx_nome_conferencia,
      removeTipo: tipo
    }, function () {
      $('#modalFormExcluir').modal('show');
    });
  }
  modal() {
    let form = null;
    if (this.state.editTipo == 'insert') {
      form = /*#__PURE__*/React.createElement(FormCertificate, {
        id_osc: this.props.id //id da osc
        ,
        action: this.state.actionForm,
        list: this.list,
        showHideForm: this.showHideForm,
        closeForm: this.closeForm
      });
    }
    if (this.state.editTipo == 'edit') {
      form = /*#__PURE__*/React.createElement(FormEditCertificate, {
        action: this.state.actionForm,
        list: this.list,
        id_osc: this.props.id //id da osc
        ,
        id: this.state.editId,
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
    }, "Tem certeza que quer excluir \"", this.state.removeItemTx, "\"."), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-danger",
      onClick: () => this.removeItem(this.state.removeItemCertificado, this.state.removeTipo)
    }, "Excluir")))));
  }
  render() {
    let modalExcluir = this.modalExcluir();
    let modal = this.modal();
    let certificates = null;
    if (this.state.certificates.Resposta != 'Nenhum Certificado foi encontrado para essa OSC!') {
      certificates = this.state.certificates.map(function (item, index) {
        let municipio = '';
        if (item?.municipio != null) {
          municipio = item.municipio.edmu_nm_municipio + ' - ' + this.state.uf[item.municipio.eduf_cd_uf];
        }
        let estado = '';
        if (item?.uf != null) {
          estado = item.uf?.eduf_sg_uf;
        }
        return /*#__PURE__*/React.createElement("tr", {
          key: "certificate_" + index
        }, /*#__PURE__*/React.createElement("td", null, item.ft_inicio_certificado === 'Representante de OSC' || item.ft_inicio_certificado == null ? null : /*#__PURE__*/React.createElement("i", {
          className: "fas fa-database tx-pri"
        }), " ", item.dc_certificado.tx_nome_certificado, " -", item.ft_inicio_certificado, "-"), /*#__PURE__*/React.createElement("td", null, formatDate(item.dt_inicio_certificado, 'pt-br')), /*#__PURE__*/React.createElement("td", null, formatDate(item.dt_fim_certificado, 'pt-br')), /*#__PURE__*/React.createElement("td", null, item.cd_certificado === 8 ? municipio : estado), /*#__PURE__*/React.createElement("td", {
          width: "70"
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: item.cd_certificado == 7 || item.cd_certificado == 8 ? '' : 'none'
          }
        }, /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModal(item.id_certificado, 'edit', 'Alterar')
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-edit text-primary cursor"
        })), "\xA0\xA0", /*#__PURE__*/React.createElement("a", {
          onClick: () => this.callModalExcluir(item.id_certificado, item.dc_certificado.tx_nome_certificado, 'certificado'),
          style: {
            cursor: 'pointer',
            top: '4px',
            position: 'relative'
          }
        }, /*#__PURE__*/React.createElement("i", {
          className: "far fa-trash-alt text-danger float-right"
        })))));
      }.bind(this));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mn-accordion-icon"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-certificate",
      "aria-hidden": "true"
    })), " ", /*#__PURE__*/React.createElement("h3", null, "T\xEDtulos e certifica\xE7\xF5es"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Voc\xEA tem ", this.state.certificates.length, " t\xEDtulos ou certificados cadastrados"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
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
    }, "Titulo / Certificado"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "In\xEDcio da validade"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Fim da validade"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Localidade"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }))), /*#__PURE__*/React.createElement("tbody", null, certificates)), /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/img/load.gif",
      alt: "",
      width: "60",
      className: "login-img",
      style: {
        display: this.state.loadingList ? '' : 'none'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        float: 'right',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => this.callModal(0, 'insert', 'Inserir'),
      className: "btn btn-warning"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-plus"
    }), " Adicionar novo t\xEDtulo")))), modal, modalExcluir);
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Certificates, {
  id: id
}), document.getElementById('certificates'));