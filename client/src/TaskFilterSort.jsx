import React, { Component } from 'react';

import config from './task-management-config.json';

import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';

import {deleteCategoryRequest, addEditCategory} from './categoryManagement';

import TaskCategoryModify from './TaskCategoryModify';
import TaskErrorMessage from './TaskErrorMessage';

class TaskFilterSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedCondition: config.defaultStatusValue.all,
            sortCondition: config.defaultSortValue.sortByDefault,
            currentCategory:{},
            categoryModalDisplay: false,
            message:''
        };

        this.deleteCategory = this.deleteCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateModalDisplay = this.updateModalDisplay.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleModifyCategory = this.handleModifyCategory.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }


    filterTasks(attribute, event) {
        const checkedCondition = attribute === config.filterSortAttribute.category ?
            this.props.categoryList.indexOf(event.target.innerText) : event.target.innerText;
        this.setState({
            sortCondition: '',
            checkedCondition});
        this.props.updateFilterSortCondition(attribute, checkedCondition);
    }

    sortTasks(event) {
        this.setState({sortCondition: event.target.value, checkedCondition: ''});
        this.props.updateFilterSortCondition(config.filterSortAttribute.sort, event.target.value);
    }

    hideMessage() {
        this.setState({
            message:''
        })
    }

    updateMessage(newMessage){
        this.setState({
            message: newMessage
        });
        setTimeout(() => {
            this.hideMessage();
        }, 3000);
    }

    deleteCategory(event, category) {
        event.stopPropagation();
        const currentCategory={};
        currentCategory.index = event.target.parentNode.dataset.id;
		if(!this.checkTaskBeforeDeleteCategory(currentCategory.index)){
		    return;
		}
		if(Object.values(this.props.categoryList).length < 2){
            this.updateMessage(`Cannot delete "${category}" since you must have at least one category!`);
            return;
		}
		this.handleDeleteCategory(currentCategory)
    }

    checkTaskBeforeDeleteCategory(categoryIndex) {
        for(let task of Object.values(this.props.taskList)){
            if(task.categoryIndex === categoryIndex){
                this.updateMessage(`Cannot delete "${this.props.categoryList[categoryIndex]}" since you have task with it!`);
                return false;
            }
        }
        return true;
    }

    handleDeleteCategory(currentCategory) {
        deleteCategoryRequest(this.props.clinentId, currentCategory)
        .then(fromJson => {
            this.props.updateCategoryList(fromJson);
        })
	}

    editCategory(event, category) {
        event.stopPropagation();
        const curCategory={index : event.target.parentNode.dataset.id, name : category};
        this.isAllowEdit(curCategory);
    }

    isAllowEdit(curCategory) {
        this.setState({
            categoryModalDisplay : true,
            currentCategory: curCategory,
        });
    }

    updateCategory(category){
        const newCategory = {...this.state.currentCategory, name: category};
        this.setState({
            currentCategory: newCategory
        });
    }

    updateModalDisplay(categoryModalDisplay) {
        this.setState({
            categoryModalDisplay,
        });
    }

    showCategoryModal(){
        if (this.state.categoryModalDisplay) {
            return (
                <TaskCategoryModify
                    value={this.state.currentCategory.name || ''}
                    updateCategory={this.updateCategory}
                    updateModalDisplay={this.updateModalDisplay}
                    finishProcess={this.handleModifyCategory}
                />
            );
        }
        return null;
    }

    handleModifyCategory(){
        addEditCategory(this.state.currentCategory, this.props.clinentId)
        .then(fromJson => {
            this.props.updateCategoryList(fromJson);
        })
    }

    addCategory(){
        if(Object.values(this.props.categoryList).length === config.categoryMaxLength){
            const message = config.fullCategoryMessage + " " + config.categoryMaxLength;
            this.updateMessage(message);
            return;
        }
        const emptyCategory = {name : ''};
        this.setState({
            categoryModalDisplay : true,
            currentCategory: emptyCategory,
        })
    }

    render() {
        const categories = !this.props.categoryList || this.props.categoryList.length === 0 ?
            <div className="empty-list-message">{config.emptyCategoryMessage}</div> :
            this.props.categoryList.map((category, index) => {
                return (
                    <div
                        key={index}
                        className={`cate${index} category-common ${this.state.checkedCondition === index ? 'filter-selected' : ''}`}
                        onClick={event => this.filterTasks(config.filterSortAttribute.category, event)}>
                        <span>{category}</span>
                        <div className="category-operation" data-id={index}>
                            <img className="category-edit" src={editIcon} alt="edit category icon" onClick={event => this.editCategory(event, category)}/>
                            <img className="category-delete" src={deleteIcon} alt="delete category icon" onClick={event => this.deleteCategory(event, category)}/>
                        </div>
                    </div>
                );
            });

        return (
            <div className="filter-sort">
                <div className="category">
                    <div className="category-list">
                        {categories}
                    </div>
                    <div className="add-category">
                        <button onClick={event => this.addCategory()}>Add Category</button>
                    </div>
                    {this.showCategoryModal()}
                </div>
                <div className="filter">
                    <div className="status">
                        <div
                            className={`all status-common ${this.state.checkedCondition === config.defaultStatusValue.all ? 'filter-selected' : ''}`}
                            onClick={event => this.filterTasks(config.filterSortAttribute.status, event)}
                        >
                            All
                        </div>
                        <div
                            className={`pending status-common ${this.state.checkedCondition === config.defaultStatusValue.pending ? 'filter-selected' : ''}`}
                            onClick={event => this.filterTasks(config.filterSortAttribute.status, event)}
                        >
                            Pending
                        </div>
                        <div
                            className={`complete status-common ${this.state.checkedCondition === config.defaultStatusValue.complete ? 'filter-selected' : ''}`}
                            onClick={event => this.filterTasks(config.filterSortAttribute.status, event)}
                        >
                                Complete
                        </div>
                    </div>
                    <div className="sort">
                        <select
                            className="sort-select"
                            value={this.state.sortCondition}
                            onChange={event => this.sortTasks(event)}
                        >
                            <option className="sort-default" value={config.defaultSortValue.sortByDefault}>Sort By Default</option>
                            <option className="sort-due" value={config.defaultSortValue.sortByDueDate}>Due date</option>
                            <option className="sort-category" value={config.defaultSortValue.sortByCategory}>Category</option>
                        </select>
                    </div>
                </div>
                <TaskErrorMessage
                    message={this.state.message}
                />
            </div>
        );
    }
}

export default TaskFilterSort;
