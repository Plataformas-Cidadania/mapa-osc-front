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

async function insertDataIntoDatabase(serie, label, valor, slug, type) {
    const query = `
    INSERT INTO public.dados_charts (serie, label, valor, slug, type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
    const values = [serie, label, valor, slug, type];

    try {
        const result = await pool.query(query, values);
        console.log('Inserção bem-sucedida com id:', result.rows[0].id);
    } catch (error) {
        console.error('Erro ao inserir dados no banco de dados', error);
    }
}

async function processEndpoint(endpoint, slug) {
    const data = await fetchDataFromEndpoint(endpoint);
    if (data && data.series_1) {

        // Processando os valores da série 1
        for (const serie of data.series_1) {
            for (const item of serie.values) {
                const label = item.label ? item.label : item.x;
                const value = item.value ? item.value : item.y;
                await insertDataIntoDatabase('', label, value, slug, 'line'); // Adicionando await
            }
        }
    }
}




async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/9?_=1726839302173', type: 'column', slug: 'total-oscs-brasil-2010-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/11?_=1726839302175', type: 'column',  slug: 'evolucao-recursos-publicos-oscs-brasil-2010-2018' }
    ];

    try {
        for (const endpoint of endpoints) {
            await processEndpoint(endpoint.url, endpoint.slug);
        }
    } catch (error) {
        console.error('Erro ao processar os endpoints', error);
    } finally {
        await pool.end();
    }
}

main();


