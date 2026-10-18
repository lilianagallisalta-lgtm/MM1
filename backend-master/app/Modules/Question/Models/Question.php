<?php

namespace App\Modules\Question\Models;

use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Stage\Models\Stage;
use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Question extends HkModel
{
    use HasTranslations,
        HasSchemalessAttributes;

    static $resourceType = 'questions';
    protected $table = 'questions';

    protected $fillable = [
        'display',
        'area_id',
        'subarea_id',
        'ageRange_id',
        'stage_id',
        'extra_attributes',
    ];

    protected $casts = [];

    protected $attributes = [
        'extra_attributes' => 'array',
    ];

    public $translatable = [
        'display',
    ];

    /** Scopes */

    /**
     * Devuelve la próxima pregunta para un niño en una etapa, teniendo en cuenta
     * las que ya contestó.
     * @param Builder $builder
     * @param Child   $child
     * @param Stage   $stage
     *
     * @return Builder|\Illuminate\Database\Query\Builder
     */
    public function scopeNextForChild(Builder $builder, Child $child, Stage $stage)
    {
        $questionsAnswered = $child->answers()->pluck('question_id');
        return $builder
            ->where('ageRange_id', '=', $child->ageRange->id)
            ->where('stage_id', '=', $stage->id)
            ->whereNotIn('questions.id', $questionsAnswered)
            ->take(1);
    }

    /**
     * Devuelve la próxima pregunta para un niño en una etapa, teniendo en cuenta
     * las que ya contestó.
     *
     * @param Builder $builder
     * @param Plan    $plan
     * @param Stage   $stage
     *
     * @return Builder|\Illuminate\Database\Query\Builder
     */
    public function scopeNextForPlan(Builder $builder, Plan $plan, Stage $stage)
    {
        $questionsAnswered = $plan->answers()->pluck('question_id');
        return $builder
            ->where('questions.ageRange_id', '=', $plan->ageRange->id)
            ->where('questions.stage_id', '=', $stage->id)
            ->whereNotIn('questions.id', $questionsAnswered)
            ->take(1);
    }

    public function scopeByAgeRange(Builder $builder, AgeRange $ageRange)
    {
        return $builder->where('ageRange_id', '=', $ageRange->id);
    }

    /** Relationships */

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function subarea(): BelongsTo
    {
        return $this->belongsTo(Subarea::class);
    }

    public function ageRange(): BelongsTo
    {
        return $this->belongsTo(AgeRange::class, 'ageRange_id');
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class, 'question_id');
    }
}
