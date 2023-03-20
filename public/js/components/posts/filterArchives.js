class ArchivesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            archives: [],
            search: '',
            showArchives: false,
            archivesSelected: [],
            showOtherItems: false
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
            url: 'archives',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                city: this.props.city,
                search: this.state.search,
                midia_id: midia_id
            },
            cache: false,
            success: function (data) {
                //console.log(data);

                //importar arquivo passadas pela url//////////////
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
        let add = true;
        this.state.archivesSelected.find(function (memb) {
            if (item.month == memb.month) {
                add = false;
            }
        });
        if (add) {
            let archivesSelected = this.state.archivesSelected;
            archivesSelected.push(item);

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

        let qtdItems = this.state.archives.length;
        let showQtdItems = 5;

        let firstArchives = this.state.archives.map(function (item, index) {
            if (index < showQtdItems) {
                let sizeSearch = this.state.search.length;
                let firstPiece = item.month.substr(0, sizeSearch);
                let month = item.month.substr(sizeSearch);
                let year = item.year.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.archivesSelected.find(function (memb) {
                    if (item.month == memb.month) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return React.createElement(
                    'li',
                    { key: 'arc_' + index,
                        className: 'list-group-item d-flex justify-content-between align-items-center',
                        style: { cursor: 'pointer', color: color },
                        onClick: () => this.addArchive(item)
                    },
                    month,
                    ' de ',
                    year,
                    React.createElement(
                        'span',
                        { className: 'badge badge-primary badge-pill' },
                        qtd
                    )
                );
            }
        }.bind(this));

        let otherArchives = this.state.archives.map(function (item, index) {
            if (index >= showQtdItems) {
                let sizeSearch = this.state.search.length;
                let firstPiece = item.month.substr(0, sizeSearch);
                let month = item.month.substr(sizeSearch);
                let year = item.year.substr(sizeSearch);
                let qtd = item.qtd;

                let color = '';
                this.state.archivesSelected.find(function (memb) {
                    if (item.month == memb.month) {
                        color = '#b7b7b7';
                        return;
                    }
                });

                return React.createElement(
                    'li',
                    { key: 'arc_' + index,
                        className: "list-group-item " + (this.state.showOtherItems ? "d-flex" : "") + " justify-content-between align-items-center",
                        style: { cursor: 'pointer', color: color, display: this.state.showOtherItems ? '' : 'none' },
                        onClick: () => this.addArchive(item)
                    },
                    month,
                    ' de ',
                    year,
                    React.createElement(
                        'span',
                        { className: 'badge badge-primary badge-pill' },
                        qtd
                    )
                );
            }
        }.bind(this));

        let archivesSelected = this.state.archivesSelected.map(function (item, index) {
            return React.createElement(
                'button',
                { key: "btn_archive_" + index, id: index, onClick: this.removeArchive, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                item.month,
                ' de ',
                item.year,
                ' ',
                React.createElement('i', { className: 'fas fa-times' })
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                archivesSelected
            ),
            React.createElement(
                'ul',
                { className: 'list-group', style: { clear: 'both' } },
                firstArchives,
                otherArchives
            ),
            React.createElement(
                'div',
                { style: { display: qtdItems - showQtdItems > 0 ? '' : 'none' } },
                React.createElement(
                    'h4',
                    { className: 'btn-plus float-right', style: { display: !this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: () => this.setState({ showOtherItems: true }) },
                    'Mais ',
                    qtdItems - showQtdItems,
                    ' ',
                    React.createElement('i', { className: 'fas fa-angle-down' })
                ),
                React.createElement(
                    'h4',
                    { className: 'btn-plus float-right', style: { display: this.state.showOtherItems ? '' : 'none', cursor: 'pointer' }, onClick: () => this.setState({ showOtherItems: false }) },
                    'Menos ',
                    qtdItems - showQtdItems,
                    ' ',
                    React.createElement('i', { className: 'fas fa-angle-up' })
                )
            )
        );
    }
}