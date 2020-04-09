<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftCategory extends Model
{
    protected $table = 'dft_categories';

    protected $fillable = [
        'draft_id', 'status',  'position',  'origin',  'origin_id',  'user_id', 'account_id'
    ];
}
