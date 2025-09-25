<?php
// Teste de conectividade com a API

$urls = [
    'https://mapaosc.ipea.gov.br/api/api/osc/953866',
    'https://mapaosc.ipea.gov.br/api/api/situacao_cadastral'
];

foreach ($urls as $url) {
    echo "Testando: $url\n";
    $start = microtime(true);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $totalTime = curl_getinfo($ch, CURLINFO_TOTAL_TIME);
    $error = curl_error($ch);
    curl_close($ch);
    
    $end = microtime(true);
    $duration = round(($end - $start) * 1000, 2);
    
    echo "HTTP Code: $httpCode\n";
    echo "Tempo: {$duration}ms\n";
    echo "cURL Time: {$totalTime}s\n";
    if ($error) echo "Erro: $error\n";
    echo "Resposta: " . (strlen($response) > 100 ? substr($response, 0, 100) . '...' : $response) . "\n";
    echo "---\n";
}