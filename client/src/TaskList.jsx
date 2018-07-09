import React from 'react';

import TaskItem from './TaskItem';
import config from './task-management-config.json'

const TaskList = ({taskList, categoryList, editTaskEvent, completeTaskEvent, deleteTaskEvent}) => {
    const resultList = !taskList || taskList.length === 0 ?
        <span>{config.emptyListMessage}</span> :
        taskList.map((listItem, index) => {
        return (
            <TaskItem
                key={index}
                task={listItem}
                category={categoryList[listItem.categoryIndex]}
                editTaskEvent={editTaskEvent}
                completeTaskEvent={completeTaskEvent}
                deleteTaskEvent={deleteTaskEvent}
            />
        );
    });

    return (
        <div className="lists">
            {resultList}
        </div>
    );
};

export default TaskList;
