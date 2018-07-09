import React from 'react';

import addIcon from './images/add-icon.png';

const TaskAddIcon = ({clickEvent}) => {
    return (
        <div className="add">
            <img src={addIcon} alt="add new task icon" onClick={clickEvent}/>
        </div>
    );
};

export default TaskAddIcon;
