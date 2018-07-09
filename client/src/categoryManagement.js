import { callPostJsonService } from './service';

export const addEditCategory = (category, clientID) => {
    return callPostJsonService('/Category', {content: category, mode: 'Add', id: clientID});
};

export const deleteCategoryRequest = (clientID, category) => {
    return callPostJsonService('/Category', {mode: 'Delete', id: clientID, content: category});
};