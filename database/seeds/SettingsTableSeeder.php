<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            'imagem' => 'logo.png',
            'email' => 'admin@cms',
            'titulo' => 'Nome Site',
            'rodape' => 'Todos direitos reservados',
            'cep' => '1',
            'endereco' => '',
            'numero' => '0',
            'complemento' => '',
            'bairro' => '0',
            'cidade' => '',
            'estado' => '',
            'titulo_contato' => 'Titulo Contato',
            'descricao_contato' => 'Descrição Contato',
            'telefone' => '',
            'telefone2' => '',
            'telefone3' => '',
            'facebook' => '#',
            'youtube' => '#',
            'pinterest' => '#',
            'twitter' => '#',
            'instagram' => '#',
            'blog' => '#',
            'cmsuser_id' => '1',
        ]);

    }
}
