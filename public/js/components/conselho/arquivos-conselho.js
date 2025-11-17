class ArquivosConselho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      documentos: [],
      conselhoId: null,
      conselho: null,
      showUploadForm: false,
      uploadForm: {
        titulo: '',
        arquivo: null
      }
    };
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.saveDocumento = this.saveDocumento.bind(this);
    this.deleteDocumento = this.deleteDocumento.bind(this);
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const conselhoId = urlParams.get('conselho');
    if (conselhoId) {
      this.setState({
        conselhoId
      });
      this.loadConselho(conselhoId);
      this.loadDocumentos(conselhoId);
    } else {
      this.setState({
        loading: false
      });
    }
  }
  loadConselho(conselhoId) {
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'confocos/conselho/' + conselhoId,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          conselho: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar conselho:', err);
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
          loading: false,
          documentos: data || []
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Erro ao carregar documentos:', err);
        this.setState({
          loading: false
        });
      }.bind(this)
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
    formData.append("id_conselho", this.state.conselhoId);
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
        this.setState({
          showUploadForm: false,
          uploadForm: {
            titulo: '',
            arquivo: null
          }
        }, () => {
          this.loadDocumentos(this.state.conselhoId);
          alert('Documento enviado com sucesso!');
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        alert('Erro ao enviar documento');
      }.bind(this)
    });
  }
  deleteDocumento(documentoId) {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      $.ajax({
        method: 'DELETE',
        url: getBaseUrl2 + 'confocos/documento-conselho/' + documentoId,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@App:token')
        },
        success: function () {
          this.loadDocumentos(this.state.conselhoId);
          alert('Documento excluído com sucesso!');
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(status, err.toString());
          alert('Erro ao excluir documento');
        }.bind(this)
      });
    }
  }
  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, "Carregando...");
    }
    if (!this.state.conselhoId) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container-fluid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bg-white text-center py-5"
      }, /*#__PURE__*/React.createElement("span", {
        className: "fas fa-exclamation-triangle fa-3x text-warning mb-3"
      }), /*#__PURE__*/React.createElement("h5", null, "Conselho n\xE3o especificado"), /*#__PURE__*/React.createElement("p", {
        className: "text-muted"
      }, "Acesse esta p\xE1gina atrav\xE9s do dashboard de conselhos")));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white border-bottom py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-users"
    }), " Arquivos do Conselho"), /*#__PURE__*/React.createElement("p", null, "Nessa \xE1rea voc\xEA pode gerenciar seus arquivos"), this.state.conselho && /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, this.state.conselho.tx_nome_conselho)), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => this.setState({
        showUploadForm: !this.state.showUploadForm
      })
    }, this.state.showUploadForm ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-times"
    }), " Cancelar") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-plus"
    }), " Novo Documento")))), this.state.showUploadForm && /*#__PURE__*/React.createElement("div", {
      className: "bg-light border-bottom p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "T\xEDtulo do Documento"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: this.state.uploadForm.titulo,
      onChange: e => this.handleUploadChange('titulo', e.target.value),
      placeholder: "Digite o t\xEDtulo do documento"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Arquivo"), /*#__PURE__*/React.createElement("input", {
      type: "file",
      className: "form-control-file",
      onChange: e => this.handleUploadChange('arquivo', e.target.files[0]),
      accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "\xA0"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-success btn-block",
      onClick: this.saveDocumento
    }, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-upload"
    }), " Enviar"))))), /*#__PURE__*/React.createElement("div", {
      className: "bg-white"
    }, this.state.documentos.length === 0 ? /*#__PURE__*/React.createElement("div", {
      key: "empty-state",
      className: "text-center py-5"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-file-alt fa-3x text-muted mb-3"
    }), /*#__PURE__*/React.createElement("h5", {
      className: "text-muted"
    }, "Nenhum documento encontrado"), /*#__PURE__*/React.createElement("p", {
      className: "text-muted"
    }, "Clique no bot\xE3o \"Novo Documento\" para come\xE7ar")) : /*#__PURE__*/React.createElement("div", {
      key: "documents-table",
      className: "table-responsive"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-striped"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "T\xEDtulo"), /*#__PURE__*/React.createElement("th", null, "Tipo"), /*#__PURE__*/React.createElement("th", null, "Data"), /*#__PURE__*/React.createElement("th", {
      width: "100"
    }, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, this.state.documentos.map((doc, index) => /*#__PURE__*/React.createElement("tr", {
      key: `documento-${doc.id_documento_conselho}-${index}`
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-file-alt text-primary mr-2"
    }), doc.tx_titulo_documento), /*#__PURE__*/React.createElement("td", null, doc.tx_tipo_arquivo), /*#__PURE__*/React.createElement("td", null, new Date(doc.dt_data_cadastro).toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-danger",
      onClick: () => this.deleteDocumento(doc.id_documento_conselho),
      title: "Excluir documento"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fas fa-trash-alt"
    }))))))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(ArquivosConselho, null), document.getElementById('arquivos-conselho'));