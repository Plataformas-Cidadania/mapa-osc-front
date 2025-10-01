'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = (function (_React$Component) {
    _inherits(List, _React$Component);

    function List(props) {
        _classCallCheck(this, List);

        _get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, props);
        this.state = {
            ads: {
                data: []
            },
            qtdItems: 10,
            qtdItemsLoad: 10,
            showCategories: [],
            showMembers: [],
            showArchives: [],
            categoriesSelected: [],
            membersSelected: [],
            archivesSelected: [],
            order: 'id',
            directionOrder: 'desc',
            dictionaryFilters: {
                categorias: 'categoriesSelected',
                members: 'membersSelected',
                archives: 'archivesSelected'
            },
            search: ''

        };

        this.load = this.load.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterMembers = this.filterMembers.bind(this);
        this.filterArchives = this.filterArchives.bind(this);
        this.setSearch = this.setSearch.bind(this);
    }

    _createClass(List, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            if (this.props.filtrosUrl) {
                var _filtros = this.props.filtrosUrl.split(';');

                _filtros.find((function (item) {
                    var filtro = item.split(':');
                    var selected = this.state[this.state.dictionaryFilters[filtro[0]]];
                    var options = filtro[1];
                    for (var i in options) {
                        selected.push(parseInt(options[i]));
                    }
                    var filterSelected = [];
                    filterSelected[this.state.dictionaryFilters[filtro[0]]] = selected;
                    this.setState(filterSelected[this.state.dictionaryFilters[filtro[0]]]);
                }).bind(this));
            }

            this.load();
        }
    }, {
        key: 'load',
        value: function load() {

            $.ajax({
                method: 'POST',
                url: 'list-posts',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    filters: {
                        categories: this.state.categoriesSelected,
                        members: this.state.membersSelected,
                        archives: this.state.archivesSelected,
                        orderby: this.state.orderby,
                        search: this.state.search
                    },
                    order: this.state.order,
                    directionOrder: this.state.directionOrder,
                    qtdItemsLoad: this.state.qtdItemsLoad,
                    midia_id: midia_id
                },
                cache: false,
                success: (function (ads) {
                    //console.log(ads);
                    this.setState({ loading: false, ads: ads });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.error(status, err.toString());
                    this.setState({ loading: false });
                }).bind(this)
            });
        }
    }, {
        key: 'loadMore',
        value: function loadMore() {
            var qtd = this.state.ads.data.length + this.state.qtdItems;
            //console.log(qtd);
            this.setState({ qtdItemsLoad: qtd }, function () {
                this.load();
            });
        }
    }, {
        key: 'setSearch',
        value: function setSearch(search) {
            this.setState({ search: search }, function () {
                this.load();
            });
        }
    }, {
        key: 'filterCategories',
        value: function filterCategories(categories) {
            var categoriesIds = [];
            categories.find(function (item) {
                categoriesIds.push(item.id);
            });
            this.setState({ categoriesSelected: categoriesIds }, function () {
                //console.log(this.state.categoriesSelected);
                this.load();
            });
        }
    }, {
        key: 'filterMembers',
        value: function filterMembers(members) {
            var membersIds = [];
            members.find(function (item) {
                membersIds.push(item.id);
            });
            this.setState({ membersSelected: membersIds }, function () {
                //console.log(this.state.membersSelected);
                this.load();
            });
        }
    }, {
        key: 'filterArchives',
        value: function filterArchives(archives) {
            var archivesIds = [];
            archives.find(function (item) {
                archivesIds.push(item.date_menu);
            });
            this.setState({ archivesSelected: archivesIds }, function () {
                //console.log(this.state.archiveSelected);
                this.load();
            });
        }
    }, {
        key: 'changeOrder',
        value: function changeOrder(e) {
            //console.log(e.target.value);
            var orderArray = e.target.value.split('-');
            var order = orderArray[0];
            var directionOrder = orderArray[1];
            this.setState({ order: order, directionOrder: directionOrder }, function () {
                this.load();
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var totalAds = this.state.ads.total;

            var ads = null;

            if (this.state.ads.data.length == 0) {
                ads = React.createElement(
                    'p',
                    { style: { textAlign: 'center', margin: '50px' } },
                    'Nenhum resultado encontrado para esta pesquisa'
                );
            } else {
                ads = this.state.ads.data.map((function (item) {

                    return(

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
                        React.createElement(
                            'div',
                            { key: "ads_" + item.id },
                            React.createElement(
                                'a',
                                { href: "post/" + item.id + "/" + clean(item.titulo) },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { style: { display: item.imagem == '' ? 'none' : '' } },
                                        React.createElement('img', { className: 'img-fluid', alt: item.titulo, title: item.titulo, src: "imagens/posts/" + item.imagem, 'data-holder-rendered': 'true', width: '100%' }),
                                        React.createElement('br', null),
                                        React.createElement('br', null)
                                    ),
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
                                                item.date,
                                                ' de ',
                                                item.month,
                                                ' de ',
                                                item.year,
                                                ' às ',
                                                item.hour
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'h2',
                                        { 'data-message': item.titulo, tabIndex: '0' },
                                        item.titulo
                                    ),
                                    React.createElement(
                                        'p',
                                        { 'data-message': item.resumida, tabIndex: '0' },
                                        item.resumida
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
                        )
                    );
                }).bind(this));
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
                                    'Veja mais'
                                )
                            ),
                            React.createElement('br', null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-4' },
                            React.createElement(Filters, {
                                filterCategories: this.filterCategories,
                                filterMembers: this.filterMembers,
                                filterArchives: this.filterArchives,
                                categoriesUrl: this.state.categoriesSelected,
                                membersUrl: this.state.membersSelected,
                                archivesUrl: this.state.archivesSelected,
                                setSearch: this.setSearch

                            })
                        )
                    )
                )
            );
        }
    }]);

    return List;
})(React.Component);

ReactDOM.render(React.createElement(List, { filtrosUrl: filtros }), document.getElementById('listPost'));