const groupTaskByCategory = (categoryIndex, list) => {
    return list.filter(item => item.categoryIndex === categoryIndex + "");
};

const groupTaskByStatus = (status, list) => {
    return list.filter(item => item.status === status);
};

const sortTaskByDueDateDescend = (list) => {
    list.sort(function(taskA, taskB) {
        if (taskA.dueDateTimestamp === taskB.dueDateTimestamp) {
            return 0;
        }
        return taskB.dueDateTimestamp < taskA.dueDateTimestamp ? -1 : 1;
    });
    return list;
};

export const sortTaskByDueDateAscend = (list) => {
    list.sort(function(taskA, taskB) {
        if (taskA.dueDateTimestamp === taskB.dueDateTimestamp) {
            return 0;
        }
        return taskA.dueDateTimestamp < taskB.dueDateTimestamp ? -1 : 1;
    });
    return list;
};

export const sortTaskByCategory = (list, categories) => { // group task by category and in each category, default sort all task
    let sortedList = [];
    for (let index = 0; index < categories.length; index++) {
            const taskGroupBycategory = groupTaskByCategory(index, list);
            sortedList.push(...defaultSortAllTask(taskGroupBycategory));
    }
    return sortedList;
};

export const filterByCategory = (categoryIndex, list) => {
    return sortTaskByDueDateAscend(groupTaskByCategory(categoryIndex, list));
};

export const filterByStatus = (status, list) => {
    return sortTaskByDueDateAscend(groupTaskByStatus(status, list));
};

export const defaultSortAllTask = (list) => { // sort pending task by due date ascending and sort complete task by due date descending
    const pendingTasks = sortTaskByDueDateAscend(groupTaskByStatus('Pending', list));
    const completeTasks = sortTaskByDueDateDescend(groupTaskByStatus('Complete', list));
    return pendingTasks.concat(completeTasks);
}

