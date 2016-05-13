<?php

namespace App\Repositories;

use App\Models\Projects;
use InfyOm\Generator\Common\BaseRepository;

class ProjectsRepository extends BaseRepository
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
        return Projects::class;
    }

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
