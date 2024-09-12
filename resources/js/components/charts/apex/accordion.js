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
        // Mock de dados simulando uma resposta da API
        const mockData = [
            {
                titulo: "Categoria 1",
                descricao: "<p>Descrição da categoria 1.</p>"
            },
            {
                titulo: "Categoria 2",
                descricao: "<p>Descrição da categoria 2.</p>"
            },
            {
                titulo: "Categoria 3",
                descricao: "<p>Descrição da categoria 3.</p>"
            }
        ];

        // Simular o comportamento de uma resposta da API
        this.setState({ chartCategorias: mockData });
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
                {chartCategorias.map((chartCategoria, index) => (
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
                                <div>
                                    <h2>What is Lorem Ipsum?</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it to make a type specimen
                                        book. It has survived not only five centuries, but also the leap into electronic
                                        typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                        with the release of Letraset sheets containing Lorem Ipsum passages, and more
                                        recently with desktop publishing software like Aldus PageMaker including
                                        versions of Lorem Ipsum.</p>
                                    <ApexMixed
                                        chartId="chart"
                                        data={[]}
                                    />
                                    <p>
                                        <strong>Fonte: </strong>
                                        IPEA
                                    </p>
                                </div>
                                <br/>
                                <hr/>
                                <div>
                                    <h2>What is Lorem Ipsum?</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it to make a type specimen
                                        book. It has survived not only five centuries, but also the leap into electronic
                                        typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                        with the release of Letraset sheets containing Lorem Ipsum passages, and more
                                        recently with desktop publishing software like Aldus PageMaker including
                                        versions of Lorem Ipsum.</p>
                                    <ApexMixed
                                        chartId="chart"
                                        data={[]}
                                    />
                                    <p>
                                        <strong>Fonte: </strong>
                                        IPEA
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
