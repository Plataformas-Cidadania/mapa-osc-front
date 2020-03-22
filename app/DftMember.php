<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftMember extends Model
{
    protected $table = 'dft_members';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
