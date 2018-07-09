const config = require('./task-management-service-config');
const USER_ID = config.defaultUserID;
let userIndex = 0;
let taskList = {};
let categoryList = {};

const taskUpdate = {
    addAndEdit: function(userID, uuid, content) {
        taskList[userID][uuid] = content;
    },
    delete: function(userID, uuid) {
        delete taskList[userID][uuid];
    },
    getUserIndex: function() {
        return USER_ID[(userIndex++) % USER_ID.length];
    },
    getAllTaskByUserID: function(userID) {
        if (!(userID in taskList)) {
            taskList[userID] = {};
        }
        return taskList[userID];
    },
    getAllCategoryByUserID: function (userID) {
        if (!(userID in categoryList)) {
            categoryList[userID] = [...config.defaultCategory];
        }
        return categoryList[userID];
    },
    deleteCategory: function (userID, index) {
        for(let task of Object.values(taskList[userID])){
            if(parseInt(task["categoryIndex"]) > index){
                task["categoryIndex"] = parseInt(task["categoryIndex"]) - 1 + "";
            }
        }
        categoryList[userID].splice(index, 1);
    },
    addAndEditCategory: function (userID, content) {
        if(!content.index){
            categoryList[userID].push(content.name);
        }else{
            categoryList[userID][content.index] = content.name;
        }
    }
};

module.exports = taskUpdate;
