<?php

use Faker\Factory as Faker;
use App\Models\Projects;
use App\Repositories\ProjectsRepository;

trait MakeProjectsTrait
{
    /**
     * Create fake instance of Projects and save it in database
     *
     * @param array $projectsFields
     * @return Projects
     */
    public function makeProjects($projectsFields = [])
    {
        /** @var ProjectsRepository $projectsRepo */
        $projectsRepo = App::make(ProjectsRepository::class);
        $theme = $this->fakeProjectsData($projectsFields);
        return $projectsRepo->create($theme);
    }

    /**
     * Get fake instance of Projects
     *
     * @param array $projectsFields
     * @return Projects
     */
    public function fakeProjects($projectsFields = [])
    {
        return new Projects($this->fakeProjectsData($projectsFields));
    }

    /**
     * Get fake data of Projects
     *
     * @param array $postFields
     * @return array
     */
    public function fakeProjectsData($projectsFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'user_id' => $fake->word,
            'created_at' => $fake->word,
            'updated_at' => $fake->word,
            'order_by' => $fake->word,
            'description' => $fake->word
        ], $projectsFields);
    }
}
