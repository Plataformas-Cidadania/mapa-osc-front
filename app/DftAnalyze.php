<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftAnalyze extends Model
{
    protected $table = 'dft_analises';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
