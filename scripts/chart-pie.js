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
            await insertDataIntoDatabase('', serie.label, serie.value, slug, 'column'); // Adicionando await
        }
    }
}


async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/3?_=1726839302168', type: 'column', slug: 'distribuicao-oscs-area-atuacao-brasil-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/4?_=17268393021698', type: 'column', slug: 'distribuicao-oscs-assistencia-social-servico-brasil-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/5?_=1726839302170', type: 'column', slug: 'distribuicao-oscs-saude-tipo-estabelecimento-brasil-2018' }
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
