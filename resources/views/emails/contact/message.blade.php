<div style="background-color: #EEEEEE;">
    <table width="600px" cellpadding="20" cellspacing="20" align="center">
        <tr>
            <td>
                <div style="background-color: #FFFFFF; width: 600px; margin: 20px; padding: 30px;">
                    <div style="height: 1px; background-color: #CCCCCC; margin: 10px;"></div>
                    <p>Nome: {{$data['name']}}</p>
                    <p>E-mail: {{$data['email']}}</p>
                    <p>Telefone: {{$data['cel']}}</p>
                    <p>Telefone: {{$data['whatsapp']}}</p>
                   {{-- <p>{!!str_replace("\n", "<br>", $dados['mensagem'])!!}</p>--}}
                    <br>
                </div>
            </td>
        </tr>
    </table>
</div>
