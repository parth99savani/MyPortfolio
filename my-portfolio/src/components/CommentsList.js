import React from 'react';
import AddCommentForm from './AddCommentForm';

const CommentsList = ({ comments, projectName, setProjectInfo }) => (
    <>
    <h3>Comments:</h3>
    {comments.map((comment, key) => (
        <div className="comment" key={key}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.text}</p>
        </div>
    ))}
    <AddCommentForm projectName={projectName} setProjectInfo={setProjectInfo} />
    </>
);

export default CommentsList;