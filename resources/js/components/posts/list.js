class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: {
                data:[]
            },
            qtdItems: 10,
            qtdItemsLoad: 10,
            showCategories:[],
            showMembers:[],
            showArchives:[],
            categoriesSelected:[],
            membersSelected:[],
            archivesSelected:[],
            order: 'id',
            directionOrder: 'desc',
            dictionaryFilters:{
                categorias: 'categoriesSelected',
                members: 'membersSelected',
                archives: 'archivesSelected',
            },
            search: '',

        };

        this.load = this.load.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
        this.setSearch = this.setSearch.bind(this);

    }


    componentDidMount(){



        if(this.props.filtrosUrl){
            let filtros = this.props.filtrosUrl.split(';');

            filtros.find(function(item){
                let filtro = item.split(':');
                let selected = this.state[this.state.dictionaryFilters[filtro[0]]];
                let options = filtro[1];
                for(let i in options){
                    selected.push(parseInt(options[i]));
                }
                let filterSelected = [];
                filterSelected[this.state.dictionaryFilters[filtro[0]]] = selected;
                this.setState(filterSelected[this.state.dictionaryFilters[filtro[0]]]);

            }.bind(this));
        }

        this.load();
    }

    load(){

        $.ajax({
            method:'POST',
            url: 'list-posts',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data:{
                filters: {
                    categories:this.state.categoriesSelected,
                    members:this.state.membersSelected,
                    archives:this.state.archivesSelected,
                    orderby: this.state.orderby,
                    search: this.state.search,
                },
                order: this.state.order,
                directionOrder: this.state.directionOrder,
                qtdItemsLoad: this.state.qtdItemsLoad,
                midia_id: midia_id,
            },
            cache: false,
            success: function(ads) {
                //console.log(ads);
                this.setState({loading: false, ads:ads})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    loadMore(){
        let qtd = this.state.ads.data.length + this.state.qtdItems;
        //console.log(qtd);
        this.setState({qtdItemsLoad: qtd}, function(){
            this.load();
        });
    }

    setSearch(search){
        this.setState({search: search}, function(){
            this.load();
        });
    }

    filterCategories(categories){
        let categoriesIds = [];
        categories.find(function(item){
            categoriesIds.push(item.id);
        });
        this.setState({categoriesSelected: categoriesIds}, function(){
            //console.log(this.state.categoriesSelected);
            this.load();
        });
    }

    filterMembers(members){
        let membersIds = [];
        members.find(function(item){
            membersIds.push(item.id);
        });
        this.setState({membersSelected: membersIds}, function(){
            //console.log(this.state.membersSelected);
            this.load();
        });
    }

    filterArchives(archives){
        let archivesIds = [];
        archives.find(function(item){
            archivesIds.push(item.date_menu);
        });
        this.setState({archivesSelected: archivesIds}, function(){
            //console.log(this.state.archiveSelected);
            this.load();
        });
    }



    changeOrder(e){
        //console.log(e.target.value);
        let orderArray = e.target.value.split('-');
        let order = orderArray[0];
        let directionOrder = orderArray[1];
        this.setState({order: order, directionOrder: directionOrder}, function(){
            this.load();
        });

    }


    render(){

        let totalAds = this.state.ads.total;

        let ads = null;

        if(this.state.ads.data.length == 0){
            ads = (<p style={{textAlign:'center', margin:'50px'}}>Nenhum resultado encontrado para esta pesquisa</p>);
        }else{
            ads = this.state.ads.data.map(function(item){

                return (

                    /*OPCAO 1 UTILIZAR NA TROCA
                    <div key={"ads_"+item.id}>
                        <a href={"/artigo/"+item.id+"/"+cleanReplace(item.title)}>
                            <div className="row">
                                <div className="col-md-4">
                                    <img data-src="holder.js/200x200" className="img-fluid" alt="200x200"
                                         src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true"
                                         width="100%"/>
                                </div>
                                <div className="col-md-8">
                                    <h5 className="float-right"><i className="fas fa-comment"></i> 5</h5>
                                    <div className="item-calendar">
                                        <time className="item-calendar"><i
                                            className="far fa-clock"/> {item.date}
                                        </time>
                                    </div>
                                    <h2 data-message="{{$list->title}}" tabIndex="0">{item.title}</h2>
                                    <p data-message="{{$list->tease}}" tabIndex="0">{item.teaser}</p>
                                    <h4 className="btn-plus">Continue lendo</h4>



                                </div>
                                <div className="col-md-12"><hr/></div>

                            </div>
                        </a>
                    </div>*/
                     /*OPCAO 2 UTILIZAR NA TROCA*/
                    <div key={"ads_"+item.id}>
                        <a href={"post/"+item.id+"/"+clean(item.titulo)}>
                            <div>
                                <br/>
                                <div style={{display: item.imagem == '' ? 'none' : ''}}>
                                    <img className="img-fluid" alt={item.titulo} title={item.titulo} src={"imagens/posts/"+item.imagem} data-holder-rendered="true" width="100%"/>
                                    <br/><br/>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 item-calendar">
                                        <time className="item-calendar"><i
                                            className="far fa-clock"/> {item.date} de {item.month} de {item.year} às {item.hour}
                                        </time>
                                    </div>
                                </div>
                                <h2 data-message={item.titulo} tabIndex="0">{item.titulo}</h2>
                                <p data-message={item.resumida} tabIndex="0">{item.resumida}</p>
                                <h4 className="btn-plus">Continue lendo</h4>
                                <br/>
                                <hr/>
                            </div>
                        </a>
                    </div>

                );
            }.bind(this));
        }

        return(
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <select className="form-control form-control-light float-right" onChange={this.changeOrder} value={this.state.order+'-'+this.state.directionOrder}>
                                            <option value="title-asc">Nome</option>
                                            <option value="id-desc">Mais Recente</option>
                                            <option value="id-asc">Mais Antigo</option>
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                {ads}
                            <div className="text-center">
                                <button className="btn btn-success btn-lg" onClick={this.loadMore} style={{display: this.state.ads.total > this.state.qtdItemsLoad ? '' : 'none'}}>Veja mais</button>
                            </div>
                            <br/>
                        </div>
                        <div className="col-md-4">
                            <Filters
                                filterCategories={this.filterCategories}
                                filterMembers={this.filterMembers}
                                filterArchives={this.filterArchives}
                                categoriesUrl={this.state.categoriesSelected}
                                membersUrl={this.state.membersSelected}
                                archivesUrl={this.state.archivesSelected}
                                setSearch={this.setSearch}

                            />
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

ReactDOM.render(
    <List filtrosUrl={filtros}/>,
    document.getElementById('listPost')
);
