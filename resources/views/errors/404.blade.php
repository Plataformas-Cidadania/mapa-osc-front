<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OSC não encontrada - Mapa OSC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f8f9fa;
        }
        .error-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #dc3545;
            font-size: 48px;
            margin-bottom: 20px;
        }
        h2 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <h2>OSC não encontrada</h2>
        <p>
            A Organização da Sociedade Civil que você está procurando não foi encontrada ou não está disponível no momento.
        </p>
        <p>
            Isso pode acontecer se:
        </p>
        <ul style="text-align: left; color: #666;">
            <li>O ID da OSC está incorreto</li>
            <li>A OSC foi removida do sistema</li>
            <li>Há um problema temporário com a API</li>
        </ul>
        <a href="{{ url('/') }}" class="btn">Voltar ao início</a>
    </div>
</body>
</html>