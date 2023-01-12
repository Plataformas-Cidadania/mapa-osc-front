class FormEditCertificate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                dt_inicio_certificado: '',
                dt_fim_certificado: '',
                cd_uf: null,
                cd_municipio: null,
                cd_certificado: 0,
            },
            button: true,
            btnContinue: false,
            loading: false,
            requireds: {
                dt_inicio_certificado: true,
                dt_fim_certificado: true,
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
        //this.cleanForm = this.cleanForm.bind(this);

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

    componentDidMount(){
        this.setState({editId: this.props.id}, function(){
            this.edit();
        });
    }


    componentWillReceiveProps(props){
        if(this.state.editId !== props.id){
            this.setState({editId: props.id}, function(){
                this.edit();
            });
        }
    }

    edit(){
        console.log('edit: ', this.state.editId);
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'osc/certificado/'+this.state.editId,
            data: {

            },
            cache: false,
            success: function(data){
                let filters =  {
                    uf: data.uf,
                    municipio: data.municipio,
                }
                this.setState({
                    form: data,
                    filters: filters,
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


    validate(){
        //console.log(this.state.form);
        let valid = true;

        let requireds = this.state.requireds;
        let form = this.state.form;


        this.setState({requireds: requireds});
        return valid;
    }

    register(e){
        e.preventDefault();

        if(!this.validate()){
            return;
        }

        let msg = "Dados alterados com sucesso!";

        this.setState({loading: true, button: false, showMsg: false, msg: ''}, function(){



            let data = {
                //id_osc: '455128',
                id_osc: this.props.id_osc,
                id: this.state.editId,
                dt_inicio_certificado: this.state.form.dt_inicio_certificado,
                dt_fim_certificado: this.state.form.dt_fim_certificado,
                cd_certificado: this.state.form.cd_certificado,
            }

            if(this.state.form.cd_certificado===8){
                //console.log('--->', this.state.form.cd_municipio, this.state.form.cd_municipio.slice(0, 2))
                data.cd_municipio = this.state.form.cd_municipio;
                data.cd_uf = this.state.form.cd_municipio.slice(0, 2);
            }
            if(this.state.form.cd_certificado===7){
                data.cd_uf = this.state.form.cd_uf;
                //data.cd_municipio = 3303302;
                //data.cd_municipio = null
            }
            $.ajax({
                method: 'PUT',
                url: getBaseUrl2 + 'osc/certificado/'+this.state.editId,
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('@App:token')
                },
                data: data,
                cache: false,
                success: function(data) {

                    this.props.list();
                    //this.cleanForm();
                    //this.props.closeForm();

                    this.setState({certificates: data.certificates, loading: false,  updateOk: true, msg: msg, showMsg: true})
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
        let type = null;

        //if (search.length>2) {

            if (this.state.form.cd_certificado == 8) {
                type = 'municipio';
            } else if (this.state.form.cd_certificado == 7) {
                type = 'estado'
            }
            ;

            this.setState({loadingList: true});
            $.ajax({
                method: 'GET',
                //url: getBaseUrl + 'menu/geo/' + type + '/' + search,
                url: getBaseUrl2 + 'busca/' + type + '/' + search,

                cache: false,
                success: function (data) {
                    this.setState({listUf: data, loadingList: false});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({loadingList: false});
                }.bind(this)
            });
        //}
    }
    setUf(item){
        let filters = this.state.filters;
        let form = this.state.form;
        filters.uf = item;
        form.cd_uf = item.eduf_cd_uf;
        this.setState({filters: filters, form: form});
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
        if (search.length>3) {
            this.setState({loadingList: true});
            $.ajax({
                method: 'GET',
                url: getBaseUrl2 + 'busca/municipio/' + search,
                cache: false,
                success: function (data) {
                    this.setState({listMunicipio: data, loadingList: false});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(status, err.toString());
                    this.setState({loadingList: false});
                }.bind(this)
            });
        }
    }
    setMunicipio(item){
        let filters = this.state.filters;
        let form = this.state.form;
        filters.municipio = item;
        form.cd_municipio = item.edmu_cd_municipio;
        this.setState({filters: filters, form: form});
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

                //console.log(item)

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
                        <u>{firstPiece}</u>{secondPiece} - {item.eduf_sg_uf}
                    </li>
                )
            }.bind(this));
        }


        return(
            <div className="row">
                <div className="col-md-12">
                    <form autoComplete="off">

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="cd_certificado">Nome*</label><br/>
                                <select className={"form-control form-m "+(this.state.requireds.cd_certificado ? '' : 'invalid-field')}
                                        name="cd_certificado" onChange={this.handleInputChange} value={this.state.form.cd_certificado}>
                                    <option value="0">Selecione</option>
                                    <option value="8">Utilidade Pública Municipal</option>
                                    <option value="7">Utilidade Pública Estadual</option>
                                </select><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="cd_uf" style={{display: (this.state.form.cd_certificado==7 || this.state.form.cd_certificado==8 ? '' : 'none')}}>Localidade*</label><br/>

                                <div className="input-icon" style={{display: (this.state.form.cd_certificado==7 || this.state.form.cd_certificado==0 ? 'none' : '')}}>
                                    <input type="text" className="form-control" placeholder="Busque um município" name="cd_municipio"
                                           style={{display: (this.state.filters.municipio ? 'none' : '')}}
                                           autoComplete="off"
                                           onClick={this.clickSearchMunicipio}
                                           onChange={this.handleSearchMunicipio}/>

                                    <input type="text" className="form-control" name="cd_municipio2"
                                           style={{display: (this.state.filters.municipio ? '' : 'none')}}
                                           autoComplete="off"
                                           readOnly={this.state.filters.municipio}
                                           defaultValue={this.state.filters.municipio ? this.state.filters.municipio.edmu_nm_municipio + ' - ' + this.state.filters.uf.eduf_sg_uf : ''}/>


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

                                <div className="input-icon" style={{display: (this.state.form.cd_certificado==8 || this.state.form.cd_certificado==0? 'none' : '' )}}>
                                    <input type="text" className="form-control" placeholder="Busque um estado" name="cd_uf"
                                           style={{display: (this.state.filters.uf ? 'none' : '')}}
                                           autoComplete="off"
                                           onClick={this.clickSearchUf}
                                           onChange={this.handleSearchUf} />
                                    <input type="text" className="form-control" name="cd_uf2"
                                           style={{display: (this.state.filters.uf ? '' : 'none')}}
                                           autoComplete="off"
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
                                    <span><i className="fas fa-cloud-download-alt"/> Salvar alteração</span>

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
