import React from 'react';

import config from './task-management-config.json'

const TaskAddIcon = ({categoryList, task, onUpdateTitle, onUpdateDueDate, onUpdateDueTime, onUpdateCategory, onUpdateStatus, onUpdateDescription, cancelClick, doneClick}) => {
    const modalFieldsValidCheck = (title) => {
        return !!(title && title.length !== 0);
    }

    const categoryOptions = !categoryList || categoryList.length === 0 ?
        null :
        categoryList.map((element, index) => {
            return <option value={index} key={index}>{element}</option>;
        });
    return (
        <div className="modal-content">
            <div className="top-area">
                <span>Add a New Task</span>
            </div>
            <div className="fillin">
                <div className="add-title content-share">
                <div className="text-title">Title</div>
                <input
                    className="text-for-title"
                    placeholder="Title of your task"
                    type="text"
                    onChange={event => onUpdateTitle(event.target.value)}
                    maxLength="50"
                    value={task.title}
                />
            </div>
            <div className="duedate content-share">
                <div className="text-due">Due Date</div>
                    <input
                        id="text-due-date"
                        type="date"
                        onChange={event => onUpdateDueDate(event.target.value)}
                        value={task.dueDate}
                    />
                    <input
                        id="time-adding-task"
                        type="time"
                        onChange={event => onUpdateDueTime(event.target.value)}
                        value={task.dueTime}
                    />
                </div>
                <div className="add-category content-share">
                    <div className="text-category">Category</div>
                    <select
                        id="modalCategory"
                        name="drop"
                        value={task.categoryIndex}
                        onChange={event => onUpdateCategory(event.target.value)}
                    >
                        {categoryOptions}
                    </select>
                </div>
                <div className="add-status content-share" >
                    <input
                        type="radio"
                        name="status"
                        value="Pending"
                        id="PendingBtn"
                        onChange={event => onUpdateStatus(event.target.value)}
                        defaultChecked={task.status === 'Pending'}
                    />
                    <label>Pending</label>
                    <input
                        type="radio"
                        name="status"
                        value="Complete"
                        id="CompleteBtn"
                        defaultChecked={task.status === 'Complete'}
                        onChange={event => onUpdateStatus(event.target.value)}
                    />
                    <label>Complete</label>
                </div>
                <div className="description">
                    <div className="text-description">Description</div>
                    <textarea
                        className="text-for-description"
                        name="area"
                        onChange={event => onUpdateDescription(event.target.value)}
                        placeholder="Description of your task"
                        value={task.description}></textarea>
                </div>
                <div className="title-empty-warning-message">{modalFieldsValidCheck(task.title) ? '' : config.taskModalWarningMessage.titleEmpty}</div>
            </div>
            <div className="button-area">
                <button type="button"  onClick={cancelClick} className="btn-cancel">Cancel</button>
                <button type="submit" disabled={!modalFieldsValidCheck(task.title)} onClick={doneClick} className="btn-done">Done</button>
            </div>
        </div>
    );
};

export default TaskAddIcon;
