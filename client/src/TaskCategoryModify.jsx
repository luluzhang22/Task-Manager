import React from 'react';

const TaskCategoryModify = ({ value, updateCategory, updateModalDisplay, finishProcess}) =>
{
    const saveModify = () => {
        updateModalDisplay(false);
        finishProcess();
    };

    const showWarnMessage = (value) => {
        if (value === '') {
            return (
                <div className="category-empty-warning-message">
                    <span>Category Name must not be empty!</span>
                </div>
            )
        } else {
            return null;
        }
    };

    return (
        <div className="modal-category">
            <div className="modal-category-content">
                <div className="top-area">Add a New Category</div>
                <div className="fillin">
                    <div className="add-title content-share">
                        <div className="text-category">Category</div>
                        <input 
                            className="text-for-title text-for-category" 
                            value={value} placeholder="Category Name" 
                            maxLength="20"
                            onChange={event => updateCategory(event.target.value)}
                        />
                    </div>
                    {showWarnMessage(value)}
                </div>
                <div className="button-area">
                    <button onClick={() => updateModalDisplay(false)} className="btn-cancel-category">Cancel</button>
                    <button onClick={saveModify} disabled={value === ''} className="btn-done-category">Done</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCategoryModify;