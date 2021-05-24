class Recursos extends React.Component{
    constructor(props){
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
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual',
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc':  159,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal',
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 160,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais',
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 161,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros',
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 162,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista',
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 157,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC',
                    },
                },
                2: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 163,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras',
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc':  164,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras',
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 165,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras',
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 166,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras',
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 167,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras',
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 168,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras',
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 169,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica',
                    },
                    7: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 170,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações de pessoa física',
                    },
                    8: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 171,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)',
                    },
                },
                3: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 179,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras',
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc':  180,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras',
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 181,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras',
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 182,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras',
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 183,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras',
                    },
                },
                4: {
                    0: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 172,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais',
                    },
                    1: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc':  173,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas',
                    },
                    2: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 174,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados',
                    },
                    3: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 175,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Prêmios recebidos',
                    },
                    4: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 176,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Venda de produtos',
                    },
                    5: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 177,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Prestação de serviços',
                    },
                    6: {
                        'id_recursos_osc': 0,
                        'cd_fonte_recurso_osc': 178,
                        'nr_valor_recursos_osc': '',
                        'tx_nome_fonte_recursos_osc': 'Prestação de serviços',
                    },
                },
            },

            loading: false,
            ano: 2010,
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
        };


        this.getAnos = this.getAnos.bind(this);
        this.callRecursos = this.callRecursos.bind(this);
        this.callRecursosValue = this.callRecursosValue.bind(this);
        this.callAddAnos = this.callAddAnos.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callPushAnos = this.callPushAnos.bind(this);


        this.getSemRecursos = this.getSemRecursos.bind(this);
        this.addSemRecursos = this.addSemRecursos.bind(this);

    }

    getAnos(acao){

        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2+'osc/anos_recursos/789809',
            cache: false,
            success: function (data) {
                const  data2 =  data;
                let  campoAno =  this.state.campoAno;
                function isCherries(data2) {
                    return data2.dt_ano_recursos_osc === campoAno;
                }

                let dataAntes = data.length;

                if(data2.find(isCherries)==undefined) {
                    if (acao == true && campoAno > 0) {
                        data.push({'dt_ano_recursos_osc': this.state.campoAno, id_osc: 789809});
                    }
                }
                let dataDepois = data.length;
                let activeIncert = dataAntes !== dataDepois;

                this.setState({
                    loading: false,
                    anosRecursos: data,
                    button:true,
                    activeIncert: activeIncert,
                    insertMsg: !data2.find(isCherries)==undefined,
                })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callPushAnos(){
        this.callAddAnos(false);
        this.getAnos(true);
    }

    callRecursos(ano){
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2+'osc/recursos/'+ano+'/789809',
            success: function (data) {
                this.setState({dataRecursos: data[ano], ano: ano})
                this.callRecursosValue();
                this.getSemRecursos();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callAddAnos(acao){
        let activeMsg = false;
        //console.log('1');
        if(this.state.activeIncert){
            //console.log('2');
            activeMsg = true;
        }
        if(this.state.activeIncert === true && acao === false){
            //console.log('3');

            activeMsg = false;
        }
        if(this.state.activeIncert === true && acao === true){
            //console.log('4');
            this.getAnos(true);
            //this.setState({campoAno: null});
        }

        this.setState({addAnos: acao, activeMsg: activeMsg});
    }



    callRecursosValue(){

        let recursos = {
            1: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 158,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo estadual',
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc':  159,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com o governo municipal',
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 160,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Acordo com organismos multilaterais',
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 161,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Acordo com governos estrangeiros',
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 162,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas públicas ou sociedades de economia mista',
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 157,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Transferências federais recebidas pela OSC',
                },
            },
            2:{
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 163,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras',
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc':  164,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras',
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 165,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras',
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 166,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras',
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 167,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras',
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 168,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas estrangeiras',
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 169,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa jurídica',
                },
                7: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 170,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações de pessoa física',
                },
                8: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 171,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Doações recebidas de produtos e serviços (com NFE)',
                },
            },
            3: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 179,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parceria com OSCs brasileiras',
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc':  180,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com OSCs estrangeiras',
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 181,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas brasileiras',
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 182,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Parcerias com organizações religiosas estrangeiras',
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 183,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Empresas privadas brasileiras',
                },
            },
            4: {
                0: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 172,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Rendimentos de fundos patrimoniais',
                },
                1: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc':  173,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Rendimentos financeiros de reservas ou contas',
                },
                2: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 174,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Mensalidades ou contribuições de associados',
                },
                3: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 175,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Prêmios recebidos',
                },
                4: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 176,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Venda de produtos',
                },
                5: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 177,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Prestação de serviços',
                },
                6: {
                    'id_recursos_osc': 0,
                    'cd_fonte_recurso_osc': 178,
                    'nr_valor_recursos_osc': '',
                    'tx_nome_fonte_recursos_osc': 'Prestação de serviços',
                },
            },
        }

        if(this.state.dataRecursos){
            if(this.state.dataRecursos[1]!==undefined){
                for(let i in this.state.dataRecursos[1]){
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===158){
                        recursos[1][0].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][0].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===159){
                        recursos[1][1].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][1].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===160){
                        recursos[1][2].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][2].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===161){
                        recursos[1][3].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][3].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===162){
                        recursos[1][4].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][4].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[1][i].cd_fonte_recurso_osc===157){
                        recursos[1][5].id_recursos_osc = this.state.dataRecursos[1][i].id_recursos_osc ? this.state.dataRecursos[1][i].id_recursos_osc : null;
                        recursos[1][5].nr_valor_recursos_osc = this.state.dataRecursos[1][i].nr_valor_recursos_osc ? this.state.dataRecursos[1][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if(this.state.dataRecursos[2]!==undefined){
                for(let i in this.state.dataRecursos[2]){
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===163){
                        recursos[2][0].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][0].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===164){
                        recursos[2][1].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][1].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===165){
                        recursos[2][2].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][2].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===166){
                        recursos[2][3].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][3].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===167){
                        recursos[2][4].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][4].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===168){
                        recursos[2][5].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][5].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===169){
                        recursos[2][6].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][6].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===170){
                        recursos[2][7].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][7].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[2][i].cd_fonte_recurso_osc===171){
                        recursos[2][8].id_recursos_osc = this.state.dataRecursos[2][i].id_recursos_osc ? this.state.dataRecursos[2][i].id_recursos_osc : null;
                        recursos[2][8].nr_valor_recursos_osc = this.state.dataRecursos[2][i].nr_valor_recursos_osc ? this.state.dataRecursos[2][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if(this.state.dataRecursos[3]!==undefined){
                for(let i in this.state.dataRecursos[3]){
                    if(this.state.dataRecursos[3][i].cd_fonte_recurso_osc===179){
                        recursos[3][0].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][0].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[3][i].cd_fonte_recurso_osc===180){
                        recursos[3][1].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][1].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[3][i].cd_fonte_recurso_osc===181){
                        recursos[3][2].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][2].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[3][i].cd_fonte_recurso_osc===182){
                        recursos[3][3].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][3].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[3][i].cd_fonte_recurso_osc===183){
                        recursos[3][4].id_recursos_osc = this.state.dataRecursos[3][i].id_recursos_osc ? this.state.dataRecursos[3][i].id_recursos_osc : null;
                        recursos[3][4].nr_valor_recursos_osc = this.state.dataRecursos[3][i].nr_valor_recursos_osc ? this.state.dataRecursos[3][i].nr_valor_recursos_osc : null;
                    }
                }
            }

            if(this.state.dataRecursos[4]!==undefined){
                for(let i in this.state.dataRecursos[4]){
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===172){
                        recursos[4][0].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][0].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===173){
                        recursos[4][1].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][1].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===174){
                        recursos[4][2].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][2].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===175){
                        recursos[4][3].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][3].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===176){
                        recursos[4][4].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][4].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===177){
                        recursos[4][5].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][5].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                    if(this.state.dataRecursos[4][i].cd_fonte_recurso_osc===178){
                        recursos[4][6].id_recursos_osc = this.state.dataRecursos[4][i].id_recursos_osc ? this.state.dataRecursos[4][i].id_recursos_osc : null;
                        recursos[4][6].nr_valor_recursos_osc = this.state.dataRecursos[4][i].nr_valor_recursos_osc ? this.state.dataRecursos[4][i].nr_valor_recursos_osc : null;
                    }
                }
            }
        }



        this.setState({recursos: recursos});

    }

    componentDidMount(){
        this.getAnos();
        this.getSemRecursos();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({campoAno: value});
        /*const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({form: form});*/
    }


    getSemRecursos(){
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/sem_recursos/' + this.state.ano + '/789809',
            success: function (data) {


                /*/////////////////////////////////////*/
                let recursos_publicos = {
                    origem: {
                        cd_origem_fonte_recursos_osc : 0,
                    }
                }

                let recursos_privados = {
                    origem: {
                        cd_origem_fonte_recursos_osc : 0,
                    }
                }

                let recursos_financeiros = {
                    origem: {
                        cd_origem_fonte_recursos_osc : 0,
                    }
                }

                let recursos_proprios = {
                    origem: {
                        cd_origem_fonte_recursos_osc : 0,
                    }
                }

                if(data[this.state.ano]!==undefined){
                    if(data[this.state.ano].length>0){
                        recursos_publicos = {
                            origem: {
                                cd_origem_fonte_recursos_osc : data[this.state.ano][0].origem.cd_origem_fonte_recursos_osc,
                            }
                        }
                        recursos_privados = {
                            origem: {
                                cd_origem_fonte_recursos_osc : data[this.state.ano][1].origem.cd_origem_fonte_recursos_osc,
                            }
                        }
                        recursos_financeiros = {
                            origem: {
                                cd_origem_fonte_recursos_osc : data[this.state.ano][2].origem.cd_origem_fonte_recursos_osc,
                            }
                        }
                        recursos_proprios = {
                            origem: {
                                cd_origem_fonte_recursos_osc : data[this.state.ano][3].origem.cd_origem_fonte_recursos_osc,
                            }
                        }

                    }
                }
                let item_recursos_publicos = recursos_publicos.origem.cd_origem_fonte_recursos_osc===1 ? true : false;
                let item_recursos_privados = recursos_publicos.origem.cd_origem_fonte_recursos_osc===2 ? true : false;
                let item_recursos_financeiros = recursos_publicos.origem.cd_origem_fonte_recursos_osc===3 ? true : false;
                let item_recursos_proprios = recursos_publicos.origem.cd_origem_fonte_recursos_osc===4 ? true : false;

                /*/////////////////////////////////////*/

                console.log('+++++', recursos_publicos.origem.cd_origem_fonte_recursos_osc);

                this.setState({
                    item_recursos_publicos: item_recursos_publicos,
                    item_recursos_privados: item_recursos_privados,
                    item_recursos_financeiros: item_recursos_financeiros,
                    item_recursos_proprios: item_recursos_proprios,
                });
                //this.setState({dataSemRecursos: data[this.state.ano]})

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }


    addSemRecursos(cd_origem){
        let acaoRecursos = !this.state.item_recursos_publicos;

        if(!this.state.item_recursos_publicos){
            console.log('insert');
            console.log('cd_origem', cd_origem);
            console.log('ano', this.state.ano);
            $.ajax({
                method: 'POST',
                data: {
                    id_osc: 789809,
                    ano: this.state.ano,
                    ft_nao_possui: 'Representante de OSC',
                    cd_origem_fonte_recursos_osc: cd_origem,
                },
                cache: false,
                url: getBaseUrl2 + 'osc/sem_recursos',
                success: function (data) {
                    //this.setState();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });
        }else{
            console.log('delete');

            $.ajax({
                method: 'DELETE',
                cache: false,
                url: getBaseUrl2 + 'osc/sem_recursos/' + ano,
                success: function (data) {
                    //this.setState();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });

        }

        this.setState({item_recursos_publicos: acaoRecursos});
    }



    render(){
        let anosRecursos = null;
        if(this.state.anosRecursos){
            anosRecursos = this.state.anosRecursos.map(function (item, index) {
                return (
                <div key={"anos_" + index} id={"anos_" + index}
                    onClick={() => this.callRecursos(item.dt_ano_recursos_osc)}
                    className={this.state.ano==item.dt_ano_recursos_osc ? 'btn btn-primary' : 'btn btn-light'}
                    style={{marginRight: '5px'}}
                >{item.dt_ano_recursos_osc}</div>
                );
            }.bind(this));
        }



        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                                <form>

                                    <div className="title-user-area">
                                        <div className="mn-accordion-icon"><i className="fas fa-boxes" aria-hidden="true"/></div>
                                        <h3>Fontes de recursos anuais da OSC</h3>
                                        <hr/><br/>
                                    </div>


                                    <div style={{fontSize: "13px"}}>Anos: </div>
                                    <div className="btn-group" role="group" aria-label="Anos">
                                        <div style={{display: this.state.loadingAnos ? '' : 'none'}}>
                                            <i className="fas fa-spinner fa-spin" />
                                        </div>
                                        <div style={{display: this.state.loadingAnos ? 'none' : ''}}>
                                            <div style={{float: 'left', marginBottom: '10px'}}>
                                                {anosRecursos}
                                            </div>
                                            <div style={{display: this.state.activeIncert ? "none" : "", float: 'left', width: '105px'}}>
                                                <input className="form-control form-p" type="text" placeholder="Ano"  name="campoAno" style={{display: this.state.addAnos ? "" : "none"}} onChange={this.handleInputChange} maxLength="4"/>

                                                <div className="icon-forms">
                                                    <a onClick={this.callPushAnos} style={{display: this.state.addAnos ? "" : "none", marginRight: '10px'}} className="text-success cursor"><i className="far fa-save"/></a>
                                                    <a onClick={() => this.callAddAnos(false)} style={{display: this.state.addAnos ? "" : "none"}} className="text-danger cursor"><i className="far fa-times-circle"/></a>
                                                </div>
                                            </div>


                                            <a className="cursor" onClick={() => this.callAddAnos(true)}  style={{display: this.state.addAnos ? "none" : "", top: '4px', position: 'relative'}} >
                                                <i className="fas fa-plus-circle fa-2x tx-pri" />
                                            </a>

                                            <div style={{display: this.state.activeMsg==true ? "" : "none"}}>
                                                <div className="alert alert-danger" style={{display: this.state.activeIncert ? "" : "none", marginTop: '10px', clear: 'both'}}>
                                                    Para adicionar mais um ano, será preciso informar uma contribuição pertinente ao ano! <br/><br/>
                                                    <a type="button" className="btn-primary btn-xs float-right" onClick={() => this.callAddAnos(false)}>
                                                        Continuar
                                                    </a>
                                                </div>
                                            </div>



                                            {/*<div className="float-right" onClick={() => this.saveOutrosSub(item.idSelectedSub)}  style={{margin: '-30px 10px 0 0'}}>
                                                <div style={{display: this.state.saveLoading===item.idSelectedSub ? 'none' : ''}}><i className="far fa-save"/></div>
                                                <div style={{display: this.state.saveLoading===item.idSelectedSub ? '' : 'none'}}><i className="fa fa-spin fa-spinner"/></div>
                                            </div>*/}

                                        </div>
                                    </div>
                                    <br/>
                                    <br/>

                                    <div className="row">


                                        {/*////////////////////////////PUBLICOS//////////////////////////////*/}
                                        <div className="col-md-12">
                                            <h2 style={{float: 'left'}}>Recursos públicos</h2>

                                            {/*/////////////////////*/}
                                            <div  style={{float: 'right'}}  >
                                                <div className="custom-control custom-checkbox text-center">

                                                    <div className="cursor" onClick={() => this.addSemRecursos(1)}>
                                                        <div className="box-checkbox" style={{backgroundColor: this.state.item_recursos_publicos ? '#3A559B' : '#FFFFFF'}}/> Não possui
                                                    </div>

                                                    <div className="alert alert-danger" style={{display: 'none'}}>
                                                        <br/>
                                                        <a type="button" className="btn-primary btn-xs float-right" >
                                                            Confirmar
                                                        </a>
                                                    </div>
                                                    <div style={{marginTop: '10px', float: 'right', display: 'none'}}>
                                                        <div ><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                                                        <div >
                                                            <i className={"far fa-times-circle"} />
                                                        </div>
                                                        <br/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*/////////////////////*/}
                                            <hr  style={{clear: 'both'}}/>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row" style={{display: this.state.item_recursos_publicos ? 'none' : ''}}>
                                                <Recurso
                                                    id={this.state.recursos[1][0].id_recursos_osc}
                                                    cd={this.state.recursos[1][0].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][0].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][0].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][0].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                                <Recurso
                                                    id={this.state.recursos[1][1].id_recursos_osc}
                                                    cd={this.state.recursos[1][1].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][1].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][1].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][1].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                                <Recurso
                                                    id={this.state.recursos[1][2].id_recursos_osc}
                                                    cd={this.state.recursos[1][2].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][2].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][2].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][2].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                                <Recurso
                                                    id={this.state.recursos[1][3].id_recursos_osc}
                                                    cd={this.state.recursos[1][3].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][3].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][3].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][3].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                                <Recurso
                                                    id={this.state.recursos[1][4].id_recursos_osc}
                                                    cd={this.state.recursos[1][4].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][4].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][4].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][4].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                                <Recurso
                                                    id={this.state.recursos[1][5].id_recursos_osc}
                                                    cd={this.state.recursos[1][5].cd_fonte_recurso_osc}
                                                    name={this.state.recursos[1][5].cd_fonte_recurso_osc}
                                                    value={this.state.recursos[1][5].nr_valor_recursos_osc}
                                                    txt={this.state.recursos[1][5].tx_nome_fonte_recursos_osc}
                                                    ano={this.state.ano+'-01-01'}
                                                />
                                            </div>
                                        </div>

                                        {/*////////////////////////////PRIVADOS//////////////////////////////*/}
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <h2>Recursos privados</h2>
                                            <hr/>
                                        </div>
                                        <Recurso
                                            id={this.state.recursos[2][0].id_recursos_osc}
                                            cd={this.state.recursos[2][0].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][0].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][0].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][0].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][1].id_recursos_osc}
                                            cd={this.state.recursos[2][1].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][1].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][1].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][1].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][2].id_recursos_osc}
                                            cd={this.state.recursos[2][2].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][2].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][2].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][2].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][3].id_recursos_osc}
                                            cd={this.state.recursos[2][3].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][3].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][3].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][3].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][4].id_recursos_osc}
                                            cd={this.state.recursos[2][4].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][4].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][4].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][4].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][5].id_recursos_osc}
                                            cd={this.state.recursos[2][5].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][5].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][5].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][5].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][6].id_recursos_osc}
                                            cd={this.state.recursos[2][6].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][6].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][6].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][6].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][7].id_recursos_osc}
                                            cd={this.state.recursos[2][7].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][7].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][7].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][7].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[2][8].id_recursos_osc}
                                            cd={this.state.recursos[2][8].cd_fonte_recurso_osc}
                                            name={this.state.recursos[2][8].cd_fonte_recurso_osc}
                                            value={this.state.recursos[2][8].nr_valor_recursos_osc}
                                            txt={this.state.recursos[2][8].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        {/*////////////////////////////NAO FINANCEIROS//////////////////////////////*/}
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <h2>Recursos não financeiros</h2>
                                            <hr/>
                                        </div>
                                        <Recurso
                                            id={this.state.recursos[3][0].id_recursos_osc}
                                            cd={this.state.recursos[3][0].cd_fonte_recurso_osc}
                                            name={this.state.recursos[3][0].cd_fonte_recurso_osc}
                                            value={this.state.recursos[3][0].nr_valor_recursos_osc}
                                            txt={this.state.recursos[3][0].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[3][1].id_recursos_osc}
                                            cd={this.state.recursos[3][1].cd_fonte_recurso_osc}
                                            name={this.state.recursos[3][1].cd_fonte_recurso_osc}
                                            value={this.state.recursos[3][1].nr_valor_recursos_osc}
                                            txt={this.state.recursos[3][1].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[3][2].id_recursos_osc}
                                            cd={this.state.recursos[3][2].cd_fonte_recurso_osc}
                                            name={this.state.recursos[3][2].cd_fonte_recurso_osc}
                                            value={this.state.recursos[3][2].nr_valor_recursos_osc}
                                            txt={this.state.recursos[3][2].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[3][3].id_recursos_osc}
                                            cd={this.state.recursos[3][3].cd_fonte_recurso_osc}
                                            name={this.state.recursos[3][3].cd_fonte_recurso_osc}
                                            value={this.state.recursos[3][3].nr_valor_recursos_osc}
                                            txt={this.state.recursos[3][3].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[3][4].id_recursos_osc}
                                            cd={this.state.recursos[3][4].cd_fonte_recurso_osc}
                                            name={this.state.recursos[3][4].cd_fonte_recurso_osc}
                                            value={this.state.recursos[3][4].nr_valor_recursos_osc}
                                            txt={this.state.recursos[3][4].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />

                                        {/*////////////////////////////PROPRIOS//////////////////////////////*/}
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <h2>Recursos próprios</h2>
                                            <hr/>
                                        </div>
                                        <Recurso
                                            id={this.state.recursos[4][0].id_recursos_osc}
                                            cd={this.state.recursos[4][0].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][0].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][0].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][0].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][1].id_recursos_osc}
                                            cd={this.state.recursos[4][1].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][1].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][1].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][1].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][2].id_recursos_osc}
                                            cd={this.state.recursos[4][2].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][2].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][2].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][2].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][3].id_recursos_osc}
                                            cd={this.state.recursos[4][3].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][3].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][3].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][3].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][4].id_recursos_osc}
                                            cd={this.state.recursos[4][4].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][4].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][4].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][4].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][5].id_recursos_osc}
                                            cd={this.state.recursos[4][5].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][5].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][5].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][5].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />
                                        <Recurso
                                            id={this.state.recursos[4][6].id_recursos_osc}
                                            cd={this.state.recursos[4][6].cd_fonte_recurso_osc}
                                            name={this.state.recursos[4][6].cd_fonte_recurso_osc}
                                            value={this.state.recursos[4][6].nr_valor_recursos_osc}
                                            txt={this.state.recursos[4][6].tx_nome_fonte_recursos_osc}
                                            ano={this.state.ano+'-01-01'}
                                        />



                                    </div>


                                </form>

                                <div className="space"/>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Recursos/>,
    document.getElementById('recursos')
);
