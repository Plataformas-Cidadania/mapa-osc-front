class Atuacoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingList: false,
            loading: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
            editId: 0,
            areaAtuacao: null,
            subareaAtuacao: null,
            titleSub: null,
            imputOutros: false,
            icons: {
                1: 'fas fa-hotel ',
                2: 'fas fa-briefcase-medical ',
                3: 'fas fa-theater-masks ',
                4: 'fas fa-graduation-cap ',
                5: 'fas fa-hands-helping ',
                6: 'fas fa-church ',
                7: 'fas fa-users ',
                8: 'fas fa-seedling ',
                9: 'fas fa-balance-scale ',
                10: 'fas fa-text-width ',
                11: 'fas fa-ellipsis-h ',
                12: ''
            },
            dataAtuacaoBd: [],
            dataAtuacaoSelected: [],
            form: {
                tx_nome_outra: ''
            },
            boxInfo: false,
            dataCnae: '',
            dataCnaeArea: '',
            dataCnaeSubArea: []

        };

        this.listArea = this.listArea.bind(this);
        this.listAreaSelected = this.listAreaSelected.bind(this);
        this.listCnae = this.listCnae.bind(this);
        this.listCnaeArea = this.listCnaeArea.bind(this);
        //this.checkArea = this.checkArea.bind(this);
        this.checkSubArea = this.checkSubArea.bind(this);
        this.checkedOutros = this.checkedOutros.bind(this);
        this.callSubareaAtuacao = this.callSubareaAtuacao.bind(this);
        this.loadSubareas = this.loadSubareas.bind(this);
        this.saveOutrosSub = this.saveOutrosSub.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.listArea();
        this.listAreaSelected();
        this.listCnae();
        this.listCnaeArea();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        form[name] = value;

        this.setState({ form: form });
    }

    listArea() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'menu/osc/area_atuacao',
            success: function (data) {
                data.find(function (item) {
                    item.checked = false;
                });
                this.setState({ loading: false, areaAtuacao: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listCnae() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl+'osc/dados_gerais/'+702542,
            url: getBaseUrl + 'osc/dados_gerais/' + this.props.id,
            success: function (data) {
                this.setState({ loading: false, dataCnae: data.tx_nome_atividade_economica_osc });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listCnaeArea() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/areas_atuacao/'+597188,//789809
            url: getBaseUrl2 + 'osc/areas_atuacao/' + this.props.id,
            success: function (data) {
                let dataArea = '';
                data.find(function (item) {
                    dataArea = item.dc_area_atuacao.tx_nome_area_atuacao;
                });

                this.setState({ loading: false, dataCnaeArea: dataArea, dataCnaeSubArea: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listAreaSelected() {
        $.ajax({
            method: 'GET',
            cache: false,
            //url: getBaseUrl2+'osc/areas_atuacao_rep/'+789809,
            url: getBaseUrl2 + 'osc/areas_atuacao_rep/' + this.props.id,
            success: function (data) {
                let itensAreas = [];
                let areasAtuacao = this.state.areaAtuacao;

                areasAtuacao.find(item => {
                    item.checkedAtuacaoArea = false;
                });

                data.find(function (item) {
                    itensAreas.push(item.cd_area_atuacao);
                    areasAtuacao.find(area => {
                        if (item.cd_area_atuacao === area.cd_area_atuacao) {
                            area.checkedAtuacaoArea = true;
                        }
                    });
                });

                this.setState({
                    dataAtuacaoSelected: itensAreas,
                    dataAtuacaoBd: data,
                    areasAtuacao: areasAtuacao
                }, function () {
                    this.loadSubareas();
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    loadSubareas() {
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/subarea_atuacao',
            success: function (data) {
                let areaAtuacao = this.state.areaAtuacao;
                let imputOutros = this.state.imputOutros;

                data.find(function (item) {
                    item.checked = false;
                });

                this.state.areaAtuacao.find(function (item) {
                    item.subareas = data.filter(function (subitem) {
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });

                this.setState({ loading: false, areaAtuacao: areaAtuacao, titleSub: true, imputOutros: imputOutros });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubareaAtuacao(e) {

        let id = e.target.id.split("_")[1];
        let areas = this.state.areaAtuacao;

        /////////////////////////
        this.setState({ boxInfo: false });
        let arrayAreas = [];

        this.state.dataAtuacaoBd.find(function (itemSelectSub) {
            arrayAreas.push(itemSelectSub.cd_area_atuacao);
        });
        const arrUnique = [...new Set(arrayAreas)];

        if (arrUnique.indexOf(parseInt(id)) != -1) {
            this.setState({ boxInfo: true });
            return;
        }

        /////////////////////////


        areas.find(item => {
            if (item.cd_area_atuacao == id) {
                item.checkedAtuacaoArea = !item.checkedAtuacaoArea;
            }
        });

        if (areas[0].subareas) {
            let checkedAtuacao = false;
            areas.find(function (item) {
                if (item.cd_area_atuacao === id) {
                    item.checked = !item.checked;
                    checkedAtuacao = !item.checked;
                }
            });

            this.setState({ areaAtuacao: areas });
            return;
        }

        this.setState({ button: false });
    }

    checkSubArea(area_id, subarea_id, checkedAtuacao, idSelectedSub) {
        let areas = this.state.areaAtuacao;
        areas.find(function (item) {
            if (item.cd_area_atuacao === area_id) {
                item.subareas.find(function (subitem) {
                    if (subitem.cd_subarea_atuacao === subarea_id) {
                        subitem.checked = !subitem.checked;
                    }
                });
            }
        });

        /*//////////////////*/
        if (checkedAtuacao !== true) {
            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/area_atuacao_rep',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {
                    //id_osc: 789809,
                    id_osc: this.props.id,
                    cd_area_atuacao: area_id,
                    cd_subarea_atuacao: subarea_id,
                    ft_area_atuacao: 'Representante de OSC'
                },
                cache: false,
                success: function (data) {
                    this.listAreaSelected();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        } else {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/area_atuacao_rep/' + idSelectedSub,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('@App:token')
                },
                data: {},
                cache: false,
                success: function (data) {
                    this.listAreaSelected();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        }
        /*//////////////////*/

        this.setState({ areaAtuacao: areas });
    }

    checkedOutros(area_id) {
        let checked = false;
        this.state.areaAtuacao.find(function (item) {
            if (item.cd_area_atuacao === area_id) {
                if (item.subareas) {
                    item.subareas.find(function (subitem) {
                        this.state.dataAtuacaoBd.find(function (itemSelectSub) {
                            if (itemSelectSub.cd_subarea_atuacao === subitem.cd_subarea_atuacao) {
                                subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                if (subitem.tx_nome_subarea_atuacao === "Outros") {
                                    checked = true;
                                }
                            }
                        }.bind(this));
                    }.bind(this));
                }
            }
        }.bind(this));

        return checked;
    }
    saveOutrosSub(id) {
        this.setState({ saveLoading: id });
        $.ajax({
            method: 'PUT',
            url: getBaseUrl2 + 'osc/area_atuacao_rep/' + id,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@App:token')
            },
            data: {
                tx_nome_outra: this.state.form.tx_nome_outra
            },
            cache: false,
            success: function (data) {
                this.setState({ saveLoading: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {

        let areaAtuacao = null;
        let subareaAtuacao = [];
        if (this.state.areaAtuacao) {
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;

                if (item.subareas) {
                    subarea = item.subareas.map(function (subitem) {

                        subitem.checkedSubarea = false;
                        subitem.idSelectedSub = 0;

                        this.state.dataAtuacaoBd.find(function (itemSelectSub) {
                            if (itemSelectSub.cd_subarea_atuacao === subitem.cd_subarea_atuacao) {
                                subitem.idSelectedSub = itemSelectSub.id_area_atuacao;
                                subitem.checkedSubarea = true;
                                item.tx_nome_outra = itemSelectSub.tx_nome_outra;
                                item.idSelectedSub = itemSelectSub.id_area_atuacao;
                            }
                        });

                        return React.createElement(
                            'div',
                            { key: "subarea_" + subitem.cd_subarea_atuacao },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => this.checkSubArea(item.cd_area_atuacao, subitem.cd_subarea_atuacao, subitem.checkedSubarea, subitem.idSelectedSub) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_subarea_atuacao, required: true, defaultChecked: subitem.checkedSubarea }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + subitem.cd_subarea_atuacao },
                                    subitem.tx_nome_subarea_atuacao
                                )
                            ),
                            React.createElement('br', null)
                        );
                    }.bind(this));
                }

                subareaAtuacao.push(React.createElement(
                    'div',
                    { key: "divArea_" + item.cd_area_atuacao, className: 'card', style: { display: item.checkedAtuacaoArea ? '' : 'none' } },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt p-2' },
                        React.createElement(
                            'strong',
                            null,
                            React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] + " fa-1x" }),
                            ' ',
                            item.tx_nome_area_atuacao
                        ),
                        React.createElement('br', null),
                        React.createElement('hr', null),
                        subarea,
                        React.createElement(
                            'div',
                            { style: { display: this.checkedOutros(item.cd_area_atuacao) ? '' : 'none' } },
                            React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_outra', placeholder: ' ', onChange: this.handleInputChange, defaultValue: item.tx_nome_outra }),
                            React.createElement(
                                'div',
                                { className: 'float-right', onClick: () => this.saveOutrosSub(item.idSelectedSub), style: { margin: '-30px 10px 0 0' } },
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.saveLoading === item.idSelectedSub ? 'none' : '' } },
                                    React.createElement('i', { className: 'far fa-save' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.saveLoading === item.idSelectedSub ? '' : 'none' } },
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner' })
                                )
                            )
                        )
                    )
                ));

                return React.createElement(
                    'div',
                    { className: 'col-md-3', key: "area_" + item.cd_area_atuacao },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt items-checkbox custom-checkbox-items' },
                        React.createElement(
                            'div',
                            { className: 'custom-control custom-chetckbox text-center' },
                            React.createElement('input', { type: 'checkbox', className: 'custom-control-input', onChange: this.callSubareaAtuacao, id: "area_" + item.cd_area_atuacao, required: true, checked: item.checkedAtuacaoArea }),
                            React.createElement(
                                'label',
                                { className: 'custom-control-label', htmlFor: "area_" + item.cd_area_atuacao },
                                React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] + " fa-2x" }),
                                React.createElement(
                                    'p',
                                    null,
                                    item.tx_nome_area_atuacao
                                )
                            )
                        )
                    ),
                    React.createElement('br', null)
                );
            }.bind(this));
        }

        /////////////////////////////////////////
        let areaAtuacaoCnae = null;
        if (this.state.dataCnaeSubArea) {
            areaAtuacaoCnae = this.state.dataCnaeSubArea.map(function (item) {

                let teste = '';
                if (item.dc_subarea_atuacao === null) {
                    teste = 'Não informado';
                } else {
                    teste = item.dc_subarea_atuacao.tx_nome_subarea_atuacao;
                }

                return React.createElement(
                    'div',
                    { key: "area_" + item.cd_area_atuacao },
                    React.createElement(
                        'strong',
                        null,
                        'Sub\xE1rea: '
                    ),
                    teste
                );
            }.bind(this));
        }
        /////////////////////////////////////////


        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-12' },
                React.createElement(
                    'div',
                    { className: 'title-user-area' },
                    React.createElement(
                        'div',
                        { className: 'mn-accordion-icon' },
                        React.createElement('i', { className: 'fa fa-share-alt', 'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        'h3',
                        null,
                        '\xC1reas e Sub\xE1reas de atua\xE7\xE3o da OSC'
                    ),
                    React.createElement('hr', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'div',
                    { className: 'text-center' },
                    React.createElement(
                        'strong',
                        null,
                        React.createElement('i', { className: 'fas fa-database tx-pri' }),
                        ' Atividade econ\xF4mica (CNAE): '
                    ),
                    ' ',
                    this.state.dataCnae
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'form-row' },
                    React.createElement(
                        'div',
                        { className: 'form-group col-md-12' },
                        React.createElement(
                            'div',
                            { className: 'alert alert-secondary' },
                            React.createElement('i', { className: 'fas fa-database float-right tx-pri' }),
                            React.createElement(
                                'strong',
                                null,
                                '\xC1rea de Atua\xE7\xE3o: ',
                                this.state.dataCnaeArea
                            ),
                            areaAtuacaoCnae
                        )
                    )
                ),
                React.createElement('br', null)
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'strong',
                            null,
                            '\xC1rea de Atua\xE7\xE3o'
                        ),
                        React.createElement('hr', null),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'alert alert-danger', role: 'alert', style: { position: 'fixed', zIndex: '999', display: this.state.boxInfo ? '' : 'none' } },
                                '\xC9 preciso excluir as Sub\xE1rea de Atua\xE7\xE3o, para desativar uma \xE1rea!  ',
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-danger', onClick: this.callSubareaAtuacao },
                                    'X'
                                )
                            ),
                            areaAtuacao,
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'col-md-12', style: { display: this.state.imputOutros ? '' : 'none' } },
                                React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_uf', placeholder: ' ' }),
                                React.createElement('br', null)
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'text-center', style: { display: this.state.dataAtuacaoBd.length > 0 ? 'none' : '' } },
                                'Selecione uma \xE1rea e sub\xE1rea de atua\xE7\xE3o!'
                            ),
                            React.createElement(
                                'strong',
                                null,
                                'Sub\xE1rea de Atua\xE7\xE3o'
                            ),
                            React.createElement('hr', null),
                            React.createElement(
                                'div',
                                { className: 'card-columns' },
                                subareaAtuacao
                            )
                        )
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Atuacoes, { id: id }), document.getElementById('atuacoes'));