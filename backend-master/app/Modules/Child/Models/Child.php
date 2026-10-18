<?php

namespace App\Modules\Child\Models;

use App\Hawk\User\Models\User;
use App\Modules\Child\Events\ChildCreatedEvent;
use App\Modules\License\Models\License;
use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\AgeRange;
use Carbon\Carbon;
use Dyrynda\Database\Support\GeneratesUuid;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Child extends HkModel
{

    use GeneratesUuid;

    protected $table = 'children';

    protected $fillable = [
        'uuid',
        'name',
        'birthdate',
        'gender',
        'picture',
        'user_id',
        'ageRange_id',
    ];

    protected $casts = [
        'uuid' => 'uuid',
    ];

    protected $attributes = [];

    protected $dispatchesEvents = [
        'created' => ChildCreatedEvent::class,
    ];

    /** Accessors */

    public function getAgeAttribute(): int
    {
        return Carbon::parse(array_get($this->attributes, 'birthdate'))
            ->diffInYears(Carbon::now());
    }

    /** Scopes */

    public function scopeOfMe($query)
    {
        return $query->where('user_id', '=', me()->id);
    }

    /** Relationships */

//    public function answers(): HasMany
//    {
//        return $this->hasMany(Answer::class);
//    }

    public function ageRange(): BelongsTo
    {
        return $this->belongsTo(AgeRange::class, 'ageRange_id');
    }

    public function licenses(): HasMany
    {
        return $this->hasMany(License::class);
    }

    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
