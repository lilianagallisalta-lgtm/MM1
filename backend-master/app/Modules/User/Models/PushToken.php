<?php

namespace App\Modules\User\Models;

use App\Hawk\User\Models\User;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PushToken extends HkModel
{

    public static $resourceType = 'pushTokens';
    protected $table = 'pushTokens';

    protected $fillable = [
        'user_id',
        'token',
    ];

    protected $casts = [];

    protected $attributes = [];

    /** Accessors */

    // ...

    /** Scopes */

    // ...

    /** Relationships */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
