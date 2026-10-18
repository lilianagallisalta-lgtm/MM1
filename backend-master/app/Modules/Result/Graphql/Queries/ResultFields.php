<?php

namespace App\Modules\Result\Graphql\Queries;

use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\AvailableResult;
use App\Modules\Result\Models\Game;
use App\Modules\Result\Models\Result;
use App\Modules\Result\Models\Suggestion;

class ResultFields
{

    public function info(Result $root, array $args)
    {
        return AvailableResult::query()
            ->where('stage_id', '=', $root->stage_id)
            ->where('area_id', '=', $root->area_id)
            ->where('result', '=', $root->slug)
            ->where('ageRange_id', '=', $root->plan->child->ageRange->id)
            ->pluck('info')
            ->unique()
            ->map(function ($info) use ($root) {
                $info = str_replace('#Nombreniñ@', $root->plan->child->name, $info);
                return ['display' => $info];
            });
    }

    public function games(Result $root, array $args)
    {
        $availableResultsId = AvailableResult::query()
            ->where('stage_id', '=', $root->stage_id)
            ->where('area_id', '=', $root->area_id)
            ->where('result', '=', $root->slug)
            ->where('ageRange_id', '=', $root->plan->child->ageRange->id)
            ->pluck('id');

        $games = Game::whereHas('availableResults', function ($query) use ($availableResultsId) {
                return $query->whereIn('availableResults.id', $availableResultsId);
            })
            ->get()
            ->unique(function ($game) {
                return $game->body;
            })
            ->map(function ($game) use ($root) {
                $game->title = str_replace('#Nombreniñ@', $root->plan->child->name, $game->title);
                $game->body = str_replace('#Nombreniñ@', $root->plan->child->name, $game->body);
                return $game;
            });

        if ($root->plan->child->licenses()->active()->first()) {
            // Muestra todos los juegos sólo si compró la etapa.
            return $games;
        } else {
            // Sino, sólo muestra el primer juego.
            return $games->take(1);
        }
    }

    public function suggestions(Result $root, array $args)
    {
        $availableResultsId = AvailableResult::query()
            ->where('stage_id', '=', $root->stage_id)
            ->where('area_id', '=', $root->area_id)
            ->where('result', '=', $root->slug)
            ->where('ageRange_id', '=', $root->plan->child->ageRange->id)
            ->pluck('id');

        $suggestions = Suggestion::whereHas('availableResults', function ($query) use ($availableResultsId) {
                return $query->whereIn('availableResults.id', $availableResultsId);
            })
            ->get()
            ->unique(function ($game) {
                return $game->body;
            })
            ->map(function ($game) use ($root) {
                $game->title = str_replace('#Nombreniñ@', $root->plan->child->name, $game->title);
                $game->body = str_replace('#Nombreniñ@', $root->plan->child->name, $game->body);
                return $game;
            });

        if ($root->plan->child->licenses()->active()->first()) {
            // Muestra todos los juegos sólo si compró la etapa.
            return $suggestions;
        } else {
            // Sino, sólo muestra el primer juego.
            return $suggestions->take(1);
        }
    }

    public function gaugeColor(Result $root, array $args): string
    {
        $percentage = $root->percentage;

        if ($percentage >= 0.8) {
            return '#2e7d32';
        } elseif ($percentage < 0.8 && $percentage >= 0.59) {
            return '#f9a825';
        } elseif ($percentage < 0.59 && $percentage >= 0.39) {
            return '#ef6c00';
        } else {
            return '#c62828';
        }
    }

    public function gaugeCardColor(Result $root, array $args): string
    {
        $percentage = $root->percentage;

        if ($percentage == 1) {
            return '#66bb6a';
        } elseif ($percentage < 1 && $percentage >= 0.5) {
            return '#9ccc65';
        } elseif ($percentage < 0.5 && $percentage >= 0.1) {
            return '#ffee58';
        } else {
            return '#ef5350';
        }
    }

    public function gaugeCardBackground(Result $root, array $args): string
    {
        if ($root->plan->child->gender == 'male') {
            return \Storage::disk('public')->url('bgs/boy.png');
        } else {
            return \Storage::disk('public')->url('bgs/boy.png');
        }
    }

}