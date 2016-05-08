<?php

use Faker\Factory as Faker;
use App\Models\Tasks;
use App\Repositories\TasksRepository;

trait MakeTasksTrait
{
    /**
     * Create fake instance of Tasks and save it in database
     *
     * @param array $tasksFields
     * @return Tasks
     */
    public function makeTasks($tasksFields = [])
    {
        /** @var TasksRepository $tasksRepo */
        $tasksRepo = App::make(TasksRepository::class);
        $theme = $this->fakeTasksData($tasksFields);
        return $tasksRepo->create($theme);
    }

    /**
     * Get fake instance of Tasks
     *
     * @param array $tasksFields
     * @return Tasks
     */
    public function fakeTasks($tasksFields = [])
    {
        return new Tasks($this->fakeTasksData($tasksFields));
    }

    /**
     * Get fake data of Tasks
     *
     * @param array $postFields
     * @return array
     */
    public function fakeTasksData($tasksFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'project_id' => $fake->randomDigitNotNull,
            'created_at' => $fake->word,
            'updated_at' => $fake->word,
            'order_by' => $fake->randomDigitNotNull,
            'user_id' => $fake->randomDigitNotNull,
            'assigned_to' => $fake->randomDigitNotNull,
            'priority' => $fake->randomDigitNotNull,
            'deliverable' => $fake->word,
            'delivered' => $fake->word
        ], $tasksFields);
    }
}
