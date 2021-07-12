class MembersFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            members:[],
            search:'',
            showMembers: false,
            membersSelected: [],
            showOtherItems: false,
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }

    componentDidMount(){
        //this.setState({membersSelected: this.props.membersUrl});
        this.load();
    }

    load(){
        $.ajax({
            method:'POST',
            url: 'members',
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

                //importar membros passadas pela url//////////////
                let membersUrl = this.props.membersUrl;
                let membersSelected = this.state.membersSelected;
                for(let i in data){
                    for(let j in membersUrl){
                        if(data[i].id==membersUrl[j]){
                            let add = true;
                            for(let k in membersSelected){
                                //console.log(membersUrl[j], membersSelected[k].id);
                                if(membersUrl[j]==membersSelected[k].id){
                                    add = false;
                                }
                            }
                            if(add){
                                membersSelected.push(data[i]);
                            }
                        }
                    }
                }
                //console.log('membersSelected', membersSelected);
                //console.log('membersUrl', this.props.membersUrl);
                ////////////////////////////////////////////////////
                this.props.qtdMen(data.length);

                this.setState({members: data, membersSelected: membersSelected, loading: false});
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    clickSearch(){
        let showMembers = !this.state.showMembers;
        this.setState({showMembers: showMembers}, function(){
            this.load();
        })
    }

    handleSearch(e){
        this.setState({search: e.target.value}, function(){
            this.load();
        });
    }

    addMember(item){
        //console.log('addMember', item);
        let add = true;
        this.state.membersSelected.find(function(memb){
            if(item.titulo==memb.titulo){
                add = false;
            }
        });
        if(add){
            let membersSelected = this.state.membersSelected;
            membersSelected.push(item);
            console.log('addMember - membersSelected', membersSelected);
            this.setState({showMembers: false});
            this.setState({membersSelected: membersSelected}, function(){
                this.props.filterMembers(this.state.membersSelected);
            });
        }

    }

    removeMember(e){

        let membersSelected = this.state.membersSelected;
        let member = {};
        membersSelected.find(function(item){
            if(item.id==e.target.id){
                member = item
            }
        });
        let index = membersSelected.indexOf(member);
        membersSelected.splice(index, 1);
        this.setState({membersSelected: membersSelected}, function(){
            this.props.filterMembers(this.state.membersSelected);
        });
    }

    render(){

        let qtdItems = this.state.members.length;
        let showQtdItems = 5;

        let firstMembers = this.state.members.map(function (item, index) {
            if(index < showQtdItems){
                let sizeSearch = this.state.search.length;
                let firstPiece = item.titulo.substr(0, sizeSearch);
                let lastPiece = item.titulo.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.membersSelected.find(function (memb) {
                    if (item.titulo == memb.titulo) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return (
                    <div key={'memb_' + item.id} className="list-user" style={{cursor: 'pointer', color: color}}
                         onClick={() => this.addMember(item)}>
                        <img src={"imagens/integrantes/"+item.imagem} alt=""
                             className="rounded-circle float-left" width="40"/>
                        <h4>{<u>{firstPiece}</u>}{lastPiece}
                            <span className="badge badge-primary badge-pill float-right" style={{margin: '8px 20px 0 0'}}>{qtd}</span>
                        </h4>
                        <hr/>
                    </div>





                )
            }
        }.bind(this));

        let otherMembers = this.state.members.map(function (item, index) {
            if(index >= showQtdItems){
                let sizeSearch = this.state.search.length;
                let firstPiece = item.titulo.substr(0, sizeSearch);
                let lastPiece = item.titulo.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.membersSelected.find(function (memb) {
                    if (item.titulo == memb.titulo) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return (
                    <div key={'memb_' + item.id} className="list-user"
                         style={{cursor:'pointer', color: color, display: this.state.showOtherItems ? '' : 'none'}}
                         onClick={() => this.addMember(item)}>
                        <img src={"imagens/integrantes/"+item.imagem} alt=""
                             className="rounded-circle float-left" width="40"/>
                        <h4>{<u>{firstPiece}</u>}{lastPiece} - {qtd}</h4>
                        <hr/>
                    </div>
                )
            }
        }.bind(this));

        let membersSelected = this.state.membersSelected.map(function (item){
            return (
                <button key={"btn_member_"+item.id} id={item.id} onClick={this.removeMember} type="button" className="btn btn-success btn-xs btn-remove" style={{margin: "0 5px 5px 0"}}>
                    {item.titulo} <i className="fas fa-times"/>
                </button>
            )
        }.bind(this));

        return(
            <div>
                {membersSelected}
                <div className="input-icon filter-input-icon">
                    <input type="text" name="titleMember" className="filter-search" onClick={this.clickSearch} onChange={this.handleSearch}/>
                    <i className="fas fa-search"/>
                </div>
                {/*{members}*/}
                {firstMembers}
                {otherMembers}
                <div style={{display: qtdItems - showQtdItems > 0 ? '' : 'none'}}>
                    <h4 className="btn-plus float-right" style={{display: !this.state.showOtherItems ? '' : 'none', cursor:'pointer'}} onClick={() => this.setState({showOtherItems: true})}>Mais {qtdItems - showQtdItems} <i className="fas fa-angle-down"/></h4>
                    <h4 className="btn-plus float-right" style={{display: this.state.showOtherItems ? '' : 'none', cursor:'pointer'}} onClick={() => this.setState({showOtherItems: false})}>Menos {qtdItems - showQtdItems} <i className="fas fa-angle-up"/></h4>
                </div>
            </div>
        );
    }
}
