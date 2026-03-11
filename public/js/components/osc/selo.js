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
        console.log('Resposta da API:', data);

        // Suporta tanto array quanto objeto
        let item = Array.isArray(data) ? data[0] : data;
        if (!item || item.transparencia_area_atuacao === undefined) {
          console.error('Dados não encontrados ou incompletos');
          _this.setState({
            loading: false
          });
          return;
        }
        let soma = [];
        soma.push(item.transparencia_area_atuacao);
        soma.push(item.transparencia_dados_gerais);
        soma.push(item.transparencia_descricao);
        soma.push(item.transparencia_espacos_participacao_social);
        soma.push(item.transparencia_fontes_recursos);
        soma.push(item.transparencia_projetos_atividades_programas);
        soma.push(item.transparencia_relacoes_trabalho_governanca);
        soma.push(item.transparencia_titulos_certificacoes);
        var total = 0;
        var numeros = soma;
        for (var i = 0; i < numeros.length; i++) {
          total += parseInt(numeros[i]);
        }
        let nameImg = 'sem_medalha';
        let titleImg = 'Sem medalha';
        if (total > 50 && total < 70) {
          nameImg = 'bronze';
          titleImg = 'Bronze';
        } else if (total > 71 && total < 90) {
          nameImg = 'prata';
          titleImg = 'Prata';
        } else if (total > 91 && total < 99) {
          nameImg = 'ouro';
          titleImg = 'Ouro';
        } else if (total > 100) {
          nameImg = 'diamante';
          titleImg = 'Diamante';
        }
        _this.setState({
          nameImg: nameImg,
          titleImg: titleImg
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
      alt: this.state.titleImg,
      title: this.state.titleImg,
      width: "50",
      style: {
        float: 'left',
        marginTop: '-6px'
      }
    }));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(Selo, {
  id_osc: id_osc
}), document.getElementById('selo'));