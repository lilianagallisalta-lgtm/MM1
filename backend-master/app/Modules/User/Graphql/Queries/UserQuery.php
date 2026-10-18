<?php

namespace App\Modules\User\Graphql\Queries;

class UserQuery
{
    public function me($root, array $args)
    {
        return me();
    }
}