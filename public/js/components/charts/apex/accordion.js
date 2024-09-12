class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartCategorias: [],
      activeIndex: 0
    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }
  componentDidMount() {
    // Mock de dados simulando uma resposta da API
    const mockData = [{
      titulo: "Categoria 1",
      descricao: "<p>Descrição da categoria 1.</p>"
    }, {
      titulo: "Categoria 2",
      descricao: "<p>Descrição da categoria 2.</p>"
    }, {
      titulo: "Categoria 3",
      descricao: "<p>Descrição da categoria 3.</p>"
    }];

    // Simular o comportamento de uma resposta da API
    this.setState({
      chartCategorias: mockData
    });
  }
  toggleAccordion(index) {
    this.setState(prevState => ({
      activeIndex: prevState.activeIndex === index ? -1 : index
    }));
  }
  render() {
    const {
      chartCategorias,
      activeIndex
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "accordion",
      id: "accordionExample"
    }, chartCategorias.map((chartCategoria, index) => /*#__PURE__*/React.createElement("div", {
      className: "card",
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: `chart${index}`
    }, /*#__PURE__*/React.createElement("h2", {
      className: "mb-0"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-link btn-block text-left",
      type: "button",
      onClick: () => this.toggleAccordion(index),
      "aria-expanded": activeIndex === index,
      "aria-controls": `collapse${index}`
    }, /*#__PURE__*/React.createElement("h2", null, chartCategoria.titulo)))), /*#__PURE__*/React.createElement("div", {
      id: `collapse${index}`,
      className: `collapse ${activeIndex === index ? 'show' : ''}`,
      "aria-labelledby": `chart${index}`,
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: chartCategoria.descricao
      }
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "What is Lorem Ipsum?"), /*#__PURE__*/React.createElement("p", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."), /*#__PURE__*/React.createElement(ApexMixed, {
      chartId: "chart",
      data: []
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Fonte: "), "IPEA")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "What is Lorem Ipsum?"), /*#__PURE__*/React.createElement("p", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."), /*#__PURE__*/React.createElement(ApexMixed, {
      chartId: "chart",
      data: []
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Fonte: "), "IPEA")))))));
  }
}