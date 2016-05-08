<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TasksApiTest extends TestCase
{
    use MakeTasksTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateTasks()
    {
        $tasks = $this->fakeTasksData();
        $this->json('POST', '/api/v1/tasks', $tasks);

        $this->assertApiResponse($tasks);
    }

    /**
     * @test
     */
    public function testReadTasks()
    {
        $tasks = $this->makeTasks();
        $this->json('GET', '/api/v1/tasks/'.$tasks->id);

        $this->assertApiResponse($tasks->toArray());
    }

    /**
     * @test
     */
    public function testUpdateTasks()
    {
        $tasks = $this->makeTasks();
        $editedTasks = $this->fakeTasksData();

        $this->json('PUT', '/api/v1/tasks/'.$tasks->id, $editedTasks);

        $this->assertApiResponse($editedTasks);
    }

    /**
     * @test
     */
    public function testDeleteTasks()
    {
        $tasks = $this->makeTasks();
        $this->json('DELETE', '/api/v1/tasks/'.$tasks->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/tasks/'.$tasks->id);

        $this->assertResponseStatus(404);
    }
}
