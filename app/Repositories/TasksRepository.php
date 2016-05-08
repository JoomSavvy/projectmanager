<?php

namespace App\Repositories;

use App\Models\Tasks;
use InfyOm\Generator\Common\BaseRepository;

class TasksRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Tasks::class;
    }
}
