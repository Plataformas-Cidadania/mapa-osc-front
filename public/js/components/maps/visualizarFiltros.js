class VisualizarFiltros extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            filtros: null
        };

        this.montarElementos = this.montarElementos.bind(this);
    }

    componentDidMount() {
        this.montarElementos();
    }

    montarElementos() {

        console.log('visualizar filtro busca');
        console.log(this.props.strJson);

        if (!this.props.strJson) {
            return;
        }

        let filtros = JSON.parse(this.props.strJson);
        let json_filtro = filtros.avancado;

        let dadosgerais = json_filtro.dadosGerais;
        let txt = [];
        txt.push(React.createElement(
            'b',
            null,
            React.createElement(
                'u',
                null,
                'Filtros utilizados:'
            )
        ));
        let nj = false;

        console.log(txt);
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
                            ' Regi\xE3o:'
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
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
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
                                        ' Situa\xE7\xE3o do Im\xF3vel:'
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
                            ' Ano de Funda\xE7\xE3o'
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
                            'Munic\xEDpio:'
                        )
                    ),
                    dadosgerais.tx_nome_municipio,
                    ', '
                ));
                //txt += "<b><i>Município:</i></b> " + dadosgerais.tx_nome_municipio + ", ";
            }

            let txt_nj = [];
            txt_nj.push(React.createElement(
                'span',
                null,
                React.createElement(
                    'b',
                    null,
                    React.createElement(
                        'i',
                        null,
                        'Natureza Jur\xEDdica: '
                    )
                )
            ));

            if (dadosgerais.naturezaJuridica_associacaoPrivada) {
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    'Associa\xE7\xE3o Privada, '
                ));
                /*txt_nj += "Associação Privada" + ", ";*/
                nj = true;
            }

            if (dadosgerais.naturezaJuridica_fundacaoPrivada) {
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    'Funda\xE7\xE3o Privada, '
                ));
                /*txt_nj += "Fundação Privada" + ", ";*/
                nj = true;
            }

            if (dadosgerais.naturezaJuridica_organizacaoReligiosa) {
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    'Organiza\xE7\xE3o Religiosa, '
                ));
                /*txt_nj += "Organização Religiosa"  + ", ";*/
                nj = true;
            }

            if (dadosgerais.naturezaJuridica_organizacaoSocial) {
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    'Organiza\xE7\xE3o Social, '
                ));
                /*txt_nj += "Organização Social"  + ", ";*/
                nj = true;
            }

            if (dadosgerais.naturezaJuridica_outra) {
                txt_nj.push(React.createElement(
                    'span',
                    null,
                    'N\xE3o informado, '
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
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        console.log('cd_objetivo_osc', dadosgerais.cd_objetivo_osc);
                        console.log('objetivos', data);
                        if (data.length > 0) {
                            let objetivo = data.find(function (item) {
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
                                        'Objetivos do Desenvolvimento Sustent\xE1vel - ODS:'
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
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        console.log('metas', data);
                        if (data.length > 0) {
                            let meta = data.find(function (item) {
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

        let atividadeEconomica = json_filtro.atividadeEconomica;

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
                        'Atividade Econ\xF4mica (CNAE):'
                    )
                ),
                atividadeEconomica.tx_atividade_economica,
                ', '
            ));
            //txt += "<b><i>Atividade Econômica (CNAE):</i></b> " + atividadeEconomica.tx_atividade_economica + ", ";
        }

        let areasSubareasAtuacao = json_filtro.areasSubareasAtuacao;
        if (areasSubareasAtuacao) {
            let nomes_area_sub_atuacao = [];

            $.ajax({
                url: getBaseUrl2 + 'area_atuacao',
                type: 'GET',
                async: false,
                dataType: 'json',
                error: function (e) {
                    console.log("Erro no ajax: ");
                },
                success: function (data) {
                    console.log(data);
                    console.log(areasSubareasAtuacao);
                    for (let key in areasSubareasAtuacao) {
                        let cd_area_atuacao = parseInt(key.split('cd_area_atuacao-')[1]);
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
                    }

                    $.ajax({
                        url: getBaseUrl2 + 'subarea_atuacao',
                        //url: rotas.SubAreaAtuacao(),
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        error: function (e) {
                            console.log("Erro no ajax: ");
                        },
                        success: function (data) {
                            for (let key in areasSubareasAtuacao) {
                                let cd_subarea_atuacao = parseInt(key.split('cd_subarea_atuacao-')[1]);

                                if (cd_subarea_atuacao != undefined) {
                                    $.each(data, function (k, value) {
                                        if (cd_subarea_atuacao == value.cd_subarea_atuacao) {
                                            if (nomes_area_sub_atuacao.indexOf(value.tx_nome_subarea_atuacao) === -1) {
                                                nomes_area_sub_atuacao.push(value.tx_nome_subarea_atuacao);
                                            }
                                        }
                                    });
                                }
                            }

                            if (nomes_area_sub_atuacao.length > 0) {
                                let area_subarea = nomes_area_sub_atuacao.map(function (item) {
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
                                            '\xC1rea e Sub\xE1rea de Atua\xE7\xE3o:'
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
        }

        return null;

        let titulacoesCertificacoes = json_filtro.titulacoesCertificacoes;

        if (titulacoesCertificacoes) {
            let nomes_titulacoesCertificacoes = [];

            $.ajax({
                url: rotas.Busca_Certificado(),
                type: 'GET',
                async: false,
                dataType: 'json',
                error: function (e) {
                    console.log("ERRO no AJAX :" + e);
                },
                success: function (data) {
                    let id_certificados = {
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

                    let cods = [];
                    for (let key in titulacoesCertificacoes) {
                        for (let cd in id_certificados) {
                            if (id_certificados[cd] == key) {
                                for (let i in data) {
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
                        txt += "<b><i>Titulações e Certificações:</i></b> " + nomes_titulacoesCertificacoes.join(', ') + ", ";
                    }
                }
            });
        }

        let relacoesTrabalhoGovernanca = json_filtro.relacoesTrabalhoGovernanca;

        if (relacoesTrabalhoGovernanca) {
            if (relacoesTrabalhoGovernanca.tx_nome_dirigente) {
                txt += "<b><i>Nome do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_dirigente + ", ";
            }

            if (relacoesTrabalhoGovernanca.tx_cargo_dirigente) {
                txt += "<b><i>Cargo do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_cargo_dirigente + ", ";
            }

            if (relacoesTrabalhoGovernanca.tx_nome_conselheiro) {
                txt += "<b><i>Nome do Membro do Conselho Fiscal:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_conselheiro + ", ";
            }

            if (relacoesTrabalhoGovernanca.totalTrabalhadoresMIN || relacoesTrabalhoGovernanca.totalTrabalhadoresMAX) {
                txt += "<b><i>Total de Trabalhadores</i></b> ";

                if (relacoesTrabalhoGovernanca.totalTrabalhadoresMIN) {
                    txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMIN + ", ";
                }

                if (relacoesTrabalhoGovernanca.totalTrabalhadoresMAX) {
                    txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMAX + ", ";
                }
            }

            if (relacoesTrabalhoGovernanca.totalEmpregadosMIN || relacoesTrabalhoGovernanca.totalEmpregadosMAX) {
                txt += "<b><i>Total de Empregados</i></b> ";

                if (relacoesTrabalhoGovernanca.totalEmpregadosMIN) {
                    txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMIN + ", ";
                }

                if (relacoesTrabalhoGovernanca.totalEmpregadosMAX) {
                    txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMAX + ", ";
                }
            }

            if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN || relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX) {
                txt += "<b><i>Trabalhadores com Deficiência</i></b> ";

                if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN) {
                    txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN + ", ";
                }

                if (relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX) {
                    txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX + ", ";
                }
            }

            if (relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN || relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX) {
                txt += "<b><i>Trabalhadores voluntários</i></b> ";

                if (relacoesTrabalhoGovernanca.totalTrabalhadoresMIN) {
                    txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN + ", ";
                }

                if (relacoesTrabalhoGovernanca.totalTrabalhadoresMAX) {
                    txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX + ", ";
                }
            }
        }

        let espacosParticipacaoSocial = json_filtro.espacosParticipacaoSocial;

        if (espacosParticipacaoSocial) {
            if (espacosParticipacaoSocial.cd_conselho) {
                $.ajax({
                    url: rotas.Conselho_id(espacosParticipacaoSocial.cd_conselho),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Nome do Conselho:</i></b> " + data[0].tx_nome_conselho + ", ";
                        }
                    }
                });
            }

            if (espacosParticipacaoSocial.tx_nome_representante_conselho) {
                txt += "<b><i>Nome de representante conselho:</i></b> " + espacosParticipacaoSocial.tx_nome_representante_conselho + ", ";
            }

            if (espacosParticipacaoSocial.cd_tipo_participacao) {
                $.ajax({
                    url: rotas.Titularidade_id(espacosParticipacaoSocial.cd_tipo_participacao),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Titularidade:</i></b> " + data[0].tx_nome_tipo_participacao + ", ";
                        }
                    }
                });
            }

            if (espacosParticipacaoSocial.dt_data_inicio_conselho) {
                txt += "<b><i>Data de Início de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_inicio_conselho + ", ";
            }

            if (espacosParticipacaoSocial.dt_data_fim_conselho) {
                txt += "<b><i>Data de Fim de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_fim_conselho + ", ";
            }

            if (espacosParticipacaoSocial.cd_conferencia) {
                $.ajax({
                    url: rotas.Conferencia_id(espacosParticipacaoSocial.cd_conferencia),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Nome da Conferência:</i></b> " + data[0].tx_nome_conferencia + ", ";
                        }
                    }
                });
            }

            if (espacosParticipacaoSocial.cd_forma_participacao_conferencia) {
                $.ajax({
                    url: rotas.FormaParticipacaoConferencia_id(espacosParticipacaoSocial.cd_forma_participacao_conferencia),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Forma de Participação na Conferência:</i></b> " + data[0].tx_nome_forma_participacao_conferencia + ", ";
                        }
                    }
                });
            }

            if (espacosParticipacaoSocial.anoRealizacaoConferenciaMIN || espacosParticipacaoSocial.anoRealizacaoConferenciaMAX) {
                txt += "<b><i>Ano de Realização da Conferência</i></b> ";

                if (espacosParticipacaoSocial.anoRealizacaoConferenciaMIN) {
                    txt += "<b><i>maior que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMIN + ", ";
                }

                if (espacosParticipacaoSocial.anoRealizacaoConferenciaMAX) {
                    txt += "<b><i>menor que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMAX + ", ";
                }
            }
        }

        let projetos = json_filtro.projetos;

        if (projetos) {
            if (projetos.tx_nome_projeto) {
                txt += "<b><i>Nome do Projeto:</i></b> " + projetos.tx_nome_projeto + ", ";
            }

            if (projetos.cd_status_projeto) {
                $.ajax({
                    url: rotas.SituacaoProjeto_id(projetos.cd_status_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Situação do projeto:</i></b> " + data[0].tx_nome_status_projeto + ", ";
                        }
                    }
                });
            }

            if (projetos.dt_data_inicio_projeto) {
                txt += "<b><i>Data de Início Projeto:</i></b> " + projetos.dt_data_inicio_projeto + ", ";
            }

            if (projetos.dt_data_fim_projeto) {
                txt += "<b><i>Data de Fim Projeto:</i></b> " + projetos.dt_data_fim_projeto + ", ";
            }

            if (projetos.cd_abrangencia_projeto) {
                $.ajax({
                    url: rotas.AbrangenciaProjeto_id(projetos.cd_abrangencia_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Abrangência de atuação:</i></b> " + data[0].tx_nome_abrangencia_projeto + ", ";
                        }
                    }
                });
            }

            if (projetos.cd_zona_atuacao_projeto) {
                $.ajax({
                    url: rotas.ZonaAtuacaoProjeto_id(projetos.cd_zona_atuacao_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Zona de Atuação:</i></b> " + data[0].tx_nome_zona_atuacao + ", ";
                        }
                    }
                });
            }

            if (projetos.cd_origem_fonte_recursos_projeto) {
                $.ajax({
                    url: rotas.FontesRecursosProjeto_id(projetos.cd_origem_fonte_recursos_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            txt += "<b><i>Fontes de Recursos:</i></b> " + data[0].tx_nome_origem_fonte_recursos_projeto + ", ";
                        }
                    }
                });
            }

            if (projetos.cd_objetivo_projeto) {
                $.ajax({
                    url: rotas.Objetivos_ODS_id(projetos.cd_objetivo_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data) {
                            txt += "<b><i>Objetivos do Desenvolvimento Sustentável - ODS para Projeto:</i></b> " + data.tx_nome_objetivo_projeto + ", ";
                        }
                    }
                });
            }

            if (projetos.cd_meta_projeto) {
                $.ajax({
                    url: rotas.MetasById(projetos.cd_meta_projeto),
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    error: function (e) {
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function (data) {
                        if (data) {
                            txt += "<b><i>Metas Relacionadas ao ODS para projeto:</i></b> " + data.tx_nome_meta_projeto + ", ";
                        }
                    }
                });
            }

            if (projetos.tx_nome_financiador) {
                txt += "<b><i>Financiadores do Projeto:</i></b> " + projetos.tx_nome_financiador + ", ";
            }

            if (projetos.tx_nome_regiao_localizacao_projeto) {
                txt += "<b><i>Local de Execução:</i></b> " + projetos.tx_nome_regiao_localizacao_projeto + ", ";
            }

            if (projetos.tx_nome_publico_beneficiado) {
                txt += "<b><i>Público Beneficiado:</i></b> " + projetos.tx_nome_publico_beneficiado + ", ";
            }

            if (projetos.tx_nome_osc_parceira_projeto) {
                txt += "<b><i>OSC Parceiras:</i></b> " + projetos.tx_nome_osc_parceira_projeto + ", ";
            }

            if (projetos.ft_nome_projeto) {
                txt += "<b><i>Fonte Nome Projeto:</i></b> " + projetos.ft_nome_projeto + ", ";
            }

            if (projetos.totalBeneficiariosMIN || projetos.totalBeneficiariosMAX) {
                txt += "<b><i>Total de Beneficiários</i></b> ";

                if (projetos.totalBeneficiariosMIN) {
                    txt += "<b><i>maior que:</i></b> " + projetos.totalBeneficiariosMIN + ", ";
                }

                if (projetos.totalBeneficiariosMAX) {
                    txt += "<b><i>menor que:</i></b> " + projetos.totalBeneficiariosMAX + ", ";
                }
            }

            if (projetos.valorTotalMIN || projetos.valorTotalMAX) {
                txt += "<b><i>Valor Total Projeto</i></b> ";

                if (projetos.valorTotalMIN) {
                    txt += "<b><i>maior que:</i></b> " + projetos.valorTotalMIN + ", ";
                }

                if (projetos.valorTotalMAX) {
                    txt += "<b><i>menor que:</i></b> " + projetos.valorTotalMAX + ", ";
                }
            }

            if (projetos.valorRecebidoMIN || projetos.valorRecebidoMAX) {
                txt += "<b><i>Valor Recebido Projeto</i></b> ";

                if (projetos.valorRecebidoMIN) {
                    txt += "<b><i>maior que:</i></b> " + projetos.valorRecebidoMIN + ", ";
                }

                if (projetos.valorRecebidoMAX) {
                    txt += "<b><i>menor que:</i></b> " + projetos.valorRecebidoMAX + ", ";
                }
            }
        }

        let fontesRecursos = json_filtro.fontesRecursos;

        if (fontesRecursos) {
            if (fontesRecursos.anoFonteRecursoMIN || fontesRecursos.anoFonteRecursoMAX) {
                txt += "<b><i>Fontes de recursos anuais da OSC Ano</i></b> ";

                if (fontesRecursos.anoFonteRecursoMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.anoFonteRecursoMIN + ", ";
                }

                if (fontesRecursos.anoFonteRecursoMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.anoFonteRecursoMAX + ", ";
                }
            }

            if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN || fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX) {
                txt += "<b><i>Rendimentos financeiros de reservas ou contas correntes próprias</i></b> ";

                if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN + ", ";
                }

                if (fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX + ", ";
                }
            }

            if (fontesRecursos.rendimentosFundosPatrimoniaisMIN || fontesRecursos.rendimentosFundosPatrimoniaisMAX) {
                txt += "<b><i>Rendimentos de fundos patrimoniais</i></b> ";

                if (fontesRecursos.rendimentosFundosPatrimoniaisMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMIN + ", ";
                }

                if (fontesRecursos.rendimentosFundosPatrimoniaisMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMAX + ", ";
                }
            }

            if (fontesRecursos.mensalidadesContribuicoesAssociadosMIN || fontesRecursos.mensalidadesContribuicoesAssociadosMAX) {
                txt += "<b><i>Mensalidades ou contribuições de associados</i></b> ";

                if (fontesRecursos.mensalidadesContribuicoesAssociadosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMIN + ", ";
                }

                if (fontesRecursos.mensalidadesContribuicoesAssociadosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMAX + ", ";
                }
            }

            if (fontesRecursos.vendaBensDireitosMIN || fontesRecursos.vendaBensDireitosMAX) {
                txt += "<b><i>Venda de bens e direitos</i></b> ";

                if (fontesRecursos.vendaBensDireitosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaBensDireitosMIN + ", ";
                }

                if (fontesRecursos.vendaBensDireitosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaBensDireitosMAX + ", ";
                }
            }

            if (fontesRecursos.premiosRecebidosMIN || fontesRecursos.premiosRecebidosMAX) {
                txt += "<b><i>Prêmios recebidos</i></b> ";

                if (fontesRecursos.premiosRecebidosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.premiosRecebidosMIN + ", ";
                }

                if (fontesRecursos.premiosRecebidosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.premiosRecebidosMAX + ", ";
                }
            }

            if (fontesRecursos.vendaProdutosMIN || fontesRecursos.vendaProdutosMAX) {
                txt += "<b><i>Venda de produtos</i></b> ";

                if (fontesRecursos.vendaProdutosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaProdutosMIN + ", ";
                }

                if (fontesRecursos.vendaProdutosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaProdutosMAX + ", ";
                }
            }

            if (fontesRecursos.prestacaoServicosMIN || fontesRecursos.prestacaoServicosMAX) {
                txt += "<b><i>Prestação de serviços</i></b> ";

                if (fontesRecursos.prestacaoServicosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.prestacaoServicosMIN + ", ";
                }

                if (fontesRecursos.prestacaoServicosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.prestacaoServicosMAX + ", ";
                }
            }

            if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN || fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX) {
                txt += "<b><i>Empresas públicas ou sociedades de economia mista</i></b> ";

                if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN + ", ";
                }

                if (fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX + ", ";
                }
            }

            if (fontesRecursos.acordoOrganismosMultilateraisMIN || fontesRecursos.acordoOrganismosMultilateraisMAX) {
                txt += "<b><i>Acordo com organismos multilaterais</i></b> ";

                if (fontesRecursos.acordoOrganismosMultilateraisMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMIN + ", ";
                }

                if (fontesRecursos.acordoOrganismosMultilateraisMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaGovernoFederalMIN || fontesRecursos.parceriaGovernoFederalMAX) {
                txt += "<b><i>Transferências federais recebidas pela OSC</i></b> ";

                if (fontesRecursos.parceriaGovernoFederalMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoFederalMIN + ", ";
                }

                if (fontesRecursos.parceriaGovernoFederalMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoFederalMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaGovernoEstadualMIN || fontesRecursos.parceriaGovernoEstadualMAX) {
                txt += "<b><i>Parceria com o governo estadual</i></b> ";

                if (fontesRecursos.parceriaGovernoEstadualMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMIN + ", ";
                }

                if (fontesRecursos.parceriaGovernoEstadualMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaGovernoMunicipalMIN || fontesRecursos.parceriaGovernoMunicipalMAX) {
                txt += "<b><i>Parceria com o governo municipal</i></b> ";

                if (fontesRecursos.parceriaGovernoMunicipalMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMIN + ", ";
                }

                if (fontesRecursos.parceriaGovernoMunicipalMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMAX + ", ";
                }
            }

            if (fontesRecursos.acordoGovernosEstrangeirosMIN || fontesRecursos.acordoGovernosEstrangeirosMAX) {
                txt += "<b><i>Acordo com governos estrangeiros</i></b> ";

                if (fontesRecursos.acordoGovernosEstrangeirosMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMIN + ", ";
                }

                if (fontesRecursos.acordoGovernosEstrangeirosMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaOscBrasileirasMIN || fontesRecursos.parceriaOscBrasileirasMAX) {
                txt += "<b><i>Parceria com OSCs brasileiras</i></b> ";

                if (fontesRecursos.parceriaOscBrasileirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMIN + ", ";
                }

                if (fontesRecursos.parceriaOscBrasileirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaOscEstrangeirasMIN || fontesRecursos.parceriaOscEstrangeirasMAX) {
                txt += "<b><i>Parceria com OSCs estrangeiras</i></b> ";

                if (fontesRecursos.parceriaOscEstrangeirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMIN + ", ";
                }

                if (fontesRecursos.parceriaOscEstrangeirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX) {
                txt += "<b><i>Parceria com organizações religiosas brasileiras</i></b> ";

                if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN + ", ";
                }

                if (fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX + ", ";
                }
            }

            if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX) {
                txt += "<b><i>Parceria com organizações religiosas estrangeiras</i></b> ";

                if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN + ", ";
                }

                if (fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX + ", ";
                }
            }

            if (fontesRecursos.empresasPrivadasBrasileirasMIN || fontesRecursos.empresasPrivadasBrasileirasMAX) {
                txt += "<b><i>Empresas privadas brasileiras</i></b> ";

                if (fontesRecursos.empresasPrivadasBrasileirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMIN + ", ";
                }

                if (fontesRecursos.empresasPrivadasBrasileirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMAX + ", ";
                }
            }

            if (fontesRecursos.EmpresasEstrangeirasMIN || fontesRecursos.EmpresasEstrangeirasMAX) {
                txt += "<b><i>Empresas estrangeiras</i></b> ";

                if (fontesRecursos.EmpresasEstrangeirasMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMIN + ", ";
                }

                if (fontesRecursos.EmpresasEstrangeirasMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMAX + ", ";
                }
            }

            if (fontesRecursos.doacoesPessoaJuridicaMIN || fontesRecursos.doacoesPessoaJuridicaMAX) {
                txt += "<b><i>Doações de pessoa jurídica</i></b> ";

                if (fontesRecursos.doacoesPessoaJuridicaMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMIN + ", ";
                }

                if (fontesRecursos.doacoesPessoaJuridicaMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMAX + ", ";
                }
            }

            if (fontesRecursos.doacoesPessoaFisicaMIN || fontesRecursos.doacoesPessoaFisicaMAX) {
                txt += "<b><i>Doações de pessoa física</i></b> ";

                if (fontesRecursos.doacoesPessoaFisicaMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMIN + ", ";
                }

                if (fontesRecursos.doacoesPessoaFisicaMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMAX + ", ";
                }
            }

            if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX) {
                txt += "<b><i>Doações recebidas na forma de produtos e serviços (com NF)</i></b> ";

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN + ", ";
                }

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX + ", ";
                }
            }

            if (fontesRecursos.voluntariadoMIN || fontesRecursos.voluntariadoMAX) {
                txt += "<b><i>Voluntariado</i></b> ";

                if (fontesRecursos.voluntariadoMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.voluntariadoMIN + ", ";
                }

                if (fontesRecursos.voluntariadoMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.voluntariadoMAX + ", ";
                }
            }

            if (fontesRecursos.isencoesMIN || fontesRecursos.isencoesMAX) {
                txt += "<b><i>Isenções:</i></b> ";

                if (fontesRecursos.isencoesMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.isencoesMIN + ", ";
                }

                if (fontesRecursos.isencoesMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.isencoesMAX + ", ";
                }
            }

            if (fontesRecursos.imunidadesMIN || fontesRecursos.imunidadesMAX) {
                txt += "<b><i>Imunidades</i></b> ";

                if (fontesRecursos.imunidadesMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.imunidadesMIN + ", ";
                }

                if (fontesRecursos.imunidadesMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.imunidadesMAX + ", ";
                }
            }

            if (fontesRecursos.bensRecebidosDireitoUsoMIN || fontesRecursos.bensRecebidosDireitoUsoMAX) {
                txt += "<b><i>Bens recebidos em direito de uso</i></b> ";

                if (fontesRecursos.bensRecebidosDireitoUsoMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMIN + ", ";
                }

                if (fontesRecursos.bensRecebidosDireitoUsoMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMAX + ", ";
                }
            }

            if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX) {
                txt += "<b><i>Doações recebidas na forma de produtos e serviços (sem NF)</i></b> ";

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN) {
                    txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN + ", ";
                }

                if (fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX) {
                    txt += "<b><i>menor que:</i></b> " + fontesRecursos.valorMAX + ", ";
                }
            }
        }

        let idh_json = json_filtro.IDH;

        if (idh_json) {
            if (idh_json.IDH_Municipal) {
                txt += "<b><i>Índice de Desenvolvimento Humano:</i></b> IDH Municipal - Faixa: ";

                if (idh_json.baixo) {
                    txt += "baixa, ";
                }

                if (idh_json.medio) {
                    txt += "médio, ";
                }
                if (idh_json.alto) {
                    txt += "alto, ";
                }
            }
        }

        return txt;
        //$("#filtros p").html(txt);
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.state.filtros,
            React.createElement('br', null),
            React.createElement('br', null)
        );
    }
}