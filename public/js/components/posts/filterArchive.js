class ArchivesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            archives: [],
            search: '',
            showArchives: false,
            archivesSelected: []
        };
        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addArchive = this.addArchive.bind(this);
        this.removeArchive = this.removeArchive.bind(this);
    }

    componentDidMount() {
        //this.setState({archivesSelected: this.props.archivesUrl});

        this.load();
    }

    load() {
        $.ajax({
            method: 'POST',
            url: '/archives',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                city: this.props.city,
                search: this.state.search
            },
            cache: false,
            success: function (data) {
                //console.log(data);

                //importar membros passadas pela url//////////////
                let archivesUrl = this.props.archivesUrl;
                let archivesSelected = this.state.archivesSelected;
                for (let i in data) {
                    for (let j in archivesUrl) {
                        if (data[i].id == archivesUrl[j]) {
                            let add = true;
                            for (let k in archivesSelected) {
                                //console.log(archivesUrl[j], archivesSelected[k].id);
                                if (archivesUrl[j] == archivesSelected[k].id) {
                                    add = false;
                                }
                            }
                            if (add) {
                                archivesSelected.push(data[i]);
                            }
                        }
                    }
                }
                //console.log('archivesSelected', archivesSelected);
                //console.log('archivesUrl', this.props.archivesUrl);
                ////////////////////////////////////////////////////

                this.setState({ archives: data, archivesSelected: archivesSelected, loading: false });
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    clickSearch() {
        let showArchives = !this.state.showArchives;
        this.setState({ showArchives: showArchives }, function () {
            this.load();
        });
    }

    handleSearch(e) {
        this.setState({ search: e.target.value }, function () {
            this.load();
        });
    }

    addArchive(item) {
        //console.log('addArchive', item);
        let add = true;
        this.state.archivesSelected.find(function (memb) {
            if (item.name == memb.name) {
                add = false;
            }
        });
        if (add) {
            let archivesSelected = this.state.archivesSelected;
            archivesSelected.push(item);
            console.log('addArchive - archivesSelected', archivesSelected);
            this.setState({ showArchives: false });
            this.setState({ archivesSelected: archivesSelected }, function () {
                this.props.filterArchives(this.state.archivesSelected);
            });
        }
    }

    removeArchive(e) {

        let archivesSelected = this.state.archivesSelected;
        let archive = {};
        archivesSelected.find(function (item) {
            if (item.id == e.target.id) {
                archive = item;
            }
        });
        let index = archivesSelected.indexOf(archive);
        archivesSelected.splice(index, 1);
        this.setState({ archivesSelected: archivesSelected }, function () {
            this.props.filterArchives(this.state.archivesSelected);
        });
    }

    render() {

        let archives = this.state.archives.map(function (item) {
            let sizeSearch = this.state.search.length;
            let firstPiece = item.name.substr(0, sizeSearch);
            let lastPiece = item.name.substr(sizeSearch);

            let color = '';
            this.state.archivesSelected.find(function (memb) {
                if (item.name == memb.name) {
                    color = '#b7b7b7';
                    return;
                }
            });

            return React.createElement(
                'div',
                { key: 'memb_' + item.id, className: 'list-user', style: { cursor: 'pointer', color: color }, onClick: () => this.addArchive(item) },
                React.createElement('img', { src: 'http://www.jardindemeriem.com/images/temoin/2.jpg', alt: '',
                    className: 'rounded-circle float-left', width: '40' }),
                React.createElement(
                    'h4',
                    null,
                    lastPiece
                ),
                React.createElement('hr', null)
            );
        }.bind(this));

        let archivesSelected = this.state.archivesSelected.map(function (item) {
            return React.createElement(
                'button',
                { key: "btn_archive_" + item.id, id: item.id, onClick: this.removeArchive, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                item.name,
                ' ',
                React.createElement('i', { className: 'fas fa-times' })
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            archivesSelected,
            React.createElement(
                'div',
                { className: 'input-icon filter-input-icon' },
                React.createElement('input', { type: 'text', name: 'titleArchive', className: 'filter-search', onClick: this.clickSearch, onChange: this.handleSearch }),
                React.createElement('i', { className: 'fas fa-search' })
            ),
            archives
        );
    }
}
