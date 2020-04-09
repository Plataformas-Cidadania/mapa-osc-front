class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            days:[
                {day:"Domingo", short:"DOM", checked:false},
                {day:"Segunda-feira", short:"SEG", checked:false},
                {day:"Terça-feira", short:"TER", checked:false},
                {day:"Quarta-feira", short:"QUA", checked:false},
                {day:"Quinta-feira", short:"QUI", checked:false},
                {day:"Sexta-feira", short:"SEX", checked:false},
                {day:"Sábado", short:"SAB", checked:false},
            ],
            categories:[],
            Members:[]

        };

        this.load = this.load.bind(this);
        this.checkDay = this.checkDay.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
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

    checkDay(day){
        let days = this.state.days;
        days.find(function(item){
            if(item.day == day){
                item.checked = !item.checked;
            }
        }.bind(this));
        this.setState({days: days}, function(){
            this.props.filterDays(this.state.days);
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


    render(){

        let days = this.state.days.map(function(item, index){
            return(
                <li key={index} onClick={() => this.checkDay(item.day)}>
                    <i className={"fa " + (item.checked ? 'fa-check-square-o' : 'fa-square-o')}/> {item.day}
                </li>
            );
        }.bind(this));

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

                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Fevereiro de 2020
                            <span className="badge badge-primary badge-pill">7</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Janeiro de 2020
                            <span className="badge badge-primary badge-pill">x</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Dezembro de 2019
                            <span className="badge badge-primary badge-pill">1</span>
                        </li>
                    </ul>

                    <h4 className="btn-plus float-right">Mais 15</h4>
                </div>

                <div>
                    <br/><br/>
                    <div className="line-color"/>
                    <h2><i className="far fa-folder-open"/> Categorias</h2>
                    <CategoriesFilter filterCategories={this.filterCategories} categoriesUrl={this.props.categoriesUrl}/>
                    <h4 className="btn-plus float-right"><i className="fas fa-angle-down"/></h4>
                </div>

                <div className="float-none">
                    <br/><br/>
                        <div className="line-color"/>
                        <h2><i className="far fa-user"/> Autores</h2>
                        <MembersFilter filterMembers={this.filterMembers} membersUrl={this.props.membersUrl}/>
                        {/*<div className="list-user">
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt=""
                                 className="rounded-circle float-left" width="40"/>
                            <h4>Fernando Lima</h4>
                            <hr/>
                        </div>*/}

                </div>

                <br/>
                <h4>Dias da Semana</h4>
                <ul className="check-ul">
                    {days}
                </ul>

                <br/>

            </div>
        );
    }
}
