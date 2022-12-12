import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = ({ projects }) => (
    <>
    {projects.map((project, key) => (
        <Link className="article-list-item" to={`/projects/${project.name}`} key={key}>
            <h3>{project.title}</h3>
            <p>{project.content[0].substring(0, 150)}...</p>
        </Link>
    ))}
    </>
);

export default ProjectsList;