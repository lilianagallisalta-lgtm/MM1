<?php

namespace App\Modules\RapiTip\Models;

use Dyrynda\Database\Support\GeneratesUuid;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RapiTip extends HkModel
{

    use GeneratesUuid;

    public static $resourceType = 'rapiTips';
    protected $table = 'rapiTips';

    protected $fillable = [
        'title',
        'body',
        'picture',
    ];

    protected $casts = [
        'uuid' => 'uuid',
    ];

    protected $attributes = [];

    /** Accessors */

    // ...

    /** Scopes */

    // ...

    /** Relationships */

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(RapiTip::class, 'rapiTip_user', 'rapiTip_id', 'user_id');
    }

}
