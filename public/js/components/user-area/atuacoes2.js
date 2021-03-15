class Atuacoes2 extends React.Component {
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
                1: 'fas fa-hotel fa-2x',
                2: 'fas fa-briefcase-medical fa-2x',
                3: 'fas fa-theater-masks fa-2x',
                4: 'fas fa-graduation-cap fa-2x',
                5: 'fas fa-hands-helping fa-2x',
                6: 'fas fa-church fa-2x',
                7: 'fas fa-users fa-2x',
                8: 'fas fa-seedling fa-2x',
                9: 'fas fa-balance-scale fa-2x',
                10: '',
                11: '',
                12: ''
            },

            dataAtuacaoSelected: [],
            dataAtuacaoBd: [],
            checkedAtuacao: false

        };

        this.listArea = this.listArea.bind(this);
        this.listAreaSelected = this.listAreaSelected.bind(this);
        //this.checkArea = this.checkArea.bind(this);
        this.checkSubArea = this.checkSubArea.bind(this);
        this.checkedOutros = this.checkedOutros.bind(this);
    }

    componentDidMount() {
        this.listArea();
        this.listAreaSelected();
    }

    listArea() {
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/area_atuacao',
            success: function (data) {
                data.find(function (item) {
                    item.checked = false;
                });
                this.setState({ loading: false, areaAtuacao: data });
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
            url: getBaseUrl2 + 'osc/areas_atuacao/' + 789809,
            success: function (data) {
                let itensAreas = [];

                data.find(function (item) {
                    itensAreas.push(item.cd_area_atuacao);
                });

                this.setState({
                    dataAtuacaoSelected: itensAreas,
                    dataAtuacaoBd: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubareaAtuacao(id) {

        /*//////////////////*/
        /*if(checkedAtuacao===false){
            $.ajax({
                method: 'POST',
                url: getBaseUrl2+'osc/area_atuacao',
                data: {
                    id_osc: 789809,
                    cd_area_atuacao: id,
                    ft_area_atuacao: 'Representante de OSC',
                },
                cache: false,
                success: function(data){
                    //this.listArea();
                    this.listAreaSelected();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }else{
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2+'osc/area_atuacao/'+idSelected,
                data: {
                 },
                cache: false,
                success: function(data){
                    //this.listArea();
                    this.listAreaSelected();
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(status, err.toString());
                }.bind(this)
            });
        }*/
        /*//////////////////*/

        /*if(areas[0].subareas){
            areas.find(function(item){
                if(item.cd_area_atuacao === id){
                    item.checked = !item.checked;
                }
            });
             this.setState({areaAtuacao: areas});
            return;
        }*/

        //this.setState({button:false});
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

                    if (item.cd_area_atuacao === id) {
                        item.checked = !item.checked;
                        if (id === 10) {
                            imputOutros = !imputOutros;
                        }
                    }
                    item.subareas = data.filter(function (subitem) {
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });

                this.setState({
                    loading: false,
                    areaAtuacao: areaAtuacao,
                    id_area: id,
                    titleSub: true,
                    imputOutros: imputOutros
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
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
        if (checkedAtuacao === false) {
            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/area_atuacao',
                data: {
                    id_osc: 789809,
                    cd_area_atuacao: area_id,
                    cd_subarea_atuacao: subarea_id,
                    ft_area_atuacao: 'Representante de OSC'
                },
                cache: false,
                success: function (data) {
                    //this.listArea();
                    //this.listAreaSelected();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        } else {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/area_atuacao/' + idSelectedSub,
                data: {},
                cache: false,
                success: function (data) {
                    //this.listArea();
                    //this.listAreaSelected();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        }
        /*//////////////////*/
    }

    checkedOutros(area_id) {
        let checked = false;
        this.state.areaAtuacao.find(function (item) {
            if (item.cd_area_atuacao === area_id) {
                if (item.subareas) {
                    item.subareas.find(function (subitem) {
                        if (subitem.tx_nome_subarea_atuacao === "Outros") {
                            checked = subitem.checked;
                        }
                    });
                }
            }
        });

        return checked;
    }

    render() {

        let areaAtuacao = null;
        let subareaAtuacao = [];

        if (this.state.areaAtuacao) {
            areaAtuacao = this.state.areaAtuacao.map(function (item) {
                item.idSelected = 0;
                item.checkedAtuacao = false;
                this.state.dataAtuacaoBd.find(function (itemSelect) {
                    if (itemSelect.cd_area_atuacao === item.cd_area_atuacao) {
                        item.idSelected = itemSelect.id_area_atuacao;
                        item.checkedAtuacao = true;
                    }
                });

                let subarea = null;
                if (item.subareas) {
                    //console.log('subareas', item.subareas);
                    subarea = item.subareas.map(function (subitem) {

                        subitem.idSelectedSub = 0;
                        subitem.checkedAtuacaoSub = false;
                        this.state.dataAtuacaoBd.find(function (itemSelect) {
                            if (itemSelect.cd_area_atuacao === subitem.cd_area_atuacao) {
                                subitem.idSelectedSub = itemSelect.id_area_atuacao;
                                subitem.checkedAtuacaoSub = true;
                            }
                        });

                        return React.createElement(
                            'div',
                            { key: "subarea_" + subitem.cd_subarea_atuacao },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => this.checkSubArea(item.cd_area_atuacao, subitem.cd_subarea_atuacao, subitem.checkedAtuacaoSub, subitem.idSelectedSub) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + subitem.cd_subarea_atuacao, required: true }),
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
                    { key: "divArea_" + item.cd_area_atuacao, className: 'card', style: { display: item.checkedAtuacao ? '' : 'none' } },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt p-2' },
                        React.createElement(
                            'strong',
                            null,
                            React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] }),
                            ' ',
                            item.tx_nome_area_atuacao
                        ),
                        React.createElement('br', null),
                        React.createElement('hr', null),
                        subarea,
                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_uf', placeholder: ' ', style: { display: this.checkedOutros(item.cd_area_atuacao) ? '' : 'none' } })
                    )
                ));

                return React.createElement(
                    'div',
                    { className: 'col-md-6', key: "area_" + item.cd_area_atuacao, onChange: () => this.callSubareaAtuacao(item.cd_area_atuacao) },
                    React.createElement(
                        'div',
                        { className: 'bg-lgt items-checkbox' },
                        React.createElement(
                            'div',
                            { className: 'custom-control custom-checkbox' },
                            React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_area_atuacao, required: true, checked: this.state.dataAtuacaoSelected.indexOf(item.cd_area_atuacao) >= 0 }),
                            React.createElement(
                                'label',
                                { className: 'custom-control-label', htmlFor: "area_" + item.cd_area_atuacao },
                                React.createElement('i', { className: this.state.icons[item.cd_area_atuacao] }),
                                '  ',
                                item.tx_nome_area_atuacao
                            )
                        )
                    )
                );
            }.bind(this));
        }

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
                    'Atividade econ\xF4mica (CNAE)'
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
                            areaAtuacao,
                            React.createElement('br', null),
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
                            { style: { display: this.state.dataAtuacaoBd.length > 0 ? '' : 'none' } },
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

ReactDOM.render(React.createElement(Atuacoes, null), document.getElementById('atuacoes'));