<?php

use App\Models\Tasks;
use App\Repositories\TasksRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TasksRepositoryTest extends TestCase
{
    use MakeTasksTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var TasksRepository
     */
    protected $tasksRepo;

    public function setUp()
    {
        parent::setUp();
        $this->tasksRepo = App::make(TasksRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateTasks()
    {
        $tasks = $this->fakeTasksData();
        $createdTasks = $this->tasksRepo->create($tasks);
        $createdTasks = $createdTasks->toArray();
        $this->assertArrayHasKey('id', $createdTasks);
        $this->assertNotNull($createdTasks['id'], 'Created Tasks must have id specified');
        $this->assertNotNull(Tasks::find($createdTasks['id']), 'Tasks with given id must be in DB');
        $this->assertModelData($tasks, $createdTasks);
    }

    /**
     * @test read
     */
    public function testReadTasks()
    {
        $tasks = $this->makeTasks();
        $dbTasks = $this->tasksRepo->find($tasks->id);
        $dbTasks = $dbTasks->toArray();
        $this->assertModelData($tasks->toArray(), $dbTasks);
    }

    /**
     * @test update
     */
    public function testUpdateTasks()
    {
        $tasks = $this->makeTasks();
        $fakeTasks = $this->fakeTasksData();
        $updatedTasks = $this->tasksRepo->update($fakeTasks, $tasks->id);
        $this->assertModelData($fakeTasks, $updatedTasks->toArray());
        $dbTasks = $this->tasksRepo->find($tasks->id);
        $this->assertModelData($fakeTasks, $dbTasks->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteTasks()
    {
        $tasks = $this->makeTasks();
        $resp = $this->tasksRepo->delete($tasks->id);
        $this->assertTrue($resp);
        $this->assertNull(Tasks::find($tasks->id), 'Tasks should not exist in DB');
    }
}
