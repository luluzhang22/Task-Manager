import React, { Component } from 'react';
import './App.css';

// Components
import TaskTitle from './TaskTitle';
import TaskFilterSort from './TaskFilterSort';
import TaskList from './TaskList';
import TaskAddIcon from './TaskAddIcon';
import TaskAddModal from './TaskAddModal';

// Logic functions
import { getUserID, getUserCategoryList, getUserTaskList } from './userInfo';
import { generateTimestamp, getDefaultDueDate } from './dateTimestamp';
import { addEditTask, deleteTask } from './taskManagement';
import { filterByCategory, filterByStatus, defaultSortAllTask, sortTaskByCategory, sortTaskByDueDateAscend } from './filterSort';
// Config values
import config from './task-management-config.json'

const defaultTaskItem = {title: '',
                         dueDate: '',
                         dueTime: '',
                         status: config.defaultStatusValue.pending,
                         categoryIndex: '0',
                         description: ''
                        };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskModalDisplay: false,
            clientID: '',
            taskList: {},
            categoryList: {},
            filterSortCondition: [config.filterSortAttribute.status, config.defaultStatusValue.all], // array[0] means filter attribute, array[1] means filter value
            newTask: defaultTaskItem,
        };

        this.handleTaskModalDone = this.handleTaskModalDone.bind(this);
        this.handleTaskModalCancel = this.handleTaskModalCancel.bind(this);
        this.showTaskModal = this.showTaskModal.bind(this);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
        this.onUpdateDueDate = this.onUpdateDueDate.bind(this);
        this.onUpdateDueTime = this.onUpdateDueTime.bind(this);
        this.onUpdateCategory = this.onUpdateCategory.bind(this);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.onUpdateDescription = this.onUpdateDescription.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleCompleteTask = this.handleCompleteTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.onUpdateFilterSortCondition = this.onUpdateFilterSortCondition.bind(this);
        this.updateCategoryList = this.updateCategoryList.bind(this);
    }

    componentWillMount() {
        this.fetchUserID();
    }

    setDefaultTaskModal() {
        this.setState({newTask: defaultTaskItem});
    }

    setTaskModal(task) {
        this.setState({newTask: task});
    }

    fetchUserID() {
        getUserID()
            .then(fromJson => {
                this.setState({clientID: fromJson.id});
                this.fetchCategoryList();
                this.fetchTaskList();
            });
    }

    fetchCategoryList() {
        getUserCategoryList(this.state.clientID)
            .then(fromJson => {
                this.setState({categoryList: fromJson})
            });
    }

    fetchTaskList() {
       getUserTaskList(this.state.clientID)
            .then(fromJson => {
                this.setState({taskList: fromJson});
            });
    }

    handleTaskModalCancel() {
        this.setState({taskModalDisplay: false});
    }

    handleTaskModalDone() {
        this.addTaskToList(this.state.newTask);
        this.handleTaskModalCancel();
    }

    addTaskToList(newTask) {
        const dueDateTimestamp = generateTimestamp(newTask.dueDate ? newTask.dueDate : getDefaultDueDate(), newTask.dueTime ? newTask.dueTime : '00:00');
        const taskID = newTask.uuid ? newTask.uuid : Date.now();
        addEditTask({...newTask, dueDateTimestamp: dueDateTimestamp, uuid: taskID}, this.state.clientID)
            .then(fromJson => {
                this.setState({taskList: fromJson});
                this.setDefaultTaskModal();
            });
    }

    showTaskModal() {
        this.setState({taskModalDisplay: true});
    }

    onUpdateTitle(title) {
        const newTask = {...this.state.newTask, title: title};
        this.setState({newTask: newTask});
    }

    onUpdateDueDate(dueDate) {
        const newTask = {...this.state.newTask, dueDate: dueDate};
        this.setState({newTask: newTask});
    }

    onUpdateDueTime(dueTime) {
        const newTask = {...this.state.newTask, dueTime: dueTime};
        this.setState({newTask: newTask});
    }

    onUpdateCategory(categoryIndex) {
        const newTask = {...this.state.newTask, categoryIndex};
        this.setState({newTask: newTask});
    }

    onUpdateStatus(status) {
        const newTask = {...this.state.newTask, status: status};
        this.setState({newTask: newTask});
    }

    onUpdateDescription(description) {
        const newTask = {...this.state.newTask, description: description};
        this.setState({newTask: newTask});
    }

    handleEditTask(taskUUID) {
        this.setTaskModal(this.state.taskList[taskUUID]);
        this.showTaskModal();
    }

    handleCompleteTask(taskUUID) {
        const newTask = {...this.state.taskList[taskUUID], status: 'Complete'};
        this.addTaskToList(newTask);
    }

    handleDeleteTask(taskUUID) {
        deleteTask(taskUUID, this.state.clientID)
            .then(fromJson => {
                this.setState({taskList: fromJson})
        });
    }

    onUpdateFilterSortCondition(attribute, value) {
        this.setState({filterSortCondition: [attribute, value]});
    }

    obtainFilterResultList(list) {
        switch (this.state.filterSortCondition[0]) {
            case config.filterSortAttribute.category:
                return filterByCategory(this.state.filterSortCondition[1], list);
            case config.filterSortAttribute.status:
                if (this.state.filterSortCondition[1] === config.defaultStatusValue.all) {
                    return defaultSortAllTask(list);
                }
                return filterByStatus(this.state.filterSortCondition[1], list);
            case config.filterSortAttribute.sort:
                if (this.state.filterSortCondition[1] === config.defaultSortValue.sortByDueDate) {
                    return sortTaskByDueDateAscend(list);
                } else if (this.state.filterSortCondition[1] === config.defaultSortValue.sortByCategory) {
                    return sortTaskByCategory(list, Object.values(this.state.categoryList));
                }
                /* falls through */
            default:
                return defaultSortAllTask(list);
        }
    }

    updateCategoryList(newCategoryList) {
        this.setState({
            categoryList:newCategoryList
        });
        this.fetchTaskList();
    }

    render() {
        return (
            <div className="task-manager">
                <TaskTitle
                    title={config["pageTitle"]}
                    message={config["welcomeMessage"] + " " + this.state.clientID}
                />
                <div className="content">
                    <div className="main-content">
                        <TaskFilterSort
                            clinentId={this.state.clientID}
                            taskList={this.state.taskList}
                            updateCategoryList={this.updateCategoryList}
                            categoryList={Object.values(this.state.categoryList)}
                            updateFilterSortCondition={this.onUpdateFilterSortCondition} />
                        <TaskList
                            categoryList={Object.values(this.state.categoryList)}
                            taskList={this.obtainFilterResultList(Object.values(this.state.taskList))}
                            editTaskEvent={this.handleEditTask}
                            completeTaskEvent={this.handleCompleteTask}
                            deleteTaskEvent={this.handleDeleteTask} />
                    </div>
                    <TaskAddIcon clickEvent={this.showTaskModal}/>
                </div>
                {this.state.taskModalDisplay ?
                    <div className="modal">
                        <TaskAddModal
                            task={this.state.newTask}
                            categoryList={Object.values(this.state.categoryList)}
                            onUpdateTitle={this.onUpdateTitle}
                            onUpdateDueDate={this.onUpdateDueDate}
                            onUpdateDueTime={this.onUpdateDueTime}
                            onUpdateCategory={this.onUpdateCategory}
                            onUpdateStatus={this.onUpdateStatus}
                            onUpdateDescription={this.onUpdateDescription}
                            cancelClick={this.handleTaskModalCancel}
                            doneClick={this.handleTaskModalDone}
                        />
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default App;
