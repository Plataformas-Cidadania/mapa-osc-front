class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartCategorias: [],
      activeIndex: -1,
      showTableIndex: -1
    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleTable = this.toggleTable.bind(this);
  }
  componentDidMount() {
    fetch('/chart-api').then(response => response.json()).then(data => {
      this.setState({
        chartCategorias: data
      }, () => {
        this.handleURLParams();
      });
    }).catch(error => console.error('Error fetching data:', error));
  }
  handleURLParams() {
    const params = new URLSearchParams(window.location.search);
    const group = params.get('group');
    const chart = params.get('chart');
    if (group !== null) {
      // Expande o grupo correto
      this.setState({
        activeIndex: parseInt(group)
      }, () => {
        if (chart !== null) {
          // Garante que o acordeão está renderizado antes de buscar o ID
          setTimeout(() => {
            const chartId = `chart-title-${group}-${chart}`;
            const chartElement = document.getElementById(chartId);
            if (chartElement) {
              const topOffset = chartElement.getBoundingClientRect().top + window.scrollY;
              // Adiciona 200px ao deslocamento calculado
              window.scrollTo({
                top: topOffset - 150,
                behavior: 'smooth'
              });
              chartElement.focus();
            } else {
              console.error('Elemento não encontrado:', chartId);
            }
          }, 500); // Timeout maior para garantir renderização
        }
      });
    }
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
    }, chartCategorias.map((chartCategoria, groupIndex) => /*#__PURE__*/React.createElement("div", {
      className: "card",
      key: groupIndex
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      id: `chart${groupIndex}`
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-link btn-block text-left",
      type: "button",
      onClick: () => this.toggleAccordion(groupIndex),
      "aria-expanded": activeIndex === groupIndex,
      "aria-controls": `collapse${groupIndex}`
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '5px 0'
      }
    }, chartCategoria.titulo))), /*#__PURE__*/React.createElement("div", {
      id: `collapse${groupIndex}`,
      className: `collapse ${activeIndex === groupIndex ? 'show' : ''}`,
      "aria-labelledby": `chart${groupIndex}`,
      "data-parent": "#accordionExample"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: chartCategoria.descricao
      }
    }), /*#__PURE__*/React.createElement("hr", null), chartCategoria?.charts?.map((item, chartIndex) => /*#__PURE__*/React.createElement("div", {
      key: `chart-${chartIndex}`
    }, /*#__PURE__*/React.createElement("h2", {
      id: `chart-title-${groupIndex}-${chartIndex}`
    }, chartIndex + 1, " - ", item.titulo, " ", /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'none'
      }
    }, " (", groupIndex, "-", chartIndex, ")")), /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.descricao
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "mb-2",
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => this.toggleTable(chartIndex),
      className: "btn btn-primary mt-3"
    }, showTableIndex === chartIndex ? 'Visualizar Gráfico' : 'Visualizar Tabela')), showTableIndex !== chartIndex ? /*#__PURE__*/React.createElement(ApexMixed, {
      chartId: `chart${chartIndex}`,
      data: item.chartData[item.slug],
      nome: item.tipo_nome,
      formato: item.formato
    }) : showTableIndex === chartIndex && this.renderTable(item.chartData[item.slug]), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Fonte: "), item.fonte), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null))))))));
  }
}