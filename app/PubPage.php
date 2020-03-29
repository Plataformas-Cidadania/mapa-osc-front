<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubPage extends Model
{
    protected $table = 'pub_pages';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];

    public function lngPubPage(){
        return $this->hasMany('App\LngPubPage', 'publish_id');
    }

}
