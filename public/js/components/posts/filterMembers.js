class MembersFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            search: '',
            showMembers: false,
            membersSelected: []
        };

        this.load = this.load.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
    }

    componentDidMount() {
        //this.setState({membersSelected: this.props.membersUrl});

        this.load();
    }

    load() {
        $.ajax({
            method: 'POST',
            url: '/members',
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
                let membersUrl = this.props.membersUrl;
                let membersSelected = this.state.membersSelected;
                for (let i in data) {
                    for (let j in membersUrl) {
                        if (data[i].id == membersUrl[j]) {
                            let add = true;
                            for (let k in membersSelected) {
                                //console.log(membersUrl[j], membersSelected[k].id);
                                if (membersUrl[j] == membersSelected[k].id) {
                                    add = false;
                                }
                            }
                            if (add) {
                                membersSelected.push(data[i]);
                            }
                        }
                    }
                }
                //console.log('membersSelected', membersSelected);
                //console.log('membersUrl', this.props.membersUrl);
                ////////////////////////////////////////////////////

                this.setState({ members: data, membersSelected: membersSelected, loading: false });
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false });
            }.bind(this)
        });
    }

    clickSearch() {
        let showMembers = !this.state.showMembers;
        this.setState({ showMembers: showMembers }, function () {
            this.load();
        });
    }

    handleSearch(e) {
        this.setState({ search: e.target.value }, function () {
            this.load();
        });
    }

    addMember(item) {
        //console.log('addMember', item);
        let add = true;
        this.state.membersSelected.find(function (memb) {
            if (item.name == memb.name) {
                add = false;
            }
        });
        if (add) {
            let membersSelected = this.state.membersSelected;
            membersSelected.push(item);
            console.log('addMember - membersSelected', membersSelected);
            this.setState({ showMembers: false });
            this.setState({ membersSelected: membersSelected }, function () {
                this.props.filterMembers(this.state.membersSelected);
            });
        }
    }

    removeMember(e) {

        let membersSelected = this.state.membersSelected;
        let member = {};
        membersSelected.find(function (item) {
            if (item.id == e.target.id) {
                member = item;
            }
        });
        let index = membersSelected.indexOf(member);
        membersSelected.splice(index, 1);
        this.setState({ membersSelected: membersSelected }, function () {
            this.props.filterMembers(this.state.membersSelected);
        });
    }

    render() {

        let members = this.state.members.map(function (item) {
            let sizeSearch = this.state.search.length;
            let firstPiece = item.name.substr(0, sizeSearch);
            let lastPiece = item.name.substr(sizeSearch);

            let color = '';
            this.state.membersSelected.find(function (memb) {
                if (item.name == memb.name) {
                    color = '#b7b7b7';
                    return;
                }
            });

            return React.createElement(
                'div',
                { key: 'memb_' + item.id, className: 'list-user', style: { cursor: 'pointer', color: color }, onClick: () => this.addMember(item) },
                React.createElement('img', { src: 'http://www.jardindemeriem.com/images/temoin/2.jpg', alt: '',
                    className: 'rounded-circle float-left', width: '40' }),
                React.createElement(
                    'h4',
                    null,
                    React.createElement(
                        'u',
                        null,
                        firstPiece
                    ),
                    lastPiece
                ),
                React.createElement('hr', null)
            );
        }.bind(this));

        let membersSelected = this.state.membersSelected.map(function (item) {
            return React.createElement(
                'button',
                { key: "btn_member_" + item.id, id: item.id, onClick: this.removeMember, type: 'button', className: 'btn btn-success btn-xs btn-remove', style: { margin: "0 5px 5px 0" } },
                item.name,
                ' ',
                React.createElement('i', { className: 'fas fa-times' })
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            membersSelected,
            React.createElement(
                'div',
                { className: 'input-icon filter-input-icon' },
                React.createElement('input', { type: 'text', name: 'titleMember', className: 'filter-search', onClick: this.clickSearch, onChange: this.handleSearch }),
                React.createElement('i', { className: 'fas fa-search' })
            ),
            members
        );
    }
}