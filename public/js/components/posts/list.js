class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: {
                data: []
            },
            qtdItems: 15,
            qtdItemsLoad: 15,
            showCategories: [],
            showMembers: [],
            showArchives: [],
            daysSelected: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
            categoriesSelected: [],
            membersSelected: [],
            archivesSelected: [],
            order: 'title',
            directionOrder: 'asc',
            dictionaryFilters: {
                categorias: 'categoriesSelected'
            }
        };

        this.load = this.load.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
        /*this.filterDays = this.filterDays.bind(this);*/
    }

    componentDidMount() {

        //console.log(this.props.filtrosUrl);

        if (this.props.filtrosUrl) {
            let filtros = this.props.filtrosUrl.split(';');

            filtros.find(function (item) {
                let filtro = item.split(':');
                let selected = this.state[this.state.dictionaryFilters[filtro[0]]];
                let options = filtro[1];
                for (let i in options) {
                    selected.push(parseInt(options[i]));
                }
                let filterSelected = [];
                filterSelected[this.state.dictionaryFilters[filtro[0]]] = selected;
                this.setState(filterSelected[this.state.dictionaryFilters[filtro[0]]]);
            }.bind(this));
        }

        this.load();
    }

    load() {

        //console.log(this.state.daysSelected);

        $.ajax({
            method: 'POST',
            url: '/list-posts',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                filters: {
                    days: this.state.daysSelected,
                    categories: this.state.categoriesSelected,
                    members: this.state.membersSelected,
                    archives: this.state.archivesSelected,
                    orderby: this.state.orderby
                },
                order: this.state.order,
                directionOrder: this.state.directionOrder,
                qtdItemsLoad: this.state.qtdItemsLoad
            },
            cache: false,
            success: function (ads) {
                //console.log(ads);
                this.setState({ loading: false, ads: ads });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    loadMore() {
        let qtd = this.state.ads.data.length + this.state.qtdItems;
        //console.log(qtd);
        this.setState({ qtdItemsLoad: qtd }, function () {
            this.load();
        });
    }

    filterCategories(categories) {
        let categoriesIds = [];
        categories.find(function (item) {
            categoriesIds.push(item.id);
        });
        this.setState({ categoriesSelected: categoriesIds }, function () {
            //console.log(this.state.categoriesSelected);
            this.load();
        });
    }

    filterMembers(members) {
        let membersIds = [];
        members.find(function (item) {
            membersIds.push(item.id);
        });
        this.setState({ membersSelected: membersIds }, function () {
            //console.log(this.state.membersSelected);
            this.load();
        });
    }

    filterArchives(archives) {
        let archiveIds = [];
        archives.find(function (item) {
            archiveIds.push(item.id);
        });
        this.setState({ archiveSelected: archiveIds }, function () {
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

    changeOrder(e) {
        //console.log(e.target.value);
        let orderArray = e.target.value.split('-');
        let order = orderArray[0];
        let directionOrder = orderArray[1];
        this.setState({ order: order, directionOrder: directionOrder }, function () {
            this.load();
        });
    }

    render() {

        //console.log('categoriesSelected', this.state.categoriesSelected);

        let totalAds = this.state.ads.total;

        let ads = null;

        if (this.state.ads.data.length == 0) {
            ads = React.createElement(
                'p',
                { style: { textAlign: 'center', margin: '50px' } },
                'Nenhum resultado encontrado para esta pesquisa'
            );
        } else {

            ads = this.state.ads.data.map(function (item) {
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

                let categories = item.categories.map(function (category, index) {
                    let separator = ',';
                    if (index == item.categories.length - 1) {
                        separator = null;
                    }
                    return React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'a',
                            { key: "categ_ad_" + category.id, className: 'text-info', style: { cursor: 'pointer' },
                                href: "/credenciados/filtros=categorias:" + category.id },
                            category.title
                        ),
                        separator,
                        '\xA0'
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

                return React.createElement(
                    'div',
                    { key: "ads_" + item.id },
                    React.createElement(
                        'a',
                        { href: "/artigo/" + item.id + "/" + cleanReplace(item.title) },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('br', null),
                            React.createElement(
                                'h5',
                                { className: 'float-right' },
                                React.createElement('i', { className: 'fas fa-comment' }),
                                ' 5'
                            ),
                            React.createElement('img', { 'data-src': 'holder.js/200x200', className: 'img-fluid', alt: '200x200',
                                src: 'https://www.w3schools.com/html/pic_trulli.jpg', 'data-holder-rendered': 'true',
                                width: '100%' }),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-6 item-calendar' },
                                    React.createElement(
                                        'time',
                                        { className: 'item-calendar' },
                                        React.createElement('i', {
                                            className: 'far fa-clock' }),
                                        ' ',
                                        item.date
                                    )
                                )
                            ),
                            React.createElement(
                                'h2',
                                { 'data-message': '{{$list->title}}', tabIndex: '0' },
                                item.title
                            ),
                            React.createElement(
                                'p',
                                { 'data-message': '{{$list->tease}}', tabIndex: '0' },
                                item.teaser
                            ),
                            React.createElement(
                                'h4',
                                { className: 'btn-plus' },
                                'Continue lendo'
                            ),
                            React.createElement('br', null),
                            React.createElement('hr', null)
                        )
                    )
                );
            }.bind(this));
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-8' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'select',
                                    { className: 'form-control form-control-light float-right', onChange: this.changeOrder, value: this.state.order + '-' + this.state.directionOrder },
                                    React.createElement(
                                        'option',
                                        { value: '0' },
                                        'Ordena\xE7\xE3o'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'title-asc' },
                                        'Nome'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'id-desc' },
                                        'Mais Recente'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'id-asc' },
                                        'Mais Antigo'
                                    )
                                )
                            )
                        ),
                        React.createElement('hr', null),
                        ads,
                        React.createElement(
                            'div',
                            { className: 'text-center' },
                            React.createElement(
                                'button',
                                { className: 'btn btn-success btn-lg', onClick: this.loadMore, style: { display: this.state.ads.total > this.state.qtdItemsLoad ? '' : 'none' } },
                                'veja mais credenciados'
                            )
                        ),
                        React.createElement('br', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-4' },
                        React.createElement(Filters, {
                            filterDays: this.filterDays,
                            filterCategories: this.filterCategories,
                            filterMembers: this.filterMembers,
                            filterArchives: this.filterArchives,
                            categoriesUrl: this.state.categoriesSelected,
                            membersUrl: this.state.membersSelected,
                            archivesUrl: this.state.archivesSelected
                        })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(List, { filtrosUrl: filtros }), document.getElementById('listPost'));