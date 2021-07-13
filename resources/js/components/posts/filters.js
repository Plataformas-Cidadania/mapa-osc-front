class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            members:[],
            archives:[],
            qtdCat: 0,
            qtdMen: 0,
        };

        this.load = this.load.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);

        this.qtdCat = this.qtdCat.bind(this);
        this.qtdMen = this.qtdMen.bind(this);
    }

    componentDidMount(){
        //this.load();
    }

    load(){
        $.ajax({
            method:'GET',
            url: 'filters',
            data:{
                filters: {
                    teste:1
                }
            },
            cache: false,
            success: function(data) {
                this.setState({loading: false, ads:data})
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({loading: false});
            }.bind(this)
        });
    }

    filterCategories(categories){
        this.setState({categories: categories}, function(){
            this.props.filterCategories(categories);
        });
    }

    filterMembers(members){
        this.setState({members: members}, function(){
            this.props.filterMembers(members);
        });
    }

    filterArchives(archives){
        this.setState({archives: archives}, function(){
            this.props.filterArchives(archives);
        });
    }

    qtdCat(qtd){
        this.setState({qtdCat: qtd});
    }

    qtdMen(qtd){
        this.setState({qtdMen: qtd});
    }

    render(){

        return(
            <div>
                <br/><br/>
                <Search setSearch={this.props.setSearch} />
                <br/>


                <div>
                    <div className="line-color"/>
                    <h2><i className="far fa-calendar"/> Arquivo</h2>
                    <ArchivesFilter filterArchives={this.filterArchives} archivesUrl={this.props.archivesUrl}/>
                </div>

                <div style={{display: parseInt(this.state.qtdCat) < 1 ? 'none' : ''}}>
                    <br/><br/>
                    <div className="line-color"/>
                    <h2><i className="far fa-folder-open"/> Categorias</h2>
                    <CategoriesFilter
                        filterCategories={this.filterCategories}
                        categoriesUrl={this.props.categoriesUrl}
                        qtdCat={this.qtdCat}
                    />
                </div>

                <div className="float-none" style={{display: parseInt(this.state.qtdMen) <= 0 ? 'none' : ''}}>
                    <br/><br/>
                    <div className="line-color"/>
                    <h2><i className="far fa-user"/> Autores</h2>
                    <MembersFilter
                        filterMembers={this.filterMembers}
                        membersUrl={this.props.membersUrl}
                        qtdMen={this.qtdMen}
                    />
                </div>

                <br/>
            </div>
        );
    }
}
