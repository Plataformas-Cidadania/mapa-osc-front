class Descricao extends React.Component {
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
                tx_razao_social_descricao: true,
                tx_sigla_descricao: true,
                tx_nome_situacao_imovel_descricao: true,
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
        this.getDescricao = this.getDescricao.bind(this);
    }

    componentDidMount() {
        this.getDescricao();
    }

    getDescricao() {
        this.setState({ button: false });
        $.ajax({
            method: 'GET',
            url: '/get-descricao',
            cache: false,
            success: function (data) {
                this.setState({ loading: false, form: data.descricao, button: true });
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
                url: '/update-descricao',
                data: {
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function (data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if (data.tx_razao_social_descricao || data.email) {
                        if (data.tx_razao_social_descricao) {
                            msg += ' tx_razao_social_descricao';
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
                                        'Sigla da DESCRICAO'
                                    ),
                                    React.createElement('input', { className: "form-control  " + (this.state.requireds.tx_sigla_descricao ? '' : 'invalid-field'), type: 'text', name: 'tx_sigla_descricao', onChange: this.handleInputChange, value: this.state.form.tx_sigla_descricao, placeholder: 'Sigla da DESCRICAO' }),
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
                                    React.createElement('input', { className: "form-control  " + (this.state.requireds.tx_razao_social_descricao ? '' : 'invalid-field'), type: 'text', name: 'tx_razao_social_descricao', onChange: this.handleInputChange, value: this.state.form.tx_razao_social_descricao, placeholder: 'Nome Fantasia' }),
                                    React.createElement('br', null)
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
                                        'E-mail oficial da DESCRICAO'
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
                                    'O que a DESCRICAO faz'
                                ),
                                React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
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
                                        React.createElement('img', { src: 'img/ods/01.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/02.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/03.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/04.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/05.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/06.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/07.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/08.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/09.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/10.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/11.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/12.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/13.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/14.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/15.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/16.png', alt: '', className: 'item-off', width: '95' })
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement('img', { src: 'img/ods/17.png', alt: '', className: 'item-off', width: '95' })
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
                                            '\xC1reas e Sub\xE1reas de atua\xE7\xE3o da DESCRICAO'
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
                                            'Descri\xE7\xE3o da DESCRICAO'
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
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Hist\xF3rico'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Miss\xE3o'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Vis\xE3o'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'exampleFormControlTextarea1' },
                                        'Finalidades Estatut\xE1rias da DESCRICAO'
                                    ),
                                    React.createElement('textarea', { className: 'form-control', id: 'exampleFormControlTextarea1', rows: '3' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group col-md-12' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'inputEmail4' },
                                        'Link para o Estatutu da DESCRICAO'
                                    ),
                                    React.createElement('input', { type: 'emil', className: 'form-control', id: 'inputEmail4', placeholder: 'Email' })
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
                                            'T\xEDtulos e Certificados'
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
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'table',
                                        { className: 'table' },
                                        React.createElement(
                                            'thead',
                                            { className: 'bg-pri text-light' },
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'th',
                                                    { scope: 'col' },
                                                    'Titulo / Certificado'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { scope: 'col' },
                                                    'In\xEDcio da validade'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { scope: 'col' },
                                                    'Fim da validade'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { scope: 'col' },
                                                    'Localidade'
                                                ),
                                                React.createElement('th', { scope: 'col' })
                                            )
                                        ),
                                        React.createElement(
                                            'tbody',
                                            null,
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    'Unidade p\xFAblica Estadual'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    '01/08/2019'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    '01/08/2019'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    'Rio de Janeiro'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement('i', { className: 'far fa-trash-alt text-danger' })
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    'Unidade p\xFAblica Estadual'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    '01/08/2019'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    '01/08/2019'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    'Rio de Janeiro'
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement('i', { className: 'far fa-trash-alt text-danger' })
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-warning' },
                                        '+ Adicionar novo t\xEDtulo'
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
                                            'Rela\xE7\xF5es de Trabalho e Governan\xE7a '
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
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'bg-lgt box-itens-g min-h' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Quadro de Dirigentes'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert' },
                                            React.createElement('input', { placeholder: 'Insira o nome do dirigente' }),
                                            React.createElement('input', { placeholder: 'Insira o cargo dirigente' }),
                                            React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert-list' },
                                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Gabriel Lima' })
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: 'Diretor' })
                                            ),
                                            React.createElement('hr', null)
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6' },
                                    React.createElement(
                                        'div',
                                        { className: 'bg-lgt box-itens-g min-h' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Conselho Fiscal'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert' },
                                            React.createElement('input', { placeholder: 'Insira o nome do dirigente' }),
                                            React.createElement('input', { placeholder: 'Insira o cargo dirigente' }),
                                            React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'box-insert-list' },
                                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right ' }),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: '1111' })
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('input', { value: '2222' })
                                            ),
                                            React.createElement('hr', null)
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'row text-center' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement(
                                                'strong',
                                                null,
                                                'Trabalhadores'
                                            ),
                                            React.createElement('br', null),
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(
                                                'div',
                                                { className: 'bg-lgt box-itens' },
                                                React.createElement(
                                                    'h3',
                                                    null,
                                                    'Total de Trabalhadores'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement(
                                                        'h2',
                                                        null,
                                                        '11'
                                                    ),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'not-info' },
                                                        'a'
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(
                                                'div',
                                                { className: 'bg-lgt box-itens' },
                                                React.createElement(
                                                    'h3',
                                                    null,
                                                    'Empregados'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement(
                                                        'h2',
                                                        null,
                                                        'aa'
                                                    ),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'not-info' },
                                                        'aa'
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(
                                                'div',
                                                { className: 'bg-lgt box-itens' },
                                                React.createElement(
                                                    'h3',
                                                    null,
                                                    'Defici\xEAncia'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement(
                                                        'h2',
                                                        null,
                                                        'aa'
                                                    ),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'not-info' },
                                                        'aa'
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-3' },
                                            React.createElement(
                                                'div',
                                                { className: 'bg-lgt box-itens' },
                                                React.createElement(
                                                    'h3',
                                                    null,
                                                    'Volunt\xE1rios'
                                                ),
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement('input', { type: 'number', value: '10', className: 'input-lg', min: '1' }),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'not-info' },
                                                        '\xA0'
                                                    )
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
                                            'Espa\xE7os de Participa\xE7\xE3o Social'
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
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'div',
                                        { className: 'box-itens-g' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Conselhos de Pol\xEDticas P\xFAblicas'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'form-check' },
                                            React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                id: 'gridCheck' }),
                                            React.createElement(
                                                'label',
                                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                                'N\xE3o possui conselhos de pol\xEDticas p\xFAblicas'
                                            )
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-md-6', style: { border: '0' } },
                                                React.createElement(
                                                    'div',
                                                    { className: 'bg-lgt box-insert-g' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-item box-insert-list' },
                                                        React.createElement('br', null),
                                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Nome do Conselho:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Conselho Estadual Antidrogas/Conselho ' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Titularidade:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Suplente' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Nome de representante:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Fernando Lima de Souza ' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Periodicidade da Reuni\xE3o:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Mensal' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Data de in\xEDcio de vig\xEAncia:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: '01/12/2019' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Data de fim de vig\xEAncia:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: '01/12/2019' })
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
                                                    { className: 'bg-lgt box-insert-g' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-btn' },
                                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'p',
                                                            null,
                                                            'Novo Conselhos de Pol\xEDticas P\xFAblicas'
                                                        )
                                                    )
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
                                        { className: 'box-itens-g' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Confer\xEAncias de Pol\xEDticas P\xFAblicas'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'form-check' },
                                            React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                id: 'gridCheck' }),
                                            React.createElement(
                                                'label',
                                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                                'N\xE3o possui confer\xEAncias de pol\xEDticas p\xFAblicas'
                                            )
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-md-6', style: { border: '0' } },
                                                React.createElement(
                                                    'div',
                                                    { className: 'bg-lgt box-insert-m' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-item box-insert-list' },
                                                        React.createElement('br', null),
                                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Nome da Confer\xEAncia:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Confer\xEAncia Brasileira de Arranjos Produtivos Locais' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Ano de realiza\xE7\xE3o da confer\xEAncia:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: '1900' })
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Forma de participa\xE7\xE3o na confer\xEAncia:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Membro de comiss\xE3o organizadora nacional' })
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
                                                    { className: 'bg-lgt box-insert-m' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-btn' },
                                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'p',
                                                            null,
                                                            'Novo Conselhos de Pol\xEDticas P\xFAblicas'
                                                        )
                                                    )
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
                                        { className: 'box-itens-g' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Outros espa\xE7os de participa\xE7\xE3o social'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'form-check' },
                                            React.createElement('input', { className: 'form-check-input', type: 'checkbox',
                                                id: 'gridCheck' }),
                                            React.createElement(
                                                'label',
                                                { className: 'form-check-label', htmlFor: 'gridCheck' },
                                                'N\xE3o possui outros espa\xE7os de participa\xE7\xE3o social'
                                            )
                                        ),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-md-6', style: { border: '0' } },
                                                React.createElement(
                                                    'div',
                                                    { className: 'bg-lgt box-insert-p' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-item box-insert-list' },
                                                        React.createElement('br', null),
                                                        React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                                        React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '20px' } }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            React.createElement(
                                                                'h3',
                                                                null,
                                                                'Atua\xE7\xE3o em F\xF3runs, Articula\xE7\xF5es, Coletivos e Redes de DESCRICAOs:'
                                                            ),
                                                            React.createElement(
                                                                'p',
                                                                null,
                                                                React.createElement('input', { value: 'Confer\xEAncia Brasileira de Arranjos Produtivos Locais' })
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
                                                    { className: 'bg-lgt box-insert-p' },
                                                    React.createElement(
                                                        'div',
                                                        { className: 'box-insert-btn-p' },
                                                        React.createElement('i', { className: 'fas fa-plus-circle fa-3x tx-pri' }),
                                                        React.createElement('br', null),
                                                        React.createElement(
                                                            'p',
                                                            null,
                                                            'Novo Outros espa\xE7os de participa\xE7\xE3o social'
                                                        )
                                                    )
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
                                            'Projetos, atividades e programas - PAP'
                                        ),
                                        React.createElement('div', { className: 'line line-fix' }),
                                        React.createElement('hr', null)
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-12' },
                                            React.createElement(
                                                'table',
                                                { className: 'table' },
                                                React.createElement(
                                                    'thead',
                                                    { className: 'bg-pri text-light' },
                                                    React.createElement(
                                                        'tr',
                                                        null,
                                                        React.createElement(
                                                            'th',
                                                            { scope: 'col' },
                                                            'Projeto'
                                                        ),
                                                        React.createElement('th', { scope: 'col' })
                                                    )
                                                ),
                                                React.createElement(
                                                    'tbody',
                                                    null,
                                                    React.createElement(
                                                        'tr',
                                                        null,
                                                        React.createElement(
                                                            'td',
                                                            null,
                                                            'Rio de Janeiro'
                                                        ),
                                                        React.createElement(
                                                            'td',
                                                            null,
                                                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                                            React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '10px' } })
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'tr',
                                                        null,
                                                        React.createElement(
                                                            'td',
                                                            null,
                                                            'Rio de Janeiro'
                                                        ),
                                                        React.createElement(
                                                            'td',
                                                            null,
                                                            React.createElement('i', { className: 'far fa-trash-alt text-danger float-right' }),
                                                            React.createElement('i', { className: 'far fa-edit text-primary float-right', style: { marginRight: '10px' } })
                                                        )
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-warning' },
                                                '+ Adicionar projeto'
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
                                            'Fontes de recursos anuais da DESCRICAO'
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
                                    { className: 'col-md-12' },
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'title-style' },
                                        React.createElement(
                                            'h2',
                                            null,
                                            'Fontes de recursos anuais da DESCRICAO'
                                        ),
                                        React.createElement('div', { className: 'line line-fix' }),
                                        React.createElement('hr', null)
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    { style: { position: 'fixed', top: '600px', left: '5%' } },
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
                            )
                        ),
                        React.createElement('div', { className: 'space' })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Descricao, null), document.getElementById('descricao'));