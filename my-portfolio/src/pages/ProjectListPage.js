import React from 'react';
import ProjectsList from '../components/ProjectsList';
import projects from './project-content';

const ProjectListPage = () => (
    <>
    <h1>Projects</h1>
    <ProjectsList projects={projects} />
    </>
);

export default ProjectListPage;