import React, { Component }from 'react';

import { convertTimestampToDateString, convertTimestampToTime, convertTimestampToDateNumber } from './dateTimestamp';

import completeIcon from './images/complete.png';
import deleteIcon from './images/delete.png';
import editIcon from './images/edit.png';
import uncompleteIcon from './images/uncomplete.png';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDetail: false
        };

        this.toggleTaskDetailDisplay = this.toggleTaskDetailDisplay.bind(this);
    }

    toggleTaskDetailDisplay() {
        this.setState({displayDetail: !this.state.displayDetail});
    }

    render() {
        const timeString = convertTimestampToTime(this.props.task.dueDateTimestamp);
        const timeBlock = (
            <div className="time-block">
                <div className="month-date today">
                    <span>{convertTimestampToDateString(this.props.task.dueDateTimestamp)}</span>
                </div>
                <div className="time">{timeString}</div>
            </div>
        );
        const taskDuedate = (
            <div className="details-item">
                <div>Due date:</div>
                <div className="item-content">
                    {`${convertTimestampToDateNumber(this.props.task.dueDateTimestamp)} ${timeString}`}
                </div>
            </div>
        );
        const taskCompleteIcon = (
            <img
                src={completeIcon}
                onClick={event => this.props.completeTaskEvent(event.target.parentNode.parentNode.dataset.uuid)}
                className="task-complete-icon manipulate-share"
                alt="task complete icon"
            />
        );
        const taskDeleteIcon = (
            <img
                src={deleteIcon}
                className="task-delete-icon manipulate-share"
                alt="task delete icon"
                onClick={event => this.props.deleteTaskEvent(event.target.parentNode.parentNode.dataset.uuid)}
            />
        );
        const taskEditIcon = (
            <img
                src={editIcon}
                className="task-edit-icon manipulate-share"
                alt="task edit icon"
                onClick={event => this.props.editTaskEvent(event.target.parentNode.parentNode.dataset.uuid)}
            />
        );
        const icons = this.props.task.status === "Pending" ?
            (<div>
                {taskCompleteIcon}
                {taskDeleteIcon}
                {taskEditIcon}
            </div>) :
            <img
                src={deleteIcon}
                className="task-delete-icon manipulate-share"
                alt="task delete icon"
                onClick={event => this.props.deleteTaskEvent(event.target.parentNode.dataset.uuid)} />;
        const taskManipulate = (
            <div className="manipulate" data-uuid={this.props.task.uuid}>
                {icons}
            </div>
        );
        const taskTitle = (
            <div className="list-content" onClick={this.toggleTaskDetailDisplay}>
                {this.props.task.title}
            </div>
        );
        const taskCategory = (
            <div className={`cate${this.props.task.categoryIndex} label-common`}>
                {this.props.category}
            </div>
        );
        const taskDescription = (
            <div className="details-item">
                <div>Description:</div>
                <div className="item-content">
                    {this.props.task.description}
                </div>
            </div>
        );
        const overDueWarning = this.props.task.status === "Pending" && this.props.task.dueDateTimestamp < Date.now() ?
                            (<img className="reminder" src={uncompleteIcon} alt="task uncomplete icon" />) :
                            null;
        const taskDetails = this.state.displayDetail ?
                                (<div className="details">
                                    {taskDescription}
                                    {taskDuedate}
                                </div>) : null;
        return (
            <div className={`single-list ${this.props.task.status === 'Complete' ? 'list-complete' : ''}`}>
                {timeBlock}
                <div className="list-items list-details">
                    {overDueWarning}
                    <div className="list-inside">
                        {taskCategory}
                        {taskTitle}
                        {taskManipulate}
                    </div>
                   {taskDetails}
                </div>
            </div>
        );
    }
}

export default TaskItem;
