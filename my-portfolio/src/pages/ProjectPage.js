import React, { useState, useEffect } from 'react';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import projects from './project-content';

const ProjectPage = ({ match }) => {
    const { name } = match.params;

    const [projectInfo, setProjectInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchProjectInfo = async () => {
            const result = await fetch(`/api/projects/${name}`);
            const body = await result.json();
            setProjectInfo(body);
        };

        fetchProjectInfo();
    }, [name]);

    const matchingProject = projects.find(project => project.name === name);
    return matchingProject ? 
    (
        <>
        <h1>{matchingProject.title}</h1>
        <div id="inner"><a href={matchingProject.github}><button><i class="fa fa-github"></i></button></a> <UpvotesSection upvotes={projectInfo.upvotes} projectName={name} setProjectInfo={setProjectInfo} /></div><br></br>
        {matchingProject.content.map((paragraph, key) => <p key={key}>{paragraph}</p>)}
        <CommentsList comments={projectInfo.comments} projectName={name} setProjectInfo={setProjectInfo} />
        </>
    ) : (
        <h1>Uh oh, looks like that project doesn't exist</h1>
    );
};

export default ProjectPage;
