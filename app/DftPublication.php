<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftPublication extends Model
{
    protected $table = 'dft_publications';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
