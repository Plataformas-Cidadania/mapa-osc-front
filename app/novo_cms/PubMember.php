<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubMember extends Model
{
    protected $table = 'pub_members';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
