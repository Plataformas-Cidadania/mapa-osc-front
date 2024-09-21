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
            const region = serie.key; // Pegando a região (Norte, Nordeste, etc.)
            console.log(`Região atual: ${region}`);
            console.log(`Valores da série:`, serie.values);

            // Processando os valores da série
            for (const item of serie.values) {
                console.log(`Processando item - Região: ${region}, Label: ${item.label}, Valor: ${item.value}`);

                // Inserindo no banco de dados com a região correta
                await insertDataIntoDatabase(item.label, region, item.value, slug, 'bar');
            }
        }
    }
}





async function main() {
    const endpoints = [
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/1?_=1726839302166', type: 'column', slug: 'distribuicao-oscs-faixas-vinculo-formais-grandes-regioes-2020' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/7?_=1726839302171', type: 'column', slug: 'distribuicao-oscs-economia-solidaria-vinculo-grandes-regioes-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/8?_=1726839302172', type: 'column', slug: 'distribuicao-oscs-economia-solidaria-abrangencia-grandes-regioes-2023' },
        { url: 'https://mapaosc.ipea.gov.br/api/api/osc/grafico/10?_=1726916656296', type: 'column', slug: 'numero-oscs-natureza-juridica-grandes-regioes-2023' }
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
