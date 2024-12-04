class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartCategorias: [],
            activeIndex: -1,
            showTableIndex: -1,
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);
        this.toggleTable = this.toggleTable.bind(this);
    }

    componentDidMount() {
        fetch('/chart-api')
            .then(response => response.json())
            .then(data => {
                this.setState({ chartCategorias: data }, () => {
                    this.handleURLParams();
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    handleURLParams() {
        const params = new URLSearchParams(window.location.search);
        const group = params.get('group');
        const chart = params.get('chart');
        if (group !== null) {
            // Expande o grupo correto
            this.setState({ activeIndex: parseInt(group) }, () => {
                if (chart !== null) {
                    // Garante que o acordeão está renderizado antes de buscar o ID
                    setTimeout(() => {
                        const chartId = `chart-title-${group}-${chart}`;
                        const chartElement = document.getElementById(chartId);
                        if (chartElement) {
                            const topOffset = chartElement.getBoundingClientRect().top + window.scrollY;
                            // Adiciona 200px ao deslocamento calculado
                            window.scrollTo({ top: topOffset - 150, behavior: 'smooth' });
                            chartElement.focus();
                        } else {
                            console.error('Elemento não encontrado:', chartId);
                        }
                    }, 500); // Timeout maior para garantir renderização
                }
            });
        }
    }




    toggleAccordion(index) {
        this.setState(prevState => ({
            activeIndex: prevState.activeIndex === index ? -1 : index,
        }));
    }

    toggleTable(index) {
        this.setState(prevState => ({
            showTableIndex: prevState.showTableIndex === index ? -1 : index,
        }));
    }

    renderTable(chartData) {
        const { labels, series } = chartData;
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Categoria</th>
                    {series.map((s, i) => (
                        <th key={i}>{s.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {labels.map((label, i) => (
                    <tr key={i}>
                        <td>{label}</td>
                        {series.map((s, j) => (
                            <td key={j}>{s.data[i]}</td>
                        ))}
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
                {chartCategorias.map((chartCategoria, groupIndex) => (
                    <div className="card" key={groupIndex}>
                        <div className="card-header" id={`chart${groupIndex}`}>
                            <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                onClick={() => this.toggleAccordion(groupIndex)}
                                aria-expanded={activeIndex === groupIndex}
                                aria-controls={`collapse${groupIndex}`}
                            >
                                <h2 style={{ margin: '5px 0' }}>{chartCategoria.titulo}</h2>
                            </button>
                        </div>

                        <div
                            id={`collapse${groupIndex}`}
                            className={`collapse ${activeIndex === groupIndex ? 'show' : ''}`}
                            aria-labelledby={`chart${groupIndex}`}
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                <div dangerouslySetInnerHTML={{ __html: chartCategoria.descricao }} />

                                <hr />

                                {chartCategoria?.charts?.map((item, chartIndex) => (
                                    <div key={`chart-${chartIndex}`}>
                                        <h2 id={`chart-title-${groupIndex}-${chartIndex}`}>
                                            {chartIndex + 1} - {item.titulo} <div style={{display: 'none'}}> ({groupIndex}-{chartIndex})</div>
                                        </h2>
                                        <div dangerouslySetInnerHTML={{ __html: item.descricao }} />

                                        <div
                                            className="mb-2"
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            <button
                                                onClick={() => this.toggleTable(chartIndex)}
                                                className="btn btn-primary mt-3"
                                            >
                                                {showTableIndex === chartIndex
                                                    ? 'Visualizar Gráfico'
                                                    : 'Visualizar Tabela'}
                                            </button>
                                        </div>

                                        {showTableIndex !== chartIndex ? (
                                            <ApexMixed
                                                chartId={`chart${chartIndex}`}
                                                data={item.chartData[item.slug]}
                                                nome={item.tipo_nome}
                                                formato={item.formato}
                                            />
                                        ) : (
                                            showTableIndex === chartIndex &&
                                            this.renderTable(item.chartData[item.slug])
                                        )}

                                        <p>
                                            <strong>Fonte: </strong>
                                            {item.fonte}
                                        </p>
                                        <br />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
