class Selo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameImg: 'sem_medalha'
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
        let soma = [];
        soma.push(data[0].transparencia_area_atuacao / 800 * 100);
        soma.push(data[0].transparencia_dados_gerais / 800 * 100);
        soma.push(data[0].transparencia_descricao / 800 * 100);
        soma.push(data[0].transparencia_espacos_participacao_social / 800 * 100);
        soma.push(data[0].transparencia_fontes_recursos / 800 * 100);
        soma.push(data[0].transparencia_projetos_atividades_programas / 800 * 100);
        soma.push(data[0].transparencia_relacoes_trabalho_governanca / 800 * 100);
        soma.push(data[0].transparencia_titulos_certificacoes / 800 * 100);
        var total = 0;
        var numeros = soma;
        for (var i = 0; i < numeros.length; i++) {
          total += parseInt(numeros[i]);
        }
        let nameImg = 'sem_medalha';
        if (total > 50 && total < 70) {
          nameImg = 'bronze';
        } else if (total > 71 && total < 90) {
          nameImg = 'prata';
        } else if (total > 91 && total < 99) {
          nameImg = 'ouro';
        } else if (total > 100) {
          nameImg = 'diamante';
        }
        _this.setState({
          nameImg: nameImg
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
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: "img/selos/" + this.state.nameImg + ".png",
      alt: "",
      width: "50",
      style: {
        float: 'left',
        marginTop: '-6px'
      }
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(Selo, {
  id_osc: id_osc
}), document.getElementById('selo'));