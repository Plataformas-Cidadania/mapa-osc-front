// Teste para verificar o filtro cd_situacao_cadastral

// 1. Verificar se o campo está sendo incluído no JSON
console.log('=== TESTE FILTRO CD_SITUACAO_CADASTRAL ===');

// 2. Verificar se a API de situação cadastral está respondendo
fetch('https://mapaosc.ipea.gov.br/api/api/situacao_cadastral')
    .then(response => response.json())
    .then(data => {
        console.log('API situacao_cadastral funcionando:', data);
        console.log('Quantidade de opções:', data.length);
    })
    .catch(error => {
        console.error('Erro na API situacao_cadastral:', error);
    });

// 3. Função para testar se o filtro está sendo aplicado corretamente
function testarFiltroSituacaoCadastral(valorSituacao) {
    const jsonTeste = {
        avancado: {
            dadosGerais: {
                cd_situacao_cadastral: valorSituacao
            }
        }
    };
    
    console.log('JSON de teste:', JSON.stringify(jsonTeste));
    
    // Simular requisição para a API
    fetch('/osc/busca_avancada/geo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            busca: JSON.stringify(jsonTeste)
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta da busca avançada:', data);
    })
    .catch(error => {
        console.error('Erro na busca avançada:', error);
    });
}

// 4. Adicionar ao objeto window para poder chamar no console
window.testarFiltroSituacaoCadastral = testarFiltroSituacaoCadastral;

console.log('Para testar, use: testarFiltroSituacaoCadastral(2) no console');