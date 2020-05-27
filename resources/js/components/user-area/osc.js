class Osc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                endereco: '',
                tx_endereco: '',
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


                cnpj: true,
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

    componentDidMount(){
        //this.getAddress();
        this.getOsc();
    }


    getAddress(){
        this.setState({loadingCep: true});
        $.ajax({
            method: 'GET',
            url: '/get-address/'+this.state.form.cep,
            cache: false,
            success: function (data) {
                console.log(data);
                let address = data.address;

                let form = this.state.form;
                form.endereco = address.logradouro;
                form.bairro = address.bairro;
                form.cidade = address.localidade;
                form.estado = address.uf;

                this.setState({loadingCep: false, form: form})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loadingCep: false });
            }.bind(this)
        });
    }

    getOsc(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            url: '/get-osc',
            cache: false,
            success: function (data) {
                this.setState({loading: false, form: data.osc, button:true})
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

        this.setState({form: form});
    }

    validate(){
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

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }


        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:'POST',
                url: '/update-osc',
                data:{
                    form: this.state.form,
                    plan_id: this.props.plan_id
                },
                cache: false,
                success: function(data) {
                    console.log('reg', data);

                    let msg = 'Já existe outro cadastro com esse';

                    if(data.tx_razao_social_osc || data.email){
                        if(data.tx_razao_social_osc){
                            msg+= ' tx_razao_social_osc';
                        }
                        if(data.email){
                            msg+= ' email';
                        }
                        this.setState({msg: msg, showMsg: true, loading: false, button: true});
                        return;
                    }

                    msg = 'Dados alterados com sucesso!';
                    this.setState({msg: msg, showMsg: true, loading: false, button: true, color: 'success'});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({loading: false,  msg: 'Ocorreu um erro!', showMsg: true, button: true, color: 'danger'});
                }.bind(this)
            });
        });


    }


    render(){



        return (
            <div>

                {/*<div className="row">
                    <div className="col-md-12">
                        <form>
                            <div>
                                <div className="col-md-5">
                                    <label htmlFor="cnpj">CNPJ*</label><br/>
                                    <input className={"form-control form-g "+(this.state.requireds.cnpj ? '' : 'invalid-field')} type="text" name="cnpj" onChange={this.handleInputChange} value={this.state.form.cnpj} placeholder="CNPJ"/><br/>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="name">Seu nome e sobrenome*</label><br/>
                                <input className={"form-control form-g "+(this.state.requireds.name ? '' : 'invalid-field')} type="text" name="name" onChange={this.handleInputChange} value={this.state.form.name} placeholder="Nome"/><br/>
                            </div>

                            <div className="col-md-8">
                                <label htmlFor="email">E-mail*</label><br/>
                                <input className={"form-control form-g "+(this.state.requireds.email ? '' : 'invalid-field')} type="text" name="email" onChange={this.handleInputChange} value={this.state.form.email} placeholder="E-mail"/><br/>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="tx_razao_social_osc">tx_razao_social_osc*</label><br/>
                                <input className={"form-control form-g "+(this.state.requireds.tx_razao_social_osc ? '' : 'invalid-field')} type="text" name="tx_razao_social_osc" onChange={this.handleInputChange} value={this.state.form.tx_razao_social_osc} placeholder="Tx_razao_social_osc"/><br/>
                            </div>




                            <div className="clear-float"/>

                        </form>
                    </div>
                </div>

                --------------------------------------------------*/}

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            {/*<div className="alert alert-secondary box-floating">
                                <i className="fas fa-chevron-right menu-icons-close btn-menu-txt"/>
                                <i className="fas fa-chevron-left menu-icons-close btn-menu-txt-show"
                                   style={{display: "none"}}/>
                                <ul className="menu-icons menu-right">
                                    <li id="btn-right"/>
                                    <li><a href="detalhar/1#dados-gerais">
                                        <div><i className="far fa-file-alt"/></div>
                                        <p className="menu-icons-txt">Dados gerais</p></a></li>
                                    <li><a href="detalhar/1#area-atuacao">
                                        <div><i className="fas fa-share-alt"/></div>
                                        <p className="menu-icons-txt">Área de atuação</p></a></li>
                                    <li><a href="detalhar/1#descricao">
                                        <div><i className="fas fa-align-justify"/></div>
                                        <p className="menu-icons-txt">Descrição da OSC</p></a></li>
                                    <li><a href="detalhar/1#titulacao">
                                        <div><i className="fas fa-certificate"/></div>
                                        <p className="menu-icons-txt">Titulações e Certificações</p></a></li>
                                    <li><a href="detalhar/1#governanca">
                                        <div><i className="fas fa-briefcase"/></div>
                                        <p className="menu-icons-txt">Trabalho e Governança</p></a></li>
                                    <li><a href="detalhar/1#participacao">
                                        <div><i className="fas fa-users"/></div>
                                        <p className="menu-icons-txt">Participação social</p></a></li>
                                    <li><a href="detalhar/1#projetos">
                                        <div><i className="fas fa-project-diagram"/></div>
                                        <p className="menu-icons-txt">Projetos</p></a></li>
                                    <li><a href="detalhar/1#fontes">
                                        <div><i className="fas fa-boxes"/></div>
                                        <p className="menu-icons-txt">Fontes de recursos</p></a></li>
                                </ul>
                                <i className="fas fa-times fa-2x float-right btn-right"/>
                            </div>*/}

                            <div className="row">
                                <div className="col-md-12">

                                        <div className="title-style">
                                            <h2>Dados Gerais</h2>
                                            <div className="line line-fix"/>
                                            <hr/>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="img-upload">
                                        <img
                                            src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif"
                                            alt=""/>
                                            <div className="img-upload-i"><i className="fas fa-image tx-pri"/></div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <br/>
                                        <p>
                                            <strong>Área de atuação:</strong> <br/>
                                            <strong>CNPJ:</strong> <br/>
                                            <strong>Natureza Jurídica:</strong> <br/>
                                        </p>
                                </div>
                            </div>

                            <br/><br/>

                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="inputEmail4">Sigla da OSC</label>
                                            <input className={"form-control  "+(this.state.requireds.tx_sigla_osc ? '' : 'invalid-field')} type="text" name="tx_sigla_osc" onChange={this.handleInputChange} value={this.state.form.tx_sigla_osc} placeholder="Sigla da OSC"/><br/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <label htmlFor="inputPassword4">Nome Fantasia</label>
                                            <input className={"form-control  "+(this.state.requireds.tx_razao_social_osc ? '' : 'invalid-field')} type="text" name="tx_razao_social_osc" onChange={this.handleInputChange} value={this.state.form.tx_razao_social_osc} placeholder="Nome Fantasia"/><br/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <div className="alert alert-secondary">
                                                <i className="fas fa-database float-right tx-pri"/>
                                                <strong>Endereço:</strong><br/>
                                                {this.state.form.tx_endereco}, {this.state.form.nr_localizacao}, ***<br/>
                                                {this.state.form.tx_bairro}, {this.state.form.cd_municipio} - ***<br/>
                                                <strong>CEP.:</strong> {this.state.form.nr_cep}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEstado">Situação do Imóvel</label>
                                            <select id="inputEstado" className="form-control">
                                                <option selected>Escolher...</option>
                                                <option>...</option>
                                            </select>
                                            {/*tx_nome_situacao_imovel_osc*/}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputAddress2">Ano de inscrição no Cadastro de CNPJ</label>
                                            <input type="date" className="form-control" id="inputAddress2"
                                                   placeholder="Apartamento, hotel, casa, etc."/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputCity">Ano de Fundação</label>
                                            <input type="date" className="form-control" id="inputCity"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Responsável Legal</label>
                                        <input className={"form-control  "+(this.state.requireds.tx_nome_responsavel_legal ? '' : 'invalid-field')} type="text" name="tx_nome_responsavel_legal" onChange={this.handleInputChange} value={this.state.form.tx_nome_responsavel_legal} placeholder="Responsável Legal"/><br/>

                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">E-mail oficial da OSC</label>
                                            <input type="emil" className="form-control" id="inputEmail4"
                                                   placeholder="Email"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Site</label>
                                            <input type="text" className="form-control" id="inputPassword4"
                                                   placeholder="Senha"/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail4">Telefone</label>
                                            <input type="text" className="form-control" id="inputEmail4"
                                                   placeholder="Email"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputPassword4">Celular</label>
                                            <input type="text" className="form-control" id="inputPassword4"
                                                   placeholder="Senha"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">O que a OSC faz</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                    </div>

                                    <h4>Objetivos do Desenvolvimento Sustentável - ODS</h4>

                                    <div>
                                        <ul className="menu-txt-icon">
                                            <li><img src="img/ods/01.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/02.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/03.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/04.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/05.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/06.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/07.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/08.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/09.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/10.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/11.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/12.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/13.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/14.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/15.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/16.png" alt="" className="item-off" width="95"/></li>
                                            <li><img src="img/ods/17.png" alt="" className="item-off" width="95"/></li>
                                        </ul>
                                        <div>
                                            <div>
                                                <br/>
                                                    <h3>1 - Acabar com a pobreza em todas as suas formas, em todos os
                                                        lugares</h3>
                                            </div>
                                            <div>
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck"/>
                                                            <label className="form-check-label" htmlFor="gridCheck">
                                                                1.1 Até 2030, erradicar a pobreza extrema para todas as
                                                                pessoas em todos os lugares, atualmente medida como
                                                                pessoas vivendo com menos de US$ 1,25 por dia
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck2"/>
                                                            <label className="form-check-label" htmlFor="gridCheck2">
                                                                1.2 Até 2030, reduzir pelo menos à metade a proporção de
                                                                homens, mulheres e crianças, de todas as idades, que
                                                                vivem na pobreza, em todas as suas dimensões, de acordo
                                                                com as definições nacionais
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck3"/>
                                                            <label className="form-check-label" htmlFor="gridCheck3">
                                                                1.3 Implementar, em nível nacional, medidas e sistemas
                                                                de proteção social adequados, para todos, incluindo
                                                                pisos, e até 2030 atingir a cobertura substancial dos
                                                                pobres e vulneráveis
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck4"/>
                                                            <label className="form-check-label" htmlFor="gridCheck4">
                                                                1.4 Até 2030, garantir que todos os homens e mulheres,
                                                                particularmente os pobres e vulneráveis, tenham direitos
                                                                iguais aos recursos econômicos, bem como o acesso a
                                                                serviços básicos, propriedade e controle sobre a terra e
                                                                outras formas de propriedade, herança, recursos
                                                                naturais, novas tecnologias apropriadas e serviços
                                                                financeiros, incluindo microfinanças
                                                            </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="gridCheck5"/>
                                                            <label className="form-check-label" htmlFor="gridCheck5">
                                                                1.5 Até 2030, construir a resiliência dos pobres e
                                                                daqueles em situação de vulnerabilidade, e reduzir a
                                                                exposição e vulnerabilidade destes a eventos extremos
                                                                relacionados com o clima e outros choques e desastres
                                                                econômicos, sociais e ambientais
                                                            </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                                <div className="title-style">
                                                    <h2>Áreas e Subáreas de atuação da OSC</h2>
                                                    <div className="line line-fix"></div>
                                                    <hr/>
                                                </div>
                                                <div className="text-center">Atividade econômica (CNAE)</div>
                                                <br/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="alert alert-secondary">
                                                <h2 className="text-center">Área de atuação 1</h2>
                                                <div className="input-icon">
                                                    <input type="text" className="form-control"
                                                           placeholder="Busque um artigo..."/>
                                                        <i className="fas fa-search"/>
                                                </div>
                                                <div>
                                                    <br/>
                                                        <div className="form-group">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       id="gridCheck"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="gridCheck">
                                                                        Educação infantil
                                                                    </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox"
                                                                       id="gridCheck2"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="gridCheck2">
                                                                        Ensino médio
                                                                    </label>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="alert alert-secondary">
                                                <h2 className="text-center">Área de atuação 2</h2>
                                                <div className="input-icon">
                                                    <input type="text" className="form-control"
                                                           placeholder="Busque um artigo..."/>
                                                        <i className="fas fa-search"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <div className="title-style">
                                                <h2>Descrição da OSC</h2>
                                                <div className="line line-fix"></div>
                                                <hr/>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Histórico</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Missão</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Visão</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Finalidades Estatutárias da OSC</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="inputEmail4">Link para o Estatutu da OSC</label>
                                            <input type="emil" className="form-control" id="inputEmail4" placeholder="Email"/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <div className="title-style">
                                                <h2>Títulos e Certificados</h2>
                                                <div className="line line-fix"/>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <table className="table">
                                                <thead className="bg-pri text-light">
                                                <tr>
                                                    <th scope="col">Titulo / Certificado</th>
                                                    <th scope="col">Início da validade</th>
                                                    <th scope="col">Fim da validade</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                <tr>
                                                    <td>a</td>
                                                    <td>b</td>
                                                    <td>c</td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <div className="title-style">
                                                <h2>Relações de Trabalho e Governança </h2>
                                                <div className="line line-fix"/>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bg-lgt box-itens-g min-h">
                                                <h2>Quadro de Dirigentes</h2>

                                                <div>
                                                    <p>aa</p>
                                                    <p><strong>aa</strong></p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="bg-lgt box-itens-g min-h">
                                                <h2>Conselho Fiscal</h2>
                                                <div>
                                                    <p>11</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row text-center">
                                                <div className="col-md-12">
                                                    <br/><br/>
                                                        <strong>Trabalhadores</strong><br/><br/>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="bg-lgt box-itens">
                                                        <h3>Total de Trabalhadores</h3>
                                                        <div>

                                                            <h2>a</h2>

                                                            <p className='not-info'>a</p>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="bg-lgt box-itens">
                                                        <h3>Empregados</h3>
                                                        <div>

                                                            <h2>aa</h2>

                                                            <p className='not-info'>aa</p>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="bg-lgt box-itens">
                                                        <h3>Trabalhadores com deficiência</h3>
                                                        <div>

                                                            <h2>aa</h2>

                                                            <p className='not-info'>aa</p>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="bg-lgt box-itens">
                                                        <h3>Trabalhadores voluntários</h3>
                                                        <div>

                                                            <h2>aa</h2>

                                                            <p className='not-info'>ss</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <div className="title-style">
                                                <h2>Espaços de Participação Social</h2>
                                                <div className="line line-fix"/>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box-itens-g">
                                                <h2>Conselhos de Políticas Públicas</h2>
                                                <div className="row bg-lgt">
                                                    <div className="col-md-9">
                                                        <br/>
                                                            <p><strong>Nome do Conselho:</strong></p>
                                                            <p>1</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <br className="d-none d-sm-block"/>
                                                            <p><strong>Titularidade:</strong></p>
                                                            <p>1</p>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <p><strong>Nome de representante:</strong></p>

                                                        <p>1</p>

                                                    </div>
                                                    <div className="col-md-4 line-remove">
                                                        <p><strong>Periodicidade da Reunião:</strong></p>
                                                        <p>1</p>
                                                    </div>
                                                    <div className="col-md-4 line-remove">
                                                        <p><strong>Data de início de vigência:</strong></p>
                                                        <p>1</p>
                                                    </div>
                                                    <div className="col-md-4 line-remove">
                                                        <p><strong>Data de fim de vigência:</strong></p>
                                                        <p>1</p>
                                                    </div>
                                                    <div className="col-md-12">

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box-itens-g">
                                                <h2>Conferências de Políticas Públicas</h2>
                                                <div className="row bg-lgt">
                                                    <div className="col-md-9">
                                                        <br/>
                                                            <p><strong>Nome da Conferência:</strong></p>
                                                            <p>1</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <br className="d-none d-sm-block"/>
                                                            <p><strong>Ano de realização da conferência:</strong></p>
                                                            <p>11</p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p><strong>Forma de participação na conferência:</strong></p>
                                                        <p>11</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box-itens-g">
                                                <h2>Outros espaços de participação social</h2>

                                                <div className="row bg-lgt">
                                                    <div className="col-md-9">
                                                        <br/>
                                                            <p><strong>Atuação em Fóruns, Articulações, Coletivos e
                                                                Redes de OSCs:</strong></p>
                                                            <p>11</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/*//////////////////*/}


                                    <div className="row">
                                        <div className="col-md-12">
                                            <br/><br/>
                                            <div className="title-style">
                                                <h2>Fontes de recursos anuais da OSC</h2>
                                                <div className="line line-fix"/>
                                                <hr/>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <p><i>* campos obrigatórios</i></p>
                                        <button style={{display: this.state.button ? 'block' : 'none'}} className="btn btn-success" onClick={this.register}>Salvar</button>
                                        <br/>
                                        <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'text-'+this.state.color}>{this.state.msg}</div>
                                        <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/>Processando</div>
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
    <Osc/>,
    document.getElementById('osc')
);
