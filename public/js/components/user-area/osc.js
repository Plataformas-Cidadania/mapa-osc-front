class Osc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: ''
            },
            txt: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                tx_razao_social_osc: true,
                tx_sigla_osc: true,
                tx_nome_situacao_imovel_osc: true,
                tx_nome_responsavel_legal: true,
                cnpj: true
            },
            showMsg: false,
            msg: '',
            showIcon: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateOsc = this.updateOsc.bind(this);
        this.validate = this.validate.bind(this);
        this.getCabecalho = this.getCabecalho.bind(this);
        this.getOsc = this.getOsc.bind(this);
    }

    componentDidMount() {
        this.getCabecalho();
        this.getOsc();
    }

    getCabecalho() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: 'http://mapa-osc-api.local/api/osc/cabecalho/455128',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, txt: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    getOsc() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: 'http://mapa-osc-api.local/api/osc/dados_gerais/455128',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data, button: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let form = this.state.form;
        let txt = this.state.txt;
        form[name] = value;

        this.setState({ form: form, txt: txt });
    }

    validate() {
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;
        let txt = this.state.txt;

        this.setState({ requireds: requireds });
        return valid;
    }

    updateOsc(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'PUT',
                url: 'http://mapa-osc-api.local/api/osc/dados_gerais/455128',
                data: this.state.form,
                cache: false,
                success: function (data) {

                    /*let msg = 'Já existe outro cadastro com esse';
                      if(data.tx_razao_social_osc || data.email){
                        if(data.tx_razao_social_osc){
                            msg+= ' tx_razao_social_osc';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true, showIcon: true});
                        return;
                    }*/

                    let msg = 'Dados alterados com sucesso!';
                    this.setState({ loading: false, msg: msg, showMsg: true, updateOk: true, button: true });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({ loading: false, msg: msg, showMsg: true, updateOk: true, button: true });
                }.bind(this)
            });
        });
    }

    render() {

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
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    { className: 'title-style' },
                                    React.createElement(
                                        'h2',
                                        null,
                                        'Dados Gerais'
                                    ),
                                    React.createElement('div', { className: 'line line-fix' }),
                                    React.createElement('hr', null)
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-3' },
                                React.createElement(
                                    'div',
                                    { className: 'img-upload' },
                                    React.createElement('img', {
                                        src: 'https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif',
                                        alt: '' }),
                                    React.createElement(
                                        'div',
                                        { className: 'img-upload-i' },
                                        React.createElement('i', { className: 'fas fa-image tx-pri' })
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-9' },
                                React.createElement('br', null),
                                React.createElement(
                                    'p',
                                    null,
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Nome:'
                                    ),
                                    ' ',
                                    this.state.txt.tx_razao_social_osc,
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'CNPJ:'
                                    ),
                                    ' ',
                                    this.state.txt.cd_identificador_osc,
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Natureza Jur\xEDdica:'
                                    ),
                                    ' ',
                                    this.state.txt.tx_nome_natureza_juridica_osc,
                                    React.createElement('br', null)
                                )
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement('br', null),
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-3' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g", type: 'text', name: 'tx_sigla_osc', onChange: this.handleInputChange, value: this.state.form.tx_sigla_osc,
                                            placeholder: 'Insira a Sigla' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_sigla_osc' },
                                            'Sigla'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-9' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g", type: 'text', name: 'tx_nome_fantasia_osc', onChange: this.handleInputChange, value: this.state.form.tx_nome_fantasia_osc,
                                            placeholder: 'Insira o Nome Fantasia' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_razao_social_osc' },
                                            'Nome Fantasia'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-secondary' },
                                        React.createElement('i', { className: 'fas fa-database float-right tx-pri' }),
                                        React.createElement(
                                            'strong',
                                            null,
                                            'Endere\xE7o:'
                                        ),
                                        React.createElement('br', null),
                                        this.state.form.tx_endereco,
                                        ', ',
                                        this.state.form.nr_localizacao,
                                        React.createElement('br', null),
                                        this.state.form.tx_bairro,
                                        ', ',
                                        this.state.form.tx_nome_municipio,
                                        ' - ',
                                        this.state.form.tx_nome_uf,
                                        React.createElement('br', null),
                                        React.createElement(
                                            'strong',
                                            null,
                                            'CEP.:'
                                        ),
                                        ' ',
                                        this.state.form.nr_cep
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEstado' },
                                        'Situa\xE7\xE3o do Im\xF3vel'
                                    ),
                                    React.createElement(
                                        'select',
                                        { name: 'tx_nome_situacao_imovel_osc', className: "form-control", value: this.state.form.tx_nome_situacao_imovel_osc, onChange: this.handleInputChange },
                                        React.createElement(
                                            'option',
                                            { value: '-1' },
                                            'Selecione'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: 'Pr\xF3prio' },
                                            'Pr\xF3prio'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: 'Alugado' },
                                            'Alugado'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: 'Cedido' },
                                            'Cedido'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: 'Comodato' },
                                            'Comodato'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputAddress2' },
                                        'Ano de inscri\xE7\xE3o do CNPJ'
                                    ),
                                    React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_ano_cadastro_cnpj', onChange: this.handleInputChange, value: this.state.form.dt_ano_cadastro_cnpj })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputCity' },
                                        'Ano de Funda\xE7\xE3o'
                                    ),
                                    React.createElement('input', { className: "form-control form-g ", type: 'date', name: 'dt_fundacao_osc', onChange: this.handleInputChange, value: this.state.form.dt_fundacao_osc })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_nome_responsavel_legal', onChange: this.handleInputChange, value: this.state.form.tx_nome_responsavel_legal,
                                            placeholder: 'Insira o Respons\xE1vel Legal' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_email' },
                                            'Respons\xE1vel Legal'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_email', onChange: this.handleInputChange, value: this.state.form.tx_email,
                                            placeholder: 'Insira o endere\xE7o de email da OSC' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_email' },
                                            'E-mail oficial da OSC'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_site', onChange: this.handleInputChange, value: this.state.form.tx_site,
                                            placeholder: 'Se houver, insira o endere\xE7o da p\xE1gina da OSC na internet. Ex.: http://www.seudominio.com.br' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_site' },
                                            'Web site'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_telefone', onChange: this.handleInputChange, value: this.state.form.tx_telefone,
                                            placeholder: 'Se houver, insira o telefone' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_telefone' },
                                            'Telefone'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float' },
                                        React.createElement('input', { className: "form-control form-g ", type: 'text', name: 'tx_telefone', onChange: this.handleInputChange, value: this.state.form.tx_telefone,
                                            placeholder: 'Se houver, insira o celular' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_telefone' },
                                            'Celular'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-off' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'label-float-tx' },
                                        React.createElement('textarea', { className: 'form-control form-g', name: 'tx_resumo_osc', onChange: this.handleInputChange, value: this.state.form.tx_resumo_osc,
                                            rows: '3', placeholder: 'O que a OSC faz' }),
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'tx_resumo_osc' },
                                            'O que a OSC faz'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'label-box-info-tx' },
                                            React.createElement(
                                                'p',
                                                null,
                                                '\xA0'
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'h4',
                                null,
                                'Objetivos do Desenvolvimento Sustent\xE1vel - ODS'
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'ul',
                                    { className: 'menu-txt-icon' },
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/01.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/02.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/03.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/04.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/05.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/06.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/07.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/08.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/09.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/10.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/11.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/12.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/13.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/14.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/15.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/16.png', alt: '', className: 'item-off', width: '87' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/17.png', alt: '', className: 'item-off', width: '87' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement('br', null),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'h4',
                                            null,
                                            React.createElement(
                                                'strong',
                                                null,
                                                '1 - Acabar com a pobreza em todas as suas formas, em todos os lugares'
                                            )
                                        ),
                                        React.createElement('br', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement(
                                                'div',
                                                { className: 'custom-control custom-checkbox ' },
                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                                    'Associa\xE7\xE3o Privada'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'invalid-feedback' },
                                                    'Example invalid feedback text'
                                                )
                                            ),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'div',
                                                { className: 'custom-control custom-checkbox ' },
                                                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', id: 'customControlValidation1', required: true }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'custom-control-label', htmlFor: 'customControlValidation1' },
                                                    'Associa\xE7\xE3o Privada'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'invalid-feedback' },
                                                    'Example invalid feedback text'
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: '-10px' } },
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.loading ? 'block' : 'none' } },
                                            React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                            ' Processando ',
                                            React.createElement('br', null),
                                            ' ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'alert alert-' + (this.state.updateOk ? "success" : "danger") },
                                            React.createElement('i', { className: "far " + (this.state.updateOk ? "fa-check-circle" : "fa-times-circle") }),
                                            this.state.msg
                                        ),
                                        React.createElement(
                                            'button',
                                            { type: 'button', className: 'btn btn-success', onClick: this.updateOsc },
                                            React.createElement('i', {
                                                className: 'fas fa-cloud-download-alt' }),
                                            ' Salvar descri\xE7\xE3o'
                                        ),
                                        React.createElement('br', null)
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

ReactDOM.render(React.createElement(Osc, null), document.getElementById('osc'));