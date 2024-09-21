class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartCategorias: [],
            activeIndex: 0,
            showTableIndex: -1  // Estado para controlar a visibilidade da tabela
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);
        this.toggleTable = this.toggleTable.bind(this); // Função para alternar tabela
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

    toggleTable(index) {
        this.setState(prevState => ({
            showTableIndex: prevState.showTableIndex === index ? -1 : index
        }));
    }

    renderTable(chartData) {
        // Exemplo de como renderizar a tabela dependendo das séries de dados
        const { labels, series } = chartData;
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Categoria</th>
                    {series.map((s, i) => <th key={i}>{s.name}</th>)}
                </tr>
                </thead>
                <tbody>
                {labels.map((label, i) => (
                    <tr key={i}>
                        <td>{label}</td>
                        {series.map((s, j) => <td key={j}>{s.data[i]}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { chartCategorias, activeIndex, showTableIndex } = this.state;

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
                                    <div dangerouslySetInnerHTML={{__html: chartCategoria.descricao}} />

                                    <hr />

                                    {chartCategoria?.charts?.map((item, index2) => {
                                        return (
                                            <div key={'chart' + index2}>
                                                <h2>{index2 + 1} - {item.titulo}</h2>
                                                <div dangerouslySetInnerHTML={{__html: item.descricao}}/>


                                                <div class="mb-2" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <button
                                                        onClick={() => this.toggleTable(index2)}
                                                        className="btn btn-primary mt-3 "
                                                    >
                                                        {/*{showTableIndex === index2 ? <i className="fas fa-chart-line"></i> : <i class="fas fa-table"></i>}*/} {showTableIndex === index2 ? ' Visualizar Grafico' : 'Visualizar Tabela'}
                                                    </button>
                                                </div>

                                                {showTableIndex !== index2 ?
                                                    <ApexMixed
                                                        chartId={`chart${index2}`}
                                                        data={item.chartData[item.slug]}
                                                    />
                                                    :
                                                    showTableIndex === index2 && this.renderTable(item.chartData[item.slug])
                                                }


                                                {/* Botão para exibir/esconder tabela */}


                                                {/* Renderizar a tabela se showTableIndex for igual ao index2 */}
                                                {/*{showTableIndex === index2 && this.renderTable(item.chartData[item.slug])}*/}

                                                <p><strong>Fonte: </strong>{item.fonte}</p>
                                                <br/>
                                                <hr/>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
