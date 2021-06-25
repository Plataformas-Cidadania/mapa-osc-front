class Recursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anosRecursos: [],
            dataRecursos: [],
            dataSemRecursos: [],
            recursos: {
                1: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 158,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 159,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 160,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 161,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 162,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 157,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC'
                    }
                },
                2: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 163,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 164,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 165,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 166,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 167,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 168,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras'
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 169,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica'
                    },
                    7: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 170,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa física'
                    },
                    8: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 171,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)'
                    }
                },
                3: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 179,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 180,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 181,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 182,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 183,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                    }
                },
                4: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 172,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 173,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 174,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 175,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Prêmios recebidos'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 176,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Venda de produtos'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 177,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 178,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Venda de bens e direitos'
                    }
                }
            },

            loading: false,
            ano: null,
            showMsg: false,
            msg: '',
            loadingAnos: false,
            addAnos: false,
            campoAno: 0,
            activeIncert: false,
            activeMsg: false,
            insertMsg: false,

            item_recursos_publicos: false,
            item_recursos_privados: false,
            item_recursos_financeiros: false,
            item_recursos_proprios: false,
            select_recursos_id: 0,

            tourRecursos1: true,
            tourRecursos2: false,
            tourRecursos3: false,
            tourRecursos4: false
        };

        this.getAnos = this.getAnos.bind(this);
        this.callRecursos = this.callRecursos.bind(this);
        this.callRecursosValue = this.callRecursosValue.bind(this);
        this.callAddAnos = this.callAddAnos.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callPushAnos = this.callPushAnos.bind(this);

        this.getSemRecursos = this.getSemRecursos.bind(this);
        this.addSemRecursos = this.addSemRecursos.bind(this);

        this.desativarTour = this.desativarTour.bind(this);
    }

    desativarTour(acao) {

        console.log(acao);

        if (acao === 1) {
            this.setState({ tourRecursos1: false });
            this.setState({ tourRecursos2: true });
        }
        if (acao === 2) {
            this.setState({ tourRecursos2: false });
            this.setState({ tourRecursos3: true });
        }
        if (acao === 3) {
            this.setState({ tourRecursos3: false });
            this.setState({ tourRecursos4: true });
        }
        if (acao === 0) {
            this.setState({
                tourRecursos1: false,
                tourRecursos2: false,
                tourRecursos3: false,
                tourRecursos4: false
            });
        }
    }

    getAnos(acao) {

        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/anos_recursos/' + this.props.id,
            cache: false,
            success: function (data) {
                const data3 = data;
                var data = Object.values(data);
                const data2 = data;
                let campoAno = this.state.campoAno;

                let dataAntes = data.length;

                if (data.indexOf(parseInt(campoAno)) === -1) {
                    if (acao == true && campoAno > 0) {
                        data.push(this.state.campoAno);
                    }
                }

                let dataDepois = data.length;
                let activeIncert = dataAntes !== dataDepois;

                this.setState({
                    loading: false,
                    anosRecursos: data,
                    button: true,
                    activeIncert: activeIncert,
                    insertMsg: !data2
                }, function () {
                    let teste = data3.shift();
                    this.callRecursos(teste);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callTour() {
        this.setState({ loading: false });
    }

    callPushAnos() {
        this.callAddAnos(false);
        this.getAnos(true);
    }

    callRecursos(ano) {
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/recursos/' + ano + '/' + this.props.id,
            success: function (data) {
                this.setState({ dataRecursos: data[ano], ano: ano });
                this.callRecursosValue();
                this.getSemRecursos();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callAddAnos(acao) {
        let activeMsg = false;
        if (this.state.activeIncert) {
            activeMsg = true;
        }
        if (this.state.activeIncert === true && acao === false) {
            activeMsg = false;
        }
        if (this.state.activeIncert === true && acao === true) {
            this.getAnos(true);
        }

        this.setState({ addAnos: acao, activeMsg: activeMsg });
    }

    callRecursosValue() {

        let recursos = {
            1: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 158,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 159,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 160,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 161,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 162,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 157,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC'
                }
            },
            2: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 163,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 164,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 165,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 166,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 167,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 168,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras'
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 169,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica'
                },
                7: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 170,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa física'
                },
                8: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 171,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)'
                }
            },
            3: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 179,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 180,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 181,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 182,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 183,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                }
            },
            4: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 172,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 173,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 174,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 175,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Prêmios recebidos'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 176,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Venda de produtos'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 177,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 178,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Venda de bens e direitos'
                }
            }
        };

        if (this.state.dataRecursos) {
            if (this.state.dataRecursos[1] !== undefined) {
                for (let i in this.state.dataRecursos[1]) {
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 158) {
                        recursos[1][0].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][0].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 159) {
                        recursos[1][1].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][1].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 160) {
                        recursos[1][2].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][2].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 161) {
                        recursos[1][3].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][3].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 162) {
                        recursos[1][4].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][4].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[1][i].cd_fonte_recurso_osc === 157) {
                        recursos[1][5].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][5].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if (this.state.dataRecursos[2] !== undefined) {
                for (let i in this.state.dataRecursos[2]) {
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 163) {
                        recursos[2][0].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][0].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 164) {
                        recursos[2][1].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][1].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 165) {
                        recursos[2][2].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][2].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 166) {
                        recursos[2][3].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][3].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 167) {
                        recursos[2][4].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][4].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 168) {
                        recursos[2][5].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][5].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 169) {
                        recursos[2][6].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][6].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 170) {
                        recursos[2][7].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][7].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[2][i].cd_fonte_recurso_osc === 171) {
                        recursos[2][8].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][8].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if (this.state.dataRecursos[3] !== undefined) {
                for (let i in this.state.dataRecursos[3]) {
                    if (this.state.dataRecursos[3][i].cd_fonte_recurso_osc === 179) {
                        recursos[3][0].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][0].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[3][i].cd_fonte_recurso_osc === 180) {
                        recursos[3][1].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][1].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[3][i].cd_fonte_recurso_osc === 181) {
                        recursos[3][2].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][2].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[3][i].cd_fonte_recurso_osc === 182) {
                        recursos[3][3].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][3].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[3][i].cd_fonte_recurso_osc === 183) {
                        recursos[3][4].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][4].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if (this.state.dataRecursos[4] !== undefined) {
                for (let i in this.state.dataRecursos[4]) {
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 172) {
                        recursos[4][0].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][0].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 173) {
                        recursos[4][1].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][1].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 174) {
                        recursos[4][2].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][2].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 175) {
                        recursos[4][3].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][3].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 176) {
                        recursos[4][4].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][4].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 177) {
                        recursos[4][5].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][5].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if (this.state.dataRecursos[4][i].cd_fonte_recurso_osc === 178) {
                        recursos[4][6].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][6].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                }
            }
        }
        this.setState({ recursos: recursos });
    }

    componentDidMount() {
        this.getAnos();
        this.getSemRecursos();
        if (localStorage.getItem('tourRecursos') === "false") {
            this.setState({
                tourRecursos1: false,
                tourRecursos2: false,
                tourRecursos3: false,
                tourRecursos4: false
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ campoAno: value });
    }

    getSemRecursos() {
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/sem_recursos/' + this.state.ano + '/' + this.props.id,
            success: function (data) {
                /*/////////////////////////////////////*/
                let recursos_publicos = {
                    origem: {
                        cd_origem_fonte_recursos_osc: 0
                    }
                };

                let recursos_privados = {
                    origem: {
                        cd_origem_fonte_recursos_osc: 0
                    }
                };

                let recursos_financeiros = {
                    origem: {
                        cd_origem_fonte_recursos_osc: 0
                    }
                };

                let recursos_proprios = {
                    origem: {
                        cd_origem_fonte_recursos_osc: 0
                    }
                };

                if (data[this.state.ano] !== undefined) {
                    if (data[this.state.ano].length > 0) {
                        for (let i in data[this.state.ano]) {
                            if (data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc === 1) {
                                recursos_publicos = {
                                    origem: {
                                        cd_origem_fonte_recursos_osc: data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc
                                    }
                                };
                            }
                            if (data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc === 2) {
                                recursos_privados = {
                                    origem: {
                                        cd_origem_fonte_recursos_osc: data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc
                                    }
                                };
                            }
                            if (data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc === 3) {
                                recursos_financeiros = {
                                    origem: {
                                        cd_origem_fonte_recursos_osc: data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc
                                    }
                                };
                            }
                            if (data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc === 4) {
                                recursos_proprios = {
                                    origem: {
                                        cd_origem_fonte_recursos_osc: data[this.state.ano][i].origem.cd_origem_fonte_recursos_osc
                                    }
                                };
                            }
                        }
                    }
                }
                let item_recursos_publicos = recursos_publicos.origem.cd_origem_fonte_recursos_osc === 1 ? true : false;
                let item_recursos_privados = recursos_privados.origem.cd_origem_fonte_recursos_osc === 2 ? true : false;
                let item_recursos_financeiros = recursos_financeiros.origem.cd_origem_fonte_recursos_osc === 3 ? true : false;
                let item_recursos_proprios = recursos_proprios.origem.cd_origem_fonte_recursos_osc === 4 ? true : false;

                /*/////////////////////////////////////*/

                this.setState({
                    item_recursos_publicos: item_recursos_publicos,
                    item_recursos_privados: item_recursos_privados,
                    item_recursos_financeiros: item_recursos_financeiros,
                    item_recursos_proprios: item_recursos_proprios
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    addSemRecursos(cd_origem, status) {

        let item_recursos_publicos = !this.state.item_recursos_publicos;
        let item_recursos_privados = !this.state.item_recursos_privados;
        let item_recursos_financeiros = !this.state.item_recursos_financeiros;
        let item_recursos_proprios = !this.state.item_recursos_proprios;

        if (status === true) {
            $.ajax({
                method: 'POST',
                data: {
                    id_osc: this.props.id,
                    ano: this.state.ano,
                    ft_nao_possui: 'Representante de OSC',
                    cd_origem_fonte_recursos_osc: cd_origem
                },
                cache: false,
                url: getBaseUrl2 + 'osc/sem_recursos',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function (data) {
                    this.callRecursos(this.state.ano);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });
        } else {

            $.ajax({
                method: 'DELETE',
                cache: false,
                url: getBaseUrl2 + 'osc/sem_recursos/' + this.props.id + '/' + this.state.ano + '/' + cd_origem,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                success: function (data) {
                    this.callRecursos(this.state.ano);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });
        }

        this.setState({
            item_recursos_publicos: item_recursos_publicos,
            item_recursos_privados: item_recursos_privados,
            item_recursos_financeiros: item_recursos_financeiros,
            item_recursos_proprios: item_recursos_proprios,
            select_recursos_id: cd_origem });
    }

    render() {
        let anosRecursos = null;

        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.callRecursos(item),
                        className: this.state.ano == item ? 'btn btn-primary' : 'btn btn-light',
                        style: { marginRight: '5px' }
                    },
                    item
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'title-user-area' },
                                React.createElement(
                                    'div',
                                    { className: 'mn-accordion-icon' },
                                    React.createElement('i', { className: 'fas fa-boxes', 'aria-hidden': 'true' })
                                ),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Fontes de recursos anuais da OSC'
                                ),
                                React.createElement('hr', null),
                                React.createElement('br', null)
                            ),
                            React.createElement(Tour, {
                                position: 0 //0 pular | 1 finalizar 2 1 none
                                , passo: 1,
                                txt: 'Para descrever os recursos financeiros público ou privado recebidos pela sua OSC, escolha o ano de referência.',
                                top: '',
                                right: '',
                                display: this.state.tourRecursos1,
                                desativarTour: this.desativarTour
                            }),
                            React.createElement(
                                'div',
                                { style: { fontSize: "13px" } },
                                'Anos: '
                            ),
                            React.createElement(Tour, {
                                position: 2 //0 pular | 1 finalizar | 2 none
                                , passo: 2,
                                txt: 'Caso não exista o ano desejado, você pode adicionar.',
                                top: '-60px',
                                right: '-200px',
                                float: 'right',
                                display: this.state.tourRecursos2,
                                desativarTour: this.desativarTour
                            }),
                            React.createElement(
                                'div',
                                { className: 'btn-group', role: 'group', 'aria-label': 'Anos' },
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loadingAnos ? '' : 'none' } },
                                    React.createElement('i', { className: 'fas fa-spinner fa-spin' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loadingAnos ? 'none' : '' } },
                                    React.createElement(
                                        'div',
                                        { style: { float: 'left', marginBottom: '10px' } },
                                        anosRecursos
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.activeIncert ? "none" : "", float: 'left', width: '105px' } },
                                        React.createElement('input', { className: 'form-control form-p', type: 'text', placeholder: 'Ano', name: 'campoAno', style: { display: this.state.addAnos ? "" : "none" }, onChange: this.handleInputChange, maxLength: '4' }),
                                        React.createElement(
                                            'div',
                                            { className: 'icon-forms' },
                                            React.createElement(
                                                'a',
                                                { onClick: this.callPushAnos, style: { display: this.state.addAnos ? "" : "none", marginRight: '10px' }, className: 'text-success cursor' },
                                                React.createElement('i', { className: 'far fa-save' })
                                            ),
                                            React.createElement(
                                                'a',
                                                { onClick: () => this.callAddAnos(false), style: { display: this.state.addAnos ? "" : "none" }, className: 'text-danger cursor' },
                                                React.createElement('i', { className: 'far fa-times-circle' })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'a',
                                        { className: 'cursor', onClick: () => this.callAddAnos(true), style: { display: this.state.addAnos ? "none" : "", top: '4px', position: 'relative' } },
                                        React.createElement('i', { className: 'fas fa-plus-circle fa-2x tx-pri' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: this.state.activeMsg == true ? "" : "none" } },
                                        React.createElement(
                                            'div',
                                            { className: 'alert alert-danger', style: { display: this.state.activeIncert ? "" : "none", marginTop: '10px', clear: 'both' } },
                                            'Para adicionar mais um ano, ser\xE1 preciso informar uma contribui\xE7\xE3o pertinente ao ano! ',
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'a',
                                                { type: 'button', className: 'btn-primary btn-xs float-right', onClick: () => this.callAddAnos(false) },
                                                'Continuar'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'h2',
                                        { style: { float: 'left' } },
                                        'Recursos p\xFAblicos'
                                    ),
                                    React.createElement(Tour, {
                                        position: 2 //0 pular | 1 finalizar | 2 none
                                        , passo: 3,
                                        txt: 'Preencha os campos, digitando as informações. Apos digitar assim que sair do compo será salvo altomaticamente!',
                                        top: '-120px',
                                        right: '',
                                        float: '',
                                        display: this.state.tourRecursos3,
                                        desativarTour: this.desativarTour
                                    }),
                                    React.createElement(
                                        'div',
                                        { style: { float: 'right' } },
                                        React.createElement(Tour, {
                                            position: 1 //0 pular | 1 finalizar | 2 none
                                            , passo: 4,
                                            txt: 'Se não tiver informações sobre esse tema, há a opção de clicar na caixa "Não possui"',
                                            top: '-170px',
                                            right: '-240px',
                                            float: 'right',
                                            display: this.state.tourRecursos4,
                                            desativarTour: this.desativarTour
                                        }),
                                        React.createElement(
                                            'div',
                                            { className: 'custom-control custom-checkbox text-center' },
                                            React.createElement(
                                                'div',
                                                { className: 'cursor', onClick: () => this.addSemRecursos(1, !this.state.item_recursos_publicos) },
                                                React.createElement('div', { className: 'box-checkbox', style: { backgroundColor: this.state.item_recursos_publicos ? '#3A559B' : '#FFFFFF' } }),
                                                ' N\xE3o possui'
                                            )
                                        )
                                    ),
                                    React.createElement('hr', { style: { clear: 'both' } })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'row', style: { display: this.state.item_recursos_publicos ? 'none' : '' } },
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][0].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][0].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][0].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][0].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][0].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][1].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][1].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][1].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][1].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][1].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][2].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][2].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][2].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][2].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][2].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][3].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][3].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][3].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][3].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][3].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][4].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][4].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][4].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][4].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][4].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[1][5].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[1][5].cd_fonte_recurso_osc,
                                            name: this.state.recursos[1][5].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[1][5].nr_valor_recursos_osc),
                                            txt: this.state.recursos[1][5].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        { style: { float: 'left' } },
                                        'Recursos privados'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { className: 'custom-control custom-checkbox text-center' },
                                            React.createElement(
                                                'div',
                                                { className: 'cursor', onClick: () => this.addSemRecursos(2, !this.state.item_recursos_privados) },
                                                React.createElement('div', { className: 'box-checkbox', style: { backgroundColor: this.state.item_recursos_privados ? '#3A559B' : '#FFFFFF' } }),
                                                ' N\xE3o possui'
                                            )
                                        )
                                    ),
                                    React.createElement('hr', { style: { clear: 'both' } })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'row', style: { display: this.state.item_recursos_privados ? 'none' : '' } },
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][0].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][0].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][0].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][0].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][0].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][1].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][1].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][1].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][1].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][1].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][2].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][2].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][2].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][2].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][2].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][3].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][3].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][3].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][3].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][3].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][4].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][4].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][4].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][4].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][4].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][5].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][5].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][5].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][5].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][5].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][6].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][6].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][6].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][6].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][6].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][7].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][7].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][7].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][7].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][7].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[2][8].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[2][8].cd_fonte_recurso_osc,
                                            name: this.state.recursos[2][8].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[2][8].nr_valor_recursos_osc),
                                            txt: this.state.recursos[2][8].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        { style: { float: 'left' } },
                                        'Recursos n\xE3o financeiros'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { className: 'custom-control custom-checkbox text-center' },
                                            React.createElement(
                                                'div',
                                                { className: 'cursor', onClick: () => this.addSemRecursos(3, !this.state.item_recursos_financeiros) },
                                                React.createElement('div', { className: 'box-checkbox', style: { backgroundColor: this.state.item_recursos_financeiros ? '#3A559B' : '#FFFFFF' } }),
                                                ' N\xE3o possui'
                                            )
                                        )
                                    ),
                                    React.createElement('hr', { style: { clear: 'both' } })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'row', style: { display: this.state.item_recursos_financeiros ? 'none' : '' } },
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[3][0].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[3][0].cd_fonte_recurso_osc,
                                            name: this.state.recursos[3][0].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[3][0].nr_valor_recursos_osc),
                                            txt: this.state.recursos[3][0].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[3][1].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[3][1].cd_fonte_recurso_osc,
                                            name: this.state.recursos[3][1].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[3][1].nr_valor_recursos_osc),
                                            txt: this.state.recursos[3][1].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[3][2].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[3][2].cd_fonte_recurso_osc,
                                            name: this.state.recursos[3][2].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[3][2].nr_valor_recursos_osc),
                                            txt: this.state.recursos[3][2].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[3][3].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[3][3].cd_fonte_recurso_osc,
                                            name: this.state.recursos[3][3].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[3][3].nr_valor_recursos_osc),
                                            txt: this.state.recursos[3][3].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[3][4].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[3][4].cd_fonte_recurso_osc,
                                            name: this.state.recursos[3][4].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[3][4].nr_valor_recursos_osc),
                                            txt: this.state.recursos[3][4].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        { style: { float: 'left' } },
                                        'Recursos pro\u0301prios'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { float: 'right' } },
                                        React.createElement(
                                            'div',
                                            { className: 'custom-control custom-checkbox text-center' },
                                            React.createElement(
                                                'div',
                                                { className: 'cursor', onClick: () => this.addSemRecursos(4, !this.state.item_recursos_proprios) },
                                                React.createElement('div', { className: 'box-checkbox', style: { backgroundColor: this.state.item_recursos_proprios ? '#3A559B' : '#FFFFFF' } }),
                                                ' N\xE3o possui'
                                            )
                                        )
                                    ),
                                    React.createElement('hr', { style: { clear: 'both' } })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'row', style: { display: this.state.item_recursos_proprios ? 'none' : '' } },
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][0].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][0].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][0].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][0].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][0].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][1].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][1].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][1].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][1].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][1].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][2].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][2].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][2].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][2].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][2].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][3].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][3].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][3].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][3].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][3].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][4].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][4].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][4].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][4].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][4].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][5].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][5].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][5].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][5].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][5].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        }),
                                        React.createElement(Recurso, {
                                            id: this.state.recursos[4][6].id_recursos_osc,
                                            id_osc: this.props.id,
                                            cd: this.state.recursos[4][6].cd_fonte_recurso_osc,
                                            name: this.state.recursos[4][6].cd_fonte_recurso_osc,
                                            value: formatarMoeda(this.state.recursos[4][6].nr_valor_recursos_osc),
                                            txt: this.state.recursos[4][6].tx_nome_fonte_recursos_osc,
                                            ano: this.state.ano + '-01-01'
                                        })
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'space' })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Recursos, { id: id }), document.getElementById('recursos'));