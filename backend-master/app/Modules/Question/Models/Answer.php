<?php

namespace App\Modules\Question\Models;

use App\Hawk\User\Models\User;
use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Events\AnswerCreatedEvent;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends HkModel
{

    protected $table = 'answers';

    protected $fillable = [
        'user_id',
        'plan_id',
        'question_id',
        'answerOption_id',
    ];

    protected $casts = [];

    protected $attributes = [];

    protected $dispatchesEvents = [
        'created' => AnswerCreatedEvent::class,
    ];

    /** Relationships */

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    public function answerOption(): BelongsTo
    {
        return $this->belongsTo(AnswerOption::class, 'answerOption_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

}
