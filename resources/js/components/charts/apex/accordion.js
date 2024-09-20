class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartCategorias: [],
            activeIndex: 0
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);
    }

    componentDidMount() {
        fetch('/chart-api')
            .then(response => response.json())
            .then(data => {
                this.setState({ chartCategorias: data });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    toggleAccordion(index) {
        this.setState(prevState => ({
            activeIndex: prevState.activeIndex === index ? -1 : index
        }));
    }

    render() {
        const { chartCategorias, activeIndex } = this.state;

        return (
            <div className="accordion" id="accordionExample">
                {chartCategorias.map((chartCategoria, index) => {

                    return (
                        <div className="card" key={index}>
                            <div className="card-header" id={`chart${index}`}>
                                <h2 className="mb-0">
                                    <button
                                        className="btn btn-link btn-block text-left"
                                        type="button"
                                        onClick={() => this.toggleAccordion(index)}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`collapse${index}`}
                                    >
                                        <h2>{chartCategoria.titulo}</h2>
                                    </button>
                                </h2>
                            </div>

                            <div
                                id={`collapse${index}`}
                                className={`collapse ${activeIndex === index ? 'show' : ''}`}
                                aria-labelledby={`chart${index}`}
                                data-parent="#accordionExample"
                            >
                                <div className="card-body">
                                    <div dangerouslySetInnerHTML={{__html: chartCategoria.descricao}}/>

                                    <hr/>

                                    {chartCategoria?.charts?.map((item, index2) => {
                                        console.log('-----------', item.slug, item.chartData[item.slug])
                                        return (
                                            <div key={'chart' + index2}>
                                                <h2>{index2+1} - {item.titulo}</h2>
                                                <div dangerouslySetInnerHTML={{__html: item.descricao}}/>
                                                <ApexMixed
                                                    chartId={`chart${index2}`}
                                                    data={item.chartData[item.slug]}
                                                />

                                                {/*<ApexBar  chartId={`chart${index2}`}
                                                          data={item.chartData[item.slug]} type="bar" height={350} />*/}
                                                <p>
                                                    <strong>Fonte: </strong>
                                                    {item.fonte}
                                                </p>
                                                <br/>
                                                <hr/>
                                            </div>
                                        )
                                    })}



                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
