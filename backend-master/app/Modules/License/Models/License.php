<?php

namespace App\Modules\License\Models;

use App\Hawk\User\Models\User;
use App\Modules\Child\Models\Child;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class License extends HkModel
{

    public static $resourceType = 'licenses';
    protected $table = 'licenses';

    protected $fillable = [
        'uuid',
        'expires_at',
        'child_id',
    ];

    protected $casts = [];

    protected $attributes = [];

    /** Accessors */

    // ...

    /** Scopes */

    /**
     * Las licencias activas son las que aún no han expirado.
     * @param Builder $builder
     *
     * @return Builder
     */
    public function scopeActive(Builder $builder)
    {
        return $builder->where('expires_at', '>=', now());
    }

    /** Relationships */

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
