<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class SiteUser extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'site_users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'cpf',
        'cnpj',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
