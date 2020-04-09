class OffersFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers:[],
        };

        this.load = this.load.bind(this);
        this.checkOffer = this.checkOffer.bind(this);
    }

    componentDidMount(){
        this.load();
    }

    load(){
        $.ajax({
            method:'POST',
            url: '/offers-ads',
            data:{
                city:this.props.city,
            },
            cache: false,
            success: function(data) {
                console.log(data);
                let offers = data;

                for(let i in offers){
                    offers[i].checked = false;
                }

                this.setState({offers: data, loading:false});
                //this.setState({loading: false, ads:data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false});
            }.bind(this)
        });
    }

    checkOffer(off){
        let offers = this.state.offers;
        offers.find(function(item){
            if(item.off == off){
                item.checked = !item.checked;
            }
        }.bind(this));
        this.setState({offers: offers}, function(){
            //console.log('offers', this.state.offers);
            this.props.filterOffers(this.state.offers);
        });
    }

    render(){


        let offers = this.state.offers.map(function (item, index){

            return (
                <li key={"off_"+index} style={{cursor:'pointer'}} onClick={() => this.checkOffer(item.off)}>
                    <i className={"fa "+(item.checked ? 'fa-check-square-o': 'fa-square-o')} /> {item.off}%
                </li>
            )
        }.bind(this));


        return(
            <ul className="check-ul">
                {offers}
            </ul>
        );
    }
}
