class FormCertificate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                dt_inicio_certificado: '',
                dt_fim_certificado: '',
                cd_uf: '',
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_certificado: true,
                dt_fim_certificado: true,
                cd_uf: true,
                cd_certificado: true,
            },
            showMsg: false,
            updateOk: false,
            msg: '',
            certificates: [],
            maxAlert: false,
            cd_certificado:{
                8: 'Utilidade Pública Municipal',
                7: 'Utilidade Pública Estadual',
            },
            action: '',//new | edit
            editId: this.props.id,

            filters: {
                uf: null,
                municipio: null,
            },
            searchUf: null,
            searchMunicipio: null,
            listUf:null,
            listMunicipio:null,

        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

        this.clickSearchUf = this.clickSearchUf.bind(this);
        this.handleSearchUf = this.handleSearchUf.bind(this);
        this.listUf = this.listUf.bind(this);
        this.setUf = this.setUf.bind(this);
        this.removeUf = this.removeUf.bind(this);

        this.clickSearchMunicipio = this.clickSearchMunicipio.bind(this);
        this.handleSearchMunicipio = this.handleSearchMunicipio.bind(this);
        this.listMunicipio = this.listMunicipio.bind(this);
        this.setMunicipio = this.setMunicipio.bind(this);
        this.removeMunicipio = this.removeMunicipio.bind(this);
    }

    componentWillReceiveProps(props){
        console.log(props);
        let lastEditId = this.state.editId;
        if(this.state.action != props.action || this.state.editId != props.id){
            this.setState({action: props.action, editId: props.id}, function(){
                if(lastEditId != props.id){
                    this.props.showHideForm(this.state.action);
                    this.edit();
                }
                if(this.state.action=='new'){
                    this.cleanForm();
                }
            });
        }
    }

    edit(){
        console.log('edit: ', this.state.editId);
        $.ajax({
            method: 'GET',
            //url: '/edit-user-certificate/'+this.state.editId,
            url: getBaseUrl2 + 'osc/certificado/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){
                this.setState({
                    form: data
                }, function(){
                    //this.props.showHideForm();
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
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

    cleanForm(){
        let form = this.state.form;
        for(let i in form){
            form[i] = '';
        }
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

        //console.log(requireds);

        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let url = getBaseUrl2 + 'osc/certificados/455128';
        let id = null;
        let method = 'POST';
        let msg = "Dados inserido com sucesso!";

        if(this.state.action==='edit'){
            id = this.state.editId;
            method = 'PUT';
            url = getBaseUrl2 + 'osc/certificado/'+id;
            msg = "Dados alterados com sucesso!";
        }

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){
            $.ajax({
                method:method,
                url: url,
                data:{
                    dt_inicio_certificado: this.state.form.dt_inicio_certificado,
                    dt_fim_certificado: this.state.form.dt_fim_certificado,
                    cd_uf: this.state.form.cd_uf,
                    cd_certificado: this.state.form.cd_certificado,
                    id: id,
                    id_osc: '455128',
                },
                cache: false,
                success: function(data) {
                    if(data.max){
                        let msg = data.msg;
                        this.setState({loading: false, button: true, maxAlert:true, btnContinue:true, certificates: data.certificates, updateOk: true, showMsg: true});
                        return;
                    }

                    let button = true;
                    if(this.state.action==='new'){
                        if(data.certificates.length >= data.maxCertificates){
                            button = false;
                        }
                    }

                    let btnContinue = false;
                    this.props.list();
                    this.cleanForm();
                    this.props.closeForm();

                    this.setState({certificates: data.certificates, loading: false, button: button, btnContinue: btnContinue,  updateOk: true, msg: msg, showMsg: true})
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    let msg = "Ocorreu um erro!";
                    this.setState({loading: false, msg: msg, button: true,  updateOk: false});
                }.bind(this)
            });
        });


    }

    /*UF*/
    handleSearchUf(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchUf: search}, function(){
            this.listUf(search);
        });
    }
    clickSearchUf(){
        let search = this.state.searchUf ? this.state.searchUf : ' ';
        this.listUf(search);
    }
    listUf(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/estado/'+search,
            cache: false,
            success: function(data){
                this.setState({listUf: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    setUf(item){
        let filters = this.state.filters;
        filters.uf = item;
        this.setState({filters: filters});
    }
    removeUf(){
        let filters = this.state.filters;
        filters.uf = null;
        this.setState({filters: filters})
    }

    /*Municipio*/
    handleSearchMunicipio(e){
        let search = e.target.value ? e.target.value : ' ';
        this.setState({searchMunicipio: search}, function(){
            this.listMunicipio(search);
        });
    }
    clickSearchMunicipio(){
        let search = this.state.searchMunicipio ? this.state.searchMunicipio : ' ';
        this.listMunicipio(search);
    }
    listMunicipio(search){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl + 'menu/geo/municipio/'+search,
            cache: false,
            success: function(data){
                this.setState({listMunicipio: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }
    setMunicipio(item){
        let filters = this.state.filters;
        filters.municipio = item;
        this.setState({filters: filters});
    }
    removeMunicipio(){
        let filters = this.state.filters;
        filters.municipio = null;
        this.setState({filters: filters})
    }

    render(){

        let ufs = null
        if(this.state.listUf) {
            ufs = this.state.listUf.map(function (item, index) {

                let sizeSearch = this.state.searchUf ? this.state.searchUf.length : 0;
                let firstPiece = null;
                let secondPiece = item.eduf_nm_uf;

                if (this.state.searchUf) {
                    firstPiece = item.eduf_nm_uf.substr(0, sizeSearch);
                    secondPiece = item.eduf_nm_uf.substr(sizeSearch);
                }

                return (
                    <li key={'cat_' + item.eduf_cd_uf}
                        className="list-group-item d-flex "
                        onClick={() => this.setUf(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }

        let municipios = null
        if(this.state.listMunicipio) {
            municipios = this.state.listMunicipio.map(function (item, index) {

                let sizeSearch = this.state.searchMunicipio ? this.state.searchMunicipio.length : 0;
                let firstPiece = null;
                let secondPiece = item.edmu_nm_municipio;

                if (this.state.searchMunicipio) {
                    firstPiece = item.edmu_nm_municipio.substr(0, sizeSearch);
                    secondPiece = item.edmu_nm_municipio.substr(sizeSearch);
                }
                return (
                    <li key={'cat_' + item.edmu_cd_municipio}
                        className="list-group-item d-flex "
                        onClick={() => this.setMunicipio(item)}
                    >
                        <u>{firstPiece}</u>{secondPiece}
                    </li>
                )
            }.bind(this));
        }

        return(
            <div className="row">
                <div className="col-md-12">
                    <form>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="cd_certificado">Nome*</label><br/>
                                <select className={"form-control form-m "+(this.state.requireds.cd_certificado ? '' : 'invalid-field')}
                                        name="cd_certificado" onChange={this.handleInputChange} defaultValue={this.state.form.cd_certificado}>
                                    <option value="0">Selecione</option>
                                    <option value="8">Utilidade Pública Municipal</option>
                                    <option value="7">Utilidade Pública Estadual</option>
                                </select><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="cd_uf">Localidade*</label><br/>

                                <div className="input-icon">
                                    <input type="text" className="form-control" placeholder="Busque um estado" name="cd_uf"
                                           style={{display: (this.state.filters.uf ? 'none' : '')}}
                                           onClick={this.clickSearchUf} onChange={this.handleSearchUf}/>
                                    <input type="text" className="form-control" name="cd_uf2"
                                           style={{display: (this.state.filters.uf ? '' : 'none')}}
                                           readOnly={this.state.filters.uf}
                                           defaultValue={this.state.filters.uf ? this.state.filters.uf.eduf_nm_uf : ''}/>

                                    <div style={{display: (this.state.filters.uf ? 'none' : '')}}>
                                        <i className="fas fa-search" style={{top: '-28px'}}/>
                                    </div>
                                    <div style={{display: (this.state.filters.uf ? '' : 'none')}} onClick={this.removeUf}>
                                        <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                    </div>

                                    <div>
                                        <ul className="box-search-itens" style={{display: ((this.state.searchUf || this.state.listUf) && !this.state.filters.uf) ? '' : 'none'}}>
                                            {ufs}
                                        </ul>
                                    </div>
                                    <br/>
                                </div>


                                <div className="col-md-6">
                                    <div className="input-icon">
                                        <input type="text" className="form-control" placeholder="Busque um Município" name="tx_nome_municipio"
                                               style={{display: (this.state.filters.municipio ? 'none' : '')}}
                                               onClick={this.clickSearchMunicipio} onChange={this.handleSearchMunicipio}/>
                                        <input type="text" className="form-control" name="tx_nome_municipio2"
                                               style={{display: (this.state.filters.municipio ? '' : 'none')}}
                                               readOnly={this.state.filters.municipio}
                                               defaultValue={this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio : ''}/>

                                        <div style={{display: (this.state.filters.municipio ? 'none' : '')}}>
                                            <i className="fas fa-search" style={{top: '-28px'}}/>
                                        </div>
                                        <div style={{display: (this.state.filters.municipio ? '' : 'none')}} onClick={this.removeMunicipio}>
                                            <i className="fas fa-times" style={{top: '-28px', cursor:'pointer'}}/>
                                        </div>

                                        <div>
                                            <ul className="box-search-itens" style={{display: ((this.state.searchMunicipio || this.state.listMunicipio) && !this.state.filters.municipio) ? '' : 'none'}}>
                                                {municipios}
                                            </ul>
                                        </div>
                                        <br/>
                                    </div>

                                </div>

                                {/*<input className={"form-control "+(this.state.requireds.cd_uf ? '' : 'invalid-field')}
                                       type="text" name="cd_uf" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.cd_uf} placeholder=""/><br/>*/}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="dt_inicio_certificado">Data início da validade*</label><br/>
                                <input className={"form-control "+(this.state.requireds.dt_inicio_certificado ? '' : 'invalid-field')}
                                       type="date" name="dt_inicio_certificado" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.dt_inicio_certificado} placeholder=""/><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dt_fim_certificado">Data fim da validade*</label><br/>
                                <input className={"form-control "+(this.state.requireds.dt_fim_certificado ? '' : 'invalid-field')}
                                       type="date" name="dt_fim_certificado" onChange={this.handleInputChange}
                                       defaultValue={this.state.form.dt_fim_certificado} placeholder=""/><br/>
                            </div>
                        </div>

                        {/*<p><i>* campos obrigatórios</i></p>*/}

                        <div>
                            <div style={{display: this.state.loading ? 'block' : 'none'}}><i className="fa fa-spin fa-spinner"/> Processando <br/> <br/></div>
                            <div style={{display: this.state.showMsg ? 'block' : 'none'}} className={'alert alert-'+(this.state.updateOk ? "success" : "danger")}>
                                <i className={"far "+(this.state.updateOk ? "fa-check-circle" : "fa-times-circle")} />
                                {this.state.msg}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-success" onClick={this.register}>
                                    <span style={{display: this.state.action==='edit' ? 'block' : "none"}}>
                                        <i className="fas fa-cloud-download-alt"/> Salvar alteração</span>
                                    <span style={{display: this.state.action==='edit' ? 'none' : "block"}}>
                                        <i className="fas fa-plus"/> Adicionar</span>
                                </button>
                            </div>
                        </div>
                        <br/>


                        {/*<div style={{display: this.state.maxAlert ? 'block' : 'none'}} className=" alert alert-danger">Máximo de Certificatos Cadastrados</div>*/}

                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }

}
