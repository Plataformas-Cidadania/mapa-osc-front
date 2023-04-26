const Item = props => {
  const {
    useState,
    useEffect
  } = React;
  const [formato, setFormato] = useState([]);
  const [modal, setModal] = useState({
    id: 0,
    nome: '111',
    resumo: '222'
  });
  const propsData = props.propsData;
  let icon = {
    1: 'far fa-file-pdf',
    2: 'far fa-file-word',
    3: 'far fa-file-image',
    4: 'far fa-file-video',
    5: 'fas fa-link'
  };

  //console.log('***props: ', propsData);
  useEffect(() => {
    Formato();
  }, []);

  /*useEffect(() => {
   }, [modal]);*/

  const Formato = async () => {
    try {
      const result = await axios.get('/api/formatorecurso/', {});
      setFormato(result.data.data);

      // Não se esqueça de usar var!
    } catch (error) {
      console.log(error);
    }
  };
  const callModal = (id, nome, resumo) => {
    setModal({
      id: id,
      nome: nome,
      resumo: resumo
    });
    let modal = '#exampleModal_' + id + '_' + props.grupo;
    $(modal).modal('show');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, propsData.map((item, key) => {
    //console.log('--------', item);

    function isCherries(fruit) {
      return fruit.id_formato === item.id_formato;
    }
    let nomeFormato = formato.find(isCherries);

    //console.log('***link: ', item.links[0].uri);
    return /*#__PURE__*/React.createElement("div", {
      className: "col-lg-4 col-md-6 col-sm-12 col-xs-12",
      key: "modal" + key
    }, /*#__PURE__*/React.createElement("div", {
      className: "dorder-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-lgt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-2 box-list-title"
    }, /*#__PURE__*/React.createElement("p", {
      className: "mt-2"
    }, /*#__PURE__*/React.createElement("strong", null, item.nome))), /*#__PURE__*/React.createElement("div", {
      className: "clear-both"
    })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-4"
    }, /*#__PURE__*/React.createElement("img", {
      src: "img/lines.png",
      alt: "",
      width: "80%",
      height: "30"
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-2"
    }, "\xA0")), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12 box-list-p"
    }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Esfera: "), /*#__PURE__*/React.createElement("span", null, item.esfera)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Idioma: "), item.links[0] !== undefined ? /*#__PURE__*/React.createElement("a", {
      href: "",
      target: "_blank",
      title: item.links[0].idioma,
      key: "linksIdoma" + key
    }, item.links[0].idioma) : null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Tipo: "), /*#__PURE__*/React.createElement("span", null, item.tipo_recurso ? item.tipo_recurso.nome : '')), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Formato: "), /*#__PURE__*/React.createElement("span", null, nomeFormato ? nomeFormato.nome : '')), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Autoria: "), item.autoria !== undefined ? item.autoria.map((autoria, key) => {
      return /*#__PURE__*/React.createElement("span", {
        key: "autoria" + key
      }, autoria.autor.nome, item.autoria.length !== key + 1 ? ', ' : '');
    }) : null), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, item.links[0] !== undefined ? /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dorder-container"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.links[0].uri,
      className: "btn btn-theme bg-pri",
      type: "button",
      target: "_blank"
    }, "Acessar ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-right"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dorder-container",
      onClick: () => callModal(item.id_recurso, item.nome, item.resumo)
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-theme bg-pri",
      type: "button",
      target: "_blank"
    }, "Detalhar ", /*#__PURE__*/React.createElement("i", {
      className: "fas fa-angle-right"
    }))))) : null))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "modal fade",
      id: "exampleModal_" + item.id_recurso + "_" + props.grupo,
      tabIndex: "-1",
      "aria-labelledby": "exampleModalLabel_" + item.id_recurso + "_" + props.grupo,
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-lg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "modal-title",
      id: "exampleModalLabel_" + item.id_recurso + "_" + props.grupo
    }, modal.nome)), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, modal.resumo === null ? "Este conteúdo não está disponível no momento!" : /*#__PURE__*/React.createElement("p", {
      dangerouslySetInnerHTML: {
        __html: modal.resumo
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-bs-dismiss": "modal"
    }, "Close")))))));
  }));
};