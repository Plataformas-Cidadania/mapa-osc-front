class Preenchimento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      total: 0
    };
    this.load = this.load.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  load() {
    let _this = this;
    $.ajax({
      method: 'GET',
      url: getBaseUrl2 + 'osc/indice_preenchimento/' + this.props.id_osc,
      data: {},
      cache: false,
      success: function (data) {
        let transparencia = {
          serie: [],
          labels: ['Áreas e Subáreas de Atuação da OSC', 'Dados Gerais', 'Descrição da OSC', 'Espaços de Participação Social', 'Fontes de recursos anuais da OSC', 'Projetos, atividades e/ou programas', 'Relações de Trabalho e Governança', 'Titulações e Certificações']
        };
        transparencia.serie.push(data[0].transparencia_area_atuacao);
        transparencia.serie.push(data[0].transparencia_dados_gerais);
        transparencia.serie.push(data[0].transparencia_descricao);
        transparencia.serie.push(data[0].transparencia_espacos_participacao_social);
        transparencia.serie.push(data[0].transparencia_fontes_recursos);
        transparencia.serie.push(data[0].transparencia_projetos_atividades_programas);
        transparencia.serie.push(data[0].transparencia_relacoes_trabalho_governanca);
        transparencia.serie.push(data[0].transparencia_titulos_certificacoes);
        const total = parseFloat(data[0].transparencia_osc);
        _this.setState({
          data: transparencia,
          total: total
        });
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        _this.setState({
          loading: false
        });
      }
    });
  }
  renderChart() {
    if (!this.state.data) return;
    const options = {
      series: this.state.data.serie.map(val => parseFloat(val)),
      chart: {
        type: 'polarArea',
        height: 300
      },
      labels: this.state.data.labels,
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'],
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 1
          },
          spokes: {
            strokeWidth: 1
          }
        }
      }
    };
    const chart = new ApexCharts(document.querySelector('#polarChart'), options);
    chart.render();
  }
  render() {
    if (this.state.data === null || this.state.data === []) {
      return /*#__PURE__*/React.createElement("div", null, "Carregando...");
    }
    setTimeout(() => this.renderChart(), 100);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: "polarChart"
    }), /*#__PURE__*/React.createElement("div", {
      className: "indice-total"
    }, this.state.total, "%"));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Preenchimento, {
  id_osc: id_osc
}), document.getElementById('preenchimento'));