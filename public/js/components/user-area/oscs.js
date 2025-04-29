class Oscs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loading: false,
      loadingSearch: false,
      loadingAddOsc: false,
      loadingRemoveOsc: false,
      search: '',
      oscs: [],
      oscsModal: [],
      oscsSearch: [],
      editId: 0,
      idOscRemove: 0,
      signedOscs: [],
      // já existia
      loadingSignId: null,
      // antes era loadingSign: false
      osc_id: null,
      // antes era loadingSign: false
      listRemove: [] // antes era loadingSign: false
    };

    this.list = this.list.bind(this);
    this.getModal = this.getModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.listSearch = this.listSearch.bind(this);
    this.addOsc = this.addOsc.bind(this);
    this.askRemove = this.askRemove.bind(this);
    this.removeOsc = this.removeOsc.bind(this);
    this.cancelRemove = this.cancelRemove.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signTerm = this.signTerm.bind(this);
    this.getAssinatuyrasTermos = this.getAssinatuyrasTermos.bind(this);
  }
  async componentDidMount() {
    await this.getAssinatuyrasTermos();
    this.list();
    this.getModal();
  }
  getModal() {
    fetch(`${getBaseUrl2}osc/termos`).then(res => {
      if (!res.ok) throw new Error('Erro ao buscar termo');
      return res.json();
    }).then(data => {
      const lastTermo = Array.isArray(data) && data.length ? data[data.length - 1] : data;
      this.setState({
        termo: lastTermo,
        showModal: true
      });
    }).catch(err => {
      console.error(err);
      // Aqui você pode tratar o erro (exibir mensagem, etc.)
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }
  async list() {
    this.setState({
      loadingList: true
    });
    const token = localStorage.getItem('@App:token');
    try {
      // 1) Busca todas as OSCs do usuário
      const resOs = await fetch(getBaseUrl2 + 'osc/list-oscs-usuario', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const oscs = await resOs.json();
      if (!Array.isArray(oscs) || oscs.length === 0) {
        return this.setState({
          loadingList: false,
          oscs: []
        });
      }

      // 2) Pega o ID do usuário autenticado
      const resUser = await fetch(getBaseUrl2 + 'get-user-auth', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const user = await resUser.json();

      // 3) Para cada OSC, busca o id_representacao e “cola” no próprio objeto
      const oscsComRep = await Promise.all(oscs.map(async osc => {
        const repRes = await fetch(`${getBaseUrl2}osc/representacao/${osc.id_osc}/${user.id_usuario}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        const repData = await repRes.json();
        return {
          ...osc,
          id_representacao: repData.id_representacao
        };
      }));

      // 4) Seta o state com:
      //    - array completo (já com id_representacao em cada item)
      //    - osc_id = primeiro id_osc
      //    - representacaoId = primeiro id_representacao

      const listRemoveIds = this.state.listRemove.map(item => item.id_representacao);
      const oscsModal = oscsComRep.filter(osc => !listRemoveIds.includes(osc.id_representacao));
      this.setState({
        oscs: oscsComRep,
        oscsModal: oscsModal,
        osc_id: oscsComRep[0].id_osc,
        representacaoId: oscsComRep[0].id_representacao,
        loadingList: false
      });
    } catch (err) {
      console.error(err);
      this.setState({
        loadingList: false
      });
    }
  }
  getAssinatuyrasTermos() {
    $.ajax({
      method: 'get',
      url: getBaseUrl2 + `osc/assinatura-termos`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        this.setState({
          listRemove: data
        });
        console.log('getAssinatuyrasTermos', data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  }
  signTerm(idOsc, representacaoId) {
    this.setState({
      loadingSignId: idOsc
    });

    //console.log('idOsc', idOsc, 'id_termo', this.state.termo.id_termo)

    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'osc/assinatura-termos',
      data: {
        id_osc: idOsc,
        id_representacao: representacaoId,
        // ou troque aqui pelo campo correto, se existir
        id_termo: this.state.termo.id_termo
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      success: function (data) {
        this.setState(prev => {
          const signed = [...prev.signedOscs, idOsc];
          const allSigned = signed.length === prev.oscsModal.length;
          return {
            signedOscs: signed,
            loadingSignId: null,
            showModal: !allSigned
          };
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        this.setState({
          loadingSignId: null
        });
      }.bind(this)
    });
  }
  handleSearch(e) {
    let search = e.target.value ? e.target.value : ' ';
    this.setState({
      search: search
    }, function () {
      this.listSearch(search);
    });
  }
  clickSearch() {
    let search = this.state.search ? this.state.search : ' ';
    this.listSearch(search);
  }
  listSearch(search) {
    if (search.length >= 4) {
      this.setState({
        loadingSearch: true,
        oscsSearch: []
      });
      search = search.replace('/', '');
      search = search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      search = search.substring(0, 1) === '0' ? search.substring(1) : search;
      console.log(search);
      $.ajax({
        method: 'GET',
        //url: getBaseUrl2 + 'search/cnpj/autocomplete/' + search,
        url: getBaseUrl2 + 'busca/osc/' + search,
        cache: false,
        success: function (data) {
          this.setState({
            oscsSearch: data,
            loadingSearch: false
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(status, err.toString());
          this.setState({
            loadingSearch: false
          });
        }.bind(this)
      });
    }
  }
  addOsc(id_osc) {
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'osc/representacao',
      data: {
        id_osc: id_osc
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        //console.log(data);
        this.setState({
          search: ''
        });
        this.list();
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingSearch: false
        });
      }.bind(this)
    });
  }
  askRemove(id_osc) {
    this.setState({
      idOscRemove: id_osc
    });
  }
  cancelRemove(id_osc) {
    this.setState({
      idOscRemove: 0
    });
  }
  removeOsc(id_osc) {
    $.ajax({
      method: 'DELETE',
      url: getBaseUrl2 + 'osc/representacao/' + id_osc,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      cache: false,
      success: function (data) {
        //console.log(data);
        this.list();
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(status, err.toString());
        this.setState({
          loadingSearch: false
        });
      }.bind(this)
    });
  }
  render() {
    const {
      termo,
      showModal,
      oscsModal
    } = this.state;
    let oscs = this.state.oscs.map(function (item, index) {
      let hr = null;
      if (index < this.state.oscs.length - 1) {
        hr = /*#__PURE__*/React.createElement("hr", null);
      }
      return /*#__PURE__*/React.createElement("tr", {
        key: "osc_" + item.id_osc
      }, /*#__PURE__*/React.createElement("th", {
        scope: "row"
      }, index + 1), /*#__PURE__*/React.createElement("td", null, item.tx_razao_social_osc), /*#__PURE__*/React.createElement("td", {
        width: "500",
        className: "text-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn btn-outline-primary"
      }, /*#__PURE__*/React.createElement("a", {
        href: "selo-osc-user/" + item.id_osc
      }, " Certificado")), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-outline-primary"
      }, /*#__PURE__*/React.createElement("a", {
        href: "declaracao/" + item.id_osc,
        target: "_blank"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-certificate"
      }), " Declara\xE7\xE3o")), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-outline-primary"
      }, /*#__PURE__*/React.createElement("a", {
        href: "detalhar/" + item.id_osc + "/" + item.tx_razao_social_osc
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-binoculars"
      }), " Visualizar")), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-success"
      }, /*#__PURE__*/React.createElement("a", {
        href: "osc-user/" + item.id_osc
      }, /*#__PURE__*/React.createElement("i", {
        className: "far fa-edit"
      }), " Editar")), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-danger",
        style: {
          display: item.id_osc === this.state.idOscRemove ? 'none' : ''
        },
        onClick: () => this.askRemove(item.id_osc)
      }, /*#__PURE__*/React.createElement("a", {
        style: {
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-trash"
      }))), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-light",
        style: {
          display: item.id_osc === this.state.idOscRemove ? '' : 'none'
        },
        onClick: () => this.cancelRemove(item.id_osc)
      }, /*#__PURE__*/React.createElement("a", {
        style: {
          cursor: 'pointer'
        },
        title: "Cancelar"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-undo"
      }))), "\xA0", /*#__PURE__*/React.createElement("div", {
        className: "btn btn-danger",
        style: {
          display: item.id_osc === this.state.idOscRemove ? '' : 'none'
        },
        onClick: () => this.removeOsc(item.id_osc)
      }, /*#__PURE__*/React.createElement("a", {
        style: {
          cursor: 'pointer'
        },
        title: "Remover"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-times"
      })))));
    }.bind(this));
    console.log(this.state.listSearch);
    let listSearch = this.state.oscsSearch.map(function (item, index) {
      /*let sizeSearch = this.state.search ? this.state.search.length : 0;
      let firstPiece = null;
      let secondPiece = item.tx_nome_osc;
        if (this.state.search) {
          firstPiece = item.tx_nome_osc.substr(0, sizeSearch);
          secondPiece = item.tx_nome_osc.substr(sizeSearch);
      }*/
      return /*#__PURE__*/React.createElement("li", {
        key: 'cat_' + item.id_osc,
        className: "list-group-item d-flex ",
        onClick: () => this.addOsc(item.id_osc)
      }, item.tx_nome_osc);
    }.bind(this));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-list-alt"
    }), " Minhas OSCs"), /*#__PURE__*/React.createElement("p", null, "Nessa \xE1rea voc\xEA pode gerenciar sua OSC ou varias"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary float-right",
      "data-toggle": "modal",
      "data-target": "#exampleModal",
      style: {
        marginTop: '-80px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-plus"
    }), " Adicionar OSC"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "ID"), /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Nome da OSC"), /*#__PURE__*/React.createElement("th", {
      scope: "col",
      className: "text-center"
    }, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, oscs)))), /*#__PURE__*/React.createElement("div", {
      class: "modal fade",
      id: "exampleModal",
      tabindex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      class: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      class: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      class: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      class: "modal-title",
      id: "exampleModalLabel"
    }, "Adicione uma OSC"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      class: "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      class: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control float-left ",
      placeholder: "Digite o CNPJ e clique na OSC para adicionar.",
      name: "osc",
      autoComplete: "off",
      onClick: this.clickSearch,
      onChange: this.handleSearch,
      defaultValue: this.state.search
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: this.state.search ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-12 text-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/img/load.gif",
      alt: "",
      width: "60",
      className: "login-img",
      style: {
        display: this.state.loadingSearch ? '' : 'none'
      }
    })), listSearch)))))))), /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      style: {
        display: showModal && oscsModal && oscsModal.length > 0 ? 'flex' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("h2", null, "Termo"), /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: termo?.tx_nome
      }
    }), /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      scope: "col"
    }, "Nome da OSC"), /*#__PURE__*/React.createElement("th", {
      scope: "col",
      className: "text-center"
    }, "A\xE7\xE3o"))), this.state.oscsModal.map(item => {
      const oscId = item.id_osc;
      const isSigned = this.state.signedOscs.includes(oscId);
      const isLoading = this.state.loadingSignId === oscId;
      return /*#__PURE__*/React.createElement("tr", {
        key: oscId
      }, /*#__PURE__*/React.createElement("th", {
        scope: "row"
      }, item.tx_razao_social_osc), /*#__PURE__*/React.createElement("td", {
        className: "text-center"
      }, /*#__PURE__*/React.createElement("button", {
        className: ` ${isSigned ? 'open-btn-sus' : 'open-btn'}`,
        onClick: () => this.signTerm(oscId, item.id_representacao),
        disabled: isSigned || isLoading,
        style: {
          marginTop: 0
        }
      }, isSigned ? 'Assinado' : isLoading ? 'Enviando…' : 'Aceitar termo')));
    })))));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Oscs, null), document.getElementById('oscs'));