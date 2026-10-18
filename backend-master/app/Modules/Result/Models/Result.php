<?php

namespace App\Modules\Result\Models;

use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\Area;
use App\Modules\Stage\Models\Stage;
use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends HkModel
{
    use HasSlugAsIdentifier,
        HasSchemalessAttributes;

    static $resourceType = 'results';
    protected $table = 'results';

    protected $fillable = [
        'percentage',
        'slug',
        'plan_id',
        'stage_id',
        'area_id',
        'extra_attributes',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [];

    /** Relationships */

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class);
    }

}
