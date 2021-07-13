class CategoriesFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            search:'',
            showCategories: false,
            categoriesSelected: [],
            showOtherItems: false,
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

    }

    componentDidMount(){
        //this.setState({categoriesSelected: this.props.categoriesUrl});

        this.load();
    }

    load(){
        $.ajax({
            method:'POST',
            url: 'categories',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data:{
                city:this.props.city,
                search:this.state.search,
                midia_id: midia_id,
            },
            cache: false,
            success: function(data) {
                //console.log(data);

                //importar categorias passadas pela url//////////////
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
                //console.log('categoriesSelected', categoriesSelected);
                //console.log('categoriesUrl', this.props.categoriesUrl);
                ////////////////////////////////////////////////////
                this.props.qtdCat(data.length);

                this.setState({categories: data, categoriesSelected: categoriesSelected, loading: false});
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    clickSearch(){
        let showCategories = !this.state.showCategories;
        this.setState({showCategories: showCategories}, function(){
            this.load();
        })
    }



    handleSearch(e){
        this.setState({search: e.target.value}, function(){
            this.load();
        });
    }

    addCategory(item){
        //console.log('addCategory', item);
        let add = true;
        this.state.categoriesSelected.find(function(cat){
            if(item.titulo==cat.titulo){
                add = false;
            }
        });
        if(add){
            let categoriesSelected = this.state.categoriesSelected;
            categoriesSelected.push(item);
            //console.log('addCategory - categoriesSelected', categoriesSelected);
            this.setState({showCategories: false});
            this.setState({categoriesSelected: categoriesSelected}, function(){
                this.props.filterCategories(this.state.categoriesSelected);
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
            this.props.filterCategories(this.state.categoriesSelected);
        });
    }

    render(){

        let qtdItems = this.state.categories.length;
        let showQtdItems = 5;


        let firstCategories = this.state.categories.map(function (item, index){
            if(index < showQtdItems){
                let sizeSearch = this.state.search.length;
                let firstPiece = item.titulo.substr(0, sizeSearch);
                let lastPiece = item.titulo.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.categoriesSelected.find(function(cat){
                    if(item.titulo==cat.titulo){
                        color = '#b7b7b7';
                        return;
                    }
                });

                return (
                    <li key={'cat_'+item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{cursor:'pointer', color: color}}
                        onClick={() => this.addCategory(item)}
                    >
                        {<span><u>{firstPiece}</u>{lastPiece}</span>}
                        <span className="badge badge-primary badge-pill">{qtd}</span>
                    </li>
                )
            }

        }.bind(this));

        let otherCategories = this.state.categories.map(function (item, index){
            if(index >= showQtdItems){
                let sizeSearch = this.state.search.length;
                let firstPiece = item.titulo.substr(0, sizeSearch);
                let lastPiece = item.titulo.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.categoriesSelected.find(function(cat){
                    if(item.titulo==cat.titulo){
                        color = '#b7b7b7';
                        return;
                    }
                });

                return (
                    <li key={'cat_'+item.id}
                        className={"list-group-item " + (this.state.showOtherItems ? "d-flex" : "") + " justify-content-between align-items-center"}
                        style={{cursor:'pointer', color: color, display: this.state.showOtherItems ? '' : 'none'}}
                        onClick={() => this.addCategory(item)}
                    >
                        {<span><u>{firstPiece}</u>{lastPiece}</span>}
                        <span className="badge badge-primary badge-pill">{qtd}</span>
                    </li>
                )
            }
        }.bind(this));

        let categoriesSelected = this.state.categoriesSelected.map(function (item){
            return (
                <button key={"btn_category_"+item.id} id={item.id} onClick={this.removeCategory} type="button" className="btn btn-success btn-xs btn-remove" style={{margin: "0 5px 5px 0"}}>
                    {item.titulo} <i className="fas fa-times"/>
                </button>
            )
        }.bind(this));

        return(
            <div>
                {categoriesSelected}
                <div className="input-icon filter-input-icon">
                    <input type="text" name="titleCategory" className="filter-search" onClick={this.clickSearch} onChange={this.handleSearch}/>
                    <i className="fas fa-search"/>
                </div>
                <ul className="list-group">
                    {firstCategories}
                    {otherCategories}
                </ul>
                <div style={{display: qtdItems - showQtdItems > 0 ? '' : 'none'}}>
                    <h4 className="btn-plus float-right" style={{display: !this.state.showOtherItems ? '' : 'none', cursor:'pointer'}} onClick={() => this.setState({showOtherItems: true})}>Mais {qtdItems - showQtdItems} <i className="fas fa-angle-down"/></h4>
                    <h4 className="btn-plus float-right" style={{display: this.state.showOtherItems ? '' : 'none', cursor:'pointer'}} onClick={() => this.setState({showOtherItems: false})}>Menos {qtdItems - showQtdItems} <i className="fas fa-angle-up"/></h4>
                </div>
            </div>
        );
    }
}
