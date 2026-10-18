<?php

namespace App\Modules\Result\Database\Seeds;

use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Area;
use App\Modules\Question\Models\Subarea;
use App\Modules\Result\Models\AvailableResult;
use App\Modules\Result\Models\Game;
use App\Modules\Result\Models\Suggestion;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class ResultModuleSeeder extends \Illuminate\Database\Seeder
{

    public function run()
    {
        $ageRanges = [
            '1-2' => AgeRange::whereMinAndMax(1, 2),
            '2-3' => AgeRange::whereMinAndMax(2, 3),
            '3-4' => AgeRange::whereMinAndMax(3, 4),
            '4-5' => AgeRange::whereMinAndMax(4, 5),
            '5-6' => AgeRange::whereMinAndMax(5, 6),
            '6-7' => AgeRange::whereMinAndMax(6, 7),
            '7-8' => AgeRange::whereMinAndMax(7, 8),
        ];

        $json = $this->readJson('all');

        foreach ($ageRanges as $key => $ageRange) {
            $json
                ->filter(function ($result) use ($key) {
                    if ($key === '1-2') {
                        return Arr::get($result, 'EDAD') === '1 a 2 años';
                    } elseif ($key === '2-3') {
                        return Arr::get($result, 'EDAD') === '2 a 3 años';
                    } elseif ($key === '3-4') {
                        return Arr::get($result, 'EDAD') === '3 a 4 años';
                    } elseif ($key === '4-5') {
                        return Arr::get($result, 'EDAD') === '4 a 5 años';
                    } elseif ($key === '5-6') {
                        return Arr::get($result, 'EDAD') === '5 a 6 años';
                    } elseif ($key === '6-7') {
                        return Arr::get($result, 'EDAD') === '6 a 7 años';
                    } elseif ($key === '7-8') {
                        return Arr::get($result, 'EDAD') === '7 a 8 años';
                    }
                })
                ->map(function ($result) use ($ageRanges) {
                    switch (Arr::get($result, 'EDAD')) {
                        case '1 a 2 años':
                            $ageRange = Arr::get($ageRanges, '1-2')->firstOrFail();
                            break;
                        case '2 a 3 años':
                            $ageRange = Arr::get($ageRanges, '2-3')->firstOrFail();
                            break;
                        case '3 a 4 años':
                            $ageRange = Arr::get($ageRanges, '3-4')->firstOrFail();
                            break;
                        case '4 a 5 años':
                            $ageRange = Arr::get($ageRanges, '4-5')->firstOrFail();
                            break;
                        case '5 a 6 años':
                            $ageRange = Arr::get($ageRanges, '5-6')->firstOrFail();
                            break;
                        case '6 a 7 años':
                            $ageRange = Arr::get($ageRanges, '6-7')->firstOrFail();
                            break;
                        case '7 a 8 años':
                            $ageRange = Arr::get($ageRanges, '7-8')->firstOrFail();
                            break;
                    }

                    $area = Area::where('name->es_AR', trim(Arr::get($result, 'AREA')))->firstOrFail();
                    $subarea = Subarea::where('name->es_AR', title_case(trim(Arr::get($result, 'SUBAREA'))))->firstOrFail();
                    $stage = Stage::where('slug', '=', trim(Arr::get($result, 'NIVEL')))->firstOrFail();

                    $games = collect();
                    $suggestions = collect();
                    if (Arr::get($result, 'JUEGO1-TITULO')) {
                        if (strtoupper(Arr::get($result, 'JUEGO1-TITULO')) == 'SUGERENCIAS') {
                            $suggestions->push(
                                Suggestion::firstOrCreate([
                                    'title' => [
                                        'es_AR' => Arr::get($result, 'JUEGO1-TITULO'),
                                    ],
                                    'body' => [
                                        'es_AR' => Arr::get($result, 'JUEGO1-CUERPO'),
                                    ],
                                ])
                            );
                        } else {
                            $games->push(
                                Game::firstOrCreate([
                                    'title' => [
                                        'es_AR' => Arr::get($result, 'JUEGO1-TITULO'),
                                    ],
                                    'body' => [
                                        'es_AR' => Arr::get($result, 'JUEGO1-CUERPO'),
                                    ],
                                    'materials' => [
                                        'es_AR' => Arr::get($result, 'JUEGO1-MATERIALES'),
                                    ],
                                ])
                            );
                        }
                    }
                    if (Arr::get($result, 'JUEGO2-TITULO')) {
                        if (strtoupper(Arr::get($result, 'JUEGO2-TITULO')) == 'SUGERENCIAS') {
                            $suggestions->push(
                                Suggestion::firstOrCreate([
                                    'title' => [
                                        'es_AR' => Arr::get($result, 'JUEGO2-TITULO'),
                                    ],
                                    'body' => [
                                        'es_AR' => Arr::get($result, 'JUEGO2-CUERPO'),
                                    ],
                                ])
                            );
                        } else {
                            $games->push(
                                Game::firstOrCreate([
                                    'title' => [
                                        'es_AR' => Arr::get($result, 'JUEGO2-TITULO'),
                                    ],
                                    'body' => [
                                        'es_AR' => Arr::get($result, 'JUEGO2-CUERPO'),
                                    ],
                                    'materials' => [
                                        'es_AR' => Arr::get($result, 'JUEGO2-MATERIALES'),
                                    ],
                                ])
                            );
                        }
                    }

                    $availableResult = AvailableResult::create([
                        'result' => Arr::get($result, 'RESULTADO'),
                        'info' => [
                            'es_AR' => Arr::get($result, 'INFO'),
                        ],
                        'area_id' => $area->id,
                        'subarea_id' => $subarea->id,
                        'ageRange_id' => $ageRange->id,
                        'stage_id' => $stage->id,
                    ]);

                    $availableResult->games()->sync($games->pluck('id'));
                    $availableResult->suggestions()->sync($suggestions->pluck('id'));
                });
        }
    }

    public function readJson($json)
    {
        $fileContent = file_get_contents(__DIR__ . "/$json.json");

        return collect(json_decode($fileContent, true));
    }

    public function encode($valor='') {

        $utf8_ansi2 = array(
            "\u00c0" =>"À",
            "\u00c1" =>"Á",
            "\u00c2" =>"Â",
            "\u00c3" =>"Ã",
            "\u00c4" =>"Ä",
            "\u00c5" =>"Å",
            "\u00c6" =>"Æ",
            "\u00c7" =>"Ç",
            "\u00c8" =>"È",
            "\u00c9" =>"É",
            "\u00ca" =>"Ê",
            "\u00cb" =>"Ë",
            "\u00cc" =>"Ì",
            "\u00cd" =>"Í",
            "\u00ce" =>"Î",
            "\u00cf" =>"Ï",
            "\u00d1" =>"Ñ",
            "\u00d2" =>"Ò",
            "\u00d3" =>"Ó",
            "\u00d4" =>"Ô",
            "\u00d5" =>"Õ",
            "\u00d6" =>"Ö",
            "\u00d8" =>"Ø",
            "\u00d9" =>"Ù",
            "\u00da" =>"Ú",
            "\u00db" =>"Û",
            "\u00dc" =>"Ü",
            "\u00dd" =>"Ý",
            "\u00df" =>"ß",
            "\u00e0" =>"à",
            "\u00e1" =>"á",
            "\u00e2" =>"â",
            "\u00e3" =>"ã",
            "\u00e4" =>"ä",
            "\u00e5" =>"å",
            "\u00e6" =>"æ",
            "\u00e7" =>"ç",
            "\u00e8" =>"è",
            "\u00e9" =>"é",
            "\u00ea" =>"ê",
            "\u00eb" =>"ë",
            "\u00ec" =>"ì",
            "\u00ed" =>"í",
            "\u00ee" =>"î",
            "\u00ef" =>"ï",
            "\u00f0" =>"ð",
            "\u00f1" =>"ñ",
            "\u00f2" =>"ò",
            "\u00f3" =>"ó",
            "\u00f4" =>"ô",
            "\u00f5" =>"õ",
            "\u00f6" =>"ö",
            "\u00f8" =>"ø",
            "\u00f9" =>"ù",
            "\u00fa" =>"ú",
            "\u00fb" =>"û",
            "\u00fc" =>"ü",
            "\u00fd" =>"ý",
            "\u00ff" =>"ÿ");

        $utf8_ansi2 = array_flip($utf8_ansi2);

        return strtr($valor, $utf8_ansi2);

    }

}