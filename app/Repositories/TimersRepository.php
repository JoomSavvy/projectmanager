<?php

namespace App\Repositories;

use App\Models\Timers;
use App\Repositories\LocalBaseRepository;
use InfyOm\Generator\Common\BaseRepository;

class TimersRepository extends LocalBaseRepository
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
        return Timers::class;
    }
}
