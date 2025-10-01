class Oscs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: false,
      loadingSearch: false,
      search: '',
      oscs: [],
      oscsModal: [],
      oscsSearch: [],
      editId: 0,
      idOscRemove: 0,
      termos: [],
      // lista completa de termos
      termoAtual: null,
      // termo que precisa ser assinado
      signedOscs: [],
      // OSCs assinadas para o termoAtual
      loadingSignId: null,
      listRemove: [],
      // assinaturas já existentes
      showModal: false,
      showModalAdd: false,
      // modal de adicionar OSC
      osc_id: null,
      representacaoId: null
    };
    this.list = this.list.bind(this);
    this.getAssinaturasTermos = this.getAssinaturasTermos.bind(this);
    this.loadProximoTermo = this.loadProximoTermo.bind(this);
    this.getModal = this.getModal.bind(this);
    this.signTerm = this.signTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.listSearch = this.listSearch.bind(this);
    this.addOsc = this.addOsc.bind(this);
    this.askRemove = this.askRemove.bind(this);
    this.removeOsc = this.removeOsc.bind(this);
    this.cancelRemove = this.cancelRemove.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  async componentDidMount() {
    await this.getAssinaturasTermos();
    await this.list();
    await this.loadProximoTermo();
    this.getModal();
  }
  getAssinaturasTermos() {
    const token = localStorage.getItem('@App:token');
    return new Promise(resolve => {
      $.ajax({
        method: 'GET',
        url: `${getBaseUrl2}osc/assinatura-termos`,
        headers: {
          Authorization: 'Bearer ' + token
        },
        cache: false,
        success: data => this.setState({
          listRemove: data
        }, resolve),
        error: (xhr, status, err) => {
          console.error(err);
          resolve();
        }
      });
    });
  }
  loadProximoTermo2() {
    const token = localStorage.getItem('@App:token');
    fetch(`${getBaseUrl2}osc/termos`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      if (!res.ok) throw new Error('Erro ao buscar termos');
      return res.json();
    }).then(data => {
      // --- 1) pega todos os termos e o último cadastrado
      const termos = Array.isArray(data) ? data : [data];
      if (!termos.length) {
        this.setState({
          termos,
          termoAtual: null,
          showModal: false
        });
        return;
      }
      const ultimo = termos[termos.length - 1];

      // --- 2) filtra somente as assinaturas desse termo
      const assinaturasDoTermo = this.state.listRemove.filter(sig => sig.id_termo === ultimo.id_termo);

      // --- 3) extrai os id_representacao já assinados
      const repsAssinadas = assinaturasDoTermo.map(sig => sig.representacao.id_representacao);

      // --- 4) monta a lista de OSCs que ainda faltam assinar
      const pendentes = this.state.oscs.filter(osc => !repsAssinadas.includes(osc.id_representacao));

      // --- 5) só abre o modal se ainda existir alguma pendente
      this.setState({
        termos,
        termoAtual: pendentes.length ? ultimo : null,
        showModal: pendentes.length > 0
      });
    }).catch(err => console.error(err));
  }
  loadProximoTermo() {
    const token = localStorage.getItem('@App:token');
    fetch(`${getBaseUrl2}osc/termos`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      if (!res.ok) throw new Error('Erro ao buscar termos');
      return res.json();
    }).then(data => {
      const termos = Array.isArray(data) ? data : [data];
      if (!termos.length) {
        return this.setState({
          termos,
          termoAtual: null,
          oscsModal: [],
          showModal: false
        });
      }

      // Pega o último termo
      const ultimo = termos[termos.length - 1];

      // Quais assinaturas já existem para ele?
      const assinaturasDoTermo = this.state.listRemove.filter(sig => sig.id_termo === ultimo.id_termo);
      const repsAssinadas = assinaturasDoTermo.map(sig => sig.representacao.id_representacao);

      // Filtra só as OSCs que AINDA NÃO assinaram
      const oscsModal = this.state.oscs.filter(osc => !repsAssinadas.includes(osc.id_representacao));

      // Atualiza o state com o modal apenas se houver pendentes
      this.setState({
        termos,
        termoAtual: oscsModal.length ? ultimo : null,
        oscsModal,
        showModal: oscsModal.length > 0
      });
    }).catch(err => console.error(err));
  }
  getModal() {
    fetch(`${getBaseUrl2}osc/termos`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      }
    }).then(res => {
      if (!res.ok) throw new Error('Erro ao buscar termo');
      return res.json();
    }).then(data => {
      const lastTermo = Array.isArray(data) && data.length ? data[data.length - 1] : data;
      this.setState({
        termo: lastTermo,
        showModalAdd: true
      });
    }).catch(err => console.error(err));
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
      const resOs = await fetch(getBaseUrl2 + 'osc/list-oscs-usuario', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const oscs = await resOs.json();
      if (!Array.isArray(oscs) || !oscs.length) {
        return this.setState({
          loadingList: false,
          oscs: []
        });
      }
      const resUser = await fetch(getBaseUrl2 + 'get-user-auth', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const user = await resUser.json();
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
      const signedReps = this.state.listRemove.filter(sig => this.state.termoAtual && sig.id_termo === this.state.termoAtual.id_termo).map(sig => sig.representacao.id_representacao);
      const oscsModal = oscsComRep.filter(osc => !signedReps.includes(osc.id_representacao));
      this.setState({
        oscs: oscsComRep,
        oscsModal,
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
  signTerm(idOsc, representacaoId) {
    this.setState({
      loadingSignId: idOsc
    });
    const token = localStorage.getItem('@App:token');
    const termoId = this.state.termoAtual.id_termo;
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'osc/assinatura-termos',
      data: {
        id_osc: idOsc,
        id_representacao: representacaoId,
        id_termo: termoId
      },
      headers: {
        Authorization: 'Bearer ' + token
      },
      success: () => {
        const signed = [...this.state.signedOscs, idOsc];
        const allSigned = signed.length === this.state.oscsModal.length;
        if (!allSigned) {
          this.setState({
            signedOscs: signed,
            loadingSignId: null
          });
        } else {
          this.setState({
            loadingSignId: null,
            signedOscs: []
          }, async () => {
            await this.getAssinaturasTermos();
            await this.loadProximoTermo();
            this.list();
          });
        }
      },
      error: (xhr, status, err) => {
        console.error(err);
        this.setState({
          loadingSignId: null
        });
      }
    });
  }
  handleSearch(e) {
    const val = e.target.value || ' ';
    this.setState({
      search: val
    }, () => this.listSearch(this.state.search));
  }
  clickSearch() {
    this.listSearch(this.state.search || ' ');
  }
  listSearch(search) {
    if (search.length < 4) return;
    this.setState({
      loadingSearch: true,
      oscsSearch: []
    });
    let term = search.replace('/', '').normalize('NFD').replace(/[̀-ͯ]/g, '');
    term = term.startsWith('0') ? term.slice(1) : term;
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'busca/osc/' + term,
      cache: false,
      success: data => this.setState({
        oscsSearch: data,
        loadingSearch: false
      }),
      error: (xhr, status, err) => this.setState({
        loadingSearch: false
      })
    });
  }
  addOsc(id_osc) {
    $.ajax({
      method: 'POST',
      url: getBaseUrl2 + 'osc/representacao',
      data: {
        id_osc
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@App:token')
      },
      success: () => {
        this.setState({
          search: ''
        });
        this.list();
      },
      error: () => this.setState({
        loadingSearch: false
      })
    });
  }
  askRemove(id_osc) {
    this.setState({
      idOscRemove: id_osc
    });
  }
  cancelRemove() {
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
      success: () => this.list(),
      error: () => this.setState({
        loadingSearch: false
      })
    });
  }
  render() {
    const {
      termoAtual,
      showModal,
      oscsModal,
      loadingSignId,
      signedOscs,
      oscs,
      search,
      oscsSearch,
      loadingSearch,
      idOscRemove
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "title-user-area"
    }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-list-alt"
    }), " Minhas OSCs"), /*#__PURE__*/React.createElement("p", null, "Nessa \xE1rea voc\xEA pode gerenciar sua OSC ou v\xE1rias"), /*#__PURE__*/React.createElement("a", {
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
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nome da OSC"), /*#__PURE__*/React.createElement("th", {
      className: "text-center"
    }, "A\xE7\xF5es"))), /*#__PURE__*/React.createElement("tbody", null, oscs.map((item, index) => /*#__PURE__*/React.createElement("tr", {
      key: item.id_osc
    }, /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, index + 1), /*#__PURE__*/React.createElement("td", null, item.tx_razao_social_osc), /*#__PURE__*/React.createElement("td", {
      className: "text-right",
      width: "500"
    }, /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary"
    }, /*#__PURE__*/React.createElement("a", {
      href: `selo-osc-user/${item.id_osc}`
    }, " Certificado")), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary"
    }, /*#__PURE__*/React.createElement("a", {
      href: `declaracao/${item.id_osc}`,
      target: "_blank"
    }, " ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-certificate"
    }), " Declara\xE7\xE3o")), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn btn-outline-primary"
    }, /*#__PURE__*/React.createElement("a", {
      href: `detalhar/${item.id_osc}/${item.tx_razao_social_osc}`
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-binoculars"
    }), " Visualizar")), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn btn-success"
    }, /*#__PURE__*/React.createElement("a", {
      href: `osc-user/${item.id_osc}`
    }, /*#__PURE__*/React.createElement("i", {
      className: "far fa-edit"
    }), " Editar")), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn btn-danger",
      style: {
        display: item.id_osc === idOscRemove ? 'none' : ''
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
        display: item.id_osc === idOscRemove ? '' : 'none'
      },
      onClick: () => this.cancelRemove()
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
        display: item.id_osc === idOscRemove ? '' : 'none'
      },
      onClick: () => this.removeOsc(item.id_osc)
    }, /*#__PURE__*/React.createElement("a", {
      style: {
        cursor: 'pointer'
      },
      title: "Remover"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-times"
    })))))))))), /*#__PURE__*/React.createElement("div", {
      className: "modal fade",
      id: "exampleModal",
      tabIndex: "-1",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      id: "exampleModalLabel"
    }, "Adicione uma OSC"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal"
    }, /*#__PURE__*/React.createElement("span", null, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      placeholder: "Digite o CNPJ...",
      onClick: this.clickSearch,
      onChange: this.handleSearch,
      value: search
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", {
      className: "box-search-itens",
      style: {
        display: search ? '' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/img/load.gif",
      width: "60",
      style: {
        display: loadingSearch ? '' : 'none'
      }
    })), oscsSearch.map(item => /*#__PURE__*/React.createElement("li", {
      key: item.id_osc,
      className: "list-group-item",
      onClick: () => this.addOsc(item.id_osc)
    }, item.tx_nome_osc))))))), showModal && termoAtual && /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("h2", null, "Termo ", termoAtual.id_termo), /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: termoAtual.tx_nome
      }
    }), /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "thead-light"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nome da OSC"), /*#__PURE__*/React.createElement("th", {
      className: "text-center"
    }, "A\xE7\xE3o"))), /*#__PURE__*/React.createElement("tbody", null, oscsModal.map(item => {
      const isSigned = signedOscs.includes(item.id_osc);
      const isLoading = loadingSignId === item.id_osc;
      return /*#__PURE__*/React.createElement("tr", {
        key: item.id_osc
      }, /*#__PURE__*/React.createElement("th", null, item.tx_razao_social_osc), /*#__PURE__*/React.createElement("td", {
        className: "text-center"
      }, /*#__PURE__*/React.createElement("button", {
        className: isSigned ? 'open-btn-sus' : 'open-btn',
        onClick: () => this.signTerm(item.id_osc, item.id_representacao),
        disabled: isSigned || isLoading,
        style: {
          marginTop: 0
        }
      }, isSigned ? 'Assinado' : isLoading ? 'Enviando…' : 'Aceitar termo')));
    }))))));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Oscs, null), document.getElementById('oscs'));