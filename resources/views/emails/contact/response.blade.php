<div style="background-color: #EEEEEE;">
    <table width="600px" cellpadding="20" cellspacing="20" align="center">
        <tr>
            <td>
                <div style="background-color: #FFFFFF; width: 600px; margin: 20px; padding: 30px;">
                    <div><img src="http://<?php echo $_SERVER['HTTP_HOST'];?>/imagens/settings/sm-{{$settings->imagem}}" alt="{{$settings->titulo}}" title="{{$settings->titulo}}" class="logo"></div>
                    <div style="height: 1px; background-color: #CCCCCC; margin: 10px;"></div>
                    <h2>{{$data['name']}},</h2>
                    <p>Obrigado por entrar em contato conosco. Em breve iremos responder.</p>
                    <br>
                    <p><strong>Nossos contatos:</strong></p>
                    <p>E-mail: {{$settings->email}}</p>
                    <p>Telefone: {{$settings->telefone}}</p>
                    <br><br>
                    <p style="float: right">Atenciosamente {{$settings->titulo}}</p>
                    <br>
                </div>
            </td>
        </tr>
    </table>
</div>



{{--<p>{{$dados['nome']}},</p>
<p>Obrigado por entrar em contato conosco. Em breve iremos responder.</p>
<p>Atenciosamente,</p>
<p>{{$settings->titulo}}</p>--}}
