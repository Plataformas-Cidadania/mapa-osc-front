class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            Members:[],
            Archive:[]

        };

        this.load = this.load.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
    }

    componentDidMount(){
        //this.load();
    }

    load(){
        $.ajax({
            method:'GET',
            url: '/filters',
            data:{
                filters: {
                    teste:1
                }
            },
            cache: false,
            success: function(data) {
                //console.log(data);
                this.setState({loading: false, ads:data})
            }.bind(this),
            error: function(xhr, status, err) {
                //console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    filterCategories(categories){
        this.setState({categories: categories}, function(){
            console.log(this.state.categories);
            this.props.filterCategories(categories);
        });
    }

    filterMembers(members){
        this.setState({members: members}, function(){
            console.log(this.state.members);
            this.props.filterMembers(members);
        });
    }

    filterArchives(archives){
        this.setState({archives: archives}, function(){
            console.log(this.state.archives);
            this.props.filterArchives(archives);
        });
    }


    render(){

        return(
            <div>

                <br/><br/>
                <div className="input-icon">
                    <input type="text" className="form-control" placeholder="Busque um artigo..."/>
                        <i className="fas fa-search"/>
                </div>
                <br/>
                <div>
                    <div className="line-color"/>
                    <h2><i className="far fa-calendar"/> Arquivo</h2>

                    <ArchivesFilter filterArchives={this.filterArchives} archivesUrl={this.props.archivesUrl}/>

                    <h4 className="btn-plus float-right">Mais 15 <i className="fas fa-angle-down"/></h4>
                </div>

                <div>
                    <br/><br/>
                    <div className="line-color"/>
                    <h2><i className="far fa-folder-open"/> Categorias</h2>

                    <CategoriesFilter filterCategories={this.filterCategories} categoriesUrl={this.props.categoriesUrl}/>

                    <h4 className="btn-plus float-right">Mais 15 <i className="fas fa-angle-down"/></h4>
                </div>

                <div className="float-none">
                    <br/><br/>
                    <div className="line-color"/>
                    <h2><i className="far fa-user"/> Autores</h2>

                    <MembersFilter filterMembers={this.filterMembers} membersUrl={this.props.membersUrl}/>

                    <h4 className="btn-plus float-right">Mais 10 <i className="fas fa-angle-down"/></h4>
                </div>


                <br/>

            </div>
        );
    }
}
