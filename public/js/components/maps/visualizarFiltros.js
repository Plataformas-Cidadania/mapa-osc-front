'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VisualizarFiltros = (function (_React$Component) {
    _inherits(VisualizarFiltros, _React$Component);

    function VisualizarFiltros(props) {
        _classCallCheck(this, VisualizarFiltros);

        _get(Object.getPrototypeOf(VisualizarFiltros.prototype), 'constructor', this).call(this, props);
        //console.log(props);
        this.state = {
            filtros: null
        };

        this.montarElementos = this.montarElementos.bind(this);
    }

    _createClass(VisualizarFiltros, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.montarElementos();
        }
    }, {
        key: 'montarElementos',
        value: function montarElementos() {

            console.log('visualizar filtro busca');
            console.log(this.props.strJson);
            console.log(this.props.filtros);

            if (!this.props.strJson) {
                return;
            }

            var filtros = JSON.parse(this.props.strJson);
            var json_filtro = filtros.avancado;

            var dadosgerais = json_filtro.dadosGerais;
            var txt = [];
            txt.push(React.createElement(
                'b',
                null,
                React.createElement(
                    'u',
                    null,
                    'Filtros utilizados:'
                )
            ));
            var nj = false;

            //console.log(txt);
            this.setState({ filtros: txt });

            if (dadosgerais) {
                if (dadosgerais.tx_razao_social_osc) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' Nome da OSC:'
                            )
                        ),
                        ' ',
                        dadosgerais.tx_razao_social_osc,
                        ', '
                    ));
                }
                if (dadosgerais.tx_nome_regiao) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' Região:'
                            )
                        ),
                        ' ',
                        dadosgerais.tx_nome_regiao,
                        ', '
                    ));
                }
                if (dadosgerais.tx_nome_fantasia_osc) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' Nome Fantasia:'
                            )
                        ),
                        ' ',
                        dadosgerais.tx_nome_fantasia_osc,
                        ', '
                    ));
                }
                if (dadosgerais.tx_nome_uf) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' Estado:'
                            )
                        ),
                        ' ',
                        dadosgerais.tx_nome_uf,
                        ', '
                    ));
                }
                if (dadosgerais.cd_identificador_osc) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' CNPJ:'
                            )
                        ),
                        ' ',
                        dadosgerais.cd_identificador_osc,
                        ', '
                    ));
                }

                if (dadosgerais.cd_situacao_imovel_osc) {
                    $.ajax({
                        url: getBaseUrl2 + 'situacao_imovel/' + dadosgerais.cd_situacao_imovel_osc,
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            ' Situação do Imóvel:'
                                        )
                                    ),
                                    ' ',
                                    data.tx_nome_situacao_imovel,
                                    ', '
                                ));
                            }
                        }
                    });
                }

                if (dadosgerais.anoFundacaoMIN || dadosgerais.anoFundacaoMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                ' Ano de Fundação'
                            )
                        )
                    ));

                    if (dadosgerais.anoFundacaoMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    ' maior que:'
                                )
                            ),
                            ' ',
                            dadosgerais.anoFundacaoMIN,
                            ', '
                        ));
                    }

                    if (dadosgerais.anoFundacaoMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    ' menor que:'
                                )
                            ),
                            ' ',
                            dadosgerais.anoFundacaoMAX,
                            ', '
                        ));
                    }
                }

                if (dadosgerais.tx_nome_municipio) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Município:'
                            )
                        ),
                        dadosgerais.tx_nome_municipio,
                        ', '
                    ));
                    //txt += "<b><i>Município:</i></b> " + dadosgerais.tx_nome_municipio + ", ";
                }

                if (dadosgerais.cd_situacao_cadastral) {
                    $.ajax({
                        url: 'https://mapaosc.ipea.gov.br/api/api/situacao_cadastral',
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (data.length > 0) {
                                var situacao = data.find(function (item) {
                                    return item.cd_situacao_cadastral === parseInt(dadosgerais.cd_situacao_cadastral);
                                });
                                if (situacao) {
                                    txt.push(React.createElement(
                                        'span',
                                        null,
                                        React.createElement(
                                            'b',
                                            null,
                                            React.createElement(
                                                'i',
                                                null,
                                                ' Situação Cadastral:'
                                            )
                                        ),
                                        ' ',
                                        situacao.tx_nome_situacao_cadastral,
                                        ', '
                                    ));
                                }
                            }
                        }
                    });
                }

                var txt_nj = [];
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'b',
                        null,
                        React.createElement(
                            'i',
                            null,
                            'Natureza Jurídica: '
                        )
                    )
                ));

                if (dadosgerais.naturezaJuridica_associacaoPrivada) {
                    txt_nj.push(React.createElement(
                        'span',
                        null,
                        'Associação Privada, '
                    ));
                    /*txt_nj += "Associação Privada" + ", ";*/
                    nj = true;
                }

                if (dadosgerais.naturezaJuridica_fundacaoPrivada) {
                    txt_nj.push(React.createElement(
                        'span',
                        null,
                        'Fundação Privada, '
                    ));
                    /*txt_nj += "Fundação Privada" + ", ";*/
                    nj = true;
                }

                if (dadosgerais.naturezaJuridica_organizacaoReligiosa) {
                    txt_nj.push(React.createElement(
                        'span',
                        null,
                        'Organização Religiosa, '
                    ));
                    /*txt_nj += "Organização Religiosa"  + ", ";*/
                    nj = true;
                }

                if (dadosgerais.naturezaJuridica_organizacaoSocial) {
                    txt_nj.push(React.createElement(
                        'span',
                        null,
                        'Organização Social, '
                    ));
                    /*txt_nj += "Organização Social"  + ", ";*/
                    nj = true;
                }

                if (dadosgerais.naturezaJuridica_outra) {
                    txt_nj.push(React.createElement(
                        'span',
                        null,
                        'Não informado, '
                    ));
                    /*txt_nj += "Não informado"  + ", ";*/
                    nj = true;
                }

                if (nj) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        txt_nj
                    ));
                    /*txt += txt_nj;*/
                }

                if (dadosgerais.cd_objetivo_osc) {
                    $.ajax({
                        url: getBaseUrl2 + 'objetivos',
                        //url: getBaseUrl2 + 'objetivos/'+dadosgerais.cd_objetivo_osc,
                        //url: rotas.Objetivos_ODS_id(dadosgerais.cd_objetivo_osc),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //console.log('cd_objetivo_osc', dadosgerais.cd_objetivo_osc);
                            //console.log('objetivos', data);
                            if (data.length > 0) {
                                var objetivo = data.find(function (item) {
                                    return item.cd_objetivo_projeto === parseInt(dadosgerais.cd_objetivo_osc);
                                });
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Objetivos do Desenvolvimento Sustentável - ODS:'
                                        )
                                    ),
                                    objetivo.tx_nome_objetivo_projeto,
                                    ', '
                                ));
                                /*txt.push(<span><b><i>Objetivos do Desenvolvimento Sustentável - ODS:</i></b>{datametaprojeto.objetivo_projeto.tx_nome_objetivo_projeto}</span>);*/
                                //txt += "<b><i>Objetivos do Desenvolvimento Sustentável - ODS:</i></b> " + data.tx_nome_objetivo_projeto + ", ";
                            }
                        }
                    });
                }

                if (dadosgerais.cd_meta_osc) {
                    $.ajax({
                        url: getBaseUrl2 + 'objetivos/metas/' + dadosgerais.cd_objetivo_osc,
                        //url: rotas.MetasById(dadosgerais.cd_meta_osc),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //console.log('metas', data);
                            if (data.length > 0) {
                                var meta = data.find(function (item) {
                                    return item.cd_meta_projeto === parseInt(dadosgerais.cd_meta_osc);
                                });
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Metas Relacionadas ao ODS:'
                                        )
                                    ),
                                    meta.tx_nome_meta_projeto,
                                    ', '
                                ));
                                /*txt += "<b><i>Metas Relacionadas ao ODS:</i></b> " + data.tx_nome_meta_projeto + ", ";*/
                            }
                        }
                    });
                }
            }

            var atividadeEconomica = json_filtro.atividadeEconomica;

            if (atividadeEconomica) {
                txt.push(React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'b',
                        null,
                        React.createElement(
                            'i',
                            null,
                            'Atividade Econômica (CNAE):'
                        )
                    ),
                    atividadeEconomica.tx_atividade_economica,
                    ', '
                ));
                //txt += "<b><i>Atividade Econômica (CNAE):</i></b> " + atividadeEconomica.tx_atividade_economica + ", ";
            }

            var areasSubareasAtuacao = json_filtro.areasSubareasAtuacao;
            if (areasSubareasAtuacao) {
                (function () {
                    var nomes_area_sub_atuacao = [];

                    $.ajax({
                        url: getBaseUrl2 + 'area_atuacao',
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("Erro no ajax: ");
                        },
                        success: function success(data) {
                            var _loop = function (key) {
                                var cd_area_atuacao = parseInt(key.split('cd_area_atuacao-')[1]);
                                console.log(key);
                                if (cd_area_atuacao != undefined) {
                                    $.each(data, function (k, value) {
                                        if (cd_area_atuacao == value.cd_area_atuacao) {
                                            if (nomes_area_sub_atuacao.indexOf(value.tx_nome_area_atuacao) === -1) {
                                                nomes_area_sub_atuacao.push(value.tx_nome_area_atuacao);
                                            }
                                        }
                                    });
                                }
                            };

                            //console.log(data);
                            //console.log(areasSubareasAtuacao);
                            for (var key in areasSubareasAtuacao) {
                                _loop(key);
                            }

                            $.ajax({
                                url: getBaseUrl2 + 'subarea_atuacao',
                                //url: rotas.SubAreaAtuacao(),
                                type: 'GET',
                                async: false,
                                dataType: 'json',
                                error: function error(e) {
                                    console.log("Erro no ajax: ");
                                },
                                success: function success(data) {
                                    var _loop2 = function (key) {
                                        var cd_subarea_atuacao = parseInt(key.split('cd_subarea_atuacao-')[1]);

                                        if (cd_subarea_atuacao != undefined) {
                                            $.each(data, function (k, value) {
                                                if (cd_subarea_atuacao == value.cd_subarea_atuacao) {
                                                    if (nomes_area_sub_atuacao.indexOf(value.tx_nome_subarea_atuacao) === -1) {
                                                        nomes_area_sub_atuacao.push(value.tx_nome_subarea_atuacao);
                                                    }
                                                }
                                            });
                                        }
                                    };

                                    for (var key in areasSubareasAtuacao) {
                                        _loop2(key);
                                    }

                                    if (nomes_area_sub_atuacao.length > 0) {
                                        var area_subarea = nomes_area_sub_atuacao.map(function (item) {
                                            return React.createElement(
                                                'span',
                                                null,
                                                item,
                                                ', '
                                            );
                                        });
                                        txt.push(React.createElement(
                                            'span',
                                            null,
                                            React.createElement(
                                                'b',
                                                null,
                                                React.createElement(
                                                    'i',
                                                    null,
                                                    'Área e Subárea de Atuação:'
                                                )
                                            ),
                                            area_subarea
                                        ));
                                        //txt += "<b><i>Área e Subárea de Atuação:</i></b> " + nomes_area_sub_atuacao.join(', ') + ", ";
                                    }
                                }
                            });
                        }
                    });
                })();
            }

            var titulacoesCertificacoes = json_filtro.titulacoesCertificacoes;

            if (titulacoesCertificacoes) {
                (function () {
                    var nomes_titulacoesCertificacoes = [];

                    $.ajax({
                        url: getBaseUrl2 + 'certificado',
                        //url: rotas.Busca_Certificado(),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            var id_certificados = {
                                1: "titulacao_entidadeAmbientalista",
                                2: "titulacao_cebasEducacao",
                                3: "titulacao_cebasSaude",
                                4: "titulacao_oscip",
                                5: "titulacao_utilidadePublicaFederal",
                                6: "titulacao_cebasAssistenciaSocial",
                                7: "titulacao_utilidadePublicaEstadual",
                                8: "titulacao_utilidadePublicaMunicipal",
                                9: "titulacao_naoPossui"
                            };

                            var cods = [];
                            for (var key in titulacoesCertificacoes) {
                                for (var cd in id_certificados) {
                                    if (id_certificados[cd] == key) {
                                        for (var i in data) {
                                            if (data[i].cd_certificado == cd) {
                                                if (nomes_titulacoesCertificacoes.indexOf(data[i].tx_nome_certificado) === -1) {
                                                    nomes_titulacoesCertificacoes.push(data[i].tx_nome_certificado);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if (nomes_titulacoesCertificacoes.length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Titulações e Certificações:'
                                        )
                                    ),
                                    nomes_titulacoesCertificacoes
                                ));
                                //txt += "<b><i>Titulações e Certificações:</i></b> " + nomes_titulacoesCertificacoes.join(', ') + ", ";
                            }
                        }
                    });
                })();
            }

            var relacoesTrabalhoGovernanca = json_filtro.relacoesTrabalhoGovernanca;

            if (relacoesTrabalhoGovernanca) {
                if (relacoesTrabalhoGovernanca.tx_nome_dirigente) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Nome do Dirigente: '
                            )
                        ),
                        relacoesTrabalhoGovernanca.tx_nome_dirigente,
                        ', '
                    ));
                    //txt += "<b><i>Nome do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_dirigente + ", ";
                }

                if (relacoesTrabalhoGovernanca.tx_cargo_dirigente) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Cargo do Dirigente: '
                            )
                        ),
                        relacoesTrabalhoGovernanca.tx_cargo_dirigente,
                        ', '
                    ));
                    //txt += "<b><i>Cargo do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_cargo_dirigente + ", ";
                }

                if (relacoesTrabalhoGovernanca.tx_nome_conselheiro) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Nome do Membro do Conselho Fiscal: '
                            )
                        ),
                        relacoesTrabalhoGovernanca.tx_nome_conselheiro,
                        ', '
                    ));
                    //txt += "<b><i>Nome do Membro do Conselho Fiscal:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_conselheiro + ", ";
                }

                if (relacoesTrabalhoGovernanca.totalTrabalhadoresMIN || relacoesTrabalhoGovernanca.totalTrabalhadoresMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Total de Trabalhadores '
                            )
                        )
                    ));
                    //txt += "<b><i>Total de Trabalhadores</i></b>;

                    if (relacoesTrabalhoGovernanca.totalTrabalhadoresMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.totalTrabalhadoresMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMIN  + ", ";
                    }

                    if (relacoesTrabalhoGovernanca.totalTrabalhadoresMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.totalTrabalhadoresMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMAX  + ", ";
                    }
                }

                if (relacoesTrabalhoGovernanca.totalEmpregadosMIN || relacoesTrabalhoGovernanca.totalEmpregadosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Total de Empregados '
                            )
                        )
                    ));
                    //txt += "<b><i>Total de Empregados</i></b> ";

                    if (relacoesTrabalhoGovernanca.totalEmpregadosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.totalEmpregadosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMIN  + ", ";
                    }

                    if (relacoesTrabalhoGovernanca.totalEmpregadosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.totalEmpregadosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMAX  + ", ";
                    }
                }

                if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN || relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Trabalhadores com Deficiência '
                            )
                        )
                    ));
                    //txt += "<b><i>Trabalhadores com Deficiência</i></b> ";

                    if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN  + ", ";
                    }

                    if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX  + ", ";
                    }
                }

                if (relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN || relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Trabalhadores voluntários '
                            )
                        )
                    ));
                    //txt += "<b><i>Trabalhadores voluntários</i></b> ";

                    //if(relacoesTrabalhoGovernanca.totalTrabalhadoresMIN){
                    if (relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN  + ", ";
                    }

                    //if(relacoesTrabalhoGovernanca.totalTrabalhadoresMAX){
                    if (relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX  + ", ";
                    }
                }
            }

            var espacosParticipacaoSocial = json_filtro.espacosParticipacaoSocial;

            if (espacosParticipacaoSocial) {
                if (espacosParticipacaoSocial.cd_conselho) {
                    $.ajax({
                        url: getBaseUrl2 + 'ps_conselhos/' + espacosParticipacaoSocial.cd_conselho,
                        //url: rotas.Conselho_id(espacosParticipacaoSocial.cd_conselho),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //if(data.length > 0){
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Nome do Conselho: '
                                        )
                                    ),
                                    data.tx_nome_conselho,
                                    ', '
                                ));
                                //txt += "<b><i>Nome do Conselho:</i></b> " + data[0].tx_nome_conselho + ", ";
                            }
                        }
                    });
                }

                if (espacosParticipacaoSocial.tx_nome_representante_conselho) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Nome de representante conselho:'
                            )
                        ),
                        espacosParticipacaoSocial.tx_nome_representante_conselho,
                        ', '
                    ));
                    //txt += "<b><i>Nome de representante conselho:</i></b> " + espacosParticipacaoSocial.tx_nome_representante_conselho + ", ";
                }

                if (espacosParticipacaoSocial.cd_tipo_participacao) {
                    $.ajax({
                        url: getBaseUrl2 + 'tipo_participacao/' + espacosParticipacaoSocial.cd_tipo_participacao,
                        //url: rotas.Titularidade_id(espacosParticipacaoSocial.cd_tipo_participacao),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //if(data.length > 0){
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Titularidade: '
                                        )
                                    ),
                                    data.tx_nome_tipo_participacao,
                                    ', '
                                ));
                                //txt += "<b><i>Titularidade:</i></b> " + data[0].tx_nome_tipo_participacao + ", ";
                            }
                        }
                    });
                }

                if (espacosParticipacaoSocial.dt_data_inicio_conselho) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Data de Início de Vigência: '
                            )
                        ),
                        espacosParticipacaoSocial.dt_data_inicio_conselho,
                        ', '
                    ));
                    //txt += "<b><i>Data de Início de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_inicio_conselho + ", ";
                }

                if (espacosParticipacaoSocial.dt_data_fim_conselho) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Data de Fim de Vigência: '
                            )
                        ),
                        espacosParticipacaoSocial.dt_data_fim_conselho,
                        ', '
                    ));
                    //txt += "<b><i>Data de Fim de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_fim_conselho + ", ";
                }

                if (espacosParticipacaoSocial.cd_conferencia) {
                    $.ajax({
                        url: getBaseUrl2 + 'ps_conferencia/' + espacosParticipacaoSocial.cd_conferencia,
                        //url: rotas.Conferencia_id(espacosParticipacaoSocial.cd_conferencia),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Nome da Conferência: '
                                        )
                                    ),
                                    data.tx_nome_conferencia,
                                    ', '
                                ));
                                //txt += "<b><i>Nome da Conferência:</i></b> " + data[0].tx_nome_conferencia + ", ";
                            }
                        }
                    });
                }

                if (espacosParticipacaoSocial.cd_forma_participacao_conferencia) {
                    $.ajax({
                        url: getBaseUrl2 + 'ps_conferencia_forma/' + espacosParticipacaoSocial.cd_forma_participacao_conferencia,
                        //url: rotas.FormaParticipacaoConferencia_id(espacosParticipacaoSocial.cd_forma_participacao_conferencia),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Forma de Participação na Conferência: '
                                        )
                                    ),
                                    data.tx_nome_forma_participacao_conferencia,
                                    ', '
                                ));
                                //txt += "<b><i>Forma de Participação na Conferência:</i></b> " + data[0].tx_nome_forma_participacao_conferencia + ", ";
                            }
                        }
                    });
                }

                if (espacosParticipacaoSocial.anoRealizacaoConferenciaMIN || espacosParticipacaoSocial.anoRealizacaoConferenciaMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Ano de Realização da Conferência '
                            )
                        )
                    ));
                    //txt += "<b><i>Ano de Realização da Conferência</i></b> ";

                    if (espacosParticipacaoSocial.anoRealizacaoConferenciaMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            espacosParticipacaoSocial.anoRealizacaoConferenciaMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMIN  + ", ";
                    }

                    if (espacosParticipacaoSocial.anoRealizacaoConferenciaMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            espacosParticipacaoSocial.anoRealizacaoConferenciaMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMAX  + ", ";
                    }
                }
            }

            var projetos = json_filtro.projetos;

            if (projetos) {
                if (projetos.tx_nome_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'menor que: '
                            )
                        ),
                        projetos.trabalhadoresVoluntariosMAX,
                        ', '
                    ));
                    //txt += "<b><i>Nome do Projeto:</i></b> " + projetos.tx_nome_projeto + ", ";
                }

                if (projetos.cd_status_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'status_projeto/' + projetos.cd_status_projeto,
                        //url: rotas.SituacaoProjeto_id(projetos.cd_status_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Situação do projeto: '
                                        )
                                    ),
                                    data.tx_nome_status_projeto,
                                    ', '
                                ));
                                //txt += "<b><i>Situação do projeto:</i></b> " + data[0].tx_nome_status_projeto + ", ";
                            }
                        }
                    });
                }

                if (projetos.dt_data_inicio_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Data de Início Projeto:: '
                            )
                        ),
                        projetos.dt_data_inicio_projeto,
                        ', '
                    ));
                    //txt += "<b><i>Data de Início Projeto:</i></b> " + projetos.dt_data_inicio_projeto + ", ";
                }

                if (projetos.dt_data_fim_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Data de Fim Projeto: '
                            )
                        ),
                        projetos.dt_data_fim_projeto,
                        ', '
                    ));
                    //txt += "<b><i>Data de Fim Projeto:</i></b> " + projetos.dt_data_fim_projeto + ", ";
                }

                if (projetos.cd_abrangencia_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'abrangencia_projeto/' + projetos.cd_abrangencia_projeto,
                        //url: rotas.AbrangenciaProjeto_id(projetos.cd_abrangencia_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Abrangência de atuação: '
                                        )
                                    ),
                                    data.tx_nome_status_projeto,
                                    ', '
                                ));
                                //txt += "<b><i>Abrangência de atuação:</i></b> " + data[0].tx_nome_abrangencia_projeto + ", ";
                            }
                        }
                    });
                }

                if (projetos.cd_zona_atuacao_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'zona_atuacao_projeto' + projetos.cd_zona_atuacao_projeto,
                        //url: rotas.ZonaAtuacaoProjeto_id(projetos.cd_zona_atuacao_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Zona de Atuação: '
                                        )
                                    ),
                                    data.tx_nome_zona_atuacao,
                                    ', '
                                ));
                                //txt += "<b><i>Zona de Atuação:</i></b> " + data[0].tx_nome_zona_atuacao + ", ";
                            }
                        }
                    });
                }

                if (projetos.cd_origem_fonte_recursos_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'origem_fonte_recurso_projeto/' + projetos.cd_origem_fonte_recursos_projeto,
                        //url: rotas.FontesRecursosProjeto_id(projetos.cd_origem_fonte_recursos_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            if (Object.keys(data).length > 0) {
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Fontes de Recursos: '
                                        )
                                    ),
                                    data.tx_nome_origem_fonte_recursos_projeto,
                                    ', '
                                ));
                                //txt += "<b><i>Fontes de Recursos:</i></b> " + data[0].tx_nome_origem_fonte_recursos_projeto + ", ";
                            }
                        }
                    });
                }

                if (projetos.cd_objetivo_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'objetivos',
                        //url: rotas.Objetivos_ODS_id(projetos.cd_objetivo_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //if(data){
                            if (data.length > 0) {
                                var objetivo = data.find(function (item) {
                                    return item.cd_objetivo_projeto === parseInt(projetos.cd_objetivo_projeto);
                                });
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Objetivos do Desenvolvimento Sustentável - ODS para Projeto: '
                                        )
                                    ),
                                    objetivo.tx_nome_objetivo_projeto,
                                    ', '
                                ));
                                //txt += "<b><i>Objetivos do Desenvolvimento Sustentável - ODS para Projeto:</i></b> " + data.tx_nome_objetivo_projeto + ", ";
                            }
                        }
                    });
                }

                if (projetos.cd_meta_projeto) {
                    $.ajax({
                        url: getBaseUrl2 + 'objetivos/metas/' + projetos.cd_objetivo_projeto,
                        //url: rotas.MetasById(projetos.cd_meta_projeto),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function error(e) {
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function success(data) {
                            //if(data){
                            if (data.length > 0) {
                                var meta = data.find(function (item) {
                                    return item.cd_meta_projeto === parseInt(projetos.cd_meta_projeto);
                                });
                                txt.push(React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'b',
                                        null,
                                        React.createElement(
                                            'i',
                                            null,
                                            'Metas Relacionadas ao ODS para projeto: '
                                        )
                                    ),
                                    meta.tx_nome_meta_projeto,
                                    ', '
                                ));
                                //txt += "<b><i>Metas Relacionadas ao ODS para projeto:</i></b> " + data.tx_nome_meta_projeto + ", ";
                            }
                        }
                    });
                }

                if (projetos.tx_nome_financiador) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Financiadores do Projeto: '
                            )
                        ),
                        projetos.tx_nome_financiador,
                        ', '
                    ));
                    //txt += "<b><i>Financiadores do Projeto:</i></b> " + projetos.tx_nome_financiador + ", ";
                }

                if (projetos.tx_nome_regiao_localizacao_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Local de Execução: '
                            )
                        ),
                        projetos.tx_nome_regiao_localizacao_projeto,
                        ', '
                    ));
                    //txt += "<b><i>Local de Execução:</i></b> " + projetos.tx_nome_regiao_localizacao_projeto + ", ";
                }

                if (projetos.tx_nome_publico_beneficiado) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Público Beneficiado: '
                            )
                        ),
                        projetos.tx_nome_publico_beneficiado,
                        ', '
                    ));
                    //txt += "<b><i>Público Beneficiado:</i></b> " + projetos.tx_nome_publico_beneficiado + ", ";
                }

                if (projetos.tx_nome_osc_parceira_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'OSC Parceiras: '
                            )
                        ),
                        projetos.tx_nome_osc_parceira_projeto,
                        ', '
                    ));
                    //txt += "<b><i>OSC Parceiras:</i></b> " + projetos.tx_nome_osc_parceira_projeto + ", ";
                }

                if (projetos.ft_nome_projeto) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Fonte Nome Projeto: '
                            )
                        ),
                        projetos.ft_nome_projeto,
                        ', '
                    ));
                    //txt += "<b><i>Fonte Nome Projeto:</i></b> " + projetos.ft_nome_projeto + ", ";
                }

                if (projetos.totalBeneficiariosMIN || projetos.totalBeneficiariosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Total de Beneficiários: '
                            )
                        )
                    ));
                    //txt += "<b><i>Total de Beneficiários</i></b> ";

                    if (projetos.totalBeneficiariosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            projetos.totalBeneficiariosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + projetos.totalBeneficiariosMIN  + ", ";
                    }

                    if (projetos.totalBeneficiariosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            projetos.totalBeneficiariosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + projetos.totalBeneficiariosMAX  + ", ";
                    }
                }

                if (projetos.valorTotalMIN || projetos.valorTotalMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Valor Total Projeto '
                            )
                        )
                    ));
                    //txt += "<b><i>Valor Total Projeto</i></b> ";

                    if (projetos.valorTotalMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            projetos.valorTotalMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + projetos.valorTotalMIN  + ", ";
                    }

                    if (projetos.valorTotalMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            projetos.valorTotalMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + projetos.valorTotalMAX  + ", ";
                    }
                }

                if (projetos.valorRecebidoMIN || projetos.valorRecebidoMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Valor Recebido Projeto '
                            )
                        )
                    ));
                    //txt += "<b><i>Valor Recebido Projeto</i></b> ";

                    if (projetos.valorRecebidoMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            projetos.valorRecebidoMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + projetos.valorRecebidoMIN  + ", ";
                    }

                    if (projetos.valorRecebidoMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            projetos.valorRecebidoMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + projetos.valorRecebidoMAX  + ", ";
                    }
                }
            }

            var fontesRecursos = json_filtro.fontesRecursos;

            if (fontesRecursos) {
                if (fontesRecursos.anoFonteRecursoMIN || fontesRecursos.anoFonteRecursoMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Fontes de recursos anuais da OSC Ano '
                            )
                        )
                    ));
                    //txt += "<b><i>Fontes de recursos anuais da OSC Ano</i></b> ";

                    if (fontesRecursos.anoFonteRecursoMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.anoFonteRecursoMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.anoFonteRecursoMIN  + ", ";
                    }

                    if (fontesRecursos.anoFonteRecursoMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.anoFonteRecursoMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.anoFonteRecursoMAX  + ", ";
                    }
                }

                if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN || fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Rendimentos financeiros de reservas ou contas correntes próprias '
                            )
                        )
                    ));
                    //txt += "<b><i>Rendimentos financeiros de reservas ou contas correntes próprias</i></b> ";

                    if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN  + ", ";
                    }

                    if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX  + ", ";
                    }
                }

                if (fontesRecursos.rendimentosFundosPatrimoniaisMIN || fontesRecursos.rendimentosFundosPatrimoniaisMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Rendimentos de fundos patrimoniais '
                            )
                        )
                    ));
                    //txt += "<b><i>Rendimentos de fundos patrimoniais</i></b> ";

                    if (fontesRecursos.rendimentosFundosPatrimoniaisMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.rendimentosFundosPatrimoniaisMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMIN  + ", ";
                    }

                    if (fontesRecursos.rendimentosFundosPatrimoniaisMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.rendimentosFundosPatrimoniaisMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMAX  + ", ";
                    }
                }

                if (fontesRecursos.mensalidadesContribuicoesAssociadosMIN || fontesRecursos.mensalidadesContribuicoesAssociadosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Mensalidades ou contribuições de associados '
                            )
                        )
                    ));
                    //txt += "<b><i>Mensalidades ou contribuições de associados</i></b> ";

                    if (fontesRecursos.mensalidadesContribuicoesAssociadosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.mensalidadesContribuicoesAssociadosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMIN  + ", ";
                    }

                    if (fontesRecursos.mensalidadesContribuicoesAssociadosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.mensalidadesContribuicoesAssociadosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMAX  + ", ";
                    }
                }

                if (fontesRecursos.vendaBensDireitosMIN || fontesRecursos.vendaBensDireitosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Venda de bens e direitos '
                            )
                        )
                    ));
                    //txt += "<b><i>Venda de bens e direitos</i></b> ";

                    if (fontesRecursos.vendaBensDireitosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.vendaBensDireitosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaBensDireitosMIN  + ", ";
                    }

                    if (fontesRecursos.vendaBensDireitosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.vendaBensDireitosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaBensDireitosMAX  + ", ";
                    }
                }

                if (fontesRecursos.premiosRecebidosMIN || fontesRecursos.premiosRecebidosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Prêmios recebidos '
                            )
                        )
                    ));
                    //txt += "<b><i>Prêmios recebidos</i></b> ";

                    if (fontesRecursos.premiosRecebidosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.premiosRecebidosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.premiosRecebidosMIN  + ", ";
                    }

                    if (fontesRecursos.premiosRecebidosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.premiosRecebidosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.premiosRecebidosMAX  + ", ";
                    }
                }

                if (fontesRecursos.vendaProdutosMIN || fontesRecursos.vendaProdutosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Venda de produtos '
                            )
                        )
                    ));
                    //txt += "<b><i>Venda de produtos</i></b> ";

                    if (fontesRecursos.vendaProdutosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.vendaProdutosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaProdutosMIN  + ", ";
                    }

                    if (fontesRecursos.vendaProdutosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.vendaProdutosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaProdutosMAX  + ", ";
                    }
                }

                if (fontesRecursos.prestacaoServicosMIN || fontesRecursos.prestacaoServicosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Prestação de serviços '
                            )
                        )
                    ));
                    //txt += "<b><i>Prestação de serviços</i></b> ";

                    if (fontesRecursos.prestacaoServicosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.prestacaoServicosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.prestacaoServicosMIN  + ", ";
                    }

                    if (fontesRecursos.prestacaoServicosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.prestacaoServicosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.prestacaoServicosMAX  + ", ";
                    }
                }

                if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN || fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Empresas públicas ou sociedades de economia mista '
                            )
                        )
                    ));
                    //txt += "<b><i>Empresas públicas ou sociedades de economia mista</i></b> ";

                    if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN  + ", ";
                    }

                    if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX  + ", ";
                    }
                }

                if (fontesRecursos.acordoOrganismosMultilateraisMIN || fontesRecursos.acordoOrganismosMultilateraisMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Acordo com organismos multilaterais '
                            )
                        )
                    ));
                    //txt += "<b><i>Acordo com organismos multilaterais</i></b> ";

                    if (fontesRecursos.acordoOrganismosMultilateraisMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.acordoOrganismosMultilateraisMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMIN  + ", ";
                    }

                    if (fontesRecursos.acordoOrganismosMultilateraisMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.acordoOrganismosMultilateraisMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaGovernoFederalMIN || fontesRecursos.parceriaGovernoFederalMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Transferências federais recebidas pela OSC: '
                            )
                        )
                    ));
                    //txt += "<b><i>Transferências federais recebidas pela OSC</i></b> ";

                    if (fontesRecursos.parceriaGovernoFederalMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoFederalMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoFederalMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaGovernoFederalMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoFederalMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoFederalMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaGovernoEstadualMIN || fontesRecursos.parceriaGovernoEstadualMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com o governo estadual '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com o governo estadual</i></b> ";

                    if (fontesRecursos.parceriaGovernoEstadualMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoEstadualMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaGovernoEstadualMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoEstadualMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaGovernoMunicipalMIN || fontesRecursos.parceriaGovernoMunicipalMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com o governo municipal '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com o governo municipal</i></b> ";

                    if (fontesRecursos.parceriaGovernoMunicipalMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoMunicipalMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaGovernoMunicipalMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaGovernoMunicipalMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMAX  + ", ";
                    }
                }

                if (fontesRecursos.acordoGovernosEstrangeirosMIN || fontesRecursos.acordoGovernosEstrangeirosMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Acordo com governos estrangeiros '
                            )
                        )
                    ));
                    //txt += "<b><i>Acordo com governos estrangeiros</i></b> ";

                    if (fontesRecursos.acordoGovernosEstrangeirosMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.acordoGovernosEstrangeirosMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMIN  + ", ";
                    }

                    if (fontesRecursos.acordoGovernosEstrangeirosMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.acordoGovernosEstrangeirosMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaOscBrasileirasMIN || fontesRecursos.parceriaOscBrasileirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com OSCs brasileiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com OSCs brasileiras</i></b> ";

                    if (fontesRecursos.parceriaOscBrasileirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaOscBrasileirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaOscBrasileirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaOscBrasileirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaOscEstrangeirasMIN || fontesRecursos.parceriaOscEstrangeirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com OSCs estrangeiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com OSCs estrangeiras</i></b> ";

                    if (fontesRecursos.parceriaOscEstrangeirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaOscEstrangeirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaOscEstrangeirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaOscEstrangeirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com organizações religiosas brasileiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com organizações religiosas brasileiras</i></b> ";

                    if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Parceria com organizações religiosas estrangeiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Parceria com organizações religiosas estrangeiras</i></b> ";

                    if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN  + ", ";
                    }

                    if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.empresasPrivadasBrasileirasMIN || fontesRecursos.empresasPrivadasBrasileirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Empresas privadas brasileiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Empresas privadas brasileiras</i></b> ";

                    if (fontesRecursos.empresasPrivadasBrasileirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.empresasPrivadasBrasileirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMIN  + ", ";
                    }

                    if (fontesRecursos.empresasPrivadasBrasileirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.empresasPrivadasBrasileirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.EmpresasEstrangeirasMIN || fontesRecursos.EmpresasEstrangeirasMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Empresas estrangeiras '
                            )
                        )
                    ));
                    //txt += "<b><i>Empresas estrangeiras</i></b> ";

                    if (fontesRecursos.EmpresasEstrangeirasMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.EmpresasEstrangeirasMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMIN  + ", ";
                    }

                    if (fontesRecursos.EmpresasEstrangeirasMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.EmpresasEstrangeirasMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMAX  + ", ";
                    }
                }

                if (fontesRecursos.doacoesPessoaJuridicaMIN || fontesRecursos.doacoesPessoaJuridicaMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Doações de pessoa jurídica '
                            )
                        )
                    ));
                    //txt += "<b><i>Doações de pessoa jurídica</i></b> ";

                    if (fontesRecursos.doacoesPessoaJuridicaMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.doacoesPessoaJuridicaMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMIN  + ", ";
                    }

                    if (fontesRecursos.doacoesPessoaJuridicaMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.doacoesPessoaJuridicaMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMAX  + ", ";
                    }
                }

                if (fontesRecursos.doacoesPessoaFisicaMIN || fontesRecursos.doacoesPessoaFisicaMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Doações de pessoa física '
                            )
                        )
                    ));
                    //txt += "<b><i>Doações de pessoa física</i></b> ";

                    if (fontesRecursos.doacoesPessoaFisicaMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.doacoesPessoaFisicaMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMIN  + ", ";
                    }

                    if (fontesRecursos.doacoesPessoaFisicaMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.doacoesPessoaFisicaMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMAX  + ", ";
                    }
                }

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Doações recebidas na forma de produtos e serviços (com NF) '
                            )
                        )
                    ));
                    //txt += "<b><i>Doações recebidas na forma de produtos e serviços (com NF)</i></b> ";

                    if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN  + ", ";
                    }

                    if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX  + ", ";
                    }
                }

                if (fontesRecursos.voluntariadoMIN || fontesRecursos.voluntariadoMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Voluntariado '
                            )
                        )
                    ));
                    //txt += "<b><i>Voluntariado</i></b> ";

                    if (fontesRecursos.voluntariadoMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.voluntariadoMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.voluntariadoMIN  + ", ";
                    }

                    if (fontesRecursos.voluntariadoMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.voluntariadoMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.voluntariadoMAX  + ", ";
                    }
                }

                if (fontesRecursos.isencoesMIN || fontesRecursos.isencoesMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Isenções: '
                            )
                        )
                    ));
                    //txt += "<b><i>Isenções:</i></b> ";

                    if (fontesRecursos.isencoesMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.isencoesMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.isencoesMIN  + ", ";
                    }

                    if (fontesRecursos.isencoesMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.isencoesMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.isencoesMAX  + ", ";
                    }
                }

                if (fontesRecursos.imunidadesMIN || fontesRecursos.imunidadesMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Imunidades '
                            )
                        )
                    ));
                    //txt += "<b><i>Imunidades</i></b> ";

                    if (fontesRecursos.imunidadesMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.imunidadesMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.imunidadesMIN  + ", ";
                    }

                    if (fontesRecursos.imunidadesMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.imunidadesMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.imunidadesMAX  + ", ";
                    }
                }

                if (fontesRecursos.bensRecebidosDireitoUsoMIN || fontesRecursos.bensRecebidosDireitoUsoMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Bens recebidos em direito de uso '
                            )
                        )
                    ));
                    //txt += "<b><i>Bens recebidos em direito de uso</i></b> ";

                    if (fontesRecursos.bensRecebidosDireitoUsoMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.bensRecebidosDireitoUsoMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMIN  + ", ";
                    }

                    if (fontesRecursos.bensRecebidosDireitoUsoMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.bensRecebidosDireitoUsoMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMAX  + ", ";
                    }
                }

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Doações recebidas na forma de produtos e serviços (sem NF) '
                            )
                        )
                    ));
                    //txt += "<b><i>Doações recebidas na forma de produtos e serviços (sem NF)</i></b> ";

                    if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'maior que: '
                                )
                            ),
                            fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN,
                            ', '
                        ));
                        //txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN  + ", ";
                    }

                    if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                React.createElement(
                                    'i',
                                    null,
                                    'menor que: '
                                )
                            ),
                            fontesRecursos.valorMAX,
                            ', '
                        ));
                        //txt += "<b><i>menor que:</i></b> " + fontesRecursos.valorMAX  + ", ";
                    }
                }
            }

            //return null;

            var idh_json = json_filtro.IDH;

            if (idh_json) {
                if (idh_json.IDH_Municipal) {
                    txt.push(React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            React.createElement(
                                'i',
                                null,
                                'Índice de Desenvolvimento Humano'
                            )
                        ),
                        'IDH Municipal - Faixa: '
                    ));
                    //txt += "<b><i>Índice de Desenvolvimento Humano:</i></b> IDH Municipal - Faixa: ";

                    if (idh_json.baixo) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            'baixa, '
                        ));
                        //txt += "baixa, ";
                    }

                    if (idh_json.medio) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            'médio, '
                        ));
                        //txt += "médio, ";
                    }
                    if (idh_json.alto) {
                        txt.push(React.createElement(
                            'span',
                            null,
                            'alto, '
                        ));
                        //txt += "alto, ";
                    }
                }
            }

            return txt;
            //$("#filtros p").html(txt);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.filtros,
                ' ',
                this.state.filtros !== null && Object.keys(this.state.filtros).length !== 0 ? React.createElement(
                    'a',
                    { href: '/mapa', style: { position: 'absolute', right: 0 } },
                    React.createElement('i', { className: 'fas fa-times', style: { color: 'red' } }),
                    ' Limpar'
                ) : null,
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return VisualizarFiltros;
})(React.Component);

/*{this.state.filtros !== null ? <a href="/mapa"><i className="fas fa-times" style={{color: 'red'}}/> Limpar</a> : null}*/