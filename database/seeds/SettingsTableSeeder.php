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
            'imagem' => '',
            'email' => 'admin@cms',
            'titulo' => 'Portal OSC',
            'rodape' => 'Todos direitos reservados',
            'cep' => '',
            'endereco' => '',
            'numero' => 0,
            'complemento' => '',
            'bairro' => 0,
            'cidade' => '',
            'estado' => '',
            'titulo_contato' => 'Titulo contato',
            'descricao_contato' => 'Descrição contato',
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
