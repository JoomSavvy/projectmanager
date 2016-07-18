<?php

namespace App\Repositories;

use App\Models\Times;
use App\Repositories\LocalBaseRepository;
use InfyOm\Generator\Common\BaseRepository;

class TimesRepository extends LocalBaseRepository
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
        return Times::class;
    }
}
