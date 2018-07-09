import React from 'react';

const TaskErrorMessage = ({ message }) => {    
    return (
        <div className="error-message">
            {message}
        </div>
    );
};

export default TaskErrorMessage;
