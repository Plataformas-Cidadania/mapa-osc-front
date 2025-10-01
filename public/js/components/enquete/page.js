'use strict';

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var Page = function Page() {
    var _React = React;
    var useState = _React.useState;
    var useEffect = _React.useEffect;

    var _useState = useState('');

    var _useState2 = _slicedToArray(_useState, 2);

    var enquete = _useState2[0];
    var setEnquete = _useState2[1];

    console.log('---', enquete);

    /*const [form, setForm] = useState({
        tipo_perfil: enquete,
    });
      console.log('form:', form)*/

    /*useEffect(() => {
        Recurso();
    }, []);
      useEffect(() => {
        Recurso();
    }, [page]);
      const Recurso = async () => {
        try {
            const result = await axios.get('api/recurso/paginado/'+perPage, {
                params: {
                    page:page+1
                }
            });
            setRecursos(result.data.data);
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
    }*/

    var hadleEnquete = function hadleEnquete(str) {
        setEnquete(str);
    };

    /*const Update = async () => {
          try {
            const result = await axios.post('api/dados_perfil_de_acesso', form);
          } catch (error) {
            console.log(error);
        }
    }*/

    var Update = function Update() {
        return regeneratorRuntime.async(function Update$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:

                    $.ajax({
                        method: 'POST',
                        url: getBaseUrl2 + 'dados_perfil_de_acesso',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        data: {
                            tipo_perfil: enquete
                        },
                        cache: false,
                        success: (function (data) {
                            this.setState({ loading: false, showMsg: 1, msg: 'Enviado com sucesso!' });
                        }).bind(undefined),
                        error: (function (xhr, status, err) {
                            console.error(status, err.toString());
                            this.setState({ loading: false, showMsg: 2, msg: 'Ocorreu um erro. Tente novamente!' });
                        }).bind(undefined)
                    });

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this);
    };

    return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
                'div',
                { className: 'menu-enquete' },
                React.createElement(
                    'div',
                    { onClick: function () {
                            return hadleEnquete('membro_ou_representante_osc');
                        }, style: { backgroundColor: enquete === 'membro_ou_representante_osc' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Membro e/ou representante de OSC'
                ),
                React.createElement(
                    'div',
                    { onClick: function () {
                            return hadleEnquete('gestor_ou_servidor_publico');
                        }, style: { backgroundColor: enquete === 'gestor_ou_servidor_publico' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Gestor e/ou servidor público'
                ),
                React.createElement(
                    'div',
                    { onClick: function () {
                            return hadleEnquete('pesquisador_ou_estudante');
                        }, style: { backgroundColor: enquete === 'pesquisador_ou_estudante' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Pesquisador e/ou estudante'
                ),
                React.createElement(
                    'div',
                    { onClick: function () {
                            return hadleEnquete('jornalista_ou_midia');
                        }, style: { backgroundColor: enquete === 'jornalista_ou_midia' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Jornalista e/ou profissional de mídia'
                ),
                React.createElement(
                    'div',
                    { onClick: function () {
                            return hadleEnquete('outros');
                        }, style: { backgroundColor: enquete === 'outros' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Outros'
                ),
                React.createElement(
                    'button',
                    { className: 'btn btn-theme bg-pri ', style: { color: '#FFFFFF' }, type: 'button', onClick: function () {
                            return Update();
                        } },
                    'Enviar'
                )
            )
        )
    );
};