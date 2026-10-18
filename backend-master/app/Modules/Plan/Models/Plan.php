<?php

namespace App\Modules\Plan\Models;

use App\Modules\Child\Models\Child;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Answer;
use App\Modules\Result\Models\Result;
use Dyrynda\Database\Support\GeneratesUuid;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;

class Plan extends HkModel
{

    use GeneratesUuid;

    public static $resourceType = 'plans';
    protected $table = 'plans';

    protected $fillable = [
        'idx',
        'completed_at',
        'child_id',
        'ageRange_id',
    ];

    protected $casts = [
        'uuid' => 'uuid',
    ];

    protected $attributes = [];

    protected $dates = [
        'completed_at',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /** Accessors */

    public function getCompletedAttribute()
    {
        return Arr::get($this->attributes, 'completed_at') != null;
    }

    /** Scopes */

    public function scopeCompleted(Builder $builder)
    {
        return $builder->whereNotNull('completed_at');
    }

    public function scopeUncompleted(Builder $builder)
    {
        return $builder->whereNull('completed_at');
    }

    /** Relationships */

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    public function ageRange(): BelongsTo
    {
        return $this->belongsTo(AgeRange::class, 'ageRange_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }

}
