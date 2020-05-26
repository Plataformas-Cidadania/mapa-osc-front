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
            juridica: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.getOsc = this.getOsc.bind(this);
    }

    componentDidMount() {
        //this.getAddress();
        this.getOsc();
    }

    getAddress() {
        this.setState({ loadingCep: true });
        $.ajax({
            method: 'GET',
            url: '/get-address/' + this.state.form.cep,
            cache: false,
            success: function (data) {
                console.log(data);
                let address = data.address;

                let form = this.state.form;
                form.endereco = address.logradouro;
                form.bairro = address.bairro;
                form.cidade = address.localidade;
                form.estado = address.uf;

                this.setState({ loadingCep: false, form: form });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    getOsc() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: '/get-osc',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data.osc, button: true });
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
        form[name] = value;

        this.setState({ form: form });
    }

    validate() {
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;

        /*for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                valid = false;
            }else{
                requireds[index] = true;
            }
        }*/

        /*for(let index in requireds){
            if(!form[index] || form[index]==''){
                requireds[index] = false;
                if((index==="cnpj" ) && !this.state.juridica){
                    requireds[index] = true;
                }else{
                    valid = false;
                }
            }else{
                requireds[index] = true;
            }
        }*/

        //console.log(requireds);

        this.setState({ requireds: requireds });
        return valid;
    }

    register(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {
            $.ajax({
                method: 'POST',
                url: '/update-osc',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if (data.tx_razao_social_osc || data.email) {
                        if (data.tx_razao_social_osc) {
                            msg += ' tx_razao_social_osc';
                        }
                        if (data.email) {
                            msg += ' email';
                        }
                        this.setState({ msg: msg, showMsg: true, loading: false, button: true });
                        return;
                    }

                    msg = 'Dados alterados com sucesso!';
                    this.setState({ msg: msg, showMsg: true, loading: false, button: true, color: 'success' });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false, msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger' });
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
                                React.createElement('br', null),
                                React.createElement('br', null),
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
                                        '\xC1rea de atua\xE7\xE3o:'
                                    ),
                                    ' ',
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'CNPJ:'
                                    ),
                                    ' ',
                                    React.createElement('br', null),
                                    React.createElement(
                                        'strong',
                                        null,
                                        'Natureza Jur\xEDdica:'
                                    ),
                                    ' ',
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
                                { className: 'form-row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-2' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEmail4' },
                                        'Sigla da OSC'
                                    ),
                                    React.createElement('input', { className: "form-control  " + (this.state.requireds.tx_sigla_osc ? '' : 'invalid-field'), type: 'text', name: 'tx_sigla_osc', onChange: this.handleInputChange, value: this.state.form.tx_sigla_osc, placeholder: 'Sigla da OSC' }),
                                    React.createElement('br', null)
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-10' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputPassword4' },
                                        'Nome Fantasia'
                                    ),
                                    React.createElement('input', { className: "form-control  " + (this.state.requireds.tx_razao_social_osc ? '' : 'invalid-field'), type: 'text', name: 'tx_razao_social_osc', onChange: this.handleInputChange, value: this.state.form.tx_razao_social_osc, placeholder: 'Nome Fantasia' }),
                                    React.createElement('br', null)
                                )
                            ),
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
                                ', ***',
                                React.createElement('br', null),
                                this.state.form.tx_bairro,
                                ', ',
                                this.state.form.cd_municipio,
                                ' - ***',
                                React.createElement('br', null),
                                React.createElement(
                                    'strong',
                                    null,
                                    'CEP.:'
                                ),
                                ' ',
                                this.state.form.nr_cep
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
                                        { id: 'inputEstado', className: 'form-control' },
                                        React.createElement(
                                            'option',
                                            { selected: true },
                                            'Escolher...'
                                        ),
                                        React.createElement(
                                            'option',
                                            null,
                                            '...'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputAddress2' },
                                        'Ano de inscri\xE7\xE3o no Cadastro de CNPJ'
                                    ),
                                    React.createElement('input', { type: 'date', className: 'form-control', id: 'inputAddress2',
                                        placeholder: 'Apartamento, hotel, casa, etc.' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputCity' },
                                        'Ano de Funda\xE7\xE3o'
                                    ),
                                    React.createElement('input', { type: 'date', className: 'form-control', id: 'inputCity' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'inputAddress' },
                                    'Respons\xE1vel Legal'
                                ),
                                React.createElement('input', { className: "form-control  " + (this.state.requireds.tx_nome_responsavel_legal ? '' : 'invalid-field'), type: 'text', name: 'tx_nome_responsavel_legal', onChange: this.handleInputChange, value: this.state.form.tx_nome_responsavel_legal, placeholder: 'Respons\xE1vel Legal' }),
                                React.createElement('br', null)
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-6' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEmail4' },
                                        'E-mail oficial da OSC'
                                    ),
                                    React.createElement('input', { type: 'emil', className: 'form-control', id: 'inputEmail4',
                                        placeholder: 'Email' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-6' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputPassword4' },
                                        'Site'
                                    ),
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'inputPassword4',
                                        placeholder: 'Senha' })
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
                                        { htmlFor: 'inputEmail4' },
                                        'Telefone'
                                    ),
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'inputEmail4',
                                        placeholder: 'Email' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-4' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputPassword4' },
                                        'Celular'
                                    ),
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'inputPassword4',
                                        placeholder: 'Senha' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'exampleFormControlTextarea1' },
                                    'O que a OSC faz'
                                ),
                                React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1',
                                    rows: '3' })
                            ),
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
                                        React.createElement('img', { src: 'img/ods/01.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/02.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/03.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/04.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/05.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/06.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/07.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/08.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/09.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/10.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/11.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/12.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/13.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/14.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/15.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/16.png', alt: '', className: 'item-off' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/17.png', alt: '', className: 'item-off' })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement('br', null),
                                        React.createElement(
                                            'h3',
                                            null,
                                            '1 - Acabar com a pobreza em todas as suas formas, em todos os lugares'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement(
                                                'div',
                                                { className: 'form-check' },
                                                React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                    id: 'gridCheck' }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'form-check-label', htmlFor: 'gridCheck' },
                                                    '1.1 At\xE9 2030, erradicar a pobreza extrema para todas as pessoas em todos os lugares, atualmente medida como pessoas vivendo com menos de US$ 1,25 por dia'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-check' },
                                                React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                    id: 'gridCheck2' }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'form-check-label', htmlFor: 'gridCheck2' },
                                                    '1.2 At\xE9 2030, reduzir pelo menos \xE0 metade a propor\xE7\xE3o de homens, mulheres e crian\xE7as, de todas as idades, que vivem na pobreza, em todas as suas dimens\xF5es, de acordo com as defini\xE7\xF5es nacionais'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-check' },
                                                React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                    id: 'gridCheck3' }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'form-check-label', htmlFor: 'gridCheck3' },
                                                    '1.3 Implementar, em n\xEDvel nacional, medidas e sistemas de prote\xE7\xE3o social adequados, para todos, incluindo pisos, e at\xE9 2030 atingir a cobertura substancial dos pobres e vulner\xE1veis'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-check' },
                                                React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                    id: 'gridCheck4' }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'form-check-label', htmlFor: 'gridCheck4' },
                                                    '1.4 At\xE9 2030, garantir que todos os homens e mulheres, particularmente os pobres e vulner\xE1veis, tenham direitos iguais aos recursos econ\xF4micos, bem como o acesso a servi\xE7os b\xE1sicos, propriedade e controle sobre a terra e outras formas de propriedade, heran\xE7a, recursos naturais, novas tecnologias apropriadas e servi\xE7os financeiros, incluindo microfinan\xE7as'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-check' },
                                                React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                    id: 'gridCheck5' }),
                                                React.createElement(
                                                    'label',
                                                    { className: 'form-check-label', htmlFor: 'gridCheck5' },
                                                    '1.5 At\xE9 2030, construir a resili\xEAncia dos pobres e daqueles em situa\xE7\xE3o de vulnerabilidade, e reduzir a exposi\xE7\xE3o e vulnerabilidade destes a eventos extremos relacionados com o clima e outros choques e desastres econ\xF4micos, sociais e ambientais'
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
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'title-style' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            '\xC1reas e Sub\xE1reas de atua\xE7\xE3o da OSC'
                                        ),
                                        React.createElement('div', { className: 'line line-fix' }),
                                        React.createElement('hr', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'text-center' },
                                        'Atividade econ\xF4mica (CNAE)'
                                    ),
                                    React.createElement('br', null)
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-secondary' },
                                        React.createElement(
                                            'h2',
                                            { className: 'text-center' },
                                            '\xC1rea de atua\xE7\xE3o 1'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'input-icon' },
                                            React.createElement('input', { type: 'text', className: 'form-control',
                                                placeholder: 'Busque um artigo...' }),
                                            React.createElement('i', { className: 'fas fa-search' })
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('br', null),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'form-check' },
                                                    React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                        id: 'gridCheck' }),
                                                    React.createElement(
                                                        'label',
                                                        { className: 'form-check-label',
                                                            htmlFor: 'gridCheck' },
                                                        'Educa\xE7\xE3o infantil'
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { className: 'form-check' },
                                                    React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                        id: 'gridCheck2' }),
                                                    React.createElement(
                                                        'label',
                                                        { className: 'form-check-label',
                                                            htmlFor: 'gridCheck2' },
                                                        'Ensino m\xE9dio'
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-secondary' },
                                        React.createElement(
                                            'h2',
                                            { className: 'text-center' },
                                            '\xC1rea de atua\xE7\xE3o 2'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'input-icon' },
                                            React.createElement('input', { type: 'text', className: 'form-control',
                                                placeholder: 'Busque um artigo...' }),
                                            React.createElement('i', { className: 'fas fa-search' })
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
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'title-style' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Descri\xE7\xE3o da OSC'
                                        ),
                                        React.createElement('div', { className: 'line line-fix' }),
                                        React.createElement('hr', null)
                                    ),
                                    React.createElement('br', null)
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'p',
                                    null,
                                    React.createElement(
                                        'i',
                                        null,
                                        '* campos obrigat\xF3rios'
                                    )
                                ),
                                React.createElement(
                                    'button',
                                    { style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-success', onClick: this.register },
                                    'Salvar'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'text-' + this.state.color },
                                    this.state.msg
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loading ? 'block' : 'none' } },
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                    'Processando'
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