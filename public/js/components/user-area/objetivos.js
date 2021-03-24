class Objetivos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcon: false,
            objetivos: [],
            subobjetivos: null,
            titleMeta: null,
            titleObjetivo: "",
            buttonObjetivos: 0,
            dataChkboxMetas: []

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.checkMetas = this.checkMetas.bind(this);
        this.listChkboxMetas = this.listChkboxMetas.bind(this);
        this.checkMetas = this.checkMetas.bind(this);
        this.listObjetivos = this.listObjetivos.bind(this);
        this.listChkboxMetas = this.listChkboxMetas.bind(this);
        this.listArea = this.listArea.bind(this);
    }

    componentDidMount() {
        this.listArea();
        this.listChkboxMetas();
        this.listObjetivos();
    }

    handleInputChange(event) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        //const name = target.name;

        //let form = this.state.form;
        //let txt = this.state.txt;
        //form[name] = value;

        //this.setState({form: form, txt: txt});
    }

    validate() {
        let valid = true;

        let requireds = this.state.requireds;
        //let form = this.state.form;
        //let txt = this.state.txt;

        this.setState({ requireds: requireds });
        return valid;
    }

    listArea() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'menu/osc/objetivo_projeto',
            success: function (data) {
                data.find(function (item) {
                    item.checked = false;
                    item.metas = null;
                });
                this.setState({ loading: false, objetivos: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listObjetivos() {

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/objetivos/' + 455128,
            success: function (data) {
                //console.log('-----data', data);
                let objetosSelected = [];
                data.find(function (item) {
                    objetosSelected.push(item.meta_projeto.objetivo_projeto.cd_objetivo_projeto);
                });

                const arrUnique = [...new Set(objetosSelected)];

                this.setState({ loading: false, datalistObjetivos: arrUnique });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubobjetivos(id) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'componente/metas_objetivo_projeto/' + id,
            success: function (data) {

                let objetivos = this.state.objetivos;
                let titleObjetivo = this.state.objetivos[id - 1].tx_nome_objetivo_projeto;

                data.find(function (item) {
                    item.display = true;
                    item.checked = false;
                });

                objetivos.find(function (item) {
                    if (item.metas) {
                        item.metas.find(function (itemMeta) {
                            itemMeta.display = false;
                        });
                        if (item.cd_objetivo_projeto === id) {
                            item.metas.find(function (itemMeta) {
                                itemMeta.display = true;
                            });
                        }
                    }
                    if (item.cd_objetivo_projeto === id && !item.metas) {
                        item.metas = data;
                    }
                });

                this.setState({
                    loading: false,
                    objetivos: objetivos,
                    id_area: id,
                    buttonObjetivos: id,
                    titleMeta: true,
                    titleObjetivo: titleObjetivo
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    listChkboxMetas() {

        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl2 + 'osc/objetivos/' + 455128,
            success: function (data) {
                data.find(function (item) {
                    item.checked = true;
                    item.metas = null;
                });

                this.setState({ dataChkboxMetas: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    checkMetas(cd_objetivo, cd_meta, id_objetivo_osc, checkedMeta) {
        let objetivos = this.state.objetivos;
        objetivos.find(function (item) {
            if (item.cd_objetivo_projeto === cd_objetivo) {
                item.metas.find(function (itemMeta) {
                    if (itemMeta.cd_meta_projeto === cd_meta) {
                        itemMeta.checked = true;
                    }
                });
            }
        });

        if (checkedMeta === true) {
            $.ajax({
                method: 'POST',
                url: getBaseUrl2 + 'osc/objetivo',
                data: {
                    cd_meta_osc: cd_meta,
                    id_osc: 455128,
                    ft_objetivo_osc: 'Representante de OSC'
                },
                cache: false,
                success: function (data) {
                    this.listChkboxMetas();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        } else {
            $.ajax({
                method: 'DELETE',
                url: getBaseUrl2 + 'osc/objetivo/' + id_objetivo_osc,
                data: {},
                cache: false,
                success: function (data) {
                    this.listChkboxMetas();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                }.bind(this)
            });
        }

        this.setState({ objetivos: objetivos });
    }

    callSubobjetivos(id) {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl + 'componente/metas_objetivo_projeto/' + id,
            success: function (data) {

                let objetivos = this.state.objetivos;

                let titleObjetivo = this.state.objetivos[id - 1].tx_nome_objetivo_projeto;

                data.find(function (item) {
                    item.display = true;
                    item.checked = false;
                });
                objetivos.find(function (item) {
                    if (item.metas) {
                        item.metas.find(function (itemMeta) {
                            itemMeta.display = false;
                        });

                        if (item.cd_objetivo_projeto === id) {
                            item.metas.find(function (itemMeta) {
                                itemMeta.display = true;
                            });
                        }
                    }
                    if (item.cd_objetivo_projeto === id && !item.metas) {
                        item.metas = data;
                    }
                });

                this.setState({ loading: false, objetivos: objetivos, id_area: id, buttonObjetivos: id, titleMeta: true, titleObjetivo: titleObjetivo });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    chekedMetasObjetivo(cd_objetivo_projeto) {
        this.state.objetivos.find(item => {
            if (item.cd_objetivo_projeto === cd_objetivo_projeto) {
                if (item.metas) {
                    item.metas.find(meta => {
                        console.log(meta);
                        this.state.dataChkboxMetas.find(itemChecked => {
                            if (meta.cd_meta_projeto === itemChecked.cd_meta_osc) {
                                return true;
                            }
                        });
                    });
                }
            }
        });

        return false;
    }

    render() {

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        let objetivos = null;
        let metas = [];
        if (this.state.objetivos) {
            objetivos = this.state.objetivos.map(function (item) {

                let checkedMetas = false;

                if (this.state.datalistObjetivos) {
                    //console.log('datalistObjetivos: ', this.state.datalistObjetivos.indexOf(item.cd_objetivo_projeto));
                    if (this.state.datalistObjetivos.indexOf(item.cd_objetivo_projeto) != -1) {
                        checkedMetas = true;
                        //console.log('-------->', checkedMetas);
                    }
                }

                let png = padDigits(item.cd_objetivo_projeto, 2);

                if (item.metas) {

                    //console.log('->', this.state.buttonObjetivos, item.cd_objetivo_projeto);

                    metas.push(item.metas.map(function (itemMeta) {
                        if (itemMeta.checked) {
                            checkedMetas = true;
                        }

                        let checkedMeta2 = false;
                        let id_objetivo_osc = 0;
                        this.state.dataChkboxMetas.find(itemChecked => {
                            if (itemMeta.cd_meta_projeto === itemChecked.cd_meta_osc) {
                                checkedMeta2 = true;
                                id_objetivo_osc = itemChecked.id_objetivo_osc;
                            }
                        });

                        return React.createElement(
                            'div',
                            { key: "subarea_" + itemMeta.cd_meta_projeto, style: { display: itemMeta.display ? '' : 'none' } },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox', onChange: () => this.checkMetas(item.cd_objetivo_projeto, itemMeta.cd_meta_projeto, id_objetivo_osc, !checkedMeta2) },
                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "subarea_" + itemMeta.cd_meta_projeto, required: true, defaultChecked: checkedMeta2, onChange: this.handleInputChange }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label', htmlFor: "subarea_" + itemMeta.cd_meta_projeto },
                                    itemMeta.tx_nome_meta_projeto
                                )
                            ),
                            React.createElement('hr', null)
                        );
                    }.bind(this)));
                }

                return React.createElement(
                    'div',
                    { className: 'custom-control custom-checkbox', key: "area_" + item.cd_objetivo_projeto, onChange: () => this.callSubobjetivos(item.cd_objetivo_projeto), style: { paddingLeft: 0 } },
                    React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: "area_" + item.cd_objetivo_projeto, required: true }),
                    React.createElement(
                        'label',
                        { htmlFor: "area_" + item.cd_objetivo_projeto, style: { marginLeft: '0', marginRight: '5px', paddingBottom: 0 } },
                        React.createElement('img', { src: "img/ods/" + png + ".png", alt: '', className: (this.chekedMetasObjetivo(item.cd_objetivo_projeto) || checkedMetas ? "" : "item-off") + (this.state.buttonObjetivos == item.cd_objetivo_projeto ? " item-focus" : ""), width: '83', style: { position: 'relative' }, title: item.tx_nome_objetivo_projeto })
                    )
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-12' },
                    React.createElement(
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
                                    React.createElement('i', { className: 'fa fa-file-alt', 'aria-hidden': 'true' })
                                ),
                                React.createElement(
                                    'h3',
                                    null,
                                    'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                                ),
                                React.createElement('hr', null),
                                React.createElement('br', null)
                            )
                        )
                    ),
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    null,
                                    objetivos,
                                    React.createElement('br', null),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.titleMeta ? '' : 'none' } },
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Metas Relacionadas ao ODS definido'
                                    ),
                                    React.createElement('hr', null),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'strong',
                                            null,
                                            this.state.titleObjetivo
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('br', null),
                                        metas
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'space' })
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Objetivos, null), document.getElementById('objetivos'));