import React, { useState } from 'react';

const AddCommentForm = ({ projectName, setProjectInfo }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        console.log({ name, commentText });
        const response = await fetch(`/api/projects/${projectName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ comment: { postedBy: name, text: commentText } }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const body = await response.json();
        setProjectInfo(body);
        setName('');
        setCommentText('');
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
                Comment:
                <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            </label>
            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    );
}

export default AddCommentForm;