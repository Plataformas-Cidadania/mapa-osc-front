class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartCategorias: [],
      activeIndex: 0,
      showTableIndex: -1 // Estado para controlar a visibilidade da tabela
    };

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleTable = this.toggleTable.bind(this); // Função para alternar tabela
  }

  componentDidMount() {
    fetch('/chart-api').then(response => response.json()).then(data => {
      this.setState({
        chartCategorias: data
      });
    }).catch(error => console.error('Error fetching data:', error));
  }
  toggleAccordion(index) {
    this.setState(prevState => ({
      activeIndex: prevState.activeIndex === index ? -1 : index
    }));
  }
  toggleTable(index) {
    this.setState(prevState => ({
      showTableIndex: prevState.showTableIndex === index ? -1 : index
    }));
  }
  renderTable(chartData) {
    // Exemplo de como renderizar a tabela dependendo das séries de dados
    const {
      labels,
      series
    } = chartData;
    return /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Categoria"), series.map((s, i) => /*#__PURE__*/React.createElement("th", {
      key: i
    }, s.name)))), /*#__PURE__*/React.createElement("tbody", null, labels.map((label, i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", null, label), series.map((s, j) => /*#__PURE__*/React.createElement("td", {
      key: j
    }, s.data[i]))))));
  }
  render() {
    const {
      chartCategorias,
      activeIndex,
      showTableIndex
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "accordion",
      id: "accordionExample"
    }, chartCategorias.map((chartCategoria, index) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "card",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "card-header",
        id: `chart${index}`
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-link btn-block text-left",
        type: "button",
        onClick: () => this.toggleAccordion(index),
        "aria-expanded": activeIndex === index,
        "aria-controls": `collapse${index}`
      }, /*#__PURE__*/React.createElement("h2", {
        style: {
          margin: '5px 0'
        }
      }, chartCategoria.titulo))), /*#__PURE__*/React.createElement("div", {
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
      }), /*#__PURE__*/React.createElement("hr", null), chartCategoria?.charts?.map((item, index2) => {
        return /*#__PURE__*/React.createElement("div", {
          key: 'chart' + index2
        }, /*#__PURE__*/React.createElement("h2", null, index2 + 1, " - ", item.titulo), /*#__PURE__*/React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: item.descricao
          }
        }), /*#__PURE__*/React.createElement("div", {
          class: "mb-2",
          style: {
            display: 'flex',
            justifyContent: 'flex-end'
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: () => this.toggleTable(index2),
          className: "btn btn-primary mt-3 "
        }, " ", showTableIndex === index2 ? ' Visualizar Grafico' : 'Visualizar Tabela')), showTableIndex !== index2 ? /*#__PURE__*/React.createElement(ApexMixed, {
          chartId: `chart${index2}`,
          data: item.chartData[item.slug]
        }) : showTableIndex === index2 && this.renderTable(item.chartData[item.slug]), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Fonte: "), item.fonte), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null));
      }))));
    }));
  }
}