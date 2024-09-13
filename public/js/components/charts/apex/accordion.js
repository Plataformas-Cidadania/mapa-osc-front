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
  render() {
    const {
      chartCategorias,
      activeIndex
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
      }), /*#__PURE__*/React.createElement("hr", null), chartCategoria?.charts?.map((item, index2) => {
        console.log('-----------', item.slug, item.chartData[item.slug]);
        return /*#__PURE__*/React.createElement("div", {
          key: 'chart' + index2
        }, /*#__PURE__*/React.createElement("h2", null, index2 + 1, " - ", item.titulo), /*#__PURE__*/React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: item.descricao
          }
        }), /*#__PURE__*/React.createElement(ApexMixed, {
          chartId: `chart${index2}`,
          data: item.chartData[item.slug]
        }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Fonte: "), item.fonte), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null));
      }))));
    }));
  }
}