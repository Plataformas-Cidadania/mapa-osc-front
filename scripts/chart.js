/*01 | 02*/
const axios = require('axios');
const { Pool } = require('pg');

// Configuração do pool para conexão com PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'mapaosc',
    password: '123456',
    port: 5432,
});

async function fetchDataFromEndpoint(endpoint) {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar dados do endpoint: ${endpoint}`, error);
        return null;
    }
}

async function insertDataIntoDatabase(grupo_id, serie, label, valor, slug, type) {
    const query = `
    INSERT INTO public.dados_charts (grupo_id, serie, label, valor, slug, type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;
    const values = [grupo_id, serie, label, valor, slug, type];

    try {
        const result = await pool.query(query, values);
        console.log('Inserção bem-sucedida com id:', result.rows[0].id);
    } catch (error) {
        console.error('Erro ao inserir dados no banco de dados', error);
    }
}

async function processEndpoint(endpoint, grupo_id, slug) {
    const data = await fetchDataFromEndpoint(endpoint);
    if (data && data.series_1) {

        // Processando os valores da série 1
        data?.series_1?.forEach((serie) => {
                console.log(serie)
                insertDataIntoDatabase(grupo_id, '', serie.label, serie.value, slug, 'column');
        });

       /* // Processando os valores da série 2, se necessário
        if (data.series_2) {
            data.series_2.forEach((serie) => {
                serie?.values?.forEach((item) => {
                    insertDataIntoDatabase(grupo_id, dataAtual, item.label, item.value, slug, 'series_2');
                });
            });
        }*/
    }
}

async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/2?_=1726839302167', type: 'column', grupo_id: 1, slug: 'numero-vinculos-formais-oscs-grandes-regioes-2020' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/12?_=1726839302176', type: 'column', grupo_id: 1, slug: 'numero-organizacoes-civis-titulos-certificacoes-brasil-2019' },

        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/1?_=1726839302166', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-faixas-vinculo-formais-grandes-regioes-2020' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/2?_=1726839302167', type: 'column', grupo_id: 1, slug: 'numero-vinculos-formais-oscs-grandes-regioes-2020' }, ok*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/3?_=1726839302168', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-area-atuacao-brasil-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/4?_=17268393021698', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-assistencia-social-servico-brasil-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/5?_=1726839302170', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-saude-tipo-estabelecimento-brasil-2018' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/7?_=1726839302171', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-economia-solidaria-vinculo-grandes-regioes-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/8?_=1726839302172', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-economia-solidaria-abrangencia-grandes-regioes-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/9?_=1726839302173', type: 'column', grupo_id: 1, slug: 'total-oscs-brasil-2010-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/10?_=1726839302174', type: 'column', grupo_id: 1, slug: 'numero-oscs-natureza-juridica-grandes-regioes-2023' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/11?_=1726839302175', type: 'column', grupo_id: 1, slug: 'evolucao-recursos-publicos-oscs-brasil-2010-2018' },*/
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/12?_=1726839302176', type: 'column', grupo_id: 1, slug: 'numero-organizacoes-civis-titulos-certificacoes-brasil-2019' }, ok*/

        // Adicione mais endpoints conforme necessário
    ];

    for (const endpoint of endpoints) {
        await processEndpoint(endpoint.url, endpoint.grupo_id, endpoint.slug);
    }

    pool.end(); // Encerra a conexão com o banco de dados após a execução
}

main();
