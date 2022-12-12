import React from 'react';

const UpvotesSection = ({ upvotes, projectName, setProjectInfo }) => {
    const upvoteProject = async () => {
        const response = await fetch(`/api/projects/${projectName}/upvote`, {
            method: 'post'
        });
        const body = await response.json();
        setProjectInfo(body);
    };

    return (
        <div id="upvotes-section">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <button onClick={() => {
                upvoteProject();
            }}><i class="fa fa-thumbs-up"></i> {upvotes}</button>
        </div>
    );
}

export default UpvotesSection;