<?php

namespace App\Modules\Question\Listeners;

use App\Modules\Question\Events\StageCompletedEvent;
use App\Modules\Question\Models\Area;
use App\Modules\Question\Models\Subarea;
use App\Modules\Result\Models\Result;
use App\Modules\Result\Services\ResultCalculator;

class StageCompletedListener
{

    protected $stage;
    protected $plan;

    /**
     * @param StageCompletedEvent $event
     */
    public function handle(StageCompletedEvent $event)
    {
        $this->stage = $event->stage;
        $this->plan = $event->plan;

        foreach (Area::all() as $area) {
            $areaPoints = 0;

            $areaQuestions = $this->stage
                ->questions()
                ->where('questions.ageRange_id', $this->plan->ageRange->id)
                ->where('questions.area_id', $area->id)
                ->get();

            $subareas = Subarea::whereIn('id', $areaQuestions->pluck('subarea_id'))->get();

            foreach ($subareas as $subarea) {
                $subareaPoints = 0;

                $subareaQuestions = $this->stage
                    ->questions()
                    ->where('questions.ageRange_id', $this->plan->ageRange->id)
                    ->where('questions.area_id', $area->id)
                    ->where('questions.subarea_id', $subarea->id)
                    ->get();

                $answers = $this->plan
                    ->answers()
                    ->whereIn('answers.question_id', $subareaQuestions->pluck('id'))
                    ->get();

                foreach ($answers as $answer) {
                    $subareaPoints += ResultCalculator::getPointFromAnswerSlug($answer->answerOption->slug);
                }

                $areaPoints += $subareaPoints;
            }

            $areaPercentage = $areaPoints / 60;
            $resultSlug = ResultCalculator::getResultSlugFromPercentage($areaPercentage);
            Result::create([
                'percentage' => $areaPercentage,
                'slug' => $resultSlug,
                'plan_id' => $this->plan->id,
                'stage_id' => $this->stage->id,
                'area_id' => $area->id,
            ]);
        }
    }

}