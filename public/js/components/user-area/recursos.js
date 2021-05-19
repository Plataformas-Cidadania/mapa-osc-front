class Recursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anosRecursos: [],
            dataRecursos: [],
            recursos: {
                1: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 158,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 159,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 160,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 161,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 162,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 157,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC'
                    }
                },
                2: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 163,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 164,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 165,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 166,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 167,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 168,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras'
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 169,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica'
                    },
                    7: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 170,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa física'
                    },
                    8: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 171,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)'
                    }
                },
                3: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 179,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 180,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 181,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 182,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 183,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                    }
                },
                4: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 172,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais'
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 173,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas'
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 174,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados'
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 175,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Prêmios recebidos'
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 176,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Venda de produtos'
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 177,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 178,
                        'nr_valor_recursos_osc': null,
                        'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
                    }
                }
            },

            loading: false,
            ano: 2010,
            showMsg: false,
            msg: '',
            loadingAnos: false,
            addAnos: false,
            campoAno: 0

        };

        this.getAnos = this.getAnos.bind(this);
        this.callRecursos = this.callRecursos.bind(this);
        this.callRecursosValue = this.callRecursosValue.bind(this);
        this.callAddAnos = this.callAddAnos.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callPushAnos = this.callPushAnos.bind(this);
    }

    getAnos(acao) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/anos_recursos/789809',
            cache: false,
            success: function (data) {
                if (acao == true) {
                    console.log('antes', data);
                    data.push({ 'dt_ano_recursos_osc': this.state.campoAno });

                    console.log('depois', data);
                }

                this.setState({ loading: false, anosRecursos: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callPushAnos() {
        this.getAnos(true);
    }

    callRecursos(ano) {
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/recursos/' + ano + '/789809',
            success: function (data) {
                this.setState({ dataRecursos: data[ano], ano: ano });
                this.callRecursosValue();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callAddAnos() {
        let addAnos = !this.state.addAnos;
        this.setState({ addAnos: addAnos });
    }

    callRecursosValue() {

        let recursos = {
            1: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 158,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 159,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 160,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 161,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 162,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 157,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC'
                }
            },
            2: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 163,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 164,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 165,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 166,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 167,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 168,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras'
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 169,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica'
                },
                7: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 170,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa física'
                },
                8: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 171,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)'
                }
            },
            3: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 179,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 180,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 181,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 182,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 183,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras'
                }
            },
            4: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 172,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais'
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 173,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas'
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 174,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados'
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 175,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Prêmios recebidos'
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 176,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Venda de produtos'
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 177,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 178,
                    'nr_valor_recursos_osc': null,
                    'tx_nome_fonte_recursos_osc': 'Prestação de serviços'
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
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ campoAno: value });
        /*const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
         let form = this.state.form;
        form[name] = value;
         this.setState({form: form});*/
    }

    render() {
        let anosRecursos = null;
        if (this.state.anosRecursos) {
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return React.createElement(
                    'div',
                    { key: "anos_" + index, id: "anos_" + index,
                        onClick: () => this.callRecursos(item.dt_ano_recursos_osc),
                        className: this.state.ano == item.dt_ano_recursos_osc ? 'btn btn-primary' : 'btn btn-light',
                        style: { marginRight: '5px' }
                    },
                    item.dt_ano_recursos_osc
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
                            React.createElement(
                                'div',
                                { style: { fontSize: "13px" } },
                                'Anos: '
                            ),
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
                                    anosRecursos,
                                    React.createElement(
                                        'a',
                                        { className: 'cursor', onClick: this.callAddAnos, style: { display: this.state.addAnos ? "none" : "", top: 7, position: 'relative' } },
                                        React.createElement('i', { className: 'fas fa-plus-circle fa-2x tx-pri' })
                                    ),
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement('input', { className: 'form-control form-p', type: 'text', placeholder: 'Ano', name: 'campoAno', style: { display: this.state.addAnos ? "" : "none" }, onChange: this.handleInputChange }),
                                    React.createElement(
                                        'a',
                                        { onClick: this.callPushAnos, style: { display: this.state.addAnos ? "" : "none", marginRight: '10px' }, className: 'text-success cursor' },
                                        'adicionar'
                                    ),
                                    React.createElement(
                                        'a',
                                        { onClick: this.callAddAnos, style: { display: this.state.addAnos ? "" : "none" }, className: 'text-danger cursor' },
                                        'cancelar'
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
                                        null,
                                        'Recursos p\xFAblicos'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][0].id_recursos_osc,
                                    cd: this.state.recursos[1][0].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][0].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][0].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][0].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][1].id_recursos_osc,
                                    cd: this.state.recursos[1][1].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][1].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][1].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][1].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][2].id_recursos_osc,
                                    cd: this.state.recursos[1][2].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][2].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][2].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][2].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][3].id_recursos_osc,
                                    cd: this.state.recursos[1][3].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][3].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][3].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][3].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][4].id_recursos_osc,
                                    cd: this.state.recursos[1][4].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][4].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][4].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][4].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[1][5].id_recursos_osc,
                                    cd: this.state.recursos[1][5].cd_fonte_recurso_osc,
                                    name: this.state.recursos[1][5].cd_fonte_recurso_osc,
                                    value: this.state.recursos[1][5].nr_valor_recursos_osc,
                                    txt: this.state.recursos[1][5].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos privados'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][0].id_recursos_osc,
                                    cd: this.state.recursos[2][0].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][0].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][0].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][0].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][1].id_recursos_osc,
                                    cd: this.state.recursos[2][1].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][1].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][1].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][1].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][2].id_recursos_osc,
                                    cd: this.state.recursos[2][2].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][2].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][2].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][2].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][3].id_recursos_osc,
                                    cd: this.state.recursos[2][3].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][3].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][3].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][3].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][4].id_recursos_osc,
                                    cd: this.state.recursos[2][4].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][4].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][4].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][4].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][5].id_recursos_osc,
                                    cd: this.state.recursos[2][5].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][5].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][5].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][5].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][6].id_recursos_osc,
                                    cd: this.state.recursos[2][6].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][6].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][6].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][6].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][7].id_recursos_osc,
                                    cd: this.state.recursos[2][7].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][7].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][7].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][7].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[2][8].id_recursos_osc,
                                    cd: this.state.recursos[2][8].cd_fonte_recurso_osc,
                                    name: this.state.recursos[2][8].cd_fonte_recurso_osc,
                                    value: this.state.recursos[2][8].nr_valor_recursos_osc,
                                    txt: this.state.recursos[2][8].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos n\xE3o financeiros'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[3][0].id_recursos_osc,
                                    cd: this.state.recursos[3][0].cd_fonte_recurso_osc,
                                    name: this.state.recursos[3][0].cd_fonte_recurso_osc,
                                    value: this.state.recursos[3][0].nr_valor_recursos_osc,
                                    txt: this.state.recursos[3][0].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[3][1].id_recursos_osc,
                                    cd: this.state.recursos[3][1].cd_fonte_recurso_osc,
                                    name: this.state.recursos[3][1].cd_fonte_recurso_osc,
                                    value: this.state.recursos[3][1].nr_valor_recursos_osc,
                                    txt: this.state.recursos[3][1].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[3][2].id_recursos_osc,
                                    cd: this.state.recursos[3][2].cd_fonte_recurso_osc,
                                    name: this.state.recursos[3][2].cd_fonte_recurso_osc,
                                    value: this.state.recursos[3][2].nr_valor_recursos_osc,
                                    txt: this.state.recursos[3][2].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[3][3].id_recursos_osc,
                                    cd: this.state.recursos[3][3].cd_fonte_recurso_osc,
                                    name: this.state.recursos[3][3].cd_fonte_recurso_osc,
                                    value: this.state.recursos[3][3].nr_valor_recursos_osc,
                                    txt: this.state.recursos[3][3].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[3][4].id_recursos_osc,
                                    cd: this.state.recursos[3][4].cd_fonte_recurso_osc,
                                    name: this.state.recursos[3][4].cd_fonte_recurso_osc,
                                    value: this.state.recursos[3][4].nr_valor_recursos_osc,
                                    txt: this.state.recursos[3][4].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Recursos pro\u0301prios'
                                    ),
                                    React.createElement('hr', null)
                                ),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][0].id_recursos_osc,
                                    cd: this.state.recursos[4][0].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][0].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][0].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][0].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][1].id_recursos_osc,
                                    cd: this.state.recursos[4][1].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][1].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][1].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][1].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][2].id_recursos_osc,
                                    cd: this.state.recursos[4][2].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][2].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][2].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][2].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][3].id_recursos_osc,
                                    cd: this.state.recursos[4][3].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][3].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][3].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][3].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][4].id_recursos_osc,
                                    cd: this.state.recursos[4][4].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][4].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][4].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][4].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][5].id_recursos_osc,
                                    cd: this.state.recursos[4][5].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][5].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][5].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][5].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                }),
                                React.createElement(Recurso, {
                                    id: this.state.recursos[4][6].id_recursos_osc,
                                    cd: this.state.recursos[4][6].cd_fonte_recurso_osc,
                                    name: this.state.recursos[4][6].cd_fonte_recurso_osc,
                                    value: this.state.recursos[4][6].nr_valor_recursos_osc,
                                    txt: this.state.recursos[4][6].tx_nome_fonte_recursos_osc,
                                    ano: this.state.ano + '-01-01'
                                })
                            )
                        ),
                        React.createElement('div', { className: 'space' })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Recursos, null), document.getElementById('recursos'));