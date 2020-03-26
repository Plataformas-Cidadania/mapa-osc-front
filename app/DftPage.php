<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftPage extends Model
{
    protected $table = 'dft_pages';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
