class DistrictsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            districts: [],
            search: '',
            showDistricts: false,
            districtsSelected: []
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addDistrict = this.addDistrict.bind(this);
        this.removeDistrict = this.removeDistrict.bind(this);
    }

    componentDidMount() {
        //this.setState({districtsSelected: this.props.districtsUrl});
        this.load();
    }

    load() {
        $.ajax({
            method: 'POST',
            url: '/districts-city',
            data: {
                city: this.props.city,
                search: this.state.search
            },
            cache: false,
            success: function (data) {
                //console.log(data);


                //importar bairros passadas pela url//////////////
                let districtsUrl = this.props.districtsUrl;
                let districtsSelected = this.state.districtsSelected;
                for (let i in data) {
                    for (let j in districtsUrl) {
                        if (data[i].id == districtsUrl[j]) {
                            let add = true;
                            for (let k in districtsSelected) {
                                //console.log(categoriesUrl[j], categoriesSelected[k].id);
                                if (districtsUrl[j] == districtsSelected[k].id) {
                                    add = false;
                                }
                            }
                            if (add) {
                                districtsSelected.push(data[i]);
                            }
                        }
                    }
                }
                //console.log('districtsSelected', districtsSelected);
                //console.log('districtsUrl', this.props.districtsUrl);
                this.props.filterDistricts(districtsSelected);
                ////////////////////////////////////////////////////


                this.setState({ districts: data, districtsSelected: districtsSelected, loading: false });
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    clickSearch() {
        let showDistricts = !this.state.showDistricts;
        this.setState({ showDistricts: showDistricts }, function () {
            this.load();
        });
    }

    handleSearch(e) {
        this.setState({ search: e.target.value }, function () {
            this.load();
        });
    }

    addDistrict(item) {
        let add = true;
        this.state.districtsSelected.find(function (cat) {
            if (item.title == cat.title) {
                add = false;
            }
        });
        if (add) {
            let districtsSelected = this.state.districtsSelected;
            districtsSelected.push(item);
            this.setState({ showDistricts: false });
            this.setState({ districtsSelected: districtsSelected }, function () {
                this.props.filterDistricts(this.state.districtsSelected);
            });
        }
    }

    removeDistrict(e) {

        let districtsSelected = this.state.districtsSelected;
        let district = {};
        districtsSelected.find(function (item) {
            if (item.id == e.target.id) {
                district = item;
            }
        });
        let index = districtsSelected.indexOf(district);
        districtsSelected.splice(index, 1);
        this.setState({ districtsSelected: districtsSelected }, function () {
            this.props.filterDistricts(this.state.districtsSelected);
        });
    }

    render() {

        let districts = this.state.districts.map(function (item) {
            let sizeSearch = this.state.search.length;
            let firstPiece = item.title.substr(0, sizeSearch);
            let lastPiece = item.title.substr(sizeSearch);

            let color = '';
            this.state.districtsSelected.find(function (cat) {
                if (item.title == cat.title) {
                    color = '#b7b7b7';
                    return;
                }
            });

            return React.createElement(
                'div',
                { key: item.id, style: { cursor: 'pointer', color: color }, onClick: () => this.addDistrict(item) },
                React.createElement(
                    'u',
                    null,
                    firstPiece
                ),
                lastPiece
            );
        }.bind(this));

        let districtsSelected = this.state.districtsSelected.map(function (item) {
            return React.createElement(
                'button',
                { key: item.id, id: item.id, onClick: this.removeDistrict, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                item.title,
                ' ',
                React.createElement('i', { className: 'fa fa-remove' })
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            districtsSelected,
            React.createElement('input', { type: 'text', name: 'titleDistrict', className: 'form-control input-sm', onClick: this.clickSearch, onChange: this.handleSearch }),
            React.createElement(
                'div',
                { className: 'div-info', style: { border: "solid 1px #CCC", display: this.state.showDistricts ? 'block' : 'none' } },
                districts
            )
        );
    }
}