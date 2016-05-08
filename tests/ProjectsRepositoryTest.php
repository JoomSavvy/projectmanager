<?php

use App\Models\Projects;
use App\Repositories\ProjectsRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProjectsRepositoryTest extends TestCase
{
    use MakeProjectsTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ProjectsRepository
     */
    protected $projectsRepo;

    public function setUp()
    {
        parent::setUp();
        $this->projectsRepo = App::make(ProjectsRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateProjects()
    {
        $projects = $this->fakeProjectsData();
        $createdProjects = $this->projectsRepo->create($projects);
        $createdProjects = $createdProjects->toArray();
        $this->assertArrayHasKey('id', $createdProjects);
        $this->assertNotNull($createdProjects['id'], 'Created Projects must have id specified');
        $this->assertNotNull(Projects::find($createdProjects['id']), 'Projects with given id must be in DB');
        $this->assertModelData($projects, $createdProjects);
    }

    /**
     * @test read
     */
    public function testReadProjects()
    {
        $projects = $this->makeProjects();
        $dbProjects = $this->projectsRepo->find($projects->id);
        $dbProjects = $dbProjects->toArray();
        $this->assertModelData($projects->toArray(), $dbProjects);
    }

    /**
     * @test update
     */
    public function testUpdateProjects()
    {
        $projects = $this->makeProjects();
        $fakeProjects = $this->fakeProjectsData();
        $updatedProjects = $this->projectsRepo->update($fakeProjects, $projects->id);
        $this->assertModelData($fakeProjects, $updatedProjects->toArray());
        $dbProjects = $this->projectsRepo->find($projects->id);
        $this->assertModelData($fakeProjects, $dbProjects->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteProjects()
    {
        $projects = $this->makeProjects();
        $resp = $this->projectsRepo->delete($projects->id);
        $this->assertTrue($resp);
        $this->assertNull(Projects::find($projects->id), 'Projects should not exist in DB');
    }
}
