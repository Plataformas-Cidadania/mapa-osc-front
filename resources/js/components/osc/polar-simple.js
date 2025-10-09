function createPolarChart(id_osc) {
    $.ajax({
        method: 'GET',
        url: getBaseUrl2 + 'osc/indice_preenchimento/' + id_osc,
        cache: false,
        success: function(data) {
            const item = data[0];

            const series = [
                parseFloat(item.transparencia_area_atuacao),
                parseFloat(item.transparencia_dados_gerais),
                parseFloat(item.transparencia_descricao),
                parseFloat(item.transparencia_espacos_participacao_social),
                parseFloat(item.transparencia_fontes_recursos),
                parseFloat(item.transparencia_projetos_atividades_programas),
                parseFloat(item.transparencia_relacoes_trabalho_governanca),
                parseFloat(item.transparencia_titulos_certificacoes)
            ];

            const labels = [
                'Áreas e Subáreas de Atuação',
                'Dados Gerais',
                'Descrição da OSC',
                'Espaços de Participação Social',
                'Fontes de Recursos',
                'Projetos e Programas',
                'Trabalho e Governança',
                'Titulações e Certificações'
            ];

            // Layout clean e harmonioso
            const container = document.querySelector('#preenchimento');
            container.innerHTML = `
                <div style="
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                ">
                    <div style="display: flex; align-items: center; gap: 30px;">
                        <div style="flex: 1;">
                            <div id="polarChart"></div>
                        </div>
                        <div style="
                            text-align: center;
                            padding: 20px;
                            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                            border-radius: 10px;
                            border-left: 4px solid #007bff;
                            min-width: 140px;
                        ">
                            <div style="
                                font-size: 11px;
                                color: #6c757d;
                                font-weight: 600;
                                letter-spacing: 0.5px;
                                margin-bottom: 8px;
                            ">ÍNDICE GERAL</div>
                            <div style="
                                font-size: 28px;
                                font-weight: 700;
                                color: #007bff;
                                margin-bottom: 4px;
                            ">${parseFloat(item.transparencia_osc).toFixed(1)}%</div>
                            <div style="
                                font-size: 10px;
                                color: #6c757d;
                                opacity: 0.8;
                            ">de preenchimento</div>
                        </div>
                    </div>
                </div>
            `;

            const options = {
                series: series,
                chart: {
                    type: 'polarArea',
                    height: 300
                },
                labels: labels,
                colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'],
                legend: {
                    position: 'right',
                    fontSize: '11px',
                    offsetX: -10,
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    polarArea: {
                        rings: {
                            strokeWidth: 1
                        },
                        spokes: {
                            strokeWidth: 1
                        }
                    }
                }
            };

            const chart = new ApexCharts(document.querySelector('#polarChart'), options);
            chart.render();
        },
        error: function(xhr, status, err) {
            console.error('Erro ao carregar dados:', err);
            document.querySelector('#preenchimento').innerHTML = '<div>Erro ao carregar dados</div>';
        }
    });
}

// Executar quando a página carregar
if (typeof id_osc !== 'undefined') {
    createPolarChart(id_osc);
}
