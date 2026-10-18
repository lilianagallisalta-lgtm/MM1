<?php

use App\Modules\Stage\Database\Seeds\StageModuleSeeder;
use App\Modules\User\Database\Seeds\UserModuleSeeder;
use Hawk\Checkout\Database\Seeds\CheckoutModuleSeeder;
use Hawk\Price\Database\Seeds\PriceModuleSeeder;
use Hawk\PromotionCode\Repositories\PromotionCodeRepository;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Modules

        $this->call(CheckoutModuleSeeder::class);

        $this->call(UserModuleSeeder::class);

        $this->call(PriceModuleSeeder::class);

        // App

        $this->call(StageModuleSeeder::class);

        $this->call(AgesRangesTableSeeder::class);

//        $this->call(QuestionModuleSeeder::class);

        $this->call(AnswerOptionsTableSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(SubareasTableSeeder::class);

        $this->call(QuestionsTableSeeder::class);

        $this->call(GamesTableSeeder::class);
        $this->call(SuggestionsTableSeeder::class);
        $this->call(AvailableResultsTableSeeder::class);
        $this->call(AvailableResultGameTableSeeder::class);
        $this->call(AvailableResultSuggestionTableSeeder::class);

        app(PromotionCodeRepository::class)->create([
            'code' => 'LANZAMIENTO',
            'percentage' => 1,
            'start' => now(),
            'end' => now()->addDays(7),
            'initialStock' => 3,
        ]);
    }
}
