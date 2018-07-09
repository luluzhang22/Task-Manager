import { callPostJsonService } from './service';

export const addEditTask = (task, clientID) => {
    return callPostJsonService('/taskManagement', {content: task, mode: 'Add', id: clientID});
};

export const deleteTask = (categoryIndex, clientID) => {
    return callPostJsonService('/taskManagement', {mode: 'Delete', id: clientID, uuid: categoryIndex});
};
