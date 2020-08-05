class Range extends React.Component {
    constructor(props) {
        super(props);
        let min = props.min ? props.min : 0;
        let max = props.max ? props.max : 100;
        this.state = {
            min: min,
            max: max,
            step: props.step ? props.step : 1,
            defaultValueStart: props.defaultValueStart ? props.defaultValueStart : 0,
            defaultValueEnd: props.defaultValueEnd ? props.defaultValueEnd : 100,
            title: props.title ? props.title : "",
            start: min,
            end: max,
            value: "de " + min + " até " + max
        };
        this.handleEnd = this.handleEnd.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }
    handleStart(e){
        let start = e.target.value;
        let end = this.state.end;
        let value = "de " + start + " até " + end;
        this.setState({start: start, value: value}, function(){
            this.props.setValue(start, end);
        })
    }
    handleEnd(e){
        let end = e.target.value;
        let start = this.state.start;
        let value = "de " + start + " até " + end;
        this.setState({end: end, value: value}, function(){
            this.props.setValue(start, end);
        })
    }
    nothing(){}
    render(){
        return(
            <div>
                <div className="label-float">
                    <input className={"form-control form-g "} type="text" name="tx_nome_uf" id="textRanger"  placeholder="" value={this.state.value} onChange={this.nothing} />
                    <label htmlFor="name">{this.state.title}</label>
                    <div className="label-box-info-off"/>
                </div>
                <input type="range" className="custom-range float-left"
                       min={this.state.min}
                       max={this.state.max}
                       step={this.state.step}
                       defaultValue={this.state.defaultValueStart}
                       name="textRanger"
                       id="rangerMin"
                       onChange={this.handleStart}
                />
                <input type="range" className="custom-range float-right"
                       min={this.state.min}
                       max={this.state.max}
                       step={this.state.step}
                       defaultValue={this.state.defaultValueEnd}
                       name="textRanger"
                       id="rangerMax"
                       onChange={this.handleEnd}
                />
            </div>
        );
    }
}
