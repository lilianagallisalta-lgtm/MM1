<?php

namespace App\Modules\Child\Repositories;

use App\Modules\Child\Models\Child;
use Prettus\Repository\Eloquent\BaseRepository;

class ChildRepository extends BaseRepository
{

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Child::class;
    }

}