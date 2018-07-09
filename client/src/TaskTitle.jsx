import React from 'react'

const TaskTitle = ({ title, message}) => {
    return (
        <div className="title">
            <div className="name">
                {title}
            </div>
            <div className="welcome-message">
                {message}
            </div>
        </div>
    )
};

export default TaskTitle;
