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
        for (const serie of data.series_1) {
            console.log('Estrutura da série:', serie);
            if (serie.label && serie.value) {
                await insertDataIntoDatabase('', serie.label, serie.value, slug, 'column'); // Adicionando await
            } else {
                console.error('Propriedades "label" ou "value" ausentes em:', serie);
            }
        }
    }
}


async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/2?_=1726839302167', type: 'column', slug: 'numero-vinculos-formais-oscs-grandes-regioes-2020' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/12?_=1726839302176', type: 'column', slug: 'numero-organizacoes-civis-titulos-certificacoes-brasil-2019' },
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

