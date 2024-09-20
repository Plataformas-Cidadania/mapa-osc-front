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
        //console.log(data.series_1)
        // Processando os valores da série 1
        data?.series_1?.forEach((serie) => {
           // console.log(serie)
            insertDataIntoDatabase(grupo_id, '', serie.label, serie.value, slug, 'column');
        });
    }
}

async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/3?_=1726839302168', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-area-atuacao-brasil-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/4?_=17268393021698', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-assistencia-social-servico-brasil-2023' },
        /*{ url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/5?_=1726839302170', type: 'column', grupo_id: 1, slug: 'distribuicao-oscs-saude-tipo-estabelecimento-brasil-2018' }*/

        // Adicione mais endpoints conforme necessário
    ];

    for (const endpoint of endpoints) {
        await processEndpoint(endpoint.url, endpoint.grupo_id, endpoint.slug);
    }

    pool.end(); // Encerra a conexão com o banco de dados após a execução
}

main();
