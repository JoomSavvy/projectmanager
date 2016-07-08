<?php

namespace App\Repositories;

use Exception;
use InfyOm\Generator\Common\BaseRepository;

abstract class LocalBaseRepository extends BaseRepository
{
    public function withTrashed($withTrashed = false)
    {
        if($withTrashed === true)
        {
            $this->model = $this->model->withTrashed();
            $this->trashed = true;
        }

        return $this;
    }
}
