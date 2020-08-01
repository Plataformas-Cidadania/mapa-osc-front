class Atuacoes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            atuacoes:[],
            subAtuacoes:[],
            cd_atuacao:{
                1: 'Utilidade Pública Municipal',
                2: 'Utilidade Pública Estadual',
            },
            showForm: false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
            editId: 0,

            showCategories: false,
            categoriesSelected: [],
        };

        this.listArea = this.listArea.bind(this);
        this.showHideForm = this.showHideForm.bind(this);
        this.remove = this.remove.bind(this);
        this.closeForm = this.closeForm.bind(this);

        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.subCategory = this.subCategory.bind(this);
    }

    componentDidMount(){
        this.listArea();
    }

    getAge(dateString){

        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))        {
            age--;
        }

        //console.log(age);

        return age;

    }

    edit(id){
        this.setState({actionForm: 'edit', showForm: false, editId: id});
    }



    remove(id){
        let remove = this.state.remove;

        if(!remove[id]){
            remove[id] = true;
            this.setState({remove: remove});
            return;
        }

        let loadingRemove = this.state.loadingRemove;
        loadingRemove[id] = true;
        this.setState({loadingRemove: loadingRemove});
        $.ajax({
            method: 'GET',
            url: '/remove-user-atuacao/'+id,
            data: {

            },
            cache: false,
            success: function(data){

                let categoriesUrl = this.props.categoriesUrl;
                let categoriesSelected = this.state.categoriesSelected;
                for(let i in data){
                    for(let j in categoriesUrl){
                        if(data[i].id==categoriesUrl[j]){
                            let add = true;
                            for(let k in categoriesSelected){
                                //console.log(categoriesUrl[j], categoriesSelected[k].id);
                                if(categoriesUrl[j]==categoriesSelected[k].id){
                                    add = false;
                                }
                            }
                            if(add){
                                categoriesSelected.push(data[i]);
                            }
                        }
                    }
                }

                //console.log(data);
                this.listArea();
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                this.setState({loadingRemove: loadingRemove, categoriesSelected: categoriesSelected});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                let loadingRemove = this.state.loadingRemove;
                loadingRemove[id] = false;
                //this.setState({loadingRemove: loadingRemove});
            }.bind(this)
        });

    }

    showHideForm(action){
        let showForm = !this.state.showForm;

        let actionForm = action;

        this.setState({showForm: showForm, actionForm: actionForm});
    }

    closeForm(){
        this.setState({showForm: false});
    }

    listArea(){
        this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'areas_atuacao',
            cache: false,
            success: function(data){
                this.setState({atuacoes: data, loadingList: false});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    clickSearch(){
        let showCategories = !this.state.showCategories;
        this.setState({showCategories: showCategories}, function(){
            this.listArea();
        })
    }

    handleSearch(e){
        this.setState({search: e.target.value}, function(){
            this.listArea();
        });
    }

    addCategory(item){
        let add = true;
        this.state.categoriesSelected.find(function(cat){
            if(item.cd_area_atuacao===cat.cd_area_atuacao){
                add = false;
            }
        });
        if(add){
            let categoriesSelected = this.state.categoriesSelected;
            categoriesSelected.push(item);
            this.setState({showCategories: false});
            this.setState({categoriesSelected: categoriesSelected}, function(){
                //this.props.filterCategories(this.state.categoriesSelected);

            });
        }
    }

    removeCategory(e){

        let categoriesSelected = this.state.categoriesSelected;
        let category = {};
        categoriesSelected.find(function(item){
            if(item.id==e.target.id){
                category = item
            }
        });
        let index = categoriesSelected.indexOf(category);
        categoriesSelected.splice(index, 1);
        this.setState({categoriesSelected: categoriesSelected}, function(){
            //this.props.filterCategories(this.state.categoriesSelected);
        });
    }

    subCategory(){
        //this.setState({loadingList: true});
        $.ajax({
            method: 'GET',
            url: getBaseUrl2 + 'areas_atuacao',
            cache: false,
            success: function(data){
                console.log("111");
                this.setState({subAtuacoes: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(status, err.toString());
                this.setState({loadingList: false});
            }.bind(this)
        });
    }

    render(){
        let firstCategories = this.state.atuacoes.map(function (item, index){
            let sizeSearch = this.state.search;
            let firstPiece = item.tx_nome_area_atuacao.substr(0, sizeSearch);
            return (
                <li key={'cat_'+item.cd_area_atuacao}
            className="list-group-item d-flex "
            onClick={() => this.addCategory(item)}
        >
            {firstPiece}
        </li>
        )
        }.bind(this));

        let categoriesSelected = this.state.categoriesSelected.map(function (item){
            return (
                <div key={"btn_category_"+item.id} id={item.id} className="btn-group " role="group" aria-label="Basic example">
                <button onClick={this.subCategory} type="button" className="btn btn-light">{item.tx_nome_area_atuacao}</button>
                <button onClick={this.removeCategory} type="button" className="btn btn-danger btn-margin-right">x</button>
                </div>
        )
        }.bind(this));

        let subAtuacoes = this.state.subAtuacoes.map(function (item, index){
            return (
                <div className="custom-control custom-checkbox" key={"subarea_"+index} id={"subarea_"+index}>
                <input type="checkbox" className="custom-control-input" id={"subarea_"+index} required/>
            <label className="custom-control-label" htmlFor={"subarea_"+index}>{item.tx_nome_area_atuacao}</label>
                <div className="invalid-feedback">Example invalid feedback text</div>
            </div>
        )
        }.bind(this));
        return(
            <div>
            <div className="row">
            <div className="col-md-12">
            <br/><br/>
            <div className="title-style">
            <h2>Áreas e Subáreas de atuação da OSC</h2>
        <div className="line line-fix"/>
            <hr/>
            </div>
            <div className="text-center">Atividade econômica (CNAE)</div>
        <br/>
        </div>
        </div>

        <div className="row">
            <div className="col-md-12">
            <div className="alert alert-secondary">
            {/*<h2 className="text-center">Área de atuação 1</h2>*/}
            <div className="input-icon">
            <input type="text" className="form-control"
        placeholder="Busque um artigo..." onClick={this.clickSearch} onChange={this.handleSearch}/>
        <i className="fas fa-search" style={{top: '-28px'}}/>
        <div>
        <ul className="box-search-itens" style={{display: this.state.showCategories ? '' : 'none'}}>
        {firstCategories}
    </ul>
        </div>
        <br/>
        <div>
        {categoriesSelected}
        </div>

        </div>
        <div>
        <br/>
        <div style={{clear: 'both'}}/>

        {subAtuacoes}
        {/*<div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                        <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                        <div className="invalid-feedback">Example invalid feedback text</div>
                                    </div>
                                    <div className="custom-control custom-checkbox ">
                                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" required/>
                                        <label className="custom-control-label" htmlFor="customControlValidation1">Associação Privada</label>
                                        <div className="invalid-feedback">Example invalid feedback text</div>
                                    </div>*/}

    </div>
        </div>
        </div>
        {/*<div className="col-md-6">
                        <div className="alert alert-secondary">
                            <h2 className="text-center">Área de atuação 2</h2>
                            <div className="input-icon">
                                <input type="text" className="form-control"
                                       placeholder="Busque um artigo..."/>
                                <i className="fas fa-search"/>
                            </div>
                        </div>
                    </div>*/}
    </div>



        </div>
    );
    }
}


ReactDOM.render(
<Atuacoes/>,
    document.getElementById('atuacoes')
);
