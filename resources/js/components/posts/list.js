class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: {
                data:[]
            },
            qtdItems: 15,
            qtdItemsLoad: 15,
            showCategories:[],
            showMembers:[],
            showArchives:[],
            daysSelected:['DOM','SEG','TER','QUA','QUI','SEX','SAB'],
            categoriesSelected:[],
            membersSelected:[],
            archivesSelected:[],
            order: 'title',
            directionOrder: 'asc',
            dictionaryFilters:{
                categorias: 'categoriesSelected',
            },
        };

        this.load = this.load.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
        /*this.filterDays = this.filterDays.bind(this);*/

    }


    componentDidMount(){

        //console.log(this.props.filtrosUrl);

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

        //console.log(this.state.daysSelected);

        $.ajax({
            method:'POST',
            url: '/list-posts',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data:{
                filters: {
                    days:this.state.daysSelected,
                    categories:this.state.categoriesSelected,
                    members:this.state.membersSelected,
                    archives:this.state.archivesSelected,
                    orderby: this.state.orderby,
                },
                order: this.state.order,
                directionOrder: this.state.directionOrder,
                qtdItemsLoad: this.state.qtdItemsLoad,
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
        let archiveIds = [];
        archives.find(function(item){
            archiveIds.push(item.id);
        });
        this.setState({archiveSelected: archiveIds}, function(){
            //console.log(this.state.archiveSelected);
            this.load();
        });
    }

    /*filterDays(days){
        let daysSelected = [];
        days.find(function(item){
            if(item.checked){
                daysSelected.push(item.short);
            }
        });

        if(daysSelected.length==0){
            daysSelected = ['DOM','SEG','TER','QUA','QUI','SEX','SAB'];
        }

        this.setState({daysSelected: daysSelected}, function(){
            //console.log(this.state.daysSelected);
            this.load();
        });
    }


    */

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

        //console.log('categoriesSelected', this.state.categoriesSelected);

        let totalAds = this.state.ads.total;

        let ads = null;

        if(this.state.ads.data.length == 0){
            ads = (<p style={{textAlign:'center', margin:'50px'}}>Nenhum resultado encontrado para esta pesquisa</p>);
        }else{



            ads = this.state.ads.data.map(function(item){
                console.log(item);
                /*let daysArray = [
                    {day: 'DOM', show:false},
                    {day: 'SEG', show:false},
                    {day: 'TER', show:false},
                    {day: 'QUA', show:false},
                    {day: 'QUI', show:false},
                    {day: 'SEX', show:false},
                    {day: 'SAB', show:false},
                ];

                item.days.find(function(it){
                    daysArray.find(function(i){
                        if(i.day === it.day){
                            i.show = true;
                        }
                    });
                });

                let days = daysArray.map(function(i, index){
                    return (
                        <li key={"days_ad_"+index} style={{display: i.show ? 'block' : 'none', float:'left'}}>{i.day}</li>
                    );

                });*/

                let categories = item.categories.map(function(category, index){
                    let separator = ',';
                    if(index == item.categories.length-1){
                        separator = null;
                    }
                    return (
                        <span>
                        <a key={"categ_ad_"+category.id} className="text-info" style={{cursor:'pointer'}}
                           href={"/credenciados/filtros=categorias:"+category.id}>{category.title}</a>{separator}&nbsp;
                    </span>
                    );

                });

                /*let members = item.members.map(function(category, index){
                    let separator = ',';
                    if(index == item.members.length-1){
                        separator = null;
                    }
                    return (
                        <span>
                        <a key={"categ_ad_"+category.id} className="text-info" style={{cursor:'pointer'}}
                           href={"/artigos/filtros=membros:"+category.id}>{category.title}</a>{separator}&nbsp;
                    </span>
                    );

                });*/

                return (
                    <div key={"ads_"+item.id}>

                        <a href={"/artigo/"+item.id+"/"+cleanReplace(item.title)}>
                            <div>
                                <br/>
                                <h5 className="float-right"><i className="fas fa-comment"></i> 5</h5>
                                <img data-src="holder.js/200x200" className="img-fluid" alt="200x200"
                                     src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true"
                                     width="100%"/>
                                <br/><br/>
                                <div className="row">
                                    <div className="col-md-6 item-calendar">
                                        <time className="item-calendar"><i
                                            className="far fa-clock"/> {item.date}
                                        </time>
                                    </div>
                                </div>
                                <h2 data-message="{{$list->title}}" tabIndex="0">{item.title}</h2>
                                <p data-message="{{$list->tease}}" tabIndex="0">{item.teaser}</p>
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
                                            <option value="0">Ordenação</option>
                                            <option value="title-asc">Nome</option>
                                            <option value="id-desc">Mais Recente</option>
                                            <option value="id-asc">Mais Antigo</option>
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                {ads}
                            <div className="text-center">
                                <button className="btn btn-success btn-lg" onClick={this.loadMore} style={{display: this.state.ads.total > this.state.qtdItemsLoad ? '' : 'none'}}>veja mais credenciados</button>
                            </div>
                            <br/>
                        </div>
                        <div className="col-md-4">
                            <Filters
                                filterDays={this.filterDays}
                                filterCategories={this.filterCategories}
                                filterMembers={this.filterMembers}
                                filterArchives={this.filterArchives}
                                categoriesUrl={this.state.categoriesSelected}
                                membersUrl={this.state.membersSelected}
                                archivesUrl={this.state.archivesSelected}
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
