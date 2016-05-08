<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProjectsApiTest extends TestCase
{
    use MakeProjectsTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateProjects()
    {
        $projects = $this->fakeProjectsData();
        $this->json('POST', '/api/v1/projects', $projects);

        $this->assertApiResponse($projects);
    }

    /**
     * @test
     */
    public function testReadProjects()
    {
        $projects = $this->makeProjects();
        $this->json('GET', '/api/v1/projects/'.$projects->id);

        $this->assertApiResponse($projects->toArray());
    }

    /**
     * @test
     */
    public function testUpdateProjects()
    {
        $projects = $this->makeProjects();
        $editedProjects = $this->fakeProjectsData();

        $this->json('PUT', '/api/v1/projects/'.$projects->id, $editedProjects);

        $this->assertApiResponse($editedProjects);
    }

    /**
     * @test
     */
    public function testDeleteProjects()
    {
        $projects = $this->makeProjects();
        $this->json('DELETE', '/api/v1/projects/'.$projects->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/projects/'.$projects->id);

        $this->assertResponseStatus(404);
    }
}
