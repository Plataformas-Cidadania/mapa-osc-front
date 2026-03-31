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
        let item = Array.isArray(data) ? data[0] : data;
        if (!item || item.transparencia_osc === undefined) {
          _this.setState({
            loading: false
          });
          return;
        }
        let total = parseFloat(item.transparencia_osc);
        let nameImg = 'sem_medalha';
        let titleImg = 'Sem medalha';
        if (total >= 25 && total <= 50) {
          nameImg = 'bronze';
          titleImg = 'Bronze';
        } else if (total > 50 && total <= 70) {
          nameImg = 'prata';
          titleImg = 'Prata';
        } else if (total > 70 && total <= 90) {
          nameImg = 'ouro';
          titleImg = 'Ouro';
        } else if (total > 90) {
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