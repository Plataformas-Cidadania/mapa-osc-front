class Conselhos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conselhos: [],
      showModal: false,
      showDocumentosModal: false,
      showUploadModal: false,
      selectedConselhoId: null,
      editingConselho: null,
      uploadForm: {
        titulo: '',
        arquivo: null
      },
      form: {
        tx_nome_conselho: '',
        tx_ato_legal: '',
        tx_website: '',
        bo_conselho_ativo: true,
        cd_nivel_federativo: '',
        cd_tipo_abrangencia: ''
      },
      nivelFederativo: [],
      tipoAbrangencia: [],
      selectedEstado: '',
      municipios: [],
      documentos: {}
    };
    this.setDocumento = this.setDocumento.bind(this);
    this.saveDocumento = this.saveDocumento.bind(this);
    this.loadDocumentos = this.loadDocumentos.bind(this);
    this.deleteDocumento = this.deleteDocumento.bind(this);
    this.openDocumentosModal = this.openDocumentosModal.bind(this);
    this.closeDocumentosModal = this.closeDocumentosModal.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
  }
  componentDidMount() {
    this.loadConselhos();
    this.loadNivelFederativo();
  }
  loadNivelFederativo() {
    this.setState({
      nivelFederativo: [{
        "cd_nivel_federativo": 1,
        "tx_nome_nivel_federativo": "Nacional"
      }, {
        "cd_nivel_federativo": 2,
        "tx_nome_nivel_federativo": "Estadual"
      }, {
        "cd_nivel_federativo": 3,
        "tx_nome_nivel_federativo": "Municipal"
      }]
    });
  }
  loadGeographicData(nivelFederativo) {
    if (nivelFederativo == 1) {
      this.setState({
        tipoAbrangencia: [{
          cd_tipo_abrangencia: 'BR',
          tx_nome_abrangencia: 'Brasil'
        }]
      });
    } else if (nivelFederativo == 2) {
      this.loadEstados();
    } else if (nivelFederativo == 3) {
      this.loadEstados();
    }
  }
  loadEstados() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'geo/estados',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        const estados = Object.values(data).map(estado => ({
          cd_tipo_abrangencia: estado.id_regiao,
          tx_nome_abrangencia: estado.tx_nome_regiao
        }));
        this.setState({
          tipoAbrangencia: estados
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar estados:', err);
      }.bind(this)
    });
  }
  loadMunicipios(estadoId) {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'geo/municipios/estado/' + estadoId,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        const municipios = (data || []).map(municipio => ({
          cd_tipo_abrangencia: municipio.id_regiao,
          tx_nome_abrangencia: municipio.tx_nome_regiao
        }));
        this.setState({
          municipios
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar municípios:', err);
      }.bind(this)
    });
  }
  openModal(conselho = null) {
    if (conselho) {
      this.setState({
        showModal: true,
        editingConselho: conselho,
        form: {
          tx_nome_conselho: conselho.tx_nome_conselho || '',
          tx_ato_legal: conselho.tx_ato_legal || '',
          tx_website: conselho.tx_website || '',
          bo_conselho_ativo: conselho.bo_conselho_ativo || true,
          cd_nivel_federativo: conselho.cd_nivel_federativo || '',
          cd_tipo_abrangencia: conselho.cd_tipo_abrangencia || ''
        }
      });
    } else {
      this.setState({
        showModal: true,
        editingConselho: null,
        form: {
          tx_nome_conselho: '',
          tx_ato_legal: '',
          tx_website: '',
          bo_conselho_ativo: true,
          cd_nivel_federativo: '',
          cd_tipo_abrangencia: ''
        }
      });
    }
  }
  closeModal() {
    this.setState({
      showModal: false,
      editingConselho: null,
      form: {
        tx_nome_conselho: '',
        tx_ato_legal: '',
        tx_website: '',
        bo_conselho_ativo: true,
        cd_nivel_federativo: '',
        cd_tipo_abrangencia: ''
      }
    });
  }
  handleInputChange(field, value) {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
    if (field === 'cd_nivel_federativo') {
      this.loadGeographicData(value);
      this.setState({
        form: {
          ...this.state.form,
          [field]: value,
          cd_tipo_abrangencia: ''
        },
        selectedEstado: '',
        municipios: []
      });
    } else if (field === 'selectedEstado' && this.state.form.cd_nivel_federativo == 3) {
      this.loadMunicipios(value);
      this.setState({
        selectedEstado: value,
        form: {
          ...this.state.form,
          cd_tipo_abrangencia: ''
        }
      });
    }
  }
  saveConselho() {
    const url = this.state.editingConselho ? getBaseUrl2 + 'confocos/conselho/' + this.state.editingConselho.id_conselho : getBaseUrl2 + 'confocos/conselho';
    const method = this.state.editingConselho ? 'PUT' : 'POST';
    $.ajax({
      method: method,
      url: url,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.state.form),
      success: function () {
        this.closeModal();
        this.loadConselhos();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao salvar conselho:', err);
        alert('Erro ao salvar conselho');
      }.bind(this)
    });
  }
  loadConselhos() {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          loading: false,
          conselhos: data || []
        });
        if (data && data.length > 0) {
          data.forEach(conselho => {
            this.loadDocumentos(conselho.id_conselho);
          });
        }
        console.log('conselho:::::::::', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({
          loading: false
        });
      }.bind(this)
    });
  }
  deleteConselho(id) {
    if (confirm('Tem certeza que deseja excluir este conselho?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/conselho/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadConselhos();
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          alert('Erro ao excluir conselho');
        }
      });
    }
  }
  setDocumento(conselhoId) {
    this.openUploadModal(conselhoId);
  }
  openUploadModal(conselhoId) {
    this.setState({
      showUploadModal: true,
      selectedConselhoId: conselhoId,
      uploadForm: {
        titulo: '',
        arquivo: null
      }
    });
  }
  closeUploadModal() {
    this.setState({
      showUploadModal: false,
      selectedConselhoId: null,
      uploadForm: {
        titulo: '',
        arquivo: null
      }
    });
  }
  handleUploadChange(field, value) {
    this.setState({
      uploadForm: {
        ...this.state.uploadForm,
        [field]: value
      }
    });
  }
  saveDocumento() {
    if (!this.state.uploadForm.arquivo || !this.state.uploadForm.titulo) {
      alert('Por favor, selecione um arquivo e digite um título.');
      return;
    }
    let formData = new FormData();
    formData.append("documento", this.state.uploadForm.arquivo);
    formData.append("id_conselho", this.state.selectedConselhoId);
    formData.append("tx_titulo_documento", this.state.uploadForm.titulo);
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'confocos/documento-conselho',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: function (data) {
        this.loadDocumentos(this.state.selectedConselhoId);
        this.closeUploadModal();
        alert('Documento enviado com sucesso!');
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        alert('Erro ao enviar documento');
      }.bind(this)
    });
  }
  loadDocumentos(conselhoId) {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/documento-por-conselho/' + conselhoId,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          documentos: {
            ...this.state.documentos,
            [conselhoId]: data || []
          }
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar documentos:', err);
      }.bind(this)
    });
  }
  deleteDocumento(documentoId, conselhoId) {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/documento-conselho/' + documentoId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadDocumentos(conselhoId);
          alert('Documento excluído com sucesso!');
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          alert('Erro ao excluir documento');
        }.bind(this)
      });
    }
  }
  openDocumentosModal(conselhoId) {
    this.setState({
      showDocumentosModal: true,
      selectedConselhoId: conselhoId
    });
  }
  closeDocumentosModal() {
    this.setState({
      showDocumentosModal: false,
      selectedConselhoId: null
    });
  }
  renderModal() {
    return /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, this.state.editingConselho ? 'Editar Conselho' : 'Novo Conselho'), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: () => this.closeModal()
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Nome do Conselho"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_nome_conselho,
      onChange: e => this.handleInputChange('tx_nome_conselho', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Ato Legal"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_ato_legal,
      onChange: e => this.handleInputChange('tx_ato_legal', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Website"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.form.tx_website,
      onChange: e => this.handleInputChange('tx_website', e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "N\xEDvel Federativo"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_nivel_federativo,
      onChange: e => this.handleInputChange('cd_nivel_federativo', e.target.value ? parseInt(e.target.value) : '')
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.nivelFederativo.map(nivel => /*#__PURE__*/React.createElement("option", {
      key: nivel.cd_nivel_federativo,
      value: nivel.cd_nivel_federativo
    }, nivel.tx_nome_nivel_federativo)))), this.state.form.cd_nivel_federativo == 1 && /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Pa\xEDs"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_tipo_abrangencia,
      onChange: e => this.handleInputChange('cd_tipo_abrangencia', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.tipoAbrangencia.map(tipo => /*#__PURE__*/React.createElement("option", {
      key: tipo.cd_tipo_abrangencia,
      value: tipo.cd_tipo_abrangencia
    }, tipo.tx_nome_abrangencia)))), this.state.form.cd_nivel_federativo == 2 && /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Estado"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_tipo_abrangencia,
      onChange: e => this.handleInputChange('cd_tipo_abrangencia', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.tipoAbrangencia.map(tipo => /*#__PURE__*/React.createElement("option", {
      key: tipo.cd_tipo_abrangencia,
      value: tipo.cd_tipo_abrangencia
    }, tipo.tx_nome_abrangencia)))), this.state.form.cd_nivel_federativo == 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Estado"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.selectedEstado,
      onChange: e => this.handleInputChange('selectedEstado', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.tipoAbrangencia.map(estado => /*#__PURE__*/React.createElement("option", {
      key: estado.cd_tipo_abrangencia,
      value: estado.cd_tipo_abrangencia
    }, estado.tx_nome_abrangencia)))), this.state.selectedEstado && /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Munic\xEDpio"), /*#__PURE__*/React.createElement("select", {
      className: "form-control",
      value: this.state.form.cd_tipo_abrangencia,
      onChange: e => this.handleInputChange('cd_tipo_abrangencia', e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione..."), this.state.municipios.map(municipio => /*#__PURE__*/React.createElement("option", {
      key: municipio.cd_tipo_abrangencia,
      value: municipio.cd_tipo_abrangencia
    }, municipio.tx_nome_abrangencia))))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: this.state.form.bo_conselho_ativo,
      onChange: e => this.handleInputChange('bo_conselho_ativo', e.target.checked)
    }), ' ', "Conselho Ativo"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => this.closeModal()
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: () => this.saveConselho()
    }, "Salvar")))));
  }
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, "Carregando...");
    }
    if (this.state.conselhos.length === 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container-fluid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bg-white border-bottom py-3 px-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "mb-0"
      }, "Conselhos"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary",
        onClick: () => this.openModal()
      }, "Novo Conselho"))), /*#__PURE__*/React.createElement("div", {
        className: "bg-white p-4 text-center py-5"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-users fa-3x text-muted mb-3"
      }), /*#__PURE__*/React.createElement("h5", {
        className: "text-muted"
      }, "Nenhum conselho encontrado"), /*#__PURE__*/React.createElement("p", {
        className: "text-muted"
      }, "Clique no bot\xE3o \"Novo Conselho\" para come\xE7ar")), this.state.showModal && this.renderModal());
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("h2", null, "Meus conselhos"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => this.openModal()
    }, "Novo Conselho"))), /*#__PURE__*/React.createElement("div", {
      className: "bg-white p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-striped"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nome"), /*#__PURE__*/React.createElement("th", null, "Ato Legal"), /*#__PURE__*/React.createElement("th", null, "Website"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.conselhos.map(conselho => /*#__PURE__*/React.createElement("tr", {
      key: conselho.id_conselho
    }, /*#__PURE__*/React.createElement("td", null, conselho.id_conselho), /*#__PURE__*/React.createElement("td", null, conselho.tx_nome_conselho || 'N/A'), /*#__PURE__*/React.createElement("td", null, conselho.tx_ato_legal || 'N/A'), /*#__PURE__*/React.createElement("td", null, conselho.tx_website ? /*#__PURE__*/React.createElement("a", {
      href: `http://${conselho.tx_website}`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, conselho.tx_website) : 'N/A'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${conselho.bo_conselho_ativo ? 'badge-success' : 'badge-secondary'}`
    }, conselho.bo_conselho_ativo ? 'Ativo' : 'Inativo')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap gap-1"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-primary",
      onClick: () => this.openModal(conselho),
      title: "Editar conselho"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-edit"
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-success",
      onClick: () => this.setDocumento(conselho.id_conselho),
      title: "Enviar documento"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-cloud-upload-alt"
    })), this.state.documentos[conselho.id_conselho] && this.state.documentos[conselho.id_conselho].length > 0 && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-info position-relative",
      onClick: () => this.openDocumentosModal(conselho.id_conselho),
      title: `${this.state.documentos[conselho.id_conselho].length} documento(s)`
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-folder-open"
    }), /*#__PURE__*/React.createElement("span", {
      className: "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
    }, this.state.documentos[conselho.id_conselho].length)))))))))), this.state.showModal && this.renderModal(), this.state.showDocumentosModal && this.renderDocumentosModal(), this.state.showUploadModal && this.renderUploadModal());
  }
  renderDocumentosModal() {
    const documentos = this.state.documentos[this.state.selectedConselhoId] || [];
    return /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-folder-open mr-2"
    }), "Documentos do Conselho"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: this.closeDocumentosModal
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, documentos.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "text-center py-4"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-file-alt fa-3x text-muted mb-3"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-muted"
    }, "Nenhum documento encontrado")) : /*#__PURE__*/React.createElement("div", {
      className: "list-group"
    }, documentos.map(doc => /*#__PURE__*/React.createElement("div", {
      key: doc.id_documento_conselho,
      className: "list-group-item d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-file-alt text-primary mr-3"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h6", {
      className: "mb-1"
    }, doc.tx_titulo_documento), /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, "Tipo: ", doc.tx_tipo_arquivo, " | Data: ", new Date(doc.dt_data_cadastro).toLocaleDateString()))), /*#__PURE__*/React.createElement("div", {
      className: "btn-group"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-danger",
      onClick: () => this.deleteDocumento(doc.id_documento_conselho, this.state.selectedConselhoId),
      title: "Excluir documento"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-trash-alt"
    }))))))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: this.closeDocumentosModal
    }, "Fechar")))));
  }
  renderUploadModal() {
    return /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-cloud-upload-alt mr-2"
    }), "Enviar Documento"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: this.closeUploadModal
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "T\xEDtulo do Documento"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.uploadForm.titulo,
      onChange: e => this.handleUploadChange('titulo', e.target.value),
      placeholder: "Digite o t\xEDtulo do documento"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Arquivo"), /*#__PURE__*/React.createElement("input", {
      type: "file",
      className: "form-control-file",
      onChange: e => this.handleUploadChange('arquivo', e.target.files[0]),
      accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: this.closeUploadModal
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-success",
      onClick: this.saveDocumento
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-upload mr-1"
    }), "Enviar")))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Conselhos, null), document.getElementById('conselhos'));