import { callGetJsonService, callPostJsonService } from './service';

export const getUserID = () => {
    return callPostJsonService('/userID', {});
};

export const getUserCategoryList = (id) => {
    const url = `/allCategory?id=${id}`;
    return callGetJsonService(url);
};

export const getUserTaskList = (id) => {
    const url = `/allTasks?id=${id}`;
    return callGetJsonService(url);
};


